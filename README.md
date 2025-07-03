# Contentful Rich Text Editor

A modern, Tiptap-based rich text editor that's fully compatible with Contentful's rich text format. Provides the same editing experience as Contentful's native editor while maintaining perfect compatibility with Contentful's document structure.

## ✨ Features

- ✅ **Full Contentful Compatibility** - Seamless conversion between Contentful and Tiptap formats
- ✅ **Automatic Configuration** - Reads Contentful field settings to auto-configure the editor *(NEW in v2.0)*
- ✅ **Modern UI** - Clean, intuitive interface matching Contentful's design  
- ✅ **TypeScript Support** - Complete type safety with Contentful's rich text types
- ✅ **Extensible** - Built on Tiptap v2 for easy customization
- ✅ **Lightweight** - Tree-shakeable, only import what you need
- ✅ **Responsive** - Works on desktop and mobile devices
- ✅ **Keyboard Shortcuts** - Built-in shortcuts for common actions *(NEW in v2.0)*

### Supported Features

- **Text Formatting**: Bold, italic, underline
- **Headings**: H1 through H6  
- **Lists**: Ordered and unordered lists
- **Links**: Hyperlinks with URL validation
- **Tables**: Full table support with headers
- **Quotes**: Blockquotes
- **Embedded Content**: Callbacks for Contentful entries and assets
- **Inline Entries**: Support for inline embedded entries *(NEW in v2.0)*
- **Undo/Redo**: Full history support

## 📦 Installation

```bash
npm install @crashbytes/contentful-richtext-editor
```

## 🚀 Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { ContentfulRichTextEditor } from '@crashbytes/contentful-richtext-editor';
import '@crashbytes/contentful-richtext-editor/dist/index.css';
import { Document } from '@contentful/rich-text-types';

function App() {
  const [content, setContent] = useState<Document>();

  const handleChange = (document: Document) => {
    setContent(document);
    console.log('Contentful document:', document);
  };

  return (
    <div>
      <h1>My Rich Text Editor</h1>
      <ContentfulRichTextEditor
        placeholder="Start writing your content..."
        onChange={handleChange}
        initialValue={content}
      />
    </div>
  );
}

export default App;
```

### Automatic Configuration (NEW in v2.0)

The editor can automatically configure itself based on your Contentful field settings:

```tsx
import { 
  ContentfulRichTextEditor,
  fetchContentfulFieldConfig 
} from '@crashbytes/contentful-richtext-editor';
import '@crashbytes/contentful-richtext-editor/dist/index.css';

function AutoConfiguredEditor() {
  const [fieldConfig, setFieldConfig] = useState();

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
      placeholder="Auto-configured based on Contentful settings!"
      onChange={handleChange}
    />
  );
}
```

### Advanced Usage with Embeds

```tsx
import { ContentfulRichTextEditor } from '@crashbytes/contentful-richtext-editor';
import '@crashbytes/contentful-richtext-editor/dist/index.css';

function ContentfulEditor() {
  const handleEmbedEntry = async () => {
    // Your logic to select a Contentful entry
    const entry = await openEntrySelector();
    return entry;
  };

  const handleEmbedAsset = async () => {
    // Your logic to select a Contentful asset  
    const asset = await openAssetSelector();
    return asset;
  };

  const handleEmbedInlineEntry = async () => {
    // NEW v2.0 - Your logic to select an inline entry
    const entry = await openInlineEntrySelector();
    return entry;
  };

  return (
    <ContentfulRichTextEditor
      placeholder="Write your travel tip..."
      onChange={(doc) => saveToContentful(doc)}
      onEmbedEntry={handleEmbedEntry}
      onEmbedAsset={handleEmbedAsset}
      onEmbedInlineEntry={handleEmbedInlineEntry}
      theme="contentful"
    />
  );
}
```

### Minimal Configuration

```tsx
<ContentfulRichTextEditor
  placeholder="Simple editor..."
  disabledFeatures={['table', 'embed', 'quote']}
  theme="minimal"
  readonly={false}
  showBorder={false}
  onChange={handleChange}
/>
```

### With Initial Content

```tsx
import { createEmptyDocument } from '@crashbytes/contentful-richtext-editor';

const initialContent = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph', 
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello world!',
          marks: [{ type: 'bold' }],
          data: {}
        }
      ]
    }
  ]
};

<ContentfulRichTextEditor
  initialValue={initialContent}
  onChange={handleChange}
/>
```

## 📋 API Reference

### ContentfulRichTextEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `availableHeadings` | `Array<1\|2\|3\|4\|5\|6>` | `[1,2,3,4,5,6]` | Available heading levels (fallback when no fieldConfiguration) |
| `availableMarks` | `Array<'bold'\|'italic'\|'underline'>` | `['bold','italic','underline']` | Available text formatting marks (fallback when no fieldConfiguration) |
| `className` | `string` | `''` | Additional CSS classes |
| `disabledFeatures` | `Array<string>` | `[]` | Features to disable |
| `fieldConfiguration` | `ContentfulFieldConfiguration` | `undefined` | **NEW v2.0** - Contentful field validation config (takes precedence over manual settings) |
| `initialValue` | `Document` | `undefined` | Initial Contentful rich text document |
| `onChange` | `(document: Document) => void` | `undefined` | Callback when content changes |
| `onEmbedAsset` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful assets |
| `onEmbedEntry` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful entries |
| `onEmbedInlineEntry` | `() => Promise<any> \| void` | `undefined` | **NEW v2.0** - Callback for embedding inline entries |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `readonly` | `boolean` | `false` | Whether editor is read-only |
| `showBorder` | `boolean` | `true` | Whether to show border around the editor |
| `theme` | `'default' \| 'minimal' \| 'contentful'` | `'contentful'` | Visual theme |

### Disabled Features

You can disable specific features by passing them in the `disabledFeatures` array:

- `'bold'` - Bold text formatting
- `'italic'` - Italic text formatting  
- `'underline'` - Underline text formatting
- `'link'` - Hyperlinks
- `'lists'` - Ordered and unordered lists
- `'headings'` - All heading levels
- `'quote'` - Blockquotes
- `'table'` - Tables
- `'embed'` - Embedded content

### Configuration Types (NEW v2.0)

```tsx
interface ContentfulFieldConfiguration {
  validations?: Array<{
    enabledMarks?: string[];        // ['bold', 'italic', 'underline', 'code']
    enabledNodeTypes?: string[];    // ['paragraph', 'heading-1', 'unordered-list', ...]
  }>;
  settings?: {
    helpText?: string;
  };
}
```

## 🛠️ Utility Functions

```tsx
import {
  contentfulToTiptap,
  tiptapToContentful,
  validateContentfulDocument,
  createEmptyDocument,
  extractPlainText,        // NEW v2.0
  countWords,             // NEW v2.0
  findEmbeddedContent,    // NEW v2.0
  sanitizeContentfulDocument // NEW v2.0
} from '@crashbytes/contentful-richtext-editor';

// Convert between formats
const tiptapJson = contentfulToTiptap(contentfulDocument);
const contentfulDoc = tiptapToContentful(tiptapJson);

// Validation
const isValid = validateContentfulDocument(someDocument);

// Create empty document
const emptyDoc = createEmptyDocument();

// NEW v2.0 - Content analysis
const plainText = extractPlainText(contentfulDocument);
const wordCount = countWords(contentfulDocument);
const embedded = findEmbeddedContent(contentfulDocument);

// NEW v2.0 - Sanitize content
const sanitized = sanitizeContentfulDocument(
  document,
  ['paragraph', 'heading-1', 'unordered-list'], // allowed nodes
  ['bold', 'italic'] // allowed marks
);
```

## ⌨️ Keyboard Shortcuts (NEW v2.0)

- `Cmd/Ctrl + B` - Bold
- `Cmd/Ctrl + I` - Italic
- `Cmd/Ctrl + U` - Underline
- `Cmd/Ctrl + K` - Add/edit link
- `Cmd/Ctrl + Shift + E` - Embed entry
- `Cmd/Ctrl + Shift + A` - Embed asset
- `Cmd/Ctrl + Shift + I` - Embed inline entry
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Y` / `Cmd/Ctrl + Shift + Z` - Redo

## 🎨 Styling

The editor comes with default styles that match Contentful's design. Import the CSS:

```tsx
import '@crashbytes/contentful-richtext-editor/dist/index.css';
```

You can override the default styles by targeting the CSS classes:

```css
.contentful-editor {
  border: 2px solid #your-color;
}

.contentful-toolbar {
  background: #your-background;
}

.contentful-editor-content {
  font-family: 'Your Font', sans-serif;
}

/* NEW v2.0 - Inline entries */
.contentful-inline-embedded-entry {
  background: #e8f4fd;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
}
```

### Themes

**`contentful`** (default)  
Matches Contentful's native editor appearance.

**`minimal`**  
Clean, minimal design with reduced visual elements.

**`default`**  
Standard rich text editor appearance with serif fonts.

## ⚛️ Next.js Integration

```tsx
// pages/editor.tsx or app/editor/page.tsx
import dynamic from 'next/dynamic';

const ContentfulEditor = dynamic(
  () => import('@crashbytes/contentful-richtext-editor').then(mod => mod.ContentfulRichTextEditor),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div>
      <ContentfulEditor
        placeholder="Write something amazing..."
        onChange={(doc) => console.log(doc)}
      />
    </div>
  );
}
```

## 🔷 TypeScript Support

This package is written in TypeScript and includes full type definitions. All Contentful rich text types are re-exported for convenience:

```tsx
import type {
  Document,
  Block,
  Inline,
  Text,
  ContentfulRichTextEditorProps,
  ContentfulFieldConfiguration,    // NEW v2.0
  ParsedEditorConfig              // NEW v2.0
} from '@crashbytes/contentful-richtext-editor';
```

## 🌐 Browser Support

- Chrome 80+
- Firefox 78+
- Safari 13+
- Edge 80+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [CrashBytes](https://github.com/CrashBytes)

## 🔗 Related Packages

- [@contentful/rich-text-react-renderer](https://www.npmjs.com/package/@contentful/rich-text-react-renderer) - For rendering Contentful rich text
- [@contentful/rich-text-types](https://www.npmjs.com/package/@contentful/rich-text-types) - Contentful rich text type definitions  
- [@tiptap/react](https://www.npmjs.com/package/@tiptap/react) - The underlying editor framework

---

Made with ❤️ for the Contentful community