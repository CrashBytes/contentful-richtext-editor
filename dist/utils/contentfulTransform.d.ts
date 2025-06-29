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
/**
 * Sanitizes a Contentful document by removing invalid nodes/marks based on configuration
 */
export declare const sanitizeContentfulDocument: (document: Document, allowedNodeTypes: string[], allowedMarks: string[]) => Document;
/**
 * Extracts plain text from a Contentful document
 */
export declare const extractPlainText: (document: Document) => string;
/**
 * Counts words in a Contentful document
 */
export declare const countWords: (document: Document) => number;
/**
 * Finds all embedded entries/assets in a document
 */
export declare const findEmbeddedContent: (document: Document) => {
    entries: string[];
    assets: string[];
    inlineEntries: string[];
};
export {};
