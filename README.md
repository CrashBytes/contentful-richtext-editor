# Release v2.0.0 - Major Feature Update 🎉

## 🚀 What's New

This major release introduces **automatic configuration** from Contentful field settings, significantly enhancing the developer experience and ensuring your editor UI always matches your Contentful configuration.

### ✨ Major New Features

- **🔄 Automatic Contentful Configuration**: The editor now reads your Contentful field validation settings and automatically enables/disables toolbar features
- **📝 Inline Entry Support**: Added support for inline embedded entries (as configured in Contentful)
- **⌨️ Keyboard Shortcuts**: Built-in shortcuts for common actions (`Cmd/Ctrl + Shift + E` for entries, `Cmd/Ctrl + Shift + A` for assets, etc.)
- **🔍 Enhanced TypeScript Support**: Comprehensive type definitions and better developer experience
- **📊 Content Analysis Utilities**: New utilities for word counting, plain text extraction, and content validation

### 🔧 Enhanced Features

- **Smart Toolbar**: Toolbar buttons now appear/disappear based on your Contentful field configuration
- **Better Error Handling**: Improved error messages and validation
- **Performance Optimizations**: Faster rendering and better memory usage
- **Accessibility Improvements**: Enhanced ARIA support and keyboard navigation

### 🎨 Developer Experience

- **Configuration Parser**: New utility to parse Contentful field settings
- **Mock Configuration**: Easy testing with `createMockFieldConfig()`
- **Backward Compatibility**: Existing manual configuration still works
- **Comprehensive Documentation**: Updated with examples and API reference

## 🛠️ Installation

```bash
npm install @crashbytes/contentful-richtext-editor@2.0.0
```

## 🔄 Migration from v1.x

### Automatic Configuration (Recommended)
```tsx
// Before (v1.x)
<ContentfulRichTextEditor
  availableHeadings={[1, 2, 3]}
  availableMarks={['bold', 'italic']}
  disabledFeatures={['table']}
/>

// After (v2.x) - Automatically configured!
<ContentfulRichTextEditor
  fieldConfiguration={contentfulFieldConfig}
  onEmbedInlineEntry={handleInlineEntry} // New!
/>
```

### New Props Available
```tsx
interface ContentfulRichTextEditorProps {
  // New in v2.0
  fieldConfiguration?: ContentfulFieldConfiguration;
  onEmbedInlineEntry?: () => Promise<any> | void;
  
  // Existing props still work (backward compatible)
  availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  availableMarks?: Array<'bold' | 'italic' | 'underline'>;
  disabledFeatures?: Array<string>;
}
```

### Fetching Configuration from Contentful
```tsx
import { fetchContentfulFieldConfig } from '@crashbytes/contentful-richtext-editor';

const fieldConfig = await fetchContentfulFieldConfig(
  'space-id',
  'content-type-id',
  'field-id',
  'management-token'
);
```

## 📋 New Utilities

### Content Analysis
```tsx
import { 
  extractPlainText, 
  countWords, 
  findEmbeddedContent,
  sanitizeContentfulDocument 
} from '@crashbytes/contentful-richtext-editor';

const plainText = extractPlainText(document);
const wordCount = countWords(document);
const embedded = findEmbeddedContent(document);
```

### Configuration Management
```tsx
import { 
  parseContentfulFieldConfig,
  createMockFieldConfig 
} from '@crashbytes/contentful-richtext-editor';

// Parse Contentful config
const parsed = parseContentfulFieldConfig(fieldConfig);

// Create mock for testing
const mockConfig = createMockFieldConfig({
  enabledMarks: ['bold', 'italic'],
  enabledNodeTypes: ['paragraph', 'heading-1', 'unordered-list']
});
```

## ⌨️ New Keyboard Shortcuts

- `Cmd/Ctrl + Shift + E` - Embed entry
- `Cmd/Ctrl + Shift + A` - Embed asset  
- `Cmd/Ctrl + Shift + I` - Embed inline entry
- `Cmd/Ctrl + K` - Add/edit link
- Standard formatting shortcuts (Bold, Italic, Underline)

## 🐛 Bug Fixes

- Fixed TypeScript compilation warnings
- Improved link handling in complex nested structures
- Fixed table rendering issues
- Better handling of embedded content transformation
- Resolved build process issues

## 🔧 Technical Improvements

- **Build System**: Improved Rollup configuration
- **Type Safety**: Better TypeScript definitions throughout
- **Performance**: Optimized re-renders and memory usage
- **Code Quality**: Enhanced error boundaries and validation

## 📚 Documentation

- **Complete API Reference**: Full documentation of all props and methods
- **Usage Examples**: 5 different implementation examples
- **Migration Guide**: Step-by-step upgrade instructions
- **TypeScript Support**: Full type definitions and examples

## 🎯 What's Next

We're already working on v2.1 with:
- Real-time collaboration support
- Advanced table editing features
- Plugin system for custom extensions
- More keyboard shortcuts and accessibility improvements

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📖 Full Documentation

- [README](README.md) - Complete setup and usage guide
- [API Reference](docs/API.md) - Detailed prop and method documentation
- [Examples](examples/) - Implementation examples
- [Changelog](CHANGELOG.md) - Complete version history

## 🔗 Links

- **GitHub**: https://github.com/your-org/contentful-richtext-editor
- **npm**: https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor
- **Issues**: https://github.com/your-org/contentful-richtext-editor/issues
- **Discussions**: https://github.com/your-org/contentful-richtext-editor/discussions

## 💝 Acknowledgments

Special thanks to:
- The Contentful team for their excellent Rich Text API
- The TipTap team for the amazing editor framework
- All early adopters and contributors who provided feedback

---

**Full Changelog**: https://github.com/your-org/contentful-richtext-editor/compare/v1.0.10...v2.0.0

**Happy editing! 🎉**