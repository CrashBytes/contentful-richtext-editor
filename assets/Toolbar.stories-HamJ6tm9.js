import{j as s}from"./jsx-runtime-BVi48nQC.js";import{u as F,S,L as q,U as L,T as O,a as _,b as A,c as j,C as R}from"./Toolbar-Bae7qD_6.js";import"./iframe-DD_7x0a5.js";import"./index-DRd2HJ3t.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,U=({disabledFeatures:i=[],availableHeadings:x=[1,2,3,4,5,6],availableMarks:C=["bold","italic"],onEmbedEntry:H,onEmbedAsset:M})=>{const d=F({extensions:[S,q,L,O.configure({resizable:!0}),_,A,j],content:"<p>Sample content for toolbar testing</p>"});return d?s.jsx(R,{editor:d,disabledFeatures:i,availableHeadings:x,availableMarks:C,onEmbedEntry:H,onEmbedAsset:M}):s.jsx("div",{children:"Loading editor..."})},W={title:"Components/ContentfulToolbar",component:U,parameters:{layout:"centered",docs:{description:{component:`
The ContentfulToolbar component provides the formatting controls for the rich text editor.

## Features
- Text formatting (bold, italic, underline)
- Heading selection dropdown
- List controls (bullet and numbered)
- Link insertion
- Table insertion
- Quote formatting
- Embed controls for Contentful entries and assets
- Undo/Redo functionality

The toolbar is highly configurable and can be customized by disabling specific features or limiting available formatting options.
        `}}},tags:["autodocs"],decorators:[i=>s.jsx("div",{style:{width:"100%",maxWidth:"800px"},children:s.jsx(i,{})})]},e={args:{onEmbedEntry:r("embed entry clicked"),onEmbedAsset:r("embed asset clicked")}},a={args:{disabledFeatures:["table","embed","quote"],availableHeadings:[1,2,3],availableMarks:["bold","italic"],onEmbedEntry:r("embed entry clicked"),onEmbedAsset:r("embed asset clicked")},parameters:{docs:{description:{story:"Toolbar with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available."}}}},t={args:{disabledFeatures:["table","embed","quote","lists","headings","link"],availableMarks:["bold","italic"]},parameters:{docs:{description:{story:"Minimal toolbar with only basic text formatting (bold, italic) and undo/redo."}}}},o={args:{disabledFeatures:["bold","italic","underline","link","lists","quote","table","embed"],availableHeadings:[1,2,3,4,5,6],availableMarks:[]},parameters:{docs:{description:{story:"Toolbar configured to show only heading controls and undo/redo."}}}},n={args:{disabledFeatures:["embed"],onEmbedEntry:void 0,onEmbedAsset:void 0},parameters:{docs:{description:{story:"Toolbar without embed controls - useful when not integrating with Contentful."}}}};var l,c,b;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    onEmbedEntry: action('embed entry clicked'),
    onEmbedAsset: action('embed asset clicked')
  }
}`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    disabledFeatures: ['table', 'embed', 'quote'],
    availableHeadings: [1, 2, 3],
    availableMarks: ['bold', 'italic'],
    onEmbedEntry: action('embed entry clicked'),
    onEmbedAsset: action('embed asset clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available.'
      }
    }
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var g,f,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    disabledFeatures: ['table', 'embed', 'quote', 'lists', 'headings', 'link'],
    availableMarks: ['bold', 'italic']
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal toolbar with only basic text formatting (bold, italic) and undo/redo.'
      }
    }
  }
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var h,E,T;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    disabledFeatures: ['bold', 'italic', 'underline', 'link', 'lists', 'quote', 'table', 'embed'],
    availableHeadings: [1, 2, 3, 4, 5, 6],
    availableMarks: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar configured to show only heading controls and undo/redo.'
      }
    }
  }
}`,...(T=(E=o.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var k,v,w;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    disabledFeatures: ['embed'],
    onEmbedEntry: undefined,
    onEmbedAsset: undefined
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar without embed controls - useful when not integrating with Contentful.'
      }
    }
  }
}`,...(w=(v=n.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const B=["Default","LimitedFeatures","MinimalToolbar","OnlyHeadings","NoEmbedControls"];export{e as Default,a as LimitedFeatures,t as MinimalToolbar,n as NoEmbedControls,o as OnlyHeadings,B as __namedExportsOrder,W as default};
