import{j as u}from"./jsx-runtime-Cw0GR0a5.js";import{ak as r,al as o}from"./QuestStatusCard-BY2sITGL.js";const p={title:"Components/Quest/QuestStatusCard",component:r,argTypes:{status:{description:"Status of quest",options:Object.values(o),table:{type:{summary:"string"}},control:"select"},tooltip:{description:"Tooltip content",table:{type:{summary:"string"}}}}},t={args:{status:o.notStarted,tooltip:"Example text"},render:n=>u.jsx(r,{...n})};var e,s,a;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    status: QuestStatus.notStarted,
    tooltip: 'Example text'
  },
  render: args => <QuestStatusCard {...args} />
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const i=["BasicUsage"],m=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:t,__namedExportsOrder:i,default:p},Symbol.toStringTag,{value:"Module"}));export{t as B,m as S};
