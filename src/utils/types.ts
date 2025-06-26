export type ContentfulEditorTheme = 'default' | 'minimal' | 'contentful';

export interface EmbeddedEntry {
  sys: {
    id: string;
    type: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: Record<string, any>;
}

export interface EmbeddedAsset {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title?: string;
    description?: string;
    file?: {
      url: string;
      fileName: string;
      contentType: string;
    };
  };
}