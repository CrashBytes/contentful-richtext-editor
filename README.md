# @crashbytes/contentful-richtext-editor

[![npm version](https://img.shields.io/npm/v/@crashbytes/contentful-richtext-editor.svg)](https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor)
[![npm downloads](https://img.shields.io/npm/dm/@crashbytes/contentful-richtext-editor.svg)](https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security Audit](https://github.com/CrashBytes/contentful-richtext-editor/actions/workflows/security-audit.yml/badge.svg)](https://github.com/CrashBytes/contentful-richtext-editor/actions/workflows/security-audit.yml)
[![React Compatibility](https://github.com/CrashBytes/contentful-richtext-editor/actions/workflows/react-compat.yml/badge.svg)](https://github.com/CrashBytes/contentful-richtext-editor/actions/workflows/react-compat.yml)
[![npm package provenance](https://img.shields.io/badge/provenance-tracked-brightgreen)](https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor)

A modern, Tiptap v3-based rich text editor that's fully compatible with Contentful's rich text format. Provides the same editing experience as Contentful's native editor while maintaining perfect compatibility with Contentful's document structure.

## 🔒 Security & Trust

- ✅ **Zero Known Vulnerabilities** - Automated security audits via Dependabot
- ✅ **Supply Chain Security** - Package published with npm provenance via Trusted Publishing
- ✅ **CodeQL Analysis** - Continuous security scanning for vulnerabilities
- ✅ **React 18 & 19 Compatible** - Automated compatibility testing
- ✅ **Dependency Review** - Automated PR checks for vulnerable dependencies

See our [Security Policy](SECURITY.md) for vulnerability reporting.

## ✨ Features

- ✅ **Full Contentful Compatibility** - Seamless conversion between Contentful and Tiptap formats
- ✅ **Tiptap v3** - Built on the latest Tiptap v3 for better performance
- ✅ **Modern UI** - Clean, intuitive interface matching Contentful's design
- ✅ **TypeScript Support** - Complete type safety with Contentful's rich text types
- ✅ **Extensible** - Built on Tiptap v3 for easy customization
- ✅ **Lightweight** - Tree-shakeable, only import what you need
- ✅ **Responsive** - Works on desktop and mobile devices
- ✅ **Optional Border Control** - Customize editor appearance with `showBorder` prop

## 🚀 Installation

```bash
npm install @crashbytes/contentful-richtext-editor
```

**Peer Dependencies:**
- React 18.3.1+ or React 19.x
- React DOM 18.3.1+ or React 19.x

## 📖 Quick Start

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
        showBorder={true} // Optional: control border visibility
      />
    </div>
  );
}

export default App;
```

## 🎨 Border Control

Control the editor's border appearance with the `showBorder` prop:

```tsx
// Default - with border (backward compatible)
<ContentfulRichTextEditor />

// Borderless editor for custom layouts
<ContentfulRichTextEditor 
  showBorder={false}
  className="my-custom-editor"
/>

// Themed borderless editor
<ContentfulRichTextEditor 
  showBorder={false}
  theme="minimal"
/>
```

### Custom Styling with Borderless Mode

```css
/* Custom styling for borderless editor */
.my-custom-editor {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.my-custom-editor .contentful-toolbar {
  background: linear-gradient(45deg, #667eea, #764ba2);
}
```

## 🎯 Supported Features

- **Text Formatting**: Bold, italic, underline
- **Headings**: H1 through H6
- **Lists**: Ordered and unordered lists
- **Links**: Hyperlinks with URL validation
- **Tables**: Full table support with headers
- **Quotes**: Blockquotes
- **Embedded Content**: Callbacks for Contentful entries and assets
- **Undo/Redo**: Full history support

## 🔧 Advanced Usage

### With Contentful Integration

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

  return (
    <ContentfulRichTextEditor
      placeholder="Write your travel tip..."
      onChange={(doc) => saveToContentful(doc)}
      onEmbedEntry={handleEmbedEntry}
      onEmbedAsset={handleEmbedAsset}
      theme="contentful"
      showBorder={true}
    />
  );
}
```

### Customized Editor

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

## 📋 Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBorder` | `boolean` | `true` | Control editor border visibility |
| `initialValue` | `Document` | `undefined` | Initial Contentful rich text document |
| `onChange` | `(document: Document) => void` | `undefined` | Callback when content changes |
| `onEmbedEntry` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful entries |
| `onEmbedAsset` | `() => Promise<any> \| void` | `undefined` | Callback for embedding Contentful assets |
| `onEmbedInlineEntry` | `() => Promise<any> \| void` | `undefined` | Callback for embedding inline entries |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `readonly` | `boolean` | `false` | Whether editor is read-only |
| `className` | `string` | `''` | Additional CSS classes |
| `theme` | `'default' \| 'minimal' \| 'contentful'` | `'contentful'` | Visual theme |
| `disabledFeatures` | `Array<string>` | `[]` | Features to disable |
| `availableHeadings` | `Array<1 \| 2 \| 3 \| 4 \| 5 \| 6>` | `[1,2,3,4,5,6]` | Available heading levels |
| `availableMarks` | `Array<'bold' \| 'italic' \| 'underline'>` | `['bold','italic','underline']` | Available text formatting |

## 🚫 Disabling Features

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

## 🛠️ Utility Functions

```tsx
import {
  contentfulToTiptap,
  tiptapToContentful,
  validateContentfulDocument,
  createEmptyDocument,
  extractPlainText,
  countWords,
  findEmbeddedContent
} from '@crashbytes/contentful-richtext-editor';

// Convert between formats
const tiptapJson = contentfulToTiptap(contentfulDocument);
const contentfulDoc = tiptapToContentful(tiptapJson);

// Validation and utilities
const isValid = validateContentfulDocument(someDocument);
const emptyDoc = createEmptyDocument();
const plainText = extractPlainText(document);
const wordCount = countWords(document);
const embedded = findEmbeddedContent(document);
```

## 🎨 Styling

The editor comes with default styles that match Contentful's design. Import the CSS:

```tsx
import '@crashbytes/contentful-richtext-editor/dist/index.css';
```

### Custom Styling

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

/* Borderless editor styling */
.contentful-editor--borderless {
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Themes

**Contentful** (default)
Matches Contentful's native editor appearance.

**Minimal**  
Clean, minimal design with reduced visual elements.

**Default**
Standard rich text editor appearance with serif fonts.

## 🌐 Next.js Usage

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
        showBorder={false}
      />
    </div>
  );
}
```

## 📝 TypeScript Support

This package is written in TypeScript and includes full type definitions. All Contentful rich text types are re-exported for convenience:

```tsx
import type {
  Document,
  Block,
  Inline,
  Text,
  ContentfulRichTextEditorProps
} from '@crashbytes/contentful-richtext-editor';
```

## 🌐 Browser Support

- Chrome 80+
- Firefox 78+
- Safari 13+
- Edge 80+

## 🔄 Migration

### From v2.x to v3.0.0

**Good News:** The public API is unchanged! Upgrade with no code changes:

```bash
npm install @crashbytes/contentful-richtext-editor@latest
```

Your existing code continues to work:

```tsx
// This still works exactly the same
<ContentfulRichTextEditor
  placeholder="Start writing..."
  onChange={handleChange}
  initialValue={content}
/>
```

**What Changed:** Internal upgrade to Tiptap v3 provides:
- Better performance
- Improved mobile support
- Enhanced transaction handling
- More efficient rendering

See [CHANGELOG.md](CHANGELOG.md) for complete details.

### From v2.0.3 to v2.0.4+
No breaking changes! Simply update and optionally use the new `showBorder` prop.

## 🔒 Security

We take security seriously. This package:

- ✅ **Automated Security Audits** - Weekly npm audit via GitHub Actions
- ✅ **Dependabot** - Automated dependency updates for security patches
- ✅ **CodeQL Analysis** - Advanced security vulnerability scanning
- ✅ **Dependency Review** - Automated checks on every PR
- ✅ **Trusted Publishing** - Package published with cryptographic provenance
- ✅ **Supply Chain Verification** - npm provenance proves package source

**Found a vulnerability?** Please report it via our [Security Policy](SECURITY.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

All PRs automatically run:
- Security audits
- Dependency vulnerability checks
- React 18 & 19 compatibility tests
- Full test suite (175 tests)

## 📄 License

MIT © [CrashBytes](https://github.com/CrashBytes)

## 🔗 Related Packages

- [@contentful/rich-text-react-renderer](https://www.npmjs.com/package/@contentful/rich-text-react-renderer) - For rendering Contentful rich text
- [@contentful/rich-text-types](https://www.npmjs.com/package/@contentful/rich-text-types) - Contentful rich text type definitions  
- [@tiptap/react](https://www.npmjs.com/package/@tiptap/react) - The underlying editor framework (v3)

## 📈 Version History

- **v3.0.0** - Upgraded to Tiptap v3.15.3, added security enhancements
- **v2.0.6** - Dependency updates, bug fixes
- **v2.0.4** - Added optional border control with `showBorder` prop
- **v2.0.3** - Package made publicly accessible
- **v2.0.0** - Major feature update with automatic configuration
- **v1.x** - Initial releases

---

Made with ❤️ for the Contentful community
