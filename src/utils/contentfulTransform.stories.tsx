import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  contentfulToTiptap, 
  tiptapToContentful, 
  validateContentfulDocument,
  createEmptyDocument 
} from './contentfulTransform';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// Demo component to showcase transformation utilities
const TransformationDemo = () => {
  const [contentfulDoc, setContentfulDoc] = useState(() => createEmptyDocument());
  const [tiptapJson, setTiptapJson] = useState(() => contentfulToTiptap(createEmptyDocument()));

  const sampleContentfulDoc = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.HEADING_1,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Sample Document',
            marks: [],
            data: {},
          },
        ],
      },
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'This is a paragraph with ',
            marks: [],
            data: {},
          },
          {
            nodeType: 'text',
            value: 'bold text',
            marks: [{ type: MARKS.BOLD }],
            data: {},
          },
          {
            nodeType: 'text',
            value: ' and ',
            marks: [],
            data: {},
          },
          {
            nodeType: 'text',
            value: 'italic text',
            marks: [{ type: MARKS.ITALIC }],
            data: {},
          },
          {
            nodeType: 'text',
            value: '.',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  } as any;

  const handleContentfulToTiptap = () => {
    try {
      const result = contentfulToTiptap(sampleContentfulDoc);
      setTiptapJson(result);
      setContentfulDoc(sampleContentfulDoc);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const handleTiptapToContentful = () => {
    try {
      const result = tiptapToContentful(tiptapJson);
      setContentfulDoc(result);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const isValid = validateContentfulDocument(contentfulDoc);

  return (
    <div style={{ fontFamily: 'monospace', maxWidth: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Transformation Utilities Demo</h3>
        <p>These utilities help convert between Contentful and Tiptap JSON formats.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h4>Contentful Document</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px', 
            fontSize: '12px',
            height: '300px',
            overflow: 'auto',
            border: isValid ? '2px solid green' : '2px solid red'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Valid:</strong> {isValid ? '✅ Yes' : '❌ No'}
            </div>
            <pre>{JSON.stringify(contentfulDoc, null, 2)}</pre>
          </div>
        </div>

        <div>
          <h4>Tiptap JSON</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px', 
            fontSize: '12px',
            height: '300px',
            overflow: 'auto',
            border: '1px solid #ccc'
          }}>
            <pre>{JSON.stringify(tiptapJson, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={handleContentfulToTiptap}
          style={{
            padding: '10px 20px',
            background: '#2e75d4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Convert Sample Contentful → Tiptap
        </button>
        
        <button 
          onClick={handleTiptapToContentful}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Convert Tiptap → Contentful
        </button>

        <button 
          onClick={() => {
            const empty = createEmptyDocument();
            setContentfulDoc(empty);
            setTiptapJson(contentfulToTiptap(empty));
          }}
          style={{
            padding: '10px 20px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Empty Document
        </button>
      </div>

      <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '4px' }}>
        <h4>Available Functions:</h4>
        <ul style={{ margin: 0, fontSize: '14px' }}>
          <li><code>contentfulToTiptap(document)</code> - Converts Contentful document to Tiptap JSON</li>
          <li><code>tiptapToContentful(json)</code> - Converts Tiptap JSON to Contentful document</li>
          <li><code>validateContentfulDocument(document)</code> - Validates if a document is properly formatted</li>
          <li><code>createEmptyDocument()</code> - Creates an empty Contentful document</li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof TransformationDemo> = {
  title: 'Utils/ContentfulTransform',
  component: TransformationDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Utility functions for converting between Contentful Rich Text format and Tiptap JSON format.

## Functions

### contentfulToTiptap(document)
Converts a Contentful Rich Text Document to Tiptap JSON format for use in the editor.

### tiptapToContentful(json)
Converts Tiptap JSON format back to a Contentful Rich Text Document.

### validateContentfulDocument(document)
Validates if a document follows the correct Contentful Rich Text structure.

### createEmptyDocument()
Creates a new empty Contentful Rich Text Document with a single empty paragraph.

## Usage
These functions are used internally by the editor but can also be used standalone for processing Contentful rich text data.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the transformation between Contentful and Tiptap formats. Try the buttons to see how the data structures convert.',
      },
    },
  },
};