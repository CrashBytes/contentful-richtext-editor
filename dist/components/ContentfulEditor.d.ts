import React from 'react';
import { Document } from '@contentful/rich-text-types';
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
export declare const ContentfulRichTextEditor: React.FC<ContentfulRichTextEditorProps>;
export default ContentfulRichTextEditor;
