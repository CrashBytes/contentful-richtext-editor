
import { 
    contentfulToTiptap, 
    tiptapToContentful, 
    validateContentfulDocument, 
    createEmptyDocument 
} from '@/utils/contentfulTransform';
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

describe('contentfulTransform', () => {
  describe('contentfulToTiptap', () => {
    it('converts a basic document with paragraph', () => {
      const contentfulDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Hello world',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      };

      const result = contentfulToTiptap(contentfulDoc);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hello world',
              },
            ],
          },
        ],
      });
    });

    it('converts headings of different levels', () => {
      const contentfulDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.HEADING_1,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Heading 1',
                marks: [],
                data: {},
              },
            ],
          },
          {
            nodeType: BLOCKS.HEADING_2,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Heading 2',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      };

      const result = contentfulToTiptap(contentfulDoc);

      expect(result.content).toEqual([
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Heading 1' }],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Heading 2' }],
        },
      ]);
    });

    it('converts text with marks', () => {
      const contentfulDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Bold text',
                marks: [{ type: MARKS.BOLD }],
                data: {},
              },
            ],
          },
        ],
      };

      const result = contentfulToTiptap(contentfulDoc);

      expect(result.content![0]).toEqual({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Bold text',
            marks: [{ type: 'bold' }],
          },
        ],
      });
    });

    it('converts hyperlinks', () => {
      const contentfulDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: INLINES.HYPERLINK,
                data: { uri: 'https://example.com' },
                content: [
                  {
                    nodeType: 'text',
                    value: 'Link text',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = contentfulToTiptap(contentfulDoc);

      expect(result.content![0]).toEqual({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Link text',
            marks: [
              {
                type: 'link',
                attrs: { href: 'https://example.com' },
              },
            ],
          },
        ],
      });
    });
  });

  describe('tiptapToContentful', () => {
    it('converts basic Tiptap document to Contentful', () => {
      const tiptapDoc = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hello world',
              },
            ],
          },
        ],
      };

      const result = tiptapToContentful(tiptapDoc);

      expect(result).toEqual({
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Hello world',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      });
    });

    it('converts headings back to Contentful format', () => {
      const tiptapDoc = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              {
                type: 'text',
                text: 'Heading 2',
              },
            ],
          },
        ],
      };

      const result = tiptapToContentful(tiptapDoc);

      expect(result.content[0]).toEqual({
        nodeType: BLOCKS.HEADING_2,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Heading 2',
            marks: [],
            data: {},
          },
        ],
      });
    });

    it('converts links back to Contentful hyperlinks', () => {
      const tiptapDoc = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Link text',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'https://example.com' },
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = tiptapToContentful(tiptapDoc);

      expect(result.content[0]).toEqual({
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: INLINES.HYPERLINK,
            data: { uri: 'https://example.com' },
            content: [
              {
                nodeType: 'text',
                value: 'Link text',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      });
    });
  });

  describe('validateContentfulDocument', () => {
    it('validates a correct Contentful document', () => {
      const validDoc: Document = {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [],
          },
        ],
      };

      expect(validateContentfulDocument(validDoc)).toBe(true);
    });

    it('rejects invalid documents', () => {
      expect(validateContentfulDocument(null)).toBe(false);
      expect(validateContentfulDocument(undefined)).toBe(false);
      expect(validateContentfulDocument('string')).toBe(false);
      expect(validateContentfulDocument({ nodeType: 'paragraph' })).toBe(false);
    });
  });

  describe('createEmptyDocument', () => {
    it('creates a valid empty Contentful document', () => {
      const emptyDoc = createEmptyDocument();

      expect(emptyDoc).toEqual({
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

      expect(validateContentfulDocument(emptyDoc)).toBe(true);
    });
  });
});