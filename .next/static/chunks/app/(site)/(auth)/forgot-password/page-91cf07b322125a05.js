(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[287],{3017:function(r,e,t){Promise.resolve().then(t.t.bind(t,2972,23)),Promise.resolve().then(t.bind(t,1898))},1898:function(r,e,t){"use strict";var s=t(7437),l=t(2265),a=t(5186),c=t(3464),i=t(9663),o=t(7648),n=t(3145);e.default=()=>{let[r,e]=(0,l.useState)(""),[t,x]=(0,l.useState)(!1),d=async t=>{if(t.preventDefault(),!r){a.ZP.error("Please enter your email address.");return}x(!0);try{let t=await c.Z.post("/api/forgot-password/reset",{email:r.toLowerCase()});if(404===t.status){a.ZP.error("User not found.");return}200===t.status&&(a.ZP.success(t.data),e("")),e(""),x(!1)}catch(r){a.ZP.error(null==r?void 0:r.response.data),x(!1)}};return(0,s.jsx)("section",{className:"bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20",children:(0,s.jsx)("div",{className:"container",children:(0,s.jsx)("div",{className:"-mx-4 flex flex-wrap",children:(0,s.jsx)("div",{className:"w-full px-4",children:(0,s.jsxs)("div",{className:"wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]","data-wow-delay":".15s",children:[(0,s.jsx)("div",{className:"mb-10 text-center",children:(0,s.jsxs)(o.default,{href:"/",className:"mx-auto inline-block max-w-[160px]",children:[(0,s.jsx)(n.default,{src:"/images/logo/logo.svg",alt:"logo",width:140,height:30,className:"dark:hidden"}),(0,s.jsx)(n.default,{src:"/images/logo/logo-white.svg",alt:"logo",width:140,height:30,className:"hidden dark:block"})]})}),(0,s.jsxs)("form",{onSubmit:d,children:[(0,s.jsx)("div",{className:"mb-[22px]",children:(0,s.jsx)("input",{type:"email",placeholder:"Email",name:"email",value:r,onChange:r=>e(r.target.value),required:!0,className:"w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"})}),(0,s.jsx)("div",{className:"",children:(0,s.jsxs)("button",{type:"submit",className:"flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark",children:["Send Email ",t&&(0,s.jsx)(i.Z,{})]})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"absolute right-1 top-1",children:(0,s.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("circle",{cx:"1.39737",cy:"38.6026",r:"1.39737",transform:"rotate(-90 1.39737 38.6026)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"1.39737",cy:"1.99122",r:"1.39737",transform:"rotate(-90 1.39737 1.99122)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"13.6943",cy:"38.6026",r:"1.39737",transform:"rotate(-90 13.6943 38.6026)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"13.6943",cy:"1.99122",r:"1.39737",transform:"rotate(-90 13.6943 1.99122)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"25.9911",cy:"38.6026",r:"1.39737",transform:"rotate(-90 25.9911 38.6026)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"25.9911",cy:"1.99122",r:"1.39737",transform:"rotate(-90 25.9911 1.99122)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"38.288",cy:"38.6026",r:"1.39737",transform:"rotate(-90 38.288 38.6026)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"38.288",cy:"1.99122",r:"1.39737",transform:"rotate(-90 38.288 1.99122)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"1.39737",cy:"26.3057",r:"1.39737",transform:"rotate(-90 1.39737 26.3057)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"13.6943",cy:"26.3057",r:"1.39737",transform:"rotate(-90 13.6943 26.3057)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"25.9911",cy:"26.3057",r:"1.39737",transform:"rotate(-90 25.9911 26.3057)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"38.288",cy:"26.3057",r:"1.39737",transform:"rotate(-90 38.288 26.3057)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"1.39737",cy:"14.0086",r:"1.39737",transform:"rotate(-90 1.39737 14.0086)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"13.6943",cy:"14.0086",r:"1.39737",transform:"rotate(-90 13.6943 14.0086)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"25.9911",cy:"14.0086",r:"1.39737",transform:"rotate(-90 25.9911 14.0086)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"38.288",cy:"14.0086",r:"1.39737",transform:"rotate(-90 38.288 14.0086)",fill:"#3056D3"})]})}),(0,s.jsx)("span",{className:"absolute bottom-1 left-1",children:(0,s.jsxs)("svg",{width:"29",height:"40",viewBox:"0 0 29 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("circle",{cx:"2.288",cy:"25.9912",r:"1.39737",transform:"rotate(-90 2.288 25.9912)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"14.5849",cy:"25.9911",r:"1.39737",transform:"rotate(-90 14.5849 25.9911)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"26.7216",cy:"25.9911",r:"1.39737",transform:"rotate(-90 26.7216 25.9911)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"2.288",cy:"13.6944",r:"1.39737",transform:"rotate(-90 2.288 13.6944)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"14.5849",cy:"13.6943",r:"1.39737",transform:"rotate(-90 14.5849 13.6943)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"26.7216",cy:"13.6943",r:"1.39737",transform:"rotate(-90 26.7216 13.6943)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"2.288",cy:"38.0087",r:"1.39737",transform:"rotate(-90 2.288 38.0087)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"2.288",cy:"1.39739",r:"1.39737",transform:"rotate(-90 2.288 1.39739)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"14.5849",cy:"38.0089",r:"1.39737",transform:"rotate(-90 14.5849 38.0089)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"26.7216",cy:"38.0089",r:"1.39737",transform:"rotate(-90 26.7216 38.0089)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"14.5849",cy:"1.39761",r:"1.39737",transform:"rotate(-90 14.5849 1.39761)",fill:"#3056D3"}),(0,s.jsx)("circle",{cx:"26.7216",cy:"1.39761",r:"1.39737",transform:"rotate(-90 26.7216 1.39761)",fill:"#3056D3"})]})})]})]})})})})})}},9663:function(r,e,t){"use strict";var s=t(7437);t(2265),e.Z=()=>(0,s.jsx)("span",{className:"ml-1.5 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-t-transparent"})}},function(r){r.O(0,[972,878,23,464,971,117,744],function(){return r(r.s=3017)}),_N_E=r.O()}]);