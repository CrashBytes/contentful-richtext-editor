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
      insertContentfulEntry: (entry: any) => ({ commands }: any) => {
        const entryText = entry.fields?.title || entry.fields?.name || entry.sys?.id || 'Unknown Entry';
        return commands.insertContent({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Entry: ${entryText}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        });
      },
      
      insertContentfulAsset: (asset: any) => ({ commands }: any) => {
        const assetText = asset.fields?.title || asset.fields?.file?.fileName || asset.sys?.id || 'Unknown Asset';
        return commands.insertContent({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Asset: ${assetText}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        });
      },

      insertContentfulInlineEntry: (entry: any) => ({ commands }: any) => {
        const entryText = entry.fields?.title || entry.fields?.name || entry.sys?.id || 'Unknown Entry';
        return commands.insertContent({
          type: 'text',
          text: `[Inline Entry: ${entryText}]`,
          marks: [{ type: 'bold' }],
        });
      },

      // Helper command to insert any type of Contentful content
      insertContentfulContent: (content: any, options: { inline?: boolean } = {}) => ({ commands }: any) => {
        const isEntry = content.sys?.type === 'Entry' || content.sys?.contentType;
        const isAsset = content.sys?.type === 'Asset' || content.fields?.file;
        
        if (isEntry) {
          if (options.inline) {
            return commands.insertContentfulInlineEntry(content);
          } else {
            return commands.insertContentfulEntry(content);
          }
        } else if (isAsset) {
          return commands.insertContentfulAsset(content);
        } else {
          // Fallback for unknown content types
          const text = content.fields?.title || content.sys?.id || 'Unknown Content';
          return commands.insertContent({
            type: options.inline ? 'text' : 'paragraph',
            content: options.inline ? undefined : [
              {
                type: 'text',
                text: `[Content: ${text}]`,
                marks: [{ type: 'bold' }],
              },
            ],
            text: options.inline ? `[Content: ${text}]` : undefined,
            marks: options.inline ? [{ type: 'bold' }] : undefined,
          });
        }
      },
    } as any;
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-e': () => {
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

  onCreate() {
    const handleEmbedShortcuts = (event: CustomEvent) => {
      switch (event.type) {
        case 'contentful:embed-entry':
          this.editor.emit('embed:entry');
          break;
        case 'contentful:embed-asset':
          this.editor.emit('embed:asset');
          break;
        case 'contentful:embed-inline-entry':
          this.editor.emit('embed:inline-entry');
          break;
      }
    };

    document.addEventListener('contentful:embed-entry', handleEmbedShortcuts as EventListener);
    document.addEventListener('contentful:embed-asset', handleEmbedShortcuts as EventListener);
    document.addEventListener('contentful:embed-inline-entry', handleEmbedShortcuts as EventListener);

    this.options.eventListeners = {
      'contentful:embed-entry': handleEmbedShortcuts,
      'contentful:embed-asset': handleEmbedShortcuts,
      'contentful:embed-inline-entry': handleEmbedShortcuts,
    };
  },

  onDestroy() {
    if (this.options.eventListeners) {
      Object.entries(this.options.eventListeners).forEach(([event, handler]) => {
        document.removeEventListener(event, handler as EventListener);
      });
    }
  },
});