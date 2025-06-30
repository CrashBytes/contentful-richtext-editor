import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentfulToolbar } from '@/components/Toolbar';
import '@testing-library/jest-dom';

const createMockEditor = (overrides = {}) => ({
  isActive: jest.fn(),
  can: jest.fn(() => ({ undo: () => true, redo: () => true })),
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

  it('renders toolbar with all default elements', () => {
    render(<ContentfulToolbar editor={mockEditor} />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTitle('Undo')).toBeInTheDocument();
    expect(screen.getByTitle('Redo')).toBeInTheDocument();
    expect(screen.getByTitle('Bold')).toBeInTheDocument();
    expect(screen.getByTitle('Italic')).toBeInTheDocument();
    expect(screen.getByTitle('Underline')).toBeInTheDocument();
  });

  it('shows current heading level', () => {
    mockEditor.isActive.mockImplementation((type: string, attrs?: any) => {
      return type === 'heading' && attrs?.level === 2;
    });
    
    render(<ContentfulToolbar editor={mockEditor} />);
    expect(screen.getByDisplayValue('Heading 2')).toBeInTheDocument();
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

  it('toggles bold when bold button is clicked', async () => {
    const toggleBold = jest.fn(() => ({ run: jest.fn() }));
    mockEditor.chain.mockReturnValue({
      focus: jest.fn(() => ({ toggleBold })),
    });

    render(<ContentfulToolbar editor={mockEditor} />);
    await user.click(screen.getByTitle('Bold'));
    expect(toggleBold).toHaveBeenCalled();
  });

  it('shows link input when link button is clicked', async () => {
    mockEditor.isActive.mockReturnValue(false);
    
    render(<ContentfulToolbar editor={mockEditor} />);
    await user.click(screen.getByTitle('Link'));
    
    expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
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
    await user.click(screen.getByText('✓'));
    
    expect(setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
  });

  it('inserts table when table button is clicked', async () => {
    const insertTable = jest.fn(() => ({ run: jest.fn() }));
    mockEditor.chain.mockReturnValue({
      focus: jest.fn(() => ({ insertTable })),
    });

    render(<ContentfulToolbar editor={mockEditor} />);
    await user.click(screen.getByTitle('Insert Table'));
    
    expect(insertTable).toHaveBeenCalledWith({ rows: 3, cols: 3, withHeaderRow: true });
  });

  it('calls onEmbedEntry when Entry option is clicked', async () => {
    const onEmbedEntry = jest.fn();
    
    render(<ContentfulToolbar editor={mockEditor} onEmbedEntry={onEmbedEntry} />);
    
    const embedButton = screen.getByText('+ Embed ▼');
    fireEvent.mouseEnter(embedButton.parentElement!);
    // Fixed: Look for the actual text "📄 Entry" instead of just "Entry"
    await user.click(screen.getByText('📄 Entry'));
    
    expect(onEmbedEntry).toHaveBeenCalled();
  });

  it('hides features when disabled', () => {
    render(
      <ContentfulToolbar 
        editor={mockEditor} 
        disabledFeatures={['bold', 'italic', 'link']}
      />
    );
    
    expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Link')).not.toBeInTheDocument();
  });
});