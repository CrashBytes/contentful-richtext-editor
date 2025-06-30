import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentfulRichTextEditor } from '@/components/ContentfulEditor';
import { BLOCKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';

// Mock TipTap modules
jest.mock('@tiptap/react', () => ({
  useEditor: jest.fn(),
  EditorContent: ({ editor, className }: any) => (
    <div className={className} data-testid="editor-content">
      {editor ? 'Editor loaded' : 'Loading...'}
    </div>
  ),
}));

jest.mock('@tiptap/starter-kit', () => ({
  configure: jest.fn(() => 'StarterKit'),
}));

jest.mock('@tiptap/extension-link', () => ({
  configure: jest.fn(() => 'Link'),
}));

jest.mock('@tiptap/extension-table', () => ({
  configure: jest.fn(() => 'Table'),
}));

jest.mock('@tiptap/extension-table-row', () => ({
  configure: jest.fn(() => 'TableRow'),
}));

jest.mock('@tiptap/extension-table-header', () => ({
  configure: jest.fn(() => 'TableHeader'),
}));

jest.mock('@tiptap/extension-table-cell', () => ({
  configure: jest.fn(() => 'TableCell'),
}));

jest.mock('@tiptap/extension-underline', () => 'Underline');

jest.mock('../utils/contentfulTransform', () => ({
  contentfulToTiptap: jest.fn((doc) => ({ type: 'doc', content: [] })),
  tiptapToContentful: jest.fn((content) => ({
    nodeType: 'document',
    data: {},
    content: [],
  })),
}));

import { useEditor } from '@tiptap/react';
import { contentfulToTiptap, tiptapToContentful } from '../utils/contentfulTransform';

const mockUseEditor = useEditor as jest.MockedFunction<typeof useEditor>;
const mockContentfulToTiptap = contentfulToTiptap as jest.MockedFunction<typeof contentfulToTiptap>;
const mockTiptapToContentful = tiptapToContentful as jest.MockedFunction<typeof tiptapToContentful>;

describe('ContentfulRichTextEditor', () => {
  const mockEditor = {
    commands: { setContent: jest.fn() },
    getJSON: jest.fn(() => ({ type: 'doc', content: [] })),
    chain: jest.fn(() => ({
      focus: jest.fn(() => ({
        insertContent: jest.fn(() => ({ run: jest.fn() })),
      })),
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEditor.mockReturnValue(mockEditor as any);
  });

  const sampleDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Sample text',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };

  it('renders the editor with default props', () => {
    render(<ContentfulRichTextEditor />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    expect(screen.getByText('Editor loaded')).toBeInTheDocument();
  });

  it('shows loading state when editor is not ready', () => {
    mockUseEditor.mockReturnValue(null);
    render(<ContentfulRichTextEditor />);
    expect(screen.getByText('Loading editor...')).toBeInTheDocument();
  });

  it('applies custom className and theme', () => {
    render(<ContentfulRichTextEditor className="custom-class" theme="minimal" />);
    const editor = screen.getByRole('generic');
    expect(editor).toHaveClass('custom-class', 'contentful-editor--minimal');
  });

  it('converts initial Contentful document', () => {
    const mockTiptapContent = { type: 'doc', content: [] };
    mockContentfulToTiptap.mockReturnValue(mockTiptapContent);

    render(<ContentfulRichTextEditor initialValue={sampleDocument} />);

    expect(mockContentfulToTiptap).toHaveBeenCalledWith(sampleDocument);
    expect(mockUseEditor).toHaveBeenCalledWith(
      expect.objectContaining({ content: mockTiptapContent })
    );
  });

  it('calls onChange with converted Contentful document', async () => {
    const onChange = jest.fn();
    const mockContentfulDoc = { nodeType: 'document', data: {}, content: [] };
    mockTiptapToContentful.mockReturnValue(mockContentfulDoc as Document);

    mockUseEditor.mockImplementation((config: any) => {
      if (config.onUpdate) {
        setTimeout(() => config.onUpdate({ editor: mockEditor }), 0);
      }
      return mockEditor as any;
    });

    render(<ContentfulRichTextEditor onChange={onChange} />);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(mockContentfulDoc);
    });
  });

  it('does not render toolbar in readonly mode', () => {
    render(<ContentfulRichTextEditor readonly={true} />);
    expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
  });

  it('configures editor as non-editable in readonly mode', () => {
    render(<ContentfulRichTextEditor readonly={true} />);
    expect(mockUseEditor).toHaveBeenCalledWith(
      expect.objectContaining({ editable: false })
    );
  });
});