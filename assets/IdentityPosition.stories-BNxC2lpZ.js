import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{a4 as r,I as u}from"./AlertDialog-3CDXO2v4.js";const m={title:"Components/Identity/IdentityPosition",component:r,argTypes:{variant:{description:"Variant of avatar",options:Object.values(u),table:{type:{summary:"string"},defaultValue:{summary:"user"}},control:"select"}}},e={args:{variant:"user",name:"John Doe",id:"0x1234567890abcdef1234567890abcdef12345678",avatarSrc:'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',amount:1.21,feesAccrued:.005,updatedAt:"2021-10-01T16:00:00Z"},render:t=>n.jsx("div",{className:"w-[800px]",children:n.jsx(r,{...t})})},a={args:{variant:"non-user",name:"Amazon",id:"0x1234567890abcdef1234567890abcdef12345678",amount:1.21,feesAccrued:.005,tags:[{label:"keyboard",value:34},{label:"ergonomic",value:56},{label:"wireless",value:12},{label:"gaming",value:77},{label:"work",value:11},{label:"home",value:34}]},render:t=>n.jsx("div",{className:"w-[800px]",children:n.jsx(r,{...t})})};var s,o,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    variant: 'user',
    name: 'John Doe',
    id: '0x1234567890abcdef1234567890abcdef12345678',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    amount: 1.21,
    feesAccrued: 0.005,
    updatedAt: '2021-10-01T16:00:00Z'
  },
  render: args => <div className="w-[800px]">
      <IdentityPosition {...args}></IdentityPosition>
    </div>
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,d,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: 'non-user',
    name: 'Amazon',
    id: '0x1234567890abcdef1234567890abcdef12345678',
    amount: 1.21,
    feesAccrued: 0.005,
    tags: [{
      label: 'keyboard',
      value: 34
    }, {
      label: 'ergonomic',
      value: 56
    }, {
      label: 'wireless',
      value: 12
    }, {
      label: 'gaming',
      value: 77
    }, {
      label: 'work',
      value: 11
    }, {
      label: 'home',
      value: 34
    }]
  },
  render: args => <div className="w-[800px]">
      <IdentityPosition {...args}></IdentityPosition>
    </div>
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const v=["UserVariant","IdentityVariant"],g=Object.freeze(Object.defineProperty({__proto__:null,IdentityVariant:a,UserVariant:e,__namedExportsOrder:v,default:m},Symbol.toStringTag,{value:"Module"}));export{a as I,g as S,e as U};