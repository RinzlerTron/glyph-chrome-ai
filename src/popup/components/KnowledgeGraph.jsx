import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GRAPH_CONFIG, ENTITY_TYPES } from '../../utils/constants.js';

function KnowledgeGraph({ data, selectedNode, onNodeClick }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Entity type colors
  const colorScale = {
    [ENTITY_TYPES.PERSON]: '#3b82f6',
    [ENTITY_TYPES.COMPANY]: '#8b5cf6',
    [ENTITY_TYPES.TECHNOLOGY]: '#10b981',
    [ENTITY_TYPES.CONCEPT]: '#f59e0b'
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
  }, [data, dimensions, selectedNode]);

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
      .text('Capture an article to start building your knowledge graph');
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

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(GRAPH_CONFIG.FORCE_DISTANCE))
      .force('charge', d3.forceManyBody()
        .strength(GRAPH_CONFIG.FORCE_STRENGTH))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide()
        .radius(GRAPH_CONFIG.COLLISION_RADIUS));

    simulationRef.current = simulation;

    // Create links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', d => Math.sqrt(d.strength || 1) * GRAPH_CONFIG.LINK_WIDTH);

    // Create node groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => {
        const baseSize = GRAPH_CONFIG.DEFAULT_NODE_SIZE;
        const degreeBonus = Math.sqrt(d.degree || 0) * 2;
        return baseSize + degreeBonus;
      })
      .attr('fill', d => colorScale[d.type] || '#6b7280')
      .attr('stroke', d => selectedNode && selectedNode.id === d.id ? '#1f2937' : '#fff')
      .attr('stroke-width', d => selectedNode && selectedNode.id === d.id ? 3 : 1.5)
      .attr('opacity', 0.9)
      .style('cursor', 'pointer');

    // Add labels to nodes
    node.append('text')
      .text(d => d.name)
      .attr('x', 12)
      .attr('y', 4)
      .attr('font-size', '11px')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .attr('fill', '#1f2937')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Add hover effects
    node.on('mouseenter', function() {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('opacity', 1)
        .attr('stroke-width', 2.5);
    })
    .on('mouseleave', function(event, d) {
      const isSelected = selectedNode && selectedNode.id === d.id;
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('opacity', 0.9)
        .attr('stroke-width', isSelected ? 3 : 1.5);
    })
    .on('click', (event, d) => {
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
