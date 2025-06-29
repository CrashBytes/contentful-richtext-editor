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
export type { ContentfulFieldValidation, ContentfulFieldConfiguration, ParsedEditorConfig, } from './configParser';
export interface EditorFeatureConfig {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    link?: boolean;
    headings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    lists?: boolean;
    quote?: boolean;
    table?: boolean;
    embeddedEntries?: boolean;
    embeddedAssets?: boolean;
    inlineEntries?: boolean;
}
export interface ContentfulNode {
    nodeType: string;
    data: Record<string, any>;
    content?: Array<ContentfulNode | ContentfulText>;
}
export interface ContentfulText {
    nodeType: 'text';
    value: string;
    marks?: Array<{
        type: string;
    }>;
    data: Record<string, any>;
}
export interface ContentfulDocument extends ContentfulNode {
    nodeType: 'document';
    content: ContentfulNode[];
}
export interface TiptapNode {
    type: string;
    attrs?: Record<string, any>;
    content?: TiptapNode[];
    text?: string;
    marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
    }>;
}
export interface TiptapDocument extends TiptapNode {
    type: 'doc';
    content: TiptapNode[];
}
export interface EditorState {
    canUndo: boolean;
    canRedo: boolean;
    activeMarks: string[];
    activeNodes: string[];
    currentHeading?: number;
}
export type OnChangeCallback = (document: any) => void;
export type OnEmbedCallback = () => Promise<EmbeddedEntry | EmbeddedAsset | null> | void;
export interface ThemeConfig {
    name: ContentfulEditorTheme;
    className: string;
    toolbarStyle?: 'minimal' | 'full' | 'compact';
    showBorders?: boolean;
    customStyles?: Record<string, string>;
}
export interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
    value?: any;
    message?: string;
    validator?: (value: any) => boolean | string;
}
export interface FieldValidationConfig {
    rules?: ValidationRule[];
    showErrors?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
}
export interface LocalizationConfig {
    locale: string;
    messages: Record<string, string>;
    rtl?: boolean;
}
export interface A11yConfig {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    announceChanges?: boolean;
    keyboardShortcuts?: Record<string, string>;
}
export interface AdvancedEditorConfig {
    autofocus?: boolean;
    spellcheck?: boolean;
    autocomplete?: boolean;
    wordWrap?: boolean;
    lineNumbers?: boolean;
    minimap?: boolean;
    dragDrop?: boolean;
    paste?: {
        plainTextOnly?: boolean;
        cleanupPaste?: boolean;
        preserveWhitespace?: boolean;
    };
    history?: {
        depth?: number;
        newGroupDelay?: number;
    };
}
export interface PluginConfig {
    name: string;
    enabled: boolean;
    options?: Record<string, any>;
}
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
