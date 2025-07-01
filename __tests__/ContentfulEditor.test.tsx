import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentfulRichTextEditor } from '@components/ContentfulEditor';
import '@testing-library/jest-dom';
import { BLOCKS } from '@contentful/rich-text-types';
import * as contentfulTransform from '@/utils/contentfulTransform';

// Mock dependencies
jest.mock('@tiptap/react', () => ({
  useEditor: jest.fn(),
  EditorContent: (props: any) => {
    const attributes = props.editor?.options?.editorProps?.attributes || {};
    return (
      <div
        data-testid="editor-content"
        {...attributes}
      >
        Editor loaded
      </div>
    );
  },
}));

jest.mock('@components/Toolbar', () => ({
  ContentfulToolbar: (props: any) => (
    <div data-testid="toolbar">
      <button onClick={props.onEmbedEntry}>📄 Entry</button>
      <button onClick={props.onEmbedAsset}>🖼️ Media</button>
      <button onClick={props.onEmbedInlineEntry}>📝 Inline Entry</button>
      <span data-testid="disabled-features">{JSON.stringify(props.disabledFeatures)}</span>
      <span data-testid="available-headings">{JSON.stringify(props.availableHeadings)}</span>
      <span data-testid="available-marks">{JSON.stringify(props.availableMarks)}</span>
      <span data-testid="allow-hyperlinks">{String(props.allowHyperlinks)}</span>
    </div>
  ),
}));

jest.mock('@/utils/contentfulTransform');
jest.mock('@/utils/configParser');

// Mock Tiptap extensions
jest.mock('@tiptap/starter-kit', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'StarterKit'),
  },
}));

jest.mock('@tiptap/extension-link', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'Link'),
  },
}));

jest.mock('@tiptap/extension-table', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'Table'),
  },
}));

jest.mock('@tiptap/extension-table-row', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'TableRow'),
  },
}));

jest.mock('@tiptap/extension-table-header', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'TableHeader'),
  },
}));

jest.mock('@tiptap/extension-table-cell', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(() => 'TableCell'),
  },
}));

jest.mock('@tiptap/extension-underline', () => ({
  __esModule: true,
  default: 'Underline',
}));

const mockContentfulTransform = contentfulTransform as jest.Mocked<typeof contentfulTransform>;

const createMockEditor = (overrides = {}) => ({
  getJSON: jest.fn(() => ({})),
  commands: { 
    setContent: jest.fn(),
  },
  chain: jest.fn(() => ({
    focus: jest.fn(() => ({
      insertContent: jest.fn(() => ({ run: jest.fn() })),
    })),
  })),
  options: {
    editorProps: {
      attributes: {
        'data-placeholder': 'Type here...',
      },
    },
  },
  ...overrides,
});

const mockUseEditor = require('@tiptap/react').useEditor;

describe('ContentfulRichTextEditor', () => {
  let mockEditor: any;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockEditor = createMockEditor();
    mockUseEditor.mockReturnValue(mockEditor);
    user = userEvent.setup();
    jest.clearAllMocks();

    // Setup default mocks for transform functions
    mockContentfulTransform.contentfulToTiptap.mockReturnValue({ type: 'doc', content: [] });
    mockContentfulTransform.tiptapToContentful.mockReturnValue({
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders editor when editor is available', () => {
      render(<ContentfulRichTextEditor />);
      
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
      expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    });

    it('shows loading state when editor is not available', () => {
      mockUseEditor.mockReturnValue(null);
      
      render(<ContentfulRichTextEditor />);
      
      expect(screen.getByText('Loading editor...')).toBeInTheDocument();
      expect(screen.queryByTestId('editor-content')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ContentfulRichTextEditor className="my-custom-class" />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('my-custom-class');
    });

    it('applies theme class', () => {
      render(<ContentfulRichTextEditor theme="minimal" />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--minimal');
    });

    it('shows border by default', () => {
      render(<ContentfulRichTextEditor />);
      expect(document.querySelector('.contentful-editor')).not.toHaveClass('contentful-editor--borderless');
    });

    it('removes border when showBorder is false', () => {
      render(<ContentfulRichTextEditor showBorder={false} />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--borderless');
    });

    it('renders placeholder', () => {
      render(<ContentfulRichTextEditor placeholder="Type here..." />);
      expect(screen.getByTestId('editor-content')).toHaveAttribute('data-placeholder', 'Type here...');
    });

    it('hides toolbar in readonly mode', () => {
      render(<ContentfulRichTextEditor readonly />);
      expect(screen.queryByTestId('toolbar')).not.toBeInTheDocument();
    });
  });

  describe('Props Configuration', () => {
    it('renders with custom availableHeadings', () => {
      render(<ContentfulRichTextEditor availableHeadings={[2, 3]} />);
      
      const availableHeadings = screen.getByTestId('available-headings');
      expect(availableHeadings).toHaveTextContent('[2,3]');
    });

    it('renders with custom availableMarks', () => {
      render(<ContentfulRichTextEditor availableMarks={['bold']} />);
      
      const availableMarks = screen.getByTestId('available-marks');
      expect(availableMarks).toHaveTextContent('["bold"]');
    });

    it('renders with custom disabledFeatures', () => {
      render(<ContentfulRichTextEditor disabledFeatures={['bold', 'italic']} />);
      
      const disabledFeatures = screen.getByTestId('disabled-features');
      expect(disabledFeatures).toHaveTextContent('["bold","italic"]');
    });

    it('renders with fieldConfiguration', () => {
      const fieldConfig = {
        validations: [{
          enabledMarks: ['bold'],
          enabledNodeTypes: ['paragraph', 'heading-1']
        }]
      };

      const mockParseConfig = require('@/utils/configParser').parseContentfulFieldConfig;
      mockParseConfig.mockReturnValue({
        availableHeadings: [1],
        availableMarks: ['bold'],
        disabledFeatures: ['italic'],
        allowHyperlinks: true,
        allowEmbeddedEntries: true,
        allowEmbeddedAssets: true,
        allowInlineEntries: true,
        allowTables: true,
        allowQuotes: true,
        allowLists: true,
      });

      render(<ContentfulRichTextEditor fieldConfiguration={fieldConfig} />);
      
      expect(mockParseConfig).toHaveBeenCalledWith(fieldConfig);
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('renders with initialValue', () => {
      const initialValue = { 
        nodeType: BLOCKS.DOCUMENT, 
        data: {}, 
        content: [] 
      };

      render(<ContentfulRichTextEditor initialValue={initialValue} />);
      
      expect(mockContentfulTransform.contentfulToTiptap).toHaveBeenCalledWith(initialValue);
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('applies default theme when not specified', () => {
      render(<ContentfulRichTextEditor />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--contentful');
    });

    it('applies all theme classes correctly', () => {
      const { rerender } = render(<ContentfulRichTextEditor theme="default" />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--default');

      rerender(<ContentfulRichTextEditor theme="minimal" />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--minimal');

      rerender(<ContentfulRichTextEditor theme="contentful" />);
      expect(document.querySelector('.contentful-editor')).toHaveClass('contentful-editor--contentful');
    });
  });

  describe('Configuration Parsing', () => {
    it('uses availableMarks and disabledFeatures when no fieldConfiguration', () => {
      render(
        <ContentfulRichTextEditor 
          availableMarks={['bold']}
          disabledFeatures={['italic', 'table']}
        />
      );

      const disabledFeatures = screen.getByTestId('disabled-features');
      expect(disabledFeatures).toHaveTextContent('["italic","underline","table"]');
    });

    it('applies configuration for all disabled marks', () => {
      render(
        <ContentfulRichTextEditor 
          availableMarks={[]}
          disabledFeatures={['link', 'lists', 'headings', 'quote', 'embed']}
        />
      );

      const disabledFeatures = screen.getByTestId('disabled-features');
      const parsed = JSON.parse(disabledFeatures.textContent || '[]');
      
      expect(parsed).toContain('bold');
      expect(parsed).toContain('italic');
      expect(parsed).toContain('underline');
      expect(parsed).toContain('link');
      expect(parsed).toContain('lists');
      expect(parsed).toContain('headings');
      expect(parsed).toContain('quote');
      expect(parsed).toContain('embed');
    });
  });

  describe('Editor Extensions Configuration', () => {
    it('configures StarterKit with correct heading levels', () => {
      const StarterKit = require('@tiptap/starter-kit').default;
      
      render(<ContentfulRichTextEditor availableHeadings={[1, 2, 3]} />);
      
      expect(StarterKit.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: { levels: [1, 2, 3] },
        })
      );
    });

    it('disables heading when no headings available', () => {
      const StarterKit = require('@tiptap/starter-kit').default;
      
      render(<ContentfulRichTextEditor availableHeadings={[]} />);
      
      expect(StarterKit.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: false,
        })
      );
    });

    it('configures marks correctly', () => {
      const StarterKit = require('@tiptap/starter-kit').default;
      
      render(<ContentfulRichTextEditor availableMarks={['bold']} />);
      
      expect(StarterKit.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          bold: {},
          italic: false,
        })
      );
    });

    it('configures lists and quotes', () => {
      const StarterKit = require('@tiptap/starter-kit').default;
      
      render(<ContentfulRichTextEditor disabledFeatures={['lists', 'quote']} />);
      
      expect(StarterKit.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          bulletList: false,
          orderedList: false,
          blockquote: false,
        })
      );
    });

    it('includes Underline extension when available', () => {
      render(<ContentfulRichTextEditor availableMarks={['underline']} />);
      
      // Extension should be included in the extensions array
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          extensions: expect.arrayContaining(['Underline']),
        })
      );
    });

    it('includes Link extension when hyperlinks allowed', () => {
      const Link = require('@tiptap/extension-link').default;
      
      render(<ContentfulRichTextEditor />);
      
      expect(Link.configure).toHaveBeenCalledWith({
        openOnClick: false,
        HTMLAttributes: {
          class: 'contentful-link',
          rel: 'noopener noreferrer',
        },
      });
    });

    it('includes Table extensions when tables allowed', () => {
      const Table = require('@tiptap/extension-table').default;
      const TableRow = require('@tiptap/extension-table-row').default;
      const TableHeader = require('@tiptap/extension-table-header').default;
      const TableCell = require('@tiptap/extension-table-cell').default;
      
      render(<ContentfulRichTextEditor />);
      
      expect(Table.configure).toHaveBeenCalledWith({
        resizable: true,
        HTMLAttributes: { class: 'contentful-table' },
      });
      expect(TableRow.configure).toHaveBeenCalledWith({
        HTMLAttributes: { class: 'contentful-table-row' },
      });
      expect(TableHeader.configure).toHaveBeenCalledWith({
        HTMLAttributes: { class: 'contentful-table-header' },
      });
      expect(TableCell.configure).toHaveBeenCalledWith({
        HTMLAttributes: { class: 'contentful-table-cell' },
      });
    });

    it('excludes extensions when features are disabled', () => {
      render(
        <ContentfulRichTextEditor 
          disabledFeatures={['link', 'table']}
          availableMarks={['bold']}
        />
      );
      
      const Link = require('@tiptap/extension-link').default;
      const Table = require('@tiptap/extension-table').default;
      
      expect(Link.configure).not.toHaveBeenCalled();
      expect(Table.configure).not.toHaveBeenCalled();
    });
  });

  describe('Editor Initialization', () => {
    it('sets editor as editable by default', () => {
      render(<ContentfulRichTextEditor />);
      
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          editable: true,
        })
      );
    });

    it('sets editor as not editable in readonly mode', () => {
      render(<ContentfulRichTextEditor readonly />);
      
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          editable: false,
        })
      );
    });

    it('sets correct editor props', () => {
      render(<ContentfulRichTextEditor placeholder="Custom placeholder" theme="minimal" />);
      
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          editorProps: {
            attributes: {
              class: 'contentful-editor-content contentful-editor-content--minimal',
              'data-placeholder': 'Custom placeholder',
            },
          },
        })
      );
    });

    it('sets initial content when provided', () => {
      const initialValue = { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] };
      const mockTiptapContent = { type: 'doc', content: [] };
      
      mockContentfulTransform.contentfulToTiptap.mockReturnValue(mockTiptapContent);
      
      render(<ContentfulRichTextEditor initialValue={initialValue} />);
      
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          content: mockTiptapContent,
        })
      );
    });

    it('sets empty content when no initial value', () => {
      render(<ContentfulRichTextEditor />);
      
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          content: '',
        })
      );
    });
  });

  describe('Change Handling', () => {
    it('calls onChange when editor content changes', () => {
      const onChange = jest.fn();
      const mockGetJSON = jest.fn(() => ({ type: 'doc', content: [] }));
      const mockEditorWithUpdate = {
        ...mockEditor,
        getJSON: mockGetJSON,
      };
      
      let onUpdateCallback: any;
      mockUseEditor.mockImplementation((config) => {
        onUpdateCallback = config.onUpdate;
        return mockEditorWithUpdate;
      });

      render(<ContentfulRichTextEditor onChange={onChange} />);
      
      // Simulate editor update
      onUpdateCallback({ editor: mockEditorWithUpdate });
      
      expect(mockGetJSON).toHaveBeenCalled();
      expect(mockContentfulTransform.tiptapToContentful).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });

    it('handles onChange error gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const onChange = jest.fn();
      
      mockContentfulTransform.tiptapToContentful.mockImplementation(() => {
        throw new Error('Transform error');
      });

      let onUpdateCallback: any;
      mockUseEditor.mockImplementation((config) => {
        onUpdateCallback = config.onUpdate;
        return mockEditor;
      });

      render(<ContentfulRichTextEditor onChange={onChange} />);
      
      // Simulate editor update
      onUpdateCallback({ editor: mockEditor });
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error converting Tiptap content to Contentful format:',
        expect.any(Error)
      );
      expect(onChange).not.toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });

    it('does not call onChange when no onChange prop provided', () => {
      let onUpdateCallback: any;
      mockUseEditor.mockImplementation((config) => {
        onUpdateCallback = config.onUpdate;
        return mockEditor;
      });

      render(<ContentfulRichTextEditor />);
      
      // Simulate editor update
      expect(() => onUpdateCallback({ editor: mockEditor })).not.toThrow();
      expect(mockContentfulTransform.tiptapToContentful).not.toHaveBeenCalled();
    });
  });

  describe('Initial Value Updates', () => {
    it('updates editor content when initialValue changes', () => {
      const initialValue1 = { nodeType: BLOCKS.DOCUMENT as typeof BLOCKS.DOCUMENT, data: {}, content: [] };
      const initialValue2 = { nodeType: BLOCKS.DOCUMENT as typeof BLOCKS.DOCUMENT, data: {}, content: [
        { nodeType: BLOCKS.PARAGRAPH, data: {}, content: [] }
      ] as import('@contentful/rich-text-types').TopLevelBlock[] };

      const setContent = jest.fn();
      mockEditor.commands.setContent = setContent;

      const { rerender } = render(
        <ContentfulRichTextEditor initialValue={initialValue1} />
      );

      rerender(<ContentfulRichTextEditor initialValue={initialValue2} />);

      expect(mockContentfulTransform.contentfulToTiptap).toHaveBeenCalledWith(initialValue2);
      expect(setContent).toHaveBeenCalledWith(
        expect.any(Object), // The converted tiptap content
        false
      );
    });

    it('does not update when editor is not available', () => {
      const initialValue = { nodeType: BLOCKS.DOCUMENT as typeof BLOCKS.DOCUMENT, data: {}, content: [] };
      
      mockUseEditor.mockReturnValue(null);
      
      const { rerender } = render(<ContentfulRichTextEditor />);
      
      rerender(<ContentfulRichTextEditor initialValue={initialValue} />);
      
      expect(mockContentfulTransform.contentfulToTiptap).not.toHaveBeenCalled();
    });
  });

  describe('Embed Handlers', () => {
    beforeEach(() => {
      const insertContent = jest.fn(() => ({ run: jest.fn() }));
      const focus = jest.fn(() => ({ insertContent }));
      const chain = jest.fn(() => ({ focus }));
      
      mockEditor.chain = chain;
    });

    it('handles embed entry success', async () => {
      const mockEntry = {
        sys: { id: 'entry-123', type: 'Entry' },
        fields: { title: 'Test Entry' }
      };
      const onEmbedEntry = jest.fn().mockResolvedValue(mockEntry);

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });
    });

    it('handles embed entry with sys.id fallback', async () => {
      const mockEntry = {
        sys: { id: 'entry-456' }
      };
      const onEmbedEntry = jest.fn().mockResolvedValue(mockEntry);

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });
    });

    it('handles embed entry with fields.title fallback', async () => {
      const mockEntry = {
        fields: { title: 'Entry Title' }
      };
      const onEmbedEntry = jest.fn().mockResolvedValue(mockEntry);

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });
    });

    it('handles embed entry with Unknown fallback', async () => {
      const mockEntry = {};
      const onEmbedEntry = jest.fn().mockResolvedValue(mockEntry);

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });
    });

    it('handles embed entry error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const onEmbedEntry = jest.fn().mockRejectedValue(new Error('Embed error'));

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error embedding entry:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });

    it('handles embed entry returning null', async () => {
      const onEmbedEntry = jest.fn().mockResolvedValue(null);

      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);

      await user.click(screen.getByText('📄 Entry'));

      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });

      // Should not call insertContent when entry is null
      expect(mockEditor.chain().focus().insertContent).not.toHaveBeenCalled();
    });

    it('handles embed asset success', async () => {
      const mockAsset = {
        sys: { id: 'asset-456', type: 'Asset' },
        fields: { title: 'Test Image' }
      };
      const onEmbedAsset = jest.fn().mockResolvedValue(mockAsset);

      render(<ContentfulRichTextEditor onEmbedAsset={onEmbedAsset} />);

      await user.click(screen.getByText('🖼️ Media'));

      await waitFor(() => {
        expect(onEmbedAsset).toHaveBeenCalled();
      });
    });

    it('handles embed asset error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const onEmbedAsset = jest.fn().mockRejectedValue(new Error('Asset error'));

      render(<ContentfulRichTextEditor onEmbedAsset={onEmbedAsset} />);

      await user.click(screen.getByText('🖼️ Media'));

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error embedding asset:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });

    it('handles embed inline entry success', async () => {
      const mockEntry = {
        sys: { id: 'inline-789' },
        fields: { title: 'Inline Entry' }
      };
      const onEmbedInlineEntry = jest.fn().mockResolvedValue(mockEntry);

      render(<ContentfulRichTextEditor onEmbedInlineEntry={onEmbedInlineEntry} />);

      await user.click(screen.getByText('📝 Inline Entry'));

      await waitFor(() => {
        expect(onEmbedInlineEntry).toHaveBeenCalled();
      });
    });

    it('handles embed inline entry error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const onEmbedInlineEntry = jest.fn().mockRejectedValue(new Error('Inline error'));

      render(<ContentfulRichTextEditor onEmbedInlineEntry={onEmbedInlineEntry} />);

      await user.click(screen.getByText('📝 Inline Entry'));

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error embedding inline entry:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });

    it('does not call embed handlers when features are disabled', () => {
      const onEmbedEntry = jest.fn();
      
      render(
        <ContentfulRichTextEditor 
          onEmbedEntry={onEmbedEntry}
          disabledFeatures={['embed']}
        />
      );

      expect(screen.queryByText('📄 Entry')).not.toBeInTheDocument();
    });

    it('does not call embed handlers when editor config disallows them', () => {
      const mockParseConfig = require('@/utils/configParser').parseContentfulFieldConfig;
      mockParseConfig.mockReturnValue({
        availableHeadings: [1, 2, 3, 4, 5, 6],
        availableMarks: ['bold', 'italic', 'underline'],
        disabledFeatures: [],
        allowHyperlinks: true,
        allowEmbeddedEntries: false,
        allowEmbeddedAssets: false,
        allowInlineEntries: false,
        allowTables: true,
        allowQuotes: true,
        allowLists: true,
      });

      const onEmbedEntry = jest.fn();
      
      render(
        <ContentfulRichTextEditor 
          onEmbedEntry={onEmbedEntry}
          fieldConfiguration={{}}
        />
      );

      expect(screen.queryByText('📄 Entry')).not.toBeInTheDocument();
    });

    it('does not render embed buttons when no handlers provided', () => {
      render(<ContentfulRichTextEditor />);

      expect(screen.queryByText('📄 Entry')).not.toBeInTheDocument();
      expect(screen.queryByText('🖼️ Media')).not.toBeInTheDocument();
      expect(screen.queryByText('📝 Inline Entry')).not.toBeInTheDocument();
    });
  });

  describe('Toolbar Configuration', () => {
    it('passes correct props to toolbar', () => {
      render(
        <ContentfulRichTextEditor
          availableHeadings={[1, 2]}
          availableMarks={['bold']}
          disabledFeatures={['italic']}
        />
      );

      expect(screen.getByTestId('available-headings')).toHaveTextContent('[1,2]');
      expect(screen.getByTestId('available-marks')).toHaveTextContent('["bold"]');
      expect(screen.getByTestId('disabled-features')).toHaveTextContent('["italic","underline"]');
      expect(screen.getByTestId('allow-hyperlinks')).toHaveTextContent('true');
    });

    it('passes embed handlers to toolbar when available', () => {
      const onEmbedEntry = jest.fn();
      const onEmbedAsset = jest.fn();
      const onEmbedInlineEntry = jest.fn();

      render(
        <ContentfulRichTextEditor
          onEmbedEntry={onEmbedEntry}
          onEmbedAsset={onEmbedAsset}
          onEmbedInlineEntry={onEmbedInlineEntry}
        />
      );

      expect(screen.getByText('📄 Entry')).toBeInTheDocument();
      expect(screen.getByText('🖼️ Media')).toBeInTheDocument();
      expect(screen.getByText('📝 Inline Entry')).toBeInTheDocument();
    });

    it('does not pass disabled embed handlers to toolbar', () => {
      const onEmbedEntry = jest.fn();

      render(
        <ContentfulRichTextEditor
          onEmbedEntry={onEmbedEntry}
          disabledFeatures={['embed']}
        />
      );

      expect(screen.queryByText('📄 Entry')).not.toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('applies correct base classes', () => {
      render(<ContentfulRichTextEditor />);
      
      const editor = document.querySelector('.contentful-editor');
      expect(editor).toHaveClass('contentful-editor');
      expect(editor).toHaveClass('contentful-editor--contentful');
    });

    it('applies borderless class when showBorder is false', () => {
      render(<ContentfulRichTextEditor showBorder={false} />);
      
      const editor = document.querySelector('.contentful-editor');
      expect(editor).toHaveClass('contentful-editor--borderless');
    });

    it('applies custom className', () => {
      render(<ContentfulRichTextEditor className="custom-class" />);
      
      const editor = document.querySelector('.contentful-editor');
      expect(editor).toHaveClass('custom-class');
    });

    it('applies loading class when editor is not ready', () => {
      mockUseEditor.mockReturnValue(null);
      
      render(<ContentfulRichTextEditor className="custom-class" />);
      
      const editor = document.querySelector('.contentful-editor');
      expect(editor).toHaveClass('contentful-editor--loading');
      expect(editor).toHaveClass('custom-class');
    });

    it('filters out empty class names', () => {
      render(
        <ContentfulRichTextEditor 
          theme="minimal" 
          showBorder={true}
          className=""
        />
      );
      
      const editor = document.querySelector('.contentful-editor');
      expect(editor?.className).not.toContain('undefined');
      expect(editor?.className).not.toContain('null');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing editor gracefully in embed handlers', async () => {
      const onEmbedEntry = jest.fn().mockResolvedValue({ sys: { id: 'test' } });
      
      // Start with editor available
      render(<ContentfulRichTextEditor onEmbedEntry={onEmbedEntry} />);
      
      // Then make editor unavailable
      mockUseEditor.mockReturnValue(null);
      
      await user.click(screen.getByText('📄 Entry'));
      
      // Should not throw error
      await waitFor(() => {
        expect(onEmbedEntry).toHaveBeenCalled();
      });
    });

    it('handles empty extensions array', () => {
      render(
        <ContentfulRichTextEditor 
          availableMarks={[]}
          disabledFeatures={['link', 'table', 'lists', 'quote']}
          availableHeadings={[]}
        />
      );

      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          extensions: expect.any(Array),
        })
      );
    });

    it('handles all disabled features', () => {
      render(
        <ContentfulRichTextEditor 
          availableMarks={[]}
          availableHeadings={[]}
          disabledFeatures={['bold', 'italic', 'underline', 'link', 'lists', 'headings', 'quote', 'table', 'embed']}
        />
      );

      const disabledFeatures = screen.getByTestId('disabled-features');
      const parsed = JSON.parse(disabledFeatures.textContent || '[]');
      
      expect(parsed).toContain('bold');
      expect(parsed).toContain('italic');
      expect(parsed).toContain('underline');
      expect(parsed).toContain('link');
      expect(parsed).toContain('lists');
      expect(parsed).toContain('headings');
      expect(parsed).toContain('quote');
      expect(parsed).toContain('table');
      expect(parsed).toContain('embed');
    });
  });
});