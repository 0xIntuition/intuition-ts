import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{W as r}from"./QuestStatusCard-CgBHQXpo.js";import"./QuestSetProgressCard-lZkOsrNz.js";import{a as j}from"./Icon.types-bVvTOTyL.js";import"./Label-hoJUpLlw.js";import"./PieChart-B_dtFskq.js";import"./Resizable-vl710Htm.js";import"./SegmentedControl-CpGzRY7X.js";import"./Separator-ClB74Fps.js";import"./Table-DoQDVlQC.js";import"./Text-DRgAEttF.js";import"./Textarea-w5FyYqF_.js";import"./ValueDisplay-BGyvBqcS.js";import"./ProgressBar-DJT993xg.js";const f={title:"Components/Form Elements/Input",component:r,argTypes:{startAdornment:{description:"Adornment at the left-side of the component",table:{type:{summary:"string"}},control:"text"},endAdornment:{description:"Adornment at the right-side of the component",table:{type:{summary:"string"}},control:"text"}}},t={args:{placeholder:"Email",disabled:!1},render:I=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"email",...I})})},n={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",startAdornment:j.magnifyingGlass})})},a={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",startAdornment:"http://"})})},o={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"number",placeholder:"Enter amount...",endAdornment:j.ethereum})})},s={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",endAdornment:".com"})})};var m,d,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Email',
    disabled: false
  },
  render: args => <div className="w-[300px]">
      <Input type="email" {...args} />
    </div>
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,i,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]">
      <Input type="text" placeholder="Search" startAdornment={IconName.magnifyingGlass} />
    </div>
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var u,x,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]">
      <Input type="text" placeholder="Search" startAdornment="http://" />
    </div>
}`,...(h=(x=a.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var g,A,y;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]">
      <Input type="number" placeholder="Enter amount..." endAdornment={IconName.ethereum} />
    </div>
}`,...(y=(A=o.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var S,v,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]">
      <Input type="text" placeholder="Search" endAdornment=".com" />
    </div>
}`,...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const N=["BasicUsage","StartAdornmentIcon","StartAdornmentLabel","EndAdornmentIcon","EndAdornmentLabel"],R=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:t,EndAdornmentIcon:o,EndAdornmentLabel:s,StartAdornmentIcon:n,StartAdornmentLabel:a,__namedExportsOrder:N,default:f},Symbol.toStringTag,{value:"Module"}));export{t as B,o as E,R as S,n as a,a as b,s as c};
