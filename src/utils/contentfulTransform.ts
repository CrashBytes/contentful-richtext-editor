import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

export const contentfulToTiptap = (document: Document): any => {
  // Transform Contentful document to Tiptap JSON
  const transformNode = (node: any): any => {
    switch (node.nodeType) {
      case BLOCKS.DOCUMENT:
        return {
          type: 'doc',
          content: node.content.map(transformNode),
        };
      case BLOCKS.PARAGRAPH:
        return {
          type: 'paragraph',
          content: node.content ? node.content.map(transformNode) : [],
        };
      case BLOCKS.HEADING_1:
        return {
          type: 'heading',
          attrs: { level: 1 },
          content: node.content.map(transformNode),
        };
      case BLOCKS.HEADING_2:
        return {
          type: 'heading',
          attrs: { level: 2 },
          content: node.content.map(transformNode),
        };
      // Add more block transformations...
      case 'text':
        const marks = node.marks?.map((mark: any) => {
          switch (mark.type) {
            case MARKS.BOLD:
              return { type: 'bold' };
            case MARKS.ITALIC:
              return { type: 'italic' };
            case MARKS.UNDERLINE:
              return { type: 'underline' };
            default:
              return null;
          }
        }).filter(Boolean) || [];

        return {
          type: 'text',
          text: node.value,
          marks,
        };
      default:
        return node;
    }
  };

  return transformNode(document);
};

export const tiptapToContentful = (tiptapDoc: any): Document => {
  // Transform Tiptap JSON to Contentful document
  const transformNode = (node: any): any => {
    switch (node.type) {
      case 'doc':
        return {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: node.content.map(transformNode),
        };
      case 'paragraph':
        return {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: node.content ? node.content.map(transformNode) : [],
        };
      case 'heading':
        const level = node.attrs?.level || 1;
        return {
          nodeType: level === 1 ? BLOCKS.HEADING_1 : BLOCKS.HEADING_2,
          data: {},
          content: node.content.map(transformNode),
        };
      case 'text':
        const marks = node.marks?.map((mark: any) => {
          switch (mark.type) {
            case 'bold':
              return { type: MARKS.BOLD };
            case 'italic':
              return { type: MARKS.ITALIC };
            case 'underline':
              return { type: MARKS.UNDERLINE };
            default:
              return null;
          }
        }).filter(Boolean) || [];

        return {
          nodeType: 'text',
          value: node.text,
          marks,
          data: {},
        };
      default:
        return node;
    }
  };

  return transformNode(tiptapDoc);
};