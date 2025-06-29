import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import React from 'react';

// React component for rendering embedded entries
const EmbeddedEntryComponent = ({ node }: any) => {
  const { entryId, contentType, title } = node.attrs;
  
  return React.createElement('div', {
    className: 'contentful-embedded-entry',
    'data-entry-id': entryId,
    'data-content-type': contentType,
    contentEditable: false,
  }, `[Embedded Entry: ${title || entryId}]`);
};

// React component for rendering inline embedded entries
const InlineEmbeddedEntryComponent = ({ node }: any) => {
  const { entryId, contentType, title } = node.attrs;
  
  return React.createElement('span', {
    className: 'contentful-inline-embedded-entry',
    'data-entry-id': entryId,
    'data-content-type': contentType,
    contentEditable: false,
  }, `[Inline Entry: ${title || entryId}]`);
};

// React component for rendering embedded assets
const EmbeddedAssetComponent = ({ node }: any) => {
  const { assetId, title, url, mimeType } = node.attrs;
  
  if (url && mimeType && mimeType.startsWith('image/')) {
    return React.createElement('div', {
      className: 'contentful-embedded-asset contentful-embedded-asset--image',
      'data-asset-id': assetId,
      contentEditable: false,
    }, [
      React.createElement('img', {
        key: 'image',
        src: url,
        alt: title || '',
        className: 'contentful-embedded-asset-image',
        style: { maxWidth: '100%', height: 'auto' },
      }),
      title && React.createElement('p', {
        key: 'caption',
        className: 'contentful-embedded-asset-caption',
      }, title),
    ]);
  }
  
  return React.createElement('div', {
    className: 'contentful-embedded-asset',
    'data-asset-id': assetId,
    contentEditable: false,
  }, `[Embedded Asset: ${title || assetId}]`);
};

export const EmbeddedEntry = Node.create({
  name: 'embeddedEntry',
  group: 'block',
  content: '',
  
  addAttributes() {
    return {
      entryId: {
        default: null,
        parseHTML: element => element.getAttribute('data-entry-id'),
        renderHTML: attributes => {
          if (!attributes.entryId) {
            return {};
          }
          return {
            'data-entry-id': attributes.entryId,
          };
        },
      },
      contentType: {
        default: null,
        parseHTML: element => element.getAttribute('data-content-type'),
        renderHTML: attributes => {
          if (!attributes.contentType) {
            return {};
          }
          return {
            'data-content-type': attributes.contentType,
          };
        },
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-entry-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      class: 'contentful-embedded-entry',
    })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbeddedEntryComponent);
  },

  addCommands() {
    return {
      insertEmbeddedEntry: (attributes: { entryId: string; contentType?: string; title?: string }) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});

export const InlineEmbeddedEntry = Node.create({
  name: 'inlineEmbeddedEntry',
  group: 'inline',
  inline: true,
  content: '',
  
  addAttributes() {
    return {
      entryId: {
        default: null,
        parseHTML: element => element.getAttribute('data-entry-id'),
        renderHTML: attributes => {
          if (!attributes.entryId) {
            return {};
          }
          return {
            'data-entry-id': attributes.entryId,
          };
        },
      },
      contentType: {
        default: null,
        parseHTML: element => element.getAttribute('data-content-type'),
        renderHTML: attributes => {
          if (!attributes.contentType) {
            return {};
          }
          return {
            'data-content-type': attributes.contentType,
          };
        },
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-entry-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      class: 'contentful-inline-embedded-entry',
    })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineEmbeddedEntryComponent);
  },

  addCommands() {
    return {
      insertInlineEmbeddedEntry: (attributes: { entryId: string; contentType?: string; title?: string }) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});

export const EmbeddedAsset = Node.create({
  name: 'embeddedAsset',
  group: 'block',
  content: '',
  
  addAttributes() {
    return {
      assetId: {
        default: null,
        parseHTML: element => element.getAttribute('data-asset-id'),
        renderHTML: attributes => {
          if (!attributes.assetId) {
            return {};
          }
          return {
            'data-asset-id': attributes.assetId,
          };
        },
      },
      title: {
        default: null,
      },
      url: {
        default: null,
      },
      mimeType: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-asset-id]',
      },
      {
        tag: 'img[data-asset-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      class: 'contentful-embedded-asset',
    })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbeddedAssetComponent);
  },

  addCommands() {
    return {
      insertEmbeddedAsset: (attributes: { assetId: string; title?: string; url?: string; mimeType?: string }) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});

// Helper function to create embedded content from Contentful data
export const createEmbeddedEntryFromContentful = (entry: any) => {
  return {
    entryId: entry.sys?.id,
    contentType: entry.sys?.contentType?.sys?.id,
    title: entry.fields?.title || entry.fields?.name || entry.sys?.id,
  };
};

export const createEmbeddedAssetFromContentful = (asset: any) => {
  return {
    assetId: asset.sys?.id,
    title: asset.fields?.title || asset.fields?.file?.fileName,
    url: asset.fields?.file?.url,
    mimeType: asset.fields?.file?.contentType,
  };
};