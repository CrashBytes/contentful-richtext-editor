# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.4] - 2025-07-01

### Added
- `showBorder` prop to control editor border visibility (defaults to `true` for backward compatibility)
- CSS class `contentful-editor--borderless` for borderless styling
- Enhanced styling flexibility for custom layouts and theming

### Changed
- Improved editor wrapper styling logic to support conditional borders
- Updated CSS to better handle borderless editor configurations

### Fixed
- Resolved package publishing issues from previous versions
- Cleaned up problematic releases (2.0.1, 2.0.2, 2.0.3)

## [2.0.0] - 2025-06-29

### Added
- Initial major release with full Contentful rich text compatibility
- Modern Tiptap-based editor implementation
- Complete TypeScript support
- Configurable features and themes
- Toolbar with comprehensive formatting options
- Support for headings, lists, tables, quotes, and links
- Contentful entry and asset embedding capabilities
- Three built-in themes: contentful, minimal, and default

### Features
- **Full Contentful Compatibility** - Seamless conversion between formats
- **Modern UI** - Clean interface matching Contentful's design
- **Extensible** - Built on Tiptap v2 for customization
- **Lightweight** - Tree-shakeable imports
- **Responsive** - Works on desktop and mobile devices