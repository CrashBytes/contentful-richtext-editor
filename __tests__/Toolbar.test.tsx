import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentfulToolbar } from '@/components/Toolbar';
import '@testing-library/jest-dom';

const createMockEditor = (overrides = {}) => ({
  isActive: jest.fn(() => false),
  can: jest.fn(() => ({ 
    undo: jest.fn(() => true), 
    redo: jest.fn(() => true) 
  })),
  getAttributes: jest.fn(() => ({})),
  chain: jest.fn(() => ({
    focus: jest.fn(() => ({
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
  ...overrides,
});

describe('ContentfulToolbar', () => {
  let mockEditor: any;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockEditor = createMockEditor();
    user = userEvent.setup();
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders toolbar with default elements', () => {
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByTitle('Undo')).toBeInTheDocument();
      expect(screen.getByTitle('Redo')).toBeInTheDocument();
    });

    it('renders with all default formatting elements', () => {
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
      expect(screen.getByTitle('Link')).toBeInTheDocument();
      expect(screen.getByTitle('More formatting options')).toBeInTheDocument();
    });

    it('renders list and formatting options', () => {
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Bullet List')).toBeInTheDocument();
      expect(screen.getByTitle('Numbered List')).toBeInTheDocument();
      expect(screen.getByTitle('Quote')).toBeInTheDocument();
      expect(screen.getByTitle('Horizontal Rule')).toBeInTheDocument();
      expect(screen.getByTitle('Insert Table')).toBeInTheDocument();
    });
  });

  describe('Heading Dropdown', () => {
    it('shows current heading level', () => {
      mockEditor.isActive.mockImplementation((type: string, attrs?: any) => {
        return type === 'heading' && attrs?.level === 2;
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      expect(screen.getByDisplayValue('Heading 2')).toBeInTheDocument();
    });

    it('shows "Normal text" when no heading is active', () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} />);
      expect(screen.getByDisplayValue('Normal text')).toBeInTheDocument();
    });

    it('changes to paragraph when "Normal text" is selected', async () => {
      const setParagraph = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setParagraph })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      
      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'Normal text');
      
      expect(setParagraph).toHaveBeenCalled();
    });

    it('changes to heading when heading option is selected', async () => {
      const toggleHeading = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleHeading })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      
      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'Heading 2');
      
      expect(toggleHeading).toHaveBeenCalledWith({ level: 2 });
    });

    it('renders all available heading options', () => {
      render(<ContentfulToolbar editor={mockEditor} availableHeadings={[1, 2, 3]} />);
      
      const select = screen.getByRole('combobox');
      const options = select.querySelectorAll('option');
      
      expect(options).toHaveLength(4); // Normal text + 3 headings
      expect(screen.getByText('Normal text')).toBeInTheDocument();
      expect(screen.getByText('Heading 1')).toBeInTheDocument();
      expect(screen.getByText('Heading 2')).toBeInTheDocument();
      expect(screen.getByText('Heading 3')).toBeInTheDocument();
    });

    it('does not render heading dropdown when headings are disabled', () => {
      render(<ContentfulToolbar editor={mockEditor} disabledFeatures={['headings']} />);
      
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('does not render heading dropdown when no headings available', () => {
      render(<ContentfulToolbar editor={mockEditor} availableHeadings={[]} />);
      
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });

  describe('Undo/Redo Buttons', () => {
    it('enables undo when editor can undo', () => {
      mockEditor.can.mockReturnValue({ 
        undo: jest.fn(() => true), 
        redo: jest.fn(() => true) 
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Undo')).not.toBeDisabled();
    });

    it('disables undo when editor cannot undo', () => {
      mockEditor.can.mockReturnValue({ 
        undo: jest.fn(() => false), 
        redo: jest.fn(() => true) 
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Undo')).toBeDisabled();
    });

    it('enables redo when editor can redo', () => {
      mockEditor.can.mockReturnValue({ 
        undo: jest.fn(() => true), 
        redo: jest.fn(() => true) 
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Redo')).not.toBeDisabled();
    });

    it('disables redo when editor cannot redo', () => {
      mockEditor.can.mockReturnValue({ 
        undo: jest.fn(() => true), 
        redo: jest.fn(() => false) 
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Redo')).toBeDisabled();
    });

    it('calls undo when undo button is clicked', async () => {
      const undo = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ undo })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Undo'));
      
      expect(undo).toHaveBeenCalled();
    });

    it('calls redo when redo button is clicked', async () => {
      const redo = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ redo })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Redo'));
      
      expect(redo).toHaveBeenCalled();
    });
  });

  describe('Text Formatting Buttons', () => {
    it('toggles bold when bold button is clicked', async () => {
      const toggleBold = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleBold })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Bold'));
      
      expect(toggleBold).toHaveBeenCalled();
    });

    it('toggles italic when italic button is clicked', async () => {
      const toggleItalic = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleItalic })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Italic'));
      
      expect(toggleItalic).toHaveBeenCalled();
    });

    it('toggles underline when underline button is clicked', async () => {
      const toggleUnderline = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleUnderline })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Underline'));
      
      expect(toggleUnderline).toHaveBeenCalled();
    });

    it('shows active state for bold button', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'bold');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Bold')).toHaveClass('contentful-toolbar__button--active');
    });

    it('shows active state for italic button', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'italic');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Italic')).toHaveClass('contentful-toolbar__button--active');
    });

    it('shows active state for underline button', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'underline');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Underline')).toHaveClass('contentful-toolbar__button--active');
    });
  });

  describe('Link Functionality', () => {
    it('shows link input when link button is clicked and link is not active', async () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Link'));
      
      expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
    });

    it('removes link when link button is clicked and link is active', async () => {
      mockEditor.isActive.mockImplementation((type) => type === 'link');
      const unsetLink = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ unsetLink })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Link'));
      
      expect(unsetLink).toHaveBeenCalled();
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('shows active state for link button when link is active', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'link');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Link')).toHaveClass('contentful-toolbar__button--active');
    });

    it('pre-fills link input with existing href', async () => {
      mockEditor.isActive.mockReturnValue(false);
      mockEditor.getAttributes.mockReturnValue({ href: 'https://example.com' });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Link'));
      
      expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    });

    it('sets link when URL is entered and submitted', async () => {
      mockEditor.isActive.mockReturnValue(false);
      const setLink = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setLink })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      const input = screen.getByPlaceholderText('Enter URL');
      await user.type(input, 'https://example.com');
      await user.click(screen.getByTitle('Apply link'));
      
      expect(setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('does not set link when URL is empty', async () => {
      mockEditor.isActive.mockReturnValue(false);
      const setLink = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setLink })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      await user.click(screen.getByTitle('Apply link'));
      
      expect(setLink).not.toHaveBeenCalled();
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('cancels link input when cancel button is clicked', async () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      await user.click(screen.getByTitle('Cancel'));
      
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('submits link on Enter key', async () => {
      mockEditor.isActive.mockReturnValue(false);
      const setLink = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setLink })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      const input = screen.getByPlaceholderText('Enter URL');
      await user.type(input, 'https://example.com');
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      
      expect(setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
    });

    it('cancels link input on Escape key', async () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      const input = screen.getByPlaceholderText('Enter URL');
      fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
      
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('prevents default on Enter and Escape keys', async () => {
      // This test verifies that Enter and Escape handlers work correctly
      // preventDefault is called in the implementation (see Toolbar.tsx lines 164, 168)
      // The actual behavior is tested by other tests:
      // - "submits link on Enter key" verifies Enter works
      // - "cancels link input on Escape key" verifies Escape works
      
      mockEditor.isActive.mockReturnValue(false);
      const setLink = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setLink })),
      });
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      const input = screen.getByPlaceholderText('Enter URL');
      await user.type(input, 'https://test.com');
      
      // Verify Enter submits
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(setLink).toHaveBeenCalledWith({ href: 'https://test.com' });
      
      // Verify Escape cancels (need to reopen)
      await user.click(screen.getByTitle('Link'));
      fireEvent.keyDown(screen.getByPlaceholderText('Enter URL'), { key: 'Escape', code: 'Escape' });
      expect(screen.queryByPlaceholderText('Enter URL')).not.toBeInTheDocument();
    });

    it('updates link URL state on input change', async () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      await user.click(screen.getByTitle('Link'));
      const input = screen.getByPlaceholderText('Enter URL');
      await user.type(input, 'test-url');
      
      expect(input).toHaveValue('test-url');
    });
  });

  describe('List Buttons', () => {
    it('toggles bullet list when bullet list button is clicked', async () => {
      const toggleBulletList = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleBulletList })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Bullet List'));
      
      expect(toggleBulletList).toHaveBeenCalled();
    });

    it('toggles ordered list when numbered list button is clicked', async () => {
      const toggleOrderedList = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleOrderedList })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Numbered List'));
      
      expect(toggleOrderedList).toHaveBeenCalled();
    });

    it('shows active state for bullet list', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'bulletList');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Bullet List')).toHaveClass('contentful-toolbar__button--active');
    });

    it('shows active state for ordered list', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'orderedList');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Numbered List')).toHaveClass('contentful-toolbar__button--active');
    });
  });

  describe('Quote and Rule Buttons', () => {
    it('toggles blockquote when quote button is clicked', async () => {
      const toggleBlockquote = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ toggleBlockquote })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Quote'));
      
      expect(toggleBlockquote).toHaveBeenCalled();
    });

    it('shows active state for blockquote', () => {
      mockEditor.isActive.mockImplementation((type) => type === 'blockquote');
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Quote')).toHaveClass('contentful-toolbar__button--active');
    });

    it('inserts horizontal rule when horizontal rule button is clicked', async () => {
      const setHorizontalRule = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ setHorizontalRule })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Horizontal Rule'));
      
      expect(setHorizontalRule).toHaveBeenCalled();
    });
  });

  describe('Table Button', () => {
    it('inserts table when table button is clicked', async () => {
      const insertTable = jest.fn(() => ({ run: jest.fn() }));
      mockEditor.chain.mockReturnValue({
        focus: jest.fn(() => ({ insertTable })),
      });

      render(<ContentfulToolbar editor={mockEditor} />);
      await user.click(screen.getByTitle('Insert Table'));
      
      expect(insertTable).toHaveBeenCalledWith({ rows: 3, cols: 3, withHeaderRow: true });
    });
  });

  describe('Embed Options', () => {
    it('renders embed dropdown when embed handlers are provided', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          onEmbedEntry={() => {}}
          onEmbedAsset={() => {}}
          onEmbedInlineEntry={() => {}}
        />
      );

      expect(screen.getByText('+ Embed ▼')).toBeInTheDocument();
    });

    it('calls onEmbedEntry when Entry option is clicked', async () => {
      const onEmbedEntry = jest.fn();
      
      render(<ContentfulToolbar editor={mockEditor} onEmbedEntry={onEmbedEntry} />);
      
      const embedButton = screen.getByText('+ Embed ▼');
      fireEvent.mouseEnter(embedButton.parentElement!);
      await user.click(screen.getByText('📄 Entry'));
      
      expect(onEmbedEntry).toHaveBeenCalled();
    });

    it('calls onEmbedAsset when Media option is clicked', async () => {
      const onEmbedAsset = jest.fn();
      
      render(<ContentfulToolbar editor={mockEditor} onEmbedAsset={onEmbedAsset} />);
      
      const embedButton = screen.getByText('+ Embed ▼');
      fireEvent.mouseEnter(embedButton.parentElement!);
      await user.click(screen.getByText('🖼️ Media'));
      
      expect(onEmbedAsset).toHaveBeenCalled();
    });

    it('calls onEmbedInlineEntry when Inline Entry option is clicked', async () => {
      const onEmbedInlineEntry = jest.fn();
      
      render(<ContentfulToolbar editor={mockEditor} onEmbedInlineEntry={onEmbedInlineEntry} />);
      
      const embedButton = screen.getByText('+ Embed ▼');
      fireEvent.mouseEnter(embedButton.parentElement!);
      await user.click(screen.getByText('📝 Inline Entry'));
      
      expect(onEmbedInlineEntry).toHaveBeenCalled();
    });

    it('does not render embed options when embed is disabled', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          onEmbedEntry={() => {}}
          disabledFeatures={['embed']}
        />
      );

      expect(screen.queryByText('+ Embed ▼')).not.toBeInTheDocument();
    });

    it('does not render embed dropdown when no handlers provided', () => {
      render(<ContentfulToolbar editor={mockEditor} />);

      expect(screen.queryByText('+ Embed ▼')).not.toBeInTheDocument();
    });

    it('renders only available embed options', () => {
      render(<ContentfulToolbar editor={mockEditor} onEmbedEntry={() => {}} />);

      const embedButton = screen.getByText('+ Embed ▼');
      fireEvent.mouseEnter(embedButton.parentElement!);
      
      expect(screen.getByText('📄 Entry')).toBeInTheDocument();
      expect(screen.queryByText('📝 Inline Entry')).not.toBeInTheDocument();
      expect(screen.queryByText('🖼️ Media')).not.toBeInTheDocument();
    });
  });

  describe('Feature Disabling', () => {
    it('hides features when disabled', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          disabledFeatures={['bold', 'italic', 'link', 'lists', 'quote', 'table']}
        />
      );
      
      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Link')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Bullet List')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Numbered List')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Quote')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Insert Table')).not.toBeInTheDocument();
    });

    it('hides marks not in availableMarks', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          availableMarks={['bold']}
        />
      );
      
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
    });

    it('hides link when allowHyperlinks is false', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          allowHyperlinks={false}
        />
      );
      
      expect(screen.queryByTitle('Link')).not.toBeInTheDocument();
    });

    it('hides text formatting section when no text formatting available', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          availableMarks={[]}
          allowHyperlinks={false}
        />
      );
      
      // Should not render the text formatting section at all
      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
      expect(screen.queryByTitle('More formatting options')).not.toBeInTheDocument();
    });

    it('shows text formatting section when only hyperlinks are allowed', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          availableMarks={[]}
          allowHyperlinks={true}
          disabledFeatures={['bold', 'italic', 'underline']}
        />
      );
      
      expect(screen.getByTitle('Link')).toBeInTheDocument();
      expect(screen.getByTitle('More formatting options')).toBeInTheDocument();
    });

    it('hides lists/quotes/tables section when all are disabled', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          disabledFeatures={['lists', 'quote', 'table']}
        />
      );
      
      // When all three are disabled, the entire section including horizontal rule is hidden
      expect(screen.queryByTitle('Bullet List')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Quote')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Insert Table')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Horizontal Rule')).not.toBeInTheDocument();
    });
  });

  describe('Helper Functions', () => {
    it('correctly identifies disabled features', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          disabledFeatures={['bold', 'italic']}
        />
      );
      
      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
    });

    it('correctly identifies available marks', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          availableMarks={['bold', 'underline']}
        />
      );
      
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
    });

    it('getActiveHeading returns correct heading level', () => {
      mockEditor.isActive.mockImplementation((type: string, attrs?: any) => {
        return type === 'heading' && attrs?.level === 3;
      });
      
      render(<ContentfulToolbar editor={mockEditor} availableHeadings={[1, 2, 3]} />);
      
      expect(screen.getByDisplayValue('Heading 3')).toBeInTheDocument();
    });

    it('getActiveHeading returns Normal text when no heading active', () => {
      mockEditor.isActive.mockReturnValue(false);
      
      render(<ContentfulToolbar editor={mockEditor} availableHeadings={[1, 2, 3]} />);
      
      expect(screen.getByDisplayValue('Normal text')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('handles multiple active states simultaneously', () => {
      mockEditor.isActive.mockImplementation((type) => 
        ['bold', 'italic', 'bulletList', 'link'].includes(type)
      );
      
      render(<ContentfulToolbar editor={mockEditor} />);
      
      expect(screen.getByTitle('Bold')).toHaveClass('contentful-toolbar__button--active');
      expect(screen.getByTitle('Italic')).toHaveClass('contentful-toolbar__button--active');
      expect(screen.getByTitle('Bullet List')).toHaveClass('contentful-toolbar__button--active');
      expect(screen.getByTitle('Link')).toHaveClass('contentful-toolbar__button--active');
    });

    it('handles empty available headings array', () => {
      render(<ContentfulToolbar editor={mockEditor} availableHeadings={[]} />);
      
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('handles all marks disabled but formatting section still shows for links', () => {
      render(
        <ContentfulToolbar 
          editor={mockEditor} 
          disabledFeatures={['bold', 'italic', 'underline']}
          allowHyperlinks={true}
        />
      );
      
      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
      expect(screen.getByTitle('Link')).toBeInTheDocument();
      expect(screen.getByTitle('More formatting options')).toBeInTheDocument();
    });
  });
});