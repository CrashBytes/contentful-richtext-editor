import { 
  Document, 
  Block, 
  Inline, 
  Text, 
  BLOCKS, 
  MARKS, 
  INLINES 
} from '@contentful/rich-text-types';

// Type definitions for Tiptap JSON structure
interface TiptapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
}

/**
 * Converts a Contentful Rich Text Document to Tiptap JSON format
 */
export const contentfulToTiptap = (document: Document): TiptapNode => {
  const convertNode = (node: Block | Inline | Text): TiptapNode | TiptapNode[] => {
    switch (node.nodeType) {
      case BLOCKS.DOCUMENT:
        return {
          type: 'doc',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.PARAGRAPH:
        return {
          type: 'paragraph',
          content: node.content ? node.content.map(child => convertNode(child)).flat() : [],
        };

      case BLOCKS.HEADING_1:
        return {
          type: 'heading',
          attrs: { level: 1 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HEADING_2:
        return {
          type: 'heading',
          attrs: { level: 2 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HEADING_3:
        return {
          type: 'heading',
          attrs: { level: 3 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HEADING_4:
        return {
          type: 'heading',
          attrs: { level: 4 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HEADING_5:
        return {
          type: 'heading',
          attrs: { level: 5 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HEADING_6:
        return {
          type: 'heading',
          attrs: { level: 6 },
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.UL_LIST:
        return {
          type: 'bulletList',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.OL_LIST:
        return {
          type: 'orderedList',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.LIST_ITEM:
        return {
          type: 'listItem',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.QUOTE:
        return {
          type: 'blockquote',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.HR:
        return {
          type: 'horizontalRule',
        };

      case BLOCKS.TABLE:
        return {
          type: 'table',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.TABLE_ROW:
        return {
          type: 'tableRow',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.TABLE_CELL:
        return {
          type: 'tableCell',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case BLOCKS.TABLE_HEADER_CELL:
        return {
          type: 'tableHeader',
          content: node.content.map(child => convertNode(child)).flat(),
        };

      case INLINES.HYPERLINK:
        return {
          type: 'text',
          text: node.content.map(child => 
            child.nodeType === 'text' ? child.value : ''
          ).join(''),
          marks: [
            {
              type: 'link',
              attrs: { href: node.data.uri },
            },
          ],
        };

      case INLINES.EMBEDDED_ENTRY:
        // Inline embedded entry
        return {
          type: 'text',
          text: `[Inline Entry: ${node.data.target?.sys?.id || 'Unknown'}]`,
          marks: [{ type: 'bold' }],
        };

      case BLOCKS.EMBEDDED_ENTRY:
        return {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Embedded Entry: ${node.data.target?.sys?.id || 'Unknown'}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        };

      case BLOCKS.EMBEDDED_ASSET:
        return {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `[Embedded Asset: ${node.data.target?.sys?.id || 'Unknown'}]`,
              marks: [{ type: 'bold' }],
            },
          ],
        };

      case 'text':
        const textNode = node as Text;
        const marks = textNode.marks?.map(mark => {
          switch (mark.type) {
            case MARKS.BOLD:
              return { type: 'bold' };
            case MARKS.ITALIC:
              return { type: 'italic' };
            case MARKS.UNDERLINE:
              return { type: 'underline' };
            case MARKS.CODE:
              return { type: 'code' };
            default:
              return null;
          }
        }).filter((mark): mark is { type: string } => mark !== null) || [];

        return {
          type: 'text',
          text: textNode.value,
          marks: marks.length > 0 ? marks : undefined,
        };

      default:
        console.warn(`Unknown Contentful node type: ${node.nodeType}`);
        return {
          type: 'paragraph',
          content: [],
        };
    }
  };

  return convertNode(document) as TiptapNode;
};

/**
 * Converts Tiptap JSON format to Contentful Rich Text Document
 */
export const tiptapToContentful = (tiptapDoc: any): Document => {
  const convertNode = (node: any): Block | Inline | Text => {
    switch (node.type) {
      case 'doc':
        return {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'paragraph':
        return {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as (Inline | Text)[],
        };

      case 'heading':
        const level = node.attrs?.level || 1;
        const headingTypes: Record<number, BLOCKS> = {
          1: BLOCKS.HEADING_1,
          2: BLOCKS.HEADING_2,
          3: BLOCKS.HEADING_3,
          4: BLOCKS.HEADING_4,
          5: BLOCKS.HEADING_5,
          6: BLOCKS.HEADING_6,
        };
        const headingType = headingTypes[level] || BLOCKS.HEADING_1;

        return {
          nodeType: headingType,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as (Inline | Text)[],
        };

      case 'bulletList':
        return {
          nodeType: BLOCKS.UL_LIST,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'orderedList':
        return {
          nodeType: BLOCKS.OL_LIST,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'listItem':
        return {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'blockquote':
        return {
          nodeType: BLOCKS.QUOTE,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'horizontalRule':
        return {
          nodeType: BLOCKS.HR,
          data: {},
          content: [],
        };

      case 'table':
        return {
          nodeType: BLOCKS.TABLE,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'tableRow':
        return {
          nodeType: BLOCKS.TABLE_ROW,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'tableCell':
        return {
          nodeType: BLOCKS.TABLE_CELL,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
        };

      case 'tableHeader':
        return {
          nodeType: BLOCKS.TABLE_HEADER_CELL,
          data: {},
          content: node.content?.map((child: any) => convertNode(child)) as Block[],
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
            case 'code':
              return { type: MARKS.CODE };
            case 'link':
              return null; // Links are handled separately
            default:
              return null;
          }
        }).filter(Boolean) || [];

        // Check if this text has a link mark
        const linkMark = node.marks?.find((mark: any) => mark.type === 'link');
        if (linkMark) {
          return {
            nodeType: INLINES.HYPERLINK,
            data: {
              uri: linkMark.attrs?.href || '',
            },
            content: [
              {
                nodeType: 'text',
                value: node.text || '',
                marks: marks,
                data: {},
              } as Text,
            ],
          };
        }

        // Check if this is an inline entry (by looking for specific patterns)
        const isInlineEntry = node.text && node.text.startsWith('[Inline Entry:');
        if (isInlineEntry && node.marks?.some((mark: any) => mark.type === 'bold')) {
          // Extract entry ID from the text
          const match = node.text.match(/\[Inline Entry:\s*([^\]]+)\]/);
          const entryId = match ? match[1].trim() : 'Unknown';
          
          return {
            nodeType: INLINES.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: entryId,
                  type: 'Link',
                  linkType: 'Entry',
                },
              },
            },
            content: [],
          };
        }

        return {
          nodeType: 'text',
          value: node.text || '',
          marks: marks,
          data: {},
        } as Text;

      default:
        console.warn(`Unknown Tiptap node type: ${node.type}`);
        return {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [],
        };
    }
  };

  return convertNode(tiptapDoc) as Document;
};

/**
 * Validates if a Contentful document is properly formatted
 */
export const validateContentfulDocument = (document: any): document is Document => {
  if (!document || typeof document !== 'object') {
    return false;
  }

  if (document.nodeType !== BLOCKS.DOCUMENT) {
    return false;
  }

  if (!Array.isArray(document.content)) {
    return false;
  }

  return true;
};

/**
 * Creates an empty Contentful document
 */
export const createEmptyDocument = (): Document => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [],
    },
  ],
});

/**
 * Sanitizes a Contentful document by removing invalid nodes/marks based on configuration
 */
export const sanitizeContentfulDocument = (
  document: Document,
  allowedNodeTypes: string[],
  allowedMarks: string[]
): Document => {
  const sanitizeNode = (node: Block | Inline | Text): Block | Inline | Text | null => {
    // Check if node type is allowed
    if (!allowedNodeTypes.includes(node.nodeType)) {
      // Convert to paragraph if it's a block that's not allowed
      if (node.nodeType.startsWith('heading-') || 
          node.nodeType === BLOCKS.QUOTE || 
          node.nodeType === BLOCKS.UL_LIST ||
          node.nodeType === BLOCKS.OL_LIST) {
        return {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: (node as Block).content?.map(child => sanitizeNode(child)).filter(Boolean) as (Inline | Text)[],
        };
      }
      return null;
    }

    if (node.nodeType === 'text') {
      const textNode = node as Text;
      const sanitizedMarks = textNode.marks?.filter(mark => allowedMarks.includes(mark.type)) || [];
      return {
        ...textNode,
        marks: sanitizedMarks,
      };
    }

    if ('content' in node && node.content) {
      const sanitizedContent = node.content.map(child => sanitizeNode(child)).filter(Boolean);
      return {
        ...node,
        content: sanitizedContent,
      } as Block | Inline;
    }

    return node;
  };

  const sanitized = sanitizeNode(document);
  return sanitized as Document;
};

/**
 * Extracts plain text from a Contentful document
 */
export const extractPlainText = (document: Document): string => {
  const extractFromNode = (node: Block | Inline | Text): string => {
    if (node.nodeType === 'text') {
      return (node as Text).value;
    }

    if ('content' in node && node.content) {
      return node.content.map(child => extractFromNode(child)).join('');
    }

    return '';
  };

  return extractFromNode(document);
};

/**
 * Counts words in a Contentful document
 */
export const countWords = (document: Document): number => {
  const plainText = extractPlainText(document);
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
};

/**
 * Finds all embedded entries/assets in a document
 */
export const findEmbeddedContent = (document: Document): {
  entries: string[];
  assets: string[];
  inlineEntries: string[];
} => {
  const entries: string[] = [];
  const assets: string[] = [];
  const inlineEntries: string[] = [];

  const searchNode = (node: Block | Inline | Text): void => {
    if (node.nodeType === BLOCKS.EMBEDDED_ENTRY) {
      const entryId = node.data.target?.sys?.id;
      if (entryId) entries.push(entryId);
    } else if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
      const assetId = node.data.target?.sys?.id;
      if (assetId) assets.push(assetId);
    } else if (node.nodeType === INLINES.EMBEDDED_ENTRY) {
      const entryId = node.data.target?.sys?.id;
      if (entryId) inlineEntries.push(entryId);
    }

    if ('content' in node && node.content) {
      node.content.forEach(child => searchNode(child));
    }
  };

  searchNode(document);

  return {
    entries: [...new Set(entries)], // Remove duplicates
    assets: [...new Set(assets)],
    inlineEntries: [...new Set(inlineEntries)],
  };
};