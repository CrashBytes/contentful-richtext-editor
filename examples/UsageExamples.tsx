import React, { useState, useEffect } from 'react';
import { Document } from '@contentful/rich-text-types';
import { 
  ContentfulRichTextEditor, 
  ContentfulFieldConfiguration,
  fetchContentfulFieldConfig,
  createMockFieldConfig,
  parseContentfulFieldConfig 
} from './src';

// Example 1: Using with real Contentful Management API
const ContentfulEditorWithAPI: React.FC = () => {
  const [fieldConfig, setFieldConfig] = useState<ContentfulFieldConfiguration>();
  const [content, setContent] = useState<Document>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadFieldConfig = async () => {
      try {
        // Replace these with your actual Contentful details
        const config = await fetchContentfulFieldConfig(
          process.env.REACT_APP_CONTENTFUL_SPACE_ID!,
          process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE_ID!,
          process.env.REACT_APP_CONTENTFUL_FIELD_ID!,
          process.env.REACT_APP_CONTENTFUL_MANAGEMENT_TOKEN!
        );
        
        setFieldConfig(config || undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load configuration');
        console.error('Failed to load field configuration:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFieldConfig();
  }, []);

  const handleContentChange = (document: Document) => {
    setContent(document);
    console.log('Content changed:', document);
    
    // Here you would typically save to your backend or Contentful
    // Example: await saveToContentful(entryId, fieldId, document);
  };

  const handleEmbedEntry = async () => {
    // Your logic to open entry selector
    // This could open a modal, navigate to a picker, etc.
    console.log('Opening entry selector...');
    
    // Mock return - replace with actual entry selection logic
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          sys: { 
            id: 'entry-' + Date.now(),
            type: 'Entry',
            contentType: { sys: { id: 'blogPost' } }
          },
          fields: { 
            title: 'Sample Blog Post',
            slug: 'sample-blog-post'
          }
        });
      }, 1000);
    });
  };

  const handleEmbedAsset = async () => {
    // Your logic to open asset selector
    console.log('Opening asset selector...');
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          sys: { 
            id: 'asset-' + Date.now(),
            type: 'Asset'
          },
          fields: { 
            title: 'Sample Image',
            file: {
              url: 'https://via.placeholder.com/400x300',
              fileName: 'sample.jpg',
              contentType: 'image/jpeg'
            }
          }
        });
      }, 1000);
    });
  };

  const handleEmbedInlineEntry = async () => {
    // Your logic to open inline entry selector
    console.log('Opening inline entry selector...');
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          sys: { 
            id: 'inline-entry-' + Date.now(),
            type: 'Entry',
            contentType: { sys: { id: 'author' } }
          },
          fields: { 
            name: 'John Doe',
            title: 'Senior Developer'
          }
        });
      }, 1000);
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading editor configuration from Contentful...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <p>Error loading configuration: {error}</p>
        <p>Make sure your environment variables are set correctly.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Rich Text Editor with Contentful Configuration</h2>
      {fieldConfig && (
        <details style={{ marginBottom: '20px' }}>
          <summary>Configuration Details</summary>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(parseContentfulFieldConfig(fieldConfig), null, 2)}
          </pre>
        </details>
      )}
      
      <ContentfulRichTextEditor
        initialValue={content}
        onChange={handleContentChange}
        onEmbedEntry={handleEmbedEntry}
        onEmbedAsset={handleEmbedAsset}
        onEmbedInlineEntry={handleEmbedInlineEntry}
        fieldConfiguration={fieldConfig}
        placeholder="Start writing your content..."
        theme="contentful"
        className="my-custom-editor"
      />
    </div>
  );
};

// Example 2: Using with mock configuration for development/testing
const ContentfulEditorWithMockConfig: React.FC = () => {
  const [content, setContent] = useState<Document>();

  // Create a restricted configuration for testing
  const mockConfig = createMockFieldConfig({
    enabledMarks: ['bold', 'italic'], // No underline
    enabledNodeTypes: [
      'paragraph',
      'heading-1',
      'heading-2', 
      'heading-3',
      // Note: No heading-4, heading-5, heading-6
      'unordered-list',
      // Note: No ordered-list
      'hyperlink',
      'embedded-entry-block',
      // Note: No embedded-asset-block or embedded-entry-inline
      'blockquote',
      // Note: No table
    ],
  });

  const handleContentChange = (document: Document) => {
    setContent(document);
    console.log('Mock editor content changed:', document);
  };

  const handleEmbedEntry = async () => {
    return {
      sys: { id: 'mock-entry-123', type: 'Entry' },
      fields: { title: 'Mock Entry for Testing' }
    };
  };

  return (
    <div>
      <h2>Rich Text Editor with Mock Configuration</h2>
      <div style={{ 
        background: '#f0f8ff', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #bee5eb'
      }}>
        <h4>Available Features:</h4>
        <ul>
          <li>✅ Bold and italic (no underline)</li>
          <li>✅ Headings 1-3 only</li>
          <li>✅ Bullet lists only (no numbered lists)</li>
          <li>✅ Hyperlinks</li>
          <li>✅ Entry embeds only (no assets or inline entries)</li>
          <li>✅ Quotes (but no tables)</li>
        </ul>
      </div>
      
      <ContentfulRichTextEditor
        initialValue={content}
        onChange={handleContentChange}
        onEmbedEntry={handleEmbedEntry}
        fieldConfiguration={mockConfig}
        placeholder="Try the limited formatting options..."
        theme="contentful"
      />
    </div>
  );
};

// Example 3: Manual configuration (backwards compatibility)
const ContentfulEditorManualConfig: React.FC = () => {
  const [content, setContent] = useState<Document>();

  const handleContentChange = (document: Document) => {
    setContent(document);
    console.log('Manual config editor content changed:', document);
  };

  return (
    <div>
      <h2>Rich Text Editor with Manual Configuration</h2>
      <p>This example uses the legacy manual configuration approach for backwards compatibility.</p>
      
      <ContentfulRichTextEditor
        initialValue={content}
        onChange={handleContentChange}
        // Manual configuration (no fieldConfiguration prop)
        availableHeadings={[1, 2, 3]} // Only H1, H2, H3
        availableMarks={['bold', 'italic']} // No underline
        disabledFeatures={['table', 'embed']} // No tables or embeds
        placeholder="Manual configuration example..."
        theme="minimal"
        readonly={false}
      />
    </div>
  );
};

// Example 4: Read-only editor for display
const ContentfulEditorReadOnly: React.FC = () => {
  // Sample rich text content
  const sampleContent: Document = {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'heading-1',
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Welcome to Our Platform',
            marks: [],
            data: {},
          },
        ],
      },
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'This is a ',
            marks: [],
            data: {},
          },
          {
            nodeType: 'text',
            value: 'read-only',
            marks: [{ type: 'bold' }],
            data: {},
          },
          {
            nodeType: 'text',
            value: ' rich text editor that displays content without allowing edits.',
            marks: [],
            data: {},
          },
        ],
      },
      {
        nodeType: 'unordered-list',
        data: {},
        content: [
          {
            nodeType: 'list-item',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Perfect for displaying content',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          {
            nodeType: 'list-item',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Maintains all rich text formatting',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          {
            nodeType: 'list-item',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'No editing interface shown',
                    marks: [{ type: 'italic' }],
                    data: {},
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Read-Only Rich Text Display</h2>
      <p>This editor is in read-only mode and can be used to display rich text content.</p>
      
      <ContentfulRichTextEditor
        initialValue={sampleContent}
        readonly={true}
        theme="default"
        className="readonly-editor"
      />
    </div>
  );
};

// Example 5: Advanced configuration with validation
const ContentfulEditorAdvanced: React.FC = () => {
  const [content, setContent] = useState<Document>();
  const [wordCount, setWordCount] = useState(0);
  const [isValid, setIsValid] = useState(true);

  // Complex configuration that allows most features
  const advancedConfig = createMockFieldConfig({
    enabledMarks: ['bold', 'italic', 'underline'],
    enabledNodeTypes: [
      'paragraph',
      'heading-1',
      'heading-2',
      'heading-3',
      'heading-4',
      'unordered-list',
      'ordered-list',
      'blockquote',
      'table',
      'hyperlink',
      'embedded-entry-block',
      'embedded-asset-block',
      'embedded-entry-inline',
    ],
  });

  const handleContentChange = (document: Document) => {
    setContent(document);
    
    // Calculate word count (you'd import this from your utils)
    // const count = countWords(document);
    // setWordCount(count);
    
    // Perform validation
    const hasContent = document.content.length > 0 && 
      document.content.some(node => 
        node.nodeType !== 'paragraph' || 
        (node.content && node.content.length > 0)
      );
    setIsValid(hasContent);
    
    console.log('Advanced editor content changed:', document);
  };

  const handleEmbedEntry = async () => {
    // Simulate opening a more complex entry selector
    const entryTypes = ['blogPost', 'product', 'author', 'category'];
    const randomType = entryTypes[Math.floor(Math.random() * entryTypes.length)];
    
    return {
      sys: { 
        id: `entry-${randomType}-${Date.now()}`,
        type: 'Entry',
        contentType: { sys: { id: randomType } }
      },
      fields: { 
        title: `Sample ${randomType.charAt(0).toUpperCase() + randomType.slice(1)}`,
        description: `This is a sample ${randomType} entry`
      }
    };
  };

  const handleEmbedAsset = async () => {
    const assetTypes = ['image', 'video', 'document'];
    const randomType = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    
    return {
      sys: { 
        id: `asset-${randomType}-${Date.now()}`,
        type: 'Asset'
      },
      fields: { 
        title: `Sample ${randomType}`,
        file: {
          url: `https://via.placeholder.com/400x300?text=${randomType}`,
          fileName: `sample.${randomType === 'image' ? 'jpg' : randomType === 'video' ? 'mp4' : 'pdf'}`,
          contentType: randomType === 'image' ? 'image/jpeg' : randomType === 'video' ? 'video/mp4' : 'application/pdf'
        }
      }
    };
  };

  const handleEmbedInlineEntry = async () => {
    return {
      sys: { 
        id: `inline-${Date.now()}`,
        type: 'Entry',
        contentType: { sys: { id: 'reference' } }
      },
      fields: { 
        name: 'Quick Reference',
        type: 'inline-reference'
      }
    };
  };

  return (
    <div>
      <h2>Advanced Rich Text Editor</h2>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '10px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <span>Word Count: {wordCount}</span>
        <span style={{ color: isValid ? 'green' : 'red' }}>
          {isValid ? '✅ Valid' : '❌ Content required'}
        </span>
      </div>
      
      <ContentfulRichTextEditor
        initialValue={content}
        onChange={handleContentChange}
        onEmbedEntry={handleEmbedEntry}
        onEmbedAsset={handleEmbedAsset}
        onEmbedInlineEntry={handleEmbedInlineEntry}
        fieldConfiguration={advancedConfig}
        placeholder="This editor supports all features..."
        theme="contentful"
        className="advanced-editor"
      />
      
      {content && (
        <details style={{ marginTop: '20px' }}>
          <summary>Document JSON</summary>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(content, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

// Main app component showing all examples
const App: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);

  const examples = [
    { name: 'API Configuration', component: ContentfulEditorWithAPI },
    { name: 'Mock Configuration', component: ContentfulEditorWithMockConfig },
    { name: 'Manual Configuration', component: ContentfulEditorManualConfig },
    { name: 'Read-Only Display', component: ContentfulEditorReadOnly },
    { name: 'Advanced Features', component: ContentfulEditorAdvanced },
  ];

  const ActiveComponent = examples[activeExample].component;

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Contentful Rich Text Editor Examples</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          This demonstrates the Contentful Rich Text Editor with automatic configuration 
          based on field settings defined in Contentful's interface.
        </p>
      </header>
      
      <nav style={{ marginBottom: '20px' }}>
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
              padding: '10px 16px',
              backgroundColor: activeExample === index ? '#2e75d4' : '#f0f0f0',
              color: activeExample === index ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeExample === index ? '600' : '400',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (activeExample !== index) {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeExample !== index) {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }
            }}
          >
            {example.name}
          </button>
        ))}
      </nav>

      <main style={{ 
        border: '1px solid #d3dce6', 
        borderRadius: '8px', 
        padding: '24px',
        backgroundColor: '#fafafa',
        minHeight: '500px'
      }}>
        <ActiveComponent />
      </main>

      <footer style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Environment Variables Required for API Example:</h3>
        <pre style={{ 
          background: '#fff', 
          padding: '12px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
{`REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_CONTENT_TYPE_ID=your_content_type_id  
REACT_APP_CONTENTFUL_FIELD_ID=your_rich_text_field_id
REACT_APP_CONTENTFUL_MANAGEMENT_TOKEN=your_management_token`}
        </pre>
        
        <h3 style={{ marginTop: '20px' }}>Keyboard Shortcuts:</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><kbd>Ctrl/Cmd + B</kbd> - Bold</li>
          <li><kbd>Ctrl/Cmd + I</kbd> - Italic</li>
          <li><kbd>Ctrl/Cmd + U</kbd> - Underline</li>
          <li><kbd>Ctrl/Cmd + K</kbd> - Add link</li>
          <li><kbd>Ctrl/Cmd + Shift + E</kbd> - Embed entry</li>
          <li><kbd>Ctrl/Cmd + Shift + A</kbd> - Embed asset</li>
          <li><kbd>Ctrl/Cmd + Shift + I</kbd> - Embed inline entry</li>
        </ul>
      </footer>
    </div>
  );
};

export default App;