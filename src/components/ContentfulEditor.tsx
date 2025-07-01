import React, { useCallback, useEffect, useMemo } from 'react';
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
import { parseContentfulFieldConfig } from '../utils/configParser';
import type { ContentfulFieldConfiguration } from '../utils/configParser';
import '../styles/editor.css';

export interface ContentfulRichTextEditorProps {
  initialValue?: Document;
  onChange?: (document: Document) => void;
  onEmbedEntry?: () => Promise<any> | void;
  onEmbedAsset?: () => Promise<any> | void;
  onEmbedInlineEntry?: () => Promise<any> | void;
  className?: string;
  readonly?: boolean;
  placeholder?: string;
  fieldConfiguration?: ContentfulFieldConfiguration;
  disabledFeatures?: Array<'bold' | 'italic' | 'underline' | 'link' | 'lists' | 'headings' | 'quote' | 'table' | 'embed'>;
  theme?: 'default' | 'minimal' | 'contentful';
  availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  availableMarks?: Array<'bold' | 'italic' | 'underline'>;
  showBorder?: boolean;
}

export const ContentfulRichTextEditor: React.FC<ContentfulRichTextEditorProps> = ({
  initialValue,
  onChange,
  onEmbedEntry,
  onEmbedAsset,
  onEmbedInlineEntry,
  className = '',
  readonly = false,
  placeholder = 'Start writing...',
  fieldConfiguration,
  disabledFeatures = [],
  theme = 'contentful',
  availableHeadings = [1, 2, 3, 4, 5, 6],
  availableMarks = ['bold', 'italic', 'underline'],
  showBorder = true
}) => {
  const editorConfig = useMemo(() => {
    if (fieldConfiguration) {
      return parseContentfulFieldConfig(fieldConfiguration);
    }
    const disabled: string[] = [];
    if (!availableMarks.includes('bold')) disabled.push('bold');
    if (!availableMarks.includes('italic')) disabled.push('italic');
    if (!availableMarks.includes('underline')) disabled.push('underline');
    disabled.push(...disabledFeatures);

    return {
      availableHeadings,
      availableMarks,
      disabledFeatures: disabled,
      allowHyperlinks: !disabledFeatures.includes('link'),
      allowEmbeddedEntries: !disabledFeatures.includes('embed'),
      allowEmbeddedAssets: !disabledFeatures.includes('embed'),
      allowInlineEntries: !disabledFeatures.includes('embed'),
      allowTables: !disabledFeatures.includes('table'),
      allowQuotes: !disabledFeatures.includes('quote'),
      allowLists: !disabledFeatures.includes('lists'),
    };
  }, [fieldConfiguration, disabledFeatures, availableHeadings, availableMarks]);

  const extensions = useMemo(() => {
    const exts = [];
    exts.push(
      StarterKit.configure({
        heading: editorConfig.availableHeadings.length > 0 ? {
          levels: editorConfig.availableHeadings,
        } : false,
        bold: editorConfig.availableMarks.includes('bold') ? {} : false,
        italic: editorConfig.availableMarks.includes('italic') ? {} : false,
        bulletList: editorConfig.allowLists ? {
          HTMLAttributes: {
            class: 'contentful-bullet-list',
          },
        } : false,
        orderedList: editorConfig.allowLists ? {
          HTMLAttributes: {
            class: 'contentful-ordered-list',
          },
        } : false,
        blockquote: editorConfig.allowQuotes ? {
          HTMLAttributes: {
            class: 'contentful-blockquote',
          },
        } : false,
      })
    );
    if (editorConfig.availableMarks.includes('underline')) {
      exts.push(Underline);
    }
    if (editorConfig.allowHyperlinks) {
      exts.push(
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'contentful-link',
            rel: 'noopener noreferrer',
          },
        })
      );
    }
    if (editorConfig.allowTables) {
      exts.push(
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
    }
    return exts;
  }, [editorConfig]);

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

  useEffect(() => {
    if (editor && initialValue) {
      const tiptapContent = contentfulToTiptap(initialValue);
      editor.commands.setContent(tiptapContent, false);
    }
  }, [editor, initialValue]);

  const handleEmbedEntry = useCallback(async () => {
    if (onEmbedEntry && editor && editorConfig.allowEmbeddedEntries) {
      try {
        const entry = await onEmbedEntry();
        if (entry) {
          editor.chain().focus().insertContent({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `[Embedded Entry: ${entry.sys?.id || entry.fields?.title || 'Unknown'}]`,
                marks: [{ type: 'bold' }],
              },
            ],
          }).run();
        }
      } catch (error) {
        console.error('Error embedding entry:', error);
      }
    }
  }, [onEmbedEntry, editor, editorConfig.allowEmbeddedEntries]);

  const handleEmbedAsset = useCallback(async () => {
    if (onEmbedAsset && editor && editorConfig.allowEmbeddedAssets) {
      try {
        const asset = await onEmbedAsset();
        if (asset) {
          editor.chain().focus().insertContent({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `[Embedded Asset: ${asset.sys?.id || asset.fields?.title || 'Unknown'}]`,
                marks: [{ type: 'bold' }],
              },
            ],
          }).run();
        }
      } catch (error) {
        console.error('Error embedding asset:', error);
      }
    }
  }, [onEmbedAsset, editor, editorConfig.allowEmbeddedAssets]);

  const handleEmbedInlineEntry = useCallback(async () => {
    if (onEmbedInlineEntry && editor && editorConfig.allowInlineEntries) {
      try {
        const entry = await onEmbedInlineEntry();
        if (entry) {
          editor.chain().focus().insertContent({
            type: 'text',
            text: `[Inline Entry: ${entry.sys?.id || entry.fields?.title || 'Unknown'}]`,
            marks: [{ type: 'bold' }],
          }).run();
        }
      } catch (error) {
        console.error('Error embedding inline entry:', error);
      }
    }
  }, [onEmbedInlineEntry, editor, editorConfig.allowInlineEntries]);

  const editorClass = [
    'contentful-editor',
    `contentful-editor--${theme}`,
    !showBorder ? 'contentful-editor--borderless' : '',
    className,
  ].filter(Boolean).join(' ');

  if (!editor) {
    return (
      <div className={`contentful-editor contentful-editor--loading ${className}`}>
        <div className="contentful-editor__loading">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={editorClass}>
      {!readonly && (
        <ContentfulToolbar
          editor={editor}
          onEmbedEntry={editorConfig.allowEmbeddedEntries ? handleEmbedEntry : undefined}
          onEmbedAsset={editorConfig.allowEmbeddedAssets ? handleEmbedAsset : undefined}
          onEmbedInlineEntry={editorConfig.allowInlineEntries ? handleEmbedInlineEntry : undefined}
          disabledFeatures={editorConfig.disabledFeatures}
          availableHeadings={editorConfig.availableHeadings}
          availableMarks={editorConfig.availableMarks}
          allowHyperlinks={editorConfig.allowHyperlinks}
        />
      )}
      <div className="contentful-editor__content-wrapper">
        <EditorContent
          editor={editor}
          className="contentful-editor__content"
          data-testid="editor-content"
        />
      </div>
    </div>
  );
};

export default ContentfulRichTextEditor;