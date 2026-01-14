import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { ContentfulToolbar } from './Toolbar';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Underline } from '@tiptap/extension-underline';

// Mock editor for Storybook
const MockToolbarWrapper = ({ 
  disabledFeatures = [], 
  availableHeadings = [1, 2, 3, 4, 5, 6],
  availableMarks = ['bold', 'italic'],
  onEmbedEntry,
  onEmbedAsset,
}: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '<p>Sample content for toolbar testing</p>',
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <ContentfulToolbar
      editor={editor}
      disabledFeatures={disabledFeatures}
      availableHeadings={availableHeadings}
      availableMarks={availableMarks}
      onEmbedEntry={onEmbedEntry}
      onEmbedAsset={onEmbedAsset}
    />
  );
};

const meta: Meta<typeof MockToolbarWrapper> = {
  title: 'Components/ContentfulToolbar',
  component: MockToolbarWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ContentfulToolbar component provides the formatting controls for the rich text editor.

## Features
- Text formatting (bold, italic, underline)
- Heading selection dropdown
- List controls (bullet and numbered)
- Link insertion
- Table insertion
- Quote formatting
- Embed controls for Contentful entries and assets
- Undo/Redo functionality

The toolbar is highly configurable and can be customized by disabling specific features or limiting available formatting options.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onEmbedEntry: action('embed entry clicked'),
    onEmbedAsset: action('embed asset clicked'),
  },
};

export const LimitedFeatures: Story = {
  args: {
    disabledFeatures: ['table', 'embed', 'quote'],
    availableHeadings: [1, 2, 3],
    availableMarks: ['bold', 'italic'],
    onEmbedEntry: action('embed entry clicked'),
    onEmbedAsset: action('embed asset clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available.',
      },
    },
  },
};

export const MinimalToolbar: Story = {
  args: {
    disabledFeatures: ['table', 'embed', 'quote', 'lists', 'headings', 'link'],
    availableMarks: ['bold', 'italic'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal toolbar with only basic text formatting (bold, italic) and undo/redo.',
      },
    },
  },
};

export const OnlyHeadings: Story = {
  args: {
    disabledFeatures: ['bold', 'italic', 'underline', 'link', 'lists', 'quote', 'table', 'embed'],
    availableHeadings: [1, 2, 3, 4, 5, 6],
    availableMarks: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar configured to show only heading controls and undo/redo.',
      },
    },
  },
};

export const NoEmbedControls: Story = {
  args: {
    disabledFeatures: ['embed'],
    onEmbedEntry: undefined,
    onEmbedAsset: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar without embed controls - useful when not integrating with Contentful.',
      },
    },
  },
};