import React from 'react';
import { Editor } from '@tiptap/react';
interface ToolbarProps {
    editor: Editor;
    onEmbedEntry?: () => void;
    onEmbedAsset?: () => void;
    disabledFeatures?: Array<string>;
    availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    availableMarks?: Array<'bold' | 'italic' | 'underline'>;
}
export declare const ContentfulToolbar: React.FC<ToolbarProps>;
export {};
