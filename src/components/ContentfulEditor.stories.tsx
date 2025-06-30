import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { ContentfulRichTextEditor } from './ContentfulEditor';
import { testDataSamples } from '../testData/samples';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// Simple content without underline for limited features stories
const simpleContent = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Simple Content',
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
          value: 'This content only uses ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'bold',
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
          value: 'italic',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' formatting without underline.',
          marks: [],
          data: {},
        },
      ],
    },
  ],
} as any;

const meta: Meta<typeof ContentfulRichTextEditor> = {
  title: 'Components/ContentfulRichTextEditor',
  component: ContentfulRichTextEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A modern, Tiptap-based rich text editor that's fully compatible with Contentful's rich text format.

## Features
- ✅ Full Contentful Compatibility - Seamless conversion between Contentful and Tiptap formats
- ✅ Modern UI - Clean, intuitive interface matching Contentful's design
- ✅ TypeScript Support - Complete type safety with Contentful's rich text types
- ✅ Extensible - Built on Tiptap v2 for easy customization
- ✅ Lightweight - Tree-shakeable, only import what you need
- ✅ Responsive - Works on desktop and mobile devices

## Supported Features
- **Text Formatting**: Bold, italic, underline
- **Headings**: H1 through H6
- **Lists**: Ordered and unordered lists
- **Links**: Hyperlinks with URL validation
- **Tables**: Full table support with headers
- **Quotes**: Blockquotes
- **Embedded Content**: Callbacks for Contentful entries and assets
- **Undo/Redo**: Full history support
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '900px', maxWidth: '100vw', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - empty editor
export const Default: Story = {
  args: {
    placeholder: 'Start writing your content...',
    onChange: action('content changed'),
  },
};

// Blog post with all features
export const BlogPostExample: Story = {
  args: {
    initialValue: testDataSamples.blogPost,
    placeholder: 'Edit this blog post...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive blog post showcasing all editor features: headings, paragraphs, lists, links, tables, quotes, and formatting.',
      },
    },
  },
};

// Marketing copy
export const MarketingCopyExample: Story = {
  args: {
    initialValue: testDataSamples.marketingCopy,
    placeholder: 'Edit this marketing copy...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketing copy with compelling headlines, bullet points, testimonials, and call-to-action links.',
      },
    },
  },
};

// Technical documentation
export const TechnicalDocumentationExample: Story = {
  args: {
    initialValue: testDataSamples.technicalDoc,
    placeholder: 'Edit this technical documentation...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Technical documentation with structured content, tables, code references, and warnings.',
      },
    },
  },
};

// Recipe/Tutorial content
export const RecipeExample: Story = {
  args: {
    initialValue: testDataSamples.recipe,
    placeholder: 'Edit this recipe...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe format with ingredients list, step-by-step instructions, and helpful tips.',
      },
    },
  },
};

// Different themes with content
export const ContentfulTheme: Story = {
  args: {
    theme: 'contentful',
    initialValue: testDataSamples.blogPost,
    placeholder: 'Contentful theme...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Contentful theme (default) - matches Contentful\'s native editor appearance.',
      },
    },
  },
};

export const MinimalTheme: Story = {
  args: {
    theme: 'minimal',
    initialValue: testDataSamples.marketingCopy,
    placeholder: 'Minimal theme...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal theme - clean design with reduced visual elements.',
      },
    },
  },
};

export const DefaultTheme: Story = {
  args: {
    theme: 'default',
    initialValue: testDataSamples.recipe,
    placeholder: 'Default theme with serif fonts...',
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default theme - standard rich text editor with serif fonts.',
      },
    },
  },
};

// Read-only mode
export const ReadOnly: Story = {
  args: {
    initialValue: testDataSamples.technicalDoc,
    readonly: true,
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode - content cannot be edited, toolbar is hidden.',
      },
    },
  },
};

// Limited features - using simple content without underline
export const LimitedFeatures: Story = {
  args: {
    initialValue: simpleContent,
    placeholder: 'Only basic formatting available...',
    disabledFeatures: ['table', 'embed', 'quote'],
    availableHeadings: [1, 2, 3],
    availableMarks: ['bold', 'italic'], // No underline
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available, and only bold/italic formatting.',
      },
    },
  },
};

// Simple editor (minimal features) - using simple content
export const SimpleEditor: Story = {
  args: {
    initialValue: simpleContent,
    placeholder: 'Simple editor with basic features...',
    disabledFeatures: ['table', 'embed', 'quote', 'lists', 'headings'],
    availableMarks: ['bold', 'italic'], // No underline
    onChange: action('content changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'A very simple editor with only basic text formatting (bold, italic) and links.',
      },
    },
  },
};

// With embed handlers
export const WithEmbedHandlers: Story = {
  args: {
    initialValue: testDataSamples.blogPost,
    placeholder: 'Try the embed buttons in the toolbar...',
    onChange: action('content changed'),
    onEmbedEntry: () => {
      action('embed entry clicked')();
      return Promise.resolve({
        sys: { id: 'entry-123', type: 'Entry' },
        fields: { title: 'Sample Blog Post' },
      });
    },
    onEmbedAsset: () => {
      action('embed asset clicked')();
      return Promise.resolve({
        sys: { id: 'asset-456', type: 'Asset' },
        fields: { 
          title: 'Sample Image',
          file: {
            url: 'https://example.com/image.jpg',
            fileName: 'image.jpg',
            contentType: 'image/jpeg',
          },
        },
      });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with embed handlers that simulate selecting Contentful entries and assets. Click the "Embed" button to test.',
      },
    },
  },
};

// Custom styling with content
export const CustomStyling: Story = {
  args: {
    className: 'custom-editor-demo',
    initialValue: testDataSamples.recipe,
    placeholder: 'Custom styled editor...',
    onChange: action('content changed'),
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          .custom-editor-demo {
            border: 2px solid #ff6b6b;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
          }
          .custom-editor-demo .contentful-toolbar {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            border-bottom: 2px solid #ff6b6b;
          }
          .custom-editor-demo .contentful-toolbar__button {
            color: white;
            font-weight: bold;
          }
          .custom-editor-demo .contentful-toolbar__button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          .custom-editor-demo .contentful-editor-content {
            background: #fefefe;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Example of custom styling using CSS classes. The editor has a custom red border and gradient toolbar.',
      },
    },
  },
};