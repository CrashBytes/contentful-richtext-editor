// Main editor component
export { ContentfulRichTextEditor } from './components/ContentfulEditor';
export type { ContentfulRichTextEditorProps } from './components/ContentfulEditor';

// Toolbar component
export { ContentfulToolbar } from './components/Toolbar';

// Contentful transform utilities
export { 
  contentfulToTiptap, 
  tiptapToContentful, 
  validateContentfulDocument,
  createEmptyDocument,
  sanitizeContentfulDocument,
  extractPlainText,
  countWords,
  findEmbeddedContent
} from './utils/contentfulTransform';

// Configuration parser utilities
export {
  parseContentfulFieldConfig,
  fetchContentfulFieldConfig,
  createMockFieldConfig,
} from './utils/configParser';

// Type exports
export type { 
  ContentfulEditorTheme,
  EmbeddedEntry,
  EmbeddedAsset,
  ContentfulFieldValidation,
  ContentfulFieldConfiguration,
  ParsedEditorConfig,
  EditorFeatureConfig,
  ContentfulNode,
  ContentfulText,
  ContentfulDocument,
  TiptapNode,
  TiptapDocument,
  EditorState,
  OnChangeCallback,
  OnEmbedCallback,
  ThemeConfig,
  ValidationRule,
  FieldValidationConfig,
  LocalizationConfig,
  A11yConfig,
  AdvancedEditorConfig,
  PluginConfig,
  DeepPartial,
  RequiredFields,
  OptionalFields,
} from './utils/types';

// Re-export commonly used Contentful rich text types for convenience
export type { Document, Block, Inline, Text } from '@contentful/rich-text-types';
export { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';