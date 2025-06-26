import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import React from 'react';

// React component for rendering embedded entries
const EmbeddedEntryComponent = ({ node }: any) => {
  const { entryId, contentType } = node.attrs;
  
  return React.createElement('div', {
    className: 'contentful-embedded-entry',
    'data-entry-id': entryId,
    'data-content-type': contentType,
  }, `[Embedded Entry: ${entryId}]`);
};

// React component for rendering embedded assets
const EmbeddedAssetComponent = ({ node }: any) => {
  const { assetId, title, url } = node.attrs;
  
  if (url && url.includes('image')) {
    return React.createElement('img', {
      src: url,
      alt: title || '',
      className: 'contentful-embedded-asset-image',
      'data-asset-id': assetId,
    });
  }
  
  return React.createElement('div', {
    className: 'contentful-embedded-asset',
    'data-asset-id': assetId,
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
      },
      contentType: {
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
});

export const EmbeddedAsset = Node.create({
  name: 'embeddedAsset',
  group: 'block',
  content: '',
  
  addAttributes() {
    return {
      assetId: {
        default: null,
      },
      title: {
        default: null,
      },
      url: {
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
});