import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  EmbeddedEntry,
  InlineEmbeddedEntry,
  EmbeddedAsset,
  createEmbeddedEntryFromContentful,
  createEmbeddedAssetFromContentful,
} from '@/components/ContentfulEmbedded';

// Mock Tiptap dependencies
jest.mock('@tiptap/core', () => ({
  Node: {
    create: jest.fn((config) => config),
  },
  mergeAttributes: jest.fn((attrs1, attrs2) => ({ ...attrs1, ...attrs2 })),
}));

jest.mock('@tiptap/react', () => ({
  ReactNodeViewRenderer: jest.fn((component) => `ReactNodeViewRenderer(${component.name})`),
}));

// Mock React.createElement to track calls
const mockCreateElement = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createElement: (...args: any[]) => mockCreateElement(...args),
}));

describe('ContentfulEmbedded', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset React.createElement mock to return a simple test element
    mockCreateElement.mockImplementation((type, props, ...children) => ({
      type,
      props,
      children,
    }));
  });

  describe('EmbeddedEntryComponent', () => {
    // We need to access the component function from the module
    let EmbeddedEntryComponent: any;

    beforeAll(() => {
      // Import the module to get access to the component
      const ContentfulEmbedded = require('@/components/ContentfulEmbedded');
      // Extract the component by looking at the first ReactNodeViewRenderer call
      const mockCall = jest.mocked(require('@tiptap/react').ReactNodeViewRenderer).mock.calls[0];
      EmbeddedEntryComponent = mockCall?.[0];
    });

    it('renders with entry ID and content type', () => {
      const mockNode = {
        attrs: {
          entryId: 'entry-123',
          contentType: 'blogPost',
          title: 'Test Entry',
        },
      };

      EmbeddedEntryComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-entry',
        'data-entry-id': 'entry-123',
        'data-content-type': 'blogPost',
        contentEditable: false,
      }, '[Embedded Entry: Test Entry]');
    });

    it('renders with fallback to entryId when no title', () => {
      const mockNode = {
        attrs: {
          entryId: 'entry-456',
          contentType: 'article',
          title: null,
        },
      };

      EmbeddedEntryComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-entry',
        'data-entry-id': 'entry-456',
        'data-content-type': 'article',
        contentEditable: false,
      }, '[Embedded Entry: entry-456]');
    });

    it('renders with undefined title', () => {
      const mockNode = {
        attrs: {
          entryId: 'entry-789',
          contentType: 'page',
        },
      };

      EmbeddedEntryComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-entry',
        'data-entry-id': 'entry-789',
        'data-content-type': 'page',
        contentEditable: false,
      }, '[Embedded Entry: entry-789]');
    });
  });

  describe('InlineEmbeddedEntryComponent', () => {
    let InlineEmbeddedEntryComponent: any;

    beforeAll(() => {
      // Get the second ReactNodeViewRenderer call (for inline entries)
      const mockCalls = jest.mocked(require('@tiptap/react').ReactNodeViewRenderer).mock.calls;
      InlineEmbeddedEntryComponent = mockCalls[1]?.[0];
    });

    it('renders with entry ID and content type', () => {
      const mockNode = {
        attrs: {
          entryId: 'inline-123',
          contentType: 'author',
          title: 'John Doe',
        },
      };

      InlineEmbeddedEntryComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('span', {
        className: 'contentful-inline-embedded-entry',
        'data-entry-id': 'inline-123',
        'data-content-type': 'author',
        contentEditable: false,
      }, '[Inline Entry: John Doe]');
    });

    it('renders with fallback to entryId when no title', () => {
      const mockNode = {
        attrs: {
          entryId: 'inline-456',
          contentType: 'tag',
          title: '',
        },
      };

      InlineEmbeddedEntryComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('span', {
        className: 'contentful-inline-embedded-entry',
        'data-entry-id': 'inline-456',
        'data-content-type': 'tag',
        contentEditable: false,
      }, '[Inline Entry: inline-456]');
    });
  });

  describe('EmbeddedAssetComponent', () => {
    let EmbeddedAssetComponent: any;

    beforeAll(() => {
      // Get the third ReactNodeViewRenderer call (for assets)
      const mockCalls = jest.mocked(require('@tiptap/react').ReactNodeViewRenderer).mock.calls;
      EmbeddedAssetComponent = mockCalls[2]?.[0];
    });

    it('renders image asset with title', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-123',
          title: 'Test Image',
          url: 'https://example.com/image.jpg',
          mimeType: 'image/jpeg',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenNthCalledWith(1, 'div', {
        className: 'contentful-embedded-asset contentful-embedded-asset--image',
        'data-asset-id': 'asset-123',
        contentEditable: false,
      }, [
        expect.any(Object), // img element
        expect.any(Object), // caption element
      ]);

      expect(mockCreateElement).toHaveBeenNthCalledWith(2, 'img', {
        key: 'image',
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
        className: 'contentful-embedded-asset-image',
        style: { maxWidth: '100%', height: 'auto' },
      });

      expect(mockCreateElement).toHaveBeenNthCalledWith(3, 'p', {
        key: 'caption',
        className: 'contentful-embedded-asset-caption',
      }, 'Test Image');
    });

    it('renders image asset without title', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-456',
          title: null,
          url: 'https://example.com/photo.png',
          mimeType: 'image/png',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenNthCalledWith(1, 'div', {
        className: 'contentful-embedded-asset contentful-embedded-asset--image',
        'data-asset-id': 'asset-456',
        contentEditable: false,
      }, [
        expect.any(Object), // img element only, no caption
      ]);

      expect(mockCreateElement).toHaveBeenNthCalledWith(2, 'img', {
        key: 'image',
        src: 'https://example.com/photo.png',
        alt: '',
        className: 'contentful-embedded-asset-image',
        style: { maxWidth: '100%', height: 'auto' },
      });

      // Should not create caption when title is null
      expect(mockCreateElement).not.toHaveBeenCalledWith('p', expect.anything(), expect.anything());
    });

    it('renders image asset with empty title (falsy)', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-789',
          title: '',
          url: 'https://example.com/image.gif',
          mimeType: 'image/gif',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenNthCalledWith(2, 'img', {
        key: 'image',
        src: 'https://example.com/image.gif',
        alt: '',
        className: 'contentful-embedded-asset-image',
        style: { maxWidth: '100%', height: 'auto' },
      });
    });

    it('renders non-image asset with title', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-doc',
          title: 'Important Document',
          url: 'https://example.com/doc.pdf',
          mimeType: 'application/pdf',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-asset',
        'data-asset-id': 'asset-doc',
        contentEditable: false,
      }, '[Embedded Asset: Important Document]');
    });

    it('renders non-image asset without title (fallback to assetId)', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-video',
          title: null,
          url: 'https://example.com/video.mp4',
          mimeType: 'video/mp4',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-asset',
        'data-asset-id': 'asset-video',
        contentEditable: false,
      }, '[Embedded Asset: asset-video]');
    });

    it('renders asset without url (not an image)', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-unknown',
          title: 'Unknown Asset',
          url: null,
          mimeType: 'image/jpeg',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-asset',
        'data-asset-id': 'asset-unknown',
        contentEditable: false,
      }, '[Embedded Asset: Unknown Asset]');
    });

    it('renders asset without mimeType (not an image)', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-no-mime',
          title: 'No MIME Type',
          url: 'https://example.com/file',
          mimeType: null,
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-asset',
        'data-asset-id': 'asset-no-mime',
        contentEditable: false,
      }, '[Embedded Asset: No MIME Type]');
    });

    it('renders asset with non-image mimeType', () => {
      const mockNode = {
        attrs: {
          assetId: 'asset-text',
          title: 'Text File',
          url: 'https://example.com/file.txt',
          mimeType: 'text/plain',
        },
      };

      EmbeddedAssetComponent({ node: mockNode });

      expect(mockCreateElement).toHaveBeenCalledWith('div', {
        className: 'contentful-embedded-asset',
        'data-asset-id': 'asset-text',
        contentEditable: false,
      }, '[Embedded Asset: Text File]');
    });
  });

  describe('EmbeddedEntry Node Extension', () => {
    it('has correct configuration', () => {
      expect(EmbeddedEntry.name).toBe('embeddedEntry');
      expect(EmbeddedEntry.group).toBe('block');
      expect(EmbeddedEntry.content).toBe('');
    });

    it('returns correct attributes configuration', () => {
      const attributes = EmbeddedEntry.addAttributes();

      expect(attributes.entryId.default).toBe(null);
      expect(attributes.contentType.default).toBe(null);
      expect(attributes.title.default).toBe(null);
    });

    it('parses HTML attributes correctly', () => {
      const attributes = EmbeddedEntry.addAttributes();
      
      // Test entryId parsing
      const mockElement = {
        getAttribute: jest.fn((attr) => {
          if (attr === 'data-entry-id') return 'test-entry';
          if (attr === 'data-content-type') return 'blogPost';
          return null;
        }),
      };

      const entryId = attributes.entryId.parseHTML(mockElement as any);
      const contentType = attributes.contentType.parseHTML(mockElement as any);

      expect(entryId).toBe('test-entry');
      expect(contentType).toBe('blogPost');
    });

    it('renders HTML attributes correctly when attributes exist', () => {
      const attributes = EmbeddedEntry.addAttributes();

      const entryIdAttrs = attributes.entryId.renderHTML({ entryId: 'test-entry' });
      const contentTypeAttrs = attributes.contentType.renderHTML({ contentType: 'blogPost' });

      expect(entryIdAttrs).toEqual({ 'data-entry-id': 'test-entry' });
      expect(contentTypeAttrs).toEqual({ 'data-content-type': 'blogPost' });
    });

    it('returns empty object when attributes are null', () => {
      const attributes = EmbeddedEntry.addAttributes();

      const emptyEntryId = attributes.entryId.renderHTML({ entryId: null });
      const emptyContentType = attributes.contentType.renderHTML({ contentType: null });

      expect(emptyEntryId).toEqual({});
      expect(emptyContentType).toEqual({});
    });

    it('returns empty object when attributes are undefined', () => {
      const attributes = EmbeddedEntry.addAttributes();

      const emptyEntryId = attributes.entryId.renderHTML({});
      const emptyContentType = attributes.contentType.renderHTML({});

      expect(emptyEntryId).toEqual({});
      expect(emptyContentType).toEqual({});
    });

    it('returns correct parseHTML configuration', () => {
      const parseHTML = EmbeddedEntry.parseHTML();
      expect(parseHTML).toEqual([{ tag: 'div[data-entry-id]' }]);
    });

    it('renders HTML correctly', () => {
      const mergeAttributes = require('@tiptap/core').mergeAttributes;
      const HTMLAttributes = { id: 'test' };

      EmbeddedEntry.renderHTML({ HTMLAttributes });

      expect(mergeAttributes).toHaveBeenCalledWith(HTMLAttributes, {
        class: 'contentful-embedded-entry',
      });
    });

    it('returns correct node view', () => {
      const ReactNodeViewRenderer = require('@tiptap/react').ReactNodeViewRenderer;
      const nodeView = EmbeddedEntry.addNodeView();

      expect(ReactNodeViewRenderer).toHaveBeenCalled();
      expect(nodeView).toBeDefined();
    });
  });

  describe('InlineEmbeddedEntry Node Extension', () => {
    it('has correct configuration', () => {
      expect(InlineEmbeddedEntry.name).toBe('inlineEmbeddedEntry');
      expect(InlineEmbeddedEntry.group).toBe('inline');
      expect(InlineEmbeddedEntry.inline).toBe(true);
      expect(InlineEmbeddedEntry.content).toBe('');
    });

    it('returns correct attributes configuration', () => {
      const attributes = InlineEmbeddedEntry.addAttributes();

      expect(attributes.entryId.default).toBe(null);
      expect(attributes.contentType.default).toBe(null);
      expect(attributes.title.default).toBe(null);
    });

    it('parses HTML attributes correctly', () => {
      const attributes = InlineEmbeddedEntry.addAttributes();
      
      const mockElement = {
        getAttribute: jest.fn((attr) => {
          if (attr === 'data-entry-id') return 'inline-entry';
          if (attr === 'data-content-type') return 'author';
          return null;
        }),
      };

      const entryId = attributes.entryId.parseHTML(mockElement as any);
      const contentType = attributes.contentType.parseHTML(mockElement as any);

      expect(entryId).toBe('inline-entry');
      expect(contentType).toBe('author');
    });

    it('renders HTML attributes correctly', () => {
      const attributes = InlineEmbeddedEntry.addAttributes();

      const entryIdAttrs = attributes.entryId.renderHTML({ entryId: 'inline-entry' });
      const contentTypeAttrs = attributes.contentType.renderHTML({ contentType: 'author' });

      expect(entryIdAttrs).toEqual({ 'data-entry-id': 'inline-entry' });
      expect(contentTypeAttrs).toEqual({ 'data-content-type': 'author' });
    });

    it('returns empty object when attributes are null', () => {
      const attributes = InlineEmbeddedEntry.addAttributes();

      const emptyEntryId = attributes.entryId.renderHTML({ entryId: null });
      const emptyContentType = attributes.contentType.renderHTML({ contentType: null });

      expect(emptyEntryId).toEqual({});
      expect(emptyContentType).toEqual({});
    });

    it('returns correct parseHTML configuration', () => {
      const parseHTML = InlineEmbeddedEntry.parseHTML();
      expect(parseHTML).toEqual([{ tag: 'span[data-entry-id]' }]);
    });

    it('renders HTML correctly', () => {
      const mergeAttributes = require('@tiptap/core').mergeAttributes;
      const HTMLAttributes = { id: 'inline-test' };

      InlineEmbeddedEntry.renderHTML({ HTMLAttributes });

      expect(mergeAttributes).toHaveBeenCalledWith(HTMLAttributes, {
        class: 'contentful-inline-embedded-entry',
      });
    });

    it('returns correct node view', () => {
      const ReactNodeViewRenderer = require('@tiptap/react').ReactNodeViewRenderer;
      const nodeView = InlineEmbeddedEntry.addNodeView();

      expect(ReactNodeViewRenderer).toHaveBeenCalled();
      expect(nodeView).toBeDefined();
    });
  });

  describe('EmbeddedAsset Node Extension', () => {
    it('has correct configuration', () => {
      expect(EmbeddedAsset.name).toBe('embeddedAsset');
      expect(EmbeddedAsset.group).toBe('block');
      expect(EmbeddedAsset.content).toBe('');
    });

    it('returns correct attributes configuration', () => {
      const attributes = EmbeddedAsset.addAttributes();

      expect(attributes.assetId.default).toBe(null);
      expect(attributes.title.default).toBe(null);
      expect(attributes.url.default).toBe(null);
      expect(attributes.mimeType.default).toBe(null);
    });

    it('parses HTML attributes correctly', () => {
      const attributes = EmbeddedAsset.addAttributes();
      
      const mockElement = {
        getAttribute: jest.fn((attr) => {
          if (attr === 'data-asset-id') return 'test-asset';
          return null;
        }),
      };

      const assetId = attributes.assetId.parseHTML(mockElement as any);

      expect(assetId).toBe('test-asset');
    });

    it('renders HTML attributes correctly when assetId exists', () => {
      const attributes = EmbeddedAsset.addAttributes();

      const assetIdAttrs = attributes.assetId.renderHTML({ assetId: 'test-asset' });

      expect(assetIdAttrs).toEqual({ 'data-asset-id': 'test-asset' });
    });

    it('returns empty object when assetId is null', () => {
      const attributes = EmbeddedAsset.addAttributes();

      const emptyAssetId = attributes.assetId.renderHTML({ assetId: null });

      expect(emptyAssetId).toEqual({});
    });

    it('returns empty object when assetId is undefined', () => {
      const attributes = EmbeddedAsset.addAttributes();

      const emptyAssetId = attributes.assetId.renderHTML({});

      expect(emptyAssetId).toEqual({});
    });

    it('returns correct parseHTML configuration', () => {
      const parseHTML = EmbeddedAsset.parseHTML();
      expect(parseHTML).toEqual([
        { tag: 'div[data-asset-id]' },
        { tag: 'img[data-asset-id]' },
      ]);
    });

    it('renders HTML correctly', () => {
      const mergeAttributes = require('@tiptap/core').mergeAttributes;
      const HTMLAttributes = { id: 'asset-test' };

      EmbeddedAsset.renderHTML({ HTMLAttributes });

      expect(mergeAttributes).toHaveBeenCalledWith(HTMLAttributes, {
        class: 'contentful-embedded-asset',
      });
    });

    it('returns correct node view', () => {
      const ReactNodeViewRenderer = require('@tiptap/react').ReactNodeViewRenderer;
      const nodeView = EmbeddedAsset.addNodeView();

      expect(ReactNodeViewRenderer).toHaveBeenCalled();
      expect(nodeView).toBeDefined();
    });
  });

  describe('Helper Functions', () => {
    describe('createEmbeddedEntryFromContentful', () => {
      it('extracts all fields correctly', () => {
        const entry = {
          sys: {
            id: 'entry-123',
            contentType: {
              sys: { id: 'blogPost' }
            }
          },
          fields: {
            title: 'Test Entry'
          }
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: 'entry-123',
          contentType: 'blogPost',
          title: 'Test Entry'
        });
      });

      it('falls back to name field when title is not available', () => {
        const entry = {
          sys: {
            id: 'entry-456',
            contentType: {
              sys: { id: 'author' }
            }
          },
          fields: {
            name: 'John Doe'
          }
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: 'entry-456',
          contentType: 'author',
          title: 'John Doe'
        });
      });

      it('falls back to sys.id when no title or name fields', () => {
        const entry = {
          sys: {
            id: 'entry-789',
            contentType: {
              sys: { id: 'category' }
            }
          },
          fields: {}
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: 'entry-789',
          contentType: 'category',
          title: 'entry-789'
        });
      });

      it('handles missing sys object', () => {
        const entry = {
          fields: {
            title: 'Orphaned Entry'
          }
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: undefined,
          contentType: undefined,
          title: 'Orphaned Entry'
        });
      });

      it('handles missing contentType', () => {
        const entry = {
          sys: {
            id: 'entry-without-content-type'
          },
          fields: {
            title: 'No Content Type'
          }
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: 'entry-without-content-type',
          contentType: undefined,
          title: 'No Content Type'
        });
      });

      it('handles missing fields object', () => {
        const entry = {
          sys: {
            id: 'entry-no-fields',
            contentType: {
              sys: { id: 'page' }
            }
          }
        };

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: 'entry-no-fields',
          contentType: 'page',
          title: 'entry-no-fields'
        });
      });

      it('handles completely empty entry', () => {
        const entry = {};

        const result = createEmbeddedEntryFromContentful(entry);

        expect(result).toEqual({
          entryId: undefined,
          contentType: undefined,
          title: undefined
        });
      });
    });

    describe('createEmbeddedAssetFromContentful', () => {
      it('extracts all fields correctly', () => {
        const asset = {
          sys: { id: 'asset-123' },
          fields: {
            title: 'Test Image',
            file: {
              url: 'https://example.com/image.jpg',
              fileName: 'image.jpg',
              contentType: 'image/jpeg'
            }
          }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: 'asset-123',
          title: 'Test Image',
          url: 'https://example.com/image.jpg',
          mimeType: 'image/jpeg'
        });
      });

      it('falls back to fileName when title is not available', () => {
        const asset = {
          sys: { id: 'asset-456' },
          fields: {
            file: {
              url: 'https://example.com/document.pdf',
              fileName: 'document.pdf',
              contentType: 'application/pdf'
            }
          }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: 'asset-456',
          title: 'document.pdf',
          url: 'https://example.com/document.pdf',
          mimeType: 'application/pdf'
        });
      });

      it('handles missing file object', () => {
        const asset = {
          sys: { id: 'asset-789' },
          fields: {
            title: 'Asset Without File'
          }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: 'asset-789',
          title: 'Asset Without File',
          url: undefined,
          mimeType: undefined
        });
      });

      it('handles missing fields object', () => {
        const asset = {
          sys: { id: 'asset-no-fields' }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: 'asset-no-fields',
          title: undefined,
          url: undefined,
          mimeType: undefined
        });
      });

      it('handles missing sys object', () => {
        const asset = {
          fields: {
            title: 'Orphaned Asset',
            file: {
              url: 'https://example.com/orphan.jpg',
              contentType: 'image/jpeg'
            }
          }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: undefined,
          title: 'Orphaned Asset',
          url: 'https://example.com/orphan.jpg',
          mimeType: 'image/jpeg'
        });
      });

      it('handles completely empty asset', () => {
        const asset = {};

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: undefined,
          title: undefined,
          url: undefined,
          mimeType: undefined
        });
      });

      it('handles partial file object', () => {
        const asset = {
          sys: { id: 'asset-partial' },
          fields: {
            title: 'Partial File',
            file: {
              url: 'https://example.com/partial.txt'
              // missing fileName and contentType
            }
          }
        };

        const result = createEmbeddedAssetFromContentful(asset);

        expect(result).toEqual({
          assetId: 'asset-partial',
          title: 'Partial File',
          url: 'https://example.com/partial.txt',
          mimeType: undefined
        });
      });
    });
  });
});