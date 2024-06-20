export default (new function() {
  const module = { exports: {} }, exports = module.exports, define = null;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Alwan=e()}(this,(function(){"use strict";const t={id:"",classname:"",theme:"light",toggle:!0,popover:!0,position:"bottom-start",margin:4,preset:!0,color:"#000",default:"#000",target:"",disabled:!1,format:"rgb",singleInput:!1,inputs:!0,opacity:!0,preview:!0,copy:!0,swatches:[],toggleSwatches:!1,closeOnScroll:!1,i18n:{palette:"Color picker",buttons:{copy:"Copy color to clipboard",changeFormat:"Change color format",swatch:"Color swatch",toggleSwatches:"Toggle Swatches"},sliders:{hue:"Change hue",alpha:"Change opacity"}}},e="alwan",o=`${e}__container`,s=`${e}__palette`,n=`${e}__marker`,r=`${e}__preview`,i=`${e}__button `,l=`${e}__copy-button`,a=`${e}__slider `,h=`${e}__hue`,c=`${e}__alpha`,p=`${e}__input`,u=`${e}__inputs`,g=`${e}__swatch`,d=`${e}__swatches`,_=`${e}__reference `,f=`${e}__backdrop`,b=`${e}__toggle-button`,w=`${e}--open`,y=`${e}--collapse`,$=parseInt,{min:m,max:v,abs:x,round:A,PI:C}=Math,S=(t,e=100,o=0)=>t>e?e:t<o?o:t,k=t=>A((t%=360)<0?t+360:t),H=document,L=H.documentElement,M="button",O="open",V="close",z="color",B="click",T="pointerdown",j="scroll",E="keydown",I="input",D="change",F="blur",P="rgb",Z="hsl",K=["hex",P,Z],N="afterbegin",R="afterend",U="beforeend",q="aria-label",G={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowRight:[1,0],ArrowLeft:[-1,0]},J={deg:1,turn:360,rad:180/C,grad:.9},Q=/^#[0-9a-f]{6}$/i,W=/^hsla?\(\s*([+-]?\d*\.?\d+)(\w*)?\s*[\s,]\s*([+-]?\d*\.?\d+)%?\s*,?\s*([+-]?\d*\.?\d+)%?(?:\s*[\/,]\s*([+-]?\d*\.?\d+)(%)?)?\s*\)?$/,X=(t,e,o,s)=>{t.addEventListener(e,o,s)},Y=(t,e,o)=>{t.removeEventListener(e,o)},tt=t=>"string"==typeof t,et=t=>null!=t,ot=t=>t instanceof Element,st=t=>Number.isFinite(tt(t)&&""!==t.trim()?+t:t),{keys:nt,assign:rt,setPrototypeOf:it,prototype:lt}=Object,{from:at,isArray:ht}=Array,ct=t=>et(t)&&"object"==typeof t&&!ht(t)&&!ot(t),pt=(t,e)=>nt(t).forEach((o=>e(o,t[o]))),ut=(t,e)=>(ct(t)||(t={}),pt(e,((e,o)=>{et(o)&&rt(t,{[e]:ct(o)?ut(t[e]||{},o):o})})),t),gt=()=>H.body,dt=(t,e=gt())=>tt(t)&&t.trim()?at(e.querySelectorAll(t)):ot(t)&&gt().contains(t)&&t!==gt()?[t]:[],_t=t=>dt(`${I},${M},[tabindex]`,t),ft=(t,e,o=U)=>{t&&e&&e.insertAdjacentElement(o,t)},bt=(t,e)=>{t.innerHTML=e},wt=(t,e,o)=>{t&&t.setAttribute(e,o+"")},yt=(t,e,o,s,n,r)=>{const i=H.createElement(t);return e&&(i.className=e),s&&bt(i,s),pt(n||{},((t,e)=>{et(e)&&wt(i,t,e)})),o&&ft(i,o,r),i},$t=(t,e,o,s)=>yt("div",t,e,"",o,s),mt=t=>(t&&t.remove(),null),vt=(t,e)=>(t.replaceWith(e),e),xt=(t,e,o,s,n,r,l)=>yt(M,i+t,e,o,rt({type:M,[q]:n,title:r||n},s),l),At=(t,e,o,s=1)=>yt(I,a+t,e,"",{max:o,step:s,type:"range"}),Ct=(t,e)=>$t(o,t,{},e),St=(t,e,o)=>{t&&t.style.setProperty("--"+e,o+"")},kt=(t,e,o)=>t.classList.toggle(e,o),Ht=(t,e,o)=>{t.style.transform=`translate(${e}px,${o}px)`},Lt=(t,e=[H])=>(t&&(t=t.parentElement),t&&t!==gt()?(/auto|scroll|overflow|clip|hidden/.test(getComputedStyle(t).overflow)&&e.push(t),Lt(t,e)):e),Mt=t=>{let e,o,s,n,r,i;return ot(t)?({x:e,y:o,width:s,height:n,right:r,bottom:i}=t.getBoundingClientRect()):(e=o=0,s=r=L.clientWidth,n=i=L.clientHeight),[e,o,s,n,r,i]},Ot='<svg width="18" height="18" viewBox="0 0 24 24" aria-role="none"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>',Vt=(t,e=P)=>{let o=t.a,s="",n=e;return o<1&&(s+=", "+o,n+="a"),e===P?n+`(${t.r}, ${t.g}, ${t.b+s})`:n+`(${t.h}, ${t.s}%, ${t.l}%${s})`},zt=yt("canvas").getContext("2d");function Bt(t,e){let o,s,n="";tt(t)?n=t.trim():ct(t)&&(o=[P,Z].find((e=>e.split("").every((e=>st(t[e]))))),o&&(n=Vt(t,o)));const[r,i,l,a,h,c="1",p]=W.exec(n)||[];if(r)s={h:k(+i*(J[l]?J[l]:1)),s:S(+a),l:S(+h),a:S(+c/(p?100:1),1)},o=Z;else if(o=P,zt.fillStyle="#000",zt.fillStyle=n,n=zt.fillStyle,Q.test(n))s={r:$(n.slice(1,3),16),g:$(n.slice(3,5),16),b:$(n.slice(5,7),16),a:1};else{const[t,e,o,r]=/\((.+)\)/.exec(n)[1].split(",").map((t=>+t));s={r:t,g:e,b:o,a:r}}return s.a=A(100*s.a)/100,n=Vt(s,o),e?n:[s,o,n]}const Tt={top:[1,5,4,0],bottom:[5,1,4,0],right:[4,0,1,5],left:[0,4,1,5]},jt={start:[0,1,2],center:[1,0,2],end:[2,1,0]},Et=(t,e,o,{margin:s,position:n,toggle:r,closeOnScroll:i},{t:l,o:a})=>{s=st(s)?+s:0;const[h,c]=tt(n)?n.split("-"):[],p=Tt[h]||Tt.bottom,u=jt[c]||jt.center,g=Lt(t),d=e.style,_=()=>{d.height="";const o=Mt(H),n=Mt(t),r=Mt(e),i=[null,null];p.some((t=>{let e=t%2;const l=o[t],a=n[t],h=s+r[e+2];if(h<=x(l-a)){i[e]=a+(t<=1?-h:s),e=(e+1)%2;const l=r[e+2],c=n[e],p=n[e+4],g=o[e+4]-c,d=(l+n[e+2])/2;return u.some((t=>0===t&&l<=g?(i[e]=c,!0):1===t&&d<=p&&d<=g?(i[e]=p-d,!0):2===t&&l<=p&&(i[e]=p-l,!0))),!0}})),Ht(e,...i.map(((t,e)=>(e&&null===t&&r[3]>o[5]&&(d.height=o[5]-6+"px",r[3]=o[5]-3),A(et(t)?t:(o[e+4]-r[e+2])/2)))))},f=({type:e})=>{!l()&&r||(((t,e)=>e.every((e=>{const[o,s,,,n,r]=Mt(t),[i,l,,,a,h]=Mt(e);return s<h&&r>l&&o<a&&n>i})))(t,g)?l()?(_(),i&&e===j&&a(!1)):a(!0,!0):a(!1,!0))},b=t=>{if(l()){const{target:s,key:n,shiftKey:r}=t;if("Escape"===n)a(!1);else if("Tab"===n){const n=_t(e),i=n[0],l=n.pop(),a=s!==o||r?r&&s===i||!r&&s===l?o:null:i;a&&(t.preventDefault(),a.focus())}}},w=({target:t})=>{!l()||t===o||e.contains(t)||at(o.labels||[]).some((e=>e.contains(t)))||a(!1)},y=t=>{g.forEach((e=>{t(e,j,f)})),t(window,"resize",f),t(H,E,b),t(H,T,w)};return _(),y(X),{i:_,p:()=>{y(Y),e.style.transform=""}}},It=(t,o)=>{const a=t.config,$=$t(e,gt()),x=((t,e)=>{let o=e||xt("",gt());const s=()=>{t.u.o()};return{_:()=>o,$({preset:t,classname:n}){e&&t!==(e!==o)&&(t?(o=vt(e,xt()),e.id&&(o.id=e.id)):o=vt(o,e)),X(o,B,s),e&&!t||!tt(n)||(o.className=(i+_+n).trim())},p(){e?e!==o&&vt(o,e):mt(o)}}})(t,dt(o)[0]),A=(({m:t},e)=>{let o,r,i,l;const a=$t(s,e),h=$t(n,a),c=(e,[s,n]=[0,0])=>{let l,a,[c,p,u,g]=i;e?(o=e.clientX-c,r=e.clientY-p):(o+=s*u/100,r+=n*g/100),o=S(o,u),r=S(r,g),Ht(h,o,r),l=1-r/g,a=l*(1-o/(2*u)),t.i({s:1===a||0===a?0:(l-a)/m(a,1-a)*100,l:100*a},1)},p=t=>{t.buttons?c(t):d(!1)},u=()=>{t.v(),d(!1)},g=()=>{t.v()},d=t=>{kt(L,f,t),(t?X:Y)(H,"pointermove",p),(t?X:Y)(window,F,g)};return X(a,T,(e=>{l||(t.A(),i=Mt(a),c(e),d(!0),X(H,"pointerup",u,{once:!0}))})),X(a,E,(e=>{const o=G[e.key];o&&(e.preventDefault(),i=Mt(a),t.A(),c(null,o),t.v())})),{el:a,$({i18n:t,disabled:e}){wt(a,q,t.palette),wt(a,"tabindex",e?"":0),l=e},C(t,e){let s=e+t*m(e,1-e);i=Mt(a),o=(s?2*(1-e/s):0)*i[2],r=(1-s)*i[3],Ht(h,o,r)}}})(t,$),C=Ct($),k=((t,e)=>{let o,s,n=!1;const i=t=>{n=t,bt(s,t?'<svg width="18" height="18" viewBox="0 0 24 24" aria-role="none"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"></path></svg>':Ot)},a=t=>{const e=yt(I,"",L,"",{value:t});e.select(),H.execCommand("copy"),mt(e),s.focus(),i(!0)},h=()=>{if(!n){const e=navigator.clipboard,o=t.m.S();e?e.writeText(o).then((()=>i(!0))).catch((()=>a(o))):a(o)}};return{$({preview:t,copy:a,i18n:c}){o=mt(o),s=mt(s),t&&(o=$t(r,e,{},N)),a&&(s=xt(l,o||e,Ot,{},c.buttons.copy,"",N),X(s,B,h),X(s,F,(()=>n&&i(!1))),X(s,"mouseout",(()=>s.blur())))}}})(t,C),M=(({m:t,k:e},o)=>{let s;const n=$t("",o),r=At(h,n,360);return X(r,I,(()=>t.i({h:+r.value},2))),X(n,D,(()=>e.H(D))),{$({opacity:e,i18n:{sliders:o}}){s=mt(s),e?(s=At(c,n,1,.01),X(s,I,(()=>t.i({a:+s.value},2)))):t.i({a:1}),wt(r,q,o.hue),wt(s,q,o.alpha)},L(t,e){r.value=t+"",s&&(s.value=e+"")}}})(t,C),j=((t,e)=>{let o,s,n,r,i,{config:l,m:a}=t,h=[],c=!1;const g=()=>l.singleInput||"hex"===h[r],d=t=>{let e=t.target.value,o={};c||(a.A(),c=!0),g()||(pt(i,((t,e)=>{o[t]=+e.value})),e=Vt(o,h[r])),a.M(e,3,!1,!0)},_=()=>{i={},mt(s),s=$t(u,o,{},N);const e=h[r],n=g()?[e]:(e+(l.opacity?"a":"")).split(""),_=a.O;n.forEach((t=>{const e=yt("label","",s);i[t]=yt(I,p,e,"",{type:"text",value:_[t]}),yt("span","",e,t)})),X(s,I,d),X(s,D,(()=>{a.v(),c=!1})),X(s,"focusin",(t=>t.target.select())),X(s,E,(e=>"Enter"===e.key&&t.u.o(!1)))},f=()=>{r=(r+1)%h.length,a.V(h[r]),_()};return{$({inputs:t,format:s,i18n:i}){o=mt(o),n=mt(n),h=K,!0!==t&&(t=t||{},h=h.filter((e=>t[e])));const l=h.length;l||(h=K),r=v(h.indexOf(s),0),a.V(h[r]),l&&(o=Ct(e,R),_(),l>1&&(n=xt("",o,'<svg width="15" height="15" viewBox="0 0 20 20" aria-role="none"><path d="M10 1L5 8h10l-5-7zm0 18l5-7H5l5 7z"></path></svg>',{},i.buttons.changeFormat),X(n,B,f)))},L(t){pt(i||{},((e,o)=>{o.value=t[e]+""}))}}})(t,C),Z=((t,e)=>{let o,s;return{$({swatches:n,toggleSwatches:r,i18n:{buttons:i}}){ht(n)&&(o=mt(o),s=mt(s),n.length&&(o=$t(d,e),n.forEach((t=>{St(xt(g,o,"",{},i.swatch,tt(t)?t:Bt(t,!0)),z,Bt(t,!0))})),r&&(s=xt(b,e,'<svg width="20" height="20" viewBox="0 0 24 24" aria-role="none"><path d="M6.984 14.016l5.016-5.016 5.016 5.016h-10.031z"></path></svg>',{},i.toggleSwatches),X(s,B,(()=>{kt(o,y),t.u.B()}))),X(o,B,(({target:e})=>{e!==o&&t.m.M(e.style.getPropertyValue("--"+z),0,!0,!0)}))))}}})(t,$);let J,Q=!1,W=null;return{T(e){e=e||{};const o=this,s=$.dataset,n=t.m,{id:r,color:i}=e,{theme:l,toggle:h,popover:c,target:p,disabled:u}=ut(a,e);[x,A,k,M,j,Z].forEach((t=>t.$(a))),J=x._();let g=dt(p)[0]||J;tt(r)&&($.id=r),s.theme=l,s.display=c?"popover":"block",h||o.o(!0,!0),J.style.display=c||h?"":"none",W&&(W.p(),W=null),c?W=Et(g,$,J,a,o):ft($,g,g===J?R:U),et(i)?n.M(i):n.i({}),[J,..._t($)].forEach((t=>{t.disabled=!!u})),u&&(c?o.o(!1,!0):h||o.o(!0,!0))},i(t,e){const{r:o,g:s,b:n,a:r,h:i,s:l,l:a,rgb:h}=t;St(J,z,h),St($,P,`${o},${s},${n}`),St($,"a",r),St(A.el,"h",i),1!==e&&2!==e&&(A.C(l/100,a/100),M.L(i,r)),3!==e&&j.L(t)},o(e=!Q,o=!1){e===Q||a.disabled&&(!o||e&&a.popover)||!a.toggle&&!o||(e&&W&&W.i(),Q=e,kt($,w,e),t.k.H(Q?O:V))},t:()=>Q,B(){W&&W.i()},p(){mt($),W&&W.p(),x.p()}}},Dt=t=>(t<16?"0":"")+t.toString(16),Ft=(t,e,o)=>(t%=12,A(255*(o-e*m(o,1-o)*v(-1,m(t-3,9-t,1))))),Pt=t=>{const e={h:0,s:0,l:0,r:0,g:0,b:0,a:1,rgb:"",hsl:"",hex:""},o=t.k.H;let s,n,r;return{O:e,i(s,n,i=!0,l){r=e.hex,rt(e,s),rt(e,l||(({h:t,s:e,l:o})=>({r:Ft(t/=30,e/=100,o/=100),g:Ft(t+8,e,o),b:Ft(t+4,e,o)}))(e)),e.s=A(e.s),e.l=A(e.l),e.rgb=Vt(e),e.hsl=Vt(e,Z),e.hex=(({r:t,g:e,b:o,a:s})=>"#"+Dt(t)+Dt(e)+Dt(o)+(s<1?Dt(A(255*s)):""))(e),t.u.i(e,n),i&&r!==e.hex&&o(z,e)},M(t,s,n,r){const[i,l,a]=Bt(t);let h,c;e[l]!==a&&(l===P?(h=i,c=(({r:t,g:e,b:o,a:s})=>{const n=v(t/=255,e/=255,o/=255),r=m(t,e,o),i=n-r,l=(n+r)/2;return{h:k(60*(0===i?0:n===t?(e-o)/i%6:n===e?(o-t)/i+2:n===o?(t-e)/i+4:0)),s:i?i/(1-x(2*l-1))*100:0,l:100*l,a:s}})(h)):c=i,this.i(c,s,r,h),n&&o(D,e))},A(){n=e[s]},v(){n!==e[s]&&o(D,e)},V(e){s=t.config.format=e},S:()=>e[s]}};return class{static version(){return"2.0.3"}static setDefaults(e){ut(t,e)}constructor(e,o){this.config=ut({},t),this.k=(t=>{const e={[O]:[],[V]:[],[D]:[],[z]:[]};return{H(o,s=t.m.O){t.config.disabled||(e[o]||[]).forEach((e=>{e(rt({type:o,source:t},s))}))},j(t,o){e[t]&&!e[t].includes(o)&&"function"==typeof o&&e[t].push(o)},I(t,o){et(t)?e[t]&&(et(o)?e[t]=e[t].filter((t=>t!==o)):e[t]=[]):pt(e,(t=>{e[t]=[]}))}}})(this),this.m=Pt(this),this.u=It(this,e),this.u.T(o)}setOptions(t){this.u.T(t)}setColor(t){return this.m.M(t),this}getColor(){return{...this.m.O}}isOpen(){return this.u.t()}open(){this.u.o(!0)}close(){this.u.o(!1)}toggle(){this.u.o()}on(t,e){this.k.j(t,e)}off(t,e){this.k.I(t,e)}addSwatches(...t){this.u.T({swatches:this.config.swatches.concat(t)})}removeSwatches(...t){this.u.T({swatches:this.config.swatches.filter(((e,o)=>!t.some((t=>st(t)?+t===o:t===e))))})}enable(){this.u.T({disabled:!1})}disable(){this.u.T({disabled:!0})}reset(){this.m.M(this.config.default)}reposition(){this.u.B()}trigger(t){this.k.H(t)}destroy(){this.u.p(),pt(this,(t=>delete this[t])),it(this,lt)}}}));

  this.__default_export = module.exports;
}).__default_export;