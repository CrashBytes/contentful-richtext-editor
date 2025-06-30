import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Introduction component
const IntroductionPage = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
        @crashbytes/contentful-richtext-editor
      </h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        A modern, Tiptap-based rich text editor that's fully compatible with Contentful's rich text format. 
        Provides the same editing experience as Contentful's native editor while maintaining perfect 
        compatibility with Contentful's document structure.
      </p>

      <h2 style={{ color: '#34495e', marginTop: '2rem', marginBottom: '1rem' }}>🚀 Quick Start</h2>
      <pre style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '1rem'
      }}>
        <code>npm install @crashbytes/contentful-richtext-editor</code>
      </pre>

      <pre style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '2rem'
      }}>
        <code>{`import React, { useState } from 'react';
import { ContentfulRichTextEditor } from '@crashbytes/contentful-richtext-editor';
import '@crashbytes/contentful-richtext-editor/dist/index.css';

function App() {
  const [content, setContent] = useState();

  return (
    <ContentfulRichTextEditor
      placeholder="Start writing..."
      onChange={setContent}
    />
  );
}`}</code>
      </pre>

      <h2 style={{ color: '#34495e', marginBottom: '1rem' }}>✨ Features</h2>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Full Contentful Compatibility</strong> - Seamless conversion between Contentful and Tiptap formats</li>
        <li><strong>Modern UI</strong> - Clean, intuitive interface matching Contentful's design</li>
        <li><strong>TypeScript Support</strong> - Complete type safety with Contentful's rich text types</li>
        <li><strong>Extensible</strong> - Built on Tiptap v2 for easy customization</li>
        <li><strong>Lightweight</strong> - Tree-shakeable, only import what you need</li>
        <li><strong>Responsive</strong> - Works on desktop and mobile devices</li>
      </ul>

      <h2 style={{ color: '#34495e', marginTop: '2rem', marginBottom: '1rem' }}>📖 Supported Features</h2>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Text Formatting</strong>: Bold, italic, underline</li>
        <li><strong>Headings</strong>: H1 through H6</li>
        <li><strong>Lists</strong>: Ordered and unordered lists</li>
        <li><strong>Links</strong>: Hyperlinks with URL validation</li>
        <li><strong>Tables</strong>: Full table support with headers</li>
        <li><strong>Quotes</strong>: Blockquotes</li>
        <li><strong>Embedded Content</strong>: Callbacks for Contentful entries and assets</li>
        <li><strong>Undo/Redo</strong>: Full history support</li>
      </ul>

      <h2 style={{ color: '#34495e', marginTop: '2rem', marginBottom: '1rem' }}>🎨 Themes</h2>
      <p>Choose from three built-in themes:</p>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Contentful</strong> (default) - Matches Contentful's native editor</li>
        <li><strong>Minimal</strong> - Clean, reduced visual elements</li>
        <li><strong>Default</strong> - Standard rich text editor with serif fonts</li>
      </ul>

      <h2 style={{ color: '#34495e', marginTop: '2rem', marginBottom: '1rem' }}>📚 Stories in this Storybook</h2>
      <p>Explore the different components and configurations:</p>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>ContentfulRichTextEditor</strong> - Main editor component with various configurations</li>
        <li><strong>ContentfulToolbar</strong> - Standalone toolbar component</li>
        <li><strong>Utils/ContentfulTransform</strong> - Utility functions for data conversion</li>
      </ul>

      <div style={{ 
        marginTop: '3rem', 
        padding: '1rem', 
        background: '#e8f5e8', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Made with ❤️ for the Contentful community</p>
      </div>
    </div>
  );
};

const meta: Meta<typeof IntroductionPage> = {
  title: 'Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null, // Disable default docs page since we're providing our own
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {};