(function(d,t){typeof exports=="object"&&typeof module<"u"?module.exports=t():typeof define=="function"&&define.amd?define(t):(d=typeof globalThis<"u"?globalThis:d||self,d["vite-plugin-bundle-prefetch"]=t())})(this,function(){"use strict";return t=>{let i;return{name:"vite-plugin-prefetch",apply:"build",configResolved(n){i=n},transformIndexHtml(n,u){var l;const c=Object.keys(u.bundle??{});if(c.some(e=>e.includes("legacy")))return n;let s=c.filter(e=>e.endsWith(".map")===!1);const f=t==null?void 0:t.excludeFn;f&&(s=s.filter(e=>!f(e)));const r=s.filter(e=>n.includes(e)===!1).map(e=>`<link rel="prefetch" href="${i.base}${e}">`).join(""),a=`${((l=n.match(/<head>([\s\S]*)<\/head>/))==null?void 0:l[1])??""}${r}`;return n=n.replace(/<head>([\s\S]*)<\/head>/,`<head>${a}</head>`),n}}}});
