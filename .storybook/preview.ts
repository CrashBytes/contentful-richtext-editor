import type { Preview } from '@storybook/react';
import '../src/styles/editor.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'A modern, Tiptap-based rich text editor that\'s fully compatible with Contentful\'s rich text format.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    onChange: {
      action: 'content changed',
      description: 'Callback when content changes - returns Contentful Document',
    },
    onEmbedEntry: {
      action: 'embed entry',
      description: 'Callback for handling embedded entries',
    },
    onEmbedAsset: {
      action: 'embed asset', 
      description: 'Callback for handling embedded assets',
    },
    initialValue: {
      control: false,
      description: 'Initial Contentful rich text document',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    theme: {
      control: 'select',
      options: ['default', 'minimal', 'contentful'],
      description: 'Visual theme for the editor',
    },
    disabledFeatures: {
      control: 'check',
      options: ['bold', 'italic', 'underline', 'link', 'lists', 'headings', 'quote', 'table', 'embed'],
      description: 'Features to disable in the toolbar',
    },
    availableHeadings: {
      control: 'check',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Which heading levels to make available',
    },
    availableMarks: {
      control: 'check',
      options: ['bold', 'italic', 'underline'],
      description: 'Which text formatting marks to make available',
    },
  },
};

export default preview;