import { Document } from '@contentful/rich-text-types';
interface TiptapNode {
    type: string;
    attrs?: Record<string, any>;
    content?: TiptapNode[];
    text?: string;
    marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
    }>;
}
/**
 * Converts a Contentful Rich Text Document to Tiptap JSON format
 */
export declare const contentfulToTiptap: (document: Document) => TiptapNode;
/**
 * Converts Tiptap JSON format to Contentful Rich Text Document
 */
export declare const tiptapToContentful: (tiptapDoc: any) => Document;
/**
 * Validates if a Contentful document is properly formatted
 */
export declare const validateContentfulDocument: (document: any) => document is Document;
/**
 * Creates an empty Contentful document
 */
export declare const createEmptyDocument: () => Document;
export {};
