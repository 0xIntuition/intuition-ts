import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{I as s}from"./Icon-CR-nLIwf.js";import"./index-CTjT7uj6.js";import"./index-bugisSBR.js";import"./palette-saq09hvB.js";const m=["arrow-box-left","arrow-left","arrow-out-of-box","arrow-right","arrow-up-right","arrows-repeat","book","bookmark-check","brush-sparkle","bubble-annotation","calendar","chevron-bottom","chevron-double-left","chevron-double-right","chevron-down-small","chevron-grabber-vertical","chevron-large-down","chevron-left","chevron-left-small","chevron-right","chevron-right-small","chevron-top-small","circle","circle-arrow","circle-check","circle-dots-center","circle-plus","circle-question-mark","circle-x","circles-three","cross-large","crypto-punk","crystal-ball","dot-grid","eye-open","eye-slash","fast-forward","filter-1","filter-2","floppy-disk-1","floppy-disk-2","folder","graduate-cap","group","layout-grid","layout-third","loader","lock","magnifying-glass","medal","megaphone","microphone","moneybag","person-circle","play","play-circle","plus-large","plus-small","rescue-ring","rocket","settings-gear","shield-check","shield-check-filled","shopping-bag","sparkle","square-arrow-top-right","square-check","square-check-empty","square-plus","square-x","trash-can","wallet","wreath"],b={title:"Components/Icon",component:s,tags:["autodocs"],parameters:{docs:{description:{component:"Displays an icon."}}},argTypes:{name:{description:"Icon name",options:m,table:{type:{summary:"string"}},control:"select"},className:{description:"class",table:{type:{summary:"string"}},control:"text"}}},e={render:a=>o.jsx(s,{...a}),args:{name:"crystal-ball",className:"h-10 w-10"}},r={render:a=>o.jsx("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",width:"700px"},...a,children:m.map((d,g)=>o.jsx(s,{name:d},g))})};var c,n,t;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Icon {...args} />,
  args: {
    name: 'crystal-ball',
    className: 'h-10 w-10'
  }
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var l,i,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    width: '700px'
  }} {...args}>
      {iconOptions.map((iconName, index) => <Icon key={index} name={(iconName as IconName)} />)}
    </div>
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const w=["BasicUsage","AllIcons"];export{r as AllIcons,e as BasicUsage,w as __namedExportsOrder,b as default};
