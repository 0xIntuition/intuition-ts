import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import"./Avatar-BOdXw9Ok.js";import"./index-bugisSBR.js";import{B as p}from"./Button-BLvVlH_2.js";import{P as i,a as l,b as m}from"./Popover-CEP5YIQn.js";import"./Tooltip-CdBPNrqr.js";import{T as t}from"./Text-x7qLX-eT.js";import"./Resizable-C4vcu0yH.js";import"./Icon-CR-nLIwf.js";import"./SidebarLayoutNavAvatar-BRfv8PkW.js";import"./Command-7WXSXKb2.js";const c={title:"Components/Popover",component:i,argTypes:{side:{describe:"Side the content will open on",table:{type:{summary:"string"},defaultValue:{summary:"bottom"}},options:["top","right","bottom","left"],control:"select"},align:{describe:"Where to align content to trigger",table:{type:{summary:"string"},defaultValue:{summary:"center"}},options:["start","center","end"],control:"select"}}},e={render:a=>o.jsxs(i,{children:[o.jsx(l,{children:o.jsx(p,{size:"lg",children:"Open popover"})}),o.jsxs(m,{...a,children:[o.jsx(t,{variant:"bodyLarge",children:"Popover Content"}),o.jsx(t,{variant:"body",children:"Here is some very long content to test out this popover. It is good to see how it looks with lots of text!"})]})]})};var r,n,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: args => <Popover>
      <PopoverTrigger>
        <Button size="lg">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <Text variant="bodyLarge">Popover Content</Text>
        <Text variant="body">
          Here is some very long content to test out this popover. It is good to
          see how it looks with lots of text!
        </Text>
      </PopoverContent>
    </Popover>
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const d=["BasicUsage"],B=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:e,__namedExportsOrder:d,default:c},Symbol.toStringTag,{value:"Module"}));export{e as B,B as S};
