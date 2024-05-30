import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{T as a}from"./Text-x7qLX-eT.js";import"./index-CTjT7uj6.js";import"./index-bugisSBR.js";import"./palette-saq09hvB.js";import"./index-Bb4qSo10.js";const f={title:"Components/Text",component:a,tags:["autodocs"],parameters:{docs:{description:{component:"Displays a text component"}}},argTypes:{children:{description:"Text value",table:{type:{summary:"string"}},control:"text"},variant:{description:"Variant of text",options:["heading1","heading2","heading3","heading4","heading5","headline","bodyLarge","body","caption","footnote","small"],table:{type:{summary:"string"},defaultValue:{summary:"body"}},control:"select"},weight:{description:"Weight of text",options:["normal","medium","semibold","bold"],table:{type:{summary:"string"},defaultValue:{summary:"normal"}},control:"select"}}},t={args:{children:"I am text!"},render:e=>n.jsx(a,{...e})},r={parameters:{controls:{disable:!0}},render:e=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"},children:[n.jsx(a,{variant:"heading1",...e,children:"Heading 1"}),n.jsx(a,{variant:"heading2",...e,children:"Heading 2"}),n.jsx(a,{variant:"heading3",...e,children:"Heading 3"}),n.jsx(a,{variant:"heading4",...e,children:"Heading 4"}),n.jsx(a,{variant:"heading5",...e,children:"Heading 5"}),n.jsx(a,{variant:"headline",...e,children:"Headline"}),n.jsx(a,{variant:"bodyLarge",...e,children:"Body Large"}),n.jsx(a,{variant:"body",...e,children:"Body"}),n.jsx(a,{variant:"caption",...e,children:"Caption"}),n.jsx(a,{variant:"footnote",...e,children:"Footnote"}),n.jsx(a,{variant:"small",...e,children:"Small"})]})},i={parameters:{controls:{disable:!0}},render:e=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"},children:[n.jsx(a,{...e,children:"Default"}),n.jsx(a,{weight:"semibold",...e,children:"Semibold"}),n.jsx(a,{weight:"bold",...e,children:"Bold"})]})};var o,s,d;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    children: 'I am text!'
  },
  render: props => <Text {...props} />
}`,...(d=(s=t.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var l,c,x;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: props => <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  }}>
      <Text variant="heading1" {...props}>
        Heading 1
      </Text>
      <Text variant="heading2" {...props}>
        Heading 2
      </Text>
      <Text variant="heading3" {...props}>
        Heading 3
      </Text>
      <Text variant="heading4" {...props}>
        Heading 4
      </Text>
      <Text variant="heading5" {...props}>
        Heading 5
      </Text>
      <Text variant="headline" {...props}>
        Headline
      </Text>
      <Text variant="bodyLarge" {...props}>
        Body Large
      </Text>
      <Text variant="body" {...props}>
        Body
      </Text>
      <Text variant="caption" {...props}>
        Caption
      </Text>
      <Text variant="footnote" {...props}>
        Footnote
      </Text>
      <Text variant="small" {...props}>
        Small
      </Text>
    </div>
}`,...(x=(c=r.parameters)==null?void 0:c.docs)==null?void 0:x.source}}};var p,m,g;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: props => <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  }}>
      <Text {...props}>Default</Text>
      <Text weight="semibold" {...props}>
        Semibold
      </Text>
      <Text weight="bold" {...props}>
        Bold
      </Text>
    </div>
}`,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const j=["BasicUsage","Variants","Weights"];export{t as BasicUsage,r as Variants,i as Weights,j as __namedExportsOrder,f as default};
