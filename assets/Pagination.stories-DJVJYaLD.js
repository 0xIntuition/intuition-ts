import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{ab as r,ac as j,ad as u,ae as f,af as m,ag as a,ah as p,ai as x,aj as h,ak as I,al as s,am as b}from"./AlertDialog-3CDXO2v4.js";const S={title:"Components/Pagination",component:r},i={args:{},render:t=>n.jsxs(r,{...t,className:"w-[800px] flex justify-between",children:[n.jsx(j,{totalEntries:100,label:"users"}),n.jsxs("div",{className:"flex",children:[n.jsx(u,{defaultValue:"10"}),n.jsx(f,{currentPage:1,totalPages:10}),n.jsxs(m,{children:[n.jsx(a,{children:n.jsx(p,{href:"#",disabled:!0})}),n.jsx(a,{children:n.jsx(x,{href:"#",disabled:!0})}),n.jsx(a,{children:n.jsx(h,{href:"#"})}),n.jsx(a,{children:n.jsx(I,{href:"#"})})]})]})]})},e={args:{},render:t=>n.jsx(r,{...t,children:n.jsxs(m,{children:[n.jsx(a,{children:n.jsx(x,{href:"#",disabled:!0})}),n.jsx(a,{children:n.jsx(s,{href:"#",isActive:!0,children:"1"})}),n.jsx(a,{children:n.jsx(s,{href:"#",children:"2"})}),n.jsx(a,{children:n.jsx(s,{href:"#",children:"3"})}),n.jsx(a,{children:n.jsx(b,{})}),n.jsx(a,{children:n.jsx(h,{href:"#"})})]})})};var o,g,P;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {},
  render: args => <Pagination {...args} className="w-[800px] flex justify-between">
      <PaginationSummary totalEntries={100} label="users" />
      <div className="flex">
        <PaginationRowSelection defaultValue="10" />
        <PaginationPageCounter currentPage={1} totalPages={10} />
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
        </PaginationContent>
      </div>
    </Pagination>
}`,...(P=(g=i.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};var l,c,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: args => <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const v=["BasicUsage","AlternateSetup"],C=Object.freeze(Object.defineProperty({__proto__:null,AlternateSetup:e,BasicUsage:i,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{e as A,i as B,C as S};