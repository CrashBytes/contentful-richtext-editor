import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { ContentfulToolbar } from './Toolbar';
import { contentfulToTiptap, tiptapToContentful } from '../utils/contentfulTransform';
import { Document } from '@contentful/rich-text-types';

export interface ContentfulEditorProps {
  /** Initial Contentful rich text document */
  initialValue?: Document;
  /** Callback when content changes */
  onChange?: (document: Document) => void;
  /** Callback for handling embedded entries */
  onEmbedEntry?: () => void;
  /** Callback for handling embedded assets */
  onEmbedAsset?: () => void;
  /** Custom CSS classes */
  className?: string;
  /** Whether the editor is read-only */
  readonly?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

export const ContentfulEditor: React.FC<ContentfulEditorProps> = ({
  initialValue,
  onChange,
  onEmbedEntry,
  onEmbedAsset,
  className = '',
  readonly = false,
  placeholder = 'Start writing...'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'contentful-link',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialValue ? contentfulToTiptap(initialValue) : '',
    editable: !readonly,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const contentfulDoc = tiptapToContentful(editor.getJSON());
        onChange(contentfulDoc);
      }
    },
  });

  const handleEmbedEntry = useCallback(() => {
    if (onEmbedEntry) {
      onEmbedEntry();
    }
  }, [onEmbedEntry]);

  const handleEmbedAsset = useCallback(() => {
    if (onEmbedAsset) {
      onEmbedAsset();
    }
  }, [onEmbedAsset]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`contentful-editor ${className}`}>
      <ContentfulToolbar
        editor={editor}
        onEmbedEntry={handleEmbedEntry}
        onEmbedAsset={handleEmbedAsset}
      />
      <EditorContent
        editor={editor}
        className="contentful-editor-content"
      />
    </div>
  );
};