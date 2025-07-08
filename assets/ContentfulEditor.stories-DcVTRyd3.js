import{j as u}from"./jsx-runtime-BVi48nQC.js";import{r as b}from"./iframe-DD_7x0a5.js";import{S as we,U as Be,L as Ie,T as Ke,a as Pe,b as Me,c as He,u as _e,C as De,E as Ge}from"./Toolbar-Bae7qD_6.js";import{c as G,t as Ve,d as e}from"./contentfulTransform-WUiDa7J5.js";import"./index-DRd2HJ3t.js";const qe=s=>{var k;const S={availableHeadings:[1,2,3,4,5,6],availableMarks:["bold","italic","underline"],disabledFeatures:[],allowHyperlinks:!0,allowEmbeddedEntries:!0,allowEmbeddedAssets:!0,allowInlineEntries:!0,allowTables:!0,allowQuotes:!0,allowLists:!0};if(!((k=s==null?void 0:s.validations)!=null&&k[0]))return S;const T=s.validations[0],h=T.enabledMarks||[],n=T.enabledNodeTypes||[],p=[];h.includes("bold")&&p.push("bold"),h.includes("italic")&&p.push("italic"),h.includes("underline")&&p.push("underline");const c=[];n.includes("heading-1")&&c.push(1),n.includes("heading-2")&&c.push(2),n.includes("heading-3")&&c.push(3),n.includes("heading-4")&&c.push(4),n.includes("heading-5")&&c.push(5),n.includes("heading-6")&&c.push(6);const A=n.includes("hyperlink"),f=n.includes("embedded-entry-block"),i=n.includes("embedded-asset-block"),g=n.includes("embedded-entry-inline"),C=n.includes("table"),y=n.includes("blockquote")||n.includes("quote"),v=n.includes("unordered-list")||n.includes("ordered-list"),t=[];return p.includes("bold")||t.push("bold"),p.includes("italic")||t.push("italic"),p.includes("underline")||t.push("underline"),A||t.push("link"),v||t.push("lists"),c.length===0&&t.push("headings"),y||t.push("quote"),C||t.push("table"),!f&&!i&&!g&&t.push("embed"),{availableHeadings:c,availableMarks:p,disabledFeatures:t,allowHyperlinks:A,allowEmbeddedEntries:f,allowEmbeddedAssets:i,allowInlineEntries:g,allowTables:C,allowQuotes:y,allowLists:v}},D=({initialValue:s,onChange:S,onEmbedEntry:T,onEmbedAsset:h,onEmbedInlineEntry:n,className:p="",readonly:c=!1,placeholder:A="Start writing...",fieldConfiguration:f,disabledFeatures:i=[],theme:g="contentful",availableHeadings:C=[1,2,3,4,5,6],availableMarks:y=["bold","italic","underline"],showBorder:v=!0})=>{const t=b.useMemo(()=>{if(f)return qe(f);const a=[];return y.includes("bold")||a.push("bold"),y.includes("italic")||a.push("italic"),y.includes("underline")||a.push("underline"),a.push(...i),{availableHeadings:C,availableMarks:y,disabledFeatures:a,allowHyperlinks:!i.includes("link"),allowEmbeddedEntries:!i.includes("embed"),allowEmbeddedAssets:!i.includes("embed"),allowInlineEntries:!i.includes("embed"),allowTables:!i.includes("table"),allowQuotes:!i.includes("quote"),allowLists:!i.includes("lists")}},[f,i,C,y]),k=b.useMemo(()=>{const a=[];return a.push(we.configure({heading:t.availableHeadings.length>0?{levels:t.availableHeadings}:!1,bold:t.availableMarks.includes("bold")?{}:!1,italic:t.availableMarks.includes("italic")?{}:!1,bulletList:t.allowLists?{HTMLAttributes:{class:"contentful-bullet-list"}}:!1,orderedList:t.allowLists?{HTMLAttributes:{class:"contentful-ordered-list"}}:!1,blockquote:t.allowQuotes?{HTMLAttributes:{class:"contentful-blockquote"}}:!1})),t.availableMarks.includes("underline")&&a.push(Be),t.allowHyperlinks&&a.push(Ie.configure({openOnClick:!1,HTMLAttributes:{class:"contentful-link",rel:"noopener noreferrer"}})),t.allowTables&&a.push(Ke.configure({resizable:!0,HTMLAttributes:{class:"contentful-table"}}),Pe.configure({HTMLAttributes:{class:"contentful-table-row"}}),Me.configure({HTMLAttributes:{class:"contentful-table-header"}}),He.configure({HTMLAttributes:{class:"contentful-table-cell"}})),a},[t]),d=_e({extensions:k,content:s?G(s):"",editable:!c,editorProps:{attributes:{class:`contentful-editor-content contentful-editor-content--${g}`,"data-placeholder":A}},onUpdate:({editor:a})=>{if(S)try{const l=Ve(a.getJSON());S(l)}catch(l){console.error("Error converting Tiptap content to Contentful format:",l)}}});b.useEffect(()=>{if(d&&s){const a=G(s);d.commands.setContent(a,!1)}},[d,s]);const Ee=b.useCallback(async()=>{var a,l;if(T&&d&&t.allowEmbeddedEntries)try{const o=await T();o&&d.chain().focus().insertContent({type:"paragraph",content:[{type:"text",text:`[Embedded Entry: ${((a=o.sys)==null?void 0:a.id)||((l=o.fields)==null?void 0:l.title)||"Unknown"}]`,marks:[{type:"bold"}]}]}).run()}catch(o){console.error("Error embedding entry:",o)}},[T,d,t.allowEmbeddedEntries]),xe=b.useCallback(async()=>{var a,l;if(h&&d&&t.allowEmbeddedAssets)try{const o=await h();o&&d.chain().focus().insertContent({type:"paragraph",content:[{type:"text",text:`[Embedded Asset: ${((a=o.sys)==null?void 0:a.id)||((l=o.fields)==null?void 0:l.title)||"Unknown"}]`,marks:[{type:"bold"}]}]}).run()}catch(o){console.error("Error embedding asset:",o)}},[h,d,t.allowEmbeddedAssets]),Oe=b.useCallback(async()=>{var a,l;if(n&&d&&t.allowInlineEntries)try{const o=await n();o&&d.chain().focus().insertContent({type:"text",text:`[Inline Entry: ${((a=o.sys)==null?void 0:a.id)||((l=o.fields)==null?void 0:l.title)||"Unknown"}]`,marks:[{type:"bold"}]}).run()}catch(o){console.error("Error embedding inline entry:",o)}},[n,d,t.allowInlineEntries]),Re=["contentful-editor",`contentful-editor--${g}`,v?"":"contentful-editor--borderless",p].filter(Boolean).join(" ");return d?u.jsxs("div",{className:Re,children:[!c&&u.jsx(De,{editor:d,onEmbedEntry:t.allowEmbeddedEntries?Ee:void 0,onEmbedAsset:t.allowEmbeddedAssets?xe:void 0,onEmbedInlineEntry:t.allowInlineEntries?Oe:void 0,disabledFeatures:t.disabledFeatures,availableHeadings:t.availableHeadings,availableMarks:t.availableMarks,allowHyperlinks:t.allowHyperlinks}),u.jsx("div",{className:"contentful-editor__content-wrapper",children:u.jsx(Ge,{editor:d,className:"contentful-editor__content","data-testid":"editor-content"})})]}):u.jsx("div",{className:`contentful-editor contentful-editor--loading ${p}`,children:u.jsx("div",{className:"contentful-editor__loading",children:"Loading editor..."})})};try{D.displayName="ContentfulRichTextEditor",D.__docgenInfo={description:"",displayName:"ContentfulRichTextEditor",props:{initialValue:{defaultValue:null,description:"",name:"initialValue",required:!1,type:{name:"Document"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(document: Document) => void"}},onEmbedEntry:{defaultValue:null,description:"",name:"onEmbedEntry",required:!1,type:{name:"() => void | Promise<any>"}},onEmbedAsset:{defaultValue:null,description:"",name:"onEmbedAsset",required:!1,type:{name:"() => void | Promise<any>"}},onEmbedInlineEntry:{defaultValue:null,description:"",name:"onEmbedInlineEntry",required:!1,type:{name:"() => void | Promise<any>"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},readonly:{defaultValue:{value:"false"},description:"",name:"readonly",required:!1,type:{name:"boolean"}},placeholder:{defaultValue:{value:"Start writing..."},description:"",name:"placeholder",required:!1,type:{name:"string"}},fieldConfiguration:{defaultValue:null,description:"",name:"fieldConfiguration",required:!1,type:{name:"ContentfulFieldConfiguration"}},disabledFeatures:{defaultValue:{value:"[]"},description:"",name:"disabledFeatures",required:!1,type:{name:'("bold" | "italic" | "underline" | "link" | "lists" | "headings" | "quote" | "table" | "embed")[]'}},theme:{defaultValue:{value:"contentful"},description:"",name:"theme",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"minimal"'},{value:'"contentful"'}]}},availableHeadings:{defaultValue:{value:"[1, 2, 3, 4, 5, 6]"},description:"",name:"availableHeadings",required:!1,type:{name:"(1 | 2 | 3 | 4 | 5 | 6)[]"}},availableMarks:{defaultValue:{value:"['bold', 'italic', 'underline']"},description:"",name:"availableMarks",required:!1,type:{name:'("bold" | "italic" | "underline")[]'}},showBorder:{defaultValue:{value:"true"},description:"",name:"showBorder",required:!1,type:{name:"boolean"}}}}}catch{}try{ContentfulEditor.displayName="ContentfulEditor",ContentfulEditor.__docgenInfo={description:"",displayName:"ContentfulEditor",props:{initialValue:{defaultValue:null,description:"",name:"initialValue",required:!1,type:{name:"Document"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(document: Document) => void"}},onEmbedEntry:{defaultValue:null,description:"",name:"onEmbedEntry",required:!1,type:{name:"() => void | Promise<any>"}},onEmbedAsset:{defaultValue:null,description:"",name:"onEmbedAsset",required:!1,type:{name:"() => void | Promise<any>"}},onEmbedInlineEntry:{defaultValue:null,description:"",name:"onEmbedInlineEntry",required:!1,type:{name:"() => void | Promise<any>"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},readonly:{defaultValue:{value:"false"},description:"",name:"readonly",required:!1,type:{name:"boolean"}},placeholder:{defaultValue:{value:"Start writing..."},description:"",name:"placeholder",required:!1,type:{name:"string"}},fieldConfiguration:{defaultValue:null,description:"",name:"fieldConfiguration",required:!1,type:{name:"ContentfulFieldConfiguration"}},disabledFeatures:{defaultValue:{value:"[]"},description:"",name:"disabledFeatures",required:!1,type:{name:'("bold" | "italic" | "underline" | "link" | "lists" | "headings" | "quote" | "table" | "embed")[]'}},theme:{defaultValue:{value:"contentful"},description:"",name:"theme",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"minimal"'},{value:'"contentful"'}]}},availableHeadings:{defaultValue:{value:"[1, 2, 3, 4, 5, 6]"},description:"",name:"availableHeadings",required:!1,type:{name:"(1 | 2 | 3 | 4 | 5 | 6)[]"}},availableMarks:{defaultValue:{value:"['bold', 'italic', 'underline']"},description:"",name:"availableMarks",required:!1,type:{name:'("bold" | "italic" | "underline")[]'}},showBorder:{defaultValue:{value:"true"},description:"",name:"showBorder",required:!1,type:{name:"boolean"}}}}}catch{}const Ne={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"The Ultimate Guide to Modern Web Development",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Web development has evolved dramatically over the past decade. In this comprehensive guide, we will explore the ",marks:[],data:{}},{nodeType:"text",value:"latest trends",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" and ",marks:[],data:{}},{nodeType:"text",value:"best practices",marks:[{type:e.MARKS.ITALIC}],data:{}},{nodeType:"text",value:" that every developer should know.",marks:[],data:{}}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Frontend Technologies",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Modern frontend development revolves around component-based frameworks. Check out React for more information.",marks:[],data:{}}]},{nodeType:e.BLOCKS.UL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"React - Component-based UI library",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Vue.js - Progressive framework",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Angular - Full-featured framework with ",marks:[],data:{}},{nodeType:"text",value:"TypeScript",marks:[{type:e.MARKS.UNDERLINE}],data:{}},{nodeType:"text",value:" support",marks:[],data:{}}]}]}]},{nodeType:e.BLOCKS.QUOTE,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"The best framework is the one that helps your team ship faster and maintain code better. Choose based on your team expertise and project requirements.",marks:[{type:e.MARKS.ITALIC}],data:{}}]}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Backend Technologies",marks:[],data:{}}]},{nodeType:e.BLOCKS.OL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Node.js with Express.js",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" - Fast and lightweight",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Python with Django/FastAPI",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" - Great for rapid development",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Go with Gin/Echo",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" - High performance and concurrency",marks:[],data:{}}]}]}]},{nodeType:e.BLOCKS.HR,data:{},content:[]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"This guide covers the fundamentals, but web development is constantly evolving. Stay curious and keep learning!",marks:[],data:{}}]}]},je={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Transform Your Business with AI",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Discover how artificial intelligence can ",marks:[],data:{}},{nodeType:"text",value:"revolutionize",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" your workflow and boost productivity by up to ",marks:[],data:{}},{nodeType:"text",value:"300%",marks:[{type:e.MARKS.BOLD},{type:e.MARKS.UNDERLINE}],data:{}},{nodeType:"text",value:".",marks:[],data:{}}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Why Choose Our Platform?",marks:[],data:{}}]},{nodeType:e.BLOCKS.UL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Lightning-fast processing",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Enterprise-grade security",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Real-time analytics and insights",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Available in 25+ languages",marks:[],data:{}}]}]}]},{nodeType:e.BLOCKS.QUOTE,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"This platform saved us 40 hours per week and increased our revenue by 250%. It is a game-changer!",marks:[{type:e.MARKS.ITALIC}],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"— Sarah Johnson, CEO of TechCorp",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Ready to get started? Sign up for your free trial today and experience the future of business automation.",marks:[],data:{}}]}]},Ue={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"API Authentication Guide",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"This guide explains how to authenticate with our REST API using ",marks:[],data:{}},{nodeType:"text",value:"Bearer tokens",marks:[{type:e.MARKS.ITALIC}],data:{}},{nodeType:"text",value:".",marks:[],data:{}}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Getting Your API Key",marks:[],data:{}}]},{nodeType:e.BLOCKS.OL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Log in to your dashboard",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Navigate to Settings → API Keys",marks:[{type:e.MARKS.ITALIC}],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:'Click "Generate New Key"',marks:[{type:e.MARKS.BOLD}],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Copy and securely store your API key",marks:[],data:{}}]}]}]},{nodeType:e.BLOCKS.QUOTE,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Important: Never expose your API key in client-side code or public repositories. Store it securely on your server.",marks:[{type:e.MARKS.BOLD}],data:{}}]}]}]},Fe={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Perfect Chocolate Chip Cookies",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"These ",marks:[],data:{}},{nodeType:"text",value:"crispy on the outside, chewy on the inside",marks:[{type:e.MARKS.ITALIC}],data:{}},{nodeType:"text",value:" chocolate chip cookies are the ",marks:[],data:{}},{nodeType:"text",value:"ultimate comfort food",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:". Perfect for any occasion!",marks:[],data:{}}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Ingredients",marks:[],data:{}}]},{nodeType:e.BLOCKS.UL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"2¼ cups all-purpose flour",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"1 tsp baking soda",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"1 tsp salt",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"1 cup butter, softened",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"2 cups semi-sweet chocolate chips",marks:[{type:e.MARKS.BOLD}],data:{}}]}]}]},{nodeType:e.BLOCKS.HEADING_2,data:{},content:[{nodeType:"text",value:"Instructions",marks:[],data:{}}]},{nodeType:e.BLOCKS.OL_LIST,data:{},content:[{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Preheat oven to 375°F (190°C).",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"In a medium bowl, whisk together flour, baking soda, and salt.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"In a large bowl, cream butter and sugars until light and fluffy.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Beat in eggs one at a time, then vanilla extract.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Gradually mix in flour mixture until just combined.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Fold in chocolate chips.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Drop rounded tablespoons of dough onto ungreased baking sheets.",marks:[],data:{}}]}]},{nodeType:e.BLOCKS.LIST_ITEM,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Bake for 9-11 minutes until golden brown around edges.",marks:[],data:{}}]}]}]},{nodeType:e.BLOCKS.QUOTE,data:{},content:[{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Pro Tip: For extra chewy cookies, slightly underbake them. They will continue cooking on the hot baking sheet!",marks:[{type:e.MARKS.ITALIC}],data:{}}]}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"Makes about 48 cookies. Store in airtight container for up to 1 week. Enjoy!",marks:[],data:{}}]}]},m={blogPost:Ne,marketingCopy:je,technicalDoc:Ue,recipe:Fe},{action:r}=__STORYBOOK_MODULE_ACTIONS__,Le={nodeType:e.BLOCKS.DOCUMENT,data:{},content:[{nodeType:e.BLOCKS.HEADING_1,data:{},content:[{nodeType:"text",value:"Simple Content",marks:[],data:{}}]},{nodeType:e.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"This content only uses ",marks:[],data:{}},{nodeType:"text",value:"bold",marks:[{type:e.MARKS.BOLD}],data:{}},{nodeType:"text",value:" and ",marks:[],data:{}},{nodeType:"text",value:"italic",marks:[{type:e.MARKS.ITALIC}],data:{}},{nodeType:"text",value:" formatting without underline.",marks:[],data:{}}]}]},Je={title:"Components/ContentfulRichTextEditor",component:D,parameters:{layout:"centered",docs:{description:{component:`
A modern, Tiptap-based rich text editor that's fully compatible with Contentful's rich text format.

## Features
- ✅ Full Contentful Compatibility - Seamless conversion between Contentful and Tiptap formats
- ✅ Modern UI - Clean, intuitive interface matching Contentful's design
- ✅ TypeScript Support - Complete type safety with Contentful's rich text types
- ✅ Extensible - Built on Tiptap v2 for easy customization
- ✅ Lightweight - Tree-shakeable, only import what you need
- ✅ Responsive - Works on desktop and mobile devices

## Supported Features
- **Text Formatting**: Bold, italic, underline
- **Headings**: H1 through H6
- **Lists**: Ordered and unordered lists
- **Links**: Hyperlinks with URL validation
- **Tables**: Full table support with headers
- **Quotes**: Blockquotes
- **Embedded Content**: Callbacks for Contentful entries and assets
- **Undo/Redo**: Full history support
        `}}},tags:["autodocs"],decorators:[s=>u.jsx("div",{style:{width:"900px",maxWidth:"100vw",height:"600px"},children:u.jsx(s,{})})]},L={args:{placeholder:"Start writing your content...",onChange:r("content changed")}},E={args:{initialValue:m.blogPost,placeholder:"Edit this blog post...",onChange:r("content changed")},parameters:{docs:{description:{story:"A comprehensive blog post showcasing all editor features: headings, paragraphs, lists, links, tables, quotes, and formatting."}}}},x={args:{initialValue:m.marketingCopy,placeholder:"Edit this marketing copy...",onChange:r("content changed")},parameters:{docs:{description:{story:"Marketing copy with compelling headlines, bullet points, testimonials, and call-to-action links."}}}},O={args:{initialValue:m.technicalDoc,placeholder:"Edit this technical documentation...",onChange:r("content changed")},parameters:{docs:{description:{story:"Technical documentation with structured content, tables, code references, and warnings."}}}},R={args:{initialValue:m.recipe,placeholder:"Edit this recipe...",onChange:r("content changed")},parameters:{docs:{description:{story:"Recipe format with ingredients list, step-by-step instructions, and helpful tips."}}}},w={args:{theme:"contentful",initialValue:m.blogPost,placeholder:"Contentful theme...",onChange:r("content changed")},parameters:{docs:{description:{story:"Contentful theme (default) - matches Contentful's native editor appearance."}}}},B={args:{theme:"minimal",initialValue:m.marketingCopy,placeholder:"Minimal theme...",onChange:r("content changed")},parameters:{docs:{description:{story:"Minimal theme - clean design with reduced visual elements."}}}},I={args:{theme:"default",initialValue:m.recipe,placeholder:"Default theme with serif fonts...",onChange:r("content changed")},parameters:{docs:{description:{story:"Default theme - standard rich text editor with serif fonts."}}}},K={args:{initialValue:m.technicalDoc,readonly:!0,onChange:r("content changed")},parameters:{docs:{description:{story:"Read-only mode - content cannot be edited, toolbar is hidden."}}}},P={args:{initialValue:Le,placeholder:"Only basic formatting available...",disabledFeatures:["table","embed","quote"],availableHeadings:[1,2,3],availableMarks:["bold","italic"],onChange:r("content changed")},parameters:{docs:{description:{story:"Editor with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available, and only bold/italic formatting."}}}},M={args:{initialValue:Le,placeholder:"Simple editor with basic features...",disabledFeatures:["table","embed","quote","lists","headings"],availableMarks:["bold","italic"],onChange:r("content changed")},parameters:{docs:{description:{story:"A very simple editor with only basic text formatting (bold, italic) and links."}}}},H={args:{initialValue:m.blogPost,placeholder:"Try the embed buttons in the toolbar...",onChange:r("content changed"),onEmbedEntry:()=>(r("embed entry clicked")(),Promise.resolve({sys:{id:"entry-123",type:"Entry"},fields:{title:"Sample Blog Post"}})),onEmbedAsset:()=>(r("embed asset clicked")(),Promise.resolve({sys:{id:"asset-456",type:"Asset"},fields:{title:"Sample Image",file:{url:"https://example.com/image.jpg",fileName:"image.jpg",contentType:"image/jpeg"}}}))},parameters:{docs:{description:{story:'Editor with embed handlers that simulate selecting Contentful entries and assets. Click the "Embed" button to test.'}}}},_={args:{className:"custom-editor-demo",initialValue:m.recipe,placeholder:"Custom styled editor...",onChange:r("content changed")},decorators:[s=>u.jsxs("div",{children:[u.jsx("style",{children:`
          .custom-editor-demo {
            border: 2px solid #ff6b6b;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
          }
          .custom-editor-demo .contentful-toolbar {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            border-bottom: 2px solid #ff6b6b;
          }
          .custom-editor-demo .contentful-toolbar__button {
            color: white;
            font-weight: bold;
          }
          .custom-editor-demo .contentful-toolbar__button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          .custom-editor-demo .contentful-editor-content {
            background: #fefefe;
          }
        `}),u.jsx(s,{})]})],parameters:{docs:{description:{story:"Example of custom styling using CSS classes. The editor has a custom red border and gradient toolbar."}}}};var V,q,N;L.parameters={...L.parameters,docs:{...(V=L.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    placeholder: 'Start writing your content...',
    onChange: action('content changed')
  }
}`,...(N=(q=L.parameters)==null?void 0:q.docs)==null?void 0:N.source}}};var j,U,F;E.parameters={...E.parameters,docs:{...(j=E.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.blogPost,
    placeholder: 'Edit this blog post...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive blog post showcasing all editor features: headings, paragraphs, lists, links, tables, quotes, and formatting.'
      }
    }
  }
}`,...(F=(U=E.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var Q,W,$;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.marketingCopy,
    placeholder: 'Edit this marketing copy...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketing copy with compelling headlines, bullet points, testimonials, and call-to-action links.'
      }
    }
  }
}`,...($=(W=x.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var z,Y,J;O.parameters={...O.parameters,docs:{...(z=O.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.technicalDoc,
    placeholder: 'Edit this technical documentation...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Technical documentation with structured content, tables, code references, and warnings.'
      }
    }
  }
}`,...(J=(Y=O.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var X,Z,ee;R.parameters={...R.parameters,docs:{...(X=R.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.recipe,
    placeholder: 'Edit this recipe...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe format with ingredients list, step-by-step instructions, and helpful tips.'
      }
    }
  }
}`,...(ee=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ae,ne;w.parameters={...w.parameters,docs:{...(te=w.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    theme: 'contentful',
    initialValue: testDataSamples.blogPost,
    placeholder: 'Contentful theme...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Contentful theme (default) - matches Contentful\\'s native editor appearance.'
      }
    }
  }
}`,...(ne=(ae=w.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var oe,se,de;B.parameters={...B.parameters,docs:{...(oe=B.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    theme: 'minimal',
    initialValue: testDataSamples.marketingCopy,
    placeholder: 'Minimal theme...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal theme - clean design with reduced visual elements.'
      }
    }
  }
}`,...(de=(se=B.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var re,ie,le;I.parameters={...I.parameters,docs:{...(re=I.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    theme: 'default',
    initialValue: testDataSamples.recipe,
    placeholder: 'Default theme with serif fonts...',
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Default theme - standard rich text editor with serif fonts.'
      }
    }
  }
}`,...(le=(ie=I.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ce,ue,pe;K.parameters={...K.parameters,docs:{...(ce=K.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.technicalDoc,
    readonly: true,
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode - content cannot be edited, toolbar is hidden.'
      }
    }
  }
}`,...(pe=(ue=K.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var me,ye,he;P.parameters={...P.parameters,docs:{...(me=P.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    initialValue: simpleContent,
    placeholder: 'Only basic formatting available...',
    disabledFeatures: ['table', 'embed', 'quote'],
    availableHeadings: [1, 2, 3],
    availableMarks: ['bold', 'italic'],
    // No underline
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with limited features - tables, embeds, and quotes disabled, only H1-H3 headings available, and only bold/italic formatting.'
      }
    }
  }
}`,...(he=(ye=P.parameters)==null?void 0:ye.docs)==null?void 0:he.source}}};var Te,fe,be;M.parameters={...M.parameters,docs:{...(Te=M.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    initialValue: simpleContent,
    placeholder: 'Simple editor with basic features...',
    disabledFeatures: ['table', 'embed', 'quote', 'lists', 'headings'],
    availableMarks: ['bold', 'italic'],
    // No underline
    onChange: action('content changed')
  },
  parameters: {
    docs: {
      description: {
        story: 'A very simple editor with only basic text formatting (bold, italic) and links.'
      }
    }
  }
}`,...(be=(fe=M.parameters)==null?void 0:fe.docs)==null?void 0:be.source}}};var ge,Ce,Se;H.parameters={...H.parameters,docs:{...(ge=H.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    initialValue: testDataSamples.blogPost,
    placeholder: 'Try the embed buttons in the toolbar...',
    onChange: action('content changed'),
    onEmbedEntry: () => {
      action('embed entry clicked')();
      return Promise.resolve({
        sys: {
          id: 'entry-123',
          type: 'Entry'
        },
        fields: {
          title: 'Sample Blog Post'
        }
      });
    },
    onEmbedAsset: () => {
      action('embed asset clicked')();
      return Promise.resolve({
        sys: {
          id: 'asset-456',
          type: 'Asset'
        },
        fields: {
          title: 'Sample Image',
          file: {
            url: 'https://example.com/image.jpg',
            fileName: 'image.jpg',
            contentType: 'image/jpeg'
          }
        }
      });
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with embed handlers that simulate selecting Contentful entries and assets. Click the "Embed" button to test.'
      }
    }
  }
}`,...(Se=(Ce=H.parameters)==null?void 0:Ce.docs)==null?void 0:Se.source}}};var Ae,ve,ke;_.parameters={..._.parameters,docs:{...(Ae=_.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    className: 'custom-editor-demo',
    initialValue: testDataSamples.recipe,
    placeholder: 'Custom styled editor...',
    onChange: action('content changed')
  },
  decorators: [Story => <div>
        <style>{\`
          .custom-editor-demo {
            border: 2px solid #ff6b6b;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
          }
          .custom-editor-demo .contentful-toolbar {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            border-bottom: 2px solid #ff6b6b;
          }
          .custom-editor-demo .contentful-toolbar__button {
            color: white;
            font-weight: bold;
          }
          .custom-editor-demo .contentful-toolbar__button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          .custom-editor-demo .contentful-editor-content {
            background: #fefefe;
          }
        \`}</style>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'Example of custom styling using CSS classes. The editor has a custom red border and gradient toolbar.'
      }
    }
  }
}`,...(ke=(ve=_.parameters)==null?void 0:ve.docs)==null?void 0:ke.source}}};const Xe=["Default","BlogPostExample","MarketingCopyExample","TechnicalDocumentationExample","RecipeExample","ContentfulTheme","MinimalTheme","DefaultTheme","ReadOnly","LimitedFeatures","SimpleEditor","WithEmbedHandlers","CustomStyling"];export{E as BlogPostExample,w as ContentfulTheme,_ as CustomStyling,L as Default,I as DefaultTheme,P as LimitedFeatures,x as MarketingCopyExample,B as MinimalTheme,K as ReadOnly,R as RecipeExample,M as SimpleEditor,O as TechnicalDocumentationExample,H as WithEmbedHandlers,Xe as __namedExportsOrder,Je as default};
