import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GRAPH_CONFIG, ENTITY_TYPES } from '../../utils/constants.js';

function KnowledgeGraph({ data, selectedNode, onNodeClick, searchQuery, highlightedEntities }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Entity type colors (brighter for dark background)
  const colorScale = {
    [ENTITY_TYPES.PERSON]: '#60a5fa',
    [ENTITY_TYPES.COMPANY]: '#a78bfa',
    [ENTITY_TYPES.TECHNOLOGY]: '#34d399',
    [ENTITY_TYPES.CONCEPT]: '#fbbf24'
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const parent = svgRef.current.parentElement;
        setDimensions({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;
    if (data.nodes.length === 0) {
      renderEmptyState();
      return;
    }

    renderGraph();

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [data, dimensions, selectedNode, searchQuery, highlightedEntities]);

  const renderEmptyState = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.append('text')
      .attr('x', dimensions.width / 2)
      .attr('y', dimensions.height / 2 - 20)
      .attr('text-anchor', 'middle')
      .attr('class', 'empty-state-title')
      .style('font-size', '20px')
      .style('font-weight', '600')
      .style('fill', '#6b7280')
      .text('No entities yet');

    svg.append('text')
      .attr('x', dimensions.width / 2)
      .attr('y', dimensions.height / 2 + 10)
      .attr('text-anchor', 'middle')
      .attr('class', 'empty-state-text')
      .style('font-size', '14px')
      .style('fill', '#9ca3af')
      .text('Capture insights from articles to build your knowledge graph');
  };

  const renderGraph = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create deep copies to avoid D3 mutating original data
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Main container group for zoom/pan
    const g = svg.append('g');

    // Build article-to-nodes map for clustering
    const articleNodes = new Map();
    nodes.forEach(node => {
      if (node.sources && node.sources.length > 0) {
        node.sources.forEach(articleId => {
          if (!articleNodes.has(articleId)) {
            articleNodes.set(articleId, []);
          }
          articleNodes.get(articleId).push(node.id);
        });
      }
    });

    // Create force simulation with article-based clustering
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(d => {
          // Much more spacing - 150-300px between nodes
          const strength = d.strength || 0.5;
          return Math.max(150, 300 - (strength * 150));
        })
        .strength(d => {
          // Stronger pull for high-strength relationships
          return (d.strength || 0.5) * 0.8;
        }))
      .force('charge', d3.forceManyBody()
        .strength(-500)) // Much stronger repulsion for better spacing
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide()
        .radius(GRAPH_CONFIG.COLLISION_RADIUS))
      .force('articleCluster', alpha => {
        // Custom force to cluster nodes from same article
        articleNodes.forEach(nodeIds => {
          if (nodeIds.length < 2) return;

          // Calculate centroid of this article's nodes
          const clusterNodes = nodes.filter(n => nodeIds.includes(n.id));
          const cx = d3.mean(clusterNodes, n => n.x);
          const cy = d3.mean(clusterNodes, n => n.y);

          // Pull each node toward the centroid
          clusterNodes.forEach(node => {
            if (!node.x || !node.y) return;
            const dx = cx - node.x;
            const dy = cy - node.y;
            const k = alpha * 0.15; // Clustering strength
            node.vx += dx * k;
            node.vy += dy * k;
          });
        });
      });

    simulationRef.current = simulation;

    // Create links with strength-based styling
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => {
        const strength = d.strength || 0.5;
        // Stronger = more blue/purple, weaker = gray
        if (strength > 0.7) return '#667eea';
        if (strength > 0.5) return '#6b7ea8';
        return '#4a5568';
      })
      .attr('stroke-opacity', d => {
        // Opacity scales with strength: 0.3 to 0.9
        const strength = d.strength || 0.5;
        return 0.3 + (strength * 0.6);
      })
      .attr('stroke-width', d => {
        // Thickness scales with strength: 1px to 4px
        const strength = d.strength || 0.5;
        return 1 + (strength * 3);
      })
      .style('pointer-events', 'none');

    // Add relationship labels to links - makes the graph way more useful
    const linkLabels = g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links.filter(d => (d.strength || 0) > 0.6)) // Only show labels for strong connections (reduces clutter)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '11px')
      .attr('font-family', 'system-ui, sans-serif')
      .attr('fill', '#a0a0a0')
      .attr('stroke', '#0f0f23')
      .attr('stroke-width', '2')
      .attr('paint-order', 'stroke fill')
      .text(d => {
        const strength = d.strength || 0;
        if (strength > 0.8) return 'co-mentioned often';
        if (strength > 0.6) return 'related';
        return '';
      })
      .style('pointer-events', 'none');

    // Create node groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    // Helper function to check if node should be highlighted
    const isHighlighted = (d) => {
      if (searchQuery && d.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      if (highlightedEntities && highlightedEntities.length > 0 && highlightedEntities.includes(d.id)) {
        return true;
      }
      return false;
    };

    const isDimmed = (d) => {
      if (searchQuery || (highlightedEntities && highlightedEntities.length > 0)) {
        return !isHighlighted(d);
      }
      return false;
    };

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => {
        const baseSize = GRAPH_CONFIG.DEFAULT_NODE_SIZE;
        const degreeBonus = Math.sqrt(d.degree || 0) * 2;
        const highlightBonus = isHighlighted(d) ? 3 : 0;
        // Primary nodes (from selected article) are larger
        const primaryBonus = d.isFromSelectedArticle ? 4 : 0;
        return baseSize + degreeBonus + highlightBonus + primaryBonus;
      })
      .attr('fill', d => colorScale[d.type] || '#6b7280')
      .attr('stroke', d => {
        if (selectedNode && selectedNode.id === d.id) return '#ffffff';
        if (isHighlighted(d)) return '#fbbf24';
        // Primary nodes have brighter border
        if (d.isFromSelectedArticle) return '#ffffff';
        return '#2d2d44';
      })
      .attr('stroke-width', d => {
        if (selectedNode && selectedNode.id === d.id) return 3;
        if (isHighlighted(d)) return 3;
        // Primary nodes have thicker border
        if (d.isFromSelectedArticle) return 3;
        return 2;
      })
      .attr('opacity', d => {
        if (isDimmed(d)) return 0.3;
        // Secondary nodes (connected) are more subtle
        return d.isFromSelectedArticle ? 1 : 0.7;
      })
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');

    // Add labels to nodes
    node.append('text')
      .text(d => d.name)
      .attr('x', 12)
      .attr('y', 4)
      .attr('font-size', d => isHighlighted(d) ? '13px' : '12px')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .attr('font-weight', d => isHighlighted(d) ? '600' : '500')
      .attr('fill', d => isDimmed(d) ? '#666' : '#e0e0e0')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Add hover effects
    node.style('cursor', 'pointer')
    .on('mouseenter', function(event, d) {
      const circle = d3.select(this).select('circle');
      const text = d3.select(this).select('text');

      // Highlight node
      circle
        .transition()
        .duration(150)
        .attr('opacity', 1)
        .attr('stroke-width', 3.5)
        .attr('r', circle.attr('r') * 1.15);

      text
        .transition()
        .duration(150)
        .attr('font-size', '14px')
        .attr('font-weight', '700')
        .attr('fill', '#ffffff');

      // Highlight connected links
      link
        .transition()
        .duration(150)
        .attr('stroke-opacity', linkData => {
          const isConnected = linkData.source.id === d.id || linkData.target.id === d.id;
          if (isConnected) {
            const strength = linkData.strength || 0.5;
            return 0.8 + (strength * 0.2); // Boost to 0.8-1.0
          }
          return (linkData.strength || 0.5) * 0.3; // Dim others
        })
        .attr('stroke-width', linkData => {
          const isConnected = linkData.source.id === d.id || linkData.target.id === d.id;
          const strength = linkData.strength || 0.5;
          if (isConnected) {
            return 2 + (strength * 4); // Thicker: 2-6px
          }
          return 1 + (strength * 3); // Normal
        });
    })
    .on('mouseleave', function(event, d) {
      const isSelected = selectedNode && selectedNode.id === d.id;
      const circle = d3.select(this).select('circle');
      const text = d3.select(this).select('text');

      const baseSize = GRAPH_CONFIG.DEFAULT_NODE_SIZE;
      const degreeBonus = Math.sqrt(d.degree || 0) * 2;
      const highlightBonus = isHighlighted(d) ? 3 : 0;
      const normalRadius = baseSize + degreeBonus + highlightBonus;

      // Restore node
      circle
        .transition()
        .duration(150)
        .attr('opacity', 0.9)
        .attr('stroke-width', isSelected ? 3 : 1.5)
        .attr('r', normalRadius);

      text
        .transition()
        .duration(150)
        .attr('font-size', isHighlighted(d) ? '13px' : '12px')
        .attr('font-weight', isHighlighted(d) ? '600' : '500')
        .attr('fill', isDimmed(d) ? '#666' : '#e0e0e0');

      // Restore links to normal
      link
        .transition()
        .duration(150)
        .attr('stroke-opacity', linkData => {
          const strength = linkData.strength || 0.5;
          return 0.3 + (strength * 0.6);
        })
        .attr('stroke-width', linkData => {
          const strength = linkData.strength || 0.5;
          return 1 + (strength * 3);
        });
    })
    .on('click', (event, d) => {
      event.stopPropagation();
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // Add title tooltips
    node.append('title')
      .text(d => {
        return `${d.name}\nType: ${d.type}\nTopic: ${d.topic}\nConnections: ${d.degree || 0}`;
      });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      // Position relationship labels at the center of links
      linkLabels
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Initial zoom to fit
    const initialScale = 0.9;
    svg.call(zoom.transform, d3.zoomIdentity.scale(initialScale));
  };

  const drag = (simulation) => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  return (
    <div className="knowledge-graph-container" style={{ width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: 'block' }}
      />
    </div>
  );
}

export default KnowledgeGraph;
