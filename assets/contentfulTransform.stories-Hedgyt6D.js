import{j as t}from"./jsx-runtime-BVi48nQC.js";import{r as u}from"./iframe-DD_7x0a5.js";import{a,c as s,d as n,v as y,t as C}from"./contentfulTransform-WUiDa7J5.js";const v=()=>{const[i,r]=u.useState(()=>a()),[d,c]=u.useState(()=>s(a())),l={nodeType:n.BLOCKS.DOCUMENT,data:{},content:[{nodeType:n.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Sample Document",marks:[],data:{}}]},{nodeType:n.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"This is a paragraph with ",marks:[],data:{}},{nodeType:"text",value:"bold text",marks:[{type:n.MARKS.BOLD}],data:{}},{nodeType:"text",value:" and ",marks:[],data:{}},{nodeType:"text",value:"italic text",marks:[{type:n.MARKS.ITALIC}],data:{}},{nodeType:"text",value:".",marks:[],data:{}}]}]},h=()=>{try{const e=s(l);c(e),r(l)}catch(e){console.error("Conversion error:",e)}},T=()=>{try{const e=C(d);r(e)}catch(e){console.error("Conversion error:",e)}},p=y(i);return t.jsxs("div",{style:{fontFamily:"monospace",maxWidth:"100%"},children:[t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("h3",{children:"Transformation Utilities Demo"}),t.jsx("p",{children:"These utilities help convert between Contentful and Tiptap JSON formats."})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"20px"},children:[t.jsxs("div",{children:[t.jsx("h4",{children:"Contentful Document"}),t.jsxs("div",{style:{background:"#f5f5f5",padding:"10px",borderRadius:"4px",fontSize:"12px",height:"300px",overflow:"auto",border:p?"2px solid green":"2px solid red"},children:[t.jsxs("div",{style:{marginBottom:"10px"},children:[t.jsx("strong",{children:"Valid:"})," ",p?"✅ Yes":"❌ No"]}),t.jsx("pre",{children:JSON.stringify(i,null,2)})]})]}),t.jsxs("div",{children:[t.jsx("h4",{children:"Tiptap JSON"}),t.jsx("div",{style:{background:"#f5f5f5",padding:"10px",borderRadius:"4px",fontSize:"12px",height:"300px",overflow:"auto",border:"1px solid #ccc"},children:t.jsx("pre",{children:JSON.stringify(d,null,2)})})]})]}),t.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px"},children:[t.jsx("button",{onClick:h,style:{padding:"10px 20px",background:"#2e75d4",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Convert Sample Contentful → Tiptap"}),t.jsx("button",{onClick:T,style:{padding:"10px 20px",background:"#28a745",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Convert Tiptap → Contentful"}),t.jsx("button",{onClick:()=>{const e=a();r(e),c(s(e))},style:{padding:"10px 20px",background:"#6c757d",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Create Empty Document"})]}),t.jsxs("div",{style:{background:"#e9ecef",padding:"15px",borderRadius:"4px"},children:[t.jsx("h4",{children:"Available Functions:"}),t.jsxs("ul",{style:{margin:0,fontSize:"14px"},children:[t.jsxs("li",{children:[t.jsx("code",{children:"contentfulToTiptap(document)"})," - Converts Contentful document to Tiptap JSON"]}),t.jsxs("li",{children:[t.jsx("code",{children:"tiptapToContentful(json)"})," - Converts Tiptap JSON to Contentful document"]}),t.jsxs("li",{children:[t.jsx("code",{children:"validateContentfulDocument(document)"})," - Validates if a document is properly formatted"]}),t.jsxs("li",{children:[t.jsx("code",{children:"createEmptyDocument()"})," - Creates an empty Contentful document"]})]})]})]})},D={title:"Utils/ContentfulTransform",component:v,parameters:{layout:"padded",docs:{description:{component:`
Utility functions for converting between Contentful Rich Text format and Tiptap JSON format.

## Functions

### contentfulToTiptap(document)
Converts a Contentful Rich Text Document to Tiptap JSON format for use in the editor.

### tiptapToContentful(json)
Converts Tiptap JSON format back to a Contentful Rich Text Document.

### validateContentfulDocument(document)
Validates if a document follows the correct Contentful Rich Text structure.

### createEmptyDocument()
Creates a new empty Contentful Rich Text Document with a single empty paragraph.

## Usage
These functions are used internally by the editor but can also be used standalone for processing Contentful rich text data.
        `}}},tags:["autodocs"]},o={parameters:{docs:{description:{story:"Interactive demo showing the transformation between Contentful and Tiptap formats. Try the buttons to see how the data structures convert."}}}};var m,x,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the transformation between Contentful and Tiptap formats. Try the buttons to see how the data structures convert.'
      }
    }
  }
}`,...(f=(x=o.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const S=["InteractiveDemo"];export{o as InteractiveDemo,S as __namedExportsOrder,D as default};
