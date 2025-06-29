import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Underline from '@tiptap/extension-underline';
import { Document } from '@contentful/rich-text-types';
import { ContentfulToolbar } from './Toolbar';
import { contentfulToTiptap, tiptapToContentful } from '../utils/contentfulTransform';
import '../styles/editor.css';

export interface ContentfulRichTextEditorProps {
  /** Initial Contentful rich text document */
  initialValue?: Document;
  /** Callback when content changes - returns Contentful Document */
  onChange?: (document: Document) => void;
  /** Callback for handling embedded entries */
  onEmbedEntry?: () => Promise<any> | void;
  /** Callback for handling embedded assets */
  onEmbedAsset?: () => Promise<any> | void;
  /** Custom CSS classes */
  className?: string;
  /** Whether the editor is read-only */
  readonly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Disable specific toolbar features */
  disabledFeatures?: Array<'bold' | 'italic' | 'underline' | 'link' | 'lists' | 'headings' | 'quote' | 'table' | 'embed'>;
  /** Custom styling options */
  theme?: 'default' | 'minimal' | 'contentful';
  /** Which heading levels to make available (1-6) */
  availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  /** Which text formatting marks to make available */
  availableMarks?: Array<'bold' | 'italic' | 'underline'>;
}

export const ContentfulRichTextEditor: React.FC<ContentfulRichTextEditorProps> = ({
  initialValue,
  onChange,
  onEmbedEntry,
  onEmbedAsset,
  className = '',
  readonly = false,
  placeholder = 'Start writing...',
  disabledFeatures = [],
  theme = 'contentful',
  availableHeadings = [1, 2, 3, 4, 5, 6],
  availableMarks = ['bold', 'italic', 'underline']
}) => {
  // Build extensions array based on available features
  const extensions = [];

  // Add StarterKit with configuration
  extensions.push(
    StarterKit.configure({
      heading: {
        levels: availableHeadings,
      },
      bold: availableMarks.includes('bold') ? {} : false,
      italic: availableMarks.includes('italic') ? {} : false,
      bulletList: {
        HTMLAttributes: {
          class: 'contentful-bullet-list',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'contentful-ordered-list',
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: 'contentful-blockquote',
        },
      },
    })
  );

  // Always add underline extension to schema to support content with underline marks
  // The availableMarks prop only controls toolbar visibility, not schema support
  extensions.push(Underline);

  // Add other extensions
  extensions.push(
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'contentful-link',
        rel: 'noopener noreferrer',
      },
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'contentful-table',
      },
    }),
    TableRow.configure({
      HTMLAttributes: {
        class: 'contentful-table-row',
      },
    }),
    TableHeader.configure({
      HTMLAttributes: {
        class: 'contentful-table-header',
      },
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: 'contentful-table-cell',
      },
    })
  );

  const editor = useEditor({
    extensions,
    content: initialValue ? contentfulToTiptap(initialValue) : '',
    editable: !readonly,
    editorProps: {
      attributes: {
        class: `contentful-editor-content contentful-editor-content--${theme}`,
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        try {
          const contentfulDoc = tiptapToContentful(editor.getJSON());
          onChange(contentfulDoc);
        } catch (error) {
          console.error('Error converting Tiptap content to Contentful format:', error);
        }
      }
    },
  });

  // Update editor content when initialValue changes
  useEffect(() => {
    if (editor && initialValue) {
      const tiptapContent = contentfulToTiptap(initialValue);
      editor.commands.setContent(tiptapContent, false);
    }
  }, [editor, initialValue]);

  const handleEmbedEntry = useCallback(async () => {
    if (onEmbedEntry && editor) {
      try {
        const entry = await onEmbedEntry();
        if (entry) {
          // Insert embedded entry at cursor position
          editor.chain().focus().insertContent({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `[Embedded Entry: ${entry.sys?.id || 'Unknown'}]`,
                marks: [{ type: 'bold' }],
              },
            ],
          }).run();
        }
      } catch (error) {
        console.error('Error embedding entry:', error);
      }
    }
  }, [onEmbedEntry, editor]);

  const handleEmbedAsset = useCallback(async () => {
    if (onEmbedAsset && editor) {
      try {
        const asset = await onEmbedAsset();
        if (asset) {
          // Insert embedded asset at cursor position
          editor.chain().focus().insertContent({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `[Embedded Asset: ${asset.sys?.id || 'Unknown'}]`,
                marks: [{ type: 'bold' }],
              },
            ],
          }).run();
        }
      } catch (error) {
        console.error('Error embedding asset:', error);
      }
    }
  }, [onEmbedAsset, editor]);

  if (!editor) {
    return (
      <div className={`contentful-editor contentful-editor--loading ${className}`}>
        <div className="contentful-editor__loading">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={`contentful-editor contentful-editor--${theme} ${className}`}>
      {!readonly && (
        <ContentfulToolbar
          editor={editor}
          onEmbedEntry={handleEmbedEntry}
          onEmbedAsset={handleEmbedAsset}
          disabledFeatures={disabledFeatures}
          availableHeadings={availableHeadings}
          availableMarks={availableMarks}
        />
      )}
      <div className="contentful-editor__content-wrapper">
        <EditorContent
          editor={editor}
          className="contentful-editor__content"
        />
      </div>
    </div>
  );
};

export default ContentfulRichTextEditor;