import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{B as a}from"./Button-BLvVlH_2.js";import{T as p}from"./Text-x7qLX-eT.js";import{T as n,a as l,b as m,c as d}from"./Tooltip-CdBPNrqr.js";import"./index-CTjT7uj6.js";import"./index-Ey1R3kC1.js";import"./extends-CCbyfPlC.js";import"./index-bugisSBR.js";import"./palette-saq09hvB.js";import"./index-Bb4qSo10.js";import"./createLucideIcon-BfM7wYCo.js";import"./index-CcyUcsxs.js";import"./index-DZjgi4oU.js";import"./index-DdAkmXN0.js";import"./index-Dkmgy-nq.js";const z={title:"Components/Tooltip",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."}}},argTypes:{TooltipTrigger:{description:"TooltipTrigger child",table:{type:{summary:"Node"}},control:!1},TooltipContent:{description:"TooltipContent child",table:{type:{summary:"Node"}},control:!1}}},t={render:s=>o.jsx(l,{...s,children:o.jsxs(n,{children:[o.jsx(m,{asChild:!0,children:o.jsx(a,{variant:"ghost",size:"lg",children:"Hover"})}),o.jsx(d,{children:o.jsx(p,{variant:"body",children:"Some text"})})]})})};var e,r,i;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: args => <TooltipProvider {...args}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="lg">
            Hover
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Text variant="body">Some text</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const E=["BasicUsage"];export{t as BasicUsage,E as __namedExportsOrder,z as default};
