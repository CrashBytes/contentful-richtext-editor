import React from 'react';
import { Editor } from '@tiptap/react';
interface ToolbarProps {
    editor: Editor;
    onEmbedEntry?: () => void;
    onEmbedAsset?: () => void;
    disabledFeatures?: Array<string>;
}
export declare const ContentfulToolbar: React.FC<ToolbarProps>;
export {};
