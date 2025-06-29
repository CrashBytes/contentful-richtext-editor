import { Node } from '@tiptap/core';
export declare const EmbeddedEntry: Node<any, any>;
export declare const InlineEmbeddedEntry: Node<any, any>;
export declare const EmbeddedAsset: Node<any, any>;
export declare const createEmbeddedEntryFromContentful: (entry: any) => {
    entryId: any;
    contentType: any;
    title: any;
};
export declare const createEmbeddedAssetFromContentful: (asset: any) => {
    assetId: any;
    title: any;
    url: any;
    mimeType: any;
};
