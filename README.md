# @crashbytes/contentful-richtext-editor

A modern, Tiptap-based rich text editor that's fully compatible with Contentful's rich text format. Provides the same editing experience as Contentful's native editor while maintaining perfect compatibility with Contentful's document structure.

## Features

- ✅ **Full Contentful Compatibility** - Seamless conversion between Contentful and Tiptap formats  
- ✅ **Modern UI** - Clean, intuitive interface matching Contentful's design  
- ✅ **TypeScript Support** - Complete type safety with Contentful's rich text types  
- ✅ **Extensible** - Built on Tiptap v2 for easy customization  
- ✅ **Lightweight** - Tree-shakeable, only import what you need  
- ✅ **Responsive** - Works on desktop and mobile devices  

## Supported Features

- **Text Formatting**: Bold, italic, underline
- **Headings**: H1 through H6
- **Lists**: Ordered and unordered lists
- **Links**: Hyperlinks with URL validation
- **Tables**: Full table support with headers
- **Quotes**: Blockquotes
- **Embedded Content**: Callbacks for Contentful entries and assets
- **Undo/Redo**: Full history support

## Installation

    npm install @crashbytes/contentful-richtext-editor

## Basic Usage

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

## Advanced Usage

### With Contentful Entry/Asset Embedding

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

      return (
        <ContentfulRichTextEditor
          placeholder="Write your travel tip..."
          onChange={(doc) => saveToContentful(doc)}
          onEmbedEntry={handleEmbedEntry}
          onEmbedAsset={handleEmbedAsset}
          theme="contentful"
        />
      );
    }

### Customizing Features

    <ContentfulRichTextEditor
      placeholder="Simple editor..."
      disabledFeatures={['table', 'embed', 'quote']}
      theme="minimal"
      readonly={false}
      onChange={handleChange}
    />

### With Initial Content

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

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `Document` | `undefined` | Initial Contentful rich text document |
| `onChange` | `(document: Document) => void` | `undefined` | Callback when content changes |
| `onEmbedEntry` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful entries |
| `onEmbedAsset` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful assets |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `readonly` | `boolean` | `false` | Whether editor is read-only |
| `className` | `string` | `''` | Additional CSS classes |
| `theme` | `'default' \| 'minimal' \| 'contentful'` | `'contentful'` | Visual theme |
| `disabledFeatures` | `Array<string>` | `[]` | Features to disable |

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

### Utility Functions

    import { 
      contentfulToTiptap, 
      tiptapToContentful,
      validateContentfulDocument,
      createEmptyDocument 
    } from '@crashbytes/contentful-richtext-editor';

    // Convert between formats
    const tiptapJson = contentfulToTiptap(contentfulDocument);
    const contentfulDoc = tiptapToContentful(tiptapJson);

    // Validation
    const isValid = validateContentfulDocument(someDocument);

    // Create empty document
    const emptyDoc = createEmptyDocument();

## Styling

The editor comes with default styles that match Contentful's design. Import the CSS:

    import '@crashbytes/contentful-richtext-editor/dist/index.css';

### Custom Styling

You can override the default styles by targeting the CSS classes:

    .contentful-editor {
      border: 2px solid #your-color;
    }

    .contentful-toolbar {
      background: #your-background;
    }

    .contentful-editor-content {
      font-family: 'Your Font', sans-serif;
    }

## Themes

### Contentful Theme (Default)
Matches Contentful's native editor appearance.

### Minimal Theme
Clean, minimal design with reduced visual elements.

### Default Theme  
Standard rich text editor appearance with serif fonts.

## Integration with Next.js

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

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All Contentful rich text types are re-exported for convenience:

    import type { 
      Document, 
      Block, 
      Inline, 
      Text,
      ContentfulRichTextEditorProps 
    } from '@crashbytes/contentful-richtext-editor';

## Browser Support

- Chrome 80+
- Firefox 78+
- Safari 13+
- Edge 80+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [CrashBytes](https://github.com/CrashBytes)

## Related Packages

- [@contentful/rich-text-react-renderer](https://www.npmjs.com/package/@contentful/rich-text-react-renderer) - For rendering Contentful rich text
- [@contentful/rich-text-types](https://www.npmjs.com/package/@contentful/rich-text-types) - Contentful rich text type definitions
- [@tiptap/react](https://www.npmjs.com/package/@tiptap/react) - The underlying editor framework

---

**Made with ❤️ for the Contentful community**