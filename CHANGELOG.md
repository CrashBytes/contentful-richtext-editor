# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.11](https://github.com/CrashBytes/contentful-richtext-editor/compare/v1.0.10...v1.0.11) (2025-07-01)

### Added
- 🎨 Optional border control with `showBorder` prop (defaults to `true` for backward compatibility)

### Fixed
- Improved styling flexibility for borderless editor layouts


## [1.0.10] - 2024-01-15

### Added
- 🔄 Automatic configuration from Contentful field settings
- 📎 Support for inline embedded entries
- ⌨️ Keyboard shortcuts for embed actions
- 🔍 Enhanced TypeScript support
- 📊 Content analysis utilities (word count, plain text extraction)

### Changed
- **BREAKING**: `fieldConfiguration` prop now takes precedence over manual settings
- Improved toolbar layout and responsiveness
- Better accessibility with ARIA support

### Fixed
- Link handling in complex nested structures
- Table rendering issues
- Various TypeScript compilation warnings

### Removed
- Deprecated `legacyMode` prop

## [1.0.10] - 2024-01-10

### Fixed
- TypeScript compilation errors
- Build process improvements

## [1.0.9] - 2024-01-05

### Added
- Basic embedded assets support
- Link functionality

### Fixed
- List nesting issues