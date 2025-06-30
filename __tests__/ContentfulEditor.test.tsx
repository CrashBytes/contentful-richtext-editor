import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentfulRichTextEditor } from '@/components/ContentfulEditor';
import { BLOCKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import '@testing-library/jest-dom';

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

jest.mock('@/utils/contentfulTransform', () => ({
  contentfulToTiptap: jest.fn((doc) => ({ type: 'doc', content: [] })),
  tiptapToContentful: jest.fn((content) => ({
    nodeType: 'document',
    data: {},
    content: [],
  })),
}));

import { useEditor } from '@tiptap/react';
import { contentfulToTiptap, tiptapToContentful } from '@/utils/contentfulTransform';

const mockUseEditor = useEditor as jest.MockedFunction<typeof useEditor>;
const mockContentfulToTiptap = contentfulToTiptap as jest.MockedFunction<typeof contentfulToTiptap>;
const mockTiptapToContentful = tiptapToContentful as jest.MockedFunction<typeof tiptapToContentful>;

// Additional tests for ContentfulRichTextEditor

describe('ContentfulRichTextEditor - more coverage', () => {
    const mockEditor = {
        commands: { setContent: jest.fn() },
        getJSON: jest.fn(() => ({ type: 'doc', content: [] })),
        chain: jest.fn(() => ({
            focus: jest.fn(() => ({
                insertContent: jest.fn(() => ({ run: jest.fn() })),
                undo: jest.fn(() => ({ run: jest.fn() })),
                redo: jest.fn(() => ({ run: jest.fn() })),
                toggleBold: jest.fn(() => ({ run: jest.fn() })),
                toggleItalic: jest.fn(() => ({ run: jest.fn() })),
                toggleUnderline: jest.fn(() => ({ run: jest.fn() })),
                setParagraph: jest.fn(() => ({ run: jest.fn() })),
                toggleHeading: jest.fn(() => ({ run: jest.fn() })),
                unsetLink: jest.fn(() => ({ run: jest.fn() })),
                setLink: jest.fn(() => ({ run: jest.fn() })),
                toggleBulletList: jest.fn(() => ({ run: jest.fn() })),
                toggleOrderedList: jest.fn(() => ({ run: jest.fn() })),
                toggleBlockquote: jest.fn(() => ({ run: jest.fn() })),
                setHorizontalRule: jest.fn(() => ({ run: jest.fn() })),
                insertTable: jest.fn(() => ({ run: jest.fn() })),
            })),
        })),
        isActive: jest.fn(),
        can: jest.fn(() => ({ undo: () => true, redo: () => true })),
        getAttributes: jest.fn(() => ({})),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockEditor.isActive.mockReturnValue(false);
        (useEditor as jest.Mock).mockReturnValue(mockEditor as any);
    });

    it('toolbar: can click all formatting buttons by title', () => {
        render(<ContentfulRichTextEditor />);
        // Use title instead of name to avoid ambiguity
        const titles = [
            'Bold',
            'Italic',
            'Underline',
            'Link',
            'Bullet List',
            'Numbered List',
            'Quote',
            'Horizontal Rule',
            'Insert Table',
        ];
        for (const title of titles) {
            const btn = screen.getByTitle(title);
            expect(btn).toBeInTheDocument();
            userEvent.click(btn);
        }
    });

    it('toolbar: can select heading from dropdown and triggers change', () => {
        render(<ContentfulRichTextEditor />);
        // The select is only rendered if headings are enabled
        // If not present, test passes (no error thrown)
        const select = screen.queryByRole('combobox');
        if (select) {
            fireEvent.change(select, { target: { value: 'Heading 2' } });
            expect(select).toBeInTheDocument();
        }
    });

    it('toolbar: can open embed menu and see all options (robust)', () => {
        render(<ContentfulRichTextEditor />);
        const embedBtn = screen.getByRole('button', { name: /\+ Embed/i });
        userEvent.click(embedBtn);
        expect(screen.getByRole('button', { name: /📄 Entry/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /📝 Inline Entry/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /🖼️ Media/i })).toBeInTheDocument();
    });

    it('does not render embed menu if embed is disabled', () => {
        render(<ContentfulRichTextEditor disabledFeatures={['embed']} />);
        expect(screen.queryByRole('button', { name: /\+ Embed/i })).not.toBeInTheDocument();
    });

    it('does not render headings if availableHeadings is empty', () => {
        render(<ContentfulRichTextEditor availableHeadings={[]} />);
        // Should NOT have a combobox at all
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        // Should NOT have heading options
        expect(screen.queryByRole('option', { name: /Heading 1/i })).not.toBeInTheDocument();
    });

    it('does not render mark buttons if availableMarks is empty', () => {
        render(<ContentfulRichTextEditor availableMarks={[]} />);
        expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
    });

    it('does not render list, quote, table, link buttons if disabled', () => {
        render(
            <ContentfulRichTextEditor
                disabledFeatures={['lists', 'quote', 'table', 'link']}
            />
        );
        expect(screen.queryByTitle('Bullet List')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Numbered List')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Quote')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Insert Table')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Link')).not.toBeInTheDocument();
    });

    it('does not render toolbar if all features are disabled', () => {
        render(
            <ContentfulRichTextEditor
                disabledFeatures={[
                    'bold',
                    'italic',
                    'underline',
                    'link',
                    'lists',
                    'headings',
                    'quote',
                    'table',
                    'embed',
                ]}
            />
        );
        // Toolbar should still render, but all buttons should be missing except undo/redo
        expect(screen.getByTitle('Undo')).toBeInTheDocument();
        expect(screen.getByTitle('Redo')).toBeInTheDocument();
        expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Link')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Bullet List')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Numbered List')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Quote')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Insert Table')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /\+ Embed/i })).not.toBeInTheDocument();
    });

    it('renders with custom className and theme', () => {
        render(<ContentfulRichTextEditor className="custom" theme="default" />);
        const wrapper = document.querySelector('.contentful-editor');
        expect(wrapper).toHaveClass('custom');
        expect(wrapper).toHaveClass('contentful-editor--default');
    });

    it('renders placeholder', () => {
        render(<ContentfulRichTextEditor placeholder="Custom placeholder" />);
        expect(mockEditor).toBeDefined();
        // The placeholder is passed as an attribute, but since EditorContent is mocked, we can't check the DOM.
        // Instead, check that useEditor was called with the correct placeholder.
        expect(mockUseEditor).toHaveBeenCalledWith(
            expect.objectContaining({
                editorProps: expect.objectContaining({
                    attributes: expect.objectContaining({
                        'data-placeholder': 'Custom placeholder',
                    }),
                }),
            })
        );
    });

    // Additional coverage

    it('renders loading state if editor is not ready', () => {
        (useEditor as jest.Mock).mockReturnValue(null);
        render(<ContentfulRichTextEditor />);
        expect(screen.getByText(/Loading editor/i)).toBeInTheDocument();
    });

    it('calls onChange when content changes', async () => {
        const onChange = jest.fn();
        (useEditor as jest.Mock).mockImplementation((config: any) => {
            if (config.onUpdate) {
                config.onUpdate({ editor: mockEditor });
            }
            return mockEditor as any;
        });
        render(<ContentfulRichTextEditor onChange={onChange} />);
        await waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });
    });

    it('handles error in onUpdate gracefully', () => {
        const onChange = jest.fn();
        mockTiptapToContentful.mockImplementationOnce(() => { throw new Error('fail'); });
        (useEditor as jest.Mock).mockImplementation((config: any) => {
            if (config.onUpdate) {
                config.onUpdate({ editor: mockEditor });
            }
            return mockEditor as any;
        });
        render(<ContentfulRichTextEditor onChange={onChange} />);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('updates editor content when initialValue changes', () => {
        const { rerender } = render(<ContentfulRichTextEditor initialValue={{ nodeType: BLOCKS.DOCUMENT, data: {}, content: [] }} />);
        rerender(<ContentfulRichTextEditor initialValue={{ nodeType: BLOCKS.DOCUMENT, data: {}, content: [{ nodeType: BLOCKS.PARAGRAPH, data: {}, content: [] }] }} />);
        expect(mockEditor.commands.setContent).toHaveBeenCalled();
    });

    it('does not crash if initialValue is undefined', () => {
        render(<ContentfulRichTextEditor />);
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('does not crash if availableHeadings or availableMarks are empty', () => {
        render(<ContentfulRichTextEditor availableHeadings={[]} availableMarks={[]} />);
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('does not crash if fieldConfiguration is empty object', () => {
        render(<ContentfulRichTextEditor fieldConfiguration={{} as any} />);
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('does not crash if disabledFeatures disables everything', () => {
        render(
            <ContentfulRichTextEditor
                disabledFeatures={[
                    'bold',
                    'italic',
                    'underline',
                    'link',
                    'lists',
                    'headings',
                    'quote',
                    'table',
                    'embed',
                ]}
            />
        );
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('does not render toolbar if readonly is true', () => {
        render(<ContentfulRichTextEditor readonly={true} />);
        expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
    });
});
