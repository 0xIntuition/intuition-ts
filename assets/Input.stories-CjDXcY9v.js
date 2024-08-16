import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a7 as r}from"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import{a as j}from"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";const f={title:"Components/Form Elements/Input",component:r,argTypes:{startAdornment:{description:"Adornment at the left-side of the component",table:{type:{summary:"string"}},control:"text"},endAdornment:{description:"Adornment at the right-side of the component",table:{type:{summary:"string"}},control:"text"}}},t={args:{placeholder:"Email",disabled:!1},render:I=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"email",...I})})},n={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",startAdornment:j.magnifyingGlass})})},a={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",startAdornment:"http://"})})},o={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"number",placeholder:"Enter amount...",endAdornment:j.ethereum})})},s={render:()=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{type:"text",placeholder:"Search",endAdornment:".com"})})};var m,d,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const N=["BasicUsage","StartAdornmentIcon","StartAdornmentLabel","EndAdornmentIcon","EndAdornmentLabel"],q=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:t,EndAdornmentIcon:o,EndAdornmentLabel:s,StartAdornmentIcon:n,StartAdornmentLabel:a,__namedExportsOrder:N,default:f},Symbol.toStringTag,{value:"Module"}));export{t as B,o as E,q as S,n as a,a as b,s as c};