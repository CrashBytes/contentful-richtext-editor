/* Contentful Rich Text Editor Styles */

.contentful-editor {
  border: 1px solid #d3dce6;
  border-radius: 6px;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

.contentful-editor--loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #68737d;
}

/* Toolbar Styles */
.contentful-toolbar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #d3dce6;
  background: #f7f9fa;
  border-radius: 6px 6px 0 0;
  gap: 4px;
}

.contentful-toolbar__group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.contentful-toolbar__group--right {
  margin-left: auto;
}

.contentful-toolbar__separator {
  width: 1px;
  height: 24px;
  background: #d3dce6;
  margin: 0 8px;
}

.contentful-toolbar__select {
  border: 1px solid #d3dce6;
  border-radius: 4px;
  padding: 4px 8px;
  background: #fff;
  font-size: 14px;
  min-width: 120px;
}

.contentful-toolbar__select:focus {
  outline: none;
  border-color: #2e75d4;
  box-shadow: 0 0 0 2px rgba(46, 117, 212, 0.2);
}

.contentful-toolbar__button {
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 6px 8px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contentful-toolbar__button:hover {
  background: #e5ebed;
  border-color: #d3dce6;
}

.contentful-toolbar__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.contentful-toolbar__button--active {
  background: #2e75d4;
  color: #fff;
  border-color: #2e75d4;
}

.contentful-toolbar__button--active:hover {
  background: #1e5aa8;
  border-color: #1e5aa8;
}

/* Link Input */
.contentful-toolbar__link-input {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
}

.contentful-toolbar__link-input input {
  border: 1px solid #d3dce6;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  width: 200px;
}

.contentful-toolbar__link-input input:focus {
  outline: none;
  border-color: #2e75d4;
  box-shadow: 0 0 0 2px rgba(46, 117, 212, 0.2);
}

.contentful-toolbar__link-input button {
  border: 1px solid #d3dce6;
  border-radius: 4px;
  padding: 4px 8px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
}

/* Embed Dropdown */
.contentful-toolbar__embed-dropdown {
  position: relative;
}

.contentful-toolbar__embed-button {
  border: 1px solid #2e75d4;
  border-radius: 4px;
  padding: 6px 12px;
  background: #2e75d4;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.contentful-toolbar__embed-button:hover {
  background: #1e5aa8;
  border-color: #1e5aa8;
}

.contentful-toolbar__embed-dropdown:hover .contentful-toolbar__embed-menu {
  display: block;
}

.contentful-toolbar__embed-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #d3dce6;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 120px;
}

.contentful-toolbar__embed-option {
  display: block;
  width: 100%;
  border: none;
  background: none;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}

.contentful-toolbar__embed-option:hover {
  background: #f7f9fa;
}

/* Editor Content Styles */
.contentful-editor__content-wrapper {
  position: relative;
}

.contentful-editor__content {
  min-height: 200px;
}

.contentful-editor-content {
  padding: 16px;
  outline: none;
  line-height: 1.6;
  font-size: 16px;
  color: #2c3e50;
}

.contentful-editor-content:empty:before {
  content: attr(data-placeholder);
  color: #68737d;
  pointer-events: none;
}

/* Content Styling */
.contentful-editor-content h1 {
  font-size: 2em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 1.2;
}

.contentful-editor-content h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 1.3;
}

.contentful-editor-content h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 1.4;
}

.contentful-editor-content h4,
.contentful-editor-content h5,
.contentful-editor-content h6 {
  font-size: 1em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 1.5;
}

.contentful-editor-content p {
  margin: 0 0 1em 0;
}

.contentful-editor-content p:last-child {
  margin-bottom: 0;
}

.contentful-bullet-list,
.contentful-ordered-list {
  margin: 1em 0;
  padding-left: 1.5em;
}

.contentful-bullet-list li,
.contentful-ordered-list li {
  margin: 0.25em 0;
}

.contentful-blockquote {
  border-left: 4px solid #2e75d4;
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
  color: #68737d;
}

.contentful-link {
  color: #2e75d4;
  text-decoration: underline;
}

.contentful-link:hover {
  color: #1e5aa8;
}

/* Table Styles */
.contentful-table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  border: 1px solid #d3dce6;
}

.contentful-table-header,
.contentful-table-cell {
  border: 1px solid #d3dce6;
  padding: 8px 12px;
  text-align: left;
}

.contentful-table-header {
  background: #f7f9fa;
  font-weight: 600;
}

/* Theme Variations */
.contentful-editor--minimal {
  border: none;
  border-radius: 0;
}

.contentful-editor--minimal .contentful-toolbar {
  background: #fff;
  border-bottom: 1px solid #e1e8ed;
  border-radius: 0;
}

.contentful-editor--default .contentful-editor-content {
  font-family: Georgia, serif;
}

/* Focus States */
.contentful-editor:focus-within {
  border-color: #2e75d4;
  box-shadow: 0 0 0 2px rgba(46, 117, 212, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .contentful-toolbar {
    flex-wrap: wrap;
  }
  
  .contentful-toolbar__select {
    min-width: 100px;
  }
  
  .contentful-editor-content {
    padding: 12px;
    font-size: 14px;
  }
}