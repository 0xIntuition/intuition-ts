import{j as c}from"./jsx-runtime-Cw0GR0a5.js";import{bj as n,bi as r,bk as o}from"./AlertDialog-3CDXO2v4.js";const p={title:"Components/TransactionStatus/TransactionStatusIndicator",component:n,argTypes:{status:{description:"Status of transaction",options:Object.values(r),table:{type:{summary:"string"}},control:"select"},type:{description:"Type of transaction",options:Object.values(o),table:{type:{summary:"string"}},control:"select"}}},t={args:{status:r.awaiting,type:o.identity},render:i=>c.jsx(n,{...i})};var a,s,e;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    status: TransactionStatus.awaiting,
    type: Transaction.identity
  },
  render: args => <TransactionStatusIndicator {...args} />
}`,...(e=(s=t.parameters)==null?void 0:s.docs)==null?void 0:e.source}}};const u=["BasicUsage"],l=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:t,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{t as B,l as S};