import React from 'react';
import { Document } from '@contentful/rich-text-types';
import type { ContentfulFieldConfiguration } from '../utils/configParser';
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
    /** Callback for handling inline entries */
    onEmbedInlineEntry?: () => Promise<any> | void;
    /** Custom CSS classes */
    className?: string;
    /** Whether the editor is read-only */
    readonly?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Contentful field configuration - takes precedence over manual settings */
    fieldConfiguration?: ContentfulFieldConfiguration;
    /** Manual disable features (fallback if no fieldConfiguration provided) */
    disabledFeatures?: Array<'bold' | 'italic' | 'underline' | 'link' | 'lists' | 'headings' | 'quote' | 'table' | 'embed'>;
    /** Custom styling options */
    theme?: 'default' | 'minimal' | 'contentful';
    /** Manual heading levels (fallback if no fieldConfiguration provided) */
    availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    /** Manual text marks (fallback if no fieldConfiguration provided) */
    availableMarks?: Array<'bold' | 'italic' | 'underline'>;
}
export declare const ContentfulRichTextEditor: React.FC<ContentfulRichTextEditorProps>;
export default ContentfulRichTextEditor;
