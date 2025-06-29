// Utility functions for parsing Contentful Rich Text field configurations

export interface ContentfulFieldValidation {
  enabledMarks?: string[];
  enabledNodeTypes?: string[];
}

export interface ContentfulFieldConfiguration {
  validations?: ContentfulFieldValidation[];
  settings?: {
    helpText?: string;
  };
}

export interface ParsedEditorConfig {
  availableHeadings: Array<1 | 2 | 3 | 4 | 5 | 6>;
  availableMarks: Array<'bold' | 'italic' | 'underline'>;
  disabledFeatures: string[];
  allowHyperlinks: boolean;
  allowEmbeddedEntries: boolean;
  allowEmbeddedAssets: boolean;
  allowInlineEntries: boolean;
  allowTables: boolean;
  allowQuotes: boolean;
  allowLists: boolean;
}

/**
 * Parses Contentful field configuration to determine editor capabilities
 */
export const parseContentfulFieldConfig = (
  fieldConfiguration?: ContentfulFieldConfiguration
): ParsedEditorConfig => {
  // Default configuration when no field config is provided
  const defaultConfig: ParsedEditorConfig = {
    availableHeadings: [1, 2, 3, 4, 5, 6],
    availableMarks: ['bold', 'italic', 'underline'],
    disabledFeatures: [],
    allowHyperlinks: true,
    allowEmbeddedEntries: true,
    allowEmbeddedAssets: true,
    allowInlineEntries: true,
    allowTables: true,
    allowQuotes: true,
    allowLists: true,
  };

  if (!fieldConfiguration?.validations?.[0]) {
    return defaultConfig;
  }

  const validation = fieldConfiguration.validations[0];
  const enabledMarks = validation.enabledMarks || [];
  const enabledNodeTypes = validation.enabledNodeTypes || [];

  // Parse available text marks
  const marks: Array<'bold' | 'italic' | 'underline'> = [];
  if (enabledMarks.includes('bold')) marks.push('bold');
  if (enabledMarks.includes('italic')) marks.push('italic');
  if (enabledMarks.includes('underline')) marks.push('underline');

  // Parse available heading levels
  const headings: Array<1 | 2 | 3 | 4 | 5 | 6> = [];
  if (enabledNodeTypes.includes('heading-1')) headings.push(1);
  if (enabledNodeTypes.includes('heading-2')) headings.push(2);
  if (enabledNodeTypes.includes('heading-3')) headings.push(3);
  if (enabledNodeTypes.includes('heading-4')) headings.push(4);
  if (enabledNodeTypes.includes('heading-5')) headings.push(5);
  if (enabledNodeTypes.includes('heading-6')) headings.push(6);

  // Parse other features
  const allowHyperlinks = enabledNodeTypes.includes('hyperlink');
  const allowEmbeddedEntries = enabledNodeTypes.includes('embedded-entry-block');
  const allowEmbeddedAssets = enabledNodeTypes.includes('embedded-asset-block');
  const allowInlineEntries = enabledNodeTypes.includes('embedded-entry-inline');
  const allowTables = enabledNodeTypes.includes('table');
  const allowQuotes = enabledNodeTypes.includes('blockquote') || enabledNodeTypes.includes('quote');
  const allowLists = enabledNodeTypes.includes('unordered-list') || enabledNodeTypes.includes('ordered-list');

  // Build disabled features array
  const disabled: string[] = [];
  if (!marks.includes('bold')) disabled.push('bold');
  if (!marks.includes('italic')) disabled.push('italic');
  if (!marks.includes('underline')) disabled.push('underline');
  if (!allowHyperlinks) disabled.push('link');
  if (!allowLists) disabled.push('lists');
  if (headings.length === 0) disabled.push('headings');
  if (!allowQuotes) disabled.push('quote');
  if (!allowTables) disabled.push('table');
  if (!allowEmbeddedEntries && !allowEmbeddedAssets && !allowInlineEntries) disabled.push('embed');

  return {
    availableHeadings: headings,
    availableMarks: marks,
    disabledFeatures: disabled,
    allowHyperlinks,
    allowEmbeddedEntries,
    allowEmbeddedAssets,
    allowInlineEntries,
    allowTables,
    allowQuotes,
    allowLists,
  };
};

/**
 * Helper function to fetch Contentful field configuration from Management API
 */
export const fetchContentfulFieldConfig = async (
  spaceId: string,
  contentTypeId: string,
  fieldId: string,
  accessToken: string
): Promise<ContentfulFieldConfiguration | null> => {
  try {
    const response = await fetch(
      `https://api.contentful.com/spaces/${spaceId}/content_types/${contentTypeId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/vnd.contentful.management.v1+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch content type: ${response.status} ${response.statusText}`);
    }

    const contentType = await response.json();
    const field = contentType.fields.find((f: any) => f.id === fieldId);
    
    if (!field || field.type !== 'RichText') {
      console.warn(`Field "${fieldId}" not found or is not a RichText field`);
      return null;
    }

    return {
      validations: field.validations || [],
      settings: {
        helpText: field.helpText,
      },
    };
  } catch (error) {
    console.error('Error fetching Contentful field configuration:', error);
    return null;
  }
};

/**
 * Creates a mock field configuration for testing purposes
 */
export const createMockFieldConfig = (options: {
  enabledMarks?: string[];
  enabledNodeTypes?: string[];
}): ContentfulFieldConfiguration => {
  return {
    validations: [{
      enabledMarks: options.enabledMarks || ['bold', 'italic'],
      enabledNodeTypes: options.enabledNodeTypes || [
        'paragraph',
        'heading-1',
        'heading-2',
        'heading-3',
        'unordered-list',
        'ordered-list',
        'hyperlink',
        'embedded-entry-block',
      ],
    }],
  };
};