import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentfulRichTextEditor } from '@components/ContentfulEditor';
import '@testing-library/jest-dom';
import { BLOCKS } from '@contentful/rich-text-types';

jest.mock('@tiptap/react', () => ({
  useEditor: () => ({
    getJSON: () => ({}),
    commands: { setContent: jest.fn() },
    chain: () => ({
      focus: () => ({
        insertContent: () => ({ run: jest.fn() }),
      }),
    }),
    options: {
      editorProps: {
        attributes: {
          'data-placeholder': 'Type here...',
        },
      },
    },
  }),
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
  ContentfulToolbar: () => <div data-testid="toolbar" />,
}));

describe('ContentfulRichTextEditor optional props', () => {
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

  it('renders readonly mode', () => {
    render(<ContentfulRichTextEditor readonly />);
    expect(screen.queryByTestId('toolbar')).not.toBeInTheDocument();
  });

  it('renders with custom availableHeadings', () => {
    render(<ContentfulRichTextEditor availableHeadings={[2, 3]} />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });

  it('renders with custom availableMarks', () => {
    render(<ContentfulRichTextEditor availableMarks={['bold']} />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });

  it('renders with custom disabledFeatures', () => {
    render(<ContentfulRichTextEditor disabledFeatures={['bold', 'italic']} />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });

  it('renders with custom fieldConfiguration', () => {
    render(<ContentfulRichTextEditor fieldConfiguration={{}} />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });

  it('renders with initialValue', () => {
    render(
      <ContentfulRichTextEditor
        initialValue={{ nodeType: BLOCKS.DOCUMENT, data: {}, content: [] }}
      />
    );
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });
});