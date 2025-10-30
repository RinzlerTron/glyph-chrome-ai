/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 159:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 198:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Graph Page Styles */

.graph-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0f0f23;
  color: #e0e0e0;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: #1a1a2e;
  border-bottom: 1px solid #2d2d44;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
}

.tagline {
  font-size: 11px;
  font-weight: 500;
  color: #888;
  margin: 0;
  letter-spacing: 0.2px;
}

.stats-mini {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #888;
}

.stats-mini span {
  padding: 4px 12px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
}

.clickable-stat {
  cursor: pointer;
  transition: all 0.2s;
}

.clickable-stat:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}

/* Search Bar */
.search-bar {
  position: relative;
  flex: 0 0 300px;
}

.search-input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 20px;
  color: #e0e0e0;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #FFA726; /* Warm orange instead of purple */
  background: #323249;
  box-shadow: 0 0 0 2px rgba(255, 167, 38, 0.2); /* Subtle warm glow */
}

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 5px;
}

.tabs button {
  padding: 10px 20px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.tabs button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #e0e0e0;
}

.tabs button.active {
  background: #667eea;
  color: white;
}

/* Articles Button */
.articles-button {
  padding: 10px 18px;
  background: rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #a5b4fc;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  margin-right: 15px;
  white-space: nowrap;
}

.articles-button:hover {
  background: rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

.graph-container {
  flex: 1;
  position: relative;
}

/* Sidebars */
.sidebar-left {
  width: 350px;
  background: #1a1a2e;
  border-right: 1px solid #2d2d44;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-right {
  width: 420px;
  background: #1a1a2e;
  border-left: 1px solid #2d2d44;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-height: 100%;
}

.sidebar {
  width: 350px;
  background: #1a1a2e;
  border-left: 1px solid #2d2d44;
  overflow-y: auto;
}

/* Chat Query */
.chat-container {
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

.chat-toggle {
  padding: 15px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.2s;
}

.chat-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.chat-query {
  width: 400px;
  background: #1a1a2e;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: #2d2d44;
  border-bottom: 1px solid #3d3d5c;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  flex: 1;
}

.privacy-badge {
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #a78bfa;
  white-space: nowrap;
  cursor: help;
}

.chat-close {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  width: 30px;
  height: 30px;
}

.chat-close:hover {
  color: #e0e0e0;
}

.chat-body {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.chat-answer {
  background: rgba(102, 126, 234, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.chat-answer strong {
  display: block;
  margin-bottom: 8px;
  color: #667eea;
}

.chat-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  color: #888;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.chat-form {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  background: #2d2d44;
}

.chat-form input {
  flex: 1;
  padding: 10px 15px;
  background: #1a1a2e;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
}

.chat-form input:focus {
  outline: none;
  border-color: #667eea;
}

.chat-form button {
  padding: 10px 20px;
  background: #667eea;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-form button:not(:disabled):hover {
  background: #764ba2;
}

.chat-examples {
  padding: 15px 20px;
  border-top: 1px solid #3d3d5c;
}

.chat-examples p {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.chat-examples button {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid #3d3d5c;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.chat-examples button:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.chat-suggestions {
  padding: 15px 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  margin: 10px 20px;
}

.suggestion-button {
  display: block;
  width: 100%;
  padding: 10px 12px;
  margin: 8px 0;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid #3d3d5c;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  line-height: 1.4;
}

.suggestion-button:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: #667eea;
  transform: translateX(3px);
}

/* Insights Container */
.insights-container {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.insight-panel h2 {
  font-size: 32px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.insight-card {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 25px;
}

.insight-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #e0e0e0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #2d2d44;
  border-radius: 8px;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #a78bfa;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 13px;
  color: #888;
}

.entity-types,
.top-entities {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.type-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 15px;
  background: rgba(102, 126, 234, 0.03);
  border-radius: 8px;
  margin-bottom: 10px;
}

.type-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

.type-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.entity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #2d2d44;
  border-radius: 8px;
}

.type-name,
.entity-name {
  font-size: 15px;
  color: #e0e0e0;
  text-transform: capitalize;
}

.type-count,
.entity-connections {
  font-size: 14px;
  font-weight: 600;
  color: #a78bfa;
}

/* Settings Container */
.settings-container {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  max-width: 800px;
  margin: 0 auto;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.empty-content h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.empty-content p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.empty-actions button {
  padding: 15px 30px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading p {
  margin-top: 20px;
  font-size: 18px;
}

/* Responsive */
@media (max-width: 1200px) {
  .sidebar {
    width: 300px;
  }

  .chat-query {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    gap: 15px;
  }

  .search-bar {
    flex: 1 0 100%;
  }

  .sidebar {
    position: absolute;
    right: 0;
    height: 100%;
    z-index: 50;
  }

  .chat-query {
    width: 100%;
    max-width: 350px;
  }
}

/* Settings Panel */
.settings-panel {
  color: #e0e0e0;
}

.settings-panel h2 {
  font-size: 32px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-section {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
}

.settings-section h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #e0e0e0;
}

.section-description {
  color: #888;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.topics-horizontal {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.topic-input-horizontal {
  flex: 1;
  min-width: 120px;
  padding: 12px 15px;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;
}

.topic-input-horizontal::placeholder {
  color: #666;
  text-align: center;
}

.topic-input-horizontal:focus {
  outline: none;
  border-color: #667eea;
  background: #323249;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.topic-input-horizontal:hover {
  border-color: #667eea;
}

.save-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.mock-data-button {
  padding: 10px 20px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.mock-data-button:hover {
  background: rgba(102, 126, 234, 0.2);
}

.settings-row {
  display: flex;
  gap: 30px;
  margin-top: 15px;
}

.setting-item {
  flex: 1;
}

.setting-label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.setting-description {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
  line-height: 1.4;
}

.setting-select {
  width: 100%;
  padding: 10px 14px;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.setting-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.setting-select:hover {
  border-color: #667eea;
}

.danger-button {
  padding: 10px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #f87171;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.danger-button:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #f87171;
  transform: translateY(-1px);
}

.dev-section {
  border-color: rgba(255, 165, 0, 0.3);
}

/* Toggle Switch */
.toggle-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3d3d5c;
  transition: 0.3s;
  border-radius: 26px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.toggle-switch input:checked + .toggle-slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.toggle-label {
  font-size: 14px;
  font-weight: 600;
  color: #888;
}

/* Radio Group for Settings */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #3d3d5c;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-option:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.radio-option.active {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 0 0 1px rgba(102, 126, 234, 0.2);
}

.radio-option input[type="radio"] {
  margin-top: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
}

.radio-content {
  flex: 1;
}

.radio-label {
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 4px;
}

.radio-option.active .radio-label {
  color: #ffffff;
}

.radio-description {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
}

.radio-option.active .radio-description {
  color: #b8b8d1;
}

/* Articles List Panel */
.articles-list-panel {
  background: #1a1a2e;
  border-left: 1px solid #2d2d44;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.articles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2d2d44;
}

.articles-header h3 {
  margin: 0;
  font-size: 18px;
  color: #e0e0e0;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e0e0e0;
}

.articles-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.no-articles {
  text-align: center;
  color: #888;
  margin-top: 40px;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-card {
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.article-card:hover {
  border-color: #667eea;
  transform: translateX(5px);
}

.article-card.selected {
  border-color: #a78bfa;
  border-width: 2px;
  background: rgba(167, 139, 250, 0.1);
}

.article-card.selected::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px 0 0 12px;
}

.article-title {
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 10px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.article-entities {
  color: #a78bfa;
}

.article-link {
  display: inline-block;
  font-size: 13px;
  color: #667eea;
  text-decoration: none;
  margin-top: 5px;
  transition: color 0.2s;
}

.article-link:hover {
  color: #a78bfa;
}

.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #3d3d5c;
}

.article-delete {
  padding: 6px 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  color: #f87171;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.article-delete:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #f87171;
}

/* View Toggle */
.view-toggle {
  display: flex;
  gap: 5px;
  margin-right: 15px;
  background: #2d2d44;
  padding: 4px;
  border-radius: 8px;
}

.view-toggle button {
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.view-toggle button.active {
  background: #667eea;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.view-toggle button:hover:not(.active) {
  color: #e0e0e0;
  background: rgba(102, 126, 234, 0.1);
}

/* List View */
.list-view-container {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.list-view-container h2 {
  font-size: 32px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.list-view-header {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-view-header span {
  color: #888;
  font-size: 14px;
}

.list-view-header strong {
  color: #a78bfa;
  font-size: 16px;
}

.entities-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
}

.entity-list-item {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 8px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.entity-list-item:hover {
  border-color: #667eea;
  transform: translateX(5px);
}

.entity-list-item.selected {
  border-color: #a78bfa;
  border-width: 2px;
  background: rgba(167, 139, 250, 0.1);
}

.entity-list-name {
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.entity-list-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
}

.entity-list-type {
  color: #888;
  text-transform: capitalize;
}

.entity-list-connections {
  color: #a78bfa;
  font-weight: 600;
}

/* NodeDetails Enhancements */
.node-context {
  font-size: 14px;
  line-height: 1.6;
  color: #b8b8d1;
  background: rgba(102, 126, 234, 0.05);
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.source-articles-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.source-article-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid #2d2d44;
  border-radius: 8px;
  transition: all 0.2s;
}

.source-article-item:hover {
  border-color: #667eea;
  transform: translateX(3px);
}

.source-article-link {
  font-size: 13px;
  color: #a78bfa;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.4;
}

.source-article-link:hover {
  color: #c4b5fd;
  text-decoration: underline;
}

.source-article-date {
  font-size: 12px;
  color: #888;
}

.source-articles-more {
  text-align: center;
  padding: 8px;
  color: #888;
  font-size: 12px;
  font-style: italic;
}

.relationships-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.relationship-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid #2d2d44;
  border-radius: 6px;
  gap: 10px;
}

.relationship-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.relationship-type {
  font-size: 11px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.relationship-entity {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 500;
}

.relationship-strength {
  font-size: 13px;
  color: #a78bfa;
  font-weight: 700;
  min-width: 40px;
  text-align: right;
}

.relationships-more {
  text-align: center;
  padding: 8px;
  color: #888;
  font-size: 12px;
  font-style: italic;
  margin-top: 5px;
}

/* Clickable entity in insights */
.clickable-entity {
  transition: all 0.2s;
  border-radius: 8px;
  padding: 12px !important;
}

.clickable-entity:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: translateX(5px);
  border-left: 3px solid #667eea;
}

/* Articles View Toggle */
.articles-view-toggle {
  display: flex;
  gap: 5px;
  padding: 10px 20px;
  border-bottom: 1px solid #2d2d44;
  background: #1a1a2e;
}

.articles-view-toggle button {
  flex: 1;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  color: #888;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.articles-view-toggle button:hover {
  border-color: #667eea;
  color: #e0e0e0;
}

.articles-view-toggle button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: #fff;
}

/* Timeline Layout */
.articles-timeline {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.article-timeline-item {
  display: flex;
  gap: 15px;
  position: relative;
}

.timeline-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  flex-shrink: 0;
  padding-top: 20px;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3d3d5c;
  border: 3px solid #2d2d44;
  z-index: 2;
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;
}

.timeline-dot-connected {
  background: #667eea;
  border-color: #a78bfa;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.timeline-dot-connected:hover {
  background: #a78bfa;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(167, 139, 250, 0.8);
}

.timeline-dot-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #667eea;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 10px;
  border: 2px solid #1a1a2e;
  min-width: 18px;
  text-align: center;
}

.timeline-line {
  width: 3px;
  flex: 1;
  background: #3d3d5c;
  margin-top: 5px;
  min-height: 40px;
  border-radius: 2px;
  transition: all 0.2s;
}

.timeline-line-strong {
  background: linear-gradient(180deg, #10b981 0%, #059669 100%);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.timeline-line-moderate {
  background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.timeline-line-weak {
  background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.4);
}

.timeline-line-minimal {
  background: #3d3d5c;
}

/* Clustered Articles View */
.articles-clusters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
}

.cluster-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #3d3d5c 50%, transparent 100%);
  margin: 10px 0;
}

.article-cluster {
  background: rgba(45, 45, 68, 0.3);
  border: 1px solid #3d3d5c;
  border-radius: 12px;
  overflow: hidden;
}

.cluster-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #2d2d44;
  cursor: pointer;
  transition: all 0.2s;
}

.cluster-header:hover {
  background: #3d3d5c;
}

.cluster-toggle {
  font-size: 12px;
  color: #888;
  min-width: 12px;
}

.cluster-name {
  flex: 1;
  font-size: 15px;
  font-weight: 700;
  color: #e0e0e0;
}

.cluster-strength {
  font-size: 12px;
  color: #FFA726; /* Warm orange - breaks the purple monotone */
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(255, 167, 38, 0.15); /* Warm orange background */
  border-radius: 12px;
  cursor: pointer; /* Make it feel interactive */
  transition: all 0.2s ease;
  border: 1px solid rgba(167, 139, 250, 0.3);
}

.cluster-articles {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Connection Modal */
.connection-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.connection-modal {
  background: #1a1a2e;
  border: 1px solid #3d3d5c;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.connection-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2d2d44;
}

.connection-modal-header h4 {
  margin: 0;
  font-size: 18px;
  color: #e0e0e0;
}

.connection-modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.connection-articles {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #2d2d44;
  border-radius: 12px;
}

.connection-article-name {
  flex: 1;
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 600;
  line-height: 1.4;
}

.connection-arrow {
  font-size: 20px;
  color: #667eea;
  font-weight: 700;
}

.shared-entities-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shared-entity-item {
  padding: 12px 15px;
  background: #2d2d44;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  font-size: 14px;
  color: #e0e0e0;
  transition: all 0.2s;
}

.shared-entity-item:hover {
  background: #3d3d5c;
  border-left-color: #a78bfa;
  transform: translateX(5px);
}

.connection-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #2d2d44;
}

.btn-secondary {
  padding: 10px 24px;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #3d3d5c;
  border-color: #667eea;
  color: #fff;
}

/* Article Entities Panel (Right Sidebar) */
.article-entities-panel {
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border-top: 1px solid #2d2d44;
  flex: 1;
  overflow-y: auto;
}

.article-entities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2d2d44;
}

.article-entities-header h3 {
  margin: 0;
  font-size: 16px;
  color: #e0e0e0;
  font-weight: 700;
}

.article-entities-title {
  padding: 15px 20px;
  font-size: 14px;
  color: #a78bfa;
  font-weight: 600;
  line-height: 1.4;
  border-bottom: 1px solid #2d2d44;
  background: rgba(167, 139, 250, 0.05);
}

.article-entities-count {
  padding: 10px 20px;
  font-size: 12px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.article-entities-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px 20px;
}

.entity-type-group {
  margin-bottom: 25px;
}

.entity-type-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.entity-type-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.entity-type-label {
  font-size: 12px;
  color: #888;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.entity-type-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.entity-list-item-clickable {
  padding: 10px 12px;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entity-list-item-clickable:hover {
  background: #3d3d5c;
  border-color: #667eea;
  transform: translateX(5px);
}

.entity-list-item-clickable .entity-name {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 500;
  flex: 1;
}

.entity-list-item-clickable .entity-connections {
  font-size: 11px;
  color: #67e8f9;
  font-weight: 600;
  padding: 2px 8px;
  background: rgba(103, 232, 249, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(103, 232, 249, 0.3);
}

/* Knowledge Navigator */
.navigator-trigger-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 15px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.navigator-trigger-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
}

.navigator-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s;
}

.navigator-modal {
  background: #1a1a2e;
  border: 1px solid #3d3d5c;
  border-radius: 16px;
  max-width: 700px;
  width: 90%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  animation: slideUp 0.3s;
}

.navigator-header {
  padding: 25px 30px;
  border-bottom: 1px solid #2d2d44;
  position: relative;
}

.navigator-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #e0e0e0;
  font-weight: 700;
}

.navigator-subtitle {
  margin: 0;
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.navigator-body {
  padding: 30px;
  overflow-y: auto;
  flex: 1;
}

.navigator-inputs {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 25px;
}

.navigator-input-group {
  flex: 1;
  position: relative;
}

.navigator-input-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.navigator-input-group input {
  width: 100%;
  padding: 12px 15px;
  background: #2d2d44;
  border: 2px solid #3d3d5c;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 15px;
  transition: all 0.2s;
}

.navigator-input-group input:focus {
  outline: none;
  border-color: #667eea;
  background: #3d3d5c;
}

.navigator-input-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.navigator-arrow {
  font-size: 28px;
  color: #667eea;
  font-weight: 700;
  margin-top: 32px;
}

.navigator-autocomplete {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.navigator-autocomplete-item {
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #3d3d5c;
}

.navigator-autocomplete-item:last-child {
  border-bottom: none;
}

.navigator-autocomplete-item:hover {
  background: #3d3d5c;
}

.navigator-autocomplete-empty {
  padding: 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
}

.entity-type-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.entity-type-label {
  margin-left: auto;
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
}

.navigator-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.navigator-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.navigator-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
}

.navigator-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
}

.navigator-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.navigator-btn-secondary {
  background: #2d2d44;
  border: 1px solid #3d3d5c;
  color: #e0e0e0;
}

.navigator-btn-secondary:hover {
  background: #3d3d5c;
  border-color: #667eea;
}

.navigator-error {
  padding: 15px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #f87171;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.navigator-result {
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.navigator-result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
}

.navigator-result-header h3 {
  margin: 0;
  font-size: 18px;
  color: #e0e0e0;
  font-weight: 700;
}

.navigator-result-stats {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  color: #888;
}

.navigator-path {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.navigator-step {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.navigator-step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.navigator-step-content {
  flex: 1;
}

.navigator-step-entity {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #2d2d44;
  border-radius: 8px;
  margin-bottom: 10px;
}

.navigator-step-name {
  font-size: 15px;
  color: #e0e0e0;
  font-weight: 600;
  flex: 1;
}

.navigator-step-type {
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
}

.navigator-step-relationship {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
  color: #888;
  font-size: 13px;
}

.relationship-arrow {
  font-size: 18px;
  color: #667eea;
}

.relationship-label {
  flex: 1;
  color: #a78bfa;
  font-weight: 600;
}

.relationship-strength {
  color: #34d399;
  font-weight: 700;
}

/* Timeline Styles */
.graph-container.with-timeline {
  display: flex;
  flex-direction: column;
}

.graph-container.with-timeline > canvas,
.graph-container.with-timeline > svg {
  flex: 1;
  min-height: 0;
}

.timeline-always-visible {
  background: linear-gradient(to top, #0f1419 0%, #1a1f2e 100%);
  border-top: 1px solid rgba(102, 126, 234, 0.2);
  padding: 20px 30px;
  height: 120px;
  display: flex;
  gap: 30px;
  align-items: center;
}

.timeline-left {
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 30px;
  border-right: 1px solid rgba(102, 126, 234, 0.2);
}

.timeline-article-title {
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.timeline-article-meta {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.timeline-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-slider-track {
  position: relative;
  width: 100%;
  height: 30px;
  margin-bottom: 4px;
}

.timeline-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #667eea;
  border: 2px solid #1a1f2e;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
  transition: all 0.2s ease;
  cursor: pointer;
  z-index: 2;
}

.timeline-dot:hover {
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
  z-index: 3;
}

.timeline-dot.focused {
  background: #fbbf24;
  box-shadow: 0 0 16px rgba(251, 191, 36, 0.8);
  transform: translate(-50%, -50%) scale(1.5);
  z-index: 4;
}

.timeline-slider-range {
  width: 100%;
  height: 6px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.timeline-slider-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
}

.timeline-slider-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
}

.timeline-slider-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
}

.timeline-slider-range::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
}

.timeline-labels-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #888;
}

.timeline-label {
  font-weight: 500;
}

.timeline-position {
  font-size: 12px;
  color: #a78bfa;
  font-weight: 600;
}

/* Processing Article States */
.article-card-processing {
  opacity: 0.7;
  background: rgba(99, 102, 241, 0.03);
  border-color: rgba(99, 102, 241, 0.2);
}

.timeline-dot-processing {
  background: var(--color-primary);
  border: 2px solid var(--color-primary);
  animation: processingPulse 1.5s ease-in-out infinite;
}

.processing-spinner {
  width: 8px;
  height: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.processing-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.processing-message {
  font-size: 13px;
  color: var(--color-primary);
  font-style: italic;
  font-weight: 500;
}

.processing-indicator {
  display: flex;
  align-items: center;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #FFA726; /* Subtle warm orange - just a hint */
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes processingPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
`, "",{"version":3,"sources":["webpack://./src/graph-page/styles.css"],"names":[],"mappings":"AAAA,sBAAsB;;AAEtB;EACE,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,cAAc;AAChB;;AAEA,WAAW;AACX;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,kBAAkB;EAClB,mBAAmB;EACnB,gCAAgC;EAChC,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,6DAA6D;EAC7D,6BAA6B;EAC7B,oCAAoC;EACpC,qBAAqB;EACrB,SAAS;EACT,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,eAAe;EACf,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,oCAAoC;EACpC,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,2BAA2B;AAC7B;;AAEA,eAAe;AACf;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,4BAA4B;EAC5B,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,cAAc;EACd,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,qBAAqB,EAAE,kCAAkC;EACzD,mBAAmB;EACnB,6CAA6C,EAAE,qBAAqB;AACtE;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,2BAA2B;EAC3B,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,eAAe;EACf,YAAY;AACd;;AAEA,SAAS;AACT;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,YAAY;AACd;;AAEA,oBAAoB;AACpB;EACE,kBAAkB;EAClB,qCAAqC;EACrC,0CAA0C;EAC1C,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;EACrC,sCAAsC;EACtC,2BAA2B;EAC3B,8CAA8C;AAChD;;AAEA,iBAAiB;AACjB;EACE,OAAO;EACP,aAAa;EACb,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,OAAO;EACP,kBAAkB;AACpB;;AAEA,aAAa;AACb;EACE,YAAY;EACZ,mBAAmB;EACnB,+BAA+B;EAC/B,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,8BAA8B;EAC9B,aAAa;EACb,sBAAsB;EACtB,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;AAClB;;AAEA,eAAe;AACf;EACE,kBAAkB;EAClB,aAAa;EACb,SAAS;EACT,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,6DAA6D;EAC7D,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,+CAA+C;EAC/C,oBAAoB;AACtB;;AAEA;EACE,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,mBAAmB;EACnB,sCAAsC;EACtC,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,SAAS;EACT,kBAAkB;EAClB,mBAAmB;EACnB,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,OAAO;AACT;;AAEA;EACE,iBAAiB;EACjB,oCAAoC;EACpC,0CAA0C;EAC1C,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,eAAe;EACf,UAAU;EACV,WAAW;EACX,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;EACpC,aAAa;EACb,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,aAAa;EACb,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,0CAA0C;EAC1C,yBAAyB;EACzB,kBAAkB;EAClB,kCAAkC;AACpC;;AAEA;EACE,KAAK,yBAAyB,EAAE;AAClC;;AAEA;EACE,aAAa;EACb,SAAS;EACT,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,aAAa;EACb,oCAAoC;EACpC,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,qCAAqC;EACrC,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,oCAAoC;EACpC,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,oBAAoB;EACpB,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;EACpC,qBAAqB;EACrB,0BAA0B;AAC5B;;AAEA,uBAAuB;AACvB;EACE,OAAO;EACP,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,6DAA6D;EAC7D,6BAA6B;EAC7B,oCAAoC;EACpC,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,kBAAkB;EAClB,qCAAqC;EACrC,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,WAAW;EACX,qCAAqC;EACrC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;;EAEE,eAAe;EACf,cAAc;EACd,0BAA0B;AAC5B;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA,uBAAuB;AACvB;EACE,OAAO;EACP,aAAa;EACb,gBAAgB;EAChB,gBAAgB;EAChB,cAAc;AAChB;;AAEA,gBAAgB;AAChB;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,cAAc;EACd,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,2BAA2B;EAC3B,sCAAsC;AACxC;;AAEA,YAAY;AACZ;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,uCAAuC;EACvC,uBAAuB;EACvB,kBAAkB;EAClB,kCAAkC;AACpC;;AAEA;EACE,gBAAgB;EAChB,eAAe;AACjB;;AAEA,eAAe;AACf;EACE;IACE,YAAY;EACd;;EAEA;IACE,YAAY;EACd;AACF;;AAEA;EACE;IACE,eAAe;IACf,SAAS;EACX;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,kBAAkB;IAClB,QAAQ;IACR,YAAY;IACZ,WAAW;EACb;;EAEA;IACE,WAAW;IACX,gBAAgB;EAClB;AACF;;AAEA,mBAAmB;AACnB;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,6DAA6D;EAC7D,6BAA6B;EAC7B,oCAAoC;EACpC,qBAAqB;AACvB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,eAAe;EACf,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,8CAA8C;AAChD;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,kBAAkB;EAClB,oCAAoC;EACpC,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,aAAa;EACb,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,WAAW;EACX,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,8CAA8C;AAChD;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,kCAAkC;EAClC,wCAAwC;EACxC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,kCAAkC;EAClC,qBAAqB;EACrB,2BAA2B;AAC7B;;AAEA;EACE,oCAAoC;AACtC;;AAEA,kBAAkB;AAClB;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;EACV,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,WAAW;EACX,SAAS;EACT,WAAW;EACX,uBAAuB;EACvB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,6DAA6D;AAC/D;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,WAAW;AACb;;AAEA,6BAA6B;AAC7B;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;EACT,aAAa;EACb,qCAAqC;EACrC,yBAAyB;EACzB,mBAAmB;EACnB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;EACrB,qCAAqC;AACvC;;AAEA;EACE,qBAAqB;EACrB,oCAAoC;EACpC,8CAA8C;AAChD;;AAEA;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,cAAc;AAChB;;AAEA,wBAAwB;AACxB;EACE,mBAAmB;EACnB,8BAA8B;EAC9B,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,eAAe;EACf,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,oBAAoB;EACpB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,0BAA0B;AAC5B;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,oCAAoC;AACtC;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,SAAS;EACT,UAAU;EACV,6DAA6D;EAC7D,4BAA4B;AAC9B;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,eAAe;EACf,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,cAAc;EACd,qBAAqB;EACrB,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,6BAA6B;AAC/B;;AAEA;EACE,iBAAiB;EACjB,kCAAkC;EAClC,wCAAwC;EACxC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,kCAAkC;EAClC,qBAAqB;AACvB;;AAEA,gBAAgB;AAChB;EACE,aAAa;EACb,QAAQ;EACR,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,oBAAoB;EACpB,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,8CAA8C;AAChD;;AAEA;EACE,cAAc;EACd,oCAAoC;AACtC;;AAEA,cAAc;AACd;EACE,OAAO;EACP,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,6DAA6D;EAC7D,6BAA6B;EAC7B,oCAAoC;EACpC,qBAAqB;AACvB;;AAEA;EACE,oCAAoC;EACpC,0CAA0C;EAC1C,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,+BAA+B;EAC/B,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;EACrB,0BAA0B;AAC5B;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,oCAAoC;AACtC;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA,6BAA6B;AAC7B;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,qCAAqC;EACrC,aAAa;EACb,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,aAAa;EACb,qCAAqC;EACrC,yBAAyB;EACzB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;EACrB,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,cAAc;EACd,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,qCAAqC;EACrC,yBAAyB;EACzB,kBAAkB;EAClB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,OAAO;AACT;;AAEA;EACE,eAAe;EACf,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,eAAe;AACjB;;AAEA,iCAAiC;AACjC;EACE,oBAAoB;EACpB,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,qCAAqC;EACrC,0BAA0B;EAC1B,8BAA8B;AAChC;;AAEA,yBAAyB;AACzB;EACE,aAAa;EACb,QAAQ;EACR,kBAAkB;EAClB,gCAAgC;EAChC,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,kBAAkB;EAClB,uBAAuB;EACvB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,6DAA6D;EAC7D,yBAAyB;EACzB,WAAW;AACb;;AAEA,oBAAoB;AACpB;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,WAAW;EACX,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,UAAU;EACV,oBAAoB;EACpB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,eAAe;EACf,6CAA6C;AAC/C;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,6CAA6C;AAC/C;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,mBAAmB;EACnB,WAAW;EACX,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;EACzB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,OAAO;EACP,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,6DAA6D;EAC7D,2CAA2C;AAC7C;;AAEA;EACE,6DAA6D;EAC7D,2CAA2C;AAC7C;;AAEA;EACE,6DAA6D;EAC7D,2CAA2C;AAC7C;;AAEA;EACE,mBAAmB;AACrB;;AAEA,4BAA4B;AAC5B;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,iFAAiF;EACjF,cAAc;AAChB;;AAEA;EACE,iCAAiC;EACjC,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,OAAO;EACP,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc,EAAE,6CAA6C;EAC7D,gBAAgB;EAChB,iBAAiB;EACjB,oCAAoC,EAAE,2BAA2B;EACjE,mBAAmB;EACnB,eAAe,EAAE,6BAA6B;EAC9C,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA,qBAAqB;AACrB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,cAAc;EACd,sBAAsB;AACxB;;AAEA;EACE,OAAO,UAAU,EAAE;EACnB,KAAK,UAAU,EAAE;AACnB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;EAChB,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,uBAAuB;AACzB;;AAEA;EACE;IACE,2BAA2B;IAC3B,UAAU;EACZ;EACA;IACE,wBAAwB;IACxB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,2BAA2B;IAC3B,UAAU;EACZ;EACA;IACE,wBAAwB;IACxB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,wBAAwB;IACxB,UAAU;EACZ;EACA;IACE,2BAA2B;IAC3B,UAAU;EACZ;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,mBAAmB;EACnB,aAAa;EACb,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,8BAA8B;EAC9B,eAAe;EACf,cAAc;EACd,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,0BAA0B;EAC1B,0BAA0B;AAC5B;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,SAAS;EACT,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,WAAW;AACb;;AAEA,2CAA2C;AAC3C;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,UAAU;EACV,6BAA6B;EAC7B,OAAO;EACP,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gCAAgC;EAChC,qCAAqC;AACvC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,oBAAoB;EACpB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,oCAAoC;EACpC,mBAAmB;EACnB,0CAA0C;AAC5C;;AAEA,wBAAwB;AACxB;EACE,kBAAkB;EAClB,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;EACpB,iBAAiB;EACjB,8CAA8C;AAChD;;AAEA;EACE,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,cAAc;EACd,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;EAChB,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,SAAS;EACT,eAAe;EACf,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,QAAQ;EACR,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,YAAY;EACZ,0CAA0C;AAC5C;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,eAAe;EACf,oBAAoB;EACpB,gCAAgC;AAClC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,WAAW;EACX,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;EACpB,YAAY;AACd;;AAEA;EACE,6DAA6D;EAC7D,YAAY;EACZ,OAAO;AACT;;AAEA;EACE,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,kCAAkC;EAClC,wCAAwC;EACxC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;EACrC,0CAA0C;EAC1C,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,iDAAiD;AACnD;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,6DAA6D;EAC7D,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,eAAe;EACf,WAAW;EACX,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA,oBAAoB;AACpB;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;;EAEE,OAAO;EACP,aAAa;AACf;;AAEA;EACE,6DAA6D;EAC7D,8CAA8C;EAC9C,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,mBAAmB;EACnB,gDAAgD;AAClD;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,uBAAuB;EACvB,oBAAoB;EACpB,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,eAAe;EACf,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,gCAAgC;EAChC,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,8CAA8C;EAC9C,yBAAyB;EACzB,eAAe;EACf,UAAU;AACZ;;AAEA;EACE,2CAA2C;EAC3C,+CAA+C;EAC/C,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,4CAA4C;EAC5C,2CAA2C;EAC3C,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,WAAW;EACX,oCAAoC;EACpC,kBAAkB;EAClB,aAAa;EACb,wBAAwB;EACxB,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,wCAAwC;EACxC,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,+CAA+C;AACjD;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,wCAAwC;EACxC,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,+CAA+C;AACjD;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA,8BAA8B;AAC9B;EACE,YAAY;EACZ,oCAAoC;EACpC,qCAAqC;AACvC;;AAEA;EACE,gCAAgC;EAChC,sCAAsC;EACtC,oDAAoD;AACtD;;AAEA;EACE,UAAU;EACV,WAAW;EACX,0CAA0C;EAC1C,2BAA2B;EAC3B,kBAAkB;EAClB,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,2BAA2B;EAC3B,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB,EAAE,qCAAqC;EAC1D,kBAAkB;EAClB,0CAA0C;AAC5C;;AAEA;EACE;IACE,YAAY;IACZ,mBAAmB;EACrB;EACA;IACE,UAAU;IACV,qBAAqB;EACvB;AACF;;AAEA;EACE,KAAK,uBAAuB,EAAE;EAC9B,OAAO,yBAAyB,EAAE;AACpC;;AAEA;EACE;IACE,YAAY;IACZ,mBAAmB;EACrB;EACA;IACE,UAAU;IACV,qBAAqB;EACvB;AACF","sourcesContent":["/* Graph Page Styles */\n\n.graph-page {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  background: #0f0f23;\n  color: #e0e0e0;\n}\n\n/* Header */\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px 30px;\n  background: #1a1a2e;\n  border-bottom: 1px solid #2d2d44;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.3);\n}\n\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.logo-container {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.logo {\n  font-size: 28px;\n  font-weight: 800;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin: 0;\n  line-height: 1;\n}\n\n.tagline {\n  font-size: 11px;\n  font-weight: 500;\n  color: #888;\n  margin: 0;\n  letter-spacing: 0.2px;\n}\n\n.stats-mini {\n  display: flex;\n  gap: 15px;\n  font-size: 14px;\n  color: #888;\n}\n\n.stats-mini span {\n  padding: 4px 12px;\n  background: rgba(102, 126, 234, 0.1);\n  border-radius: 12px;\n}\n\n.clickable-stat {\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.clickable-stat:hover {\n  background: rgba(102, 126, 234, 0.2);\n  transform: translateY(-1px);\n}\n\n/* Search Bar */\n.search-bar {\n  position: relative;\n  flex: 0 0 300px;\n}\n\n.search-input {\n  width: 100%;\n  padding: 10px 35px 10px 15px;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 20px;\n  color: #e0e0e0;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #FFA726; /* Warm orange instead of purple */\n  background: #323249;\n  box-shadow: 0 0 0 2px rgba(255, 167, 38, 0.2); /* Subtle warm glow */\n}\n\n.search-clear {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  color: #888;\n  cursor: pointer;\n  font-size: 16px;\n  padding: 5px;\n}\n\n/* Tabs */\n.tabs {\n  display: flex;\n  gap: 5px;\n}\n\n.tabs button {\n  padding: 10px 20px;\n  background: transparent;\n  border: none;\n  color: #888;\n  cursor: pointer;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n\n.tabs button:hover {\n  background: rgba(102, 126, 234, 0.1);\n  color: #e0e0e0;\n}\n\n.tabs button.active {\n  background: #667eea;\n  color: white;\n}\n\n/* Articles Button */\n.articles-button {\n  padding: 10px 18px;\n  background: rgba(102, 126, 234, 0.15);\n  border: 1px solid rgba(102, 126, 234, 0.3);\n  color: #a5b4fc;\n  cursor: pointer;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s;\n  margin-right: 15px;\n  white-space: nowrap;\n}\n\n.articles-button:hover {\n  background: rgba(102, 126, 234, 0.25);\n  border-color: rgba(102, 126, 234, 0.5);\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);\n}\n\n/* Main Content */\n.main-content {\n  flex: 1;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.graph-container {\n  flex: 1;\n  position: relative;\n}\n\n/* Sidebars */\n.sidebar-left {\n  width: 350px;\n  background: #1a1a2e;\n  border-right: 1px solid #2d2d44;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  flex-shrink: 0;\n}\n\n.sidebar-right {\n  width: 420px;\n  background: #1a1a2e;\n  border-left: 1px solid #2d2d44;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  max-height: 100%;\n}\n\n.sidebar {\n  width: 350px;\n  background: #1a1a2e;\n  border-left: 1px solid #2d2d44;\n  overflow-y: auto;\n}\n\n/* Chat Query */\n.chat-container {\n  position: absolute;\n  bottom: 140px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 100;\n}\n\n.chat-toggle {\n  padding: 15px 25px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 30px;\n  color: white;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);\n  transition: all 0.2s;\n}\n\n.chat-toggle:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);\n}\n\n.chat-query {\n  width: 400px;\n  background: #1a1a2e;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.4);\n  overflow: hidden;\n}\n\n.chat-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  padding: 15px 20px;\n  background: #2d2d44;\n  border-bottom: 1px solid #3d3d5c;\n}\n\n.chat-header h3 {\n  margin: 0;\n  font-size: 16px;\n  flex: 1;\n}\n\n.privacy-badge {\n  padding: 4px 10px;\n  background: rgba(102, 126, 234, 0.2);\n  border: 1px solid rgba(102, 126, 234, 0.3);\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #a78bfa;\n  white-space: nowrap;\n  cursor: help;\n}\n\n.chat-close {\n  background: none;\n  border: none;\n  color: #888;\n  cursor: pointer;\n  font-size: 20px;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n}\n\n.chat-close:hover {\n  color: #e0e0e0;\n}\n\n.chat-body {\n  padding: 20px;\n  max-height: 300px;\n  overflow-y: auto;\n}\n\n.chat-answer {\n  background: rgba(102, 126, 234, 0.1);\n  padding: 15px;\n  border-radius: 8px;\n  margin-bottom: 15px;\n}\n\n.chat-answer strong {\n  display: block;\n  margin-bottom: 8px;\n  color: #667eea;\n}\n\n.chat-loading {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 15px;\n  color: #888;\n}\n\n.spinner {\n  width: 20px;\n  height: 20px;\n  border: 3px solid rgba(102, 126, 234, 0.3);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n.chat-form {\n  display: flex;\n  gap: 10px;\n  padding: 15px 20px;\n  background: #2d2d44;\n}\n\n.chat-form input {\n  flex: 1;\n  padding: 10px 15px;\n  background: #1a1a2e;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  color: #e0e0e0;\n  font-size: 14px;\n}\n\n.chat-form input:focus {\n  outline: none;\n  border-color: #667eea;\n}\n\n.chat-form button {\n  padding: 10px 20px;\n  background: #667eea;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.chat-form button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.chat-form button:not(:disabled):hover {\n  background: #764ba2;\n}\n\n.chat-examples {\n  padding: 15px 20px;\n  border-top: 1px solid #3d3d5c;\n}\n\n.chat-examples p {\n  font-size: 12px;\n  color: #888;\n  margin-bottom: 10px;\n}\n\n.chat-examples button {\n  display: block;\n  width: 100%;\n  padding: 8px;\n  margin: 5px 0;\n  background: rgba(102, 126, 234, 0.1);\n  border: 1px solid #3d3d5c;\n  border-radius: 6px;\n  color: #e0e0e0;\n  font-size: 13px;\n  cursor: pointer;\n  text-align: left;\n  transition: all 0.2s;\n}\n\n.chat-examples button:hover {\n  background: rgba(102, 126, 234, 0.2);\n  border-color: #667eea;\n}\n\n.chat-suggestions {\n  padding: 15px 20px;\n  background: rgba(102, 126, 234, 0.05);\n  border-radius: 8px;\n  margin: 10px 20px;\n}\n\n.suggestion-button {\n  display: block;\n  width: 100%;\n  padding: 10px 12px;\n  margin: 8px 0;\n  background: rgba(102, 126, 234, 0.1);\n  border: 1px solid #3d3d5c;\n  border-radius: 6px;\n  color: #e0e0e0;\n  font-size: 13px;\n  cursor: pointer;\n  text-align: left;\n  transition: all 0.2s;\n  line-height: 1.4;\n}\n\n.suggestion-button:hover {\n  background: rgba(102, 126, 234, 0.2);\n  border-color: #667eea;\n  transform: translateX(3px);\n}\n\n/* Insights Container */\n.insights-container {\n  flex: 1;\n  padding: 40px;\n  overflow-y: auto;\n}\n\n.insight-panel h2 {\n  font-size: 32px;\n  margin-bottom: 30px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.insights-list {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.insight-card {\n  background: #1a1a2e;\n  border: 1px solid #2d2d44;\n  border-radius: 12px;\n  padding: 25px;\n}\n\n.insight-card h3 {\n  font-size: 20px;\n  margin-bottom: 15px;\n  color: #e0e0e0;\n}\n\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.stat-item {\n  text-align: center;\n  padding: 15px;\n  background: #2d2d44;\n  border-radius: 8px;\n}\n\n.stat-number {\n  font-size: 32px;\n  font-weight: bold;\n  color: #a78bfa;\n  margin-bottom: 5px;\n}\n\n.stat-label {\n  font-size: 13px;\n  color: #888;\n}\n\n.entity-types,\n.top-entities {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.type-row {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px 15px;\n  background: rgba(102, 126, 234, 0.03);\n  border-radius: 8px;\n  margin-bottom: 10px;\n}\n\n.type-info {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.type-bar {\n  width: 100%;\n  height: 6px;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.type-bar-fill {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.5s ease;\n}\n\n.entity-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 15px;\n  background: #2d2d44;\n  border-radius: 8px;\n}\n\n.type-name,\n.entity-name {\n  font-size: 15px;\n  color: #e0e0e0;\n  text-transform: capitalize;\n}\n\n.type-count,\n.entity-connections {\n  font-size: 14px;\n  font-weight: 600;\n  color: #a78bfa;\n}\n\n/* Settings Container */\n.settings-container {\n  flex: 1;\n  padding: 40px;\n  overflow-y: auto;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n/* Empty State */\n.empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  text-align: center;\n}\n\n.empty-content h1 {\n  font-size: 36px;\n  margin-bottom: 20px;\n}\n\n.empty-content p {\n  font-size: 18px;\n  opacity: 0.9;\n  margin-bottom: 30px;\n}\n\n.empty-actions button {\n  padding: 15px 30px;\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.empty-actions button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0,0,0,0.2);\n}\n\n/* Loading */\n.loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\n.loading-spinner {\n  width: 50px;\n  height: 50px;\n  border: 4px solid rgba(255,255,255,0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n.loading p {\n  margin-top: 20px;\n  font-size: 18px;\n}\n\n/* Responsive */\n@media (max-width: 1200px) {\n  .sidebar {\n    width: 300px;\n  }\n\n  .chat-query {\n    width: 350px;\n  }\n}\n\n@media (max-width: 768px) {\n  .header {\n    flex-wrap: wrap;\n    gap: 15px;\n  }\n\n  .search-bar {\n    flex: 1 0 100%;\n  }\n\n  .sidebar {\n    position: absolute;\n    right: 0;\n    height: 100%;\n    z-index: 50;\n  }\n\n  .chat-query {\n    width: 100%;\n    max-width: 350px;\n  }\n}\n\n/* Settings Panel */\n.settings-panel {\n  color: #e0e0e0;\n}\n\n.settings-panel h2 {\n  font-size: 32px;\n  margin-bottom: 30px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.settings-section {\n  background: #1a1a2e;\n  border: 1px solid #2d2d44;\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 25px;\n}\n\n.settings-section h3 {\n  font-size: 20px;\n  margin-bottom: 10px;\n  color: #e0e0e0;\n}\n\n.section-description {\n  color: #888;\n  font-size: 14px;\n  margin-bottom: 20px;\n  line-height: 1.5;\n}\n\n.topics-horizontal {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.topic-input-horizontal {\n  flex: 1;\n  min-width: 120px;\n  padding: 12px 15px;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  color: #e0e0e0;\n  font-size: 14px;\n  text-align: center;\n  transition: all 0.2s;\n}\n\n.topic-input-horizontal::placeholder {\n  color: #666;\n  text-align: center;\n}\n\n.topic-input-horizontal:focus {\n  outline: none;\n  border-color: #667eea;\n  background: #323249;\n  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n}\n\n.topic-input-horizontal:hover {\n  border-color: #667eea;\n}\n\n.save-button {\n  padding: 12px 24px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.save-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n\n.mock-data-button {\n  padding: 10px 20px;\n  background: rgba(102, 126, 234, 0.1);\n  border: 1px solid #667eea;\n  border-radius: 8px;\n  color: #667eea;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.mock-data-button:hover {\n  background: rgba(102, 126, 234, 0.2);\n}\n\n.settings-row {\n  display: flex;\n  gap: 30px;\n  margin-top: 15px;\n}\n\n.setting-item {\n  flex: 1;\n}\n\n.setting-label {\n  display: block;\n  font-size: 15px;\n  font-weight: 600;\n  color: #e0e0e0;\n  margin-bottom: 8px;\n}\n\n.setting-description {\n  font-size: 13px;\n  color: #888;\n  margin-bottom: 12px;\n  line-height: 1.4;\n}\n\n.setting-select {\n  width: 100%;\n  padding: 10px 14px;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  color: #e0e0e0;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.setting-select:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n}\n\n.setting-select:hover {\n  border-color: #667eea;\n}\n\n.danger-button {\n  padding: 10px 20px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 8px;\n  color: #f87171;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.danger-button:hover {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #f87171;\n  transform: translateY(-1px);\n}\n\n.dev-section {\n  border-color: rgba(255, 165, 0, 0.3);\n}\n\n/* Toggle Switch */\n.toggle-group {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.toggle-switch {\n  position: relative;\n  display: inline-block;\n  width: 50px;\n  height: 26px;\n}\n\n.toggle-switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.toggle-slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #3d3d5c;\n  transition: 0.3s;\n  border-radius: 26px;\n}\n\n.toggle-slider:before {\n  position: absolute;\n  content: \"\";\n  height: 20px;\n  width: 20px;\n  left: 3px;\n  bottom: 3px;\n  background-color: white;\n  transition: 0.3s;\n  border-radius: 50%;\n}\n\n.toggle-switch input:checked + .toggle-slider {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.toggle-switch input:checked + .toggle-slider:before {\n  transform: translateX(24px);\n}\n\n.toggle-label {\n  font-size: 14px;\n  font-weight: 600;\n  color: #888;\n}\n\n/* Radio Group for Settings */\n.radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 15px;\n}\n\n.radio-option {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.02);\n  border: 2px solid #3d3d5c;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.radio-option:hover {\n  border-color: #667eea;\n  background: rgba(102, 126, 234, 0.05);\n}\n\n.radio-option.active {\n  border-color: #667eea;\n  background: rgba(102, 126, 234, 0.1);\n  box-shadow: 0 0 0 1px rgba(102, 126, 234, 0.2);\n}\n\n.radio-option input[type=\"radio\"] {\n  margin-top: 2px;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  accent-color: #667eea;\n}\n\n.radio-content {\n  flex: 1;\n}\n\n.radio-label {\n  font-size: 15px;\n  font-weight: 600;\n  color: #e0e0e0;\n  margin-bottom: 4px;\n}\n\n.radio-option.active .radio-label {\n  color: #ffffff;\n}\n\n.radio-description {\n  font-size: 13px;\n  color: #888;\n  line-height: 1.5;\n}\n\n.radio-option.active .radio-description {\n  color: #b8b8d1;\n}\n\n/* Articles List Panel */\n.articles-list-panel {\n  background: #1a1a2e;\n  border-left: 1px solid #2d2d44;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.articles-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #2d2d44;\n}\n\n.articles-header h3 {\n  margin: 0;\n  font-size: 18px;\n  color: #e0e0e0;\n}\n\n.close-btn {\n  background: none;\n  border: none;\n  color: #888;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px;\n  transition: color 0.2s;\n}\n\n.close-btn:hover {\n  color: #e0e0e0;\n}\n\n.articles-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n}\n\n.no-articles {\n  text-align: center;\n  color: #888;\n  margin-top: 40px;\n}\n\n.articles-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.article-card {\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 12px;\n  padding: 15px;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n}\n\n.article-card:hover {\n  border-color: #667eea;\n  transform: translateX(5px);\n}\n\n.article-card.selected {\n  border-color: #a78bfa;\n  border-width: 2px;\n  background: rgba(167, 139, 250, 0.1);\n}\n\n.article-card.selected::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 12px 0 0 12px;\n}\n\n.article-title {\n  font-size: 15px;\n  font-weight: 600;\n  color: #e0e0e0;\n  margin-bottom: 10px;\n  line-height: 1.4;\n}\n\n.article-meta {\n  display: flex;\n  gap: 15px;\n  font-size: 13px;\n  color: #888;\n  margin-bottom: 10px;\n}\n\n.article-entities {\n  color: #a78bfa;\n}\n\n.article-link {\n  display: inline-block;\n  font-size: 13px;\n  color: #667eea;\n  text-decoration: none;\n  margin-top: 5px;\n  transition: color 0.2s;\n}\n\n.article-link:hover {\n  color: #a78bfa;\n}\n\n.article-actions {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #3d3d5c;\n}\n\n.article-delete {\n  padding: 6px 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #f87171;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.article-delete:hover {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #f87171;\n}\n\n/* View Toggle */\n.view-toggle {\n  display: flex;\n  gap: 5px;\n  margin-right: 15px;\n  background: #2d2d44;\n  padding: 4px;\n  border-radius: 8px;\n}\n\n.view-toggle button {\n  padding: 8px 16px;\n  background: transparent;\n  border: none;\n  color: #888;\n  cursor: pointer;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n\n.view-toggle button.active {\n  background: #667eea;\n  color: white;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n\n.view-toggle button:hover:not(.active) {\n  color: #e0e0e0;\n  background: rgba(102, 126, 234, 0.1);\n}\n\n/* List View */\n.list-view-container {\n  flex: 1;\n  padding: 40px;\n  overflow-y: auto;\n}\n\n.list-view-container h2 {\n  font-size: 32px;\n  margin-bottom: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.list-view-header {\n  background: rgba(102, 126, 234, 0.1);\n  border: 1px solid rgba(102, 126, 234, 0.3);\n  border-radius: 8px;\n  padding: 15px 20px;\n  margin-bottom: 25px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.list-view-header span {\n  color: #888;\n  font-size: 14px;\n}\n\n.list-view-header strong {\n  color: #a78bfa;\n  font-size: 16px;\n}\n\n.entities-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  max-height: calc(100vh - 300px);\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-right: 10px;\n}\n\n.entity-list-item {\n  background: #1a1a2e;\n  border: 1px solid #2d2d44;\n  border-radius: 8px;\n  padding: 15px 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.entity-list-item:hover {\n  border-color: #667eea;\n  transform: translateX(5px);\n}\n\n.entity-list-item.selected {\n  border-color: #a78bfa;\n  border-width: 2px;\n  background: rgba(167, 139, 250, 0.1);\n}\n\n.entity-list-name {\n  font-size: 16px;\n  font-weight: 600;\n  color: #e0e0e0;\n  margin-bottom: 8px;\n}\n\n.entity-list-meta {\n  display: flex;\n  gap: 15px;\n  font-size: 13px;\n}\n\n.entity-list-type {\n  color: #888;\n  text-transform: capitalize;\n}\n\n.entity-list-connections {\n  color: #a78bfa;\n  font-weight: 600;\n}\n\n/* NodeDetails Enhancements */\n.node-context {\n  font-size: 14px;\n  line-height: 1.6;\n  color: #b8b8d1;\n  background: rgba(102, 126, 234, 0.05);\n  padding: 12px;\n  border-radius: 8px;\n  border-left: 3px solid #667eea;\n}\n\n.source-articles-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 10px;\n}\n\n.source-article-item {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  padding: 10px;\n  background: rgba(102, 126, 234, 0.05);\n  border: 1px solid #2d2d44;\n  border-radius: 8px;\n  transition: all 0.2s;\n}\n\n.source-article-item:hover {\n  border-color: #667eea;\n  transform: translateX(3px);\n}\n\n.source-article-link {\n  font-size: 13px;\n  color: #a78bfa;\n  text-decoration: none;\n  font-weight: 500;\n  line-height: 1.4;\n}\n\n.source-article-link:hover {\n  color: #c4b5fd;\n  text-decoration: underline;\n}\n\n.source-article-date {\n  font-size: 12px;\n  color: #888;\n}\n\n.source-articles-more {\n  text-align: center;\n  padding: 8px;\n  color: #888;\n  font-size: 12px;\n  font-style: italic;\n}\n\n.relationships-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 10px;\n}\n\n.relationship-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  background: rgba(102, 126, 234, 0.05);\n  border: 1px solid #2d2d44;\n  border-radius: 6px;\n  gap: 10px;\n}\n\n.relationship-info {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n\n.relationship-type {\n  font-size: 11px;\n  color: #888;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.relationship-entity {\n  font-size: 14px;\n  color: #e0e0e0;\n  font-weight: 500;\n}\n\n.relationship-strength {\n  font-size: 13px;\n  color: #a78bfa;\n  font-weight: 700;\n  min-width: 40px;\n  text-align: right;\n}\n\n.relationships-more {\n  text-align: center;\n  padding: 8px;\n  color: #888;\n  font-size: 12px;\n  font-style: italic;\n  margin-top: 5px;\n}\n\n/* Clickable entity in insights */\n.clickable-entity {\n  transition: all 0.2s;\n  border-radius: 8px;\n  padding: 12px !important;\n}\n\n.clickable-entity:hover {\n  background: rgba(102, 126, 234, 0.15);\n  transform: translateX(5px);\n  border-left: 3px solid #667eea;\n}\n\n/* Articles View Toggle */\n.articles-view-toggle {\n  display: flex;\n  gap: 5px;\n  padding: 10px 20px;\n  border-bottom: 1px solid #2d2d44;\n  background: #1a1a2e;\n}\n\n.articles-view-toggle button {\n  flex: 1;\n  padding: 10px 20px;\n  background: transparent;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  color: #888;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.articles-view-toggle button:hover {\n  border-color: #667eea;\n  color: #e0e0e0;\n}\n\n.articles-view-toggle button.active {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-color: transparent;\n  color: #fff;\n}\n\n/* Timeline Layout */\n.articles-timeline {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 0;\n}\n\n.article-timeline-item {\n  display: flex;\n  gap: 15px;\n  position: relative;\n}\n\n.timeline-indicator {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 40px;\n  flex-shrink: 0;\n  padding-top: 20px;\n}\n\n.timeline-dot {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #3d3d5c;\n  border: 3px solid #2d2d44;\n  z-index: 2;\n  transition: all 0.2s;\n  position: relative;\n  flex-shrink: 0;\n}\n\n.timeline-dot-connected {\n  background: #667eea;\n  border-color: #a78bfa;\n  cursor: pointer;\n  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);\n}\n\n.timeline-dot-connected:hover {\n  background: #a78bfa;\n  transform: scale(1.3);\n  box-shadow: 0 0 15px rgba(167, 139, 250, 0.8);\n}\n\n.timeline-dot-badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background: #667eea;\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n  padding: 2px 5px;\n  border-radius: 10px;\n  border: 2px solid #1a1a2e;\n  min-width: 18px;\n  text-align: center;\n}\n\n.timeline-line {\n  width: 3px;\n  flex: 1;\n  background: #3d3d5c;\n  margin-top: 5px;\n  min-height: 40px;\n  border-radius: 2px;\n  transition: all 0.2s;\n}\n\n.timeline-line-strong {\n  background: linear-gradient(180deg, #10b981 0%, #059669 100%);\n  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);\n}\n\n.timeline-line-moderate {\n  background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);\n  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);\n}\n\n.timeline-line-weak {\n  background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);\n  box-shadow: 0 0 8px rgba(249, 115, 22, 0.4);\n}\n\n.timeline-line-minimal {\n  background: #3d3d5c;\n}\n\n/* Clustered Articles View */\n.articles-clusters {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 10px 0;\n}\n\n.cluster-divider {\n  height: 1px;\n  background: linear-gradient(90deg, transparent 0%, #3d3d5c 50%, transparent 100%);\n  margin: 10px 0;\n}\n\n.article-cluster {\n  background: rgba(45, 45, 68, 0.3);\n  border: 1px solid #3d3d5c;\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.cluster-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 15px;\n  background: #2d2d44;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.cluster-header:hover {\n  background: #3d3d5c;\n}\n\n.cluster-toggle {\n  font-size: 12px;\n  color: #888;\n  min-width: 12px;\n}\n\n.cluster-name {\n  flex: 1;\n  font-size: 15px;\n  font-weight: 700;\n  color: #e0e0e0;\n}\n\n.cluster-strength {\n  font-size: 12px;\n  color: #FFA726; /* Warm orange - breaks the purple monotone */\n  font-weight: 600;\n  padding: 4px 10px;\n  background: rgba(255, 167, 38, 0.15); /* Warm orange background */\n  border-radius: 12px;\n  cursor: pointer; /* Make it feel interactive */\n  transition: all 0.2s ease;\n  border: 1px solid rgba(167, 139, 250, 0.3);\n}\n\n.cluster-articles {\n  padding: 15px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n/* Connection Modal */\n.connection-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  animation: fadeIn 0.2s;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.connection-modal {\n  background: #1a1a2e;\n  border: 1px solid #3d3d5c;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);\n  animation: slideUp 0.3s;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n@keyframes slideIn {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n@keyframes slideOut {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n}\n\n.connection-modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #2d2d44;\n}\n\n.connection-modal-header h4 {\n  margin: 0;\n  font-size: 18px;\n  color: #e0e0e0;\n}\n\n.connection-modal-body {\n  padding: 20px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.connection-articles {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  margin-bottom: 20px;\n  padding: 15px;\n  background: #2d2d44;\n  border-radius: 12px;\n}\n\n.connection-article-name {\n  flex: 1;\n  font-size: 14px;\n  color: #e0e0e0;\n  font-weight: 600;\n  line-height: 1.4;\n}\n\n.connection-arrow {\n  font-size: 20px;\n  color: #667eea;\n  font-weight: 700;\n}\n\n.shared-entities-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.shared-entity-item {\n  padding: 12px 15px;\n  background: #2d2d44;\n  border-radius: 8px;\n  border-left: 3px solid #667eea;\n  font-size: 14px;\n  color: #e0e0e0;\n  transition: all 0.2s;\n}\n\n.shared-entity-item:hover {\n  background: #3d3d5c;\n  border-left-color: #a78bfa;\n  transform: translateX(5px);\n}\n\n.connection-modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 20px;\n  border-top: 1px solid #2d2d44;\n}\n\n.btn-secondary {\n  padding: 10px 24px;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  color: #e0e0e0;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-secondary:hover {\n  background: #3d3d5c;\n  border-color: #667eea;\n  color: #fff;\n}\n\n/* Article Entities Panel (Right Sidebar) */\n.article-entities-panel {\n  background: #1a1a2e;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0;\n  border-top: 1px solid #2d2d44;\n  flex: 1;\n  overflow-y: auto;\n}\n\n.article-entities-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #2d2d44;\n}\n\n.article-entities-header h3 {\n  margin: 0;\n  font-size: 16px;\n  color: #e0e0e0;\n  font-weight: 700;\n}\n\n.article-entities-title {\n  padding: 15px 20px;\n  font-size: 14px;\n  color: #a78bfa;\n  font-weight: 600;\n  line-height: 1.4;\n  border-bottom: 1px solid #2d2d44;\n  background: rgba(167, 139, 250, 0.05);\n}\n\n.article-entities-count {\n  padding: 10px 20px;\n  font-size: 12px;\n  color: #888;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.article-entities-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 15px 20px;\n}\n\n.entity-type-group {\n  margin-bottom: 25px;\n}\n\n.entity-type-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n\n.entity-type-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.entity-type-label {\n  font-size: 12px;\n  color: #888;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.entity-type-list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.entity-list-item-clickable {\n  padding: 10px 12px;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.entity-list-item-clickable:hover {\n  background: #3d3d5c;\n  border-color: #667eea;\n  transform: translateX(5px);\n}\n\n.entity-list-item-clickable .entity-name {\n  font-size: 14px;\n  color: #e0e0e0;\n  font-weight: 500;\n  flex: 1;\n}\n\n.entity-list-item-clickable .entity-connections {\n  font-size: 11px;\n  color: #67e8f9;\n  font-weight: 600;\n  padding: 2px 8px;\n  background: rgba(103, 232, 249, 0.1);\n  border-radius: 10px;\n  border: 1px solid rgba(103, 232, 249, 0.3);\n}\n\n/* Knowledge Navigator */\n.navigator-trigger-btn {\n  padding: 10px 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-left: 15px;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n\n.navigator-trigger-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);\n}\n\n.navigator-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  animation: fadeIn 0.3s;\n}\n\n.navigator-modal {\n  background: #1a1a2e;\n  border: 1px solid #3d3d5c;\n  border-radius: 16px;\n  max-width: 700px;\n  width: 90%;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);\n  animation: slideUp 0.3s;\n}\n\n.navigator-header {\n  padding: 25px 30px;\n  border-bottom: 1px solid #2d2d44;\n  position: relative;\n}\n\n.navigator-header h2 {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  color: #e0e0e0;\n  font-weight: 700;\n}\n\n.navigator-subtitle {\n  margin: 0;\n  font-size: 14px;\n  color: #888;\n  line-height: 1.5;\n}\n\n.navigator-body {\n  padding: 30px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.navigator-inputs {\n  display: flex;\n  align-items: flex-start;\n  gap: 20px;\n  margin-bottom: 25px;\n}\n\n.navigator-input-group {\n  flex: 1;\n  position: relative;\n}\n\n.navigator-input-group label {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #888;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.navigator-input-group input {\n  width: 100%;\n  padding: 12px 15px;\n  background: #2d2d44;\n  border: 2px solid #3d3d5c;\n  border-radius: 8px;\n  color: #e0e0e0;\n  font-size: 15px;\n  transition: all 0.2s;\n}\n\n.navigator-input-group input:focus {\n  outline: none;\n  border-color: #667eea;\n  background: #3d3d5c;\n}\n\n.navigator-input-group input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.navigator-arrow {\n  font-size: 28px;\n  color: #667eea;\n  font-weight: 700;\n  margin-top: 32px;\n}\n\n.navigator-autocomplete {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  border-radius: 8px;\n  margin-top: 5px;\n  max-height: 250px;\n  overflow-y: auto;\n  z-index: 100;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n\n.navigator-autocomplete-item {\n  padding: 12px 15px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  border-bottom: 1px solid #3d3d5c;\n}\n\n.navigator-autocomplete-item:last-child {\n  border-bottom: none;\n}\n\n.navigator-autocomplete-item:hover {\n  background: #3d3d5c;\n}\n\n.navigator-autocomplete-empty {\n  padding: 20px;\n  text-align: center;\n  color: #888;\n  font-size: 14px;\n}\n\n.entity-type-indicator {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.entity-type-label {\n  margin-left: auto;\n  font-size: 11px;\n  color: #888;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n\n.navigator-actions {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n\n.navigator-btn {\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n\n.navigator-btn-primary {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  flex: 1;\n}\n\n.navigator-btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);\n}\n\n.navigator-btn-primary:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.navigator-btn-secondary {\n  background: #2d2d44;\n  border: 1px solid #3d3d5c;\n  color: #e0e0e0;\n}\n\n.navigator-btn-secondary:hover {\n  background: #3d3d5c;\n  border-color: #667eea;\n}\n\n.navigator-error {\n  padding: 15px 20px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 8px;\n  color: #f87171;\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 20px;\n}\n\n.navigator-result {\n  background: rgba(102, 126, 234, 0.05);\n  border: 1px solid rgba(102, 126, 234, 0.2);\n  border-radius: 12px;\n  padding: 20px;\n}\n\n.navigator-result-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid rgba(102, 126, 234, 0.2);\n}\n\n.navigator-result-header h3 {\n  margin: 0;\n  font-size: 18px;\n  color: #e0e0e0;\n  font-weight: 700;\n}\n\n.navigator-result-stats {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  font-size: 13px;\n  color: #888;\n}\n\n.navigator-path {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.navigator-step {\n  display: flex;\n  gap: 15px;\n  align-items: flex-start;\n}\n\n.navigator-step-number {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.navigator-step-content {\n  flex: 1;\n}\n\n.navigator-step-entity {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 15px;\n  background: #2d2d44;\n  border-radius: 8px;\n  margin-bottom: 10px;\n}\n\n.navigator-step-name {\n  font-size: 15px;\n  color: #e0e0e0;\n  font-weight: 600;\n  flex: 1;\n}\n\n.navigator-step-type {\n  font-size: 11px;\n  color: #888;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n\n.navigator-step-relationship {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-left: 15px;\n  color: #888;\n  font-size: 13px;\n}\n\n.relationship-arrow {\n  font-size: 18px;\n  color: #667eea;\n}\n\n.relationship-label {\n  flex: 1;\n  color: #a78bfa;\n  font-weight: 600;\n}\n\n.relationship-strength {\n  color: #34d399;\n  font-weight: 700;\n}\n\n/* Timeline Styles */\n.graph-container.with-timeline {\n  display: flex;\n  flex-direction: column;\n}\n\n.graph-container.with-timeline > canvas,\n.graph-container.with-timeline > svg {\n  flex: 1;\n  min-height: 0;\n}\n\n.timeline-always-visible {\n  background: linear-gradient(to top, #0f1419 0%, #1a1f2e 100%);\n  border-top: 1px solid rgba(102, 126, 234, 0.2);\n  padding: 20px 30px;\n  height: 120px;\n  display: flex;\n  gap: 30px;\n  align-items: center;\n}\n\n.timeline-left {\n  flex: 0 0 35%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding-right: 30px;\n  border-right: 1px solid rgba(102, 126, 234, 0.2);\n}\n\n.timeline-article-title {\n  font-size: 15px;\n  font-weight: 600;\n  color: #e0e0e0;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.timeline-article-meta {\n  font-size: 12px;\n  color: #888;\n  font-weight: 500;\n}\n\n.timeline-right {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.timeline-slider-track {\n  position: relative;\n  width: 100%;\n  height: 30px;\n  margin-bottom: 4px;\n}\n\n.timeline-dot {\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #667eea;\n  border: 2px solid #1a1f2e;\n  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);\n  transition: all 0.2s ease;\n  cursor: pointer;\n  z-index: 2;\n}\n\n.timeline-dot:hover {\n  transform: translate(-50%, -50%) scale(1.3);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);\n  z-index: 3;\n}\n\n.timeline-dot.focused {\n  background: #fbbf24;\n  box-shadow: 0 0 16px rgba(251, 191, 36, 0.8);\n  transform: translate(-50%, -50%) scale(1.5);\n  z-index: 4;\n}\n\n.timeline-slider-range {\n  width: 100%;\n  height: 6px;\n  background: rgba(102, 126, 234, 0.2);\n  border-radius: 3px;\n  outline: none;\n  -webkit-appearance: none;\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  z-index: 1;\n}\n\n.timeline-slider-range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: white;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);\n  transition: all 0.2s ease;\n}\n\n.timeline-slider-range::-webkit-slider-thumb:hover {\n  transform: scale(1.2);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);\n}\n\n.timeline-slider-range::-moz-range-thumb {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: white;\n  cursor: pointer;\n  border: none;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);\n  transition: all 0.2s ease;\n}\n\n.timeline-slider-range::-moz-range-thumb:hover {\n  transform: scale(1.2);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);\n}\n\n.timeline-labels-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 11px;\n  color: #888;\n}\n\n.timeline-label {\n  font-weight: 500;\n}\n\n.timeline-position {\n  font-size: 12px;\n  color: #a78bfa;\n  font-weight: 600;\n}\n\n/* Processing Article States */\n.article-card-processing {\n  opacity: 0.7;\n  background: rgba(99, 102, 241, 0.03);\n  border-color: rgba(99, 102, 241, 0.2);\n}\n\n.timeline-dot-processing {\n  background: var(--color-primary);\n  border: 2px solid var(--color-primary);\n  animation: processingPulse 1.5s ease-in-out infinite;\n}\n\n.processing-spinner {\n  width: 8px;\n  height: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-top: 1px solid white;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n.processing-status {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 0;\n}\n\n.processing-message {\n  font-size: 13px;\n  color: var(--color-primary);\n  font-style: italic;\n  font-weight: 500;\n}\n\n.processing-indicator {\n  display: flex;\n  align-items: center;\n}\n\n.pulse-dot {\n  width: 6px;\n  height: 6px;\n  background: #FFA726; /* Subtle warm orange - just a hint */\n  border-radius: 50%;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n\n@keyframes processingPulse {\n  0%, 100% {\n    opacity: 0.6;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.1);\n  }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% {\n    opacity: 0.4;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.2);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;exports.act=X;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=X;exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};
exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};exports.useTransition=function(){return U.current.useTransition()};exports.version="18.3.1";


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var m = __webpack_require__(961);
if (true) {
  exports.H = m.createRoot;
  __webpack_unused_export__ = m.hydrateRoot;
} else // removed by dead control flow
{ var i; }


/***/ }),

/***/ 354:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 463:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ }),

/***/ 540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(287);
} else // removed by dead control flow
{}


/***/ }),

/***/ 551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(540),ca=__webpack_require__(982);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Sg(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=!0),a.firstContext=null)}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a}}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a)}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=!1;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mh(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function qh(a,b,c,d){var e=a.updateQueue;jh=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(uh);G(uh,b)}function zh(){E(uh);E(vh);E(wh)}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c))}function Bh(a){vh.current===a&&(E(uh),E(vh))}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=!1;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e)}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=!1;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else{if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a}return O}
function Vh(a,b){return"function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=!0);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e)}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a)}function ai(a,b,c){return c(function(){ei(b)&&fi(a)})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1)}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return[b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d)}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d)}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=!1,dh=!0),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=!0);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Gh.transition;Gh.transition={};try{a(!1),b()}finally{C=c,Gh.transition=d}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d)}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d))}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return[d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(!1),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Ei={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d))}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function Gi(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null)}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=!0,Pi=d);Li(a,b)};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a))}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d)}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=!0);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=!1;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=!1;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);yh(a,b.containerInfo)}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1))}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c)}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}wj(b,!0,c,null,f);break;case "together":wj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Fj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Gj&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304)}else{if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Mj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Nj=!1;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Nj;Nj=!1;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f)}e=e.next}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}var X=null,Xj=!1;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=!0;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c)}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a)}catch(t){W(a,a.return,t)}try{Pj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a)}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function hk(a,b,c){V=a;ik(a,b,c)}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f,b,c),f=f.sibling;V=e;Jj=h;U=l}kk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a,b,c)}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}sh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Rj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Rj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg())}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Fk(c,Gk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else{b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h)}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a)}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d))}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg())}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg()}}function Hj(){fj=ej.current;E(ej)}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj()}c=c.return}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}fh=null}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ih=!1}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return}while(null!==f)}Sk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z)}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e)}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y)}function Lk(){for(;null!==Y&&!cc();)Uk(Y)}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else{c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d)}finally{ok.transition=e,C=d}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=!0,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c,a,e);dc();K=h;C=g;ok.transition=f}else a.current=c;vk&&(vk=!1,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode,d);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=!1,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else{a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,ok.transition=b}}return!1}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b))}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b)}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c))}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c)}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c)}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return dh=!1,yj(a,b,c);dh=0!==(a.flags&131072)?!0:!1}else dh=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c)}b=b.child}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Xi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,!0,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,!0,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b)}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a)};function ll(a){this._internalRoot=a}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null)});b[uf]=null}};function ml(a){this._internalRoot=a}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function nl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a)}}var g=el(b,d,a,0,null,!1,!1,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a)}}var k=bl(a,0,!1,null,null,!1,!1,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d)});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a)}}fl(b,g,a,e)}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c)}}),il(a,1)}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c)}il(a,134217728)}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d)}il(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};exports.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=!1,d="",e=kl;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Rk(a)};exports.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=kl;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};exports.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Qk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,!1,d)};exports.version="18.3.1-next-f1338f8080-20240426";


/***/ }),

/***/ 556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) // removed by dead control flow
{ var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(694)();
}


/***/ }),

/***/ 659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(925);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 925:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) // removed by dead control flow
{}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(551);
} else // removed by dead control flow
{}


/***/ }),

/***/ 982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(463);
} else // removed by dead control flow
{}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(338);
;// ./node_modules/d3-array/src/mean.js
function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }
  if (count) return sum / count;
}

;// ./node_modules/d3-array/src/index.js













 // Deprecated; use bin.






















 // Deprecated; use leastIndex.





















;// ./node_modules/d3-selection/src/selector.js
function none() {}

/* harmony default export */ function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

;// ./node_modules/d3-selection/src/selection/select.js



/* harmony default export */ function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// ./node_modules/d3-selection/src/array.js
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

;// ./node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}

/* harmony default export */ function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

;// ./node_modules/d3-selection/src/selection/selectAll.js




function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

/* harmony default export */ function selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

;// ./node_modules/d3-selection/src/matcher.js
/* harmony default export */ function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}


;// ./node_modules/d3-selection/src/selection/selectChild.js


var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ function selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

;// ./node_modules/d3-selection/src/selection/selectChildren.js


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ function selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

;// ./node_modules/d3-selection/src/selection/filter.js



/* harmony default export */ function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// ./node_modules/d3-selection/src/selection/sparse.js
/* harmony default export */ function sparse(update) {
  return new Array(update.length);
}

;// ./node_modules/d3-selection/src/selection/enter.js



/* harmony default export */ function enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

;// ./node_modules/d3-selection/src/constant.js
/* harmony default export */ function src_constant(x) {
  return function() {
    return x;
  };
}

;// ./node_modules/d3-selection/src/selection/data.js




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ function data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = src_constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

;// ./node_modules/d3-selection/src/selection/exit.js



/* harmony default export */ function exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

;// ./node_modules/d3-selection/src/selection/join.js
/* harmony default export */ function join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

;// ./node_modules/d3-selection/src/selection/merge.js


/* harmony default export */ function merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

;// ./node_modules/d3-selection/src/selection/order.js
/* harmony default export */ function order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

;// ./node_modules/d3-selection/src/selection/sort.js


/* harmony default export */ function sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// ./node_modules/d3-selection/src/selection/call.js
/* harmony default export */ function call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

;// ./node_modules/d3-selection/src/selection/nodes.js
/* harmony default export */ function nodes() {
  return Array.from(this);
}

;// ./node_modules/d3-selection/src/selection/node.js
/* harmony default export */ function node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

;// ./node_modules/d3-selection/src/selection/size.js
/* harmony default export */ function size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

;// ./node_modules/d3-selection/src/selection/empty.js
/* harmony default export */ function selection_empty() {
  return !this.node();
}

;// ./node_modules/d3-selection/src/selection/each.js
/* harmony default export */ function each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

;// ./node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ const namespaces = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});

;// ./node_modules/d3-selection/src/namespace.js


/* harmony default export */ function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

;// ./node_modules/d3-selection/src/selection/attr.js


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ function attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

;// ./node_modules/d3-selection/src/window.js
/* harmony default export */ function src_window(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

;// ./node_modules/d3-selection/src/selection/style.js


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ function style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || src_window(node).getComputedStyle(node, null).getPropertyValue(name);
}

;// ./node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ function property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

;// ./node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ function classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

;// ./node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

;// ./node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ function html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

;// ./node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ function selection_raise() {
  return this.each(raise);
}

;// ./node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ function selection_lower() {
  return this.each(lower);
}

;// ./node_modules/d3-selection/src/creator.js



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

;// ./node_modules/d3-selection/src/selection/append.js


/* harmony default export */ function append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

;// ./node_modules/d3-selection/src/selection/insert.js



function constantNull() {
  return null;
}

/* harmony default export */ function insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

;// ./node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ function selection_remove() {
  return this.each(remove);
}

;// ./node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ function clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

;// ./node_modules/d3-selection/src/selection/datum.js
/* harmony default export */ function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

;// ./node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

;// ./node_modules/d3-selection/src/selection/dispatch.js


function dispatchEvent(node, type, params) {
  var window = src_window(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

;// ./node_modules/d3-selection/src/selection/iterator.js
/* harmony default export */ function* iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

;// ./node_modules/d3-selection/src/selection/index.js



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  selectChild: selectChild,
  selectChildren: selectChildren,
  filter: selection_filter,
  data: data,
  enter: enter,
  exit: exit,
  join: join,
  merge: merge,
  selection: selection_selection,
  order: order,
  sort: sort,
  call: call,
  nodes: nodes,
  node: node,
  size: size,
  empty: selection_empty,
  each: each,
  attr: attr,
  style: style,
  property: property,
  classed: classed,
  text: selection_text,
  html: html,
  raise: selection_raise,
  lower: selection_lower,
  append: append,
  insert: insert,
  remove: selection_remove,
  clone: clone,
  datum: selection_datum,
  on: on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: iterator
};

/* harmony default export */ const src_selection = (selection);

;// ./node_modules/d3-dispatch/src/dispatch.js
var noop = {value: () => {}};

function dispatch_dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function dispatch_parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch_dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = dispatch_parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const src_dispatch = (dispatch_dispatch);

;// ./node_modules/d3-timer/src/timer.js
var timer_frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --timer_frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}

;// ./node_modules/d3-timer/src/timeout.js


/* harmony default export */ function src_timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

;// ./node_modules/d3-transition/src/transition/schedule.js



var emptyOn = src_dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function schedule_set(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function schedule_get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return src_timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    src_timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

;// ./node_modules/d3-transition/src/interrupt.js


/* harmony default export */ function src_interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

;// ./node_modules/d3-transition/src/selection/interrupt.js


/* harmony default export */ function selection_interrupt(name) {
  return this.each(function() {
    src_interrupt(this, name);
  });
}

;// ./node_modules/d3-interpolate/src/number.js
/* harmony default export */ function number(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

;// ./node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

;// ./node_modules/d3-interpolate/src/transform/parse.js


var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

;// ./node_modules/d3-interpolate/src/transform/index.js



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

;// ./node_modules/d3-transition/src/transition/tween.js


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ function tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = schedule_get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = schedule_set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return schedule_get(node, id).value[name];
  };
}

;// ./node_modules/d3-color/src/define.js
/* harmony default export */ function src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

;// ./node_modules/d3-color/src/color.js


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

src_define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

src_define(Rgb, color_rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

src_define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

;// ./node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function src_basis(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// ./node_modules/d3-interpolate/src/basisClosed.js


/* harmony default export */ function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// ./node_modules/d3-interpolate/src/constant.js
/* harmony default export */ const d3_interpolate_src_constant = (x => () => x);

;// ./node_modules/d3-interpolate/src/color.js


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : d3_interpolate_src_constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : d3_interpolate_src_constant(isNaN(a) ? b : a);
}

;// ./node_modules/d3-interpolate/src/rgb.js





/* harmony default export */ const rgb = ((function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = color_rgb(start)).r, (end = color_rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = color_rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);

;// ./node_modules/d3-interpolate/src/string.js


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

;// ./node_modules/d3-transition/src/transition/interpolate.js



/* harmony default export */ function transition_interpolate(a, b) {
  var c;
  return (typeof b === "number" ? number
      : b instanceof color ? rgb
      : (c = color(b)) ? (b = c, rgb)
      : string)(a, b);
}

;// ./node_modules/d3-transition/src/transition/attr.js





function attr_attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attr_attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attr_attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attr_attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : transition_interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attr_attrFunctionNS : attr_attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attr_attrRemoveNS : attr_attrRemove)(fullname)
      : (fullname.local ? attr_attrConstantNS : attr_attrConstant)(fullname, i, value));
}

;// ./node_modules/d3-transition/src/transition/attrTween.js


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

;// ./node_modules/d3-transition/src/transition/delay.js


function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

/* harmony default export */ function delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : schedule_get(this.node(), id).delay;
}

;// ./node_modules/d3-transition/src/transition/duration.js


function durationFunction(id, value) {
  return function() {
    schedule_set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    schedule_set(this, id).duration = value;
  };
}

/* harmony default export */ function duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : schedule_get(this.node(), id).duration;
}

;// ./node_modules/d3-transition/src/transition/ease.js


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    schedule_set(this, id).ease = value;
  };
}

/* harmony default export */ function ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : schedule_get(this.node(), id).ease;
}

;// ./node_modules/d3-transition/src/transition/easeVarying.js


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    schedule_set(this, id).ease = v;
  };
}

/* harmony default export */ function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

;// ./node_modules/d3-transition/src/transition/filter.js



/* harmony default export */ function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

;// ./node_modules/d3-transition/src/transition/merge.js


/* harmony default export */ function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

;// ./node_modules/d3-transition/src/transition/on.js


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : schedule_set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? schedule_get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

;// ./node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

;// ./node_modules/d3-transition/src/transition/select.js




/* harmony default export */ function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, schedule_get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

;// ./node_modules/d3-transition/src/transition/selectAll.js




/* harmony default export */ function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = schedule_get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

;// ./node_modules/d3-transition/src/transition/selection.js


var selection_Selection = src_selection.prototype.constructor;

/* harmony default export */ function transition_selection() {
  return new selection_Selection(this._groups, this._parents);
}

;// ./node_modules/d3-transition/src/transition/style.js






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function style_styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function style_styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function style_styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = schedule_set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = style_styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : transition_interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, style_styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, style_styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, style_styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

;// ./node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

;// ./node_modules/d3-transition/src/transition/text.js


function text_textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function text_textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? text_textFunction(tweenValue(this, "text", value))
      : text_textConstant(value == null ? "" : value + ""));
}

;// ./node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

;// ./node_modules/d3-transition/src/transition/transition.js



/* harmony default export */ function transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = schedule_get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

;// ./node_modules/d3-transition/src/transition/end.js


/* harmony default export */ function end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = schedule_set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

;// ./node_modules/d3-transition/src/transition/index.js






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition_transition(name) {
  return src_selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = src_selection.prototype;

Transition.prototype = transition_transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: tween,
  delay: delay,
  duration: duration,
  ease: ease,
  easeVarying: transition_easeVarying,
  end: end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

;// ./node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

;// ./node_modules/d3-transition/src/selection/transition.js





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

;// ./node_modules/d3-transition/src/selection/index.js




src_selection.prototype.interrupt = selection_interrupt;
src_selection.prototype.transition = selection_transition;

;// ./node_modules/d3-transition/src/index.js





;// ./node_modules/d3-brush/src/brush.js









var MODE_DRAG = {name: "drag"},
    MODE_SPACE = {name: "space"},
    MODE_HANDLE = {name: "handle"},
    MODE_CENTER = {name: "center"};

const {abs, max, min} = Math;

function number1(e) {
  return [+e[0], +e[1]];
}

function number2(e) {
  return [number1(e[0]), number1(e[1])];
}

var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e) { return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]]; },
  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
};

var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) { return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]]; },
  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
};

var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) { return xy == null ? null : number2(xy); },
  output: function(xy) { return xy; }
};

var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};

var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};

var signsX = {
  overlay: +1,
  selection: +1,
  n: null,
  e: +1,
  s: null,
  w: -1,
  nw: -1,
  ne: +1,
  se: +1,
  sw: -1
};

var signsY = {
  overlay: +1,
  selection: +1,
  n: -1,
  e: null,
  s: +1,
  w: null,
  nw: -1,
  ne: -1,
  se: +1,
  sw: +1
};

function type(t) {
  return {type: t};
}

// Ignore right-click, since that should open the context menu.
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}

function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  if (svg.hasAttribute("viewBox")) {
    svg = svg.viewBox.baseVal;
    return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
  }
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

// Like d3.local, but with the name “__brush” rather than auto-generated.
function local(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}

function brush_empty(extent) {
  return extent[0][0] === extent[1][0]
      || extent[0][1] === extent[1][1];
}

function brushSelection(node) {
  var state = node.__brush;
  return state ? state.dim.output(state.selection) : null;
}

function brushX() {
  return brush_brush(X);
}

function brushY() {
  return brush_brush(Y);
}

/* harmony default export */ function brush() {
  return brush_brush(XY);
}

function brush_brush(dim) {
  var extent = defaultExtent,
      filter = defaultFilter,
      touchable = defaultTouchable,
      keys = true,
      listeners = dispatch("start", "brush", "end"),
      handleSize = 6,
      touchending;

  function brush(group) {
    var overlay = group
        .property("__brush", initialize)
      .selectAll(".overlay")
      .data([type("overlay")]);

    overlay.enter().append("rect")
        .attr("class", "overlay")
        .attr("pointer-events", "all")
        .attr("cursor", cursors.overlay)
      .merge(overlay)
        .each(function() {
          var extent = local(this).extent;
          select(this)
              .attr("x", extent[0][0])
              .attr("y", extent[0][1])
              .attr("width", extent[1][0] - extent[0][0])
              .attr("height", extent[1][1] - extent[0][1]);
        });

    group.selectAll(".selection")
      .data([type("selection")])
      .enter().append("rect")
        .attr("class", "selection")
        .attr("cursor", cursors.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");

    var handle = group.selectAll(".handle")
      .data(dim.handles, function(d) { return d.type; });

    handle.exit().remove();

    handle.enter().append("rect")
        .attr("class", function(d) { return "handle handle--" + d.type; })
        .attr("cursor", function(d) { return cursors[d.type]; });

    group
        .each(redraw)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousedown.brush", started)
      .filter(touchable)
        .on("touchstart.brush", started)
        .on("touchmove.brush", touchmoved)
        .on("touchend.brush touchcancel.brush", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  brush.move = function(group, selection, event) {
    if (group.tween) {
      group
          .on("start.brush", function(event) { emitter(this, arguments).beforestart().start(event); })
          .on("interrupt.brush end.brush", function(event) { emitter(this, arguments).end(event); })
          .tween("brush", function() {
            var that = this,
                state = that.__brush,
                emit = emitter(that, arguments),
                selection0 = state.selection,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
                i = interpolate(selection0, selection1);

            function tween(t) {
              state.selection = t === 1 && selection1 === null ? null : i(t);
              redraw.call(that);
              emit.brush();
            }

            return selection0 !== null && selection1 !== null ? tween : tween(1);
          });
    } else {
      group
          .each(function() {
            var that = this,
                args = arguments,
                state = that.__brush,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
                emit = emitter(that, args).beforestart();

            interrupt(that);
            state.selection = selection1 === null ? null : selection1;
            redraw.call(that);
            emit.start(event).brush(event).end(event);
          });
    }
  };

  brush.clear = function(group, event) {
    brush.move(group, null, event);
  };

  function redraw() {
    var group = select(this),
        selection = local(this).selection;

    if (selection) {
      group.selectAll(".selection")
          .style("display", null)
          .attr("x", selection[0][0])
          .attr("y", selection[0][1])
          .attr("width", selection[1][0] - selection[0][0])
          .attr("height", selection[1][1] - selection[0][1]);

      group.selectAll(".handle")
          .style("display", null)
          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
          .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
    }

    else {
      group.selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
    }
  }

  function emitter(that, args, clean) {
    var emit = that.__brush.emitter;
    return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
  }

  function Emitter(that, args, clean) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
    this.clean = clean;
  }

  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function(event, mode) {
      if (this.starting) this.starting = false, this.emit("start", event, mode);
      else this.emit("brush", event);
      return this;
    },
    brush: function(event, mode) {
      this.emit("brush", event, mode);
      return this;
    },
    end: function(event, mode) {
      if (--this.active === 0) delete this.state.emitter, this.emit("end", event, mode);
      return this;
    },
    emit: function(type, event, mode) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new BrushEvent(type, {
          sourceEvent: event,
          target: brush,
          selection: dim.output(this.state.selection),
          mode,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function started(event) {
    if (touchending && !event.touches) return;
    if (!filter.apply(this, arguments)) return;

    var that = this,
        type = event.target.__data__.type,
        mode = (keys && event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (keys && event.altKey ? MODE_CENTER : MODE_HANDLE),
        signX = dim === Y ? null : signsX[type],
        signY = dim === X ? null : signsY[type],
        state = local(that),
        extent = state.extent,
        selection = state.selection,
        W = extent[0][0], w0, w1,
        N = extent[0][1], n0, n1,
        E = extent[1][0], e0, e1,
        S = extent[1][1], s0, s1,
        dx = 0,
        dy = 0,
        moving,
        shifting = signX && signY && keys && event.shiftKey,
        lockX,
        lockY,
        points = Array.from(event.touches || [event], t => {
          const i = t.identifier;
          t = pointer(t, that);
          t.point0 = t.slice();
          t.identifier = i;
          return t;
        });

    interrupt(that);
    var emit = emitter(that, arguments, true).beforestart();

    if (type === "overlay") {
      if (selection) moving = true;
      const pts = [points[0], points[1] || points[0]];
      state.selection = selection = [[
          w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),
          n0 = dim === X ? N : min(pts[0][1], pts[1][1])
        ], [
          e0 = dim === Y ? E : max(pts[0][0], pts[1][0]),
          s0 = dim === X ? S : max(pts[0][1], pts[1][1])
        ]];
      if (points.length > 1) move(event);
    } else {
      w0 = selection[0][0];
      n0 = selection[0][1];
      e0 = selection[1][0];
      s0 = selection[1][1];
    }

    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;

    var group = select(that)
        .attr("pointer-events", "none");

    var overlay = group.selectAll(".overlay")
        .attr("cursor", cursors[type]);

    if (event.touches) {
      emit.moved = moved;
      emit.ended = ended;
    } else {
      var view = select(event.view)
          .on("mousemove.brush", moved, true)
          .on("mouseup.brush", ended, true);
      if (keys) view
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)

      dragDisable(event.view);
    }

    redraw.call(that);
    emit.start(event, mode.name);

    function moved(event) {
      for (const p of event.changedTouches || [event]) {
        for (const d of points)
          if (d.identifier === p.identifier) d.cur = pointer(p, that);
      }
      if (shifting && !lockX && !lockY && points.length === 1) {
        const point = points[0];
        if (abs(point.cur[0] - point[0]) > abs(point.cur[1] - point[1]))
          lockY = true;
        else
          lockX = true;
      }
      for (const point of points)
        if (point.cur) point[0] = point.cur[0], point[1] = point.cur[1];
      moving = true;
      noevent(event);
      move(event);
    }

    function move(event) {
      const point = points[0], point0 = point.point0;
      var t;

      dx = point[0] - point0[0];
      dy = point[1] - point0[1];

      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = max(W - w0, min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = max(N - n0, min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (points[1]) {
            if (signX) w1 = max(W, min(E, points[0][0])), e1 = max(W, min(E, points[1][0])), signX = 1;
            if (signY) n1 = max(N, min(S, points[0][1])), s1 = max(N, min(S, points[1][1])), signY = 1;
          } else {
            if (signX < 0) dx = max(W - w0, min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
            else if (signX > 0) dx = max(W - e0, min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
            if (signY < 0) dy = max(N - n0, min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
            else if (signY > 0) dy = max(N - s0, min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
          }
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = max(W, min(E, w0 - dx * signX)), e1 = max(W, min(E, e0 + dx * signX));
          if (signY) n1 = max(N, min(S, n0 - dy * signY)), s1 = max(N, min(S, s0 + dy * signY));
          break;
        }
      }

      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
      }

      if (s1 < n1) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n1, n1 = s1, s1 = t;
        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
      }

      if (state.selection) selection = state.selection; // May be set by brush.move!
      if (lockX) w1 = selection[0][0], e1 = selection[1][0];
      if (lockY) n1 = selection[0][1], s1 = selection[1][1];

      if (selection[0][0] !== w1
          || selection[0][1] !== n1
          || selection[1][0] !== e1
          || selection[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush(event, mode.name);
      }
    }

    function ended(event) {
      nopropagation(event);
      if (event.touches) {
        if (event.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      } else {
        dragEnable(event.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
      if (brush_empty(selection)) state.selection = null, redraw.call(that);
      emit.end(event, mode.name);
    }

    function keydowned(event) {
      switch (event.keyCode) {
        case 16: { // SHIFT
          shifting = signX && signY;
          break;
        }
        case 18: { // ALT
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
            mode = MODE_CENTER;
            move(event);
          }
          break;
        }
        case 32: { // SPACE; takes priority over ALT
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move(event);
          }
          break;
        }
        default: return;
      }
      noevent(event);
    }

    function keyupped(event) {
      switch (event.keyCode) {
        case 16: { // SHIFT
          if (shifting) {
            lockX = lockY = shifting = false;
            move(event);
          }
          break;
        }
        case 18: { // ALT
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
            mode = MODE_HANDLE;
            move(event);
          }
          break;
        }
        case 32: { // SPACE
          if (mode === MODE_SPACE) {
            if (event.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type]);
            move(event);
          }
          break;
        }
        default: return;
      }
      noevent(event);
    }
  }

  function touchmoved(event) {
    emitter(this, arguments).moved(event);
  }

  function touchended(event) {
    emitter(this, arguments).ended(event);
  }

  function initialize() {
    var state = this.__brush || {selection: null};
    state.extent = number2(extent.apply(this, arguments));
    state.dim = dim;
    return state;
  }

  brush.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant(number2(_)), brush) : extent;
  };

  brush.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush) : filter;
  };

  brush.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), brush) : touchable;
  };

  brush.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush) : handleSize;
  };

  brush.keyModifiers = function(_) {
    return arguments.length ? (keys = !!_, brush) : keys;
  };

  brush.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush : value;
  };

  return brush;
}

;// ./node_modules/d3-brush/src/index.js


;// ./node_modules/d3-selection/src/select.js


/* harmony default export */ function src_select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

;// ./node_modules/d3-selection/src/sourceEvent.js
/* harmony default export */ function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

;// ./node_modules/d3-selection/src/pointer.js


/* harmony default export */ function src_pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

;// ./node_modules/d3-drag/src/noevent.js
// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function noevent_nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ function src_noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

;// ./node_modules/d3-drag/src/nodrag.js



/* harmony default export */ function nodrag(view) {
  var root = view.document.documentElement,
      selection = src_select(view).on("dragstart.drag", src_noevent, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", src_noevent, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = src_select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", src_noevent, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

;// ./node_modules/d3-drag/src/constant.js
/* harmony default export */ const d3_drag_src_constant = (x => () => x);

;// ./node_modules/d3-drag/src/event.js
function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

;// ./node_modules/d3-drag/src/drag.js







// Ignore right-click, since that should open the context menu.
function drag_defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function drag_defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

/* harmony default export */ function src_drag() {
  var filter = drag_defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = drag_defaultTouchable,
      gestures = {},
      listeners = src_dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, nonpassive)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    src_select(event.view)
      .on("mousemove.drag", mousemoved, nonpassivecapture)
      .on("mouseup.drag", mouseupped, nonpassivecapture);
    nodrag(event.view);
    noevent_nopropagation(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    src_noevent(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    src_select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    src_noevent(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        noevent_nopropagation(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        src_noevent(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent_nopropagation(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = src_pointer(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = src_pointer(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : d3_drag_src_constant(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : d3_drag_src_constant(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : d3_drag_src_constant(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : d3_drag_src_constant(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

;// ./node_modules/d3-drag/src/index.js



;// ./node_modules/d3-force/src/center.js
/* harmony default export */ function center(x, y) {
  var nodes, strength = 1;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  return force;
}

;// ./node_modules/d3-quadtree/src/add.js
/* harmony default export */ function add(d) {
  const x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add_add(this.cover(x, y), x, y, d);
}

function add_add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add_add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

;// ./node_modules/d3-quadtree/src/cover.js
/* harmony default export */ function cover(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

;// ./node_modules/d3-quadtree/src/data.js
/* harmony default export */ function src_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}

;// ./node_modules/d3-quadtree/src/extent.js
/* harmony default export */ function extent(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

;// ./node_modules/d3-quadtree/src/quad.js
/* harmony default export */ function quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

;// ./node_modules/d3-quadtree/src/find.js


/* harmony default export */ function src_find(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new quad(node[3], xm, ym, x2, y2),
        new quad(node[2], x1, ym, xm, y2),
        new quad(node[1], xm, y1, x2, ym),
        new quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

;// ./node_modules/d3-quadtree/src/remove.js
/* harmony default export */ function src_remove(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

;// ./node_modules/d3-quadtree/src/root.js
/* harmony default export */ function src_root() {
  return this._root;
}

;// ./node_modules/d3-quadtree/src/size.js
/* harmony default export */ function src_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}

;// ./node_modules/d3-quadtree/src/visit.js


/* harmony default export */ function visit(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}

;// ./node_modules/d3-quadtree/src/visitAfter.js


/* harmony default export */ function visitAfter(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

;// ./node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}

/* harmony default export */ function x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

;// ./node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}

/* harmony default export */ function y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

;// ./node_modules/d3-quadtree/src/quadtree.js













function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = add;
treeProto.addAll = addAll;
treeProto.cover = cover;
treeProto.data = src_data;
treeProto.extent = extent;
treeProto.find = src_find;
treeProto.remove = src_remove;
treeProto.removeAll = removeAll;
treeProto.root = src_root;
treeProto.size = src_size;
treeProto.visit = visit;
treeProto.visitAfter = visitAfter;
treeProto.x = x;
treeProto.y = y;

;// ./node_modules/d3-force/src/constant.js
/* harmony default export */ function d3_force_src_constant(x) {
  return function() {
    return x;
  };
}

;// ./node_modules/d3-force/src/jiggle.js
/* harmony default export */ function jiggle(random) {
  return (random() - 0.5) * 1e-6;
}

;// ./node_modules/d3-force/src/collide.js




function collide_x(d) {
  return d.x + d.vx;
}

function collide_y(d) {
  return d.y + d.vy;
}

/* harmony default export */ function collide(radius) {
  var nodes,
      radii,
      random,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = d3_force_src_constant(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, collide_x, collide_y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(random), l += x * x;
            if (y === 0) y = jiggle(random), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : d3_force_src_constant(+_), initialize(), force) : radius;
  };

  return force;
}

;// ./node_modules/d3-force/src/link.js



function index(d) {
  return d.index;
}

function link_find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}

/* harmony default export */ function src_link(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = d3_force_src_constant(30),
      distances,
      nodes,
      count,
      bias,
      random,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle(random);
        y = target.y + target.vy - source.y - source.vy || jiggle(random);
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = link_find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = link_find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : d3_force_src_constant(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : d3_force_src_constant(+_), initializeDistance(), force) : distance;
  };

  return force;
}

;// ./node_modules/d3-force/src/lcg.js
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

/* harmony default export */ function lcg() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

;// ./node_modules/d3-force/src/simulation.js




function simulation_x(d) {
  return d.x;
}

function simulation_y(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

/* harmony default export */ function src_simulation(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = new Map(),
      stepper = timer(step),
      event = src_dispatch("tick", "end"),
      random = lcg();

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.forEach(function(force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

;// ./node_modules/d3-force/src/manyBody.js





/* harmony default export */ function manyBody() {
  var nodes,
      node,
      random,
      alpha,
      strength = d3_force_src_constant(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, simulation_x, simulation_y).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (y === 0) y = jiggle(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = jiggle(random), l += x * x;
      if (y === 0) y = jiggle(random), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : d3_force_src_constant(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}

;// ./node_modules/d3-force/src/index.js









;// ./node_modules/d3-selection/src/index.js
















;// ./node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

/* harmony default export */ const src_zoom = ((function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      }
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      }
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4));

;// ./node_modules/d3-zoom/src/constant.js
/* harmony default export */ const d3_zoom_src_constant = (x => () => x);

;// ./node_modules/d3-zoom/src/event.js
function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

;// ./node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var transform_identity = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return transform_identity;
  return node.__zoom;
}

;// ./node_modules/d3-zoom/src/noevent.js
function src_noevent_nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ function d3_zoom_src_noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

;// ./node_modules/d3-zoom/src/zoom.js










// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function zoom_defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function zoom_defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || transform_identity;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function zoom_defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ function d3_zoom_src_zoom() {
  var filter = zoom_defaultFilter,
      extent = zoom_defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = zoom_defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = src_zoom,
      listeners = src_dispatch("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(transform_identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = src_select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = src_pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      src_interrupt(this);
      g.start();
    }

    d3_zoom_src_noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = src_select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = src_pointer(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    nodrag(event.view);
    src_noevent_nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    src_interrupt(this);
    g.start();

    function mousemoved(event) {
      d3_zoom_src_noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = src_pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      d3_zoom_src_noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = src_pointer(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    d3_zoom_src_noevent(event);
    if (duration > 0) src_select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else src_select(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    src_noevent_nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = src_pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      src_interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    d3_zoom_src_noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = src_pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    src_noevent_nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = src_pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = src_select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : d3_zoom_src_constant(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : d3_zoom_src_constant(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : d3_zoom_src_constant(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : d3_zoom_src_constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}

;// ./node_modules/d3-zoom/src/index.js



;// ./node_modules/d3/src/index.js































;// ./src/utils/constants.js
// Application constants and configuration

// Entity types
const ENTITY_TYPES = {
  PERSON: 'person',
  COMPANY: 'company',
  TECHNOLOGY: 'technology',
  CONCEPT: 'concept'
};

// Relationship types
const RELATIONSHIP_TYPES = {
  DIRECT: 'direct',
  CONCEPTUAL: 'conceptual',
  TEMPORAL: 'temporal',
  CAUSAL: 'causal'
};

// AI API configuration
const AI_CONFIG = {
  MAX_ARTICLE_CHARS: 6000,
  // Reduced for faster processing
  MAX_ENTITIES_PER_ARTICLE: 8,
  // Reduced for faster processing
  MAX_RELATIONSHIP_CANDIDATES: 8,
  // Reduced for faster processing
  ENTITY_EXTRACTION_TEMPERATURE: 0.3,
  RELATIONSHIP_INFERENCE_TEMPERATURE: 0.3,
  SUMMARIZER_LENGTH: 'short',
  // Changed to 'short' for faster processing
  SUMMARIZER_TYPE: 'key-points',
  SUMMARIZER_FORMAT: 'markdown'
};

// Graph visualization configuration
const GRAPH_CONFIG = {
  CANVAS_THRESHOLD: 200,
  FORCE_STRENGTH: -30,
  FORCE_DISTANCE: 100,
  COLLISION_RADIUS: 20,
  DEFAULT_NODE_SIZE: 8,
  SELECTED_NODE_SIZE: 12,
  LINK_WIDTH: 1.5
};

// UI configuration
const UI_CONFIG = {
  POPUP_WIDTH: 800,
  POPUP_HEIGHT: 600,
  INSIGHTS_LIMIT: 5,
  RECENT_ARTICLES_LIMIT: 10
};

// Default user topics
const DEFAULT_TOPICS = ['AI', 'Technology', 'Science', 'Business', 'Innovation'];

// Storage keys
const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings'
};
/* harmony default export */ const constants = ({
  ENTITY_TYPES,
  RELATIONSHIP_TYPES,
  AI_CONFIG,
  GRAPH_CONFIG,
  UI_CONFIG,
  DEFAULT_TOPICS,
  STORAGE_KEYS
});
;// ./src/graph-page/components/KnowledgeGraph.jsx



function KnowledgeGraph({
  data,
  selectedNode,
  onNodeClick,
  searchQuery,
  highlightedEntities
}) {
  const svgRef = (0,react.useRef)(null);
  const simulationRef = (0,react.useRef)(null);
  const [dimensions, setDimensions] = (0,react.useState)({
    width: 800,
    height: 600
  });

  // Entity type colors (brighter for dark background)
  const colorScale = {
    [ENTITY_TYPES.PERSON]: '#60a5fa',
    [ENTITY_TYPES.COMPANY]: '#a78bfa',
    [ENTITY_TYPES.TECHNOLOGY]: '#34d399',
    [ENTITY_TYPES.CONCEPT]: '#fbbf24'
  };
  (0,react.useEffect)(() => {
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
  (0,react.useEffect)(() => {
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
    const svg = src_select(svgRef.current);
    svg.selectAll('*').remove();
    svg.append('text').attr('x', dimensions.width / 2).attr('y', dimensions.height / 2 - 20).attr('text-anchor', 'middle').attr('class', 'empty-state-title').style('font-size', '20px').style('font-weight', '600').style('fill', '#6b7280').text('No entities yet');
    svg.append('text').attr('x', dimensions.width / 2).attr('y', dimensions.height / 2 + 10).attr('text-anchor', 'middle').attr('class', 'empty-state-text').style('font-size', '14px').style('fill', '#9ca3af').text('Capture insights from articles to build your knowledge graph');
  };
  const renderGraph = () => {
    const svg = src_select(svgRef.current);
    svg.selectAll('*').remove();

    // Create deep copies to avoid D3 mutating original data
    const nodes = data.nodes.map(d => ({
      ...d
    }));
    const links = data.links.map(d => ({
      ...d
    }));

    // Create zoom behavior
    const zoom = d3_zoom_src_zoom().scaleExtent([0.1, 4]).on('zoom', event => {
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
    const simulation = src_simulation(nodes).force('link', src_link(links).id(d => d.id).distance(d => {
      // Much more spacing - 150-300px between nodes
      const strength = d.strength || 0.5;
      return Math.max(150, 300 - strength * 150);
    }).strength(d => {
      // Stronger pull for high-strength relationships
      return (d.strength || 0.5) * 0.8;
    })).force('charge', manyBody().strength(-500)) // Much stronger repulsion for better spacing
    .force('center', center(dimensions.width / 2, dimensions.height / 2)).force('collision', collide().radius(GRAPH_CONFIG.COLLISION_RADIUS)).force('articleCluster', alpha => {
      // Custom force to cluster nodes from same article
      articleNodes.forEach(nodeIds => {
        if (nodeIds.length < 2) return;

        // Calculate centroid of this article's nodes
        const clusterNodes = nodes.filter(n => nodeIds.includes(n.id));
        const cx = mean(clusterNodes, n => n.x);
        const cy = mean(clusterNodes, n => n.y);

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
    const link = g.append('g').attr('class', 'links').selectAll('line').data(links).join('line').attr('stroke', d => {
      const strength = d.strength || 0.5;
      // Stronger = more blue/purple, weaker = gray
      if (strength > 0.7) return '#667eea';
      if (strength > 0.5) return '#6b7ea8';
      return '#4a5568';
    }).attr('stroke-opacity', d => {
      // Opacity scales with strength: 0.3 to 0.9
      const strength = d.strength || 0.5;
      return 0.3 + strength * 0.6;
    }).attr('stroke-width', d => {
      // Thickness scales with strength: 1px to 4px
      const strength = d.strength || 0.5;
      return 1 + strength * 3;
    }).style('pointer-events', 'none');

    // Add relationship labels to links - makes the graph way more useful
    const linkLabels = g.append('g').attr('class', 'link-labels').selectAll('text').data(links.filter(d => (d.strength || 0) > 0.6)) // Only show labels for strong connections (reduces clutter)
    .join('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('font-size', '11px').attr('font-family', 'system-ui, sans-serif').attr('fill', '#a0a0a0').attr('stroke', '#0f0f23').attr('stroke-width', '2').attr('paint-order', 'stroke fill').text(d => {
      const strength = d.strength || 0;
      if (strength > 0.8) return 'co-mentioned often';
      if (strength > 0.6) return 'related';
      return '';
    }).style('pointer-events', 'none');

    // Create node groups
    const node = g.append('g').attr('class', 'nodes').selectAll('g').data(nodes).join('g').call(drag(simulation));

    // Helper function to check if node should be highlighted
    const isHighlighted = d => {
      if (searchQuery && d.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      if (highlightedEntities && highlightedEntities.length > 0 && highlightedEntities.includes(d.id)) {
        return true;
      }
      return false;
    };
    const isDimmed = d => {
      if (searchQuery || highlightedEntities && highlightedEntities.length > 0) {
        return !isHighlighted(d);
      }
      return false;
    };

    // Add circles to nodes
    node.append('circle').attr('r', d => {
      const baseSize = GRAPH_CONFIG.DEFAULT_NODE_SIZE;
      const degreeBonus = Math.sqrt(d.degree || 0) * 2;
      const highlightBonus = isHighlighted(d) ? 3 : 0;
      // Primary nodes (from selected article) are larger
      const primaryBonus = d.isFromSelectedArticle ? 4 : 0;
      return baseSize + degreeBonus + highlightBonus + primaryBonus;
    }).attr('fill', d => colorScale[d.type] || '#6b7280').attr('stroke', d => {
      if (selectedNode && selectedNode.id === d.id) return '#ffffff';
      if (isHighlighted(d)) return '#fbbf24';
      // Primary nodes have brighter border
      if (d.isFromSelectedArticle) return '#ffffff';
      return '#2d2d44';
    }).attr('stroke-width', d => {
      if (selectedNode && selectedNode.id === d.id) return 3;
      if (isHighlighted(d)) return 3;
      // Primary nodes have thicker border
      if (d.isFromSelectedArticle) return 3;
      return 2;
    }).attr('opacity', d => {
      if (isDimmed(d)) return 0.3;
      // Secondary nodes (connected) are more subtle
      return d.isFromSelectedArticle ? 1 : 0.7;
    }).style('cursor', 'pointer').style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');

    // Add labels to nodes
    node.append('text').text(d => d.name).attr('x', 12).attr('y', 4).attr('font-size', d => isHighlighted(d) ? '13px' : '12px').attr('font-family', 'system-ui, -apple-system, sans-serif').attr('font-weight', d => isHighlighted(d) ? '600' : '500').attr('fill', d => isDimmed(d) ? '#666' : '#e0e0e0').style('pointer-events', 'none').style('user-select', 'none');

    // Add hover effects
    node.style('cursor', 'pointer').on('mouseenter', function (event, d) {
      const circle = src_select(this).select('circle');
      const text = src_select(this).select('text');

      // Highlight node
      circle.transition().duration(150).attr('opacity', 1).attr('stroke-width', 3.5).attr('r', circle.attr('r') * 1.15);
      text.transition().duration(150).attr('font-size', '14px').attr('font-weight', '700').attr('fill', '#ffffff');

      // Highlight connected links
      link.transition().duration(150).attr('stroke-opacity', linkData => {
        const isConnected = linkData.source.id === d.id || linkData.target.id === d.id;
        if (isConnected) {
          const strength = linkData.strength || 0.5;
          return 0.8 + strength * 0.2; // Boost to 0.8-1.0
        }
        return (linkData.strength || 0.5) * 0.3; // Dim others
      }).attr('stroke-width', linkData => {
        const isConnected = linkData.source.id === d.id || linkData.target.id === d.id;
        const strength = linkData.strength || 0.5;
        if (isConnected) {
          return 2 + strength * 4; // Thicker: 2-6px
        }
        return 1 + strength * 3; // Normal
      });
    }).on('mouseleave', function (event, d) {
      const isSelected = selectedNode && selectedNode.id === d.id;
      const circle = src_select(this).select('circle');
      const text = src_select(this).select('text');
      const baseSize = GRAPH_CONFIG.DEFAULT_NODE_SIZE;
      const degreeBonus = Math.sqrt(d.degree || 0) * 2;
      const highlightBonus = isHighlighted(d) ? 3 : 0;
      const normalRadius = baseSize + degreeBonus + highlightBonus;

      // Restore node
      circle.transition().duration(150).attr('opacity', 0.9).attr('stroke-width', isSelected ? 3 : 1.5).attr('r', normalRadius);
      text.transition().duration(150).attr('font-size', isHighlighted(d) ? '13px' : '12px').attr('font-weight', isHighlighted(d) ? '600' : '500').attr('fill', isDimmed(d) ? '#666' : '#e0e0e0');

      // Restore links to normal
      link.transition().duration(150).attr('stroke-opacity', linkData => {
        const strength = linkData.strength || 0.5;
        return 0.3 + strength * 0.6;
      }).attr('stroke-width', linkData => {
        const strength = linkData.strength || 0.5;
        return 1 + strength * 3;
      });
    }).on('click', (event, d) => {
      event.stopPropagation();
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // Add title tooltips
    node.append('title').text(d => {
      return `${d.name}\nType: ${d.type}\nTopic: ${d.topic}\nConnections: ${d.degree || 0}`;
    });

    // Update positions on each tick
    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);

      // Position relationship labels at the center of links
      linkLabels.attr('x', d => (d.source.x + d.target.x) / 2).attr('y', d => (d.source.y + d.target.y) / 2);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Initial zoom to fit
    const initialScale = 0.9;
    svg.call(zoom.transform, transform_identity.scale(initialScale));
  };
  const drag = simulation => {
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
    return src_drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "knowledge-graph-container",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/react.createElement("svg", {
    ref: svgRef,
    width: dimensions.width,
    height: dimensions.height,
    style: {
      display: 'block'
    }
  }));
}
/* harmony default export */ const components_KnowledgeGraph = (KnowledgeGraph);
;// ./src/graph-page/components/NodeDetails.jsx

function NodeDetails({
  node,
  graphEngine,
  onClose,
  onNodeNavigate
}) {
  const [sourceArticles, setSourceArticles] = (0,react.useState)([]);
  const [relationships, setRelationships] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    if (node) {
      loadArticlesSources();
      loadRelationships();
    }
  }, [node]);
  async function loadArticlesSources() {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_ALL_ARTICLES'
      });
      if (response.success) {
        const articles = response.articles.filter(article => article.entities && article.entities.includes(node.id));
        setSourceArticles(articles);
      }
    } catch (error) {
      console.error('Failed to load article sources:', error);
    }
  }
  async function loadRelationships() {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_GRAPH_DATA'
      });
      if (response.success && response.data) {
        const nodeRelationships = response.data.links.filter(link => link.source === node.id || link.target === node.id).map(link => {
          const otherEntityId = link.source === node.id ? link.target : link.source;
          const otherEntity = response.data.nodes.find(n => n.id === otherEntityId);
          return {
            ...link,
            otherEntity: otherEntity || {
              name: 'Unknown',
              id: otherEntityId
            }
          };
        });
        setRelationships(nodeRelationships);
      }
    } catch (error) {
      console.error('Failed to load relationships:', error);
    }
  }
  if (!node) {
    return /*#__PURE__*/react.createElement("div", {
      className: "node-details empty"
    }, /*#__PURE__*/react.createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react.createElement("p", null, "Click a node to see details")));
  }
  const neighbors = graphEngine ? graphEngine.getNeighbors(node.id) : [];
  const neighborEntities = neighbors.map(id => {
    const neighborData = graphEngine.cache.entities.get(id);
    return neighborData ? {
      ...neighborData,
      degree: graphEngine.getDegree(id)
    } : null;
  }).filter(Boolean).sort((a, b) => b.degree - a.degree);
  const typeLabel = node.type.charAt(0).toUpperCase() + node.type.slice(1);
  const relevancePercentage = Math.round((node.relevance || 0) * 100);
  const formatDate = timestamp => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  const handleNeighborClick = neighbor => {
    if (onNodeNavigate) {
      onNodeNavigate(neighbor);
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "node-details"
  }, /*#__PURE__*/react.createElement("div", {
    className: "node-details-header"
  }, /*#__PURE__*/react.createElement("div", {
    className: "node-title"
  }, /*#__PURE__*/react.createElement("h3", null, node.name), /*#__PURE__*/react.createElement("button", {
    className: "close-button",
    onClick: onClose,
    "aria-label": "Close details"
  }, "\xD7")), /*#__PURE__*/react.createElement("div", {
    className: "node-meta"
  }, /*#__PURE__*/react.createElement("span", {
    className: `badge badge-${node.type}`
  }, typeLabel), node.topic && /*#__PURE__*/react.createElement("span", {
    className: "badge badge-topic"
  }, node.topic))), /*#__PURE__*/react.createElement("div", {
    className: "node-details-content"
  }, node.context && /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Context"), /*#__PURE__*/react.createElement("p", {
    className: "node-context"
  }, node.context)), /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Properties"), /*#__PURE__*/react.createElement("div", {
    className: "property-grid"
  }, /*#__PURE__*/react.createElement("div", {
    className: "property"
  }, /*#__PURE__*/react.createElement("span", {
    className: "property-label"
  }, "Type"), /*#__PURE__*/react.createElement("span", {
    className: "property-value"
  }, typeLabel)), /*#__PURE__*/react.createElement("div", {
    className: "property"
  }, /*#__PURE__*/react.createElement("span", {
    className: "property-label"
  }, "Topic"), /*#__PURE__*/react.createElement("span", {
    className: "property-value"
  }, node.topic || 'None')), /*#__PURE__*/react.createElement("div", {
    className: "property"
  }, /*#__PURE__*/react.createElement("span", {
    className: "property-label"
  }, "Relevance"), /*#__PURE__*/react.createElement("span", {
    className: "property-value"
  }, relevancePercentage, "%")), /*#__PURE__*/react.createElement("div", {
    className: "property"
  }, /*#__PURE__*/react.createElement("span", {
    className: "property-label"
  }, "Connections"), /*#__PURE__*/react.createElement("span", {
    className: "property-value"
  }, node.degree || 0)), /*#__PURE__*/react.createElement("div", {
    className: "property"
  }, /*#__PURE__*/react.createElement("span", {
    className: "property-label"
  }, "Added"), /*#__PURE__*/react.createElement("span", {
    className: "property-value"
  }, formatDate(node.timestamp))))), sourceArticles.length > 0 && /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Found in Articles (", sourceArticles.length, ")"), /*#__PURE__*/react.createElement("div", {
    className: "source-articles-list"
  }, sourceArticles.slice(0, 5).map(article => /*#__PURE__*/react.createElement("div", {
    key: article.id,
    className: "source-article-item"
  }, /*#__PURE__*/react.createElement("a", {
    href: article.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "source-article-link"
  }, article.title), /*#__PURE__*/react.createElement("span", {
    className: "source-article-date"
  }, new Date(article.capturedAt).toLocaleDateString()))), sourceArticles.length > 5 && /*#__PURE__*/react.createElement("div", {
    className: "source-articles-more"
  }, "+", sourceArticles.length - 5, " more articles"))), relationships.length > 0 && /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Relationships (", relationships.length, ")"), /*#__PURE__*/react.createElement("div", {
    className: "relationships-list"
  }, relationships.slice(0, 8).map((rel, idx) => /*#__PURE__*/react.createElement("div", {
    key: idx,
    className: "relationship-item"
  }, /*#__PURE__*/react.createElement("div", {
    className: "relationship-info"
  }, /*#__PURE__*/react.createElement("span", {
    className: "relationship-type"
  }, rel.type || 'related_to'), /*#__PURE__*/react.createElement("span", {
    className: "relationship-entity"
  }, rel.otherEntity.name)), /*#__PURE__*/react.createElement("span", {
    className: "relationship-strength"
  }, Math.round((rel.strength || 0) * 100), "%"))), relationships.length > 8 && /*#__PURE__*/react.createElement("div", {
    className: "relationships-more"
  }, "+", relationships.length - 8, " more relationships"))), neighborEntities.length > 0 && /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Connected Entities (", neighborEntities.length, ")"), /*#__PURE__*/react.createElement("div", {
    className: "neighbors-list"
  }, neighborEntities.slice(0, 10).map(neighbor => /*#__PURE__*/react.createElement("div", {
    key: neighbor.id,
    className: "neighbor-item",
    onClick: () => handleNeighborClick(neighbor),
    role: "button",
    tabIndex: 0,
    onKeyPress: e => {
      if (e.key === 'Enter') handleNeighborClick(neighbor);
    }
  }, /*#__PURE__*/react.createElement("div", {
    className: "neighbor-info"
  }, /*#__PURE__*/react.createElement("span", {
    className: "neighbor-name"
  }, neighbor.name), /*#__PURE__*/react.createElement("span", {
    className: `neighbor-type type-${neighbor.type}`
  }, neighbor.type)), /*#__PURE__*/react.createElement("div", {
    className: "neighbor-meta"
  }, /*#__PURE__*/react.createElement("span", {
    className: "neighbor-degree"
  }, neighbor.degree, " connections")))), neighborEntities.length > 10 && /*#__PURE__*/react.createElement("div", {
    className: "neighbors-more"
  }, "+", neighborEntities.length - 10, " more connections"))), (!neighborEntities || neighborEntities.length === 0) && /*#__PURE__*/react.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/react.createElement("h4", null, "Connected Entities"), /*#__PURE__*/react.createElement("div", {
    className: "empty-state-small"
  }, /*#__PURE__*/react.createElement("p", null, "No connections yet")))));
}
/* harmony default export */ const components_NodeDetails = (NodeDetails);
;// ./src/graph-page/components/InsightPanel.jsx

function InsightPanel({
  graphData,
  onEntityClick
}) {
  const [discovering, setDiscovering] = (0,react.useState)(false);
  const [synthesizing, setSynthesizing] = (0,react.useState)(false);
  const [syntheses, setSyntheses] = (0,react.useState)([]);
  const [selectedSynthesis, setSelectedSynthesis] = (0,react.useState)(null);
  (0,react.useEffect)(() => {
    loadSyntheses();
    const messageListener = message => {
      if (message.type === 'SYNTHESIS_COMPLETE') {
        loadSyntheses();
        setSynthesizing(false);

        // Show brief success notification
        const notification = document.createElement('div');
        notification.textContent = '✨ Weekly synthesis complete!';
        notification.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  async function loadSyntheses() {
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'GET_ALL_SYNTHESES'
      });
      if (result.success) {
        setSyntheses(result.syntheses || []);
        if (result.syntheses.length > 0 && !selectedSynthesis) {
          setSelectedSynthesis(result.syntheses[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load syntheses:', error);
    }
  }
  async function handleSynthesizeWeek() {
    if (synthesizing) return;
    setSynthesizing(true);
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'SYNTHESIZE_WEEK'
      });
      if (!result.success) {
        alert('Synthesis failed: ' + (result.error || 'Unknown error'));
        setSynthesizing(false);
      }
      // On success, keep synthesizing=true until SYNTHESIS_COMPLETE message arrives
    } catch (error) {
      console.error('Synthesis failed:', error);
      alert('Synthesis failed. Writer API may not be available.');
      setSynthesizing(false);
    }
  }
  async function handleManualDiscovery() {
    if (discovering) return;
    setDiscovering(true);
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'DISCOVER_RELATIONSHIPS'
      });
      if (result.success && result.relationshipsFound > 0) {
        alert(`Found ${result.relationshipsFound} new relationships!`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert('No new relationships found.');
      }
    } catch (error) {
      console.error('Manual discovery failed:', error);
      alert('Discovery failed. Please try again.');
    } finally {
      setDiscovering(false);
    }
  }
  if (!graphData || graphData.nodes.length === 0) {
    return /*#__PURE__*/react.createElement("div", {
      className: "insight-panel"
    }, /*#__PURE__*/react.createElement("div", {
      className: "panel-placeholder"
    }, /*#__PURE__*/react.createElement("h3", null, "No insights yet"), /*#__PURE__*/react.createElement("p", null, "Capture articles to see AI-generated insights")));
  }
  const entityTypes = graphData.nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {});
  const totalEntities = graphData.nodes.length;
  const entityTypeBreakdown = Object.entries(entityTypes).map(([type, count]) => ({
    type,
    count,
    percentage: (count / totalEntities * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);

  // Calculate actual degrees from links
  const entityDegrees = new Map();
  graphData.links.forEach(link => {
    entityDegrees.set(link.source, (entityDegrees.get(link.source) || 0) + 1);
    entityDegrees.set(link.target, (entityDegrees.get(link.target) || 0) + 1);
  });
  const topEntities = [...graphData.nodes].map(node => ({
    ...node,
    actualDegree: entityDegrees.get(node.id) || 0
  })).filter(e => e.actualDegree > 0).sort((a, b) => b.actualDegree - a.actualDegree).slice(0, 5);
  const avgConnections = graphData.nodes.length > 0 ? (graphData.links.length * 2 / graphData.nodes.length).toFixed(1) : 0;
  return /*#__PURE__*/react.createElement("div", {
    className: "insight-panel"
  }, /*#__PURE__*/react.createElement("h2", null, "Insights"), /*#__PURE__*/react.createElement("div", {
    className: "insights-list"
  }, /*#__PURE__*/react.createElement("div", {
    className: "insight-card"
  }, /*#__PURE__*/react.createElement("h3", null, "Knowledge Overview"), /*#__PURE__*/react.createElement("div", {
    className: "stats-grid"
  }, /*#__PURE__*/react.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/react.createElement("div", {
    className: "stat-number"
  }, graphData.nodes.length), /*#__PURE__*/react.createElement("div", {
    className: "stat-label"
  }, "Total Entities")), /*#__PURE__*/react.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/react.createElement("div", {
    className: "stat-number"
  }, graphData.links.length), /*#__PURE__*/react.createElement("div", {
    className: "stat-label"
  }, "Connections")), /*#__PURE__*/react.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/react.createElement("div", {
    className: "stat-number"
  }, avgConnections), /*#__PURE__*/react.createElement("div", {
    className: "stat-label"
  }, "Avg Connections/Entity")))), /*#__PURE__*/react.createElement("div", {
    className: "insight-card"
  }, /*#__PURE__*/react.createElement("h3", null, "Entity Distribution"), /*#__PURE__*/react.createElement("p", {
    style: {
      fontSize: '13px',
      color: '#888',
      marginBottom: '15px'
    }
  }, "Breakdown of your knowledge graph by entity type"), /*#__PURE__*/react.createElement("div", {
    className: "entity-types"
  }, entityTypeBreakdown.map(({
    type,
    count,
    percentage
  }) => /*#__PURE__*/react.createElement("div", {
    key: type,
    className: "type-row"
  }, /*#__PURE__*/react.createElement("div", {
    className: "type-info"
  }, /*#__PURE__*/react.createElement("span", {
    className: "type-name"
  }, type), /*#__PURE__*/react.createElement("span", {
    className: "type-count"
  }, count, " (", percentage, "%)")), /*#__PURE__*/react.createElement("div", {
    className: "type-bar"
  }, /*#__PURE__*/react.createElement("div", {
    className: "type-bar-fill",
    style: {
      width: `${percentage}%`,
      background: type === 'person' ? '#60a5fa' : type === 'company' ? '#a78bfa' : type === 'technology' ? '#34d399' : '#fbbf24'
    }
  })))))), /*#__PURE__*/react.createElement("div", {
    className: "insight-card"
  }, /*#__PURE__*/react.createElement("h3", null, "Most Connected Entities"), topEntities.length > 0 ? /*#__PURE__*/react.createElement("div", {
    className: "top-entities"
  }, topEntities.map(entity => /*#__PURE__*/react.createElement("div", {
    key: entity.id,
    className: "entity-row clickable-entity",
    onClick: () => onEntityClick && onEntityClick(entity),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react.createElement("span", {
    className: "entity-name"
  }, entity.name), /*#__PURE__*/react.createElement("span", {
    className: "entity-connections"
  }, entity.actualDegree, " connections")))) : /*#__PURE__*/react.createElement("p", {
    style: {
      color: '#888',
      fontSize: '14px'
    }
  }, "No connections yet. Capture more articles to discover relationships!")), /*#__PURE__*/react.createElement("div", {
    className: "insight-card"
  }, /*#__PURE__*/react.createElement("h3", null, "Weekly Learning Synthesis"), /*#__PURE__*/react.createElement("p", {
    style: {
      fontSize: '14px',
      color: '#888',
      lineHeight: '1.6',
      marginBottom: '12px'
    }
  }, "Generate an AI narrative summary of your learning journey this week"), /*#__PURE__*/react.createElement("button", {
    onClick: handleSynthesizeWeek,
    disabled: synthesizing || graphData.nodes.length < 5,
    style: {
      padding: '12px 24px',
      background: synthesizing ? '#888' : 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      cursor: synthesizing || graphData.nodes.length < 5 ? 'not-allowed' : 'pointer',
      width: '100%',
      marginBottom: syntheses.length > 0 ? '16px' : '0'
    }
  }, synthesizing ? 'Synthesizing (background)...' : '✨ Synthesize My Week'), syntheses.length > 0 && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
      marginBottom: '12px',
      flexWrap: 'wrap'
    }
  }, syntheses.map((syn, idx) => {
    const date = new Date(syn.createdAt);
    const weekStart = new Date(syn.weekStart);
    const label = idx === 0 ? 'Latest' : weekStart.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    return /*#__PURE__*/react.createElement("button", {
      key: syn.id,
      onClick: () => setSelectedSynthesis(syn),
      style: {
        padding: '8px 12px',
        background: selectedSynthesis?.id === syn.id ? 'rgba(167, 139, 250, 0.3)' : 'rgba(167, 139, 250, 0.1)',
        border: `1px solid ${selectedSynthesis?.id === syn.id ? 'rgba(167, 139, 250, 0.5)' : 'rgba(167, 139, 250, 0.2)'}`,
        borderRadius: '6px',
        color: '#a78bfa',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }
    }, label);
  })), selectedSynthesis && /*#__PURE__*/react.createElement("div", {
    style: {
      padding: '16px',
      background: 'rgba(167, 139, 250, 0.1)',
      border: '1px solid rgba(167, 139, 250, 0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#e0e0e0',
      lineHeight: '1.6',
      maxHeight: '300px',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      fontWeight: '600',
      marginBottom: '8px',
      color: '#a78bfa'
    }
  }, "\uD83D\uDCDA Week of ", new Date(selectedSynthesis.weekStart).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })), /*#__PURE__*/react.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#888',
      marginBottom: '12px'
    }
  }, selectedSynthesis.articlesAnalyzed, " articles analyzed"), selectedSynthesis.synthesis))), /*#__PURE__*/react.createElement("div", {
    className: "insight-card"
  }, /*#__PURE__*/react.createElement("h3", null, "Relationship Discovery"), /*#__PURE__*/react.createElement("p", {
    style: {
      fontSize: '14px',
      color: '#888',
      lineHeight: '1.6',
      marginBottom: '12px'
    }
  }, "Glyph automatically discovers connections between entities using AI every 3 articles. You can also discover relationships manually anytime."), /*#__PURE__*/react.createElement("button", {
    onClick: handleManualDiscovery,
    disabled: discovering || graphData.nodes.length < 2,
    style: {
      padding: '12px 24px',
      background: discovering ? '#888' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      cursor: discovering || graphData.nodes.length < 2 ? 'not-allowed' : 'pointer',
      width: '100%'
    }
  }, discovering ? 'Discovering...' : 'Discover Relationships Now'), /*#__PURE__*/react.createElement("div", {
    style: {
      marginTop: '12px',
      padding: '10px',
      background: 'rgba(102, 126, 234, 0.1)',
      borderRadius: '6px',
      fontSize: '12px',
      color: '#a5b4fc'
    }
  }, "\u2713 Auto-discovery enabled (every 3 articles)"))));
}
/* harmony default export */ const components_InsightPanel = (InsightPanel);
;// ./src/graph-page/components/SettingsPanel.jsx

function SettingsPanel() {
  const [settings, setSettings] = (0,react.useState)(null);
  const [topics, setTopics] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    loadSettings();
  }, []);
  const loadSettings = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_SETTINGS'
      });
      if (response.success) {
        setSettings(response.settings);
        setTopics(response.settings.topics || []);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };
  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };
  const handleToggleAutoSave = enabled => {
    setSettings({
      ...settings,
      autoCapture: enabled
    });
  };
  const handleSave = async () => {
    try {
      const newSettings = {
        ...settings,
        topics: topics
      };
      const response = await chrome.runtime.sendMessage({
        type: 'UPDATE_SETTINGS',
        data: newSettings
      });
      if (response.success) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    }
  };
  const handleLoadMockData = async () => {
    if (!confirm('This will replace all existing data with mock data. Continue?')) {
      return;
    }
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'LOAD_MOCK_DATA',
        entityCount: 50
      });
      if (response.success) {
        alert(`Mock data loaded: ${response.stats.entitiesAdded} entities, ${response.stats.relationshipsAdded} relationships`);
      }
    } catch (error) {
      console.error('Failed to load mock data:', error);
      alert('Failed to load mock data');
    }
  };
  const handleClearAllData = async () => {
    if (!confirm('This will permanently delete ALL your knowledge graph data, including articles, entities, and relationships. This cannot be undone. Are you sure?')) {
      return;
    }
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'CLEAR_ALL_DATA'
      });
      if (response.success) {
        alert('All data has been cleared successfully.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to clear data:', error);
      alert('Failed to clear data');
    }
  };
  if (!settings) {
    return /*#__PURE__*/react.createElement("div", {
      className: "settings-panel"
    }, "Loading...");
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "settings-panel"
  }, /*#__PURE__*/react.createElement("h2", null, "Settings"), /*#__PURE__*/react.createElement("div", {
    className: "settings-section"
  }, /*#__PURE__*/react.createElement("h3", null, "Topics of Interest"), /*#__PURE__*/react.createElement("p", {
    className: "section-description"
  }, "Configure 5 topics to help Glyph focus on what matters to you"), /*#__PURE__*/react.createElement("div", {
    className: "topics-horizontal"
  }, topics.map((topic, index) => /*#__PURE__*/react.createElement("input", {
    key: index,
    type: "text",
    className: "topic-input-horizontal",
    value: topic,
    onChange: e => handleTopicChange(index, e.target.value),
    placeholder: `Topic ${index + 1}`
  }))), /*#__PURE__*/react.createElement("button", {
    className: "save-button",
    onClick: handleSave
  }, "Save Settings")), /*#__PURE__*/react.createElement("div", {
    className: "settings-section"
  }, /*#__PURE__*/react.createElement("h3", null, "Options"), /*#__PURE__*/react.createElement("div", {
    className: "settings-row"
  }, /*#__PURE__*/react.createElement("div", {
    className: "setting-item"
  }, /*#__PURE__*/react.createElement("label", {
    className: "setting-label"
  }, "Auto-Save"), /*#__PURE__*/react.createElement("p", {
    className: "setting-description"
  }, "Automatically capture articles while browsing"), /*#__PURE__*/react.createElement("label", {
    className: "toggle-switch"
  }, /*#__PURE__*/react.createElement("input", {
    type: "checkbox",
    checked: settings.autoCapture || false,
    onChange: e => handleToggleAutoSave(e.target.checked)
  }), /*#__PURE__*/react.createElement("span", {
    className: "toggle-slider"
  }))), /*#__PURE__*/react.createElement("div", {
    className: "setting-item"
  }, /*#__PURE__*/react.createElement("label", {
    className: "setting-label"
  }, "Relationship Discovery"), /*#__PURE__*/react.createElement("p", {
    className: "setting-description"
  }, "How AI finds entity connections"), /*#__PURE__*/react.createElement("select", {
    className: "setting-select",
    value: settings.topicOnlyRelationships ? 'topics' : 'all',
    onChange: e => setSettings({
      ...settings,
      topicOnlyRelationships: e.target.value === 'topics'
    })
  }, /*#__PURE__*/react.createElement("option", {
    value: "all"
  }, "All Entities"), /*#__PURE__*/react.createElement("option", {
    value: "topics"
  }, "Topics Only"))))), /*#__PURE__*/react.createElement("div", {
    className: "settings-section"
  }, /*#__PURE__*/react.createElement("button", {
    className: "danger-button",
    onClick: handleClearAllData
  }, "Clear All Data"), /*#__PURE__*/react.createElement("span", {
    style: {
      marginLeft: '15px',
      fontSize: '13px',
      color: '#9ca3af'
    }
  }, "100% private - All data stored locally")));
}
/* harmony default export */ const components_SettingsPanel = (SettingsPanel);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(556);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// ./src/graph-page/components/ChatQuery.jsx


function ChatQuery({
  selectedEntity,
  graphData
}) {
  const [answer, setAnswer] = (0,react.useState)('');
  const [loading, setLoading] = (0,react.useState)(false);
  const [isOpen, setIsOpen] = (0,react.useState)(false);
  const [smartQuestions, setSmartQuestions] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    if (selectedEntity && graphData) {
      generateSmartQuestions();
    } else {
      setSmartQuestions([]);
      setAnswer('');
    }
  }, [selectedEntity, graphData]);
  function generateSmartQuestions() {
    if (!selectedEntity) {
      setSmartQuestions([]);
      return;
    }
    const questions = [];
    const entity = selectedEntity;

    // Question 1: What articles mention this entity
    const sourceCount = entity.sources?.length || 0;
    if (sourceCount > 0) {
      questions.push({
        text: `What articles mention ${entity.name}?`,
        query: `SOURCES:${entity.id}`
      });
    }

    // Question 2: What is this entity connected to
    const neighbors = graphData.links.filter(link => link.source === entity.id || link.target === entity.id);
    if (neighbors.length > 0) {
      questions.push({
        text: `What is ${entity.name} connected to?`,
        query: `CONNECTIONS:${entity.id}`
      });
    }

    // Question 3: What type of entity is this
    if (entity.type) {
      questions.push({
        text: `Tell me about ${entity.name}`,
        query: `CONTEXT:${entity.id}`
      });
    }
    setSmartQuestions(questions.slice(0, 3));
  }
  async function handleQuestionClick(question) {
    setLoading(true);
    setAnswer('');
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ANSWER_ENTITY_QUESTION',
        entityId: selectedEntity.id,
        questionType: question.query
      });
      if (response.success) {
        setAnswer(response.answer);
      } else {
        setAnswer(response.error || 'Unable to answer this question.');
      }
    } catch (error) {
      console.error('Query error:', error);
      setAnswer('Error processing question.');
    } finally {
      setLoading(false);
    }
  }

  // Only show if entity is selected
  if (!selectedEntity || !smartQuestions.length) {
    return null;
  }
  if (!isOpen) {
    return /*#__PURE__*/react.createElement("button", {
      className: "chat-toggle",
      onClick: () => setIsOpen(true),
      title: `Ask about ${selectedEntity.name}`
    }, "\uD83D\uDCAC Ask about ", selectedEntity.name);
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "chat-query"
  }, /*#__PURE__*/react.createElement("div", {
    className: "chat-header"
  }, /*#__PURE__*/react.createElement("h3", null, "Ask about ", selectedEntity.name), /*#__PURE__*/react.createElement("button", {
    className: "chat-close",
    onClick: () => {
      setIsOpen(false);
      setAnswer('');
    }
  }, "\u2715")), /*#__PURE__*/react.createElement("div", {
    className: "chat-body"
  }, !answer && !loading && /*#__PURE__*/react.createElement("div", {
    className: "chat-suggestions"
  }, /*#__PURE__*/react.createElement("p", {
    style: {
      fontSize: '13px',
      color: '#888',
      marginBottom: '12px'
    }
  }, "Click a question:"), smartQuestions.map((question, idx) => /*#__PURE__*/react.createElement("button", {
    key: idx,
    className: "suggestion-button",
    onClick: () => handleQuestionClick(question)
  }, question.text)), /*#__PURE__*/react.createElement("div", {
    style: {
      borderTop: '1px solid #333',
      paddingTop: '12px',
      marginTop: '12px'
    }
  }, /*#__PURE__*/react.createElement("p", {
    style: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '8px'
    }
  }, "\uD83C\uDF10 Need more info? (requires internet)"), /*#__PURE__*/react.createElement("button", {
    className: "suggestion-button",
    style: {
      backgroundColor: '#1a73e8',
      color: 'white'
    },
    onClick: () => {
      const searchQuery = encodeURIComponent(selectedEntity.name);
      const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
      chrome.tabs.create({
        url: googleUrl
      });
    }
  }, "\uD83D\uDD0D Search \"", selectedEntity.name, "\" with Google"))), answer && /*#__PURE__*/react.createElement("div", {
    className: "chat-answer"
  }, /*#__PURE__*/react.createElement("p", null, answer), /*#__PURE__*/react.createElement("button", {
    className: "chat-back-btn",
    onClick: () => setAnswer(''),
    style: {
      marginTop: '12px',
      padding: '6px 12px',
      background: 'rgba(102, 126, 234, 0.1)',
      border: '1px solid rgba(102, 126, 234, 0.3)',
      borderRadius: '6px',
      color: '#667eea',
      cursor: 'pointer',
      fontSize: '12px'
    }
  }, "\u2190 Ask another question")), loading && /*#__PURE__*/react.createElement("div", {
    className: "chat-loading"
  }, /*#__PURE__*/react.createElement("div", {
    className: "spinner"
  }), /*#__PURE__*/react.createElement("p", null, "Finding answer..."))));
}
ChatQuery.propTypes = {
  selectedEntity: (prop_types_default()).object,
  graphData: (prop_types_default()).object.isRequired
};
/* harmony default export */ const components_ChatQuery = (ChatQuery);
;// ./src/graph-page/components/SearchBar.jsx


function SearchBar({
  onSearch,
  placeholder
}) {
  const [query, setQuery] = (0,react.useState)('');
  (0,react.useEffect)(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);
  function handleClear() {
    setQuery('');
    onSearch('');
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: placeholder || 'Search...',
    className: "search-input"
  }), query && /*#__PURE__*/react.createElement("button", {
    className: "search-clear",
    onClick: handleClear,
    title: "Clear search"
  }, "\u2715"));
}
SearchBar.propTypes = {
  onSearch: (prop_types_default()).func.isRequired,
  placeholder: (prop_types_default()).string
};
/* harmony default export */ const components_SearchBar = (SearchBar);
;// ./src/utils/article-clustering.js
// Article clustering utilities for grouping related articles

/**
 * Calculate shared entities between two articles
 * @param {Object} article1 - First article
 * @param {Object} article2 - Second article
 * @returns {Array<string>} Array of shared entity names
 */
function findSharedEntities(article1, article2) {
  const entities1 = new Set(article1.entities || []);
  const entities2 = new Set(article2.entities || []);
  return Array.from(entities1).filter(e => entities2.has(e));
}

/**
 * Calculate connection strength between two articles
 * @param {Object} article1 - First article
 * @param {Object} article2 - Second article
 * @returns {number} Number of shared entities
 */
function calculateConnectionStrength(article1, article2) {
  return findSharedEntities(article1, article2).length;
}

/**
 * Get connection strength category for color coding
 * @param {number} strength - Number of shared entities
 * @returns {string} Category: 'strong', 'moderate', 'weak', 'minimal'
 */
function getConnectionCategory(strength) {
  if (strength >= 8) return 'strong';
  if (strength >= 4) return 'moderate';
  if (strength >= 2) return 'weak';
  return 'minimal';
}

/**
 * Build connection map for all articles
 * @param {Array<Object>} articles - All articles
 * @returns {Map} Map of article ID to array of connections
 */
function buildConnectionMap(articles) {
  const connectionMap = new Map();
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const connections = [];
    for (let j = 0; j < articles.length; j++) {
      if (i !== j) {
        const other = articles[j];
        const strength = calculateConnectionStrength(article, other);
        if (strength > 0) {
          connections.push({
            articleId: other.id,
            strength,
            category: getConnectionCategory(strength),
            sharedEntities: findSharedEntities(article, other)
          });
        }
      }
    }

    // Sort connections by strength (strongest first)
    connections.sort((a, b) => b.strength - a.strength);
    connectionMap.set(article.id, connections);
  }
  return connectionMap;
}

/**
 * Cluster articles using simple greedy algorithm with topic awareness
 * @param {Array<Object>} articles - All articles
 * @param {number} minSharedEntities - Minimum shared entities to form cluster
 * @param {Map} entityMap - Map of entity ID to entity name
 * @param {Array<string>} userTopics - User's topics of interest for enhanced clustering
 * @returns {Array<Object>} Array of clusters
 */

function clusterArticles(articles, minSharedEntities = 2, entityMap = new Map(), userTopics = []) {
  if (articles.length === 0) return [];
  const clusters = [];
  const clustered = new Set();
  const connectionMap = buildConnectionMap(articles);

  // Sort articles by total connection strength (most connected first)
  const sortedArticles = [...articles].sort((a, b) => {
    const aConnections = connectionMap.get(a.id) || [];
    const bConnections = connectionMap.get(b.id) || [];
    const aStrength = aConnections.reduce((sum, c) => sum + c.strength, 0);
    const bStrength = bConnections.reduce((sum, c) => sum + c.strength, 0);
    return bStrength - aStrength;
  });

  // Build clusters using greedy approach with topic consideration
  for (const article of sortedArticles) {
    if (clustered.has(article.id)) continue;
    const connections = connectionMap.get(article.id) || [];

    // Find articles with shared entities (minimum threshold)
    const sharedEntityConnections = connections.filter(c => c.strength >= minSharedEntities);

    // Also find articles with single strong entity match (like "Rivian")
    // but only if the shared entity is mentioned in both article titles
    const strongSingleEntityConnections = connections.filter(c => {
      if (c.strength === 1) {
        const sharedEntityId = c.sharedEntities[0];
        const sharedEntity = entityMap.get(sharedEntityId);
        const sharedEntityName = sharedEntity?.name || sharedEntityId;
        const otherArticle = articles.find(a => a.id === c.articleId);
        if (otherArticle && article.title.toLowerCase().includes(sharedEntityName.toLowerCase()) && otherArticle.title.toLowerCase().includes(sharedEntityName.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    // Use only natural entity-based connections (no topic forcing)
    const strongConnections = [...sharedEntityConnections, ...strongSingleEntityConnections];
    if (strongConnections.length > 0) {
      // Create new cluster
      const clusterArticles = [article];
      const clusterEntityCounts = new Map();

      // Count entity frequencies in this cluster (convert IDs to names)
      for (const entityId of article.entities || []) {
        const entityObject = entityMap.get(entityId);
        const entityName = entityObject?.name || entityId;
        clusterEntityCounts.set(entityName, 1);
      }

      // Add strongly connected articles
      for (const conn of strongConnections) {
        if (!clustered.has(conn.articleId)) {
          const connectedArticle = articles.find(a => a.id === conn.articleId);
          if (connectedArticle) {
            clusterArticles.push(connectedArticle);
            clustered.add(conn.articleId);

            // Update entity counts (convert IDs to names)
            for (const entityId of connectedArticle.entities || []) {
              const entityObject = entityMap.get(entityId);
              const entityName = entityObject?.name || entityId;
              clusterEntityCounts.set(entityName, (clusterEntityCounts.get(entityName) || 0) + 1);
            }
          }
        }
      }

      // Find dominant entities (appear in multiple articles)
      const dominantEntities = Array.from(clusterEntityCounts.entries()).filter(([_, count]) => count > 1).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, _]) => name);

      // No forced topic detection - let entities naturally cluster
      let clusterTopic = null;
      clustered.add(article.id);

      // Sort articles within cluster by timestamp (most recent first)
      clusterArticles.sort((a, b) => b.capturedAt - a.capturedAt);
      clusters.push({
        id: `cluster-${clusters.length}`,
        articles: clusterArticles,
        dominantEntities,
        totalSharedEntities: dominantEntities.length,
        strength: strongConnections.reduce((sum, c) => sum + c.strength, 0),
        topic: clusterTopic // Add topic information
      });
    }
  }

  // Add remaining unclustered articles as standalone
  const standalone = articles.filter(a => !clustered.has(a.id)).sort((a, b) => b.capturedAt - a.capturedAt);
  if (standalone.length > 0) {
    clusters.push({
      id: 'cluster-standalone',
      articles: standalone,
      dominantEntities: [],
      totalSharedEntities: 0,
      strength: 0,
      isStandalone: true
    });
  }

  // Sort clusters by strength (strongest first), standalone always last
  clusters.sort((a, b) => {
    if (a.isStandalone) return 1;
    if (b.isStandalone) return -1;
    return b.strength - a.strength;
  });
  return clusters;
}

/**
 * Generate cluster name from dominant entities and topic
 * @param {Array<string>} entities - Dominant entity names
 * @param {string|null} topic - Optional topic name
 * @returns {string} Generated cluster name
 */
function generateClusterName(entities, topic = null) {
  // Prioritize topic name if available
  if (topic) {
    if (entities.length === 0) return `${topic} Articles`;
    if (entities.length === 1) return `${topic}: ${entities[0]}`;
    return `${topic}: ${entities[0]} & ${entities[1]}`;
  }

  // Fallback to entity-based names
  if (entities.length === 0) return 'Standalone Articles';
  if (entities.length === 1) return entities[0];
  if (entities.length === 2) return `${entities[0]} & ${entities[1]}`;
  return `${entities[0]}, ${entities[1]} & more`;
}
/* harmony default export */ const article_clustering = ({
  findSharedEntities,
  calculateConnectionStrength,
  getConnectionCategory,
  buildConnectionMap,
  clusterArticles,
  generateClusterName
});
;// ./src/graph-page/components/ArticlesList.jsx



function ArticlesList({
  onClose,
  onArticleClick,
  selectedArticle,
  onHighlightEntities
}) {
  const [articles, setArticles] = (0,react.useState)([]);
  const [loading, setLoading] = (0,react.useState)(true);
  const [viewMode, setViewMode] = (0,react.useState)('recent'); // 'recent' or 'connected'
  const [clusters, setClusters] = (0,react.useState)([]);
  const [connectionMap, setConnectionMap] = (0,react.useState)(new Map());
  const [expandedClusters, setExpandedClusters] = (0,react.useState)(new Set());
  const [showingConnectionFor, setShowingConnectionFor] = (0,react.useState)(null);
  const [entityMap, setEntityMap] = (0,react.useState)(new Map());
  const [processingArticles, setProcessingArticles] = (0,react.useState)(new Map());
  const [userTopics, setUserTopics] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    loadArticles();

    // Listen for real-time article updates
    const messageListener = message => {
      if (message.type === 'ARTICLE_PROCESSING_STARTED') {
        setProcessingArticles(prev => new Map(prev.set(message.article.url, {
          ...message.article,
          id: `processing-${Date.now()}`,
          entities: []
        })));
      } else if (message.type === 'ARTICLE_PROCESSING_UPDATED') {
        setProcessingArticles(prev => new Map(prev.set(message.article.url, {
          ...message.article,
          id: `processing-${Date.now()}`,
          entities: []
        })));
      } else if (message.type === 'ARTICLE_PROCESSING_COMPLETE') {
        setProcessingArticles(prev => {
          const newMap = new Map(prev);
          newMap.delete(message.article.url);
          return newMap;
        });
        loadArticles(); // Reload to get the actual saved article
      } else if (message.type === 'GRAPH_UPDATED') {
        loadArticles();
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  async function loadArticles() {
    try {
      const articlesResponse = await chrome.runtime.sendMessage({
        type: 'GET_ALL_ARTICLES'
      });
      const graphResponse = await chrome.runtime.sendMessage({
        type: 'GET_GRAPH_DATA'
      });
      const settingsResponse = await chrome.runtime.sendMessage({
        type: 'GET_SETTINGS'
      });
      if (articlesResponse.success) {
        const articlesList = articlesResponse.articles;
        const entityMap = new Map();

        // Build entity ID -> entity object map (includes topic info)
        if (graphResponse.success && graphResponse.data?.nodes) {
          graphResponse.data.nodes.forEach(node => {
            entityMap.set(node.id, node);
          });
        }

        // Get user topics from settings
        const topics = settingsResponse.success && settingsResponse.settings?.topics ? settingsResponse.settings.topics.filter(t => t && t.trim()) : [];
        setArticles(articlesList);
        setEntityMap(entityMap);
        setUserTopics(topics);

        // Compute clusters and connections with topic awareness
        const clusteredData = clusterArticles(articlesList, 2, entityMap, topics);
        setClusters(clusteredData);

        // Expand all clusters by default
        const allClusterIds = new Set(clusteredData.map(c => c.id));
        setExpandedClusters(allClusterIds);

        // Build connection map
        const connMap = buildConnectionMap(articlesList);
        setConnectionMap(connMap);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load articles:', error);
      setLoading(false);
    }
  }
  async function handleDeleteArticle(articleId, e) {
    e.stopPropagation();
    if (!confirm('Delete this article and its entities? This cannot be undone.')) {
      return;
    }
    try {
      await chrome.runtime.sendMessage({
        type: 'DELETE_ARTICLE',
        articleId
      });
      const updatedArticles = articles.filter(a => a.id !== articleId);
      setArticles(updatedArticles);

      // Recompute clusters with topic awareness
      const clusteredData = clusterArticles(updatedArticles, 2, entityMap, userTopics);
      setClusters(clusteredData);
      const connMap = buildConnectionMap(updatedArticles);
      setConnectionMap(connMap);
      if (selectedArticle?.id === articleId) {
        onArticleClick(null);
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article');
    }
  }
  function toggleCluster(clusterId) {
    const newExpanded = new Set(expandedClusters);
    if (newExpanded.has(clusterId)) {
      newExpanded.delete(clusterId);
    } else {
      newExpanded.add(clusterId);
    }
    setExpandedClusters(newExpanded);
  }
  function handleConnectionClick(article1, article2, e) {
    e.stopPropagation();
    const sharedEntityIds = findSharedEntities(article1, article2);

    // Convert entity IDs to readable names
    const sharedEntityNames = sharedEntityIds.map(entityId => {
      const entityObject = entityMap.get(entityId);
      return entityObject?.name || entityId; // Fallback to ID if name not found
    });

    // Highlight shared entities in graph
    if (onHighlightEntities) {
      onHighlightEntities(sharedEntityIds);
    }

    // Show connection details
    setShowingConnectionFor({
      article1,
      article2,
      sharedEntities: sharedEntityNames // Now using readable names
    });
  }
  function closeConnectionModal() {
    setShowingConnectionFor(null);
    if (onHighlightEntities) {
      onHighlightEntities([]);
    }
  }
  if (loading) {
    return /*#__PURE__*/react.createElement("div", {
      className: "articles-list-panel"
    }, /*#__PURE__*/react.createElement("div", {
      className: "articles-header"
    }, /*#__PURE__*/react.createElement("h3", null, "Your Articles"), /*#__PURE__*/react.createElement("button", {
      className: "close-btn",
      onClick: onClose
    }, "\u2715")), /*#__PURE__*/react.createElement("div", {
      className: "articles-body"
    }, /*#__PURE__*/react.createElement("p", null, "Loading articles...")));
  }
  function renderProcessingArticleCard(article) {
    return /*#__PURE__*/react.createElement("div", {
      key: article.id,
      className: "article-card article-card-processing"
    }, /*#__PURE__*/react.createElement("div", {
      className: "article-timeline-dot timeline-dot-processing"
    }, /*#__PURE__*/react.createElement("div", {
      className: "processing-spinner"
    })), /*#__PURE__*/react.createElement("div", {
      className: "article-content"
    }, /*#__PURE__*/react.createElement("div", {
      className: "article-header"
    }, /*#__PURE__*/react.createElement("h3", {
      className: "article-title"
    }, article.title)), /*#__PURE__*/react.createElement("div", {
      className: "article-meta"
    }, /*#__PURE__*/react.createElement("span", {
      className: "article-date"
    }, "Processing..."), /*#__PURE__*/react.createElement("span", {
      className: "article-entities"
    }, "Extracting entities..."))));
  }
  function renderArticleCard(article, nextArticle = null, isLast = false, showConnections = true) {
    const connections = connectionMap.get(article.id) || [];
    const nextConnection = nextArticle ? connections.find(c => c.articleId === nextArticle.id) : null;
    const hasConnection = showConnections && nextConnection && nextConnection.strength > 0;

    // Fun processing messages
    const getProcessingMessage = () => {
      const messages = ["Brewing insights...", "Connecting the dots...", "Finding patterns...", "Extracting wisdom...", "Mapping knowledge...", "Discovering entities...", "Weaving connections...", "Crystallizing ideas...", "Parsing brilliance...", "Distilling insights..."];
      return messages[Math.floor(Math.random() * messages.length)];
    };
    return /*#__PURE__*/react.createElement("div", {
      key: article.id,
      className: "article-timeline-item",
      onClick: () => onArticleClick(article),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/react.createElement("div", {
      className: "timeline-indicator"
    }, /*#__PURE__*/react.createElement("div", {
      className: `timeline-dot ${article.isProcessing ? 'timeline-dot-processing' : hasConnection ? 'timeline-dot-connected' : ''}`,
      onClick: hasConnection && !article.isProcessing ? e => {
        e.stopPropagation();
        handleConnectionClick(article, nextArticle, e);
      } : undefined,
      title: article.isProcessing ? 'Processing...' : hasConnection ? `${nextConnection.strength} entities in common - Click to view` : ''
    }, article.isProcessing ? /*#__PURE__*/react.createElement("div", {
      className: "processing-spinner"
    }) : hasConnection && /*#__PURE__*/react.createElement("span", {
      className: "timeline-dot-badge"
    }, nextConnection.strength)), !isLast && showConnections && /*#__PURE__*/react.createElement("div", {
      className: `timeline-line ${hasConnection ? `timeline-line-${nextConnection.category}` : ''}`
    })), /*#__PURE__*/react.createElement("div", {
      className: `article-card ${article.isProcessing ? 'article-card-processing' : ''} ${selectedArticle?.id === article.id ? 'selected' : ''}`
    }, /*#__PURE__*/react.createElement("div", {
      className: "article-title"
    }, article.title), article.isProcessing ? /*#__PURE__*/react.createElement("div", {
      className: "processing-status"
    }, /*#__PURE__*/react.createElement("div", {
      className: "processing-message"
    }, article.processingStatus || getProcessingMessage()), /*#__PURE__*/react.createElement("div", {
      className: "processing-indicator"
    }, /*#__PURE__*/react.createElement("div", {
      className: "pulse-dot"
    }))) : /*#__PURE__*/react.createElement("div", {
      className: "article-meta"
    }, /*#__PURE__*/react.createElement("span", {
      className: "article-date"
    }, new Date(article.capturedAt).toLocaleDateString()), /*#__PURE__*/react.createElement("span", {
      className: "article-entities"
    }, article.entities?.length || 0, " entities")), !article.isProcessing && /*#__PURE__*/react.createElement("div", {
      className: "article-actions"
    }, /*#__PURE__*/react.createElement("a", {
      href: article.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "article-link",
      onClick: e => e.stopPropagation()
    }, "Open original \u2192"), /*#__PURE__*/react.createElement("button", {
      className: "article-delete",
      onClick: e => handleDeleteArticle(article.id, e),
      title: "Delete article"
    }, "Delete"))));
  }
  function renderRecentView() {
    const sortedArticles = [...articles].sort((a, b) => b.capturedAt - a.capturedAt);
    const processingList = Array.from(processingArticles.values());
    return /*#__PURE__*/react.createElement("div", {
      className: "articles-timeline"
    }, processingList.map(article => renderProcessingArticleCard(article)), sortedArticles.map((article, index) => renderArticleCard(article, sortedArticles[index + 1], index === sortedArticles.length - 1, false // Don't show connections in Recent view
    )));
  }
  function renderConnectedView() {
    const nonStandaloneClusters = clusters.filter(c => !c.isStandalone);
    const standaloneArticles = clusters.find(c => c.isStandalone)?.articles || [];
    return /*#__PURE__*/react.createElement("div", {
      className: "articles-clusters"
    }, nonStandaloneClusters.map(cluster => /*#__PURE__*/react.createElement("div", {
      key: cluster.id,
      className: "article-cluster"
    }, /*#__PURE__*/react.createElement("div", {
      className: "cluster-header",
      onClick: () => toggleCluster(cluster.id)
    }, /*#__PURE__*/react.createElement("span", {
      className: "cluster-toggle"
    }, expandedClusters.has(cluster.id) ? '▼' : '▶'), /*#__PURE__*/react.createElement("span", {
      className: "cluster-name"
    }, generateClusterName(cluster.dominantEntities, cluster.topic), " (", cluster.articles.length, ")"), /*#__PURE__*/react.createElement("span", {
      className: "cluster-strength",
      onClick: e => {
        e.stopPropagation();
        if (cluster.articles.length >= 2) {
          handleConnectionClick(cluster.articles[0], cluster.articles[1], e);
        }
      },
      style: {
        cursor: 'pointer',
        textDecoration: 'underline'
      },
      title: "Click to see shared entities"
    }, cluster.totalSharedEntities, "+ shared")), expandedClusters.has(cluster.id) && /*#__PURE__*/react.createElement("div", {
      className: "cluster-articles"
    }, cluster.articles.map((article, index) => renderArticleCard(article, cluster.articles[index + 1], index === cluster.articles.length - 1, true // Show connections in Connected view
    ))))), standaloneArticles.length > 0 && nonStandaloneClusters.length > 0 && /*#__PURE__*/react.createElement("div", {
      className: "cluster-divider"
    }), standaloneArticles.map((article, index) => renderArticleCard(article, standaloneArticles[index + 1], index === standaloneArticles.length - 1, false // Standalone articles don't have connections
    )));
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "articles-list-panel"
  }, /*#__PURE__*/react.createElement("div", {
    className: "articles-header"
  }, /*#__PURE__*/react.createElement("h3", null, "Your Articles (", articles.length, ")"), /*#__PURE__*/react.createElement("button", {
    className: "close-btn",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/react.createElement("div", {
    className: "articles-view-toggle"
  }, /*#__PURE__*/react.createElement("button", {
    className: viewMode === 'recent' ? 'active' : '',
    onClick: () => setViewMode('recent')
  }, "Recent"), /*#__PURE__*/react.createElement("button", {
    className: viewMode === 'connected' ? 'active' : '',
    onClick: () => setViewMode('connected')
  }, "Connected")), /*#__PURE__*/react.createElement("div", {
    className: "articles-body"
  }, articles.length === 0 ? /*#__PURE__*/react.createElement("p", {
    className: "no-articles"
  }, "No articles yet") : /*#__PURE__*/react.createElement(react.Fragment, null, viewMode === 'recent' ? renderRecentView() : renderConnectedView())), showingConnectionFor && /*#__PURE__*/react.createElement("div", {
    className: "connection-modal-overlay",
    onClick: closeConnectionModal
  }, /*#__PURE__*/react.createElement("div", {
    className: "connection-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react.createElement("div", {
    className: "connection-modal-header"
  }, /*#__PURE__*/react.createElement("h4", null, "Shared Entities"), /*#__PURE__*/react.createElement("button", {
    className: "close-btn",
    onClick: closeConnectionModal
  }, "\u2715")), /*#__PURE__*/react.createElement("div", {
    className: "connection-modal-body"
  }, /*#__PURE__*/react.createElement("div", {
    className: "connection-articles"
  }, /*#__PURE__*/react.createElement("div", {
    className: "connection-article-name"
  }, showingConnectionFor.article1.title), /*#__PURE__*/react.createElement("div", {
    className: "connection-arrow"
  }, "\u2194"), /*#__PURE__*/react.createElement("div", {
    className: "connection-article-name"
  }, showingConnectionFor.article2.title)), /*#__PURE__*/react.createElement("div", {
    className: "shared-entities-list"
  }, showingConnectionFor.sharedEntities.map((entity, idx) => /*#__PURE__*/react.createElement("div", {
    key: idx,
    className: "shared-entity-item"
  }, "\u2713 ", typeof entity === 'string' ? entity : entity?.name || 'Unknown entity')))), /*#__PURE__*/react.createElement("div", {
    className: "connection-modal-footer"
  }, /*#__PURE__*/react.createElement("button", {
    className: "btn-secondary",
    onClick: closeConnectionModal
  }, "Close")))));
}
ArticlesList.propTypes = {
  onClose: (prop_types_default()).func.isRequired,
  onArticleClick: (prop_types_default()).func.isRequired,
  selectedArticle: (prop_types_default()).object,
  onHighlightEntities: (prop_types_default()).func
};
/* harmony default export */ const components_ArticlesList = (ArticlesList);
;// ./src/graph-page/components/ArticleEntitiesPanel.jsx


function ArticleEntitiesPanel({
  article,
  graphData,
  onEntityClick,
  onClose
}) {
  if (!article) return null;

  // Get entity details from graph data
  const articleEntities = graphData.nodes.filter(node => article.entities && article.entities.includes(node.id));

  // Group by type
  const entitiesByType = {
    person: articleEntities.filter(e => e.type === 'person'),
    company: articleEntities.filter(e => e.type === 'company'),
    technology: articleEntities.filter(e => e.type === 'technology'),
    concept: articleEntities.filter(e => e.type === 'concept')
  };
  const typeLabels = {
    person: 'People',
    company: 'Companies',
    technology: 'Technologies',
    concept: 'Concepts'
  };
  const typeColors = {
    person: '#60a5fa',
    company: '#a78bfa',
    technology: '#34d399',
    concept: '#fbbf24'
  };
  return /*#__PURE__*/react.createElement("aside", {
    className: "article-entities-panel"
  }, /*#__PURE__*/react.createElement("div", {
    className: "article-entities-header"
  }, /*#__PURE__*/react.createElement("h3", null, "Article Entities"), /*#__PURE__*/react.createElement("button", {
    className: "close-btn",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/react.createElement("div", {
    className: "article-entities-title"
  }, article.title), /*#__PURE__*/react.createElement("div", {
    className: "article-entities-count"
  }, articleEntities.length, " entities found"), /*#__PURE__*/react.createElement("div", {
    className: "article-entities-body"
  }, Object.entries(entitiesByType).map(([type, entities]) => {
    if (entities.length === 0) return null;
    return /*#__PURE__*/react.createElement("div", {
      key: type,
      className: "entity-type-group"
    }, /*#__PURE__*/react.createElement("div", {
      className: "entity-type-header"
    }, /*#__PURE__*/react.createElement("span", {
      className: "entity-type-dot",
      style: {
        backgroundColor: typeColors[type]
      }
    }), /*#__PURE__*/react.createElement("span", {
      className: "entity-type-label"
    }, typeLabels[type], " (", entities.length, ")")), /*#__PURE__*/react.createElement("div", {
      className: "entity-type-list"
    }, entities.map(entity => /*#__PURE__*/react.createElement("div", {
      key: entity.id,
      className: "entity-list-item-clickable",
      onClick: () => onEntityClick(entity),
      title: `Click to view ${entity.name} in graph`
    }, /*#__PURE__*/react.createElement("span", {
      className: "entity-name"
    }, entity.name), entity.degree > 0 && /*#__PURE__*/react.createElement("span", {
      className: "entity-connections"
    }, entity.degree, " connection", entity.degree !== 1 ? 's' : '')))));
  })));
}
ArticleEntitiesPanel.propTypes = {
  article: (prop_types_default()).object,
  graphData: (prop_types_default()).object.isRequired,
  onEntityClick: (prop_types_default()).func.isRequired,
  onClose: (prop_types_default()).func.isRequired
};
/* harmony default export */ const components_ArticleEntitiesPanel = (ArticleEntitiesPanel);
;// ./src/graph-page/components/WelcomeScreen.jsx


function WelcomeScreen({
  onStartFresh,
  onLoadDemo
}) {
  const [loading, setLoading] = (0,react.useState)(false);
  async function handleLoadDemo() {
    setLoading(true);
    try {
      await onLoadDemo();
    } catch (error) {
      console.error('Failed to load demo:', error);
      alert('Failed to load demo data. Please try again.');
      setLoading(false);
    }
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "welcome-screen"
  }, /*#__PURE__*/react.createElement("div", {
    className: "welcome-container"
  }, /*#__PURE__*/react.createElement("div", {
    className: "welcome-header"
  }, /*#__PURE__*/react.createElement("div", {
    className: "welcome-logo"
  }, /*#__PURE__*/react.createElement("svg", {
    width: "80",
    height: "80",
    viewBox: "0 0 128 128",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("linearGradient", {
    id: "welcome-gradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/react.createElement("stop", {
    offset: "0%",
    style: {
      stopColor: '#a78bfa',
      stopOpacity: 1
    }
  }), /*#__PURE__*/react.createElement("stop", {
    offset: "100%",
    style: {
      stopColor: '#60a5fa',
      stopOpacity: 1
    }
  }))), /*#__PURE__*/react.createElement("circle", {
    cx: "64",
    cy: "64",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "64",
    cy: "32",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "92",
    cy: "48",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "92",
    cy: "80",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "64",
    cy: "96",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "36",
    cy: "80",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("circle", {
    cx: "36",
    cy: "48",
    r: "8",
    fill: "url(#welcome-gradient)"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "64",
    y2: "32",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "92",
    y2: "48",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "92",
    y2: "80",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "64",
    y2: "96",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "36",
    y2: "80",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }), /*#__PURE__*/react.createElement("line", {
    x1: "64",
    y1: "64",
    x2: "36",
    y2: "48",
    stroke: "url(#welcome-gradient)",
    strokeWidth: "2",
    strokeOpacity: "0.6"
  }))), /*#__PURE__*/react.createElement("h1", {
    className: "welcome-title"
  }, "Welcome to Glyph!"), /*#__PURE__*/react.createElement("p", {
    className: "welcome-subtitle"
  }, "Your Chrome-powered AI. 100% Local & Private.")), /*#__PURE__*/react.createElement("div", {
    className: "welcome-content"
  }, /*#__PURE__*/react.createElement("div", {
    className: "welcome-section"
  }, /*#__PURE__*/react.createElement("h2", null, "Get started in 3 simple steps:"), /*#__PURE__*/react.createElement("ol", {
    className: "welcome-steps"
  }, /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement("span", {
    className: "step-number"
  }, "1"), /*#__PURE__*/react.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/react.createElement("strong", null, "Browse to any article"), /*#__PURE__*/react.createElement("p", null, "Visit news sites, blog posts, documentation pages"))), /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement("span", {
    className: "step-number"
  }, "2"), /*#__PURE__*/react.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/react.createElement("strong", null, "Click the Glyph icon"), /*#__PURE__*/react.createElement("p", null, "The Glyph Insights panel will show connections"))), /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement("span", {
    className: "step-number"
  }, "3"), /*#__PURE__*/react.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/react.createElement("strong", null, "Watch your knowledge graph grow"), /*#__PURE__*/react.createElement("p", null, "AI extracts entities and discovers relationships"))))), /*#__PURE__*/react.createElement("div", {
    className: "welcome-features"
  }, /*#__PURE__*/react.createElement("div", {
    className: "feature-card"
  }, /*#__PURE__*/react.createElement("div", {
    className: "feature-icon"
  }, "\uD83D\uDCA1"), /*#__PURE__*/react.createElement("h3", null, "Proactive Insights"), /*#__PURE__*/react.createElement("p", null, "Glyph shows connections as you browse, no clicking needed")), /*#__PURE__*/react.createElement("div", {
    className: "feature-card"
  }, /*#__PURE__*/react.createElement("div", {
    className: "feature-icon"
  }, "\uD83D\uDD12"), /*#__PURE__*/react.createElement("h3", null, "100% Private"), /*#__PURE__*/react.createElement("p", null, "All processing happens on your device, nothing sent to cloud")), /*#__PURE__*/react.createElement("div", {
    className: "feature-card"
  }, /*#__PURE__*/react.createElement("div", {
    className: "feature-icon"
  }, "\u26A1"), /*#__PURE__*/react.createElement("h3", null, "Instant & Offline"), /*#__PURE__*/react.createElement("p", null, "Works without internet, powered by Chrome Built-in AI")))), /*#__PURE__*/react.createElement("div", {
    className: "welcome-actions"
  }, /*#__PURE__*/react.createElement("button", {
    className: "btn-primary btn-demo",
    onClick: handleLoadDemo,
    disabled: loading
  }, loading ? 'Loading Demo...' : '🎯 Try Demo Data'), /*#__PURE__*/react.createElement("button", {
    className: "btn-secondary",
    onClick: onStartFresh,
    disabled: loading
  }, "Start Fresh")), /*#__PURE__*/react.createElement("div", {
    className: "welcome-footer"
  }, /*#__PURE__*/react.createElement("p", {
    className: "welcome-hint"
  }, /*#__PURE__*/react.createElement("strong", null, "Tip:"), " Enable Chrome AI first at", ' ', /*#__PURE__*/react.createElement("code", null, "chrome://flags/#optimization-guide-on-device-model")))), /*#__PURE__*/react.createElement("style", {
    jsx: true
  }, `
        .welcome-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .welcome-container {
          max-width: 800px;
          width: 90%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .welcome-logo {
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .welcome-title {
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 12px 0;
        }

        .welcome-subtitle {
          font-size: 18px;
          color: #9ca3af;
          margin: 0;
        }

        .welcome-content {
          margin-bottom: 40px;
        }

        .welcome-section h2 {
          font-size: 20px;
          color: #e5e7eb;
          margin: 0 0 24px 0;
        }

        .welcome-steps {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }

        .welcome-steps li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 16px;
        }

        .step-number {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
        }

        .step-content {
          flex: 1;
        }

        .step-content strong {
          color: #e5e7eb;
          font-size: 16px;
          display: block;
          margin-bottom: 4px;
        }

        .step-content p {
          color: #9ca3af;
          font-size: 14px;
          margin: 0;
        }

        .welcome-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .feature-card h3 {
          font-size: 16px;
          color: #e5e7eb;
          margin: 0 0 8px 0;
        }

        .feature-card p {
          font-size: 13px;
          color: #9ca3af;
          margin: 0;
        }

        .welcome-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .btn-primary, .btn-secondary {
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          color: white;
          flex: 1;
          max-width: 300px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #e5e7eb;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-primary:disabled, .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .welcome-footer {
          text-align: center;
        }

        .welcome-hint {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .welcome-hint code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #a78bfa;
        }
      `));
}
WelcomeScreen.propTypes = {
  onStartFresh: (prop_types_default()).func.isRequired,
  onLoadDemo: (prop_types_default()).func.isRequired
};
/* harmony default export */ const components_WelcomeScreen = (WelcomeScreen);
;// ./src/graph-page/components/TimelineSlider.jsx


function TimelineSlider({
  onArticleSelect,
  articles,
  focusedArticle
}) {
  const [sliderPosition, setSliderPosition] = (0,react.useState)(0);
  const sliderRef = (0,react.useRef)(null);
  const sortedArticles = [...articles].sort((a, b) => a.capturedAt - b.capturedAt);
  (0,react.useEffect)(() => {
    if (sortedArticles.length > 0) {
      const latestIndex = sortedArticles.length - 1;
      setSliderPosition(latestIndex);
      if (!focusedArticle) {
        onArticleSelect(sortedArticles[latestIndex]);
      }
    }
  }, [articles.length]);

  // Sync slider position when article is clicked from articles list
  (0,react.useEffect)(() => {
    if (focusedArticle && sortedArticles.length > 0) {
      const articleIndex = sortedArticles.findIndex(a => a.id === focusedArticle.id);
      if (articleIndex !== -1) {
        setSliderPosition(articleIndex);
      }
    }
  }, [focusedArticle, sortedArticles]);
  function handleSliderChange(e) {
    const index = parseInt(e.target.value, 10);
    setSliderPosition(index);
    if (sortedArticles[index]) {
      onArticleSelect(sortedArticles[index]);
    }
  }
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  }
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }
  if (articles.length === 0) {
    return null;
  }
  const currentArticle = focusedArticle || sortedArticles[sliderPosition];
  return /*#__PURE__*/react.createElement("div", {
    className: "timeline-always-visible"
  }, /*#__PURE__*/react.createElement("div", {
    className: "timeline-left"
  }, currentArticle && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "timeline-article-title"
  }, currentArticle.title), /*#__PURE__*/react.createElement("div", {
    className: "timeline-article-meta"
  }, formatDate(currentArticle.capturedAt), " at ", formatTime(currentArticle.capturedAt), currentArticle.entities && ` · ${currentArticle.entities.length} entities`))), /*#__PURE__*/react.createElement("div", {
    className: "timeline-right"
  }, /*#__PURE__*/react.createElement("div", {
    className: "timeline-slider-track"
  }, sortedArticles.map((article, idx) => {
    const position = idx / Math.max(sortedArticles.length - 1, 1) * 100;
    const isFocused = currentArticle?.id === article.id;
    return /*#__PURE__*/react.createElement("div", {
      key: article.id,
      className: `timeline-dot ${isFocused ? 'focused' : ''}`,
      style: {
        left: `${position}%`
      },
      title: article.title
    });
  })), /*#__PURE__*/react.createElement("input", {
    ref: sliderRef,
    type: "range",
    min: "0",
    max: Math.max(sortedArticles.length - 1, 0),
    step: "1",
    value: sliderPosition,
    onChange: handleSliderChange,
    className: "timeline-slider-range"
  }), /*#__PURE__*/react.createElement("div", {
    className: "timeline-labels-row"
  }, /*#__PURE__*/react.createElement("span", {
    className: "timeline-label"
  }, formatDate(sortedArticles[0]?.capturedAt)), /*#__PURE__*/react.createElement("span", {
    className: "timeline-position"
  }, sliderPosition + 1, " of ", sortedArticles.length), /*#__PURE__*/react.createElement("span", {
    className: "timeline-label"
  }, formatDate(sortedArticles[sortedArticles.length - 1]?.capturedAt)))));
}
TimelineSlider.propTypes = {
  onArticleSelect: (prop_types_default()).func.isRequired,
  articles: (prop_types_default()).array.isRequired,
  focusedArticle: (prop_types_default()).object
};
/* harmony default export */ const components_TimelineSlider = (TimelineSlider);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(159);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/graph-page/styles.css
var styles = __webpack_require__(198);
;// ./src/graph-page/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const graph_page_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/graph-page/GraphPage.jsx












function GraphPage() {
  const [activeTab, setActiveTab] = (0,react.useState)('graph'); // graph, insights, settings
  const [selectedNode, setSelectedNode] = (0,react.useState)(null);
  const [selectedArticle, setSelectedArticle] = (0,react.useState)(null);
  const [graphData, setGraphData] = (0,react.useState)({
    nodes: [],
    links: []
  });
  const [fullGraphData, setFullGraphData] = (0,react.useState)({
    nodes: [],
    links: []
  });
  const [articles, setArticles] = (0,react.useState)([]);
  const [stats, setStats] = (0,react.useState)({
    entities: 0,
    connections: 0,
    articles: 0
  });
  const [searchQuery, setSearchQuery] = (0,react.useState)('');
  const [loading, setLoading] = (0,react.useState)(true);
  const [showArticlesList, setShowArticlesList] = (0,react.useState)(true);
  const [highlightedEntities, setHighlightedEntities] = (0,react.useState)([]);
  const [showWelcome, setShowWelcome] = (0,react.useState)(false);
  const [timelineFocusedArticle, setTimelineFocusedArticle] = (0,react.useState)(null);
  (0,react.useEffect)(() => {
    loadGraphData();

    // Check URL params for tab
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }

    // Listen for graph updates from service worker
    const messageListener = message => {
      if (message.type === 'GRAPH_UPDATED') {
        loadGraphData();
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  async function loadGraphData() {
    try {
      // Request graph data from service worker (IndexedDB)
      const response = await chrome.runtime.sendMessage({
        type: 'GET_GRAPH_DATA'
      });
      if (response.success && response.data) {
        const fullData = {
          nodes: response.data.nodes || [],
          links: response.data.links || []
        };
        setFullGraphData(fullData);

        // Preserve article selection if exists
        if (selectedArticle) {
          const entityIdsFromArticle = new Set(selectedArticle.entities || []);
          const filteredNodes = fullData.nodes.filter(node => entityIdsFromArticle.has(node.id));
          const filteredLinks = fullData.links.filter(link => entityIdsFromArticle.has(link.source) && entityIdsFromArticle.has(link.target));
          setGraphData({
            nodes: filteredNodes,
            links: filteredLinks
          });
        } else {
          setGraphData(fullData);
        }
      } else {
        setFullGraphData({
          nodes: [],
          links: []
        });
        setGraphData({
          nodes: [],
          links: []
        });
      }

      // Get articles
      const articlesResponse = await chrome.runtime.sendMessage({
        type: 'GET_ALL_ARTICLES'
      });
      if (articlesResponse.success) {
        setArticles(articlesResponse.articles || []);
      }

      // Get statistics
      const statsResponse = await chrome.runtime.sendMessage({
        type: 'GET_STATISTICS'
      });
      if (statsResponse.success) {
        setStats({
          entities: statsResponse.statistics.totalEntities || 0,
          connections: statsResponse.statistics.totalRelationships || 0,
          articles: statsResponse.statistics.totalArticles || 0
        });

        // Show welcome screen if no articles exist
        if (statsResponse.statistics.totalArticles === 0) {
          setShowWelcome(true);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading graph data:', error);
      setGraphData({
        nodes: [],
        links: []
      });
      setLoading(false);
    }
  }
  function handleNodeClick(node) {
    setSelectedNode(node);
  }
  function handleSearch(query) {
    setSearchQuery(query);
  }
  function handleArticleClick(article) {
    console.log('[DEBUG] Article clicked:', article?.title);

    // Clear node selection immediately
    setSelectedNode(null);

    // Set selected article
    setSelectedArticle(article);

    // Update other states
    setTimelineFocusedArticle(article);
    setHighlightedEntities(article.entities || []);

    // Show article's entities + their connections to broader knowledge
    if (article) {
      const articleEntityIds = new Set(article.entities || []);

      // Find all entities connected to this article's entities
      const connectedEntityIds = new Set();
      fullGraphData.links.forEach(link => {
        if (articleEntityIds.has(link.source)) {
          connectedEntityIds.add(link.target);
        }
        if (articleEntityIds.has(link.target)) {
          connectedEntityIds.add(link.source);
        }
      });

      // Include article entities + connected entities
      const allRelevantIds = new Set([...articleEntityIds, ...connectedEntityIds]);
      const filteredNodes = fullGraphData.nodes.filter(node => allRelevantIds.has(node.id)).map(node => ({
        ...node,
        isFromSelectedArticle: articleEntityIds.has(node.id)
      }));
      const filteredLinks = fullGraphData.links.filter(link => allRelevantIds.has(link.source) && allRelevantIds.has(link.target));
      setGraphData({
        nodes: filteredNodes,
        links: filteredLinks
      });
    }
    console.log('[DEBUG] Selected article after click:', article?.id);
  }
  function handleEntityClick(entity) {
    setSelectedNode(entity);
  }
  async function handleLoadDemo() {
    try {
      // Load demo data
      await chrome.runtime.sendMessage({
        type: 'LOAD_MOCK_DATA',
        entityCount: 50
      });
      // Reload graph
      await loadGraphData();
      setShowWelcome(false);
    } catch (error) {
      console.error('Failed to load demo:', error);
      throw error;
    }
  }
  function handleStartFresh() {
    setShowWelcome(false);
  }
  function handleTimelineArticleSelect(article) {
    setTimelineFocusedArticle(article);
    setSelectedArticle(article);
    setSelectedNode(null);
    if (!article) {
      setGraphData(fullGraphData);
      setHighlightedEntities([]);
      return;
    }
    const entityIdsFromArticle = new Set(article.entities || []);
    setHighlightedEntities(article.entities || []);
    const filteredNodes = fullGraphData.nodes.filter(node => entityIdsFromArticle.has(node.id));
    const filteredLinks = fullGraphData.links.filter(link => entityIdsFromArticle.has(link.source) && entityIdsFromArticle.has(link.target));
    setGraphData({
      nodes: filteredNodes,
      links: filteredLinks
    });
  }
  if (loading) {
    return /*#__PURE__*/react.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/react.createElement("div", {
      className: "loading-spinner"
    }), /*#__PURE__*/react.createElement("p", null, "Loading your knowledge graph..."));
  }

  // Show welcome screen on first run
  if (showWelcome && stats.articles === 0) {
    return /*#__PURE__*/react.createElement(components_WelcomeScreen, {
      onStartFresh: handleStartFresh,
      onLoadDemo: handleLoadDemo
    });
  }
  if (graphData.nodes.length === 0 && activeTab === 'graph') {
    return /*#__PURE__*/react.createElement("div", {
      className: "graph-page"
    }, /*#__PURE__*/react.createElement("header", {
      className: "header"
    }, /*#__PURE__*/react.createElement("div", {
      className: "header-left"
    }, /*#__PURE__*/react.createElement("div", {
      className: "logo-container"
    }, /*#__PURE__*/react.createElement("h1", {
      className: "logo"
    }, "Glyph"), /*#__PURE__*/react.createElement("p", {
      className: "tagline"
    }, "Ambient Intelligence. 100% Private."))), /*#__PURE__*/react.createElement("div", {
      className: "header-right"
    }, /*#__PURE__*/react.createElement("nav", {
      className: "tabs"
    }, /*#__PURE__*/react.createElement("button", {
      className: "active"
    }, "Knowledge"), /*#__PURE__*/react.createElement("button", {
      onClick: () => setActiveTab('insights')
    }, "Insights"), /*#__PURE__*/react.createElement("button", {
      onClick: () => setActiveTab('settings')
    }, "Settings")))), /*#__PURE__*/react.createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react.createElement("div", {
      className: "empty-content"
    }, /*#__PURE__*/react.createElement("h1", null, "Your Knowledge Graph is Empty"), /*#__PURE__*/react.createElement("p", null, "Start capturing insights to build your personal knowledge graph"), /*#__PURE__*/react.createElement("div", {
      className: "empty-actions"
    }, /*#__PURE__*/react.createElement("button", {
      className: "empty-btn",
      onClick: () => setActiveTab('settings')
    }, "Configure Settings")), /*#__PURE__*/react.createElement("p", {
      style: {
        marginTop: '30px',
        fontSize: '16px',
        opacity: 0.8
      }
    }, "Browse to any article and click the Glyph icon to capture insights"))));
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "graph-page"
  }, /*#__PURE__*/react.createElement("header", {
    className: "header"
  }, /*#__PURE__*/react.createElement("div", {
    className: "header-left"
  }, /*#__PURE__*/react.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/react.createElement("h1", {
    className: "logo"
  }, "Glyph"), /*#__PURE__*/react.createElement("p", {
    className: "tagline"
  }, "Your Chrome-powered AI. 100% Local & Private")), activeTab === 'graph' && /*#__PURE__*/react.createElement("div", {
    className: "stats-mini"
  }, /*#__PURE__*/react.createElement("span", null, stats.entities, " entities"), /*#__PURE__*/react.createElement("span", null, stats.connections, " connections"), /*#__PURE__*/react.createElement("span", null, stats.articles, " articles"))), activeTab === 'graph' && /*#__PURE__*/react.createElement(components_SearchBar, {
    onSearch: handleSearch,
    placeholder: "Search entities..."
  }), /*#__PURE__*/react.createElement("div", {
    className: "header-right"
  }, activeTab === 'graph' && /*#__PURE__*/react.createElement("button", {
    className: "articles-button",
    onClick: () => setShowArticlesList(true),
    title: "View all articles"
  }, "\uD83D\uDCC4 Articles (", stats.articles, ")"), /*#__PURE__*/react.createElement("nav", {
    className: "tabs"
  }, /*#__PURE__*/react.createElement("button", {
    className: activeTab === 'graph' ? 'active' : '',
    onClick: () => setActiveTab('graph')
  }, "Knowledge"), /*#__PURE__*/react.createElement("button", {
    className: activeTab === 'insights' ? 'active' : '',
    onClick: () => setActiveTab('insights')
  }, "Insights"), /*#__PURE__*/react.createElement("button", {
    className: activeTab === 'settings' ? 'active' : '',
    onClick: () => setActiveTab('settings')
  }, "Settings")))), /*#__PURE__*/react.createElement("div", {
    className: "main-content"
  }, activeTab === 'graph' && /*#__PURE__*/react.createElement(react.Fragment, null, showArticlesList && /*#__PURE__*/react.createElement("aside", {
    className: "sidebar-left"
  }, /*#__PURE__*/react.createElement(components_ArticlesList, {
    onClose: () => {
      setShowArticlesList(false);
      setHighlightedEntities([]);
      setSelectedArticle(null);
      setTimelineFocusedArticle(null);
      setGraphData(fullGraphData); // Reset to full graph
    },
    onArticleClick: handleArticleClick,
    selectedArticle: selectedArticle,
    onHighlightEntities: setHighlightedEntities
  })), /*#__PURE__*/react.createElement("div", {
    className: "graph-container with-timeline"
  }, /*#__PURE__*/react.createElement(components_KnowledgeGraph, {
    data: graphData,
    onNodeClick: handleNodeClick,
    searchQuery: searchQuery,
    highlightedEntities: highlightedEntities
  }), /*#__PURE__*/react.createElement(components_TimelineSlider, {
    articles: articles,
    focusedArticle: timelineFocusedArticle,
    onArticleSelect: handleTimelineArticleSelect
  })), (selectedArticle || selectedNode) && /*#__PURE__*/react.createElement("aside", {
    className: "sidebar-right",
    key: selectedArticle?.id || selectedNode?.id || 'empty'
  }, selectedArticle ? /*#__PURE__*/react.createElement(components_ArticleEntitiesPanel, {
    key: `article-${selectedArticle.id}`,
    article: selectedArticle,
    graphData: fullGraphData,
    onEntityClick: handleEntityClick,
    onClose: () => {
      setSelectedArticle(null);
      setTimelineFocusedArticle(null);
      setGraphData(fullGraphData);
    }
  }) : selectedNode ? /*#__PURE__*/react.createElement(components_NodeDetails, {
    key: `node-${selectedNode.id}`,
    node: selectedNode,
    onClose: () => {
      setSelectedNode(null);
    }
  }) : null), /*#__PURE__*/react.createElement("div", {
    className: "chat-container"
  }, /*#__PURE__*/react.createElement(components_ChatQuery, {
    selectedEntity: selectedNode,
    graphData: fullGraphData
  }))), activeTab === 'insights' && /*#__PURE__*/react.createElement("div", {
    className: "insights-container"
  }, /*#__PURE__*/react.createElement(components_InsightPanel, {
    graphData: graphData,
    stats: stats,
    onEntityClick: entity => {
      setActiveTab('graph');
      setSelectedNode(entity);
    }
  })), activeTab === 'settings' && /*#__PURE__*/react.createElement("div", {
    className: "settings-container"
  }, /*#__PURE__*/react.createElement(components_SettingsPanel, null))));
}
/* harmony default export */ const graph_page_GraphPage = (GraphPage);
;// ./src/graph-page/index.jsx



const container = document.getElementById('root');
const graph_page_root = (0,client/* createRoot */.H)(container);
graph_page_root.render(/*#__PURE__*/react.createElement(graph_page_GraphPage, null));
})();

/******/ })()
;
//# sourceMappingURL=index.js.map