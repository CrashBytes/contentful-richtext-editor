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

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-e': () => {
        // Trigger a browser event that can be handled by parent components
        const event = new CustomEvent('contentful:embed-entry');
        document.dispatchEvent(event);
        return true;
      },
      'Mod-Shift-a': () => {
        const event = new CustomEvent('contentful:embed-asset');
        document.dispatchEvent(event);
        return true;
      },
      'Mod-Shift-i': () => {
        const event = new CustomEvent('contentful:embed-inline-entry');
        document.dispatchEvent(event);
        return true;
      },
    };
  },
});