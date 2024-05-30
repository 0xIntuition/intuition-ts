import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{A as s,a as p,b as d}from"./Avatar-BOdXw9Ok.js";import"./index-CTjT7uj6.js";import"./extends-CCbyfPlC.js";import"./index-DZjgi4oU.js";import"./index-DdAkmXN0.js";import"./index-Ey1R3kC1.js";import"./index-bugisSBR.js";import"./palette-saq09hvB.js";const f={title:"Components/Avatar",component:s,tags:["autodocs"],parameters:{controls:{exclude:["className","style"]},docs:{description:{component:"An image element with a fallback for representing the user."}}},argTypes:{src:{type:"string",description:"Image URL (for AvatarImage)",control:!1},alt:{type:"string",description:"Alternate text (for AvatarImage)",control:!1}}},r={render:e=>a.jsxs(s,{...e,children:[a.jsx(p,{src:"https://avatars.githubusercontent.com/u/94311139?s=200&v=4",alt:"intuition"}),a.jsx(d,{children:"IN"})]})},t={render:e=>a.jsxs(s,{...e,children:[a.jsx(p,{src:"broken-link",alt:"broken-link"}),a.jsx(d,{children:"IN"})]})};var o,n,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4" alt="intuition" />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
}`,...(c=(n=r.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,l,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarImage src="broken-link" alt="broken-link" />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const j=["BasicUsage","Fallback"];export{r as BasicUsage,t as Fallback,j as __namedExportsOrder,f as default};
