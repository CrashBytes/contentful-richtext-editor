# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-01-14

### BREAKING CHANGES
- Upgraded to Tiptap v3.15.3 (from v2.27.2)
- `editor.commands.setContent` API changed:
  - Old: `editor.commands.setContent(content, false)`
  - New: `editor.commands.setContent(content, { emitUpdate: false })`
- Internal extension structure updated to match Tiptap v3 APIs

### Changed
- All Tiptap dependencies upgraded to v3.15.3:
  - `@tiptap/react`
  - `@tiptap/starter-kit`  
  - `@tiptap/extension-link`
  - `@tiptap/extension-table`
  - `@tiptap/extension-table-cell`
  - `@tiptap/extension-table-header`
  - `@tiptap/extension-table-row`
  - `@tiptap/extension-text-style`
  - `@tiptap/extension-underline`
  - `@tiptap/pm`
- Updated test mocks to match Tiptap v3 extension structure
- Improved editor performance and reliability

### Security
- Zero known vulnerabilities (npm audit clean)
- All 175 tests passing

### Migration Guide
If you're upgrading from v2.x, the public API remains the same. No changes needed to your component usage:

```jsx
// Your existing code continues to work
<ContentfulRichTextEditor
  placeholder="Start writing..."
  onChange={handleChange}
  initialValue={content}
/>
```

The internal Tiptap v3 upgrade provides better performance, improved mobile support, and enhanced transaction handling. See [Tiptap v3 release notes](https://tiptap.dev/docs/resources/whats-new) for details on improvements.

## [2.0.6] - 2026-01-14

### Changed
- Update all Tiptap packages from ^2.0.0 to ^2.27.2
- Update @contentful/rich-text-types to ^16.8.5
- Update devDependencies (jest, testing-library, storybook)

### Fixed
- Fix duplicate disabled features using Set instead of Array
- Fix embed handler conditionals to check callback existence
- Improve TypeScript typing in tests with Document assertions
- Update test mocks to match new conditional embed logic

## [2.0.4] - 2025-07-01

### Added
- `showBorder` prop to control editor border visibility (defaults to `true`)
- Improved styling flexibility for borderless layouts

### Usage
```jsx
// Borderless editor
<ContentfulRichTextEditor showBorder={false} />
```

## [2.0.3] - 2025-06-28

### Fixed
- Improved editor initialization and content synchronization
- Better handling of initialValue prop updates
- Enhanced type safety for Document types

## [2.0.2] - 2025-06-25

### Fixed
- Fixed toolbar conditional rendering for embed features
- Improved disabled features configuration handling
- Enhanced test coverage for edge cases

## [2.0.1] - 2025-06-20

### Fixed
- Fixed TypeScript build configuration
- Improved package exports

## [2.0.0] - 2025-06-15

### BREAKING CHANGES
- Complete rewrite with improved architecture
- New prop structure (see documentation)
- Updated Contentful compatibility layer

### Added
- Full TypeScript support
- Comprehensive test suite
- Improved documentation
- Theme support (default, minimal, contentful)
- Field configuration support

### Changed
- Modernized codebase with React hooks
- Improved performance
- Better error handling

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Basic Contentful rich text editing
- Tiptap v2 integration
