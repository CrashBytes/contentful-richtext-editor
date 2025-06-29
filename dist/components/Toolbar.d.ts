import React from 'react';
import { Editor } from '@tiptap/react';
interface ToolbarProps {
    editor: Editor;
    onEmbedEntry?: () => void;
    onEmbedAsset?: () => void;
    onEmbedInlineEntry?: () => void;
    disabledFeatures?: Array<string>;
    availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    availableMarks?: Array<'bold' | 'italic' | 'underline'>;
    allowHyperlinks?: boolean;
}
export declare const ContentfulToolbar: React.FC<ToolbarProps>;
export {};
