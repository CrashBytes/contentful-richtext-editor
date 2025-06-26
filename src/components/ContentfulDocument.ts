import { Extension } from '@tiptap/core';

export const ContentfulDocument = Extension.create({
  name: 'contentfulDocument',

  addGlobalAttributes() {
    return [
      {
        types: ['document'],
        attributes: {
          'data-contentful': {
            default: true,
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      insertContentfulEntry: (entry: any) => ({ commands }) => {
        return commands.insertContent({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Entry: ${entry.fields?.title || entry.sys?.id}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        });
      },
      
      insertContentfulAsset: (asset: any) => ({ commands }) => {
        return commands.insertContent({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Asset: ${asset.fields?.title || asset.sys?.id}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        });
      },
    };
  },
});