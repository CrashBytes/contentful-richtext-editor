# Contentful Rich Text Editor

A React component that provides a rich text editor compatible with Contentful's Rich Text field type, with automatic configuration based on Contentful field settings.

## Features

- 🔄 **Automatic Configuration**: Reads Contentful field validation settings to automatically enable/disable editor features
- 📝 **Rich Text Support**: Full support for headings, lists, tables, quotes, and text formatting
- 🔗 **Hyperlinks**: Configurable link support with URL validation
- 📎 **Embeds**: Support for embedded entries, assets, and inline entries
- 🎨 **Themes**: Multiple built-in themes (contentful, minimal, default)
- ♿ **Accessibility**: Built with accessibility in mind
- 🔧 **Customizable**: Extensive configuration options and styling hooks
- 📱 **Responsive**: Works well on mobile and desktop
- ⌨️ **Keyboard Shortcuts**: Built-in shortcuts for common actions
- 🔍 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @your-org/contentful-rich-text-editor
# or
yarn add @your-org/contentful-rich-text-editor
```

## Dependencies

This component requires the following peer dependencies:

```bash
npm install react @tiptap/react @tiptap/starter-kit @contentful/rich-text-types
```

## Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { ContentfulRichTextEditor } from '@your-org/contentful-rich-text-editor';
import { Document } from '@contentful/rich-text-types';

function MyEditor() {
  const [content, setContent] = useState<Document>();

  return (
    <ContentfulRichTextEditor
      initialValue={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  );
}
```

### With Contentful Configuration

```tsx
import React, { useEffect, useState } from 'react';
import { 
  ContentfulRichTextEditor,
  fetchContentfulFieldConfig,
  ContentfulFieldConfiguration 
} from '@your-org/contentful-rich-text-editor';

function ContentfulEditor() {
  const [fieldConfig, setFieldConfig] = useState<ContentfulFieldConfiguration>();

  useEffect(() => {
    // Fetch configuration from Contentful Management API
    fetchContentfulFieldConfig(
      'your-space-id',
      'your-content-type-id',
      'your-field-id',
      'your-management-token'
    ).then(setFieldConfig);
  }, []);

  return (
    <ContentfulRichTextEditor
      fieldConfiguration={fieldConfig}
      onChange={(doc) => console.log('Content changed:', doc)}
      onEmbedEntry={handleEmbedEntry}
      onEmbedAsset={handleEmbedAsset}
      placeholder="Start writing..."
    />
  );
}
```

## API Reference

### ContentfulRichTextEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `Document` | `undefined` | Initial Contentful rich text document |
| `onChange` | `(document: Document) => void` | `undefined` | Callback when content changes |
| `onEmbedEntry` | `() => Promise<any>` | `undefined` | Callback for embedding entries |
| `onEmbedAsset` | `() => Promise<any>` | `undefined` | Callback for embedding assets |
| `onEmbedInlineEntry` | `() => Promise<any>` | `undefined` | Callback for embedding inline entries |
| `fieldConfiguration` | `ContentfulFieldConfiguration` | `undefined` | Contentful field validation config |
| `readonly` | `boolean` | `false` | Whether editor is read-only |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `theme` | `'contentful' \| 'minimal' \| 'default'` | `'contentful'` | Editor theme |
| `className` | `string` | `''` | Additional CSS classes |
| `availableHeadings` | `Array<1\|2\|3\|4\|5\|6>` | `[1,2,3,4,5,6]` | Available heading levels (fallback) |
| `availableMarks` | `Array<'bold'\|'italic'\|'underline'>` | `['bold','italic','underline']` | Available text marks (fallback) |
| `disabledFeatures` | `Array<string>` | `[]` | Manually disabled features (fallback) |

### Configuration Types

```tsx
interface ContentfulFieldConfiguration {
  validations?: Array<{
    enabledMarks?: string[];
    enabledNodeTypes?: string[];
  }>;
  settings?: {
    helpText?: string;
  };
}
```

### Supported Node Types

- `paragraph` - Regular paragraphs
- `heading-1` through `heading-6` - Headings
- `unordered-list`, `ordered-list` - Lists
- `blockquote` - Quotes
- `table` - Tables
- `hyperlink` - Links
- `embedded-entry-block` - Block-level entry embeds
- `embedded-asset-block` - Block-level asset embeds
- `embedded-entry-inline` - Inline entry embeds
- `hr` - Horizontal rules

### Supported Marks

- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underlined text
- `code` - Inline code

## Configuration Examples

### Mock Configuration for Testing

```tsx
import { createMockFieldConfig } from '@your-org/contentful-rich-text-editor';

const mockConfig = createMockFieldConfig({
  enabledMarks: ['bold', 'italic'],
  enabledNodeTypes: [
    'paragraph',
    'heading-1',
    'heading-2',
    'unordered-list',
    'hyperlink',
    'embedded-entry-block'
  ]
});

<ContentfulRichTextEditor fieldConfiguration={mockConfig} />
```

### Manual Configuration (Legacy)

```tsx
<ContentfulRichTextEditor
  availableHeadings={[1, 2, 3]}
  availableMarks={['bold', 'italic']}
  disabledFeatures={['table', 'embed']}
/>
```

## Styling

The editor comes with built-in CSS classes that you can override:

```css
/* Main editor container */
.contentful-editor {
  border: 1px solid #d3dce6;
  border-radius: 6px;
}

/* Toolbar */
.contentful-toolbar {
  background: #f7f9fa;
  border-bottom: 1px solid #d3dce6;
}

/* Content area */
.contentful-editor-content {
  padding: 16px;
  min-height: 200px;
}

/* Embedded content */
.contentful-embedded-entry {
  background: #f0f8ff;
  border: 1px dashed #2e75d4;
  padding: 8px;
  border-radius: 4px;
}

/* Inline embedded content */
.contentful-inline-embedded-entry {
  background: #e8f4fd;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
}

/* Tables */
.contentful-table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.contentful-table-header {
  background: #f7f9fa;
  font-weight: 600;
}

/* Lists */
.contentful-bullet-list,
.contentful-ordered-list {
  margin: 1em 0;
  padding-left: 1.5em;
}

/* Quotes */
.contentful-blockquote {
  border-left: 4px solid #2e75d4;
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
}
```

## Advanced Usage

### Custom Embed Handlers

```tsx
const handleEmbedEntry = async () => {
  // Open your entry selector modal/component
  const selectedEntry = await openEntrySelector();
  return {
    sys: { id: selectedEntry.id, type: 'Entry' },
    fields: { title: selectedEntry.title }
  };
};

const handleEmbedAsset = async () => {
  const selectedAsset = await openAssetSelector();
  return {
    sys: { id: selectedAsset.id, type: 'Asset' },
    fields: { 
      title: selectedAsset.title,
      file: { url: selectedAsset.url }
    }
  };
};

const handleEmbedInlineEntry = async () => {
  const selectedEntry = await openInlineEntrySelector();
  return {
    sys: { id: selectedEntry.id, type: 'Entry' },
    fields: { name: selectedEntry.name }
  };
};
```

### Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic  
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + K` - Add link
- `Ctrl/Cmd + Shift + E` - Embed entry
- `Ctrl/Cmd + Shift + A` - Embed asset
- `Ctrl/Cmd + Shift + I` - Embed inline entry
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` / `Ctrl/Cmd + Shift + Z` - Redo

### Content Validation and Analysis

```tsx
import { 
  validateContentfulDocument,
  extractPlainText,
  countWords,
  findEmbeddedContent 
} from '@your-org/contentful-rich-text-editor';

const handleChange = (document: Document) => {
  // Validate document structure
  if (validateContentfulDocument(document)) {
    console.log('Document is valid');
  }
  
  // Extract plain text
  const plainText = extractPlainText(document);
  console.log('Plain text:', plainText);
  
  // Count words
  const wordCount = countWords(document);
  console.log('Word count:', wordCount);
  
  // Find embedded content
  const embedded = findEmbeddedContent(document);
  console.log('Embedded content:', embedded);
  
  saveDocument(document);
};
```

### Content Sanitization

```tsx
import { sanitizeContentfulDocument } from '@your-org/contentful-rich-text-editor';

// Sanitize content based on allowed features
const sanitizedDocument = sanitizeContentfulDocument(
  document,
  ['paragraph', 'heading-1', 'heading-2', 'unordered-list'], // allowed nodes
  ['bold', 'italic'] // allowed marks
);
```

## Environment Variables

For API integration, set these environment variables:

```env
REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_CONTENT_TYPE_ID=your_content_type_id
REACT_APP_CONTENTFUL_FIELD_ID=your_rich_text_field_id
REACT_APP_CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
```

## Utilities

### Configuration Parser

```tsx
import { parseContentfulFieldConfig } from '@your-org/contentful-rich-text-editor';

const config = parseContentfulFieldConfig(fieldConfiguration);
// Returns parsed configuration with boolean flags for each feature
console.log(config.allowHyperlinks); // true/false
console.log(config.availableHeadings); // [1, 2, 3]
console.log(config.disabledFeatures); // ['table', 'embed']
```

### Content Transformation

```tsx
import { 
  contentfulToTiptap, 
  tiptapToContentful 
} from '@your-org/contentful-rich-text-editor';

// Convert between formats
const tiptapContent = contentfulToTiptap(contentfulDocument);
const contentfulContent = tiptapToContentful(tiptapDocument);
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All major types are exported:

```tsx
import type {
  ContentfulRichTextEditorProps,
  ContentfulFieldConfiguration,
  ParsedEditorConfig,
  EmbeddedEntry,
  EmbeddedAsset,
  ContentfulDocument,
  TiptapDocument
} from '@your-org/contentful-rich-text-editor';
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Considerations

- The editor uses React.memo internally for performance optimization
- Large documents (>1000 nodes) may experience slower rendering
- Consider implementing virtualization for very large content
- Use the `readonly` prop when displaying content to improve performance

## Accessibility

The editor is built with accessibility in mind:

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels and descriptions
- High contrast mode support
- Focus management

## Troubleshooting

### Common Issues

1. **Editor not loading**: Check that all peer dependencies are installed
2. **Configuration not applying**: Ensure `fieldConfiguration` prop is properly set
3. **Embed callbacks not working**: Verify that embed handlers return proper Contentful objects
4. **Styling issues**: Check that CSS is properly imported and not conflicting

### Debug Mode

Enable debug logging:

```tsx
// Add to your component
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    window.contentfulEditorDebug = true;
  }
}, []);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/your-org/contentful-rich-text-editor.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Changelog

### v2.0.0 - 2024-01-XX
- ✨ **BREAKING**: Added automatic configuration from Contentful field settings
- ✨ Added support for inline embedded entries
- ✨ Added comprehensive utility functions (sanitization, analysis, validation)
- ✨ Added keyboard shortcuts for embed actions
- ✨ Enhanced TypeScript support with better type definitions
- ✨ Added content analysis utilities (word count, plain text extraction)
- 🔧 Improved accessibility with better ARIA support
- 🔧 Better error handling and validation
- 🔧 Performance optimizations
- 🐛 Fixed link handling in complex nested structures
- 🐛 Fixed table rendering issues
- 🐛 Various bug fixes and improvements

### v1.2.0 - 2023-12-XX
- ✨ Added table support
- ✨ Added themes (minimal, default, contentful)
- 🔧 Improved toolbar layout and responsiveness
- 🐛 Fixed undo/redo functionality

### v1.1.0 - 2023-11-XX
- ✨ Added embedded assets support
- ✨ Added link functionality
- 🔧 Improved content transformation
- 🐛 Fixed list nesting issues

### v1.0.0 - 2023-10-XX
- 🎉 Initial release
- ✨ Basic rich text editing
- ✨ Contentful document format support
- ✨ Embedded entries support
- ✨ Manual configuration options

## Support

For support, please:

1. Check the [documentation](https://github.com/your-org/contentful-rich-text-editor/docs)
2. Search [existing issues](https://github.com/your-org/contentful-rich-text-editor/issues)
3. Create a [new issue](https://github.com/your-org/contentful-rich-text-editor/issues/new) with detailed information

## Related Projects

- [@contentful/rich-text-renderer](https://github.com/contentful/rich-text) - Official Contentful rich text renderer
- [@tiptap/react](https://tiptap.dev/) - The underlying editor framework
- [Contentful Management API](https://www.contentful.com/developers/docs/references/content-management-api/) - For fetching field configurations