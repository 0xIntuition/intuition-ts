import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{C as r,a as i,b as l,c,d as a,e as m,f as C}from"./Command-7WXSXKb2.js";const p={title:"Components/Command",component:r},e={render:t=>n.jsx("div",{style:{width:"300px"},children:n.jsxs(r,{...t,children:[n.jsx(i,{placeholder:"Type a command or search..."}),n.jsxs(l,{children:[n.jsx(c,{children:"No results found."}),n.jsxs(a,{heading:"Suggestions",children:[n.jsx(m,{children:"Calendar"}),n.jsx(m,{children:"Search Emoji"}),n.jsx(m,{children:"Calculator"})]}),n.jsx(C,{}),n.jsxs(a,{heading:"Settings",children:[n.jsx(m,{children:"Profile"}),n.jsx(m,{children:"Billing"}),n.jsx(m,{children:"Settings"})]})]})]})})};var o,d,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '300px'
  }}>
      <Command {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
}`,...(s=(d=e.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};const h=["BasicUsage"],j=Object.freeze(Object.defineProperty({__proto__:null,BasicUsage:e,__namedExportsOrder:h,default:p},Symbol.toStringTag,{value:"Module"}));export{e as B,j as S};
