(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Sp=!1,Cp=(n,e)=>n===e,Rp=Symbol("solid-track"),Fs={equals:Cp};let bi=null,xh=Sh;const Dn=1,Us=2,Ih={owned:null,cleanups:null,context:null,owner:null};var Ke=null;let zo=null,kp=null,at=null,kt=null,nn=null,lo=0;function As(n,e){const t=at,r=Ke,i=n.length===0,s=e===void 0?r:e,a=i?Ih:{owned:null,cleanups:null,context:s?s.context:null,owner:s},l=i?n:()=>n(()=>mn(()=>Ci(a)));Ke=a,at=null;try{return qi(l,!0)}finally{at=t,Ke=r}}function Y(n,e){e=e?Object.assign({},Fs,e):Fs;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=i=>(typeof i=="function"&&(i=i(t.value)),Ah(t,i));return[Th.bind(t),r]}function X(n,e,t){const r=co(n,e,!1,Dn);Bi(r)}function Cn(n,e,t){xh=Dp;const r=co(n,e,!1,Dn);r.user=!0,nn?nn.push(r):Bi(r)}function Ve(n,e,t){t=t?Object.assign({},Fs,t):Fs;const r=co(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,Bi(r),Th.bind(r)}function mn(n){if(at===null)return n();const e=at;at=null;try{return n()}finally{at=e}}function on(n){Cn(()=>mn(n))}function an(n){return Ke===null||(Ke.cleanups===null?Ke.cleanups=[n]:Ke.cleanups.push(n)),n}function $p(n,e){bi||(bi=Symbol("error")),Ke=co(void 0,void 0,!0),Ke.context={...Ke.context,[bi]:[e]};try{return n()}catch(t){uo(t)}finally{Ke=Ke.owner}}function Th(){if(this.sources&&this.state)if(this.state===Dn)Bi(this);else{const n=kt;kt=null,qi(()=>Bs(this),!1),kt=n}if(at){const n=this.observers?this.observers.length:0;at.sources?(at.sources.push(this),at.sourceSlots.push(n)):(at.sources=[this],at.sourceSlots=[n]),this.observers?(this.observers.push(at),this.observerSlots.push(at.sources.length-1)):(this.observers=[at],this.observerSlots=[at.sources.length-1])}return this.value}function Ah(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&qi(()=>{for(let i=0;i<n.observers.length;i+=1){const s=n.observers[i],a=zo&&zo.running;a&&zo.disposed.has(s),(a?!s.tState:!s.state)&&(s.pure?kt.push(s):nn.push(s),s.observers&&Ch(s)),a||(s.state=Dn)}if(kt.length>1e6)throw kt=[],new Error},!1)),e}function Bi(n){if(!n.fn)return;Ci(n);const e=lo;Pp(n,n.value,e)}function Pp(n,e,t){let r;const i=Ke,s=at;at=Ke=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=Dn,n.owned&&n.owned.forEach(Ci),n.owned=null),n.updatedAt=t+1,uo(a)}finally{at=s,Ke=i}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?Ah(n,r):n.value=r,n.updatedAt=t)}function co(n,e,t,r=Dn,i){const s={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:Ke,context:Ke?Ke.context:null,pure:t};return Ke===null||Ke!==Ih&&(Ke.owned?Ke.owned.push(s):Ke.owned=[s]),s}function js(n){if(n.state===0)return;if(n.state===Us)return Bs(n);if(n.suspense&&mn(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<lo);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===Dn)Bi(n);else if(n.state===Us){const r=kt;kt=null,qi(()=>Bs(n,e[0]),!1),kt=r}}function qi(n,e){if(kt)return n();let t=!1;e||(kt=[]),nn?t=!0:nn=[],lo++;try{const r=n();return Np(t),r}catch(r){t||(nn=null),kt=null,uo(r)}}function Np(n){if(kt&&(Sh(kt),kt=null),n)return;const e=nn;nn=null,e.length&&qi(()=>xh(e),!1)}function Sh(n){for(let e=0;e<n.length;e++)js(n[e])}function Dp(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:js(r)}for(e=0;e<t;e++)js(n[e])}function Bs(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const i=r.state;i===Dn?r!==e&&(!r.updatedAt||r.updatedAt<lo)&&js(r):i===Us&&Bs(r,e)}}}function Ch(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=Us,t.pure?kt.push(t):nn.push(t),t.observers&&Ch(t))}}function Ci(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),i=t.observers;if(i&&i.length){const s=i.pop(),a=t.observerSlots.pop();r<i.length&&(s.sourceSlots[a]=r,i[r]=s,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)Ci(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)Ci(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Vp(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function yc(n,e,t){try{for(const r of e)r(n)}catch(r){uo(r,t&&t.owner||null)}}function uo(n,e=Ke){const t=bi&&e&&e.context&&e.context[bi],r=Vp(n);if(!t)throw r;nn?nn.push({fn(){yc(r,t,e)},state:Dn}):yc(r,t,e)}const Op=Symbol("fallback");function bc(n){for(let e=0;e<n.length;e++)n[e]()}function Mp(n,e,t={}){let r=[],i=[],s=[],a=0,l=e.length>1?[]:null;return an(()=>bc(s)),()=>{let u=n()||[],h=u.length,f,p;return u[Rp],mn(()=>{let x,C,S,T,N,R,$,O,F;if(h===0)a!==0&&(bc(s),s=[],r=[],i=[],a=0,l&&(l=[])),t.fallback&&(r=[Op],i[0]=As(q=>(s[0]=q,t.fallback())),a=1);else if(a===0){for(i=new Array(h),p=0;p<h;p++)r[p]=u[p],i[p]=As(_);a=h}else{for(S=new Array(h),T=new Array(h),l&&(N=new Array(h)),R=0,$=Math.min(a,h);R<$&&r[R]===u[R];R++);for($=a-1,O=h-1;$>=R&&O>=R&&r[$]===u[O];$--,O--)S[O]=i[$],T[O]=s[$],l&&(N[O]=l[$]);for(x=new Map,C=new Array(O+1),p=O;p>=R;p--)F=u[p],f=x.get(F),C[p]=f===void 0?-1:f,x.set(F,p);for(f=R;f<=$;f++)F=r[f],p=x.get(F),p!==void 0&&p!==-1?(S[p]=i[f],T[p]=s[f],l&&(N[p]=l[f]),p=C[p],x.set(F,p)):s[f]();for(p=R;p<h;p++)p in S?(i[p]=S[p],s[p]=T[p],l&&(l[p]=N[p],l[p](p))):i[p]=As(_);i=i.slice(0,a=h),r=u.slice(0)}return i});function _(x){if(s[p]=x,l){const[C,S]=Y(p);return l[p]=S,e(u[p],C)}return e(u[p])}}}function E(n,e){return mn(()=>n(e||{}))}const Lp=n=>`Stale read from <${n}>.`;function Qe(n){const e="fallback"in n&&{fallback:()=>n.fallback};return Ve(Mp(()=>n.each,n.children,e||void 0))}function B(n){const e=n.keyed,t=Ve(()=>n.when,void 0,void 0),r=e?t:Ve(t,void 0,{equals:(i,s)=>!i==!s});return Ve(()=>{const i=r();if(i){const s=n.children;return typeof s=="function"&&s.length>0?mn(()=>s(e?i:()=>{if(!mn(r))throw Lp("Show");return t()})):s}return n.fallback},void 0,void 0)}let ys;function Fp(n){let e;const[t,r]=Y(e,void 0);return ys||(ys=new Set),ys.add(r),an(()=>ys.delete(r)),Ve(()=>{let i;if(i=t()){const s=n.fallback;return typeof s=="function"&&s.length?mn(()=>s(i,()=>r())):s}return $p(()=>n.children,r)},void 0,void 0)}const Ze=n=>Ve(()=>n());function Up(n,e,t){let r=t.length,i=e.length,s=r,a=0,l=0,u=e[i-1].nextSibling,h=null;for(;a<i||l<s;){if(e[a]===t[l]){a++,l++;continue}for(;e[i-1]===t[s-1];)i--,s--;if(i===a){const f=s<r?l?t[l-1].nextSibling:t[s-l]:u;for(;l<s;)n.insertBefore(t[l++],f)}else if(s===l)for(;a<i;)(!h||!h.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[s-1]&&t[l]===e[i-1]){const f=e[--i].nextSibling;n.insertBefore(t[l++],e[a++].nextSibling),n.insertBefore(t[--s],f),e[i]=t[s]}else{if(!h){h=new Map;let p=l;for(;p<s;)h.set(t[p],p++)}const f=h.get(e[a]);if(f!=null)if(l<f&&f<s){let p=a,_=1,x;for(;++p<i&&p<s&&!((x=h.get(e[p]))==null||x!==f+_);)_++;if(_>f-l){const C=e[a];for(;l<f;)n.insertBefore(t[l++],C)}else n.replaceChild(t[l++],e[a++])}else a++;else e[a++].remove()}}}const wc="_$DX_DELEGATE";function jp(n,e,t,r={}){let i;return As(s=>{i=s,e===document?n():g(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{i(),e.textContent=""}}function D(n,e,t,r){let i;const s=()=>{const l=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return l.innerHTML=n,t?l.content.firstChild.firstChild:r?l.firstChild:l.content.firstChild},a=e?()=>mn(()=>document.importNode(i||(i=s()),!0)):()=>(i||(i=s())).cloneNode(!0);return a.cloneNode=a,a}function zt(n,e=window.document){const t=e[wc]||(e[wc]=new Set);for(let r=0,i=n.length;r<i;r++){const s=n[r];t.has(s)||(t.add(s),e.addEventListener(s,Bp))}}function Fe(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function Te(n,e){e==null?n.removeAttribute("class"):n.className=e}function Be(n,e,t,r){Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t}function en(n,e,t){t!=null?n.style.setProperty(e,t):n.style.removeProperty(e)}function sa(n,e,t){return mn(()=>n(e,t))}function g(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return qs(n,e,r,t);X(i=>qs(n,e(),i,t),r)}function Bp(n){let e=n.target;const t=`$$${n.type}`,r=n.target,i=n.currentTarget,s=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const h=e[`${t}Data`];if(h!==void 0?u.call(e,h,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&s(e.host),!0},l=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();s(u[0]);for(let h=0;h<u.length-2&&(e=u[h],!!a());h++){if(e._$host){e=e._$host,l();break}if(e.parentNode===i)break}}else l();s(r)}function qs(n,e,t,r,i){for(;typeof t=="function";)t=t();if(e===t)return t;const s=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,s==="string"||s==="number"){if(s==="number"&&(e=e.toString(),e===t))return t;if(a){let l=t[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),t=Or(n,t,r,l)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||s==="boolean")t=Or(n,t,r);else{if(s==="function")return X(()=>{let l=e();for(;typeof l=="function";)l=l();t=qs(n,l,t,r)}),()=>t;if(Array.isArray(e)){const l=[],u=t&&Array.isArray(t);if(oa(l,e,t,i))return X(()=>t=qs(n,l,t,r,!0)),()=>t;if(l.length===0){if(t=Or(n,t,r),a)return t}else u?t.length===0?Ec(n,l,r):Up(n,t,l):(t&&Or(n),Ec(n,l));t=l}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=Or(n,t,r,e);Or(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function oa(n,e,t,r){let i=!1;for(let s=0,a=e.length;s<a;s++){let l=e[s],u=t&&t[n.length],h;if(!(l==null||l===!0||l===!1))if((h=typeof l)=="object"&&l.nodeType)n.push(l);else if(Array.isArray(l))i=oa(n,l,u)||i;else if(h==="function")if(r){for(;typeof l=="function";)l=l();i=oa(n,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else n.push(l),i=!0;else{const f=String(l);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return i}function Ec(n,e,t=null){for(let r=0,i=e.length;r<i;r++)n.insertBefore(e[r],t)}function Or(n,e,t,r){if(t===void 0)return n.textContent="";const i=r||document.createTextNode("");if(e.length){let s=!1;for(let a=e.length-1;a>=0;a--){const l=e[a];if(i!==l){const u=l.parentNode===n;!s&&!a?u?n.replaceChild(i,l):n.insertBefore(i,t):u&&l.remove()}else s=!0}}else n.insertBefore(i,t);return[i]}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp=()=>{};var xc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Gp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],l=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},kh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,l=a?n[i+1]:0,u=i+2<n.length,h=u?n[i+2]:0,f=s>>2,p=(s&3)<<4|l>>4;let _=(l&15)<<2|h>>6,x=h&63;u||(x=64,a||(_=64)),r.push(t[f],t[p],t[_],t[x])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Rh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||l==null||h==null||p==null)throw new zp;const _=s<<2|l>>4;if(r.push(_),h!==64){const x=l<<4&240|h>>2;if(r.push(x),p!==64){const C=h<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hp=function(n){const e=Rh(n);return kh.encodeByteArray(e,!0)},Gs=function(n){return Hp(n).replace(/\./g,"")},$h=function(n){try{return kh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=()=>Wp().__FIREBASE_DEFAULTS__,Qp=()=>{if(typeof process>"u"||typeof xc>"u")return;const n=xc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Yp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&$h(n[1]);return e&&JSON.parse(e)},ho=()=>{try{return qp()||Kp()||Qp()||Yp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ph=n=>{var e,t;return(t=(e=ho())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Jp=n=>{const e=Ph(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Nh=()=>{var n;return(n=ho())===null||n===void 0?void 0:n.config},Dh=n=>{var e;return(e=ho())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Vh(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Gs(JSON.stringify(t)),Gs(JSON.stringify(a)),""].join(".")}const wi={};function eg(){const n={prod:[],emulator:[]};for(const e of Object.keys(wi))wi[e]?n.emulator.push(e):n.prod.push(e);return n}function tg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ic=!1;function Oh(n,e){if(typeof window>"u"||typeof document>"u"||!ei(window.location.host)||wi[n]===e||wi[n]||Ic)return;wi[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",s=eg().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function l(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,x){_.setAttribute("width","24"),_.setAttribute("id",x),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Ic=!0,a()},_}function f(_,x){_.setAttribute("id",x),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=tg(r),x=t("text"),C=document.getElementById(x)||document.createElement("span"),S=t("learnmore"),T=document.getElementById(S)||document.createElement("a"),N=t("preprendIcon"),R=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const $=_.element;l($),f(T,S);const O=h();u(R,N),$.append(R,C,T,O),document.body.appendChild($)}s?(C.innerText="Preview backend disconnected.",R.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(R.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",x)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ng(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($t())}function rg(){var n;const e=(n=ho())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ig(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function og(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ag(){const n=$t();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function lg(){return!rg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cg(){try{return typeof indexedDB=="object"}catch{return!1}}function ug(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg="FirebaseError";class Vn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=hg,Object.setPrototypeOf(this,Vn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gi.prototype.create)}}class Gi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?dg(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Vn(i,l,r)}}function dg(n,e){return n.replace(fg,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const fg=/\{\$([^}]+)}/g;function pg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ir(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(Tc(s)&&Tc(a)){if(!Ir(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Tc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function gg(n,e){const t=new mg(n,e);return t.subscribe.bind(t)}class mg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");_g(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Ho),i.error===void 0&&(i.error=Ho),i.complete===void 0&&(i.complete=Ho);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _g(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ho(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(n){return n&&n._delegate?n._delegate:n}class Tr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Xp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bg(e))try{this.getOrInitializeService({instanceIdentifier:_r})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=_r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_r){return this.instances.has(e)}getOptions(e=_r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_r){return this.component?this.component.multipleInstances?e:_r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yg(n){return n===_r?void 0:n}function bg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const Eg={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},xg=we.INFO,Ig={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},Tg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Ig[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Da{constructor(e){this.name=e,this._logLevel=xg,this._logHandler=Tg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Eg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const Ag=(n,e)=>e.some(t=>n instanceof t);let Ac,Sc;function Sg(){return Ac||(Ac=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cg(){return Sc||(Sc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mh=new WeakMap,aa=new WeakMap,Lh=new WeakMap,Wo=new WeakMap,Va=new WeakMap;function Rg(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Kn(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Mh.set(t,n)}).catch(()=>{}),Va.set(e,n),e}function kg(n){if(aa.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});aa.set(n,e)}let la={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return aa.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Lh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Kn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function $g(n){la=n(la)}function Pg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ko(this),e,...t);return Lh.set(r,e.sort?e.sort():[e]),Kn(r)}:Cg().includes(n)?function(...e){return n.apply(Ko(this),e),Kn(Mh.get(this))}:function(...e){return Kn(n.apply(Ko(this),e))}}function Ng(n){return typeof n=="function"?Pg(n):(n instanceof IDBTransaction&&kg(n),Ag(n,Sg())?new Proxy(n,la):n)}function Kn(n){if(n instanceof IDBRequest)return Rg(n);if(Wo.has(n))return Wo.get(n);const e=Ng(n);return e!==n&&(Wo.set(n,e),Va.set(e,n)),e}const Ko=n=>Va.get(n);function Dg(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),l=Kn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Kn(a.result),u.oldVersion,u.newVersion,Kn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Vg=["get","getKey","getAll","getAllKeys","count"],Og=["put","add","delete","clear"],Qo=new Map;function Cc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qo.get(e))return Qo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Og.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Vg.includes(t)))return;const s=async function(a,...l){const u=this.transaction(a,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),i&&u.done]))[0]};return Qo.set(e,s),s}$g(n=>({...n,get:(e,t,r)=>Cc(e,t)||n.get(e,t,r),has:(e,t)=>!!Cc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Lg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Lg(n){const e=n.getComponent();return e?.type==="VERSION"}const ca="@firebase/app",Rc="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new Da("@firebase/app"),Fg="@firebase/app-compat",Ug="@firebase/analytics-compat",jg="@firebase/analytics",Bg="@firebase/app-check-compat",qg="@firebase/app-check",Gg="@firebase/auth",zg="@firebase/auth-compat",Hg="@firebase/database",Wg="@firebase/data-connect",Kg="@firebase/database-compat",Qg="@firebase/functions",Yg="@firebase/functions-compat",Jg="@firebase/installations",Xg="@firebase/installations-compat",Zg="@firebase/messaging",em="@firebase/messaging-compat",tm="@firebase/performance",nm="@firebase/performance-compat",rm="@firebase/remote-config",im="@firebase/remote-config-compat",sm="@firebase/storage",om="@firebase/storage-compat",am="@firebase/firestore",lm="@firebase/ai",cm="@firebase/firestore-compat",um="firebase",hm="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua="[DEFAULT]",dm={[ca]:"fire-core",[Fg]:"fire-core-compat",[jg]:"fire-analytics",[Ug]:"fire-analytics-compat",[qg]:"fire-app-check",[Bg]:"fire-app-check-compat",[Gg]:"fire-auth",[zg]:"fire-auth-compat",[Hg]:"fire-rtdb",[Wg]:"fire-data-connect",[Kg]:"fire-rtdb-compat",[Qg]:"fire-fn",[Yg]:"fire-fn-compat",[Jg]:"fire-iid",[Xg]:"fire-iid-compat",[Zg]:"fire-fcm",[em]:"fire-fcm-compat",[tm]:"fire-perf",[nm]:"fire-perf-compat",[rm]:"fire-rc",[im]:"fire-rc-compat",[sm]:"fire-gcs",[om]:"fire-gcs-compat",[am]:"fire-fst",[cm]:"fire-fst-compat",[lm]:"fire-vertex","fire-js":"fire-js",[um]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs=new Map,fm=new Map,ha=new Map;function kc(n,e){try{n.container.addComponent(e)}catch(t){Rn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Wr(n){const e=n.name;if(ha.has(e))return Rn.debug(`There were multiple attempts to register component ${e}.`),!1;ha.set(e,n);for(const t of zs.values())kc(t,n);for(const t of fm.values())kc(t,n);return!0}function Oa(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Zt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qn=new Gi("app","Firebase",pm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Qn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=hm;function Fh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ua,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Qn.create("bad-app-name",{appName:String(i)});if(t||(t=Nh()),!t)throw Qn.create("no-options");const s=zs.get(i);if(s){if(Ir(t,s.options)&&Ir(r,s.config))return s;throw Qn.create("duplicate-app",{appName:i})}const a=new wg(i);for(const u of ha.values())a.addComponent(u);const l=new gm(t,r,a);return zs.set(i,l),l}function Uh(n=ua){const e=zs.get(n);if(!e&&n===ua&&Nh())return Fh();if(!e)throw Qn.create("no-app",{appName:n});return e}function Yn(n,e,t){var r;let i=(r=dm[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rn.warn(l.join(" "));return}Wr(new Tr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mm="firebase-heartbeat-database",_m=1,Ri="firebase-heartbeat-store";let Yo=null;function jh(){return Yo||(Yo=Dg(mm,_m,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ri)}catch(t){console.warn(t)}}}}).catch(n=>{throw Qn.create("idb-open",{originalErrorMessage:n.message})})),Yo}async function vm(n){try{const t=(await jh()).transaction(Ri),r=await t.objectStore(Ri).get(Bh(n));return await t.done,r}catch(e){if(e instanceof Vn)Rn.warn(e.message);else{const t=Qn.create("idb-get",{originalErrorMessage:e?.message});Rn.warn(t.message)}}}async function $c(n,e){try{const r=(await jh()).transaction(Ri,"readwrite");await r.objectStore(Ri).put(e,Bh(n)),await r.done}catch(t){if(t instanceof Vn)Rn.warn(t.message);else{const r=Qn.create("idb-set",{originalErrorMessage:t?.message});Rn.warn(r.message)}}}function Bh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym=1024,bm=30;class wm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new xm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Pc();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>bm){const a=Im(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Rn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Pc(),{heartbeatsToSend:r,unsentEntries:i}=Em(this._heartbeatsCache.heartbeats),s=Gs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Rn.warn(t),""}}}function Pc(){return new Date().toISOString().substring(0,10)}function Em(n,e=ym){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Nc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Nc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class xm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cg()?ug().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vm(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return $c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return $c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Nc(n){return Gs(JSON.stringify({version:2,heartbeats:n})).length}function Im(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(n){Wr(new Tr("platform-logger",e=>new Mg(e),"PRIVATE")),Wr(new Tr("heartbeat",e=>new wm(e),"PRIVATE")),Yn(ca,Rc,n),Yn(ca,Rc,"esm2017"),Yn("fire-js","")}Tm("");var Dc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jn,qh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,v){function y(){}y.prototype=v.prototype,w.D=v.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(I,A,k){for(var b=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)b[oe-2]=arguments[oe];return v.prototype[A].apply(I,b)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,v,y){y||(y=0);var I=Array(16);if(typeof v=="string")for(var A=0;16>A;++A)I[A]=v.charCodeAt(y++)|v.charCodeAt(y++)<<8|v.charCodeAt(y++)<<16|v.charCodeAt(y++)<<24;else for(A=0;16>A;++A)I[A]=v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24;v=w.g[0],y=w.g[1],A=w.g[2];var k=w.g[3],b=v+(k^y&(A^k))+I[0]+3614090360&4294967295;v=y+(b<<7&4294967295|b>>>25),b=k+(A^v&(y^A))+I[1]+3905402710&4294967295,k=v+(b<<12&4294967295|b>>>20),b=A+(y^k&(v^y))+I[2]+606105819&4294967295,A=k+(b<<17&4294967295|b>>>15),b=y+(v^A&(k^v))+I[3]+3250441966&4294967295,y=A+(b<<22&4294967295|b>>>10),b=v+(k^y&(A^k))+I[4]+4118548399&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(A^v&(y^A))+I[5]+1200080426&4294967295,k=v+(b<<12&4294967295|b>>>20),b=A+(y^k&(v^y))+I[6]+2821735955&4294967295,A=k+(b<<17&4294967295|b>>>15),b=y+(v^A&(k^v))+I[7]+4249261313&4294967295,y=A+(b<<22&4294967295|b>>>10),b=v+(k^y&(A^k))+I[8]+1770035416&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(A^v&(y^A))+I[9]+2336552879&4294967295,k=v+(b<<12&4294967295|b>>>20),b=A+(y^k&(v^y))+I[10]+4294925233&4294967295,A=k+(b<<17&4294967295|b>>>15),b=y+(v^A&(k^v))+I[11]+2304563134&4294967295,y=A+(b<<22&4294967295|b>>>10),b=v+(k^y&(A^k))+I[12]+1804603682&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(A^v&(y^A))+I[13]+4254626195&4294967295,k=v+(b<<12&4294967295|b>>>20),b=A+(y^k&(v^y))+I[14]+2792965006&4294967295,A=k+(b<<17&4294967295|b>>>15),b=y+(v^A&(k^v))+I[15]+1236535329&4294967295,y=A+(b<<22&4294967295|b>>>10),b=v+(A^k&(y^A))+I[1]+4129170786&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^A&(v^y))+I[6]+3225465664&4294967295,k=v+(b<<9&4294967295|b>>>23),b=A+(v^y&(k^v))+I[11]+643717713&4294967295,A=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(A^k))+I[0]+3921069994&4294967295,y=A+(b<<20&4294967295|b>>>12),b=v+(A^k&(y^A))+I[5]+3593408605&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^A&(v^y))+I[10]+38016083&4294967295,k=v+(b<<9&4294967295|b>>>23),b=A+(v^y&(k^v))+I[15]+3634488961&4294967295,A=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(A^k))+I[4]+3889429448&4294967295,y=A+(b<<20&4294967295|b>>>12),b=v+(A^k&(y^A))+I[9]+568446438&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^A&(v^y))+I[14]+3275163606&4294967295,k=v+(b<<9&4294967295|b>>>23),b=A+(v^y&(k^v))+I[3]+4107603335&4294967295,A=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(A^k))+I[8]+1163531501&4294967295,y=A+(b<<20&4294967295|b>>>12),b=v+(A^k&(y^A))+I[13]+2850285829&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^A&(v^y))+I[2]+4243563512&4294967295,k=v+(b<<9&4294967295|b>>>23),b=A+(v^y&(k^v))+I[7]+1735328473&4294967295,A=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(A^k))+I[12]+2368359562&4294967295,y=A+(b<<20&4294967295|b>>>12),b=v+(y^A^k)+I[5]+4294588738&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^A)+I[8]+2272392833&4294967295,k=v+(b<<11&4294967295|b>>>21),b=A+(k^v^y)+I[11]+1839030562&4294967295,A=k+(b<<16&4294967295|b>>>16),b=y+(A^k^v)+I[14]+4259657740&4294967295,y=A+(b<<23&4294967295|b>>>9),b=v+(y^A^k)+I[1]+2763975236&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^A)+I[4]+1272893353&4294967295,k=v+(b<<11&4294967295|b>>>21),b=A+(k^v^y)+I[7]+4139469664&4294967295,A=k+(b<<16&4294967295|b>>>16),b=y+(A^k^v)+I[10]+3200236656&4294967295,y=A+(b<<23&4294967295|b>>>9),b=v+(y^A^k)+I[13]+681279174&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^A)+I[0]+3936430074&4294967295,k=v+(b<<11&4294967295|b>>>21),b=A+(k^v^y)+I[3]+3572445317&4294967295,A=k+(b<<16&4294967295|b>>>16),b=y+(A^k^v)+I[6]+76029189&4294967295,y=A+(b<<23&4294967295|b>>>9),b=v+(y^A^k)+I[9]+3654602809&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^A)+I[12]+3873151461&4294967295,k=v+(b<<11&4294967295|b>>>21),b=A+(k^v^y)+I[15]+530742520&4294967295,A=k+(b<<16&4294967295|b>>>16),b=y+(A^k^v)+I[2]+3299628645&4294967295,y=A+(b<<23&4294967295|b>>>9),b=v+(A^(y|~k))+I[0]+4096336452&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~A))+I[7]+1126891415&4294967295,k=v+(b<<10&4294967295|b>>>22),b=A+(v^(k|~y))+I[14]+2878612391&4294967295,A=k+(b<<15&4294967295|b>>>17),b=y+(k^(A|~v))+I[5]+4237533241&4294967295,y=A+(b<<21&4294967295|b>>>11),b=v+(A^(y|~k))+I[12]+1700485571&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~A))+I[3]+2399980690&4294967295,k=v+(b<<10&4294967295|b>>>22),b=A+(v^(k|~y))+I[10]+4293915773&4294967295,A=k+(b<<15&4294967295|b>>>17),b=y+(k^(A|~v))+I[1]+2240044497&4294967295,y=A+(b<<21&4294967295|b>>>11),b=v+(A^(y|~k))+I[8]+1873313359&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~A))+I[15]+4264355552&4294967295,k=v+(b<<10&4294967295|b>>>22),b=A+(v^(k|~y))+I[6]+2734768916&4294967295,A=k+(b<<15&4294967295|b>>>17),b=y+(k^(A|~v))+I[13]+1309151649&4294967295,y=A+(b<<21&4294967295|b>>>11),b=v+(A^(y|~k))+I[4]+4149444226&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~A))+I[11]+3174756917&4294967295,k=v+(b<<10&4294967295|b>>>22),b=A+(v^(k|~y))+I[2]+718787259&4294967295,A=k+(b<<15&4294967295|b>>>17),b=y+(k^(A|~v))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+v&4294967295,w.g[1]=w.g[1]+(A+(b<<21&4294967295|b>>>11))&4294967295,w.g[2]=w.g[2]+A&4294967295,w.g[3]=w.g[3]+k&4294967295}r.prototype.u=function(w,v){v===void 0&&(v=w.length);for(var y=v-this.blockSize,I=this.B,A=this.h,k=0;k<v;){if(A==0)for(;k<=y;)i(this,w,k),k+=this.blockSize;if(typeof w=="string"){for(;k<v;)if(I[A++]=w.charCodeAt(k++),A==this.blockSize){i(this,I),A=0;break}}else for(;k<v;)if(I[A++]=w[k++],A==this.blockSize){i(this,I),A=0;break}}this.h=A,this.o+=v},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var v=1;v<w.length-8;++v)w[v]=0;var y=8*this.o;for(v=w.length-8;v<w.length;++v)w[v]=y&255,y/=256;for(this.u(w),w=Array(16),v=y=0;4>v;++v)for(var I=0;32>I;I+=8)w[y++]=this.g[v]>>>I&255;return w};function s(w,v){var y=l;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=v(w)}function a(w,v){this.h=v;for(var y=[],I=!0,A=w.length-1;0<=A;A--){var k=w[A]|0;I&&k==v||(y[A]=k,I=!1)}this.g=y}var l={};function u(w){return-128<=w&&128>w?s(w,function(v){return new a([v|0],0>v?-1:0)}):new a([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return T(h(-w));for(var v=[],y=1,I=0;w>=y;I++)v[I]=w/y|0,y*=4294967296;return new a(v,0)}function f(w,v){if(w.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(w.charAt(0)=="-")return T(f(w.substring(1),v));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(v,8)),I=p,A=0;A<w.length;A+=8){var k=Math.min(8,w.length-A),b=parseInt(w.substring(A,A+k),v);8>k?(k=h(Math.pow(v,k)),I=I.j(k).add(h(b))):(I=I.j(y),I=I.add(h(b)))}return I}var p=u(0),_=u(1),x=u(16777216);n=a.prototype,n.m=function(){if(S(this))return-T(this).m();for(var w=0,v=1,y=0;y<this.g.length;y++){var I=this.i(y);w+=(0<=I?I:4294967296+I)*v,v*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(S(this))return"-"+T(this).toString(w);for(var v=h(Math.pow(w,6)),y=this,I="";;){var A=O(y,v).g;y=N(y,A.j(v));var k=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=A,C(y))return k+I;for(;6>k.length;)k="0"+k;I=k+I}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var v=0;v<w.g.length;v++)if(w.g[v]!=0)return!1;return!0}function S(w){return w.h==-1}n.l=function(w){return w=N(this,w),S(w)?-1:C(w)?0:1};function T(w){for(var v=w.g.length,y=[],I=0;I<v;I++)y[I]=~w.g[I];return new a(y,~w.h).add(_)}n.abs=function(){return S(this)?T(this):this},n.add=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],I=0,A=0;A<=v;A++){var k=I+(this.i(A)&65535)+(w.i(A)&65535),b=(k>>>16)+(this.i(A)>>>16)+(w.i(A)>>>16);I=b>>>16,k&=65535,b&=65535,y[A]=b<<16|k}return new a(y,y[y.length-1]&-2147483648?-1:0)};function N(w,v){return w.add(T(v))}n.j=function(w){if(C(this)||C(w))return p;if(S(this))return S(w)?T(this).j(T(w)):T(T(this).j(w));if(S(w))return T(this.j(T(w)));if(0>this.l(x)&&0>w.l(x))return h(this.m()*w.m());for(var v=this.g.length+w.g.length,y=[],I=0;I<2*v;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(var A=0;A<w.g.length;A++){var k=this.i(I)>>>16,b=this.i(I)&65535,oe=w.i(A)>>>16,Z=w.i(A)&65535;y[2*I+2*A]+=b*Z,R(y,2*I+2*A),y[2*I+2*A+1]+=k*Z,R(y,2*I+2*A+1),y[2*I+2*A+1]+=b*oe,R(y,2*I+2*A+1),y[2*I+2*A+2]+=k*oe,R(y,2*I+2*A+2)}for(I=0;I<v;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=v;I<2*v;I++)y[I]=0;return new a(y,0)};function R(w,v){for(;(w[v]&65535)!=w[v];)w[v+1]+=w[v]>>>16,w[v]&=65535,v++}function $(w,v){this.g=w,this.h=v}function O(w,v){if(C(v))throw Error("division by zero");if(C(w))return new $(p,p);if(S(w))return v=O(T(w),v),new $(T(v.g),T(v.h));if(S(v))return v=O(w,T(v)),new $(T(v.g),v.h);if(30<w.g.length){if(S(w)||S(v))throw Error("slowDivide_ only works with positive integers.");for(var y=_,I=v;0>=I.l(w);)y=F(y),I=F(I);var A=q(y,1),k=q(I,1);for(I=q(I,2),y=q(y,2);!C(I);){var b=k.add(I);0>=b.l(w)&&(A=A.add(y),k=b),I=q(I,1),y=q(y,1)}return v=N(w,A.j(v)),new $(A,v)}for(A=p;0<=w.l(v);){for(y=Math.max(1,Math.floor(w.m()/v.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),k=h(y),b=k.j(v);S(b)||0<b.l(w);)y-=I,k=h(y),b=k.j(v);C(k)&&(k=_),A=A.add(k),w=N(w,b)}return new $(A,w)}n.A=function(w){return O(this,w).h},n.and=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],I=0;I<v;I++)y[I]=this.i(I)&w.i(I);return new a(y,this.h&w.h)},n.or=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],I=0;I<v;I++)y[I]=this.i(I)|w.i(I);return new a(y,this.h|w.h)},n.xor=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],I=0;I<v;I++)y[I]=this.i(I)^w.i(I);return new a(y,this.h^w.h)};function F(w){for(var v=w.g.length+1,y=[],I=0;I<v;I++)y[I]=w.i(I)<<1|w.i(I-1)>>>31;return new a(y,w.h)}function q(w,v){var y=v>>5;v%=32;for(var I=w.g.length-y,A=[],k=0;k<I;k++)A[k]=0<v?w.i(k+y)>>>v|w.i(k+y+1)<<32-v:w.i(k+y);return new a(A,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,qh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Jn=a}).apply(typeof Dc<"u"?Dc:typeof self<"u"?self:typeof window<"u"?window:{});var bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gh,mi,zh,Ss,da,Hh,Wh,Kh;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof bs=="object"&&bs];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,c){if(c)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var P=o[m];if(!(P in d))break e;d=d[P]}o=o[o.length-1],m=d[o],c=c(m),c!=m&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function s(o,c){o instanceof String&&(o+="");var d=0,m=!1,P={next:function(){if(!m&&d<o.length){var V=d++;return{value:c(V,o[V]),done:!1}}return m=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}i("Array.prototype.values",function(o){return o||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function p(o,c,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,m),o.apply(c,P)}}return function(){return o.apply(c,arguments)}}function _(o,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function x(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function C(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,P,V){for(var W=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)W[Le-2]=arguments[Le];return c.prototype[P].apply(m,W)}}function S(o){const c=o.length;if(0<c){const d=Array(c);for(let m=0;m<c;m++)d[m]=o[m];return d}return[]}function T(o,c){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const P=o.length||0,V=m.length||0;o.length=P+V;for(let W=0;W<V;W++)o[P+W]=m[W]}else o.push(m)}}class N{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function R(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function O(o){return O[" "](o),o}O[" "]=function(){};var F=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function q(o,c,d){for(const m in o)c.call(d,o[m],m,o)}function w(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function v(o){const c={};for(const d in o)c[d]=o[d];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,c){let d,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(d in m)o[d]=m[d];for(let V=0;V<y.length;V++)d=y[V],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function A(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function k(o){l.setTimeout(()=>{throw o},0)}function b(){var o=H;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class oe{constructor(){this.h=this.g=null}add(c,d){const m=Z.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var Z=new N(()=>new M,o=>o.reset());class M{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let z,j=!1,H=new oe,ee=()=>{const o=l.Promise.resolve(void 0);z=()=>{o.then(Ae)}};var Ae=()=>{for(var o;o=b();){try{o.h.call(o.g)}catch(d){k(d)}var c=Z;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}j=!1};function ae(){this.s=this.s,this.C=this.C}ae.prototype.s=!1,ae.prototype.ma=function(){this.s||(this.s=!0,this.N())},ae.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function de(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}de.prototype.h=function(){this.defaultPrevented=!0};var pe=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function ce(o,c){if(de.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(F){e:{try{O(c.nodeName);var P=!0;break e}catch{}P=!1}P||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Ue[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&ce.aa.h.call(this)}}C(ce,de);var Ue={2:"touch",3:"pen",4:"mouse"};ce.prototype.h=function(){ce.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var xe="closure_listenable_"+(1e6*Math.random()|0),ne=0;function Oe(o,c,d,m,P){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=P,this.key=++ne,this.da=this.fa=!1}function ke(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Pe(o){this.src=o,this.g={},this.h=0}Pe.prototype.add=function(o,c,d,m,P){var V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);var W=Ot(o,c,m,P);return-1<W?(c=o[W],d||(c.fa=!1)):(c=new Oe(c,this.src,V,!!m,P),c.fa=d,o.push(c)),c};function Ge(o,c){var d=c.type;if(d in o.g){var m=o.g[d],P=Array.prototype.indexOf.call(m,c,void 0),V;(V=0<=P)&&Array.prototype.splice.call(m,P,1),V&&(ke(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Ot(o,c,d,m){for(var P=0;P<o.length;++P){var V=o[P];if(!V.da&&V.listener==c&&V.capture==!!d&&V.ha==m)return P}return-1}var wt="closure_lm_"+(1e6*Math.random()|0),Pt={};function Ft(o,c,d,m,P){if(Array.isArray(c)){for(var V=0;V<c.length;V++)Ft(o,c[V],d,m,P);return null}return d=ue(d),o&&o[xe]?o.K(c,d,h(m)?!!m.capture:!1,P):Ut(o,c,d,!1,m,P)}function Ut(o,c,d,m,P,V){if(!c)throw Error("Invalid event type");var W=h(P)?!!P.capture:!!P,Le=Qt(o);if(Le||(o[wt]=Le=new Pe(o)),d=Le.add(c,d,m,W,V),d.proxy)return d;if(m=yn(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)pe||(P=W),P===void 0&&(P=!1),o.addEventListener(c.toString(),m,P);else if(o.attachEvent)o.attachEvent(Et(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function yn(){function o(d){return c.call(o.src,o.listener,d)}const c=Mn;return o}function On(o,c,d,m,P){if(Array.isArray(c))for(var V=0;V<c.length;V++)On(o,c[V],d,m,P);else m=h(m)?!!m.capture:!!m,d=ue(d),o&&o[xe]?(o=o.i,c=String(c).toString(),c in o.g&&(V=o.g[c],d=Ot(V,d,m,P),-1<d&&(ke(V[d]),Array.prototype.splice.call(V,d,1),V.length==0&&(delete o.g[c],o.h--)))):o&&(o=Qt(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Ot(c,d,m,P)),(d=-1<o?c[o]:null)&&_e(d))}function _e(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[xe])Ge(c.i,o);else{var d=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(d,m,o.capture):c.detachEvent?c.detachEvent(Et(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=Qt(c))?(Ge(d,o),d.h==0&&(d.src=null,c[wt]=null)):ke(o)}}}function Et(o){return o in Pt?Pt[o]:Pt[o]="on"+o}function Mn(o,c){if(o.da)o=!0;else{c=new ce(c,this);var d=o.listener,m=o.ha||o.src;o.fa&&_e(o),o=d.call(m,c)}return o}function Qt(o){return o=o[wt],o instanceof Pe?o:null}var et="__closure_events_fn_"+(1e9*Math.random()>>>0);function ue(o){return typeof o=="function"?o:(o[et]||(o[et]=function(c){return o.handleEvent(c)}),o[et])}function ie(){ae.call(this),this.i=new Pe(this),this.M=this,this.F=null}C(ie,ae),ie.prototype[xe]=!0,ie.prototype.removeEventListener=function(o,c,d,m){On(this,o,c,d,m)};function me(o,c){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new de(c,o);else if(c instanceof de)c.target=c.target||o;else{var P=c;c=new de(m,o),I(c,P)}if(P=!0,d)for(var V=d.length-1;0<=V;V--){var W=c.g=d[V];P=ye(W,m,!0,c)&&P}if(W=c.g=o,P=ye(W,m,!0,c)&&P,P=ye(W,m,!1,c)&&P,d)for(V=0;V<d.length;V++)W=c.g=d[V],P=ye(W,m,!1,c)&&P}ie.prototype.N=function(){if(ie.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],m=0;m<d.length;m++)ke(d[m]);delete o.g[c],o.h--}}this.F=null},ie.prototype.K=function(o,c,d,m){return this.i.add(String(o),c,!1,d,m)},ie.prototype.L=function(o,c,d,m){return this.i.add(String(o),c,!0,d,m)};function ye(o,c,d,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var P=!0,V=0;V<c.length;++V){var W=c[V];if(W&&!W.da&&W.capture==d){var Le=W.listener,_t=W.ha||W.src;W.fa&&Ge(o.i,W),P=Le.call(_t,m)!==!1&&P}}return P&&!m.defaultPrevented}function Ne(o,c,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function De(o){o.g=Ne(()=>{o.g=null,o.i&&(o.i=!1,De(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class ht extends ae{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:De(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ce(o){ae.call(this),this.h=o,this.g={}}C(Ce,ae);var gt=[];function jt(o){q(o.g,function(c,d){this.g.hasOwnProperty(d)&&_e(c)},o),o.g={}}Ce.prototype.N=function(){Ce.aa.N.call(this),jt(this)},Ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ht=l.JSON.stringify,hr=l.JSON.parse,Ln=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function bn(){}bn.prototype.h=null;function Pr(o){return o.h||(o.h=o.i())}function dr(){}var Yt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function J(){de.call(this,"d")}C(J,de);function je(){de.call(this,"c")}C(je,de);var Me={},st=null;function tt(){return st=st||new ie}Me.La="serverreachability";function ge(o){de.call(this,Me.La,o)}C(ge,de);function re(o){const c=tt();me(c,new ge(c))}Me.STAT_EVENT="statevent";function We(o,c){de.call(this,Me.STAT_EVENT,o),this.stat=c}C(We,de);function be(o){const c=tt();me(c,new We(c,o))}Me.Ma="timingevent";function mt(o,c){de.call(this,Me.Ma,o),this.size=c}C(mt,de);function Ye(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function ft(){this.g=!0}ft.prototype.xa=function(){this.g=!1};function Nt(o,c,d,m,P,V){o.info(function(){if(o.g)if(V)for(var W="",Le=V.split("&"),_t=0;_t<Le.length;_t++){var Se=Le[_t].split("=");if(1<Se.length){var xt=Se[0];Se=Se[1];var It=xt.split("_");W=2<=It.length&&It[1]=="type"?W+(xt+"="+Se+"&"):W+(xt+"=redacted&")}}else W=null;else W=V;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+c+`
`+d+`
`+W})}function Dt(o,c,d,m,P,V,W){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+c+`
`+d+`
`+V+" "+W})}function Re(o,c,d,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+wn(o,d)+(m?" "+m:"")})}function ln(o,c){o.info(function(){return"TIMEOUT: "+c})}ft.prototype.info=function(){};function wn(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var P=m[1];if(Array.isArray(P)&&!(1>P.length)){var V=P[0];if(V!="noop"&&V!="stop"&&V!="close")for(var W=1;W<P.length;W++)P[W]=""}}}}return Ht(d)}catch{return c}}var Jt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Dl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},No;function os(){}C(os,bn),os.prototype.g=function(){return new XMLHttpRequest},os.prototype.i=function(){return{}},No=new os;function Fn(o,c,d,m){this.j=o,this.i=c,this.l=d,this.R=m||1,this.U=new Ce(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vl}function Vl(){this.i=null,this.g="",this.h=!1}var Ol={},Do={};function Vo(o,c,d){o.L=1,o.v=us(En(c)),o.m=d,o.P=!0,Ml(o,null)}function Ml(o,c){o.F=Date.now(),as(o),o.A=En(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Jl(d.i,"t",m),o.C=0,d=o.j.J,o.h=new Vl,o.g=gc(o.j,d?c:null,!o.m),0<o.O&&(o.M=new ht(_(o.Y,o,o.g),o.O)),c=o.U,d=o.g,m=o.ca;var P="readystatechange";Array.isArray(P)||(P&&(gt[0]=P.toString()),P=gt);for(var V=0;V<P.length;V++){var W=Ft(d,P[V],m||c.handleEvent,!1,c.h||c);if(!W)break;c.g[W.key]=W}c=o.H?v(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),re(),Nt(o.i,o.u,o.A,o.l,o.R,o.m)}Fn.prototype.ca=function(o){o=o.target;const c=this.M;c&&xn(o)==3?c.j():this.Y(o)},Fn.prototype.Y=function(o){try{if(o==this.g)e:{const It=xn(this.g);var c=this.g.Ba();const Vr=this.g.Z();if(!(3>It)&&(It!=3||this.g&&(this.h.h||this.g.oa()||ic(this.g)))){this.J||It!=4||c==7||(c==8||0>=Vr?re(3):re(2)),Oo(this);var d=this.g.Z();this.X=d;t:if(Ll(this)){var m=ic(this.g);o="";var P=m.length,V=xn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){fr(this),li(this);var W="";break t}this.h.i=new l.TextDecoder}for(c=0;c<P;c++)this.h.h=!0,o+=this.h.i.decode(m[c],{stream:!(V&&c==P-1)});m.length=0,this.h.g+=o,this.C=0,W=this.h.g}else W=this.g.oa();if(this.o=d==200,Dt(this.i,this.u,this.A,this.l,this.R,It,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Le,_t=this.g;if((Le=_t.g?_t.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(Le)){var Se=Le;break t}}Se=null}if(d=Se)Re(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Mo(this,d);else{this.o=!1,this.s=3,be(12),fr(this),li(this);break e}}if(this.P){d=!0;let Xt;for(;!this.J&&this.C<W.length;)if(Xt=lp(this,W),Xt==Do){It==4&&(this.s=4,be(14),d=!1),Re(this.i,this.l,null,"[Incomplete Response]");break}else if(Xt==Ol){this.s=4,be(15),Re(this.i,this.l,W,"[Invalid Chunk]"),d=!1;break}else Re(this.i,this.l,Xt,null),Mo(this,Xt);if(Ll(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),It!=4||W.length!=0||this.h.h||(this.s=1,be(16),d=!1),this.o=this.o&&d,!d)Re(this.i,this.l,W,"[Invalid Chunked Response]"),fr(this),li(this);else if(0<W.length&&!this.W){this.W=!0;var xt=this.j;xt.g==this&&xt.ba&&!xt.M&&(xt.j.info("Great, no buffering proxy detected. Bytes received: "+W.length),qo(xt),xt.M=!0,be(11))}}else Re(this.i,this.l,W,null),Mo(this,W);It==4&&fr(this),this.o&&!this.J&&(It==4?hc(this.j,this):(this.o=!1,as(this)))}else Tp(this.g),d==400&&0<W.indexOf("Unknown SID")?(this.s=3,be(12)):(this.s=0,be(13)),fr(this),li(this)}}}catch{}finally{}};function Ll(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function lp(o,c){var d=o.C,m=c.indexOf(`
`,d);return m==-1?Do:(d=Number(c.substring(d,m)),isNaN(d)?Ol:(m+=1,m+d>c.length?Do:(c=c.slice(m,m+d),o.C=m+d,c)))}Fn.prototype.cancel=function(){this.J=!0,fr(this)};function as(o){o.S=Date.now()+o.I,Fl(o,o.I)}function Fl(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ye(_(o.ba,o),c)}function Oo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}Fn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(ln(this.i,this.A),this.L!=2&&(re(),be(17)),fr(this),this.s=2,li(this)):Fl(this,this.S-o)};function li(o){o.j.G==0||o.J||hc(o.j,o)}function fr(o){Oo(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,jt(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Mo(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||Lo(d.h,o))){if(!o.K&&Lo(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ms(d),ps(d);else break e;Bo(d),be(18)}}else d.za=P[1],0<d.za-d.T&&37500>P[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ye(_(d.Za,d),6e3));if(1>=Bl(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else gr(d,11)}else if((o.K||d.g==o)&&ms(d),!R(c))for(P=d.Da.g.parse(c),c=0;c<P.length;c++){let Se=P[c];if(d.T=Se[0],Se=Se[1],d.G==2)if(Se[0]=="c"){d.K=Se[1],d.ia=Se[2];const xt=Se[3];xt!=null&&(d.la=xt,d.j.info("VER="+d.la));const It=Se[4];It!=null&&(d.Aa=It,d.j.info("SVER="+d.Aa));const Vr=Se[5];Vr!=null&&typeof Vr=="number"&&0<Vr&&(m=1.5*Vr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Xt=o.g;if(Xt){const vs=Xt.g?Xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(vs){var V=m.h;V.g||vs.indexOf("spdy")==-1&&vs.indexOf("quic")==-1&&vs.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(Fo(V,V.h),V.h=null))}if(m.D){const Go=Xt.g?Xt.g.getResponseHeader("X-HTTP-Session-Id"):null;Go&&(m.ya=Go,ze(m.I,m.D,Go))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var W=o;if(m.qa=pc(m,m.J?m.ia:null,m.W),W.K){ql(m.h,W);var Le=W,_t=m.L;_t&&(Le.I=_t),Le.B&&(Oo(Le),as(Le)),m.g=W}else cc(m);0<d.i.length&&gs(d)}else Se[0]!="stop"&&Se[0]!="close"||gr(d,7);else d.G==3&&(Se[0]=="stop"||Se[0]=="close"?Se[0]=="stop"?gr(d,7):jo(d):Se[0]!="noop"&&d.l&&d.l.ta(Se),d.v=0)}}re(4)}catch{}}var cp=class{constructor(o,c){this.g=o,this.map=c}};function Ul(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function jl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Bl(o){return o.h?1:o.g?o.g.size:0}function Lo(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Fo(o,c){o.g?o.g.add(c):o.h=c}function ql(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Ul.prototype.cancel=function(){if(this.i=Gl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Gl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return S(o.i)}function up(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,m=0;m<d;m++)c.push(o[m]);return c}c=[],d=0;for(m in o)c[d++]=o[m];return c}function hp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const m in o)c[d++]=m;return c}}}function zl(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=hp(o),m=up(o),P=m.length,V=0;V<P;V++)c.call(void 0,m[V],d&&d[V],o)}var Hl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dp(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),P=null;if(0<=m){var V=o[d].substring(0,m);P=o[d].substring(m+1)}else V=o[d];c(V,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function pr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof pr){this.h=o.h,ls(this,o.j),this.o=o.o,this.g=o.g,cs(this,o.s),this.l=o.l;var c=o.i,d=new hi;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Wl(this,d),this.m=o.m}else o&&(c=String(o).match(Hl))?(this.h=!1,ls(this,c[1]||"",!0),this.o=ci(c[2]||""),this.g=ci(c[3]||"",!0),cs(this,c[4]),this.l=ci(c[5]||"",!0),Wl(this,c[6]||"",!0),this.m=ci(c[7]||"")):(this.h=!1,this.i=new hi(null,this.h))}pr.prototype.toString=function(){var o=[],c=this.j;c&&o.push(ui(c,Kl,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(ui(c,Kl,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ui(d,d.charAt(0)=="/"?gp:pp,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ui(d,_p)),o.join("")};function En(o){return new pr(o)}function ls(o,c,d){o.j=d?ci(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function cs(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Wl(o,c,d){c instanceof hi?(o.i=c,vp(o.i,o.h)):(d||(c=ui(c,mp)),o.i=new hi(c,o.h))}function ze(o,c,d){o.i.set(c,d)}function us(o){return ze(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function ci(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ui(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,fp),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function fp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Kl=/[#\/\?@]/g,pp=/[#\?:]/g,gp=/[#\?]/g,mp=/[#\?@]/g,_p=/#/g;function hi(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Un(o){o.g||(o.g=new Map,o.h=0,o.i&&dp(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}n=hi.prototype,n.add=function(o,c){Un(this),this.i=null,o=Nr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function Ql(o,c){Un(o),c=Nr(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Yl(o,c){return Un(o),c=Nr(o,c),o.g.has(c)}n.forEach=function(o,c){Un(this),this.g.forEach(function(d,m){d.forEach(function(P){o.call(c,P,m,this)},this)},this)},n.na=function(){Un(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let m=0;m<c.length;m++){const P=o[m];for(let V=0;V<P.length;V++)d.push(c[m])}return d},n.V=function(o){Un(this);let c=[];if(typeof o=="string")Yl(this,o)&&(c=c.concat(this.g.get(Nr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},n.set=function(o,c){return Un(this),this.i=null,o=Nr(this,o),Yl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function Jl(o,c,d){Ql(o,c),0<d.length&&(o.i=null,o.g.set(Nr(o,c),S(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var m=c[d];const V=encodeURIComponent(String(m)),W=this.V(m);for(m=0;m<W.length;m++){var P=V;W[m]!==""&&(P+="="+encodeURIComponent(String(W[m]))),o.push(P)}}return this.i=o.join("&")};function Nr(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function vp(o,c){c&&!o.j&&(Un(o),o.i=null,o.g.forEach(function(d,m){var P=m.toLowerCase();m!=P&&(Ql(this,m),Jl(this,P,d))},o)),o.j=c}function yp(o,c){const d=new ft;if(l.Image){const m=new Image;m.onload=x(jn,d,"TestLoadImage: loaded",!0,c,m),m.onerror=x(jn,d,"TestLoadImage: error",!1,c,m),m.onabort=x(jn,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=x(jn,d,"TestLoadImage: timeout",!1,c,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function bp(o,c){const d=new ft,m=new AbortController,P=setTimeout(()=>{m.abort(),jn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(V=>{clearTimeout(P),V.ok?jn(d,"TestPingServer: ok",!0,c):jn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(P),jn(d,"TestPingServer: error",!1,c)})}function jn(o,c,d,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(d)}catch{}}function wp(){this.g=new Ln}function Ep(o,c,d){const m=d||"";try{zl(o,function(P,V){let W=P;h(P)&&(W=Ht(P)),c.push(m+V+"="+encodeURIComponent(W))})}catch(P){throw c.push(m+"type="+encodeURIComponent("_badmap")),P}}function hs(o){this.l=o.Ub||null,this.j=o.eb||!1}C(hs,bn),hs.prototype.g=function(){return new ds(this.l,this.j)},hs.prototype.i=function(o){return function(){return o}}({});function ds(o,c){ie.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(ds,ie),n=ds.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,fi(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,di(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,fi(this)),this.g&&(this.readyState=3,fi(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?di(this):fi(this),this.readyState==3&&Xl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,di(this))},n.Qa=function(o){this.g&&(this.response=o,di(this))},n.ga=function(){this.g&&di(this)};function di(o){o.readyState=4,o.l=null,o.j=null,o.v=null,fi(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function fi(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ds.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Zl(o){let c="";return q(o,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function Uo(o,c,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Zl(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ze(o,c,d))}function Xe(o){ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Xe,ie);var xp=/^https?$/i,Ip=["POST","PUT"];n=Xe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():No.g(),this.v=this.o?Pr(this.o):Pr(No),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(V){ec(this,V);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)d.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const V of m.keys())d.set(V,m.get(V));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(V=>V.toLowerCase()=="content-type"),P=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Ip,c,void 0))||m||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,W]of d)this.g.setRequestHeader(V,W);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{rc(this),this.u=!0,this.g.send(o),this.u=!1}catch(V){ec(this,V)}};function ec(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,tc(o),fs(o)}function tc(o){o.A||(o.A=!0,me(o,"complete"),me(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,me(this,"complete"),me(this,"abort"),fs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),fs(this,!0)),Xe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?nc(this):this.bb())},n.bb=function(){nc(this)};function nc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||xn(o)!=4||o.Z()!=2)){if(o.u&&xn(o)==4)Ne(o.Ea,0,o);else if(me(o,"readystatechange"),xn(o)==4){o.h=!1;try{const W=o.Z();e:switch(W){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var m;if(m=W===0){var P=String(o.D).match(Hl)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),m=!xp.test(P?P.toLowerCase():"")}d=m}if(d)me(o,"complete"),me(o,"success");else{o.m=6;try{var V=2<xn(o)?o.g.statusText:""}catch{V=""}o.l=V+" ["+o.Z()+"]",tc(o)}}finally{fs(o)}}}}function fs(o,c){if(o.g){rc(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||me(o,"ready");try{d.onreadystatechange=m}catch{}}}function rc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function xn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<xn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),hr(c)}};function ic(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Tp(o){const c={};o=(o.g&&2<=xn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(R(o[m]))continue;var d=A(o[m]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const V=c[P]||[];c[P]=V,V.push(d)}w(c,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function pi(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function sc(o){this.Aa=0,this.i=[],this.j=new ft,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=pi("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=pi("baseRetryDelayMs",5e3,o),this.cb=pi("retryDelaySeedMs",1e4,o),this.Wa=pi("forwardChannelMaxRetries",2,o),this.wa=pi("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ul(o&&o.concurrentRequestLimit),this.Da=new wp,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=sc.prototype,n.la=8,n.G=1,n.connect=function(o,c,d,m){be(0),this.W=o,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=pc(this,null,this.W),gs(this)};function jo(o){if(oc(o),o.G==3){var c=o.U++,d=En(o.I);if(ze(d,"SID",o.K),ze(d,"RID",c),ze(d,"TYPE","terminate"),gi(o,d),c=new Fn(o,o.j,c),c.L=2,c.v=us(En(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=gc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),as(c)}fc(o)}function ps(o){o.g&&(qo(o),o.g.cancel(),o.g=null)}function oc(o){ps(o),o.u&&(l.clearTimeout(o.u),o.u=null),ms(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function gs(o){if(!jl(o.h)&&!o.s){o.s=!0;var c=o.Ga;z||ee(),j||(z(),j=!0),H.add(c,o),o.B=0}}function Ap(o,c){return Bl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ye(_(o.Ga,o,c),dc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const P=new Fn(this,this.j,o);let V=this.o;if(this.S&&(V?(V=v(V),I(V,this.S)):V=this.S),this.m!==null||this.O||(P.H=V,V=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=lc(this,P,c),d=En(this.I),ze(d,"RID",o),ze(d,"CVER",22),this.D&&ze(d,"X-HTTP-Session-Id",this.D),gi(this,d),V&&(this.O?c="headers="+encodeURIComponent(String(Zl(V)))+"&"+c:this.m&&Uo(d,this.m,V)),Fo(this.h,P),this.Ua&&ze(d,"TYPE","init"),this.P?(ze(d,"$req",c),ze(d,"SID","null"),P.T=!0,Vo(P,d,null)):Vo(P,d,c),this.G=2}}else this.G==3&&(o?ac(this,o):this.i.length==0||jl(this.h)||ac(this))};function ac(o,c){var d;c?d=c.l:d=o.U++;const m=En(o.I);ze(m,"SID",o.K),ze(m,"RID",d),ze(m,"AID",o.T),gi(o,m),o.m&&o.o&&Uo(m,o.m,o.o),d=new Fn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=lc(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Fo(o.h,d),Vo(d,m,c)}function gi(o,c){o.H&&q(o.H,function(d,m){ze(c,m,d)}),o.l&&zl({},function(d,m){ze(c,m,d)})}function lc(o,c,d){d=Math.min(o.i.length,d);var m=o.l?_(o.l.Na,o.l,o):null;e:{var P=o.i;let V=-1;for(;;){const W=["count="+d];V==-1?0<d?(V=P[0].g,W.push("ofs="+V)):V=0:W.push("ofs="+V);let Le=!0;for(let _t=0;_t<d;_t++){let Se=P[_t].g;const xt=P[_t].map;if(Se-=V,0>Se)V=Math.max(0,P[_t].g-100),Le=!1;else try{Ep(xt,W,"req"+Se+"_")}catch{m&&m(xt)}}if(Le){m=W.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,m}function cc(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;z||ee(),j||(z(),j=!0),H.add(c,o),o.v=0}}function Bo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ye(_(o.Fa,o),dc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,uc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ye(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,be(10),ps(this),uc(this))};function qo(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function uc(o){o.g=new Fn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=En(o.qa);ze(c,"RID","rpc"),ze(c,"SID",o.K),ze(c,"AID",o.T),ze(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&ze(c,"TO",o.ja),ze(c,"TYPE","xmlhttp"),gi(o,c),o.m&&o.o&&Uo(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=us(En(c)),d.m=null,d.P=!0,Ml(d,o)}n.Za=function(){this.C!=null&&(this.C=null,ps(this),Bo(this),be(19))};function ms(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function hc(o,c){var d=null;if(o.g==c){ms(o),qo(o),o.g=null;var m=2}else if(Lo(o.h,c))d=c.D,ql(o.h,c),m=1;else return;if(o.G!=0){if(c.o)if(m==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var P=o.B;m=tt(),me(m,new mt(m,d)),gs(o)}else cc(o);else if(P=c.s,P==3||P==0&&0<c.X||!(m==1&&Ap(o,c)||m==2&&Bo(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),P){case 1:gr(o,5);break;case 4:gr(o,10);break;case 3:gr(o,6);break;default:gr(o,2)}}}function dc(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function gr(o,c){if(o.j.info("Error code "+c),c==2){var d=_(o.fb,o),m=o.Xa;const P=!m;m=new pr(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ls(m,"https"),us(m),P?yp(m.toString(),d):bp(m.toString(),d)}else be(2);o.G=0,o.l&&o.l.sa(c),fc(o),oc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),be(2)):(this.j.info("Failed to ping google.com"),be(1))};function fc(o){if(o.G=0,o.ka=[],o.l){const c=Gl(o.h);(c.length!=0||o.i.length!=0)&&(T(o.ka,c),T(o.ka,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.ra()}}function pc(o,c,d){var m=d instanceof pr?En(d):new pr(d);if(m.g!="")c&&(m.g=c+"."+m.g),cs(m,m.s);else{var P=l.location;m=P.protocol,c=c?c+"."+P.hostname:P.hostname,P=+P.port;var V=new pr(null);m&&ls(V,m),c&&(V.g=c),P&&cs(V,P),d&&(V.l=d),m=V}return d=o.D,c=o.ya,d&&c&&ze(m,d,c),ze(m,"VER",o.la),gi(o,m),m}function gc(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Xe(new hs({eb:d})):new Xe(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function mc(){}n=mc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function _s(){}_s.prototype.g=function(o,c){return new Bt(o,c)};function Bt(o,c){ie.call(this),this.g=new sc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!R(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!R(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Dr(this)}C(Bt,ie),Bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Bt.prototype.close=function(){jo(this.g)},Bt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Ht(o),o=d);c.i.push(new cp(c.Ya++,o)),c.G==3&&gs(c)},Bt.prototype.N=function(){this.g.l=null,delete this.j,jo(this.g),delete this.g,Bt.aa.N.call(this)};function _c(o){J.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}C(_c,J);function vc(){je.call(this),this.status=1}C(vc,je);function Dr(o){this.g=o}C(Dr,mc),Dr.prototype.ua=function(){me(this.g,"a")},Dr.prototype.ta=function(o){me(this.g,new _c(o))},Dr.prototype.sa=function(o){me(this.g,new vc)},Dr.prototype.ra=function(){me(this.g,"b")},_s.prototype.createWebChannel=_s.prototype.g,Bt.prototype.send=Bt.prototype.o,Bt.prototype.open=Bt.prototype.m,Bt.prototype.close=Bt.prototype.close,Kh=function(){return new _s},Wh=function(){return tt()},Hh=Me,da={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Jt.NO_ERROR=0,Jt.TIMEOUT=8,Jt.HTTP_ERROR=6,Ss=Jt,Dl.COMPLETE="complete",zh=Dl,dr.EventType=Yt,Yt.OPEN="a",Yt.CLOSE="b",Yt.ERROR="c",Yt.MESSAGE="d",ie.prototype.listen=ie.prototype.K,mi=dr,Xe.prototype.listenOnce=Xe.prototype.L,Xe.prototype.getLastError=Xe.prototype.Ka,Xe.prototype.getLastErrorCode=Xe.prototype.Ba,Xe.prototype.getStatus=Xe.prototype.Z,Xe.prototype.getResponseJson=Xe.prototype.Oa,Xe.prototype.getResponseText=Xe.prototype.oa,Xe.prototype.send=Xe.prototype.ea,Xe.prototype.setWithCredentials=Xe.prototype.Ha,Gh=Xe}).apply(typeof bs<"u"?bs:typeof self<"u"?self:typeof window<"u"?window:{});const Vc="@firebase/firestore",Oc="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new Da("@firebase/firestore");function Lr(){return Ar.logLevel}function Q(n,...e){if(Ar.logLevel<=we.DEBUG){const t=e.map(Ma);Ar.debug(`Firestore (${ni}): ${n}`,...t)}}function kn(n,...e){if(Ar.logLevel<=we.ERROR){const t=e.map(Ma);Ar.error(`Firestore (${ni}): ${n}`,...t)}}function tr(n,...e){if(Ar.logLevel<=we.WARN){const t=e.map(Ma);Ar.warn(`Firestore (${ni}): ${n}`,...t)}}function Ma(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Qh(n,r,t)}function Qh(n,e,t){let r=`FIRESTORE (${ni}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw kn(r),new Error(r)}function $e(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Qh(e,i,r)}function fe(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends Vn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Am{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(At.UNAUTHENTICATED))}shutdown(){}}class Sm{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Cm{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){$e(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new Xn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Xn,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Xn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?($e(typeof r.accessToken=="string",31837,{l:r}),new Yh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return $e(e===null||typeof e=="string",2055,{h:e}),new At(e)}}class Rm{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class km{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Rm(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Mc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $m{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Zt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){$e(this.o===void 0,3512);const r=s=>{s.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Mc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?($e(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Mc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Pm(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ve(n,e){return n<e?-1:n>e?1:0}function fa(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return ve(r,i);{const s=Jh(),a=Nm(s.encode(Lc(n,t)),s.encode(Lc(e,t)));return a!==0?a:ve(r,i)}}t+=r>65535?2:1}return ve(n.length,e.length)}function Lc(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Nm(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ve(n[t],e[t]);return ve(n.length,e.length)}function Kr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc="__name__";class cn{constructor(e,t,r){t===void 0?t=0:t>e.length&&se(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&se(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return cn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof cn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=cn.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ve(e.length,t.length)}static compareSegments(e,t){const r=cn.isNumericId(e),i=cn.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?cn.extractNumericId(e).compare(cn.extractNumericId(t)):fa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Jn.fromString(e.substring(4,e.length-2))}}class qe extends cn{construct(e,t,r){return new qe(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new qe(t)}static emptyPath(){return new qe([])}}const Dm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class yt extends cn{construct(e,t,r){return new yt(e,t,r)}static isValidIdentifier(e){return Dm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),yt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fc}static keyField(){return new yt([Fc])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new K(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new K(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new K(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new yt(t)}static emptyPath(){return new yt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.path=e}static fromPath(e){return new te(qe.fromString(e))}static fromName(e){return new te(qe.fromString(e).popFirst(5))}static empty(){return new te(qe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&qe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return qe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new te(new qe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(n,e,t){if(!t)throw new K(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Vm(n,e,t,r){if(e===!0&&r===!0)throw new K(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Uc(n){if(!te.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function jc(n){if(te.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Zh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function fo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":se(12329,{type:typeof n})}function Gt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=fo(n);throw new K(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(n,e){const t={typeString:n};return e&&(t.value=e),t}function Hi(n,e){if(!Zh(n))throw new K(L.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new K(L.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=-62135596800,qc=1e6;class He{static now(){return He.fromMillis(Date.now())}static fromDate(e){return He.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*qc);return new He(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Bc)throw new K(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qc}_compareTo(e){return this.seconds===e.seconds?ve(this.nanoseconds,e.nanoseconds):ve(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:He._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Hi(e,He._jsonSchema))return new He(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Bc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}He._jsonSchemaVersion="firestore/timestamp/1.0",He._jsonSchema={type:ct("string",He._jsonSchemaVersion),seconds:ct("number"),nanoseconds:ct("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{static fromTimestamp(e){return new he(e)}static min(){return new he(new He(0,0))}static max(){return new he(new He(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki=-1;function Om(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=he.fromTimestamp(r===1e9?new He(t+1,0):new He(t,r));return new nr(i,te.empty(),e)}function Mm(n){return new nr(n.readTime,n.key,ki)}class nr{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new nr(he.min(),te.empty(),ki)}static max(){return new nr(he.max(),te.empty(),ki)}}function Lm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=te.comparator(n.documentKey,e.documentKey),t!==0?t:ve(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Um{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==Fm)throw n;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&se(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new U((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof U?t:U.resolve(t)}catch(t){return U.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):U.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):U.reject(t)}static resolve(e){return new U((t,r)=>{t(e)})}static reject(e){return new U((t,r)=>{r(e)})}static waitFor(e){return new U((t,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&t()},u=>r(u))}),a=!0,s===i&&t()})}static or(e){let t=U.resolve(!1);for(const r of e)t=t.next(i=>i?U.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new U((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,t){return new U((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function jm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ii(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}po.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=-1;function go(n){return n==null}function Hs(n){return n===0&&1/n==-1/0}function Bm(n){return typeof n=="number"&&Number.isInteger(n)&&!Hs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="";function qm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Gc(e)),e=Gm(n.get(t),e);return Gc(e)}function Gm(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case ed:t+="";break;default:t+=s}}return t}function Gc(n){return n+ed+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function lr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function td(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,t){this.comparator=e,this.root=t||vt.EMPTY}insert(e,t){return new Je(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,vt.BLACK,null,null))}remove(e){return new Je(this.comparator,this.root.remove(e,this.comparator).copy(null,null,vt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ws(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ws(this.root,e,this.comparator,!1)}getReverseIterator(){return new ws(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ws(this.root,e,this.comparator,!0)}}class ws{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class vt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??vt.RED,this.left=i??vt.EMPTY,this.right=s??vt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new vt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return vt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return vt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,vt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,vt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw se(43730,{key:this.key,value:this.value});if(this.right.isRed())throw se(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw se(27949);return e+(this.isRed()?0:1)}}vt.EMPTY=null,vt.RED=!0,vt.BLACK=!1;vt.EMPTY=new class{constructor(){this.size=0}get key(){throw se(57766)}get value(){throw se(16141)}get color(){throw se(16727)}get left(){throw se(29726)}get right(){throw se(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new vt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.comparator=e,this.data=new Je(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Hc(this.data.getIterator())}getIteratorFrom(e){return new Hc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof dt)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new dt(this.comparator);return t.data=e,t}}class Hc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.fields=e,e.sort(yt.comparator)}static empty(){return new qt([])}unionWith(e){let t=new dt(yt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new qt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Kr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new nd("Invalid base64 string: "+s):s}}(e);return new bt(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new bt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ve(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const zm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function rr(n){if($e(!!n,39018),typeof n=="string"){let e=0;const t=zm.exec(n);if($e(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:nt(n.seconds),nanos:nt(n.nanos)}}function nt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ir(n){return typeof n=="string"?bt.fromBase64String(n):bt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd="server_timestamp",id="__type__",sd="__previous_value__",od="__local_write_time__";function Ua(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[id])===null||t===void 0?void 0:t.stringValue)===rd}function mo(n){const e=n.mapValue.fields[sd];return Ua(e)?mo(e):e}function $i(n){const e=rr(n.mapValue.fields[od].timestampValue);return new He(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(e,t,r,i,s,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ws="(default)";class Pi{constructor(e,t){this.projectId=e,this.database=t||Ws}static empty(){return new Pi("","")}get isDefaultDatabase(){return this.database===Ws}isEqual(e){return e instanceof Pi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="__type__",Wm="__max__",Es={mapValue:{}},ld="__vector__",Ks="value";function sr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ua(n)?4:Qm(n)?9007199254740991:Km(n)?10:11:se(28295,{value:n})}function _n(n,e){if(n===e)return!0;const t=sr(n);if(t!==sr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return $i(n).isEqual($i(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=rr(i.timestampValue),l=rr(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return ir(i.bytesValue).isEqual(ir(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return nt(i.geoPointValue.latitude)===nt(s.geoPointValue.latitude)&&nt(i.geoPointValue.longitude)===nt(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return nt(i.integerValue)===nt(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=nt(i.doubleValue),l=nt(s.doubleValue);return a===l?Hs(a)===Hs(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Kr(n.arrayValue.values||[],e.arrayValue.values||[],_n);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(zc(a)!==zc(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!_n(a[u],l[u])))return!1;return!0}(n,e);default:return se(52216,{left:n})}}function Ni(n,e){return(n.values||[]).find(t=>_n(t,e))!==void 0}function Qr(n,e){if(n===e)return 0;const t=sr(n),r=sr(e);if(t!==r)return ve(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ve(n.booleanValue,e.booleanValue);case 2:return function(s,a){const l=nt(s.integerValue||s.doubleValue),u=nt(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return Wc(n.timestampValue,e.timestampValue);case 4:return Wc($i(n),$i(e));case 5:return fa(n.stringValue,e.stringValue);case 6:return function(s,a){const l=ir(s),u=ir(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=ve(l[h],u[h]);if(f!==0)return f}return ve(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const l=ve(nt(s.latitude),nt(a.latitude));return l!==0?l:ve(nt(s.longitude),nt(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Kc(n.arrayValue,e.arrayValue);case 10:return function(s,a){var l,u,h,f;const p=s.fields||{},_=a.fields||{},x=(l=p[Ks])===null||l===void 0?void 0:l.arrayValue,C=(u=_[Ks])===null||u===void 0?void 0:u.arrayValue,S=ve(((h=x?.values)===null||h===void 0?void 0:h.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Kc(x,C)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Es.mapValue&&a===Es.mapValue)return 0;if(s===Es.mapValue)return 1;if(a===Es.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const _=fa(u[p],f[p]);if(_!==0)return _;const x=Qr(l[u[p]],h[f[p]]);if(x!==0)return x}return ve(u.length,f.length)}(n.mapValue,e.mapValue);default:throw se(23264,{le:t})}}function Wc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ve(n,e);const t=rr(n),r=rr(e),i=ve(t.seconds,r.seconds);return i!==0?i:ve(t.nanos,r.nanos)}function Kc(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Qr(t[i],r[i]);if(s)return s}return ve(t.length,r.length)}function Yr(n){return pa(n)}function pa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=rr(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return ir(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return te.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=pa(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${pa(t.fields[a])}`;return i+"}"}(n.mapValue):se(61005,{value:n})}function Cs(n){switch(sr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mo(n);return e?16+Cs(e):16;case 5:return 2*n.stringValue.length;case 6:return ir(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Cs(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return lr(r.fields,(s,a)=>{i+=s.length+Cs(a)}),i}(n.mapValue);default:throw se(13486,{value:n})}}function Qc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ga(n){return!!n&&"integerValue"in n}function ja(n){return!!n&&"arrayValue"in n}function Yc(n){return!!n&&"nullValue"in n}function Jc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Rs(n){return!!n&&"mapValue"in n}function Km(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ad])===null||t===void 0?void 0:t.stringValue)===ld}function Ei(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return lr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ei(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ei(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Qm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Wm}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.value=e}static empty(){return new Lt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Rs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ei(t)}setAll(e){let t=yt.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=l.popLast()}a?r[l.lastSegment()]=Ei(a):i.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Rs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return _n(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Rs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){lr(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Lt(Ei(this.value))}}function cd(n){const e=[];return lr(n.fields,(t,r)=>{const i=new yt([t]);if(Rs(r)){const s=cd(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new qt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t,r,i,s,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new St(e,0,he.min(),he.min(),he.min(),Lt.empty(),0)}static newFoundDocument(e,t,r,i){return new St(e,1,t,he.min(),r,i,0)}static newNoDocument(e,t){return new St(e,2,t,he.min(),he.min(),Lt.empty(),0)}static newUnknownDocument(e,t){return new St(e,3,t,he.min(),he.min(),Lt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(he.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Lt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Lt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=he.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof St&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new St(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t){this.position=e,this.inclusive=t}}function Xc(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=te.comparator(te.fromName(a.referenceValue),t.key):r=Qr(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Zc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!_n(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ym(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{}class lt extends ud{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Xm(e,t,r):t==="array-contains"?new t_(e,r):t==="in"?new n_(e,r):t==="not-in"?new r_(e,r):t==="array-contains-any"?new i_(e,r):new lt(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Zm(e,r):new e_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Qr(t,this.value)):t!==null&&sr(this.value)===sr(t)&&this.matchesComparison(Qr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return se(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class sn extends ud{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new sn(e,t)}matches(e){return hd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function hd(n){return n.op==="and"}function dd(n){return Jm(n)&&hd(n)}function Jm(n){for(const e of n.filters)if(e instanceof sn)return!1;return!0}function ma(n){if(n instanceof lt)return n.field.canonicalString()+n.op.toString()+Yr(n.value);if(dd(n))return n.filters.map(e=>ma(e)).join(",");{const e=n.filters.map(t=>ma(t)).join(",");return`${n.op}(${e})`}}function fd(n,e){return n instanceof lt?function(r,i){return i instanceof lt&&r.op===i.op&&r.field.isEqual(i.field)&&_n(r.value,i.value)}(n,e):n instanceof sn?function(r,i){return i instanceof sn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&fd(a,i.filters[l]),!0):!1}(n,e):void se(19439)}function pd(n){return n instanceof lt?function(t){return`${t.field.canonicalString()} ${t.op} ${Yr(t.value)}`}(n):n instanceof sn?function(t){return t.op.toString()+" {"+t.getFilters().map(pd).join(" ,")+"}"}(n):"Filter"}class Xm extends lt{constructor(e,t,r){super(e,t,r),this.key=te.fromName(r.referenceValue)}matches(e){const t=te.comparator(e.key,this.key);return this.matchesComparison(t)}}class Zm extends lt{constructor(e,t){super(e,"in",t),this.keys=gd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class e_ extends lt{constructor(e,t){super(e,"not-in",t),this.keys=gd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function gd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>te.fromName(r.referenceValue))}class t_ extends lt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ja(t)&&Ni(t.arrayValue,this.value)}}class n_ extends lt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ni(this.value.arrayValue,t)}}class r_ extends lt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ni(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ni(this.value.arrayValue,t)}}class i_ extends lt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ja(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ni(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.Pe=null}}function eu(n,e=null,t=[],r=[],i=null,s=null,a=null){return new s_(n,e,t,r,i,s,a)}function Ba(n){const e=fe(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ma(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),go(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Yr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Yr(r)).join(",")),e.Pe=t}return e.Pe}function qa(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ym(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!fd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zc(n.startAt,e.startAt)&&Zc(n.endAt,e.endAt)}function _a(n){return te.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,t=null,r=[],i=[],s=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function o_(n,e,t,r,i,s,a,l){return new si(n,e,t,r,i,s,a,l)}function Ga(n){return new si(n)}function tu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function md(n){return n.collectionGroup!==null}function xi(n){const e=fe(n);if(e.Te===null){e.Te=[];const t=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new dt(yt.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Di(s,r))}),t.has(yt.keyField().canonicalString())||e.Te.push(new Di(yt.keyField(),r))}return e.Te}function hn(n){const e=fe(n);return e.Ie||(e.Ie=a_(e,xi(n))),e.Ie}function a_(n,e){if(n.limitType==="F")return eu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Di(i.field,s)});const t=n.endAt?new Qs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qs(n.startAt.position,n.startAt.inclusive):null;return eu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function va(n,e){const t=n.filters.concat([e]);return new si(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ya(n,e,t){return new si(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function _o(n,e){return qa(hn(n),hn(e))&&n.limitType===e.limitType}function _d(n){return`${Ba(hn(n))}|lt:${n.limitType}`}function Fr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>pd(i)).join(", ")}]`),go(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Yr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Yr(i)).join(",")),`Target(${r})`}(hn(n))}; limitType=${n.limitType})`}function vo(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):te.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of xi(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,l,u){const h=Xc(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,xi(r),i)||r.endAt&&!function(a,l,u){const h=Xc(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,xi(r),i))}(n,e)}function l_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function vd(n){return(e,t)=>{let r=!1;for(const i of xi(n)){const s=c_(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function c_(n,e,t){const r=n.field.isKeyField()?te.comparator(e.key,t.key):function(s,a,l){const u=a.data.field(s),h=l.data.field(s);return u!==null&&h!==null?Qr(u,h):se(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return se(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){lr(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return td(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=new Je(te.comparator);function $n(){return u_}const yd=new Je(te.comparator);function _i(...n){let e=yd;for(const t of n)e=e.insert(t.key,t);return e}function bd(n){let e=yd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function vr(){return Ii()}function wd(){return Ii()}function Ii(){return new kr(n=>n.toString(),(n,e)=>n.isEqual(e))}const h_=new Je(te.comparator),d_=new dt(te.comparator);function Ee(...n){let e=d_;for(const t of n)e=e.add(t);return e}const f_=new dt(ve);function p_(){return f_}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Hs(e)?"-0":e}}function Ed(n){return{integerValue:""+n}}function g_(n,e){return Bm(e)?Ed(e):za(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(){this._=void 0}}function m_(n,e,t){return n instanceof Vi?function(i,s){const a={fields:{[id]:{stringValue:rd},[od]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ua(s)&&(s=mo(s)),s&&(a.fields[sd]=s),{mapValue:a}}(t,e):n instanceof Oi?Id(n,e):n instanceof Mi?Td(n,e):function(i,s){const a=xd(i,s),l=nu(a)+nu(i.Ee);return ga(a)&&ga(i.Ee)?Ed(l):za(i.serializer,l)}(n,e)}function __(n,e,t){return n instanceof Oi?Id(n,e):n instanceof Mi?Td(n,e):t}function xd(n,e){return n instanceof Ys?function(r){return ga(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Vi extends yo{}class Oi extends yo{constructor(e){super(),this.elements=e}}function Id(n,e){const t=Ad(e);for(const r of n.elements)t.some(i=>_n(i,r))||t.push(r);return{arrayValue:{values:t}}}class Mi extends yo{constructor(e){super(),this.elements=e}}function Td(n,e){let t=Ad(e);for(const r of n.elements)t=t.filter(i=>!_n(i,r));return{arrayValue:{values:t}}}class Ys extends yo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function nu(n){return nt(n.integerValue||n.doubleValue)}function Ad(n){return ja(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(e,t){this.field=e,this.transform=t}}function y_(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Oi&&i instanceof Oi||r instanceof Mi&&i instanceof Mi?Kr(r.elements,i.elements,_n):r instanceof Ys&&i instanceof Ys?_n(r.Ee,i.Ee):r instanceof Vi&&i instanceof Vi}(n.transform,e.transform)}class b_{constructor(e,t){this.version=e,this.transformResults=t}}class Vt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Vt}static exists(e){return new Vt(void 0,e)}static updateTime(e){return new Vt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ks(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class bo{}function Sd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wo(n.key,Vt.none()):new Wi(n.key,n.data,Vt.none());{const t=n.data,r=Lt.empty();let i=new dt(yt.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new cr(n.key,r,new qt(i.toArray()),Vt.none())}}function w_(n,e,t){n instanceof Wi?function(i,s,a){const l=i.value.clone(),u=iu(i.fieldTransforms,s,a.transformResults);l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof cr?function(i,s,a){if(!ks(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=iu(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(Cd(i)),u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ti(n,e,t,r){return n instanceof Wi?function(s,a,l,u){if(!ks(s.precondition,a))return l;const h=s.value.clone(),f=su(s.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof cr?function(s,a,l,u){if(!ks(s.precondition,a))return l;const h=su(s.fieldTransforms,u,a),f=a.data;return f.setAll(Cd(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,a,l){return ks(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function E_(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=xd(r.transform,i||null);s!=null&&(t===null&&(t=Lt.empty()),t.set(r.field,s))}return t||null}function ru(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Kr(r,i,(s,a)=>y_(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Wi extends bo{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class cr extends bo{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Cd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function iu(n,e,t){const r=new Map;$e(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,__(a,l,t[i]))}return r}function su(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,m_(s,a,e))}return r}class wo extends bo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class x_ extends bo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&w_(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ti(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ti(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=wd();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=t.has(i.key)?null:l;const u=Sd(a,l);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(he.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Kr(this.mutations,e.mutations,(t,r)=>ru(t,r))&&Kr(this.baseMutations,e.baseMutations,(t,r)=>ru(t,r))}}class Ha{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){$e(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return h_}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Ha(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ot,Ie;function S_(n){switch(n){case L.OK:return se(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return se(15467,{code:n})}}function Rd(n){if(n===void 0)return kn("GRPC error has no .code"),L.UNKNOWN;switch(n){case ot.OK:return L.OK;case ot.CANCELLED:return L.CANCELLED;case ot.UNKNOWN:return L.UNKNOWN;case ot.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case ot.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case ot.INTERNAL:return L.INTERNAL;case ot.UNAVAILABLE:return L.UNAVAILABLE;case ot.UNAUTHENTICATED:return L.UNAUTHENTICATED;case ot.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case ot.NOT_FOUND:return L.NOT_FOUND;case ot.ALREADY_EXISTS:return L.ALREADY_EXISTS;case ot.PERMISSION_DENIED:return L.PERMISSION_DENIED;case ot.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case ot.ABORTED:return L.ABORTED;case ot.OUT_OF_RANGE:return L.OUT_OF_RANGE;case ot.UNIMPLEMENTED:return L.UNIMPLEMENTED;case ot.DATA_LOSS:return L.DATA_LOSS;default:return se(39323,{code:n})}}(Ie=ot||(ot={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_=new Jn([4294967295,4294967295],0);function ou(n){const e=Jh().encode(n),t=new qh;return t.update(e),new Uint8Array(t.digest())}function au(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Jn([t,r],0),new Jn([i,s],0)]}class Wa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new vi(`Invalid padding: ${t}`);if(r<0)throw new vi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new vi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new vi(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Jn.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(Jn.fromNumber(r)));return i.compare(C_)===1&&(i=new Jn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=ou(e),[r,i]=au(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Wa(s,i,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=ou(e),[r,i]=au(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class vi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Ki.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Eo(he.min(),i,new Je(ve),$n(),Ee())}}class Ki{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ki(r,t,Ee(),Ee(),Ee())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}}class kd{constructor(e,t){this.targetId=e,this.De=t}}class $d{constructor(e,t,r=bt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class lu{constructor(){this.ve=0,this.Ce=cu(),this.Fe=bt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Ee(),t=Ee(),r=Ee();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:se(38017,{changeType:s})}}),new Ki(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=cu()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,$e(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class R_{constructor(e){this.We=e,this.Ge=new Map,this.ze=$n(),this.je=xs(),this.Je=xs(),this.He=new Je(ve)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:se(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,r=e.De.count,i=this.st(t);if(i){const s=i.target;if(_a(s))if(r===0){const a=new te(s.path);this.Xe(t,a,St.newNoDocument(a,he.min()))}else $e(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),u=l?this.ut(l,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,l;try{a=ir(r).toUint8Array()}catch(u){if(u instanceof nd)return tr("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Wa(a,i,s)}catch(u){return tr(u instanceof vi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,s,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((s,a)=>{const l=this.st(a);if(l){if(s.current&&_a(l.target)){const u=new te(l.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,St.newNoDocument(u,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=Ee();this.Je.forEach((s,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));const i=new Eo(e,t,this.He,this.ze,r);return this.ze=$n(),this.je=xs(),this.Je=xs(),this.He=new Je(ve),i}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new lu,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new dt(ve),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new dt(ve),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||Q("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new lu),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function xs(){return new Je(te.comparator)}function cu(){return new Je(te.comparator)}const k_={asc:"ASCENDING",desc:"DESCENDING"},$_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},P_={and:"AND",or:"OR"};class N_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ba(n,e){return n.useProto3Json||go(e)?e:{value:e}}function Js(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Pd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function D_(n,e){return Js(n,e.toTimestamp())}function dn(n){return $e(!!n,49232),he.fromTimestamp(function(t){const r=rr(t);return new He(r.seconds,r.nanos)}(n))}function Ka(n,e){return wa(n,e).canonicalString()}function wa(n,e){const t=function(i){return new qe(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Nd(n){const e=qe.fromString(n);return $e(Ld(e),10190,{key:e.toString()}),e}function Ea(n,e){return Ka(n.databaseId,e.path)}function Jo(n,e){const t=Nd(e);if(t.get(1)!==n.databaseId.projectId)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new te(Vd(t))}function Dd(n,e){return Ka(n.databaseId,e)}function V_(n){const e=Nd(n);return e.length===4?qe.emptyPath():Vd(e)}function xa(n){return new qe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Vd(n){return $e(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function uu(n,e,t){return{name:Ea(n,e),fields:t.value.mapValue.fields}}function O_(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:se(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?($e(f===void 0||typeof f=="string",58123),bt.fromBase64String(f||"")):($e(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),bt.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?L.UNKNOWN:Rd(h.code);return new K(f,h.message||"")}(a);t=new $d(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Jo(n,r.document.name),s=dn(r.document.updateTime),a=r.document.createTime?dn(r.document.createTime):he.min(),l=new Lt({mapValue:{fields:r.document.fields}}),u=St.newFoundDocument(i,s,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new $s(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Jo(n,r.document),s=r.readTime?dn(r.readTime):he.min(),a=St.newNoDocument(i,s),l=r.removedTargetIds||[];t=new $s([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Jo(n,r.document),s=r.removedTargetIds||[];t=new $s([],s,i,null)}else{if(!("filter"in e))return se(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new A_(i,s),l=r.targetId;t=new kd(l,a)}}return t}function M_(n,e){let t;if(e instanceof Wi)t={update:uu(n,e.key,e.value)};else if(e instanceof wo)t={delete:Ea(n,e.key)};else if(e instanceof cr)t={update:uu(n,e.key,e.data),updateMask:H_(e.fieldMask)};else{if(!(e instanceof x_))return se(16599,{Rt:e.type});t={verify:Ea(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof Vi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Oi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Mi)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ys)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw se(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:D_(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:se(27497)}(n,e.precondition)),t}function L_(n,e){return n&&n.length>0?($e(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?dn(i.updateTime):dn(s);return a.isEqual(he.min())&&(a=dn(s)),new b_(a,i.transformResults||[])}(t,e))):[]}function F_(n,e){return{documents:[Dd(n,e.path)]}}function U_(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Dd(n,i);const s=function(h){if(h.length!==0)return Md(sn.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Ur(_.field),direction:q_(_.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=ba(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:i}}function j_(n){let e=V_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){$e(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(p){const _=Od(p);return _ instanceof sn&&dd(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(_=>function(C){return new Di(jr(C.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(t.orderBy));let l=null;t.limit&&(l=function(p){let _;return _=typeof p=="object"?p.value:p,go(_)?null:_}(t.limit));let u=null;t.startAt&&(u=function(p){const _=!!p.before,x=p.values||[];return new Qs(x,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,x=p.values||[];return new Qs(x,_)}(t.endAt)),o_(e,i,a,s,l,"F",u,h)}function B_(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return se(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Od(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=jr(t.unaryFilter.field);return lt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=jr(t.unaryFilter.field);return lt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=jr(t.unaryFilter.field);return lt.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=jr(t.unaryFilter.field);return lt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return se(61313);default:return se(60726)}}(n):n.fieldFilter!==void 0?function(t){return lt.create(jr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return se(58110);default:return se(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return sn.create(t.compositeFilter.filters.map(r=>Od(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return se(1026)}}(t.compositeFilter.op))}(n):se(30097,{filter:n})}function q_(n){return k_[n]}function G_(n){return $_[n]}function z_(n){return P_[n]}function Ur(n){return{fieldPath:n.canonicalString()}}function jr(n){return yt.fromServerFormat(n.fieldPath)}function Md(n){return n instanceof lt?function(t){if(t.op==="=="){if(Jc(t.value))return{unaryFilter:{field:Ur(t.field),op:"IS_NAN"}};if(Yc(t.value))return{unaryFilter:{field:Ur(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Jc(t.value))return{unaryFilter:{field:Ur(t.field),op:"IS_NOT_NAN"}};if(Yc(t.value))return{unaryFilter:{field:Ur(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ur(t.field),op:G_(t.op),value:t.value}}}(n):n instanceof sn?function(t){const r=t.getFilters().map(i=>Md(i));return r.length===1?r[0]:{compositeFilter:{op:z_(t.op),filters:r}}}(n):se(54877,{filter:n})}function H_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ld(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e,t,r,i,s=he.min(),a=he.min(),l=bt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Wn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e){this.gt=e}}function K_(n){const e=j_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ya(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(){this.Dn=new Y_}addToCollectionParentIndex(e,t){return this.Dn.add(t),U.resolve()}getCollectionParents(e,t){return U.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return U.resolve()}deleteFieldIndex(e,t){return U.resolve()}deleteAllFieldIndexes(e){return U.resolve()}createTargetIndexes(e,t){return U.resolve()}getDocumentsMatchingTarget(e,t){return U.resolve(null)}getIndexType(e,t){return U.resolve(0)}getFieldIndexes(e,t){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,t){return U.resolve(nr.min())}getMinOffsetFromCollectionGroup(e,t){return U.resolve(nr.min())}updateCollectionGroup(e,t,r){return U.resolve()}updateIndexEntries(e,t){return U.resolve()}}class Y_{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new dt(qe.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new dt(qe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fd=41943040;class Mt{static withCacheSize(e){return new Mt(e,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt.DEFAULT_COLLECTION_PERCENTILE=10,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Mt.DEFAULT=new Mt(Fd,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Mt.DISABLED=new Mt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Jr(0)}static ur(){return new Jr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="LruGarbageCollector",J_=1048576;function fu([n,e],[t,r]){const i=ve(n,t);return i===0?ve(e,r):i}class X_{constructor(e){this.Tr=e,this.buffer=new dt(fu),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();fu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Z_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){Q(du,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ii(t)?Q(du,"Ignoring IndexedDB error during garbage collection: ",t):await ri(t)}await this.Rr(3e5)})}}class ev{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return U.resolve(po.ue);const r=new X_(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),U.resolve(hu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),hu):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,a=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Lr()<=we.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),U.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function tv(n,e){return new ev(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(){this.changes=new kr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,St.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?U.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Ti(r.mutation,i,qt.empty(),He.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Ee()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Ee()){const i=vr();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=_i();return s.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=vr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Ee()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,i){let s=$n();const a=Ii(),l=function(){return Ii()}();return t.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof cr)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Ti(f.mutation,h,f.mutation.getFieldMask(),He.now())):a.set(h.key,qt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new rv(f,(p=a.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Ii();let i=new Je((a,l)=>a-l),s=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||qt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const p=(i.get(l.batchId)||Ee()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,p=wd();f.forEach(_=>{if(!s.has(_)){const x=Sd(t.get(_),r.get(_));x!==null&&p.set(_,x),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return U.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return te.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):md(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):U.resolve(vr());let l=ki,u=s;return a.next(h=>U.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),s.get(f)?U.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,Ee())).next(f=>({batchId:l,changes:bd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new te(t)).next(r=>{let i=_i();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=_i();return this.indexManager.getCollectionParents(e,s).next(l=>U.forEach(l,u=>{const h=function(p,_){return new si(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((p,_)=>{a=a.insert(p,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,St.newInvalidDocument(f)))});let l=_i();return a.forEach((u,h)=>{const f=s.get(u);f!==void 0&&Ti(f.mutation,h,qt.empty(),He.now()),vo(t,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return U.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:dn(i.createTime)}}(t)),U.resolve()}getNamedQuery(e,t){return U.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:K_(i.bundledQuery),readTime:dn(i.readTime)}}(t)),U.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(){this.overlays=new Je(te.comparator),this.kr=new Map}getOverlay(e,t){return U.resolve(this.overlays.get(t))}getOverlays(e,t){const r=vr();return U.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),U.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),U.resolve()}getOverlaysForCollection(e,t,r){const i=vr(),s=t.length+1,a=new te(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return U.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Je((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=vr(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=vr(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return U.resolve(l)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new T_(t,r));let s=this.kr.get(t);s===void 0&&(s=Ee(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(e){return U.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,U.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.qr=new dt(pt.Qr),this.$r=new dt(pt.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new pt(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new pt(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new te(new qe([])),r=new pt(t,e),i=new pt(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new te(new qe([])),r=new pt(t,e),i=new pt(t,e+1);let s=Ee();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new pt(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pt{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return te.comparator(e.key,t.key)||ve(e.Hr,t.Hr)}static Ur(e,t){return ve(e.Hr,t.Hr)||te.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new dt(pt.Qr)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new I_(s,t,r,i);this.mutationQueue.push(a);for(const l of i)this.Yr=this.Yr.add(new pt(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return U.resolve(a)}lookupMutationBatch(e,t){return U.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return U.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?Fa:this.er-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pt(t,0),i=new pt(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{const l=this.Zr(a.Hr);s.push(l)}),U.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new dt(ve);return t.forEach(i=>{const s=new pt(i,0),a=new pt(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],l=>{r=r.add(l.Hr)})}),U.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;te.isDocumentKey(s)||(s=s.child(""));const a=new pt(new te(s),0);let l=new dt(ve);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.Hr)),!0)},a),U.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){$e(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return U.forEach(t.mutations,i=>{const s=new pt(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new pt(t,0),i=this.Yr.firstAfterOrEqual(r);return U.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(e){this.ni=e,this.docs=function(){return new Je(te.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return U.resolve(r?r.document.mutableCopy():St.newInvalidDocument(t))}getEntries(e,t){let r=$n();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():St.newInvalidDocument(i))}),U.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=$n();const a=t.path,l=new te(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||Lm(Mm(f),r)<=0||(i.has(f.key)||vo(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return U.resolve(s)}getAllFromCollectionGroup(e,t,r,i){se(9500)}ri(e,t){return U.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new uv(this)}getSize(e){return U.resolve(this.size)}}class uv extends nv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),U.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(e){this.persistence=e,this.ii=new kr(t=>Ba(t),qa),this.lastRemoteSnapshotVersion=he.min(),this.highestTargetId=0,this.si=0,this.oi=new Qa,this.targetCount=0,this._i=Jr.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),U.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Jr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,U.resolve()}updateTargetData(e,t){return this.hr(t),U.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),U.waitFor(s).next(()=>i)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return U.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),U.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),U.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),U.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return U.resolve(r)}containsKey(e,t){return U.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,t){this.ai={},this.overlays={},this.ui=new po(0),this.ci=!1,this.ci=!0,this.li=new av,this.referenceDelegate=e(this),this.hi=new hv(this),this.indexManager=new Q_,this.remoteDocumentCache=function(i){return new cv(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new W_(t),this.Ti=new sv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ov,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new lv(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){Q("MemoryPersistence","Starting transaction:",e);const i=new dv(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return U.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class dv extends Um{constructor(e){super(),this.currentSequenceNumber=e}}class Ya{constructor(e){this.persistence=e,this.Ai=new Qa,this.Ri=null}static Vi(e){return new Ya(e)}get mi(){if(this.Ri)return this.Ri;throw se(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),U.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),U.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),U.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.mi,r=>{const i=te.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,he.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return U.or([()=>U.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Xs{constructor(e,t){this.persistence=e,this.gi=new kr(r=>qm(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=tv(this,t)}static Vi(e,t){return new Xs(e,t)}Ii(){}di(e){return U.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return U.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?U.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,s.removeEntry(a,he.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),U.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),U.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),U.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),U.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Cs(e.data.value)),t}Sr(e,t,r){return U.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return U.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=Ee(),i=Ee();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Ja(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return lg()?8:jm($t())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new fv;return this.ws(e,t,a).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Lr()<=we.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",Fr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),U.resolve()):(Lr()<=we.DEBUG&&Q("QueryEngine","Query:",Fr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Lr()<=we.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",Fr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,hn(t))):U.resolve())}ps(e,t){if(tu(t))return U.resolve(null);let r=hn(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ya(t,null,"F"),r=hn(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=Ee(...s);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(t,l);return this.Ds(t,h,a,u.readTime)?this.ps(e,ya(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,i){return tu(t)||i.isEqual(he.min())?U.resolve(null):this.gs.getDocuments(e,r).next(s=>{const a=this.bs(t,s);return this.Ds(t,a,r,i)?U.resolve(null):(Lr()<=we.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Fr(t)),this.vs(e,a,t,Om(i,ki)).next(l=>l))})}bs(e,t){let r=new dt(vd(e));return t.forEach((i,s)=>{vo(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Lr()<=we.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",Fr(t)),this.gs.getDocumentsMatchingQuery(e,t,nr.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa="LocalStore",gv=3e8;class mv{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new Je(ve),this.Ms=new kr(s=>Ba(s),qa),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new iv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function _v(n,e,t,r){return new mv(n,e,t,r)}async function jd(n,e){const t=fe(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let u=Ee();for(const h of i){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function vv(n,e){const t=fe(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const p=h.batch,_=p.keys();let x=U.resolve();return _.forEach(C=>{x=x.next(()=>f.getEntry(u,C)).next(S=>{const T=h.docVersions.get(C);$e(T!==null,48541),S.version.compareTo(T)<0&&(p.applyToRemoteDocument(S,h),S.isValidDocument()&&(S.setReadTime(h.commitVersion),f.addEntry(S)))})}),x.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=Ee();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Bd(n){const e=fe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function yv(n,e){const t=fe(n),r=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const _=i.get(p);if(!_)return;l.push(t.hi.removeMatchingKeys(s,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,p)));let x=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?x=x.withResumeToken(bt.EMPTY_BYTE_STRING,he.min()).withLastLimboFreeSnapshotVersion(he.min()):f.resumeToken.approximateByteSize()>0&&(x=x.withResumeToken(f.resumeToken,r)),i=i.insert(p,x),function(S,T,N){return S.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=gv?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(_,x,f)&&l.push(t.hi.updateTargetData(s,x))});let u=$n(),h=Ee();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(bv(s,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(he.min())){const f=t.hi.getLastRemoteSnapshotVersion(s).next(p=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return U.waitFor(l).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.Fs=i,s))}function bv(n,e,t){let r=Ee(),i=Ee();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=$n();return t.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(he.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):Q(Xa,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:i}})}function wv(n,e){const t=fe(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Fa),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Ev(n,e){const t=fe(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,U.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new Wn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Ia(n,e,t){const r=fe(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ii(a))throw a;Q(Xa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function pu(n,e,t){const r=fe(n);let i=he.min(),s=Ee();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const p=fe(u),_=p.Ms.get(f);return _!==void 0?U.resolve(p.Fs.get(_)):p.hi.getTargetData(h,f)}(r,a,hn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:he.min(),t?s:Ee())).next(l=>(xv(r,l_(e),l),{documents:l,qs:s})))}function xv(n,e,t){let r=n.xs.get(e)||he.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}class gu{constructor(){this.activeTargetIds=p_()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Iv{constructor(){this.Fo=new gu,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new gu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu="ConnectivityMonitor";class _u{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){Q(mu,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){Q(mu,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is=null;function Ta(){return Is===null?Is=function(){return 268435456+Math.round(2147483648*Math.random())}():Is++,"0x"+Is.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="RestConnection",Av={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Sv{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Ws?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=Ta(),l=this.Go(e,t.toUriEncodedString());Q(Xo,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);const{host:h}=new URL(l),f=ei(h);return this.jo(e,l,u,r,f).then(p=>(Q(Xo,`Received RPC '${e}' ${a}: `,p),p),p=>{throw tr(Xo,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ni}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){const r=Av[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt="WebChannelConnection";class Rv extends Sv{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){const a=Ta();return new Promise((l,u)=>{const h=new Gh;h.setWithCredentials(!0),h.listenOnce(zh.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ss.NO_ERROR:const p=h.getResponseJson();Q(Tt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case Ss.TIMEOUT:Q(Tt,`RPC '${e}' ${a} timed out`),u(new K(L.DEADLINE_EXCEEDED,"Request time out"));break;case Ss.HTTP_ERROR:const _=h.getStatus();if(Q(Tt,`RPC '${e}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let x=h.getResponseJson();Array.isArray(x)&&(x=x[0]);const C=x?.error;if(C&&C.status&&C.message){const S=function(N){const R=N.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(R)>=0?R:L.UNKNOWN}(C.status);u(new K(S,C.message))}else u(new K(L.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new K(L.UNAVAILABLE,"Connection failed."));break;default:se(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{Q(Tt,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(i);Q(Tt,`RPC '${e}' ${a} sending request:`,i),h.send(t,"POST",f,r,15)})}P_(e,t,r){const i=Ta(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Kh(),l=Wh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=s.join("");Q(Tt,`Creating RPC '${e}' stream ${i}: ${f}`,u);const p=a.createWebChannel(f,u);this.T_(p);let _=!1,x=!1;const C=new Cv({Ho:T=>{x?Q(Tt,`Not sending because RPC '${e}' stream ${i} is closed:`,T):(_||(Q(Tt,`Opening RPC '${e}' stream ${i} transport.`),p.open(),_=!0),Q(Tt,`RPC '${e}' stream ${i} sending:`,T),p.send(T))},Yo:()=>p.close()}),S=(T,N,R)=>{T.listen(N,$=>{try{R($)}catch(O){setTimeout(()=>{throw O},0)}})};return S(p,mi.EventType.OPEN,()=>{x||(Q(Tt,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),S(p,mi.EventType.CLOSE,()=>{x||(x=!0,Q(Tt,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(p))}),S(p,mi.EventType.ERROR,T=>{x||(x=!0,tr(Tt,`RPC '${e}' stream ${i} transport errored. Name:`,T.name,"Message:",T.message),C.__(new K(L.UNAVAILABLE,"The operation could not be completed")))}),S(p,mi.EventType.MESSAGE,T=>{var N;if(!x){const R=T.data[0];$e(!!R,16349);const $=R,O=$?.error||((N=$[0])===null||N===void 0?void 0:N.error);if(O){Q(Tt,`RPC '${e}' stream ${i} received error:`,O);const F=O.status;let q=function(y){const I=ot[y];if(I!==void 0)return Rd(I)}(F),w=O.message;q===void 0&&(q=L.INTERNAL,w="Unknown error status: "+F+" with message "+O.message),x=!0,C.__(new K(q,w)),p.close()}else Q(Tt,`RPC '${e}' stream ${i} received:`,R),C.a_(R)}}),S(l,Hh.STAT_EVENT,T=>{T.stat===da.PROXY?Q(Tt,`RPC '${e}' stream ${i} detected buffering proxy`):T.stat===da.NOPROXY&&Q(Tt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Zo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n){return new N_(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&Q("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="PersistentStream";class Gd{constructor(e,t,r,i,s,a,l,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new qd(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(kn(t.toString()),kn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{const i=new K(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return Q(vu,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(Q(vu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class kv extends Gd{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=O_(this.serializer,e),r=function(s){if(!("targetChange"in s))return he.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?he.min():a.readTime?dn(a.readTime):he.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=xa(this.serializer),t.addTarget=function(s,a){let l;const u=a.target;if(l=_a(u)?{documents:F_(s,u)}:{query:U_(s,u).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Pd(s,a.resumeToken);const h=ba(s,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(he.min())>0){l.readTime=Js(s,a.snapshotVersion.toTimestamp());const h=ba(s,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=B_(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=xa(this.serializer),t.removeTarget=e,this.k_(t)}}class $v extends Gd{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return $e(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,$e(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){$e(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=L_(e.writeResults,e.commitTime),r=dn(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=xa(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>M_(this.serializer,r))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{}class Nv extends Pv{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,wa(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(L.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,wa(t,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new K(L.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Dv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(kn(t),this._a=!1):Q("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="RemoteStore";class Vv{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{$r(this)&&(Q(Sr,"Restarting streams for network reachability change."),await async function(u){const h=fe(u);h.Ia.add(4),await Qi(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Io(h)}(this))})}),this.Aa=new Dv(r,i)}}async function Io(n){if($r(n))for(const e of n.da)await e(!0)}async function Qi(n){for(const e of n.da)await e(!1)}function zd(n,e){const t=fe(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),nl(t)?tl(t):oi(t).x_()&&el(t,e))}function Za(n,e){const t=fe(n),r=oi(t);t.Ta.delete(e),r.x_()&&Hd(t,e),t.Ta.size===0&&(r.x_()?r.B_():$r(t)&&t.Aa.set("Unknown"))}function el(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(he.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}oi(n).H_(e)}function Hd(n,e){n.Ra.$e(e),oi(n).Y_(e)}function tl(n){n.Ra=new R_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),oi(n).start(),n.Aa.aa()}function nl(n){return $r(n)&&!oi(n).M_()&&n.Ta.size>0}function $r(n){return fe(n).Ia.size===0}function Wd(n){n.Ra=void 0}async function Ov(n){n.Aa.set("Online")}async function Mv(n){n.Ta.forEach((e,t)=>{el(n,e)})}async function Lv(n,e){Wd(n),nl(n)?(n.Aa.la(e),tl(n)):n.Aa.set("Unknown")}async function Fv(n,e,t){if(n.Aa.set("Online"),e instanceof $d&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,e)}catch(r){Q(Sr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zs(n,r)}else if(e instanceof $s?n.Ra.Ye(e):e instanceof kd?n.Ra.it(e):n.Ra.et(e),!t.isEqual(he.min()))try{const r=await Bd(n.localStore);t.compareTo(r)>=0&&await function(s,a){const l=s.Ra.Pt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ta.get(h);f&&s.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(bt.EMPTY_BYTE_STRING,f.snapshotVersion)),Hd(s,u);const p=new Wn(f.target,u,h,f.sequenceNumber);el(s,p)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){Q(Sr,"Failed to raise snapshot:",r),await Zs(n,r)}}async function Zs(n,e,t){if(!ii(e))throw e;n.Ia.add(1),await Qi(n),n.Aa.set("Offline"),t||(t=()=>Bd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{Q(Sr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Io(n)})}function Kd(n,e){return e().catch(t=>Zs(n,t,e))}async function To(n){const e=fe(n),t=or(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Fa;for(;Uv(e);)try{const i=await wv(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,jv(e,i)}catch(i){await Zs(e,i)}Qd(e)&&Yd(e)}function Uv(n){return $r(n)&&n.Pa.length<10}function jv(n,e){n.Pa.push(e);const t=or(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Qd(n){return $r(n)&&!or(n).M_()&&n.Pa.length>0}function Yd(n){or(n).start()}async function Bv(n){or(n).na()}async function qv(n){const e=or(n);for(const t of n.Pa)e.X_(t.mutations)}async function Gv(n,e,t){const r=n.Pa.shift(),i=Ha.from(r,e,t);await Kd(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await To(n)}async function zv(n,e){e&&or(n).Z_&&await async function(r,i){if(function(a){return S_(a)&&a!==L.ABORTED}(i.code)){const s=r.Pa.shift();or(r).N_(),await Kd(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await To(r)}}(n,e),Qd(n)&&Yd(n)}async function yu(n,e){const t=fe(n);t.asyncQueue.verifyOperationInProgress(),Q(Sr,"RemoteStore received new credentials");const r=$r(t);t.Ia.add(3),await Qi(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Io(t)}async function Hv(n,e){const t=fe(n);e?(t.Ia.delete(2),await Io(t)):e||(t.Ia.add(2),await Qi(t),t.Aa.set("Unknown"))}function oi(n){return n.Va||(n.Va=function(t,r,i){const s=fe(t);return s.ia(),new kv(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:Ov.bind(null,n),e_:Mv.bind(null,n),n_:Lv.bind(null,n),J_:Fv.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),nl(n)?tl(n):n.Aa.set("Unknown")):(await n.Va.stop(),Wd(n))})),n.Va}function or(n){return n.ma||(n.ma=function(t,r,i){const s=fe(t);return s.ia(),new $v(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Bv.bind(null,n),n_:zv.bind(null,n),ea:qv.bind(null,n),ta:Gv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await To(n)):(await n.ma.stop(),n.Pa.length>0&&(Q(Sr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Xn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,l=new rl(e,t,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function il(n,e){if(kn("AsyncQueue",`${e}: ${n}`),ii(n))return new K(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{static emptySet(e){return new Br(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||te.comparator(t.key,r.key):(t,r)=>te.comparator(t.key,r.key),this.keyedMap=_i(),this.sortedSet=new Je(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Br)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Br;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(){this.fa=new Je(te.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):se(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Xr{constructor(e,t,r,i,s,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Xr(e,t,Br.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&_o(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class Kv{constructor(){this.queries=wu(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=fe(t),s=i.queries;i.queries=wu(),s.forEach((a,l)=>{for(const u of l.wa)u.onError(r)})})(this,new K(L.ABORTED,"Firestore shutting down"))}}function wu(){return new kr(n=>_d(n),_o)}async function Jd(n,e){const t=fe(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new Wv,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const l=il(a,`Initialization of query '${Fr(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&sl(t)}async function Xd(n,e){const t=fe(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Qv(n,e){const t=fe(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&sl(t)}function Yv(n,e,t){const r=fe(n),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(t);r.queries.delete(e)}function sl(n){n.Da.forEach(e=>{e.next()})}var Aa,Eu;(Eu=Aa||(Aa={})).Fa="default",Eu.Cache="cache";class Zd{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Xr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Xr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Aa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.key=e}}class tf{constructor(e){this.key=e}}class Jv{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Ee(),this.mutatedKeys=Ee(),this.Xa=vd(e),this.eu=new Br(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new bu,i=t?t.eu:this.eu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const _=i.get(f),x=vo(this.query,p)?p:null,C=!!_&&this.mutatedKeys.has(_.key),S=!!x&&(x.hasLocalMutations||this.mutatedKeys.has(x.key)&&x.hasCommittedMutations);let T=!1;_&&x?_.data.isEqual(x.data)?C!==S&&(r.track({type:3,doc:x}),T=!0):this.iu(_,x)||(r.track({type:2,doc:x}),T=!0,(u&&this.Xa(x,u)>0||h&&this.Xa(x,h)<0)&&(l=!0)):!_&&x?(r.track({type:0,doc:x}),T=!0):_&&!x&&(r.track({type:1,doc:_}),T=!0,(u||h)&&(l=!0)),T&&(x?(a=a.add(x),s=S?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(x,C){const S=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return se(20277,{At:T})}};return S(x)-S(C)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),i=i!=null&&i;const l=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Xr(this.query,e.eu,s,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new bu,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Ee(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new tf(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new ef(r))}),t}uu(e){this.Ha=e.qs,this.Za=Ee();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Xr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const ol="SyncEngine";class Xv{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Zv{constructor(e){this.key=e,this.lu=!1}}class ey{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new kr(l=>_d(l),_o),this.Tu=new Map,this.Iu=new Set,this.du=new Je(te.comparator),this.Eu=new Map,this.Au=new Qa,this.Ru={},this.Vu=new Map,this.mu=Jr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function ty(n,e,t=!0){const r=lf(n);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await nf(r,e,t,!0),i}async function ny(n,e){const t=lf(n);await nf(t,e,!0,!1)}async function nf(n,e,t,r){const i=await Ev(n.localStore,hn(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await ry(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&zd(n.remoteStore,i),l}async function ry(n,e,t,r,i){n.gu=(p,_,x)=>async function(S,T,N,R){let $=T.view.nu(N);$.Ds&&($=await pu(S.localStore,T.query,!1).then(({documents:w})=>T.view.nu(w,$)));const O=R&&R.targetChanges.get(T.targetId),F=R&&R.targetMismatches.get(T.targetId)!=null,q=T.view.applyChanges($,S.isPrimaryClient,O,F);return Iu(S,T.targetId,q._u),q.snapshot}(n,p,_,x);const s=await pu(n.localStore,e,!0),a=new Jv(e,s.qs),l=a.nu(s.documents),u=Ki.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=a.applyChanges(l,n.isPrimaryClient,u);Iu(n,t,h._u);const f=new Xv(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function iy(n,e,t){const r=fe(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!_o(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ia(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Za(r.remoteStore,i.targetId),Sa(r,i.targetId)}).catch(ri)):(Sa(r,i.targetId),await Ia(r.localStore,i.targetId,!0))}async function sy(n,e){const t=fe(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Za(t.remoteStore,r.targetId))}async function oy(n,e,t){const r=fy(n);try{const i=await function(a,l){const u=fe(a),h=He.now(),f=l.reduce((x,C)=>x.add(C.key),Ee());let p,_;return u.persistence.runTransaction("Locally write mutations","readwrite",x=>{let C=$n(),S=Ee();return u.Os.getEntries(x,f).next(T=>{C=T,C.forEach((N,R)=>{R.isValidDocument()||(S=S.add(N))})}).next(()=>u.localDocuments.getOverlayedDocuments(x,C)).next(T=>{p=T;const N=[];for(const R of l){const $=E_(R,p.get(R.key).overlayedDocument);$!=null&&N.push(new cr(R.key,$,cd($.value.mapValue),Vt.exists(!0)))}return u.mutationQueue.addMutationBatch(x,h,N,l)}).next(T=>{_=T;const N=T.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(x,T.batchId,N)})}).then(()=>({batchId:_.batchId,changes:bd(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new Je(ve)),h=h.insert(l,u),a.Ru[a.currentUser.toKey()]=h}(r,i.batchId,t),await Yi(r,i.changes),await To(r.remoteStore)}catch(i){const s=il(i,"Failed to persist write");t.reject(s)}}async function rf(n,e){const t=fe(n);try{const r=await yv(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Eu.get(s);a&&($e(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?$e(a.lu,14607):i.removedDocuments.size>0&&($e(a.lu,42227),a.lu=!1))}),await Yi(t,r,e)}catch(r){await ri(r)}}function xu(n,e,t){const r=fe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const u=fe(a);u.onlineState=l;let h=!1;u.queries.forEach((f,p)=>{for(const _ of p.wa)_.va(l)&&(h=!0)}),h&&sl(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ay(n,e,t){const r=fe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Eu.get(e),s=i&&i.key;if(s){let a=new Je(te.comparator);a=a.insert(s,St.newNoDocument(s,he.min()));const l=Ee().add(s),u=new Eo(he.min(),new Map,new Je(ve),a,l);await rf(r,u),r.du=r.du.remove(s),r.Eu.delete(e),al(r)}else await Ia(r.localStore,e,!1).then(()=>Sa(r,e,t)).catch(ri)}async function ly(n,e){const t=fe(n),r=e.batch.batchId;try{const i=await vv(t.localStore,e);of(t,r,null),sf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Yi(t,i)}catch(i){await ri(i)}}async function cy(n,e,t){const r=fe(n);try{const i=await function(a,l){const u=fe(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(p=>($e(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);of(r,e,t),sf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Yi(r,i)}catch(i){await ri(i)}}function sf(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function of(n,e,t){const r=fe(n);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Sa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||af(n,r)})}function af(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Za(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),al(n))}function Iu(n,e,t){for(const r of t)r instanceof ef?(n.Au.addReference(r.key,e),uy(n,r)):r instanceof tf?(Q(ol,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||af(n,r.key)):se(19791,{yu:r})}function uy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(Q(ol,"New document in limbo: "+t),n.Iu.add(r),al(n))}function al(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new te(qe.fromString(e)),r=n.mu.next();n.Eu.set(r,new Zv(t)),n.du=n.du.insert(t,r),zd(n.remoteStore,new Wn(hn(Ga(t.path)),r,"TargetPurposeLimboResolution",po.ue))}}async function Yi(n,e,t){const r=fe(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){i.push(h);const p=Ja.Es(u.targetId,h);s.push(p)}}))}),await Promise.all(a),r.hu.J_(i),await async function(u,h){const f=fe(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>U.forEach(h,_=>U.forEach(_.Is,x=>f.persistence.referenceDelegate.addReference(p,_.targetId,x)).next(()=>U.forEach(_.ds,x=>f.persistence.referenceDelegate.removeReference(p,_.targetId,x)))))}catch(p){if(!ii(p))throw p;Q(Xa,"Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const x=f.Fs.get(_),C=x.snapshotVersion,S=x.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(_,S)}}}(r.localStore,s))}async function hy(n,e){const t=fe(n);if(!t.currentUser.isEqual(e)){Q(ol,"User change. New user:",e.toKey());const r=await jd(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(l=>{l.forEach(u=>{u.reject(new K(L.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Yi(t,r.Bs)}}function dy(n,e){const t=fe(n),r=t.Eu.get(e);if(r&&r.lu)return Ee().add(r.key);{let i=Ee();const s=t.Tu.get(e);if(!s)return i;for(const a of s){const l=t.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function lf(n){const e=fe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=rf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=dy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ay.bind(null,e),e.hu.J_=Qv.bind(null,e.eventManager),e.hu.pu=Yv.bind(null,e.eventManager),e}function fy(n){const e=fe(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ly.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=cy.bind(null,e),e}class eo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return _v(this.persistence,new pv,e.initialUser,this.serializer)}Du(e){return new Ud(Ya.Vi,this.serializer)}bu(e){return new Iv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}eo.provider={build:()=>new eo};class py extends eo{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){$e(this.persistence.referenceDelegate instanceof Xs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Z_(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Mt.withCacheSize(this.cacheSizeBytes):Mt.DEFAULT;return new Ud(r=>Xs.Vi(r,t),this.serializer)}}class Ca{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=hy.bind(null,this.syncEngine),await Hv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Kv}()}createDatastore(e){const t=xo(e.databaseInfo.databaseId),r=function(s){return new Rv(s)}(e.databaseInfo);return function(s,a,l,u){return new Nv(s,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,l){return new Vv(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>xu(this.syncEngine,t,0),function(){return _u.C()?new _u:new Tv}())}createSyncEngine(e,t){return function(i,s,a,l,u,h,f){const p=new ey(i,s,a,l,u,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=fe(i);Q(Sr,"RemoteStore shutting down."),s.Ia.add(5),await Qi(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ca.provider={build:()=>new Ca};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):kn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar="FirestoreClient";class gy{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=At.UNAUTHENTICATED,this.clientId=La.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{Q(ar,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(Q(ar,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Xn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=il(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ea(n,e){n.asyncQueue.verifyOperationInProgress(),Q(ar,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await jd(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{tr("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{Q("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{tr("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function Tu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await my(n);Q(ar,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>yu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>yu(e.remoteStore,i)),n._onlineComponents=e}async function my(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Q(ar,"Using user provided OfflineComponentProvider");try{await ea(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;tr("Error using user provided cache. Falling back to memory cache: "+t),await ea(n,new eo)}}else Q(ar,"Using default OfflineComponentProvider"),await ea(n,new py(void 0));return n._offlineComponents}async function uf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Q(ar,"Using user provided OnlineComponentProvider"),await Tu(n,n._uninitializedComponentsProvider._online)):(Q(ar,"Using default OnlineComponentProvider"),await Tu(n,new Ca))),n._onlineComponents}function _y(n){return uf(n).then(e=>e.syncEngine)}async function Ra(n){const e=await uf(n),t=e.eventManager;return t.onListen=ty.bind(null,e.syncEngine),t.onUnlisten=iy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ny.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=sy.bind(null,e.syncEngine),t}function vy(n,e,t={}){const r=new Xn;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,h){const f=new cf({next:_=>{f.Ou(),a.enqueueAndForget(()=>Xd(s,p)),_.fromCache&&u.source==="server"?h.reject(new K(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Zd(l,f,{includeMetadataChanges:!0,ka:!0});return Jd(s,p)}(await Ra(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df="firestore.googleapis.com",Su=!0;class Cu{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=df,this.ssl=Su}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Su;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Fd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<J_)throw new K(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Vm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ao{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Am;switch(r.type){case"firstParty":return new km(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Au.get(t);r&&(Q("ComponentProvider","Removing Datastore"),Au.delete(t),r.terminate())}(this),Promise.resolve()}}function yy(n,e,t,r={}){var i;n=Gt(n,Ao);const s=ei(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;s&&(Vh(`https://${u}`),Oh("Firestore",!0)),a.host!==df&&a.host!==u&&tr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:u,ssl:s,emulatorOptions:r});if(!Ir(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=At.MOCK_USER;else{f=Zp(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const _=r.mockUserToken.sub||r.mockUserToken.user_id;if(!_)throw new K(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new At(_)}n._authCredentials=new Sm(new Yh(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ur(this.firestore,e,this._query)}}class it{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Zn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new it(this.firestore,e,this._key)}toJSON(){return{type:it._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Hi(t,it._jsonSchema))return new it(e,r||null,new te(qe.fromString(t.referencePath)))}}it._jsonSchemaVersion="firestore/documentReference/1.0",it._jsonSchema={type:ct("string",it._jsonSchemaVersion),referencePath:ct("string")};class Zn extends ur{constructor(e,t,r){super(e,t,Ga(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new it(this.firestore,null,new te(e))}withConverter(e){return new Zn(this.firestore,e,this._path)}}function Ps(n,e,...t){if(n=ut(n),Xh("collection","path",e),n instanceof Ao){const r=qe.fromString(e,...t);return jc(r),new Zn(n,null,r)}{if(!(n instanceof it||n instanceof Zn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(qe.fromString(e,...t));return jc(r),new Zn(n.firestore,null,r)}}function Ct(n,e,...t){if(n=ut(n),arguments.length===1&&(e=La.newId()),Xh("doc","path",e),n instanceof Ao){const r=qe.fromString(e,...t);return Uc(r),new it(n,null,new te(r))}{if(!(n instanceof it||n instanceof Zn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(qe.fromString(e,...t));return Uc(r),new it(n.firestore,n instanceof Zn?n.converter:null,new te(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="AsyncQueue";class ku{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new qd(this,"async_queue_retry"),this.oc=()=>{const r=Zo();r&&Q(Ru,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Zo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Zo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Xn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ii(e))throw e;Q(Ru,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,kn("INTERNAL UNHANDLED ERROR: ",$u(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=rl.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&se(47125,{hc:$u(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function $u(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Pn extends Ao{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ku,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ku(e),this._firestoreClient=void 0,await e}}}function by(n,e){const t=typeof n=="object"?n:Uh(),r=typeof n=="string"?n:Ws,i=Oa(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Jp("firestore");s&&yy(i,...s)}return i}function So(n){if(n._terminated)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||wy(n),n._firestoreClient}function wy(n){var e,t,r;const i=n._freezeSettings(),s=function(l,u,h,f){return new Hm(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,hf(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new gy(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(l){const u=l?._online.build();return{_offline:l?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Wt(bt.fromBase64String(e))}catch(t){throw new K(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Wt(bt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Wt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Hi(e,Wt._jsonSchema))return Wt.fromBase64String(e.bytes)}}Wt._jsonSchemaVersion="firestore/bytes/1.0",Wt._jsonSchema={type:ct("string",Wt._jsonSchemaVersion),bytes:ct("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new yt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ve(this._lat,e._lat)||ve(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:fn._jsonSchemaVersion}}static fromJSON(e){if(Hi(e,fn._jsonSchema))return new fn(e.latitude,e.longitude)}}fn._jsonSchemaVersion="firestore/geoPoint/1.0",fn._jsonSchema={type:ct("string",fn._jsonSchemaVersion),latitude:ct("number"),longitude:ct("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:pn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Hi(e,pn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new pn(e.vectorValues);throw new K(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}pn._jsonSchemaVersion="firestore/vectorValue/1.0",pn._jsonSchema={type:ct("string",pn._jsonSchemaVersion),vectorValues:ct("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=/^__.*__$/;class xy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new cr(e,this.data,this.fieldMask,t,this.fieldTransforms):new Wi(e,this.data,t,this.fieldTransforms)}}class ff{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new cr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function pf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw se(40011,{Ec:n})}}class ll{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new ll(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return to(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(pf(this.Ec)&&Ey.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Iy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||xo(e)}Dc(e,t,r,i=!1){return new ll({Ec:e,methodName:t,bc:r,path:yt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Xi(n){const e=n._freezeSettings(),t=xo(n._databaseId);return new Iy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cl(n,e,t,r,i,s={}){const a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);hl("Data must be an object, but it was:",a,r);const l=_f(r,a);let u,h;if(s.merge)u=new qt(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const _=ka(e,p,t);if(!a.contains(_))throw new K(L.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);yf(f,_)||f.push(_)}u=new qt(f),h=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,h=a.fieldTransforms;return new xy(new Lt(l),u,h)}class Ro extends Co{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ro}}class ul extends Co{_toFieldTransform(e){return new v_(e.path,new Vi)}isEqual(e){return e instanceof ul}}function gf(n,e,t,r){const i=n.Dc(1,e,t);hl("Data must be an object, but it was:",i,r);const s=[],a=Lt.empty();lr(r,(u,h)=>{const f=dl(e,u,t);h=ut(h);const p=i.gc(f);if(h instanceof Ro)s.push(f);else{const _=Zi(h,p);_!=null&&(s.push(f),a.set(f,_))}});const l=new qt(s);return new ff(a,l,i.fieldTransforms)}function mf(n,e,t,r,i,s){const a=n.Dc(1,e,t),l=[ka(e,r,t)],u=[i];if(s.length%2!=0)throw new K(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)l.push(ka(e,s[_])),u.push(s[_+1]);const h=[],f=Lt.empty();for(let _=l.length-1;_>=0;--_)if(!yf(h,l[_])){const x=l[_];let C=u[_];C=ut(C);const S=a.gc(x);if(C instanceof Ro)h.push(x);else{const T=Zi(C,S);T!=null&&(h.push(x),f.set(x,T))}}const p=new qt(h);return new ff(f,p,a.fieldTransforms)}function Ty(n,e,t,r=!1){return Zi(t,n.Dc(r?4:3,e))}function Zi(n,e){if(vf(n=ut(n)))return hl("Unsupported field value:",e,n),_f(n,e);if(n instanceof Co)return function(r,i){if(!pf(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let u=Zi(l,i.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ut(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return g_(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=He.fromDate(r);return{timestampValue:Js(i.serializer,s)}}if(r instanceof He){const s=new He(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Js(i.serializer,s)}}if(r instanceof fn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Wt)return{bytesValue:Pd(i.serializer,r._byteString)};if(r instanceof it){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ka(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof pn)return function(a,l){return{mapValue:{fields:{[ad]:{stringValue:ld},[Ks]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return za(l.serializer,h)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${fo(r)}`)}(n,e)}function _f(n,e){const t={};return td(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):lr(n,(r,i)=>{const s=Zi(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function vf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof He||n instanceof fn||n instanceof Wt||n instanceof it||n instanceof Co||n instanceof pn)}function hl(n,e,t){if(!vf(t)||!Zh(t)){const r=fo(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function ka(n,e,t){if((e=ut(e))instanceof Ji)return e._internalPath;if(typeof e=="string")return dl(n,e);throw to("Field path arguments must be of type string or ",n,!1,void 0,t)}const Ay=new RegExp("[~\\*/\\[\\]]");function dl(n,e,t){if(e.search(Ay)>=0)throw to(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ji(...e.split("."))._internalPath}catch{throw to(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function to(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new K(L.INVALID_ARGUMENT,l+n+u)}function yf(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Sy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(fl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Sy extends bf{data(){return super.data()}}function fl(n,e){return typeof e=="string"?dl(n,e):e instanceof Ji?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class pl{}class Ef extends pl{}function Cy(n,e,...t){let r=[];e instanceof pl&&r.push(e),r=r.concat(t),function(s){const a=s.filter(u=>u instanceof ml).length,l=s.filter(u=>u instanceof gl).length;if(a>1||a>0&&l>0)throw new K(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class gl extends Ef{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new gl(e,t,r)}_apply(e){const t=this._parse(e);return xf(e._query,t),new ur(e.firestore,e.converter,va(e._query,t))}_parse(e){const t=Xi(e.firestore);return function(s,a,l,u,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new K(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Du(p,f);const C=[];for(const S of p)C.push(Nu(u,s,S));_={arrayValue:{values:C}}}else _=Nu(u,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Du(p,f),_=Ty(l,a,p,f==="in"||f==="not-in");return lt.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class ml extends pl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ml(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:sn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const l=s.getFlattenedFilters();for(const u of l)xf(a,u),a=va(a,u)}(e._query,t),new ur(e.firestore,e.converter,va(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class _l extends Ef{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new _l(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Di(s,a)}(e._query,this._field,this._direction);return new ur(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new si(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Ry(n,e="asc"){const t=e,r=fl("orderBy",n);return _l._create(r,t)}function Nu(n,e,t){if(typeof(t=ut(t))=="string"){if(t==="")throw new K(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!md(e)&&t.indexOf("/")!==-1)throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(qe.fromString(t));if(!te.isDocumentKey(r))throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Qc(n,new te(r))}if(t instanceof it)return Qc(n,t._key);throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fo(t)}.`)}function Du(n,e){if(!Array.isArray(n)||n.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function xf(n,e){const t=function(i,s){for(const a of i)for(const l of a.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class ky{convertValue(e,t="none"){switch(sr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return nt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ir(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw se(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return lr(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Ks].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>nt(a.doubleValue));return new pn(s)}convertGeoPoint(e){return new fn(nt(e.latitude),nt(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=mo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp($i(e));default:return null}}convertTimestamp(e){const t=rr(e);return new He(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=qe.fromString(e);$e(Ld(r),9688,{name:e});const i=new Pi(r.get(1),r.get(3)),s=new te(r.popFirst(5));return i.isEqual(t)||kn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class yi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wr extends bf{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ns(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(fl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new K(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wr._jsonSchemaVersion="firestore/documentSnapshot/1.0",wr._jsonSchema={type:ct("string",wr._jsonSchemaVersion),bundleSource:ct("string","DocumentSnapshot"),bundleName:ct("string"),bundle:ct("string")};class Ns extends wr{data(e={}){return super.data(e)}}class Er{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new yi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ns(this._firestore,this._userDataWriter,r.key,r,new yi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const u=new Ns(i._firestore,i._userDataWriter,l.doc.key,l.doc,new yi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Ns(i._firestore,i._userDataWriter,l.doc.key,l.doc,new yi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:$y(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new K(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Er._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=La.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function $y(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return se(61501,{type:n})}}Er._jsonSchemaVersion="firestore/querySnapshot/1.0",Er._jsonSchema={type:ct("string",Er._jsonSchemaVersion),bundleSource:ct("string","QuerySnapshot"),bundleName:ct("string"),bundle:ct("string")};class yl extends ky{constructor(e){super(),this.firestore=e}convertBytes(e){return new Wt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new it(this.firestore,null,t)}}function Py(n){n=Gt(n,ur);const e=Gt(n.firestore,Pn),t=So(e),r=new yl(e);return wf(n._query),vy(t,n._query).then(i=>new Er(e,r,n,i))}function es(n,e,t){n=Gt(n,it);const r=Gt(n.firestore,Pn),i=vl(n.converter,e,t);return ts(r,[cl(Xi(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Vt.none())])}function yr(n,e,t,...r){n=Gt(n,it);const i=Gt(n.firestore,Pn),s=Xi(i);let a;return a=typeof(e=ut(e))=="string"||e instanceof Ji?mf(s,"updateDoc",n._key,e,t,r):gf(s,"updateDoc",n._key,e),ts(i,[a.toMutation(n._key,Vt.exists(!0))])}function If(n){return ts(Gt(n.firestore,Pn),[new wo(n._key,Vt.none())])}function Ny(n,e){const t=Gt(n.firestore,Pn),r=Ct(n),i=vl(n.converter,e);return ts(t,[cl(Xi(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Vt.exists(!1))]).then(()=>r)}function Vu(n,...e){var t,r,i;n=ut(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Pu(e[a])||(s=e[a++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Pu(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let u,h,f;if(n instanceof it)h=Gt(n.firestore,Pn),f=Ga(n._key.path),u={next:p=>{e[a]&&e[a](Dy(h,n,p))},error:e[a+1],complete:e[a+2]};else{const p=Gt(n,ur);h=Gt(p.firestore,Pn),f=p._query;const _=new yl(h);u={next:x=>{e[a]&&e[a](new Er(h,_,p,x))},error:e[a+1],complete:e[a+2]},wf(n._query)}return function(_,x,C,S){const T=new cf(S),N=new Zd(x,T,C);return _.asyncQueue.enqueueAndForget(async()=>Jd(await Ra(_),N)),()=>{T.Ou(),_.asyncQueue.enqueueAndForget(async()=>Xd(await Ra(_),N))}}(So(h),f,l,u)}function ts(n,e){return function(r,i){const s=new Xn;return r.asyncQueue.enqueueAndForget(async()=>oy(await _y(r),i,s)),s.promise}(So(n),e)}function Dy(n,e,t){const r=t.docs.get(e._key),i=new yl(n);return new wr(n,i,e._key,r,new yi(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Xi(e)}set(e,t,r){this._verifyNotCommitted();const i=ta(e,this._firestore),s=vl(i.converter,t,r),a=cl(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Vt.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=ta(e,this._firestore);let a;return a=typeof(t=ut(t))=="string"||t instanceof Ji?mf(this._dataReader,"WriteBatch.update",s._key,t,r,i):gf(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Vt.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ta(e,this._firestore);return this._mutations=this._mutations.concat(new wo(t._key,Vt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new K(L.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ta(n,e){if((n=ut(n)).firestore!==e)throw new K(L.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function bl(){return new ul("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(n){return So(n=Gt(n,Pn)),new Vy(n,e=>ts(n,e))}(function(e,t=!0){(function(i){ni=i})(ti),Wr(new Tr("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new Pn(new Cm(r.getProvider("auth-internal")),new $m(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new K(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Pi(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Yn(Vc,Oc,e),Yn(Vc,Oc,"esm2017")})();function wl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Af(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Oy=Af,Sf=new Gi("auth","Firebase",Af());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=new Da("@firebase/auth");function My(n,...e){no.logLevel<=we.WARN&&no.warn(`Auth (${ti}): ${n}`,...e)}function Ds(n,...e){no.logLevel<=we.ERROR&&no.error(`Auth (${ti}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(n,...e){throw xl(n,...e)}function rn(n,...e){return xl(n,...e)}function El(n,e,t){const r=Object.assign(Object.assign({},Oy()),{[e]:t});return new Gi("auth","Firebase",r).create(e,{appName:n.name})}function xr(n){return El(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ly(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&vn(n,"argument-error"),El(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Sf.create(n,...e)}function le(n,e,...t){if(!n)throw xl(e,...t)}function Tn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ds(e),new Error(e)}function Nn(n,e){n||Tn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Fy(){return Ou()==="http:"||Ou()==="https:"}function Ou(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Fy()||sg()||"connection"in navigator)?navigator.onLine:!0}function jy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t){this.shortDelay=e,this.longDelay=t,Nn(t>e,"Short delay should be less than long delay!"),this.isMobile=ng()||og()}get(){return Uy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(n,e){Nn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Tn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Tn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Tn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Gy=new ns(3e4,6e4);function Tl(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ai(n,e,t,r,i={}){return Rf(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=zi(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},s);return ig()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&ei(n.emulatorConfig.host)&&(h.credentials="include"),Cf.fetch()(await kf(n,n.config.apiHost,t,l),h)})}async function Rf(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},By),e);try{const i=new Hy(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ts(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ts(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ts(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ts(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw El(n,f,h);vn(n,f)}}catch(i){if(i instanceof Vn)throw i;vn(n,"network-request-failed",{message:String(i)})}}async function zy(n,e,t,r,i={}){const s=await ai(n,e,t,r,i);return"mfaPendingCredential"in s&&vn(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function kf(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?Il(n.config,i):`${n.config.apiScheme}://${i}`;return qy.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class Hy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(rn(this.auth,"network-request-failed")),Gy.get())})}}function Ts(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=rn(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wy(n,e){return ai(n,"POST","/v1/accounts:delete",e)}async function ro(n,e){return ai(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ky(n,e=!1){const t=ut(n),r=await t.getIdToken(e),i=Al(r);le(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:Ai(na(i.auth_time)),issuedAtTime:Ai(na(i.iat)),expirationTime:Ai(na(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function na(n){return Number(n)*1e3}function Al(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ds("JWT malformed, contained fewer than 3 sections"),null;try{const i=$h(t);return i?JSON.parse(i):(Ds("Failed to decode base64 JWT payload"),null)}catch(i){return Ds("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Mu(n){const e=Al(n);return le(e,"internal-error"),le(typeof e.exp<"u","internal-error"),le(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Li(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Vn&&Qy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Qy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ai(this.lastLoginAt),this.creationTime=Ai(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function io(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Li(n,ro(t,{idToken:r}));le(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?$f(s.providerUserInfo):[],l=Xy(n.providerData,a),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!l?.length,f=u?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new Pa(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function Jy(n){const e=ut(n);await io(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function $f(n){return n.map(e=>{var{providerId:t}=e,r=wl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zy(n,e){const t=await Rf(n,{},async()=>{const r=zi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await kf(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&ei(n.emulatorConfig.host)&&(u.credentials="include"),Cf.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function eb(n,e){return ai(n,"POST","/v2/accounts:revokeToken",Tl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){le(e.idToken,"internal-error"),le(typeof e.idToken<"u","internal-error"),le(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){le(e.length!==0,"internal-error");const t=Mu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(le(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Zy(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new qr;return r&&(le(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(le(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(le(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qr,this.toJSON())}_performRefresh(){return Tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bn(n,e){le(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class tn{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=wl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Yy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Pa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Li(this,this.stsTokenManager.getToken(this.auth,e));return le(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ky(this,e)}reload(){return Jy(this)}_assign(e){this!==e&&(le(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new tn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){le(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await io(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Zt(this.auth.app))return Promise.reject(xr(this.auth));const e=await this.getIdToken();return await Li(this,Wy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,l,u,h,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,x=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,S=(l=t.tenantId)!==null&&l!==void 0?l:void 0,T=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,N=(h=t.createdAt)!==null&&h!==void 0?h:void 0,R=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:O,isAnonymous:F,providerData:q,stsTokenManager:w}=t;le($&&w,e,"internal-error");const v=qr.fromJSON(this.name,w);le(typeof $=="string",e,"internal-error"),Bn(p,e.name),Bn(_,e.name),le(typeof O=="boolean",e,"internal-error"),le(typeof F=="boolean",e,"internal-error"),Bn(x,e.name),Bn(C,e.name),Bn(S,e.name),Bn(T,e.name),Bn(N,e.name),Bn(R,e.name);const y=new tn({uid:$,auth:e,email:_,emailVerified:O,displayName:p,isAnonymous:F,photoURL:C,phoneNumber:x,tenantId:S,stsTokenManager:v,createdAt:N,lastLoginAt:R});return q&&Array.isArray(q)&&(y.providerData=q.map(I=>Object.assign({},I))),T&&(y._redirectEventId=T),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new qr;i.updateFromServerResponse(t);const s=new tn({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await io(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];le(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?$f(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,l=new qr;l.updateFromIdToken(r);const u=new tn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Pa(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=new Map;function An(n){Nn(n instanceof Function,"Expected a class definition");let e=Lu.get(n);return e?(Nn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Lu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pf.type="NONE";const Fu=Pf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(n,e,t){return`firebase:${n}:${e}:${t}`}class Gr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Vs(this.userKey,i.apiKey,s),this.fullPersistenceKey=Vs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ro(this.auth,{idToken:e}).catch(()=>{});return t?tn._fromGetAccountInfoResponse(this.auth,t,e):null}return tn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Gr(An(Fu),e,r);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||An(Fu);const a=Vs(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const _=await ro(e,{idToken:f}).catch(()=>{});if(!_)break;p=await tn._fromGetAccountInfoResponse(e,_,f)}else p=tn._fromJSON(e,f);h!==s&&(l=p),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Gr(s,e,r):(s=u[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(a)}catch{}})),new Gr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Of(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lf(e))return"Blackberry";if(Ff(e))return"Webos";if(Df(e))return"Safari";if((e.includes("chrome/")||Vf(e))&&!e.includes("edge/"))return"Chrome";if(Mf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Nf(n=$t()){return/firefox\//i.test(n)}function Df(n=$t()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vf(n=$t()){return/crios\//i.test(n)}function Of(n=$t()){return/iemobile/i.test(n)}function Mf(n=$t()){return/android/i.test(n)}function Lf(n=$t()){return/blackberry/i.test(n)}function Ff(n=$t()){return/webos/i.test(n)}function Sl(n=$t()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function tb(n=$t()){var e;return Sl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function nb(){return ag()&&document.documentMode===10}function Uf(n=$t()){return Sl(n)||Mf(n)||Ff(n)||Lf(n)||/windows phone/i.test(n)||Of(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(n,e=[]){let t;switch(n){case"Browser":t=Uu($t());break;case"Worker":t=`${Uu($t())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ti}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const u=e(s);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ib(n,e={}){return ai(n,"GET","/v2/passwordPolicy",Tl(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sb=6;class ob{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:sb,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ju(this),this.idTokenSubscription=new ju(this),this.beforeStateQueue=new rb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=An(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Gr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ro(this,{idToken:e}),r=await tn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Zt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return le(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await io(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Zt(this.app))return Promise.reject(xr(this));const t=e?ut(e):null;return t&&le(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&le(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Zt(this.app)?Promise.reject(xr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Zt(this.app)?Promise.reject(xr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(An(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ib(this),t=new ob(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Gi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await eb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&An(e)||this._popupRedirectResolver;le(t,this,"argument-error"),this.redirectPersistenceManager=await Gr.create(this,[An(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(le(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return le(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Zt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&My(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ko(n){return ut(n)}class ju{constructor(e){this.auth=e,this.observer=null,this.addObserver=gg(t=>this.observer=t)}get next(){return le(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lb(n){Cl=n}function cb(n){return Cl.loadJS(n)}function ub(){return Cl.gapiScript}function hb(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function db(n,e){const t=Oa(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ir(s,e??{}))return i;vn(i,"already-initialized")}return t.initialize({options:e})}function fb(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(An);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function pb(n,e,t){const r=ko(n);le(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Bf(e),{host:a,port:l}=gb(e),u=l===null?"":`:${l}`,h={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){le(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),le(Ir(h,r.config.emulator)&&Ir(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ei(a)?(Vh(`${s}//${a}${u}`),Oh("Auth",!0)):mb()}function Bf(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gb(n){const e=Bf(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Bu(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Bu(a)}}}function Bu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function mb(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Tn("not implemented")}_getIdTokenResponse(e){return Tn("not implemented")}_linkToIdToken(e,t){return Tn("not implemented")}_getReauthenticationResolver(e){return Tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zr(n,e){return zy(n,"POST","/v1/accounts:signInWithIdp",Tl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b="http://localhost";class Cr extends qf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Cr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=wl(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Cr(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return zr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,zr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,zr(e,t)}buildRequest(){const e={requestUri:_b,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=zi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends Rl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends rs{constructor(){super("facebook.com")}static credential(e){return Cr._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gn.credential(e.oauthAccessToken)}catch{return null}}}Gn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends rs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Cr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return In.credential(t,r)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn extends rs{constructor(){super("github.com")}static credential(e){return Cr._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch{return null}}}zn.GITHUB_SIGN_IN_METHOD="github.com";zn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends rs{constructor(){super("twitter.com")}static credential(e,t){return Cr._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Hn.credential(t,r)}catch{return null}}}Hn.TWITTER_SIGN_IN_METHOD="twitter.com";Hn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await tn._fromIdTokenResponse(e,r,i),a=qu(r);return new Zr({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=qu(r);return new Zr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function qu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so extends Vn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,so.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new so(e,t,r,i)}}function Gf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?so._fromErrorAndOperation(n,s,e,r):s})}async function vb(n,e,t=!1){const r=await Li(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Zr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yb(n,e,t=!1){const{auth:r}=n;if(Zt(r.app))return Promise.reject(xr(r));const i="reauthenticate";try{const s=await Li(n,Gf(r,i,e,n),t);le(s.idToken,r,"internal-error");const a=Al(s.idToken);le(a,r,"internal-error");const{sub:l}=a;return le(n.uid===l,r,"user-mismatch"),Zr._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&vn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bb(n,e,t=!1){if(Zt(n.app))return Promise.reject(xr(n));const r="signIn",i=await Gf(n,r,e),s=await Zr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function wb(n,e,t,r){return ut(n).onIdTokenChanged(e,t,r)}function Eb(n,e,t){return ut(n).beforeAuthStateChanged(e,t)}function xb(n,e,t,r){return ut(n).onAuthStateChanged(e,t,r)}function Ib(n){return ut(n).signOut()}const oo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(oo,"1"),this.storage.removeItem(oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=1e3,Ab=10;class Hf extends zf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);nb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ab):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Tb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hf.type="LOCAL";const Sb=Hf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf extends zf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wf.type="SESSION";const Kf=Wf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new $o(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async h=>h(t.origin,s)),u=await Cb(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$o.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((l,u)=>{const h=kl("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(_.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function kb(n){gn().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function $b(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Pb(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Nb(){return Qf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf="firebaseLocalStorageDb",Db=1,ao="firebaseLocalStorage",Jf="fbase_key";class is{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Po(n,e){return n.transaction([ao],e?"readwrite":"readonly").objectStore(ao)}function Vb(){const n=indexedDB.deleteDatabase(Yf);return new is(n).toPromise()}function Na(){const n=indexedDB.open(Yf,Db);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ao,{keyPath:Jf})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ao)?e(r):(r.close(),await Vb(),e(await Na()))})})}async function Gu(n,e,t){const r=Po(n,!0).put({[Jf]:e,value:t});return new is(r).toPromise()}async function Ob(n,e){const t=Po(n,!1).get(e),r=await new is(t).toPromise();return r===void 0?null:r.value}function zu(n,e){const t=Po(n,!0).delete(e);return new is(t).toPromise()}const Mb=800,Lb=3;class Xf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Na(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Lb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$o._getInstance(Nb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await $b(),!this.activeServiceWorker)return;this.sender=new Rb(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Pb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Na();return await Gu(e,oo,"1"),await zu(e,oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ob(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Po(i,!1).getAll();return new is(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Mb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Xf.type="LOCAL";const Fb=Xf;new ns(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(n,e){return e?An(e):(le(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l extends qf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return zr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return zr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ub(n){return bb(n.auth,new $l(n),n.bypassAuthState)}function jb(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),yb(t,new $l(n),n.bypassAuthState)}async function Bb(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),vb(t,new $l(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ub;case"linkViaPopup":case"linkViaRedirect":return Bb;case"reauthViaPopup":case"reauthViaRedirect":return jb;default:vn(this.auth,"internal-error")}}resolve(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qb=new ns(2e3,1e4);async function Gb(n,e,t){if(Zt(n.app))return Promise.reject(rn(n,"operation-not-supported-in-this-environment"));const r=ko(n);Ly(n,e,Rl);const i=Zf(r,t);return new br(r,"signInViaPopup",e,i).executeNotNull()}class br extends ep{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,br.currentPopupAction&&br.currentPopupAction.cancel(),br.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return le(e,this.auth,"internal-error"),e}async onExecution(){Nn(this.filter.length===1,"Popup operations only handle one event");const e=kl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(rn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(rn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,br.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qb.get())};e()}}br.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zb="pendingRedirect",Os=new Map;class Hb extends ep{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Os.get(this.auth._key());if(!e){try{const r=await Wb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Os.set(this.auth._key(),e)}return this.bypassAuthState||Os.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Wb(n,e){const t=Yb(e),r=Qb(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Kb(n,e){Os.set(n._key(),e)}function Qb(n){return An(n._redirectPersistence)}function Yb(n){return Vs(zb,n.config.apiKey,n.name)}async function Jb(n,e,t=!1){if(Zt(n.app))return Promise.reject(xr(n));const r=ko(n),i=Zf(r,e),a=await new Hb(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xb=10*60*1e3;class Zb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ew(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!tp(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(rn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Xb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hu(e))}saveEventToCache(e){this.cachedEventUids.add(Hu(e)),this.lastProcessedEventTime=Date.now()}}function Hu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function tp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function ew(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw(n,e={}){return ai(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rw=/^https?/;async function iw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await tw(n);for(const t of e)try{if(sw(t))return}catch{}vn(n,"unauthorized-domain")}function sw(n){const e=$a(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!rw.test(t))return!1;if(nw.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow=new ns(3e4,6e4);function Wu(){const n=gn().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function aw(n){return new Promise((e,t)=>{var r,i,s;function a(){Wu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wu(),t(rn(n,"network-request-failed"))},timeout:ow.get()})}if(!((i=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=gn().gapi)===null||s===void 0)&&s.load)a();else{const l=hb("iframefcb");return gn()[l]=()=>{gapi.load?a():t(rn(n,"network-request-failed"))},cb(`${ub()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Ms=null,e})}let Ms=null;function lw(n){return Ms=Ms||aw(n),Ms}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw=new ns(5e3,15e3),uw="__/auth/iframe",hw="emulator/auth/iframe",dw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function pw(n){const e=n.config;le(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Il(e,hw):`https://${n.config.authDomain}/${uw}`,r={apiKey:e.apiKey,appName:n.name,v:ti},i=fw.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${zi(r).slice(1)}`}async function gw(n){const e=await lw(n),t=gn().gapi;return le(t,n,"internal-error"),e.open({where:document.body,url:pw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:dw,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=rn(n,"network-request-failed"),l=gn().setTimeout(()=>{s(a)},cw.get());function u(){gn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},_w=500,vw=600,yw="_blank",bw="http://localhost";class Ku{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ww(n,e,t,r=_w,i=vw){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},mw),{width:r.toString(),height:i.toString(),top:s,left:a}),h=$t().toLowerCase();t&&(l=Vf(h)?yw:t),Nf(h)&&(e=e||bw,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[x,C])=>`${_}${x}=${C},`,"");if(tb(h)&&l!=="_self")return Ew(e||"",l),new Ku(null);const p=window.open(e||"",l,f);le(p,n,"popup-blocked");try{p.focus()}catch{}return new Ku(p)}function Ew(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw="__/auth/handler",Iw="emulator/auth/handler",Tw=encodeURIComponent("fac");async function Qu(n,e,t,r,i,s){le(n.config.authDomain,n,"auth-domain-config-required"),le(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ti,eventId:i};if(e instanceof Rl){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",pg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof rs){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),h=u?`#${Tw}=${encodeURIComponent(u)}`:"";return`${Aw(n)}?${zi(l).slice(1)}${h}`}function Aw({config:n}){return n.emulator?Il(n,Iw):`https://${n.authDomain}/${xw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="webStorageSupport";class Sw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Kf,this._completeRedirectFn=Jb,this._overrideRedirectResult=Kb}async _openPopup(e,t,r,i){var s;Nn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Qu(e,t,r,$a(),i);return ww(e,a,kl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Qu(e,t,r,$a(),i);return kb(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Nn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await gw(e),r=new Zb(e);return t.register("authEvent",i=>(le(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ra,{type:ra},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[ra];a!==void 0&&t(!!a),vn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=iw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Uf()||Df()||Sl()}}const Cw=Sw;var Yu="@firebase/auth",Ju="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){le(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $w(n){Wr(new Tr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;le(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jf(n)},h=new ab(r,i,s,u);return fb(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Wr(new Tr("auth-internal",e=>{const t=ko(e.getProvider("auth").getImmediate());return(r=>new Rw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Yn(Yu,Ju,kw(n)),Yn(Yu,Ju,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pw=5*60,Nw=Dh("authIdTokenMaxAge")||Pw;let Xu=null;const Dw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Nw)return;const i=t?.token;Xu!==i&&(Xu=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Vw(n=Uh()){const e=Oa(n,"auth");if(e.isInitialized())return e.getImmediate();const t=db(n,{popupRedirectResolver:Cw,persistence:[Fb,Sb,Kf]}),r=Dh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Dw(s.toString());Eb(t,a,()=>a(t.currentUser)),wb(t,l=>a(l))}}const i=Ph("auth");return i&&pb(t,`http://${i}`),t}function Ow(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lb({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=rn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Ow().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$w("Browser");var Mw="firebase",Lw="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yn(Mw,Lw,"app");var Zu;(function(n){n.STRING="string",n.NUMBER="number",n.INTEGER="integer",n.BOOLEAN="boolean",n.ARRAY="array",n.OBJECT="object"})(Zu||(Zu={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var eh;(function(n){n.LANGUAGE_UNSPECIFIED="language_unspecified",n.PYTHON="python"})(eh||(eh={}));var th;(function(n){n.OUTCOME_UNSPECIFIED="outcome_unspecified",n.OUTCOME_OK="outcome_ok",n.OUTCOME_FAILED="outcome_failed",n.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(th||(th={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=["user","model","function","system"];var rh;(function(n){n.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",n.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",n.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",n.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",n.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",n.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(rh||(rh={}));var ih;(function(n){n.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",n.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",n.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",n.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",n.BLOCK_NONE="BLOCK_NONE"})(ih||(ih={}));var sh;(function(n){n.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",n.NEGLIGIBLE="NEGLIGIBLE",n.LOW="LOW",n.MEDIUM="MEDIUM",n.HIGH="HIGH"})(sh||(sh={}));var oh;(function(n){n.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",n.SAFETY="SAFETY",n.OTHER="OTHER"})(oh||(oh={}));var Si;(function(n){n.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",n.STOP="STOP",n.MAX_TOKENS="MAX_TOKENS",n.SAFETY="SAFETY",n.RECITATION="RECITATION",n.LANGUAGE="LANGUAGE",n.BLOCKLIST="BLOCKLIST",n.PROHIBITED_CONTENT="PROHIBITED_CONTENT",n.SPII="SPII",n.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",n.OTHER="OTHER"})(Si||(Si={}));var ah;(function(n){n.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",n.RETRIEVAL_QUERY="RETRIEVAL_QUERY",n.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",n.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",n.CLASSIFICATION="CLASSIFICATION",n.CLUSTERING="CLUSTERING"})(ah||(ah={}));var lh;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.AUTO="AUTO",n.ANY="ANY",n.NONE="NONE"})(lh||(lh={}));var ch;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.MODE_DYNAMIC="MODE_DYNAMIC"})(ch||(ch={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class Mr extends Rt{constructor(e,t){super(e),this.response=t}}class np extends Rt{constructor(e,t,r,i){super(e),this.status=t,this.statusText=r,this.errorDetails=i}}class er extends Rt{}class rp extends Rt{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fw="https://generativelanguage.googleapis.com",Uw="v1beta",jw="0.24.1",Bw="genai-js";var Rr;(function(n){n.GENERATE_CONTENT="generateContent",n.STREAM_GENERATE_CONTENT="streamGenerateContent",n.COUNT_TOKENS="countTokens",n.EMBED_CONTENT="embedContent",n.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Rr||(Rr={}));class qw{constructor(e,t,r,i,s){this.model=e,this.task=t,this.apiKey=r,this.stream=i,this.requestOptions=s}toString(){var e,t;const r=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||Uw;let s=`${((t=this.requestOptions)===null||t===void 0?void 0:t.baseUrl)||Fw}/${r}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function Gw(n){const e=[];return n?.apiClient&&e.push(n.apiClient),e.push(`${Bw}/${jw}`),e.join(" ")}async function zw(n){var e;const t=new Headers;t.append("Content-Type","application/json"),t.append("x-goog-api-client",Gw(n.requestOptions)),t.append("x-goog-api-key",n.apiKey);let r=(e=n.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(r){if(!(r instanceof Headers))try{r=new Headers(r)}catch(i){throw new er(`unable to convert customHeaders value ${JSON.stringify(r)} to Headers: ${i.message}`)}for(const[i,s]of r.entries()){if(i==="x-goog-api-key")throw new er(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new er(`Header name ${i} can only be set using the apiClient field`);t.append(i,s)}}return t}async function Hw(n,e,t,r,i,s){const a=new qw(n,e,t,r,s);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Yw(s)),{method:"POST",headers:await zw(a),body:i})}}async function ss(n,e,t,r,i,s={},a=fetch){const{url:l,fetchOptions:u}=await Hw(n,e,t,r,i,s);return Ww(l,u,a)}async function Ww(n,e,t=fetch){let r;try{r=await t(n,e)}catch(i){Kw(i,n)}return r.ok||await Qw(r,n),r}function Kw(n,e){let t=n;throw t.name==="AbortError"?(t=new rp(`Request aborted when fetching ${e.toString()}: ${n.message}`),t.stack=n.stack):n instanceof np||n instanceof er||(t=new Rt(`Error fetching from ${e.toString()}: ${n.message}`),t.stack=n.stack),t}async function Qw(n,e){let t="",r;try{const i=await n.json();t=i.error.message,i.error.details&&(t+=` ${JSON.stringify(i.error.details)}`,r=i.error.details)}catch{}throw new np(`Error fetching from ${e.toString()}: [${n.status} ${n.statusText}] ${t}`,n.status,n.statusText,r)}function Yw(n){const e={};if(n?.signal!==void 0||n?.timeout>=0){const t=new AbortController;n?.timeout>=0&&setTimeout(()=>t.abort(),n.timeout),n?.signal&&n.signal.addEventListener("abort",()=>{t.abort()}),e.signal=t.signal}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(n){return n.text=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Ls(n.candidates[0]))throw new Mr(`${qn(n)}`,n);return Jw(n)}else if(n.promptFeedback)throw new Mr(`Text not available. ${qn(n)}`,n);return""},n.functionCall=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Ls(n.candidates[0]))throw new Mr(`${qn(n)}`,n);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),uh(n)[0]}else if(n.promptFeedback)throw new Mr(`Function call not available. ${qn(n)}`,n)},n.functionCalls=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Ls(n.candidates[0]))throw new Mr(`${qn(n)}`,n);return uh(n)}else if(n.promptFeedback)throw new Mr(`Function call not available. ${qn(n)}`,n)},n}function Jw(n){var e,t,r,i;const s=[];if(!((t=(e=n.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const a of(i=(r=n.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)a.text&&s.push(a.text),a.executableCode&&s.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&s.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}function uh(n){var e,t,r,i;const s=[];if(!((t=(e=n.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const a of(i=(r=n.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)a.functionCall&&s.push(a.functionCall);if(s.length>0)return s}const Xw=[Si.RECITATION,Si.SAFETY,Si.LANGUAGE];function Ls(n){return!!n.finishReason&&Xw.includes(n.finishReason)}function qn(n){var e,t,r;let i="";if((!n.candidates||n.candidates.length===0)&&n.promptFeedback)i+="Response was blocked",!((e=n.promptFeedback)===null||e===void 0)&&e.blockReason&&(i+=` due to ${n.promptFeedback.blockReason}`),!((t=n.promptFeedback)===null||t===void 0)&&t.blockReasonMessage&&(i+=`: ${n.promptFeedback.blockReasonMessage}`);else if(!((r=n.candidates)===null||r===void 0)&&r[0]){const s=n.candidates[0];Ls(s)&&(i+=`Candidate was blocked due to ${s.finishReason}`,s.finishMessage&&(i+=`: ${s.finishMessage}`))}return i}function Fi(n){return this instanceof Fi?(this.v=n,this):new Fi(n)}function Zw(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(n,e||[]),i,s=[];return i={},a("next"),a("throw"),a("return"),i[Symbol.asyncIterator]=function(){return this},i;function a(_){r[_]&&(i[_]=function(x){return new Promise(function(C,S){s.push([_,x,C,S])>1||l(_,x)})})}function l(_,x){try{u(r[_](x))}catch(C){p(s[0][3],C)}}function u(_){_.value instanceof Fi?Promise.resolve(_.value.v).then(h,f):p(s[0][2],_)}function h(_){l("next",_)}function f(_){l("throw",_)}function p(_,x){_(x),s.shift(),s.length&&l(s[0][0],s[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function e0(n){const e=n.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),t=r0(e),[r,i]=t.tee();return{stream:n0(r),response:t0(i)}}async function t0(n){const e=[],t=n.getReader();for(;;){const{done:r,value:i}=await t.read();if(r)return Pl(i0(e));e.push(i)}}function n0(n){return Zw(this,arguments,function*(){const t=n.getReader();for(;;){const{value:r,done:i}=yield Fi(t.read());if(i)break;yield yield Fi(Pl(r))}})}function r0(n){const e=n.getReader();return new ReadableStream({start(r){let i="";return s();function s(){return e.read().then(({value:a,done:l})=>{if(l){if(i.trim()){r.error(new Rt("Failed to parse stream"));return}r.close();return}i+=a;let u=i.match(hh),h;for(;u;){try{h=JSON.parse(u[1])}catch{r.error(new Rt(`Error parsing JSON response: "${u[1]}"`));return}r.enqueue(h),i=i.substring(u[0].length),u=i.match(hh)}return s()}).catch(a=>{let l=a;throw l.stack=a.stack,l.name==="AbortError"?l=new rp("Request aborted when reading from the stream"):l=new Rt("Error reading from the stream"),l})}}})}function i0(n){const e=n[n.length-1],t={promptFeedback:e?.promptFeedback};for(const r of n){if(r.candidates){let i=0;for(const s of r.candidates)if(t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:i}),t.candidates[i].citationMetadata=s.citationMetadata,t.candidates[i].groundingMetadata=s.groundingMetadata,t.candidates[i].finishReason=s.finishReason,t.candidates[i].finishMessage=s.finishMessage,t.candidates[i].safetyRatings=s.safetyRatings,s.content&&s.content.parts){t.candidates[i].content||(t.candidates[i].content={role:s.content.role||"user",parts:[]});const a={};for(const l of s.content.parts)l.text&&(a.text=l.text),l.functionCall&&(a.functionCall=l.functionCall),l.executableCode&&(a.executableCode=l.executableCode),l.codeExecutionResult&&(a.codeExecutionResult=l.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),t.candidates[i].content.parts.push(a)}i++}r.usageMetadata&&(t.usageMetadata=r.usageMetadata)}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ip(n,e,t,r){const i=await ss(e,Rr.STREAM_GENERATE_CONTENT,n,!0,JSON.stringify(t),r);return e0(i)}async function sp(n,e,t,r){const s=await(await ss(e,Rr.GENERATE_CONTENT,n,!1,JSON.stringify(t),r)).json();return{response:Pl(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(n){if(n!=null){if(typeof n=="string")return{role:"system",parts:[{text:n}]};if(n.text)return{role:"system",parts:[n]};if(n.parts)return n.role?n:{role:"system",parts:n.parts}}}function Ui(n){let e=[];if(typeof n=="string")e=[{text:n}];else for(const t of n)typeof t=="string"?e.push({text:t}):e.push(t);return s0(e)}function s0(n){const e={role:"user",parts:[]},t={role:"function",parts:[]};let r=!1,i=!1;for(const s of n)"functionResponse"in s?(t.parts.push(s),i=!0):(e.parts.push(s),r=!0);if(r&&i)throw new Rt("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!r&&!i)throw new Rt("No content is provided for sending chat message.");return r?e:t}function o0(n,e){var t;let r={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(t=e?.cachedContent)===null||t===void 0?void 0:t.name,contents:[]};const i=n.generateContentRequest!=null;if(n.contents){if(i)throw new er("CountTokensRequest must have one of contents or generateContentRequest, not both.");r.contents=n.contents}else if(i)r=Object.assign(Object.assign({},r),n.generateContentRequest);else{const s=Ui(n);r.contents=[s]}return{generateContentRequest:r}}function dh(n){let e;return n.contents?e=n:e={contents:[Ui(n)]},n.systemInstruction&&(e.systemInstruction=op(n.systemInstruction)),e}function a0(n){return typeof n=="string"||Array.isArray(n)?{content:Ui(n)}:n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],l0={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function c0(n){let e=!1;for(const t of n){const{role:r,parts:i}=t;if(!e&&r!=="user")throw new Rt(`First content should be with role 'user', got ${r}`);if(!nh.includes(r))throw new Rt(`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(nh)}`);if(!Array.isArray(i))throw new Rt("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new Rt("Each Content should have at least one part");const s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const l of i)for(const u of fh)u in l&&(s[u]+=1);const a=l0[r];for(const l of fh)if(!a.includes(l)&&s[l]>0)throw new Rt(`Content with role '${r}' can't contain '${l}' part`);e=!0}}function ph(n){var e;if(n.candidates===void 0||n.candidates.length===0)return!1;const t=(e=n.candidates[0])===null||e===void 0?void 0:e.content;if(t===void 0||t.parts===void 0||t.parts.length===0)return!1;for(const r of t.parts)if(r===void 0||Object.keys(r).length===0||r.text!==void 0&&r.text==="")return!1;return!0}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="SILENT_ERROR";class u0{constructor(e,t,r,i={}){this.model=t,this.params=r,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,r?.history&&(c0(r.history),this._history=r.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var r,i,s,a,l,u;await this._sendPromise;const h=Ui(e),f={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,h]},p=Object.assign(Object.assign({},this._requestOptions),t);let _;return this._sendPromise=this._sendPromise.then(()=>sp(this._apiKey,this.model,f,p)).then(x=>{var C;if(ph(x.response)){this._history.push(h);const S=Object.assign({parts:[],role:"model"},(C=x.response.candidates)===null||C===void 0?void 0:C[0].content);this._history.push(S)}else{const S=qn(x.response);S&&console.warn(`sendMessage() was unsuccessful. ${S}. Inspect response object for details.`)}_=x}).catch(x=>{throw this._sendPromise=Promise.resolve(),x}),await this._sendPromise,_}async sendMessageStream(e,t={}){var r,i,s,a,l,u;await this._sendPromise;const h=Ui(e),f={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,h]},p=Object.assign(Object.assign({},this._requestOptions),t),_=ip(this._apiKey,this.model,f,p);return this._sendPromise=this._sendPromise.then(()=>_).catch(x=>{throw new Error(gh)}).then(x=>x.response).then(x=>{if(ph(x)){this._history.push(h);const C=Object.assign({},x.candidates[0].content);C.role||(C.role="model"),this._history.push(C)}else{const C=qn(x);C&&console.warn(`sendMessageStream() was unsuccessful. ${C}. Inspect response object for details.`)}}).catch(x=>{x.message!==gh&&console.error(x)}),_}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h0(n,e,t,r){return(await ss(e,Rr.COUNT_TOKENS,n,!1,JSON.stringify(t),r)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d0(n,e,t,r){return(await ss(e,Rr.EMBED_CONTENT,n,!1,JSON.stringify(t),r)).json()}async function f0(n,e,t,r){const i=t.requests.map(a=>Object.assign(Object.assign({},a),{model:e}));return(await ss(e,Rr.BATCH_EMBED_CONTENTS,n,!1,JSON.stringify({requests:i}),r)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,t,r={}){this.apiKey=e,this._requestOptions=r,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=op(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var r;const i=dh(e),s=Object.assign(Object.assign({},this._requestOptions),t);return sp(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}async generateContentStream(e,t={}){var r;const i=dh(e),s=Object.assign(Object.assign({},this._requestOptions),t);return ip(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}startChat(e){var t;return new u0(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(t=this.cachedContent)===null||t===void 0?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){const r=o0(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),t);return h0(this.apiKey,this.model,r,i)}async embedContent(e,t={}){const r=a0(e),i=Object.assign(Object.assign({},this._requestOptions),t);return d0(this.apiKey,this.model,r,i)}async batchEmbedContents(e,t={}){const r=Object.assign(Object.assign({},this._requestOptions),t);return f0(this.apiKey,this.model,e,r)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new Rt("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new mh(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,r){if(!e.name)throw new er("Cached content must contain a `name` field.");if(!e.model)throw new er("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const a of i)if(t?.[a]&&e[a]&&t?.[a]!==e[a]){if(a==="model"){const l=t.model.startsWith("models/")?t.model.replace("models/",""):t.model,u=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(l===u)continue}throw new er(`Different value for "${a}" specified in modelParams (${t[a]}) and cachedContent (${e[a]})`)}const s=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new mh(this.apiKey,s,r)}}const g0={apiKey:"AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",authDomain:"watchlist-bcdfd.firebaseapp.com",projectId:"watchlist-bcdfd",storageBucket:"watchlist-bcdfd.firebasestorage.app",messagingSenderId:"479628005507",appId:"1:479628005507:web:12e0aa5b98977c82860bb6"},ap=Fh(g0),rt=by(ap),ia=Vw(ap),m0=new p0(void 0),_0=m0.getGenerativeModel({model:"gemini-1.5-flash-latest"});var v0=D("<span>"),y0=D('<div class="grid grid-cols-[100px_1fr] items-center py-1"><span class="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"> </span><div class="text-sm font-bold text-gray-200">');const Kt=["415186758","b41cc5f8","c0ea969f6","d6c165"].join(""),b0="2a444b24",Sn=n=>{if(!n)return null;const e=n.toLowerCase();return e.includes("netflix")?"Netflix":e.includes("prime")||e.includes("amazon")?"Amazon Prime Video":e.includes("hotstar")||e.includes("jio")||e.includes("disney")?"JioHotstar":e.includes("sony")||e.includes("liv")?"Sony LIV":e.includes("zee")?"Zee5":e.includes("apple")?"Apple TV":e.includes("crunchyroll")?"Crunchyroll":n.trim()},Hr=n=>n?.genresList||(typeof n?.genres=="string"?n.genres.split(","):[])||[],ji=n=>[...new Set((n?.platformsList||[]).map(Sn).filter(Boolean))],Nl=n=>{if(!n||n<=0)return null;const e=Math.floor(n/60),t=n%60;return e>0?`${e}h ${t>0?t+"m":""}`:`${t}m`},G=n=>(()=>{var e=v0();return g(e,()=>n.name),X(()=>Te(e,`material-symbols-outlined ${n.fill?"filled":""} ${n.class||""}`)),e})(),un=n=>(()=>{var e=y0(),t=e.firstChild,r=t.firstChild,i=t.nextSibling;return g(t,E(G,{get name(){return n.icon},class:"text-[14px]"}),r),g(t,()=>n.label,null),g(i,()=>n.value),e})();var w0=D('<div class="h-screen w-full flex items-center justify-center bg-[#08090b] overflow-hidden relative"><div class="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse pointer-events-none"style=animation-duration:4s></div><div class="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-[var(--secondary)]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"style=animation-duration:5s;animation-delay:1s></div><div class="absolute inset-0 pointer-events-none opacity-20"style="background-image:radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);background-size:24px 24px"></div><div class="absolute inset-0 bg-gradient-to-b from-[#08090b]/40 via-transparent to-[#08090b]/80 pointer-events-none"></div><div class="relative z-20 flex flex-col items-center animate-pop-in"><div class="relative mb-10"><h1 class="text-6xl md:text-8xl font-black font-headline text-transparent bg-clip-text bg-gradient-to-br from-white via-[var(--primary)] to-[var(--secondary)] tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">CINELOG</h1></div><div class="flex flex-col items-center gap-4 w-64"><div class="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-inner relative border border-white/5"><div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent skeleton-bg opacity-80"></div></div><div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"><span>Syncing Universe');function E0(){return(()=>{var n=w0(),e=n.firstChild,t=e.nextSibling,r=t.nextSibling,i=r.nextSibling,s=i.nextSibling,a=s.firstChild,l=a.nextSibling,u=l.firstChild,h=u.nextSibling,f=h.firstChild;return g(h,E(G,{name:"radar",class:"text-[12px] animate-spin text-[var(--primary)] drop-shadow-[0_0_8px_var(--primary)]"}),f),n})()}var x0=D('<span class="material-symbols-outlined filled text-[var(--primary)]"style=font-size:20px>auto_awesome'),I0=D('<div class="flex items-center gap-4 glass-surface rounded-2xl px-5 py-4 border border-white/5 hover:border-[var(--primary)]/30 transition-all group animate-pop-in"><div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--secondary)]/20 to-[var(--primary)]/20 flex items-center justify-center shrink-0 border border-[var(--primary)]/20 group-hover:scale-110 transition-transform"><span class="text-xs font-black font-headline text-[var(--primary)]"></span></div><p class="text-sm font-bold text-white leading-snug"></p><span class="material-symbols-outlined text-gray-700 group-hover:text-[var(--primary)] transition-colors ml-auto text-[18px]">chevron_right'),T0=D('<div class="glass-surface rounded-2xl px-5 py-4 flex items-center gap-4"><div class="w-9 h-9 rounded-xl skeleton-bg shrink-0"></div><div class="flex-1 h-4 rounded-lg skeleton-bg">'),A0=D('<span class="tag-chip text-[var(--primary)]"> watched'),S0=D('<p class="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest pt-1 animate-pulse">Gemini soch raha hai…'),C0=D('<div class="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4"><span class="material-symbols-outlined text-red-400 text-[20px] shrink-0 mt-0.5">error_outline</span><p class="text-sm text-red-300 font-medium leading-snug">'),R0=D('<div class="flex flex-col gap-3 mb-5">'),k0=D('<div class="glass-surface rounded-[2rem] p-6 border border-white/5 relative overflow-hidden"><div class="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"style="background:radial-gradient(circle, var(--primary), transparent)"></div><div class="flex items-center justify-between mb-5"><div class="flex items-center gap-2.5"><div><h3 class="text-base font-black font-headline text-white leading-none">AI Picks</h3><p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Powered by Gemini</p></div></div></div><button></button><p class="text-center text-[9px] text-gray-700 mt-3 font-bold uppercase tracking-widest"> completed title<!> ke basis pe'),$0=D('<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity');const P0=n=>n.title||n.name||"Unknown Title",N0=n=>n.split(`
`).map(e=>e.trim().replace(/^[\d]+[.)]\s*/,"").replace(/^[-*•]\s*/,"").trim()).filter(Boolean).slice(0,3),_h=()=>x0(),D0=n=>(()=>{var e=I0(),t=e.firstChild,r=t.firstChild,i=t.nextSibling;return g(r,()=>n.index),g(i,()=>n.title),e})(),V0=()=>T0();function O0(n){const[e,t]=Y([]),[r,i]=Y(!1),[s,a]=Y(""),[l,u]=Y(!1),h=Ve(()=>(n.watchlist?.()??[]).filter(p=>p.status==="Completed").map(P0)),f=async()=>{const p=h();if(p.length===0){a('Pehle kuch movies "Completed" mark karo — Gemini ko dekhna hoga kya pasand hai!'),u(!0);return}i(!0),a(""),t([]),u(!0);try{const _=`Based on these movies/shows I have watched:
`+p.map((T,N)=>`${N+1}. ${T}`).join(`
`)+`

Recommend 3 new movies or shows I would love. Return ONLY the titles, one per line, with no extra explanation or numbering.`,C=(await _0.generateContent(_)).response.text(),S=N0(C);if(S.length===0)throw new Error("Unexpected format");t(S)}catch(_){console.error("[AIRecommend]",_),_?.message?.includes("API_KEY")?a("API key missing. Add VITE_GEMINI_API_KEY in Netlify environment variables."):_?.message?.includes("quota")||_?.status===429?a("API quota reached. Try again in a minute."):a("Gemini se response nahi aaya. Dobara try karo.")}finally{i(!1)}};return(()=>{var p=k0(),_=p.firstChild,x=_.nextSibling,C=x.firstChild,S=C.firstChild,T=x.nextSibling,N=T.nextSibling,R=N.firstChild,$=R.nextSibling;return $.nextSibling,g(C,E(_h,{}),S),g(x,E(B,{get when(){return h().length>0},get children(){var O=A0(),F=O.firstChild;return g(O,()=>h().length,F),O}}),null),g(p,E(B,{get when(){return l()},get children(){var O=R0();return g(O,E(B,{get when(){return r()},get children(){return[E(Qe,{each:[1,2,3],children:()=>E(V0,{})}),S0()]}}),null),g(O,E(B,{get when(){return Ze(()=>!r())()&&s()},get children(){var F=C0(),q=F.firstChild,w=q.nextSibling;return g(w,s),F}}),null),g(O,E(B,{get when(){return Ze(()=>!r())()&&e().length>0},get children(){return E(Qe,{get each(){return e()},children:(F,q)=>E(D0,{title:F,get index(){return q()+1}})})}}),null),O}}),T),T.$$click=f,g(T,E(B,{get when(){return!r()},get fallback(){return[$0()," Gemini se pooch raha hai…"]},get children(){return[E(_h,{}),Ze(()=>l()&&e().length>0?"Naye Picks Lao":"AI Recommendations Lo")]}})),g(N,()=>h().length,R),g(N,()=>h().length!==1?"s":"",$),X(O=>{var F=r(),q=`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95
          ${r()?"bg-white/5 text-gray-600 cursor-not-allowed":"bg-gradient-to-r from-[var(--secondary)]/80 to-[var(--primary)]/80 text-[#0c0e14] hover:brightness-110 shadow-lg shadow-[var(--primary)]/20"}`;return F!==O.e&&(T.disabled=O.e=F),q!==O.t&&Te(T,O.t=q),O},{e:void 0,t:void 0}),p})()}zt(["click"]);var M0=D('<div class=mood-bar><div class=mood-label>ACTION //</div><div class="mood-chip sel">🎲 Random Pick</div><div class=mood-chip>✚ Add New</div><div class=mood-chip>👀 Watching</div><div class=mood-chip>📌 Planned'),L0=D("<div class=hero><div class=hero-img></div><div class=hero-body><div class=hero-eyebrow><div class=hero-dot></div><div class=hero-eyebrow-text></div></div><h1 class=hero-title></h1><div class=hero-meta><div class=hero-meta-item><span>★</span> <span class=rating-val></span></div><div class=hero-meta-sep>/</div><div class=hero-meta-item></div><div class=hero-meta-sep>/</div><div class=hero-meta-item> MIN</div></div><div class=hero-actions><button class=btn-solid>▶ PLAY NOW</button><button class=btn-ghost>✚ VAULT INFO"),F0=D("<div class=section><div class=section-head><div class=section-name>Recently Added</div><div class=section-action>VIEW ALL →</div></div><div class=movie-row>"),U0=D("<div class=section>"),j0=D("<div class=section><div class=section-head><div class=section-name>Your Top Rated</div><div class=section-action>SEE MORE →</div></div><div class=movie-row>"),B0=D("<div class=section><div class=section-head><div class=section-name style=text-transform:uppercase>"),q0=D('<div class=neural-root><div id=cursor></div><div id=cursor-ring></div><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div><header><div class=logo-wrap><div class=logo-mark><svg viewBox="0 0 32 32"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 2L2 9L16 16L30 9L16 2Z"fill=#c8f135></path><path d="M2 23L16 30L30 23V9L16 16L2 9V23Z"fill=#c8f135 fill-opacity=0.3></path></svg></div><div class=logo-text>CINE<span>LOG</span><span class=logo-version>v4.0</span></div></div><div class=header-center><div>DASHBOARD</div><div>VAULT</div><div>LISTS</div><div>SOON</div></div><div class=header-right><div class=status-pill><div class=status-dot></div>NEURAL_LINK</div><img class=avatar></div></header><div class=layout><aside class=sidebar><div class=sidebar-label>Interface</div><div><span class=side-icon>⌂</span> Home</div><div><span class=side-icon>◈</span> Vault<span class=side-badge></span></div><div><span class=side-icon>≡</span> Lists</div><div><span class=side-icon>◷</span> Soon<span class="side-badge hot">HOT</span></div><div class=sidebar-label>System</div><div class=side-item><span class=side-icon>⚙</span> Settings</div><div class=side-item><span class=side-icon>✦</span> Insights</div><div class=sidebar-footer><div class=sf-label>DATA_INTEGRITY</div><div class=sf-bar-wrap><div class=sf-bar><div class=sf-bar-top><span>Storage</span><span> %</span></div><div class=sf-bar-track><div class=sf-bar-fill style=background:var(--pulse)></div></div></div></div></div></aside><main class=content></main><aside class=right-panel><div class=stats-grid><div class=stat-mini><div class=stat-mini-val style=color:var(--pulse)></div><div class=stat-mini-lbl>WATCHED</div></div><div class=stat-mini><div class=stat-mini-val></div><div class=stat-mini-lbl>HOURS</div></div><div class=stat-mini><div class=stat-mini-val style=color:var(--ember)></div><div class=stat-mini-lbl>WATCHLIST</div></div><div class=stat-mini><div class=stat-mini-val style=color:var(--frost)></div><div class=stat-mini-lbl>TOTAL</div></div></div><div class=receipt-teaser><div class=rt-title>Watchlist Receipt</div><div class=rt-sub>Generate your shareable cinema year in review</div><div class=rt-tag>NEW FEATURE</div></div><div class=activity-block><div class=activity-title>RECENT ACTIVITY</div></div></aside></div><div class=bottom-nav><div><div class=bnav-ico>⌂</div>HOME</div><div><div class=bnav-ico>◈</div>VAULT</div><div><div class=bnav-ico>≡</div>LISTS</div><div><div class=bnav-ico>◷</div>SOON</div></div><button class=fab-mobile>+'),vh=D("<div class=mcard><div class=mcard-img><img><div class=mcard-badge><span></span><span class=mcard-rating>★ </span></div></div><div class=mcard-title></div><div class=mcard-year>"),G0=D(`<div class=act-item><img class=act-img alt><div class=act-body><div class=act-name></div><div class=act-time>Recently Added</div></div><span style="font-family:'DM Mono',monospace;font-size:8px;padding:2px 7px;border-radius:5px">`);const z0=n=>{const[e,t]=Y(0),[r,i]=Y(0),[s,a]=Y(0),[l,u]=Y(0);let h,f;on(()=>{const R=O=>{t(O.clientX),i(O.clientY),h&&(h.style.left=`${O.clientX}px`,h.style.top=`${O.clientY}px`)};document.addEventListener("mousemove",R);const $=()=>{a(O=>O+(e()-O)*.12),u(O=>O+(r()-O)*.12),f&&(f.style.left=`${s()}px`,f.style.top=`${l()}px`),requestAnimationFrame($)};return $(),()=>document.removeEventListener("mousemove",R)});const p=()=>{h&&f&&(h.style.width="14px",h.style.height="14px",f.style.width="48px",f.style.height="48px",f.style.borderColor="rgba(200,241,53,0.6)")},_=()=>{h&&f&&(h.style.width="8px",h.style.height="8px",f.style.width="32px",f.style.height="32px",f.style.borderColor="rgba(200,241,53,0.4)")},x=Ve(()=>{const R=n.watchlist();return{total:R.length,completed:R.filter($=>$.status==="Completed").length,watching:R.filter($=>$.status==="Watching").length,planned:R.filter($=>$.status==="Planned"||$.status==="Plan to Watch").length,hours:Math.floor(R.filter($=>$.status==="Completed").reduce(($,O)=>$+(parseInt(O.runtime)||0),0)/60)}}),C=Ve(()=>n.watchlist().slice(0,3)),S=Ve(()=>[...n.watchlist()].sort((R,$)=>(parseFloat($.imdbRating)||0)-(parseFloat(R.imdbRating)||0)).slice(0,4)),T=Ve(()=>{const R=n.watchlist().filter($=>$.status==="Watching");return R.length>0?R[0]:n.watchlist()[0]}),N=()=>{const R=n.watchlist().filter($=>$.status==="Planned"||$.status==="Plan to Watch");R.length?(n.showToast("🎲 Picking random title..."),setTimeout(()=>n.openMovie(R[Math.floor(Math.random()*R.length)].id),500)):alert("Planned list is empty!")};return(()=>{var R=q0(),$=R.firstChild,O=$.nextSibling,F=O.nextSibling,q=F.nextSibling,w=q.nextSibling,v=w.nextSibling,y=v.firstChild,I=y.nextSibling,A=I.firstChild,k=A.nextSibling,b=k.nextSibling,oe=b.nextSibling,Z=I.nextSibling,M=Z.firstChild,z=M.nextSibling,j=v.nextSibling,H=j.firstChild,ee=H.firstChild,Ae=ee.nextSibling,ae=Ae.nextSibling,de=ae.firstChild,pe=de.nextSibling,ce=pe.nextSibling,Ue=ae.nextSibling,xe=Ue.nextSibling,ne=xe.nextSibling,Oe=ne.nextSibling,ke=Oe.nextSibling,Pe=ke.nextSibling,Ge=Pe.firstChild,Ot=Ge.nextSibling,wt=Ot.firstChild,Pt=wt.firstChild,Ft=Pt.firstChild,Ut=Ft.nextSibling,yn=Ut.firstChild,On=Pt.nextSibling,_e=On.firstChild,Et=H.nextSibling,Mn=Et.nextSibling,Qt=Mn.firstChild,et=Qt.firstChild,ue=et.firstChild,ie=et.nextSibling,me=ie.firstChild,ye=ie.nextSibling,Ne=ye.firstChild,De=ye.nextSibling,ht=De.firstChild,Ce=Qt.nextSibling,gt=Ce.nextSibling;gt.firstChild;var jt=j.nextSibling,Ht=jt.firstChild,hr=Ht.nextSibling,Ln=hr.nextSibling,bn=Ln.nextSibling,Pr=jt.nextSibling;R.$$mousemove=J=>{J.target.closest("button, .mcard, .tab, .side-item, .ai-pick, .receipt-teaser, .hero, .stat-mini, .mood-chip")?p():_()};var dr=h;typeof dr=="function"?sa(dr,$):h=$;var Yt=f;return typeof Yt=="function"?sa(Yt,O):f=O,A.$$click=()=>n.setView("dashboard"),k.$$click=()=>n.setView("watchlist"),b.$$click=()=>n.setView("franchises"),oe.$$click=()=>n.setView("upcoming"),Be(z,"click",n.onUserClick),Ae.$$click=()=>n.setView("dashboard"),ae.$$click=()=>n.setView("watchlist"),g(ce,()=>x().total),Ue.$$click=()=>n.setView("franchises"),xe.$$click=()=>n.setView("upcoming"),Be(Oe,"click",n.onSettingsClick),Be(ke,"click",n.onStatsClick),g(Ut,()=>Math.min(100,Math.floor(x().total/10)),yn),g(Et,E(B,{get when(){return n.view()==="dashboard"},get children(){return[(()=>{var J=M0(),je=J.firstChild,Me=je.nextSibling,st=Me.nextSibling,tt=st.nextSibling,ge=tt.nextSibling;return Me.$$click=N,Be(st,"click",n.onSearchClick),tt.$$click=()=>{n.setActiveVaultStatus("Watching"),n.setView("watchlist")},ge.$$click=()=>{n.setActiveVaultStatus("Planned"),n.setView("watchlist")},J})(),E(B,{get when(){return T()},get children(){var J=L0(),je=J.firstChild,Me=je.nextSibling,st=Me.firstChild,tt=st.firstChild,ge=tt.nextSibling,re=st.nextSibling,We=re.nextSibling,be=We.firstChild,mt=be.firstChild,Ye=mt.nextSibling,ft=Ye.nextSibling,Nt=be.nextSibling,Dt=Nt.nextSibling,Re=Dt.nextSibling,ln=Re.nextSibling,wn=ln.firstChild;return J.$$click=()=>n.openMovie(T().id),g(ge,()=>T().status==="Watching"?"CONTINUE WATCHING":"FEATURED FROM VAULT"),g(re,()=>T().title||T().name),g(ft,()=>T().imdbRating||"N/A"),g(Dt,()=>T().release_date?.split("-")[0]),g(ln,()=>T().runtime,wn),X(Jt=>en(je,"background",`linear-gradient(to right, rgba(4,6,10,0.97) 35%, rgba(4,6,10,0.5) 70%, rgba(4,6,10,0.2) 100%), url('https://image.tmdb.org/t/p/original${T().backdrop_path}') center/cover`)),J}}),(()=>{var J=F0(),je=J.firstChild,Me=je.firstChild,st=Me.nextSibling,tt=je.nextSibling;return st.$$click=()=>{n.setActiveVaultStatus("all"),n.setView("watchlist")},g(tt,E(Qe,{get each(){return n.watchlist().slice(0,8)},children:ge=>(()=>{var re=vh(),We=re.firstChild,be=We.firstChild,mt=be.nextSibling,Ye=mt.firstChild,ft=Ye.nextSibling;ft.firstChild;var Nt=We.nextSibling,Dt=Nt.nextSibling;return re.$$click=()=>n.openMovie(ge.id),g(Ye,(()=>{var Re=Ze(()=>ge.status==="Completed");return()=>Re()?"DONE":ge.status==="Watching"?"WATCHING":"PLANNED"})()),g(ft,()=>ge.imdbRating||"N/A",null),g(Nt,()=>ge.title||ge.name),g(Dt,()=>ge.release_date?.split("-")[0]),X(Re=>{var ln=`https://image.tmdb.org/t/p/w300${ge.poster_path}`,wn=ge.title||ge.name,Jt=`mbadge ${ge.status==="Completed"?"mbadge-done":ge.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`;return ln!==Re.e&&Fe(be,"src",Re.e=ln),wn!==Re.t&&Fe(be,"alt",Re.t=wn),Jt!==Re.a&&Te(Ye,Re.a=Jt),Re},{e:void 0,t:void 0,a:void 0}),re})()})),J})(),(()=>{var J=U0();return g(J,E(O0,{get watchlist(){return n.watchlist}})),J})(),(()=>{var J=j0(),je=J.firstChild,Me=je.firstChild,st=Me.nextSibling,tt=je.nextSibling;return st.$$click=()=>{n.setActiveVaultStatus("all"),n.setView("watchlist")},g(tt,E(Qe,{get each(){return S()},children:ge=>(()=>{var re=vh(),We=re.firstChild,be=We.firstChild,mt=be.nextSibling,Ye=mt.firstChild,ft=Ye.nextSibling;ft.firstChild;var Nt=We.nextSibling,Dt=Nt.nextSibling;return re.$$click=()=>n.openMovie(ge.id),g(Ye,(()=>{var Re=Ze(()=>ge.status==="Completed");return()=>Re()?"DONE":ge.status==="Watching"?"WATCHING":"PLANNED"})()),g(ft,()=>ge.imdbRating||"N/A",null),g(Nt,()=>ge.title||ge.name),g(Dt,()=>ge.release_date?.split("-")[0]),X(Re=>{var ln=`https://image.tmdb.org/t/p/w300${ge.poster_path}`,wn=ge.title||ge.name,Jt=`mbadge ${ge.status==="Completed"?"mbadge-done":ge.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`;return ln!==Re.e&&Fe(be,"src",Re.e=ln),wn!==Re.t&&Fe(be,"alt",Re.t=wn),Jt!==Re.a&&Te(Ye,Re.a=Jt),Re},{e:void 0,t:void 0,a:void 0}),re})()})),J})()]}}),null),g(Et,E(B,{get when(){return n.view()!=="dashboard"},get children(){var J=B0(),je=J.firstChild,Me=je.firstChild;return g(Me,()=>n.view()),g(J,()=>n.children,null),J}}),null),et.$$click=()=>{n.setActiveVaultStatus("Completed"),n.setView("watchlist")},g(ue,()=>x().completed),Be(ie,"click",n.onStatsClick),g(me,()=>x().hours),ye.$$click=()=>{n.setActiveVaultStatus("Planned"),n.setView("watchlist")},g(Ne,()=>x().planned),De.$$click=()=>{n.setActiveVaultStatus("all"),n.setView("watchlist")},g(ht,()=>x().total),Be(Ce,"click",n.onStatsClick),g(gt,E(Qe,{get each(){return C()},children:J=>(()=>{var je=G0(),Me=je.firstChild,st=Me.nextSibling,tt=st.firstChild,ge=st.nextSibling;return je.$$click=()=>n.openMovie(J.id),g(tt,()=>J.title||J.name),g(ge,()=>J.status==="Completed"?"DONE":"SAVED"),X(re=>{var We=`https://image.tmdb.org/t/p/w92${J.poster_path}`,be=`act-badge ${J.status==="Completed"?"mbadge-done":J.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`,mt=J.status==="Completed"?"rgba(200,241,53,0.12)":"rgba(142,184,255,0.15)",Ye=J.status==="Completed"?"var(--pulse)":"var(--frost)";return We!==re.e&&Fe(Me,"src",re.e=We),be!==re.t&&Te(ge,re.t=be),mt!==re.a&&en(ge,"background",re.a=mt),Ye!==re.o&&en(ge,"color",re.o=Ye),re},{e:void 0,t:void 0,a:void 0,o:void 0}),je})()}),null),Ht.$$click=()=>n.setView("dashboard"),hr.$$click=()=>n.setView("watchlist"),Ln.$$click=()=>n.setView("franchises"),bn.$$click=()=>n.setView("upcoming"),Be(Pr,"click",n.onSearchClick),X(J=>{var je=`tab ${n.view()==="dashboard"?"active":""}`,Me=`tab ${n.view()==="watchlist"?"active":""}`,st=`tab ${n.view()==="franchises"?"active":""}`,tt=`tab ${n.view()==="upcoming"?"active":""}`,ge=n.user().photoURL,re=`side-item ${n.view()==="dashboard"?"active":""}`,We=`side-item ${n.view()==="watchlist"?"active":""}`,be=`side-item ${n.view()==="franchises"?"active":""}`,mt=`side-item ${n.view()==="upcoming"?"active":""}`,Ye=`${Math.min(100,Math.floor(x().total/10))}%`,ft=`bnav ${n.view()==="dashboard"?"active":""}`,Nt=`bnav ${n.view()==="watchlist"?"active":""}`,Dt=`bnav ${n.view()==="franchises"?"active":""}`,Re=`bnav ${n.view()==="upcoming"?"active":""}`;return je!==J.e&&Te(A,J.e=je),Me!==J.t&&Te(k,J.t=Me),st!==J.a&&Te(b,J.a=st),tt!==J.o&&Te(oe,J.o=tt),ge!==J.i&&Fe(z,"src",J.i=ge),re!==J.n&&Te(Ae,J.n=re),We!==J.s&&Te(ae,J.s=We),be!==J.h&&Te(Ue,J.h=be),mt!==J.r&&Te(xe,J.r=mt),Ye!==J.d&&en(_e,"width",J.d=Ye),ft!==J.l&&Te(Ht,J.l=ft),Nt!==J.u&&Te(hr,J.u=Nt),Dt!==J.c&&Te(Ln,J.c=Dt),Re!==J.w&&Te(bn,J.w=Re),J},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0}),R})()};zt(["mousemove","click"]);var H0=D('<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"loading=lazy>',!0,!1,!1),W0=D('<div class="absolute top-2 right-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-wider shadow-lg max-w-[60px] truncate">'),K0=D('<div class="group cursor-pointer animate-pop-in relative"><div class="aspect-[2/3] rounded-3xl overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-300 border border-white/10 group-hover:border-[var(--primary)]/50 bg-[#171921]"><div class="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none"></div><div class="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-[var(--primary)] uppercase tracking-wider"></div><div class="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-end"><h4 class="text-xs font-black truncate text-white drop-shadow-md mb-1 leading-tight"></h4><p class="text-[9px] text-gray-300 font-bold mb-1 flex items-center gap-1 drop-shadow-md whitespace-nowrap overflow-hidden"> • <!> </p><div class="grid grid-cols-3 gap-1 mt-1 w-full"><span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-[#f5c518] flex items-center justify-center gap-0.5 shadow-sm truncate"> </span><span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-red-500 flex items-center justify-center gap-0.5 shadow-sm truncate">🍅 </span><span class="text-[8px] py-1 rounded-md bg-[var(--primary)]/20 border border-[var(--primary)]/20 font-black text-[var(--primary)] flex items-center justify-center gap-0.5 shadow-sm truncate"> '),Q0=D('<div class="w-full h-full flex items-center justify-center skeleton-bg">');const Y0=n=>(()=>{var e=K0(),t=e.firstChild,r=t.firstChild,i=r.nextSibling,s=i.nextSibling,a=s.firstChild,l=a.nextSibling,u=l.firstChild,h=u.nextSibling;h.nextSibling;var f=l.nextSibling,p=f.firstChild,_=p.firstChild,x=p.nextSibling;x.firstChild;var C=x.nextSibling,S=C.firstChild;return Be(e,"click",n.onClick),g(t,E(B,{get when(){return n.movie.poster_path},get fallback(){return(()=>{var T=Q0();return g(T,E(G,{name:"movie",class:"text-4xl text-gray-600"})),T})()},get children(){var T=H0();return X(()=>Fe(T,"src",`https://image.tmdb.org/t/p/w500${n.movie.poster_path}`)),T}}),r),g(i,(()=>{var T=Ze(()=>n.movie.status==="Plan to Watch");return()=>T()?"Planned":n.movie.status||"NEW"})()),g(t,E(B,{get when(){return n.movie.tag},get children(){var T=W0();return g(T,()=>n.movie.tag),T}}),s),g(a,()=>n.movie.title||n.movie.name),g(l,()=>(n.movie.release_date||"").split("-")[0]||"N/A",u),g(l,()=>n.movie.media_type==="tv"?"Series":"Movie",h),g(l,E(B,{get when(){return n.movie.runtime>0},get children(){return["• ",Ze(()=>Nl(n.movie.runtime))]}}),null),g(p,E(G,{name:"star",class:"text-[10px]",fill:!0}),_),g(p,()=>n.movie.imdbRating||"-",null),g(x,()=>n.movie.rtRating||"-",null),g(C,E(G,{name:"person",class:"text-[10px]",fill:!0}),S),g(C,()=>n.movie.rating||"-",null),e})();zt(["click"]);zt(["click"]);var J0=D('<button class="text-[9px] text-white bg-red-500/20 border border-red-500/50 hover:bg-red-500 px-3 py-1.5 rounded-full font-black uppercase tracking-widest active:scale-95 transition-all shrink-0">Clear'),X0=D('<div class="text-center p-12 text-gray-500 opacity-50"><p class="font-bold text-sm">No titles match your filters.'),Z0=D('<div class="animate-fade-in pb-10"><div class="sticky top-0 z-40 bg-[#08090b]/80 backdrop-blur-2xl pt-4 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 border-b border-white/5 mb-6"><div class="flex justify-between items-center mb-5"><h2 class="text-3xl font-headline font-black drop-shadow-md">Vault</h2><button class="glass-surface px-4 py-2.5 rounded-full text-xs font-bold flex gap-2 border border-white/10 hover:bg-white/10 active:scale-95 transition-all shadow-lg"> Filter </button></div><div class="relative group animate-pop-in"><div class="flex items-center gap-3 glass-surface rounded-2xl px-5 py-4 relative border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors shadow-xl"><input placeholder="Search movies, series, or actors..."class="bg-transparent border-none w-full outline-none text-white text-sm font-medium placeholder-gray-600"></div></div></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-4">'),eE=D('<span class="bg-[var(--primary)] text-[#0c0e14] px-2 py-0.5 rounded-full text-[10px]">'),tE=D('<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 z-[999999] animate-fade-in"><div class="glass-surface w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 pb-32 sm:p-8 border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform transition-transform animate-pop-in bg-[#08090b]/95"><div class="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden"></div><div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-xl text-white flex items-center gap-2"> Filters</h3><button class="bg-white/5 p-2 rounded-full active:scale-95 transition-all"></button></div><div class="space-y-4 max-h-[50vh] overflow-y-auto pr-2 hide-scrollbar"></div><button class="w-full mt-6 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20">Apply Filters'),nE=D('<div class="grid grid-cols-[90px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest"></span><select class="glass-surface p-2.5 rounded-lg text-xs text-white outline-none border border-white/5 focus:border-[var(--primary)]">'),rE=D("<option>");function iE(n){const[e,t]=Y(""),[r,i]=Y({type:"all",status:n.activeStatus||"all",region:"all",genre:"all",platform:"all",sort:"recent",tag:"all"}),[s,a]=Y(!1),[l,u]=Y(30);Cn(()=>i(S=>({...S,status:n.activeStatus||"all"})));const h=()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&u(S=>S+30)};on(()=>window.addEventListener("scroll",h)),an(()=>window.removeEventListener("scroll",h));const f=Ve(()=>[...new Set(n.watchlist().flatMap(S=>Hr(S)))].filter(Boolean).sort()),p=Ve(()=>[...new Set(n.watchlist().flatMap(S=>ji(S)))].filter(Boolean).sort()),_=Ve(()=>[...new Set(n.watchlist().map(S=>S.tag).filter(Boolean))].sort()),x=Ve(()=>{let S=n.watchlist();if(e()){const T=e().toLowerCase();S=S.filter(N=>(N.title||N.name||"").toLowerCase().includes(T)||N.castList&&N.castList.some(R=>R.toLowerCase().includes(T)))}return r().type!=="all"&&(S=S.filter(T=>T.media_type===r().type)),r().status!=="all"&&(S=S.filter(T=>T.status===r().status||r().status==="Planned"&&T.status==="Plan to Watch")),r().region!=="all"&&(S=S.filter(T=>(T.region||"International")===r().region)),r().genre!=="all"&&(S=S.filter(T=>Hr(T).includes(r().genre))),r().platform!=="all"&&(S=S.filter(T=>ji(T).includes(r().platform))),r().tag!=="all"&&(S=S.filter(T=>T.tag===r().tag)),S.sort((T,N)=>r().sort==="year_desc"?(parseInt(String(N.release_date||N.first_air_date||"").substring(0,4))||0)-(parseInt(String(T.release_date||T.first_air_date||"").substring(0,4))||0):r().sort==="rating_desc"?(N.rating||0)-(T.rating||0):r().sort==="title_asc"?(T.title||T.name||"").localeCompare(N.title||N.name||""):(N.addedAt?.seconds||0)-(T.addedAt?.seconds||0))}),C=Ve(()=>Object.values(r()).filter(S=>S!=="all"&&S!=="recent").length);return(()=>{var S=Z0(),T=S.firstChild,N=T.firstChild,R=N.firstChild,$=R.nextSibling,O=$.firstChild,F=N.nextSibling,q=F.firstChild,w=q.firstChild,v=T.nextSibling;return $.$$click=()=>a(!0),g($,E(G,{name:"tune",class:"text-sm"}),O),g($,(()=>{var y=Ze(()=>C()>0);return()=>y()&&(()=>{var I=eE();return g(I,C),I})()})(),null),g(q,E(G,{name:"search",class:"text-gray-400"}),w),w.$$input=y=>{t(y.target.value),u(30)},g(q,E(B,{get when(){return e().length>0||C()>0},get children(){var y=J0();return y.$$click=()=>{i({type:"all",status:"all",region:"all",genre:"all",platform:"all",sort:"recent",tag:"all"}),t(""),u(30),n.onFilterChange&&n.onFilterChange("all")},y}}),null),g(S,E(B,{get when(){return x().length===0},get children(){var y=X0(),I=y.firstChild;return g(y,E(G,{name:"sentiment_dissatisfied",class:"text-5xl mb-3"}),I),y}}),v),g(v,E(Qe,{get each(){return x().slice(0,l())},children:y=>E(Y0,{movie:y,onClick:()=>n.openMovie(y.id)})})),g(S,E(B,{get when(){return s()},get children(){return E(sE,{get filters(){return r()},setFilters:y=>{i(y),u(30)},get uniqueGenres(){return f()},get uniquePlatforms(){return p()},get uniqueTags(){return _()},onClose:()=>a(!1),get onFilterChange(){return n.onFilterChange}})}}),null),X(()=>w.value=e()),S})()}function sE(n){return on(()=>document.body.style.overflow="hidden"),an(()=>document.body.style.overflow=""),(()=>{var e=tE(),t=e.firstChild,r=t.firstChild,i=r.nextSibling,s=i.firstChild,a=s.firstChild,l=s.nextSibling,u=i.nextSibling,h=u.nextSibling;return Be(e,"click",n.onClose),t.$$click=f=>f.stopPropagation(),g(s,E(G,{name:"tune",class:"text-[var(--primary)]"}),a),Be(l,"click",n.onClose),g(l,E(G,{name:"close",class:"text-gray-400 hover:text-white"})),g(u,E(mr,{label:"Status",get val(){return n.filters.status},set:f=>{n.setFilters({...n.filters,status:f}),n.onFilterChange&&n.onFilterChange(f)},opts:[{l:"All",v:"all"},{l:"Planned",v:"Planned"},{l:"Watching",v:"Watching"},{l:"Completed",v:"Completed"}]}),null),g(u,E(mr,{label:"Tags",get val(){return n.filters.tag},set:f=>n.setFilters({...n.filters,tag:f}),get opts(){return[{l:"All Tags",v:"all"},...n.uniqueTags.map(f=>({l:f,v:f}))]}}),null),g(u,E(mr,{label:"Type",get val(){return n.filters.type},set:f=>n.setFilters({...n.filters,type:f}),opts:[{l:"All",v:"all"},{l:"Movies",v:"movie"},{l:"Series",v:"tv"}]}),null),g(u,E(mr,{label:"Region",get val(){return n.filters.region},set:f=>n.setFilters({...n.filters,region:f}),opts:[{l:"All",v:"all"},{l:"Indian",v:"Indian"},{l:"International",v:"International"}]}),null),g(u,E(mr,{label:"Platform",get val(){return n.filters.platform},set:f=>n.setFilters({...n.filters,platform:f}),get opts(){return[{l:"All Platforms",v:"all"},...n.uniquePlatforms.map(f=>({l:f,v:f}))]}}),null),g(u,E(mr,{label:"Genre",get val(){return n.filters.genre},set:f=>n.setFilters({...n.filters,genre:f}),get opts(){return[{l:"All Genres",v:"all"},...n.uniqueGenres.map(f=>({l:f,v:f}))]}}),null),g(u,E(mr,{label:"Sort By",get val(){return n.filters.sort},set:f=>n.setFilters({...n.filters,sort:f}),opts:[{l:"Recently Added",v:"recent"},{l:"Release Year (Newest)",v:"year_desc"},{l:"Rating (High-Low)",v:"rating_desc"},{l:"Title (A-Z)",v:"title_asc"}]}),null),Be(h,"click",n.onClose),e})()}const mr=n=>(()=>{var e=nE(),t=e.firstChild,r=t.nextSibling;return g(t,()=>n.label),r.addEventListener("change",i=>n.set(i.target.value)),g(r,E(Qe,{get each(){return n.opts},children:i=>(()=>{var s=rE();return g(s,()=>i.l||i),X(()=>s.value=i.v||i),s})()})),X(()=>r.value=n.val),e})();zt(["click","input"]);var oE=D('<div class="text-center py-12 text-gray-500"><p class="text-sm font-bold">Saari movies folder mein hain already!'),aE=D('<div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-lg bg-[#08090b]/97 rounded-[2rem] border border-white/10 shadow-2xl animate-pop-in overflow-hidden flex flex-col max-h-[80vh]"><div class="p-5 border-b border-white/5 flex justify-between items-center shrink-0"><h3 class="font-black text-lg text-white flex items-center gap-2"> Vault se Add karo</h3><button class="bg-white/5 p-2 rounded-full active:scale-95 hover:bg-white/10 transition-all"></button></div><div class="p-4 border-b border-white/5 shrink-0"><div class="flex items-center gap-3 glass-surface rounded-2xl px-4 py-3 border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors"><input autofocus placeholder="Movie ya series dhundo..."class="bg-transparent border-none w-full outline-none text-white text-sm font-medium placeholder-gray-600"></div></div><div class="overflow-y-auto hide-scrollbar p-3 space-y-2">'),lE=D('<img class="w-10 h-14 rounded-xl object-cover shrink-0 bg-[#171921]">'),cE=D('<div class="flex items-center gap-3 glass-surface p-3 rounded-2xl border border-white/5 hover:border-[var(--primary)]/30 transition-all group"><div class="flex-1 min-w-0"><p class="font-bold text-sm text-white truncate"></p><p class="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest"> • </p></div><button class="w-9 h-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-[#0c0e14] transition-all active:scale-95 shrink-0">'),uE=D('<div class="w-10 h-14 bg-white/5 rounded-xl shrink-0 flex items-center justify-center">'),hE=D('<button class="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/5 hover:bg-white/20 active:scale-95 transition-all shadow-lg flex items-center gap-1"> Folder'),dE=D('<button class="mb-6 glass-surface px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest w-max active:scale-95 transition-transform"> Back'),fE=D('<div class="flex flex-col gap-5 mb-10">'),pE=D('<div class="flex justify-between items-end mb-4 px-2"><h3 class="font-bold text-xl font-headline">Titles <span class="text-[var(--primary)] text-sm">(<!>)</span></h3><select class="bg-[#08090b] text-[var(--primary)] text-[10px] font-bold uppercase outline-none border border-white/10 rounded-full px-3 py-1.5 shadow-lg"><option value=order>Sort: Custom</option><option value=year>Sort: Year'),gE=D('<div class="text-center py-16 opacity-40"><p class="text-sm font-bold text-gray-300">Folder empty hai</p><p class="text-[11px] text-gray-500 mt-1">"Add Movie" button se vault se add karo'),mE=D("<div class=space-y-3>"),_E=D('<div class="pb-10 animate-fade-in"><div class="flex justify-between items-center mb-6"><h2 class="text-3xl font-headline font-black drop-shadow-md">Lists'),vE=D('<button class="bg-[var(--primary)] text-[#0c0e14] px-4 py-2 rounded-full text-xs font-black border border-[var(--primary)] active:scale-95 transition-all shadow-lg flex items-center gap-1"> Add Movie'),yE=D('<img class="absolute inset-0 w-full h-full object-cover z-0">'),bE=D('<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">'),wE=D('<div class="relative rounded-[2rem] cursor-pointer group hover:-translate-y-1 transition-all shadow-2xl flex flex-col justify-end min-h-[160px] overflow-hidden border border-white/10 bg-[#171921]"><div class="relative z-20 p-6 sm:p-8 w-full h-full flex flex-col justify-end"><div class="w-full pr-12"><p class="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest mb-1 opacity-90 drop-shadow-md">Collection</p><h3 class="font-black font-headline text-2xl sm:text-3xl text-white leading-tight drop-shadow-lg"></h3><p class="text-[10px] text-gray-300 mt-1 font-bold"> titles</p></div></div><button class="absolute top-4 right-4 z-30 text-white hover:text-red-500 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-95">'),EE=D('<div class="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1 shrink-0"><button></button><span class="text-[10px] font-black text-[var(--primary)]"></span><button>'),xE=D('<div class="flex items-center gap-3 glass-surface p-3 rounded-[1.5rem] border border-white/5 shadow-lg group hover:border-white/20 transition-all"><div class="flex-1 flex items-center gap-3 cursor-pointer min-w-0"><img class="w-11 h-16 rounded-xl object-cover shadow-md shrink-0"><div class=min-w-0><p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] transition-colors truncate"></p><p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1"></p></div></div><button class="w-8 h-8 rounded-full text-gray-600 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all active:scale-95 shrink-0">');function IE(n){const[e,t]=Y("");on(()=>{document.body.style.overflow="hidden"}),an(()=>{document.body.style.overflow=""});const r=Ve(()=>{const s=e().toLowerCase();return n.watchlist().filter(a=>a.franchises?.[n.folderId]===void 0).filter(a=>!s||(a.title||a.name||"").toLowerCase().includes(s))}),i=async s=>{const a=n.currentMovies().length+1;await yr(Ct(rt,"users",n.uid,"watchlist",String(s.id)),{[`franchises.${n.folderId}`]:a}),n.showToast("Added!")};return(()=>{var s=aE(),a=s.firstChild,l=a.firstChild,u=l.firstChild,h=u.firstChild,f=u.nextSibling,p=l.nextSibling,_=p.firstChild,x=_.firstChild,C=p.nextSibling;return Be(s,"click",n.onClose),a.$$click=S=>S.stopPropagation(),g(u,E(G,{name:"playlist_add",class:"text-[var(--primary)]"}),h),Be(f,"click",n.onClose),g(f,E(G,{name:"close",class:"text-gray-400"})),g(_,E(G,{name:"search",class:"text-gray-500 text-sm shrink-0"}),x),x.$$input=S=>t(S.target.value),g(C,E(B,{get when(){return r().length===0},get children(){var S=oE(),T=S.firstChild;return g(S,E(G,{name:"check_circle",class:"text-4xl mb-2 opacity-30"}),T),S}}),null),g(C,E(Qe,{get each(){return r()},children:S=>(()=>{var T=cE(),N=T.firstChild,R=N.firstChild,$=R.nextSibling,O=$.firstChild,F=N.nextSibling;return g(T,E(B,{get when(){return S.poster_path},get fallback(){return(()=>{var q=uE();return g(q,E(G,{name:"movie",class:"text-gray-600 text-sm"})),q})()},get children(){var q=lE();return X(()=>Fe(q,"src",`https://image.tmdb.org/t/p/w92${S.poster_path}`)),q}}),N),g(R,()=>S.title||S.name),g($,()=>(S.release_date||S.first_air_date||"").split("-")[0],O),g($,()=>S.media_type==="tv"?"Series":"Movie",null),F.$$click=()=>i(S),g(F,E(G,{name:"add",class:"text-lg"})),T})()}),null),X(()=>x.value=e()),s})()}function TE(n){const[e,t]=Y(null),[r,i]=Y("order"),[s,a]=Y(!1),l=Ve(()=>n.franchises().filter(_=>_.parentId===e()).sort((_,x)=>_.name.localeCompare(x.name))),u=Ve(()=>n.watchlist().filter(x=>x.franchises&&x.franchises[e()]!==void 0).sort((x,C)=>r()==="year"?(parseInt(String(C.release_date||C.first_air_date||"").substring(0,4))||0)-(parseInt(String(x.release_date||x.first_air_date||"").substring(0,4))||0):x.franchises[e()]-C.franchises[e()])),h=async()=>{const _=prompt("Folder Name:");_&&_.trim()&&(await Ny(Ps(rt,"users",n.uid,"franchises"),{name:_.trim(),parentId:e(),createdAt:bl()}),n.showToast("Folder created!"))},f=async(_,x)=>{let C=[...u()];if(_+x<0||_+x>=C.length)return;const S=Tf(rt);[C[_],C[_+x]]=[C[_+x],C[_]],C.forEach((T,N)=>S.update(Ct(rt,"users",n.uid,"watchlist",String(T.id)),{[`franchises.${e()}`]:N+1})),await S.commit()},p=async _=>{if(!confirm(`"${_.title||_.name}" ko folder se hatayein?`))return;const x={..._.franchises};delete x[e()],await yr(Ct(rt,"users",n.uid,"watchlist",String(_.id)),{franchises:x}),n.showToast("Removed from folder")};return(()=>{var _=_E(),x=_.firstChild;return x.firstChild,g(x,E(B,{get when(){return!e()},get fallback(){return(()=>{var C=vE(),S=C.firstChild;return C.$$click=()=>a(!0),g(C,E(G,{name:"playlist_add",class:"text-[16px]"}),S),C})()},get children(){var C=hE(),S=C.firstChild;return C.$$click=h,g(C,E(G,{name:"add",class:"text-[16px]"}),S),C}}),null),g(_,E(B,{get when(){return e()},get children(){var C=dE(),S=C.firstChild;return C.$$click=()=>t(null),g(C,E(G,{name:"arrow_back",class:"text-[14px]"}),S),C}}),null),g(_,E(B,{get when(){return l().length>0},get children(){var C=fE();return g(C,E(Qe,{get each(){return l()},children:S=>{const T=()=>n.watchlist().find($=>$.franchises&&$.franchises[S.id]!==void 0),N=()=>T()?.backdrop_path?`https://image.tmdb.org/t/p/w500${T().backdrop_path}`:"none",R=()=>n.watchlist().filter($=>$.franchises&&$.franchises[S.id]!==void 0).length;return(()=>{var $=wE(),O=$.firstChild,F=O.firstChild,q=F.firstChild,w=q.nextSibling,v=w.nextSibling,y=v.firstChild,I=O.nextSibling;return $.$$click=()=>t(S.id),g($,E(B,{get when(){return N()!=="none"},get children(){return[(()=>{var A=yE();return X(()=>Fe(A,"src",N())),A})(),bE()]}}),O),g(w,()=>S.name),g(v,R,y),I.$$click=A=>{A.stopPropagation(),confirm("Delete folder?")&&If(Ct(rt,"users",n.uid,"franchises",S.id))},g(I,E(G,{name:"delete",class:"text-[18px]"})),g($,E(B,{get when(){return N()==="none"},get children(){return E(G,{name:"folder",class:"absolute right-6 top-1/2 -translate-y-1/2 text-white/5 text-8xl pointer-events-none z-10",fill:!0})}}),null),$})()}})),C}}),null),g(_,E(B,{get when(){return e()},get children(){return[(()=>{var C=pE(),S=C.firstChild,T=S.firstChild,N=T.nextSibling,R=N.firstChild,$=R.nextSibling;$.nextSibling;var O=S.nextSibling;return g(N,()=>u().length,$),O.addEventListener("change",F=>i(F.target.value)),X(()=>O.value=r()),C})(),E(B,{get when(){return u().length===0},get children(){var C=gE(),S=C.firstChild;return g(C,E(G,{name:"video_library",class:"text-5xl text-[var(--primary)] mb-3"}),S),C}}),(()=>{var C=mE();return g(C,E(Qe,{get each(){return u()},children:(S,T)=>(()=>{var N=xE(),R=N.firstChild,$=R.firstChild,O=$.nextSibling,F=O.firstChild,q=F.nextSibling,w=R.nextSibling;return g(N,E(B,{get when(){return r()==="order"},get children(){var v=EE(),y=v.firstChild,I=y.nextSibling,A=I.nextSibling;return y.$$click=()=>f(T(),-1),g(y,E(G,{name:"keyboard_arrow_up",class:"text-[18px]"})),g(I,()=>T()+1),A.$$click=()=>f(T(),1),g(A,E(G,{name:"keyboard_arrow_down",class:"text-[18px]"})),X(k=>{var b=`text-gray-500 hover:text-white ${T()===0?"opacity-20 pointer-events-none":""}`,oe=`text-gray-500 hover:text-white ${T()===u().length-1?"opacity-20 pointer-events-none":""}`;return b!==k.e&&Te(y,k.e=b),oe!==k.t&&Te(A,k.t=oe),k},{e:void 0,t:void 0}),v}}),R),R.$$click=()=>n.openMovie(S.id),g(F,()=>S.title||S.name),g(q,()=>(S.release_date||S.first_air_date||"").split("-")[0]),w.$$click=()=>p(S),g(w,E(G,{name:"remove_circle",class:"text-[18px]"})),X(()=>Fe($,"src",`https://image.tmdb.org/t/p/w200${S.poster_path}`)),N})()})),C})()]}}),null),g(_,E(B,{get when(){return Ze(()=>!!s())()&&e()},get children(){return E(IE,{get uid(){return n.uid},get folderId(){return e()},get watchlist(){return n.watchlist},currentMovies:u,get showToast(){return n.showToast},onClose:()=>a(!1)})}}),null),_})()}zt(["click","input"]);var AE=D('<img class="w-full h-full object-cover opacity-40">'),SE=D('<div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent pointer-events-none">'),CE=D('<button class="absolute inset-0 flex items-center justify-center z-10 group"><div class="w-14 h-14 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50 group-hover:scale-110 transition-transform shadow-lg">'),RE=D('<div class=mb-8><h3 class="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-3 px-1">Cast & Crew</h3><div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">'),kE=D('<div class="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-xl bg-[#0c0e14] rounded-3xl overflow-hidden border border-white/10 relative max-h-[90vh] shadow-2xl animate-pop-in flex flex-col"><button class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"></button><div class="overflow-y-auto hide-scrollbar w-full"><div class="relative h-48 md:h-64 bg-black"></div><div class="p-6 md:px-8 pb-28 -mt-16 relative z-10"><h2 class="text-3xl font-black drop-shadow-md mb-2"></h2><p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6"> • </p><p class="text-gray-400 text-sm mb-6 leading-relaxed"></p><div class="glass-surface p-5 rounded-2xl border border-white/5 space-y-3 mb-6"></div><button class="w-full bg-[var(--primary)] text-[#0c0e14] font-bold py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20"> Add to Vault'),$E=D('<iframe class="w-full h-full absolute inset-0 z-10"frameborder=0 allowfullscreen>'),PE=D('<div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]">'),NE=D('<div class="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-white/5">No Video Available'),yh=D('<span class="text-xs text-gray-300">'),DE=D('<span class="text-xs font-bold text-[var(--secondary)]">'),VE=D('<div class="flex flex-col items-center min-w-[70px] shrink-0"><img class="w-12 h-12 rounded-full object-cover border border-[var(--primary)] mb-2 bg-[#171921]"><p class="text-[9px] font-bold text-center text-white truncate w-full"></p><p class="text-[8px] text-[var(--primary)] font-bold text-center uppercase tracking-widest mt-0.5">'),OE=D('<div class="flex flex-col items-center min-w-[70px] shrink-0"><img class="w-12 h-12 rounded-full object-cover border border-white/10 mb-2 bg-[#171921]"><p class="text-[9px] font-bold text-center text-white truncate w-full"></p><p class="text-[8px] text-gray-500 text-center uppercase truncate w-full mt-0.5">'),ME=D('<div class="flex gap-2 overflow-x-auto hide-scrollbar mb-6 glass-surface p-2 rounded-2xl border border-white/5 shadow-inner">'),LE=D('<div class="text-center p-12 flex flex-col items-center gap-4 text-[var(--primary)] animate-pulse font-bold text-sm tracking-widest uppercase"> Scanning Radar...'),FE=D('<div class="pb-10 animate-fade-in"><h2 class="text-3xl font-headline font-black drop-shadow-md mb-6">Upcoming</h2><div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4 border border-white/5 shadow-lg"><button>Indian</button><button>International</button></div><div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4 border border-white/5 shadow-lg"><button>Movies</button><button>Series</button></div><div class="flex justify-center mb-8"><div class="glass-surface p-2 pr-6 rounded-[2rem] flex items-center gap-4 border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors shadow-xl relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent pointer-events-none"></div><div class="bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_var(--primary)] relative z-10"></div><div class="flex flex-col relative z-10"><span class="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Scan Radar From</span><input type=date class="bg-transparent border-none outline-none text-white font-black text-sm [color-scheme:dark] p-0 m-0 w-32">'),UE=D("<button>"),jE=D('<div class="space-y-6 relative before:absolute before:inset-0 before:ml-[38px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">'),BE=D('<div class="text-center p-12 glass-surface rounded-[2rem] text-gray-500 text-sm font-bold border border-white/5 flex flex-col items-center gap-3"> No releases found.'),qE=D('<img class="w-16 h-24 rounded-xl object-cover shadow-md bg-[#171921]">'),GE=D('<span class="text-[8px] bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max"> '),zE=D('<div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#08090b] border-4 border-[var(--primary)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_var(--primary)] z-10 ml-5 md:ml-0 overflow-hidden"><div class="flex flex-col items-center justify-center leading-none"><span class="text-[10px] font-black text-white"></span><span class="text-[7px] font-bold text-[var(--primary)] uppercase"></span></div></div><div class="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-surface p-3 rounded-[1.5rem] border border-white/5 hover:border-[var(--primary)]/50 transition-all shadow-lg flex gap-4 animate-pop-in"><div class="flex-1 flex flex-col justify-center py-1 min-w-0"><p class="font-bold text-sm text-gray-100 line-clamp-2 group-hover:text-[var(--primary)] transition-colors"></p><div class="flex items-center gap-2 mt-2">'),HE=D('<div class="w-16 h-24 bg-[#171921] rounded-xl flex items-center justify-center">'),WE=D('<span class="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max"> Theatrical');function KE(n){const[e,t]=Y(n.movie),[r,i]=Y(null),[s,a]=Y(!1),[l,u]=Y("");on(()=>{document.body.style.overflow="hidden"}),an(()=>{document.body.style.overflow=""}),Cn(()=>{const f=n.movie.media_type||"movie";fetch(`https://api.themoviedb.org/3/${f}/${n.movie.id}?api_key=${Kt}&append_to_response=videos,credits,watch/providers`).then(p=>p.json()).then(p=>{t(p);const _=p.videos?p.videos.results:null;if(_){let S=_.find(T=>T.site==="YouTube"&&(T.type==="Trailer"||T.type==="Teaser"))||_.find(T=>T.site==="YouTube");S&&i(S.key)}const x=p["watch/providers"]?.results?.IN;let C=[];if(x){const S=[...x.flatrate||[],...x.free||[],...x.ads||[],...x.buy||[]];C=[...new Set(S.map(T=>Sn(T.provider_name)))].filter(Boolean)}C.length===0&&p.networks&&(C=[...new Set(p.networks.map(S=>Sn(S.name)))].filter(Boolean)),C.length>0&&u(C.join(", "))}).catch(()=>{})});const h=()=>e().runtime||e().episode_run_time?.[0]||0;return(()=>{var f=kE(),p=f.firstChild,_=p.firstChild,x=_.nextSibling,C=x.firstChild,S=C.nextSibling,T=S.firstChild,N=T.nextSibling,R=N.firstChild,$=N.nextSibling,O=$.nextSibling,F=O.nextSibling,q=F.firstChild;return Be(f,"click",n.onClose),p.$$click=w=>w.stopPropagation(),Be(_,"click",n.onClose),g(_,E(G,{name:"close",class:"text-sm text-white"})),g(C,E(B,{get when(){return!s()},get fallback(){return(()=>{var w=$E();return X(()=>Fe(w,"src",`https://www.youtube.com/embed/${r()}?autoplay=1&rel=0`)),w})()},get children(){return[E(B,{get when(){return e().backdrop_path},get fallback(){return(()=>{var w=PE();return g(w,E(G,{name:"movie",class:"text-6xl"})),w})()},get children(){var w=AE();return X(()=>Fe(w,"src",`https://image.tmdb.org/t/p/original${e().backdrop_path}`)),w}}),SE(),E(B,{get when(){return r()},get fallback(){return NE()},get children(){var w=CE(),v=w.firstChild;return w.$$click=()=>a(!0),g(v,E(G,{name:"play_arrow",fill:!0,class:"text-white text-3xl"})),w}})]}})),g(T,()=>e().title||e().name),g(N,()=>e().release_date||e().first_air_date,R),g(N,()=>n.movie.media_type==="tv"?"SERIES":"MOVIE",null),g(N,E(B,{get when(){return h()>0},get children(){return[" • ",Ze(()=>Nl(h()))]}}),null),g($,()=>e().overview||"No overview available."),g(O,E(un,{icon:"format_list_bulleted",label:"Genre",get value(){return(()=>{var w=yh();return g(w,()=>(e().genres||[]).map(v=>v.name).join(", ")||"N/A"),w})()}}),null),g(O,E(un,{icon:"language",label:"Language",get value(){return(()=>{var w=yh();return g(w,()=>e().spoken_languages?.[0]?.english_name||(e().original_language?e().original_language.toUpperCase():"N/A")),w})()}}),null),g(O,E(B,{get when(){return l()},get children(){return E(un,{icon:"connected_tv",label:"Platform",get value(){return(()=>{var w=DE();return g(w,l),w})()}})}}),null),g(S,E(B,{get when(){return e().credits||e().created_by},get children(){var w=RE(),v=w.firstChild,y=v.nextSibling;return g(y,E(B,{get when(){return e().credits?.crew?.find(I=>I.job==="Director")||e().created_by?.[0]},children:I=>{const A=I();return(()=>{var k=VE(),b=k.firstChild,oe=b.nextSibling,Z=oe.nextSibling;return g(oe,()=>A.name),g(Z,()=>e().created_by?"Creator":"Director"),X(()=>Fe(b,"src",A.profile_path?`https://image.tmdb.org/t/p/w200${A.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${A.name}&backgroundColor=171921`)),k})()}}),null),g(y,E(Qe,{get each(){return e().credits?.cast?.slice(0,5)},children:I=>(()=>{var A=OE(),k=A.firstChild,b=k.nextSibling,oe=b.nextSibling;return g(b,()=>I.name),g(oe,()=>I.character),X(()=>Fe(k,"src",I.profile_path?`https://image.tmdb.org/t/p/w200${I.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${I.name}&backgroundColor=171921`)),A})()}),null),w}}),F),Be(F,"click",n.onAdd),g(F,E(G,{name:"add_circle",fill:!0}),q),f})()}function QE(n){const[e,t]=Y("Indian"),[r,i]=Y("movie"),[s,a]=Y("all"),[l,u]=Y(new Date().toISOString().split("T")[0]),[h,f]=Y([]),[p,_]=Y(!1),[x,C]=Y(null);Cn(()=>{_(!0);const T=new Date(l()),N=T.toISOString().split("T")[0];T.setDate(T.getDate()+30);const R=T.toISOString().split("T")[0];let $=`https://api.themoviedb.org/3/discover/movie?api_key=${Kt}&primary_release_date.gte=${N}&primary_release_date.lte=${R}&sort_by=popularity.desc`,O=`https://api.themoviedb.org/3/discover/tv?api_key=${Kt}&air_date.gte=${N}&air_date.lte=${R}&sort_by=popularity.desc&without_genres=10764,10767`;e()==="Indian"&&($+="&with_origin_country=IN",O+="&with_origin_country=IN",s()!=="all"&&($+=`&with_original_language=${s()}`,O+=`&with_original_language=${s()}`)),Promise.all([fetch($+"&page=1").then(F=>F.json()),fetch($+"&page=2").then(F=>F.json()),fetch(O+"&page=1").then(F=>F.json()),fetch(O+"&page=2").then(F=>F.json())]).then(async([F,q,w,v])=>{let y=[...F.results||[],...q.results||[]].map(j=>({...j,media_type:"movie",calc_date:j.release_date}));const A=[...w.results||[],...v.results||[]].slice(0,25).map(j=>fetch(`https://api.themoviedb.org/3/tv/${j.id}?api_key=${Kt}`).then(H=>H.json()).catch(()=>null));let b=(await Promise.all(A)).filter(Boolean).map(j=>{let H=j.next_episode_to_air,ee=H?H.air_date:j.first_air_date||N,Ae=!!H,ae=H?`S${H.season_number} E${H.episode_number}`:"New Drop";return{...j,media_type:"tv",title:j.name,release_date:j.first_air_date,calc_date:ee,isReturning:Ae,epTag:ae}});const oe=new Set(n.watchlist().map(j=>String(j.id)));if(b=b.filter(j=>!j.isReturning||oe.has(String(j.id))),e()==="International"){const j=H=>(H.origin_country||[]).includes("IN")||["hi","te","ta","ml","bn"].includes(H.original_language);y=y.filter(H=>!j(H)),b=b.filter(H=>!j(H))}let Z=[...y,...b].filter(j=>j.calc_date&&j.poster_path);Z.sort((j,H)=>new Date(j.calc_date)-new Date(H.calc_date));const M=[],z=new Set;for(const j of Z)z.has(j.id)||(z.add(j.id),M.push(j));f(M),_(!1)}).catch(()=>_(!1))});const S=async T=>{if(n.watchlist().some(O=>String(O.id)===String(T.id)))return n.showToast("Already in vault!");const N=T.media_type==="tv"?"tv":"movie",$=await(await fetch(`https://api.themoviedb.org/3/${N}/${T.id}?api_key=${Kt}`)).json();await es(Ct(rt,"users",n.uid,"watchlist",String(T.id)),{id:T.id,title:T.title||T.name,poster_path:T.poster_path,backdrop_path:T.backdrop_path,media_type:T.media_type,status:"Planned",addedAt:bl(),release_date:T.calc_date||"",region:e()==="Indian"?"Indian":"International",season:1,episode:0,totalEps:$.number_of_episodes||0,runtime:$.runtime||$.episode_run_time?.[0]||0}),n.showToast("Added to Vault"),C(null)};return(()=>{var T=FE(),N=T.firstChild,R=N.nextSibling,$=R.firstChild,O=$.nextSibling,F=R.nextSibling,q=F.firstChild,w=q.nextSibling,v=F.nextSibling,y=v.firstChild,I=y.firstChild,A=I.nextSibling,k=A.nextSibling,b=k.firstChild,oe=b.nextSibling;return $.$$click=()=>{t("Indian"),a("all")},O.$$click=()=>{t("International"),a("all")},q.$$click=()=>i("movie"),w.$$click=()=>i("tv"),g(T,E(B,{get when(){return e()==="Indian"},get children(){var Z=ME();return g(Z,E(Qe,{each:["all","hi","te","ta","ml"],children:M=>(()=>{var z=UE();return z.$$click=()=>a(M),g(z,()=>M==="all"?"All":M.toUpperCase()),X(()=>Te(z,`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${s()===M?"bg-[var(--primary)]/20 text-[var(--primary)]":"text-gray-400 hover:text-white"}`)),z})()})),Z}}),v),g(A,E(G,{name:"calendar_month",class:"text-[#0c0e14] text-xl"})),oe.$$input=Z=>u(Z.target.value),g(T,E(B,{get when(){return p()},get fallback(){return E(B,{get when(){return h().filter(Z=>Z.media_type===r()).length>0},get fallback(){return(()=>{var Z=BE(),M=Z.firstChild;return g(Z,E(G,{name:"event_busy",class:"text-4xl opacity-50"}),M),Z})()},get children(){var Z=jE();return g(Z,E(Qe,{get each(){return h().filter(M=>M.media_type===r())},children:M=>{const z=new Date(M.calc_date).getDate(),j=new Date(M.calc_date).toLocaleString("default",{month:"short"});return(()=>{var H=zE(),ee=H.firstChild,Ae=ee.firstChild,ae=Ae.firstChild,de=ae.nextSibling,pe=ee.nextSibling,ce=pe.firstChild,Ue=ce.firstChild,xe=Ue.nextSibling;return H.$$click=()=>C(M),g(ae,z),g(de,j),g(pe,E(B,{get when(){return M.poster_path},get fallback(){return(()=>{var ne=HE();return g(ne,E(G,{name:"movie",class:"text-gray-600"})),ne})()},get children(){var ne=qE();return X(()=>Fe(ne,"src",`https://image.tmdb.org/t/p/w200${M.poster_path}`)),ne}}),ce),g(Ue,()=>M.title),g(xe,E(B,{get when(){return M.media_type==="tv"},get fallback(){return(()=>{var ne=WE(),Oe=ne.firstChild;return g(ne,E(G,{name:"theaters",class:"text-[10px]"}),Oe),ne})()},get children(){var ne=GE(),Oe=ne.firstChild;return g(ne,E(G,{name:"tv",class:"text-[10px]"}),Oe),g(ne,()=>M.epTag||"Series Drop",null),ne}})),H})()}})),Z}})},get children(){var Z=LE(),M=Z.firstChild;return g(Z,E(G,{name:"radar",class:"text-5xl animate-spin"}),M),Z}}),null),g(T,E(B,{get when(){return x()},get children(){return E(KE,{get movie(){return x()},onClose:()=>C(null),onAdd:()=>S(x())})}}),null),X(Z=>{var M=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${e()==="Indian"?"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,z=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${e()==="International"?"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,j=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${r()==="movie"?"bg-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,H=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${r()==="tv"?"bg-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`;return M!==Z.e&&Te($,Z.e=M),z!==Z.t&&Te(O,Z.t=z),j!==Z.a&&Te(q,Z.a=j),H!==Z.o&&Te(w,Z.o=H),Z},{e:void 0,t:void 0,a:void 0,o:void 0}),X(()=>oe.value=l()),T})()}zt(["click","input"]);var YE=D('<div class="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6 animate-pulse"><div class="flex justify-between items-center mb-2"><span class="text-[9px] font-black uppercase text-[var(--primary)] tracking-widest flex items-center gap-1"> Scanning Network</span><span class="text-[10px] font-bold text-white"> / </span></div><div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3"><div class="h-full bg-[var(--primary)] transition-all duration-300"></div></div><p class="text-[10px] text-gray-500 font-bold truncate">'),JE=D('<div class="bg-green-500/10 border border-green-500/30 p-3 rounded-xl mb-6 text-[10px] font-black text-green-400 tracking-widest uppercase flex items-center gap-2"> '),XE=D('<div class="bg-black/50 p-4 rounded-2xl border border-white/5 mt-2 animate-fade-in"><div class="flex justify-between items-center mb-2"><span class="text-[9px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1"> </span><span class="text-[10px] font-bold text-white"> / </span></div><div class="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3"><div class="h-full bg-[var(--primary)] transition-all duration-300"></div></div><div class="flex gap-4 text-[10px] font-bold tracking-wide"><span class=text-green-400>Success: </span><span class=text-red-400>Skipped: '),ZE=D('<div class="mt-4 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl animate-fade-in"><div class="flex justify-between items-center border-b border-red-500/20 pb-2 mb-2"><span class="text-[10px] font-black uppercase text-red-400 tracking-widest flex items-center gap-1"> Skipped Log</span><button class="text-[8px] font-black uppercase bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-colors">Clear Log</button></div><div class="max-h-24 overflow-y-auto hide-scrollbar space-y-1">'),ex=D('<div class="animate-fade-in max-w-3xl mx-auto pb-10"><div class="flex items-center gap-3 mb-8 px-2"><div class="w-10 h-10 bg-[var(--primary)]/20 rounded-full flex items-center justify-center border border-[var(--primary)]/50"></div><div><h2 class="text-3xl font-headline font-black drop-shadow-md">Data Center</h2><p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Maintenance & Backups</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between"><div class="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[50px] rounded-full pointer-events-none"></div><div><h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"> Vault Repair Engine</h3><p class="text-xs text-gray-400 leading-relaxed mb-6">Runs a deep background scan across all saved titles. Fetches missing streaming platforms, genres, and episodes from external APIs. Your personal edits remain 100% untouched.</p></div><button></button></div><div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-start"><div><h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"> Local Backup & Restore</h3><p class="text-xs text-gray-400 leading-relaxed mb-6">Export your cinematic universe to a JSON file, or restore from a previous backup. Duplicate entries are automatically skipped.</p></div><div class="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4"><div class="flex items-center gap-4"><div><h4 class="text-xs font-black text-white">Vault Size</h4><p class="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-widest"> Titles</p></div></div></div><div class="grid grid-cols-2 gap-3 mb-2"><button class="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"> Export</button><input type=file accept=.json class=hidden><button> '),tx=D('<div class="text-[9px] flex justify-between text-gray-300 border-b border-red-500/10 pb-1 mb-1 last:border-0"><span class="truncate pr-2 font-bold w-1/2"></span><span class="text-red-400/80 truncate w-1/2 text-right">');const nx="QQQ2oiV5GK9fIM0sjEfgHwMTjGtusEYSy6I8TIfp";function rx(n){const[e,t]=Y(!1),[r,i]=Y({current:0,total:0,pct:0}),[s,a]=Y(""),[l,u]=Y(!1),[h,f]=Y({total:0,success:0,skipped:0}),[p,_]=Y([]);let x;const C=async()=>{if(!confirm(`Start Deep Scan?
This will check and update missing streaming platforms and genres for all your saved movies. Your personal edits remain 100% untouched.`))return;t(!0);const N=n.watchlist(),R=N.length;let $=0;for(let O=0;O<R;O++){const F=N[O];a(`Scanning: ${F.title||F.name}...`),i({current:O+1,total:R,pct:Math.round((O+1)/R*100)});try{let q=[],w=F.genresList||[],v=F.totalEps||0;const y=await fetch(`https://api.themoviedb.org/3/${F.media_type||"movie"}/${F.id}?api_key=${Kt}&append_to_response=watch/providers`);if(y.ok){const Z=await y.json();Z.genres&&Z.genres.forEach(z=>{w.includes(z.name)||w.push(z.name)}),Z.number_of_episodes&&(v=Z.number_of_episodes);const M=Z["watch/providers"]?.results?.IN||Z["watch/providers"]?.results?.US;M&&[...M.flatrate||[],...M.free||[],...M.ads||[]].forEach(j=>q.push(j.provider_name))}const I=F.media_type==="tv"?"tv":"movie",A=await fetch(`https://api.watchmode.com/v1/title/${I}-${F.id}/sources/?apiKey=${nx}&regions=IN,US`);if(A.ok){const Z=await A.json();Array.isArray(Z)&&Z.forEach(M=>{(M.type==="sub"||M.type==="free")&&q.push(M.name)})}const k=F.platformsList||[];let b=new Set([...k]);q.forEach(Z=>{const M=Sn(Z);M&&b.add(M)});const oe=Array.from(b);(oe.length>k.length||w.length>(F.genresList?.length||0)||v!==F.totalEps)&&(await yr(Ct(rt,"users",n.uid,"watchlist",String(F.id)),{platformsList:oe,genresList:w,totalEps:v}),$++)}catch{console.log("Error syncing:",F.id)}await new Promise(q=>setTimeout(q,300))}t(!1),a(`Scan Complete! 🚀 Successfully updated ${$} titles.`),n.showToast(`Vault Repaired! ${$} items synced.`)},S=()=>{const N="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(n.watchlist())),R=document.createElement("a");R.setAttribute("href",N),R.setAttribute("download",`Cinelog_Vault_Backup_${new Date().toLocaleDateString()}.json`),document.body.appendChild(R),R.click(),R.remove(),n.showToast("Backup Downloaded!")},T=async N=>{const R=N.target.files[0];if(!R)return;const $=new FileReader;$.onload=async O=>{try{const F=JSON.parse(O.target.result);if(!Array.isArray(F))throw new Error("Invalid format. Expected an array.");u(!0),f({total:F.length,success:0,skipped:0}),_([]);const q=new Set(n.watchlist().map(w=>String(w.id)));for(let w=0;w<F.length;w++){const v=F[w];try{if(!v.id)throw new Error("Missing ID in object");if(q.has(String(v.id)))throw new Error("Already exists in Vault");await es(Ct(rt,"users",n.uid,"watchlist",String(v.id)),v),q.add(String(v.id)),f(y=>({...y,success:y.success+1}))}catch(y){f(I=>({...I,skipped:I.skipped+1})),_(I=>[...I,{title:v.title||v.name||"Unknown Item",reason:y.message}])}}u(!1),n.showToast("Import Finished!"),x&&(x.value="")}catch{u(!1),n.showToast("Failed to parse file. Is it a valid JSON?")}},$.readAsText(R)};return(()=>{var N=ex(),R=N.firstChild,$=R.firstChild,O=R.nextSibling,F=O.firstChild,q=F.firstChild,w=q.nextSibling,v=w.firstChild,y=v.firstChild,I=w.nextSibling,A=F.nextSibling,k=A.firstChild,b=k.firstChild,oe=b.firstChild,Z=k.nextSibling,M=Z.firstChild,z=M.firstChild,j=z.firstChild,H=j.nextSibling,ee=H.firstChild,Ae=Z.nextSibling,ae=Ae.firstChild,de=ae.firstChild,pe=ae.nextSibling,ce=pe.nextSibling,Ue=ce.firstChild;g($,E(G,{name:"sync",class:"text-[var(--primary)]"})),g(v,E(G,{name:"build_circle",class:"text-[var(--primary)]"}),y),g(F,E(B,{get when(){return e()},get children(){var ne=YE(),Oe=ne.firstChild,ke=Oe.firstChild,Pe=ke.firstChild,Ge=ke.nextSibling,Ot=Ge.firstChild,wt=Oe.nextSibling,Pt=wt.firstChild,Ft=wt.nextSibling;return g(ke,E(G,{name:"radar",class:"text-[12px] animate-spin"}),Pe),g(Ge,()=>r().current,Ot),g(Ge,()=>r().total,null),g(Ft,s),X(Ut=>en(Pt,"width",`${r().pct}%`)),ne}}),I),g(F,E(B,{get when(){return Ze(()=>!e())()&&s().includes("Complete")},get children(){var ne=JE(),Oe=ne.firstChild;return g(ne,E(G,{name:"check_circle",class:"text-[14px]"}),Oe),g(ne,s,null),ne}}),I),I.$$click=C,g(I,()=>e()?"Sync in Progress...":"Start Deep Scan"),g(b,E(G,{name:"download",class:"text-[var(--secondary)]"}),oe),g(M,E(G,{name:"folder_zip",class:"text-3xl text-gray-500"}),z),g(H,()=>n.watchlist().length,ee),ae.$$click=S,g(ae,E(G,{name:"file_download",class:"text-[14px]"}),de),pe.addEventListener("change",T);var xe=x;return typeof xe=="function"?sa(xe,pe):x=pe,ce.$$click=()=>x.click(),g(ce,E(G,{get name(){return l()?"hourglass_empty":"file_upload"},class:"text-[14px]"}),Ue),g(ce,()=>l()?"Wait...":"Import",null),g(A,E(B,{get when(){return l()||h().total>0},get children(){var ne=XE(),Oe=ne.firstChild,ke=Oe.firstChild,Pe=ke.firstChild,Ge=ke.nextSibling,Ot=Ge.firstChild,wt=Oe.nextSibling,Pt=wt.firstChild,Ft=wt.nextSibling,Ut=Ft.firstChild;Ut.firstChild;var yn=Ut.nextSibling;return yn.firstChild,g(ke,E(G,{get name(){return l()?"cloud_sync":"cloud_done"},class:"text-[12px]"}),Pe),g(ke,()=>l()?"Importing...":"Complete",null),g(Ge,()=>h().success+h().skipped,Ot),g(Ge,()=>h().total,null),g(Ut,()=>h().success,null),g(yn,()=>h().skipped,null),X(On=>en(Pt,"width",`${(h().success+h().skipped)/Math.max(h().total,1)*100}%`)),ne}}),null),g(A,E(B,{get when(){return p().length>0},get children(){var ne=ZE(),Oe=ne.firstChild,ke=Oe.firstChild,Pe=ke.firstChild,Ge=ke.nextSibling,Ot=Oe.nextSibling;return g(ke,E(G,{name:"error",class:"text-[14px]"}),Pe),Ge.$$click=()=>{_([]),f({total:0,success:0,skipped:0})},g(Ot,E(Qe,{get each(){return p()},children:wt=>(()=>{var Pt=tx(),Ft=Pt.firstChild,Ut=Ft.nextSibling;return g(Ft,()=>wt.title),g(Ut,()=>wt.reason),Pt})()})),ne}}),null),X(ne=>{var Oe=e(),ke=`w-full font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-transform shadow-lg flex items-center justify-center gap-2 ${e()?"bg-gray-800 text-gray-500 cursor-not-allowed":"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] hover:scale-[1.02] active:scale-95 shadow-[var(--primary)]/20"}`,Pe=l(),Ge=`font-black py-3 rounded-xl text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 border border-transparent ${l()?"bg-gray-800 text-gray-500 cursor-not-allowed":"bg-white/5 hover:bg-white/10 text-[var(--primary)] border hover:border-[var(--primary)]/50 active:scale-95"}`;return Oe!==ne.e&&(I.disabled=ne.e=Oe),ke!==ne.t&&Te(I,ne.t=ke),Pe!==ne.a&&(ce.disabled=ne.a=Pe),Ge!==ne.o&&Te(ce,ne.o=Ge),ne},{e:void 0,t:void 0,a:void 0,o:void 0}),N})()}zt(["click"]);var ix=D('<img class="w-full h-full object-cover opacity-40 blur-3xl scale-125">'),sx=D('<img class="w-full h-full object-cover opacity-60">'),ox=D('<div class="absolute inset-0 bg-gradient-to-t from-[#08090b]/90 via-[#08090b]/40 to-transparent pointer-events-none">'),ax=D('<button class="absolute inset-0 flex items-center justify-center z-10 group"><div class="w-16 h-16 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50 group-hover:scale-110 active:scale-95 transition-transform shadow-2xl">'),lx=D("<button>"),cx=D('<div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Season</label><input type=number class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Episode</label><input type=number class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]">'),ux=D('<div class="glass-surface p-6 rounded-2xl space-y-4 animate-fade-in border border-[var(--primary)]/30 mt-4 shadow-lg shadow-[var(--primary)]/10"><div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Status</label><select class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"><option value=Planned>Planned</option><option value=Watching>Watching</option><option value=Completed>Completed</option></select></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Personal Rating</label><input type=number step=0.1 min=0 max=10 class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Watch Date</label><input type=date class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white [color-scheme:dark] outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Region</label><select class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"><option>International</option><option>Indian</option></select></div></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Custom Tag</label><input placeholder="e.g. Theatre"class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)] placeholder-gray-700"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Available Platforms</label><div class="flex flex-wrap gap-2 p-3 bg-[#0c0e14] border border-white/5 rounded-xl"></div></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Genres (Comma separated)</label><input class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">My Notes</label><textarea class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)] placeholder-gray-700"rows=3 placeholder="Write your thoughts..."></textarea></div><button class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest mt-2 active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20">Save Universe Changes'),hx=D('<div class="w-full max-w-xl bg-[#08090b]/80 backdrop-blur-3xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 relative max-h-[95vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-pop-in flex flex-col"><button class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"></button><div class="overflow-y-auto hide-scrollbar w-full"><div class="h-56 md:h-72 relative bg-black shrink-0"></div><div class="px-6 md:px-8 pb-28 -mt-16 relative z-10"><div class="flex justify-between items-start mb-2"><div class=pr-2><h2 class="text-3xl font-black drop-shadow-md leading-tight"></h2><p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1"> • </p></div></div><div class="grid grid-cols-3 gap-2 my-5 w-full"><div class="bg-black/40 backdrop-blur-md border border-white/10 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class="text-xs font-black text-white"></span></div><span class="text-[7px] font-black text-gray-500 uppercase tracking-widest">IMDb</span></div><div class="bg-black/40 backdrop-blur-md border border-white/10 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class=text-[10px]>🍅</span><span class="text-xs font-black text-white"></span></div><span class="text-[7px] font-black text-gray-500 uppercase tracking-widest">RT</span></div><div class="bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/20 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class="text-xs font-black text-[var(--primary)]"></span></div><span class="text-[7px] font-black text-[var(--primary)] uppercase tracking-widest opacity-70">Sage'),dx=D('<div class="fixed inset-0 bg-black z-[10000000] flex flex-col animate-fade-in"><div class="p-4 flex justify-between items-center bg-[#0c0e14] border-b border-white/5 shadow-xl"><div class="flex items-center gap-3 overflow-hidden pr-2 flex-1"><button type=button class="p-2 bg-white/5 hover:bg-white/10 rounded-full active:scale-95 transition-all shrink-0"></button><h3 class="font-bold text-sm text-white truncate max-w-[150px]"></h3></div><div class="flex gap-2 shrink-0"><div class="relative bg-white/5 border border-white/10 rounded-xl px-2 py-1.5 flex items-center gap-1 hover:bg-white/10 transition-colors"><select class="bg-transparent text-[10px] font-black uppercase tracking-widest text-[var(--primary)] outline-none appearance-none cursor-pointer pr-4 pl-1"></select></div></div></div><div class="flex-1 bg-black w-full h-full relative"><div class="absolute inset-0 flex flex-col gap-3 items-center justify-center pointer-events-none opacity-50"><p class="text-[10px] uppercase font-black tracking-widest text-[var(--primary)]">Connecting to Node...</p></div><iframe class="w-full h-full border-none relative z-10"allowfullscreen>'),fx=D('<div class="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"><div class="absolute inset-0 bg-[#08090b] overflow-hidden pointer-events-none"><div class="absolute inset-0 bg-black/60">'),px=D('<iframe class="w-full h-full absolute inset-0 z-10"frameborder=0 allowfullscreen>'),gx=D('<div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]">'),mx=D('<div class="mb-6 bg-black/40 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/5 shadow-inner"><div class="flex justify-between items-center mb-3 px-1"><span class="text-[9px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-1.5"> Streaming Node</span></div><div class="flex flex-wrap gap-2 pb-2 px-1"></div><button type=button class="w-full mt-3 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl uppercase text-[11px] tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20"> Watch Now'),_x=D('<button class="w-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 rounded-xl py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary)] hover:text-[#0c0e14] active:scale-95 transition-all">+1 Episode'),vx=D('<div class="glass-surface p-5 rounded-2xl border border-white/5 mb-6"><div class="flex justify-between items-center mb-3"><span class="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"> Tracker</span><span class="font-black text-sm text-white"></span></div><div class="w-full h-2 bg-black rounded-full overflow-hidden mb-4"><div class="h-full bg-[var(--primary)] transition-all shadow-[0_0_10px_var(--primary)]">'),yx=D('<div class=mb-8><h3 class="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Cast & Crew</h3><div class="flex gap-5 overflow-x-auto hide-scrollbar pb-2">'),bx=D('<div class="border-t border-white/5 pt-3 mt-3"><p class="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-1"> Notes</p><p class="text-sm text-gray-300 italic">"<!>"'),wx=D('<button class="w-full mt-6 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2"> Add to My Universe'),Ex=D('<div class="mt-8 flex justify-end"><button class="text-red-500/50 hover:text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors mx-auto active:scale-95"> Remove from Universe'),xx=D('<div class=animate-fade-in><p class="text-gray-400 text-sm mb-6 leading-relaxed italic border-l-2 border-[var(--primary)]/30 pl-3">"<!>"</p><div class="glass-surface p-5 rounded-2xl space-y-4 border border-white/5">'),Ix=D("<button type=button> "),Tx=D('<div class="flex flex-col items-center min-w-[75px] shrink-0"><img class="w-16 h-16 rounded-full object-cover border border-white/10 mb-2 shadow-lg bg-[#171921]"><p class="text-[9px] font-black text-center text-white truncate w-full"></p><p class="text-[7px] text-gray-500 text-center uppercase truncate w-full font-bold mt-0.5">'),Ax=D('<div class="flex flex-col items-center min-w-[75px] shrink-0"><img class="w-16 h-16 rounded-full object-cover border border-[var(--secondary)] mb-2 shadow-lg bg-[#171921]"><p class="text-[9px] font-black text-center text-white truncate w-full"></p><p class="text-[7px] text-[var(--secondary)] text-center uppercase font-black tracking-widest mt-0.5">'),Sx=D('<span class="text-[var(--primary)] font-black uppercase text-[10px] tracking-widest">'),bh=D('<span class="text-xs text-gray-300">'),Cx=D('<div class="flex flex-wrap gap-2 mt-1">'),Rx=D('<span class="text-xs font-bold text-gray-500">-'),kx=D('<img class="w-4 h-4 rounded-full object-cover bg-black border border-white/10">'),$x=D('<a target=_blank rel="noopener noreferrer"class="flex items-center gap-1.5 bg-white/5 hover:bg-[var(--primary)]/20 border border-white/10 hover:border-[var(--primary)]/50 px-2.5 py-1.5 rounded-lg transition-all group shadow-sm"><span class="text-[9px] font-black text-gray-300 group-hover:text-white uppercase tracking-widest">'),Px=D('<div class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-inner">'),Nx=D('<span class="text-[9px] font-black uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/20">'),Dx=D('<span class="text-xs font-bold text-white">'),Vx=D("<button type=button>"),Ox=D('<option class="bg-[#0c0e14] text-white">');const wh=[{id:"vidzee",name:"VidZee (Fast)",icon:"smart_display"},{id:"vidlink",name:"VidLink",icon:"play_circle"},{id:"vidsrcru",name:"Vidsrc.ru",icon:"dns"},{id:"embedsu",name:"Embed.su",icon:"stream"},{id:"vidsrccc",name:"Vidsrc.cc",icon:"dynamic_feed"},{id:"autoembed",name:"AutoEmbed",icon:"bolt"}],Eh=(n,e)=>{const t=encodeURIComponent(n||""),r=e?e.toLowerCase().replace(/[^a-z0-9]/g,""):"";return{netflix:{name:"Netflix",logo:"https://image.tmdb.org/t/p/w92/t2yyOv40HZeVlLjVrCsPhIdZfC4.jpg",url:`https://www.netflix.com/search?q=${t}`},amazonprimevideo:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},primevideo:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},amazon:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},jiohotstar:{name:"JioHotstar",logo:"https://image.tmdb.org/t/p/w92/uzKjVDmQIA2rZGSNpGbnWXUWVQIM.jpg",url:`https://www.hotstar.com/in/explore?searchQuery=${t}`},hotstar:{name:"JioHotstar",logo:"https://image.tmdb.org/t/p/w92/uzKjVDmQIA2rZGSNpGbnWXUWVQIM.jpg",url:`https://www.hotstar.com/in/explore?searchQuery=${t}`},sonyliv:{name:"Sony LIV",logo:"https://image.tmdb.org/t/p/w92/8N0DNa4BO3lH24KWv1EjJh4TxGL.jpg",url:"https://www.sonyliv.com/"},zee5:{name:"Zee5",logo:"https://image.tmdb.org/t/p/w92/5vVzg0rtZAwQGzQoT2Zk0n43Nym.jpg",url:`https://www.zee5.com/global/search?q=${t}`},appletv:{name:"Apple TV",logo:"https://image.tmdb.org/t/p/w92/2E0ficP6ijhlCSJuwHI4isW0QhD.jpg",url:"https://tv.apple.com/"},crunchyroll:{name:"Crunchyroll",logo:"https://image.tmdb.org/t/p/w92/mXeC4TrcgdU6j81XreWIjA6k7yC.jpg",url:`https://www.crunchyroll.com/search?q=${t}`},youtube:{name:"YouTube",logo:"https://image.tmdb.org/t/p/w92/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",url:`https://www.youtube.com/results?search_query=${t}`}}[r]||null},Mx=n=>{const e=n.toLowerCase();if(e.includes("vi "))return"#ed1c24";if(e.includes("aha"))return"#ff6600";if(e.includes("hoichoi"))return"#e50b14";if(e.includes("sun"))return"#f09a36";if(e.includes("voot"))return"#5a2282";if(e.includes("mx"))return"#003366";if(e.includes("ullu"))return"#00b0b8";if(e.includes("alt"))return"#e30f1d";if(e.includes("eros"))return"#ff0000";if(e.includes("apple"))return"#ffffff";if(e.includes("discovery"))return"#001e61";let t=0;for(let r=0;r<n.length;r++)t=n.charCodeAt(r)+((t<<5)-t);return`hsl(${Math.abs(t)%360}, 70%, 45%)`};function Lx(n){const e=Ve(()=>typeof n.id=="string"&&n.id.startsWith("PREVIEW_")),t=Ve(()=>{if(!e())return null;try{return JSON.parse(n.id.replace("PREVIEW_",""))}catch{return null}}),r=Ve(()=>e()?t():n.watchlist.find(M=>String(M.id)===String(n.id))),[i,s]=Y({}),[a,l]=Y(!1),[u,h]=Y(null),[f,p]=Y(!1),[_,x]=Y(!1),[C,S]=Y("vidzee"),[T,N]=Y({imdb:"-",rt:"-"}),[R,$]=Y({status:"",rating:"",watchDate:"",notes:"",region:"",season:1,episode:1,tag:"",platforms:"",genres:""}),[O,F]=Y([]),q="QQQ2oiV5GK9fIM0sjEfgHwMTjGtusEYSy6I8TIfp",w=M=>{if(M.origin==="https://player.vidzee.wtf"&&M.data?.type==="MEDIA_DATA"){const z=M.data.data;localStorage.setItem("vidZeeProgress",JSON.stringify(z))}};on(()=>{document.body.style.overflow="hidden",window.addEventListener("message",w)}),an(()=>{document.body.style.overflow="",window.removeEventListener("message",w)});const v=Ve(()=>[...new Set(n.watchlist.flatMap(M=>ji(M)))].filter(Boolean).sort());Cn(()=>{if(r()){e()||$({status:r().status||"Planned",rating:r().rating||"",watchDate:typeof r().watchDate=="string"?r().watchDate:"",notes:typeof r().notes=="string"?r().notes:"",region:r().region||"International",season:r().season||1,episode:r().episode||1,tag:r().tag||"",platforms:ji(r()).join(", "),genres:Hr(r()).join(", ")}),fetch(`https://api.themoviedb.org/3/${r().media_type||"movie"}/${r().id}?api_key=${Kt}&append_to_response=videos,credits`).then(j=>j.json()).then(j=>{s(j);const H=j?.videos?.results;if(H){let ee=H.find(Ae=>Ae.site==="YouTube"&&Ae.type==="Trailer")||H.find(Ae=>Ae.site==="YouTube"&&Ae.type==="Teaser")||H.find(Ae=>Ae.site==="YouTube");ee&&h(ee.key)}if(!e()&&j.genres&&j.genres.length>0){const ee=j.genres.map(ae=>ae.name).join(", ");Hr(r()).join(", ")||$(ae=>({...ae,genres:ee}))}});const M=r().title||r().name;fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(M)}&apikey=${b0}`).then(j=>j.json()).then(j=>{if(j.Response==="True"){const H=j.Ratings?.find(ee=>ee.Source==="Rotten Tomatoes")?.Value||"-";N({imdb:j.imdbRating||"-",rt:H}),e()||yr(Ct(rt,"users",n.uid,"watchlist",String(r().id)),{imdbRating:j.imdbRating||"-",rtRating:H.replace("%","")})}}),(async()=>{let j=[];try{const de=r().media_type==="tv"?"tv":"movie",ce=await(await fetch(`https://api.watchmode.com/v1/title/${de}-${r().id}/sources/?apiKey=${q}&regions=IN,US`)).json();if(Array.isArray(ce)&&ce.length>0){const Ue=new Set;for(let xe of ce)!Ue.has(xe.name)&&(xe.type==="sub"||xe.type==="free")&&(Ue.add(xe.name),j.push({name:xe.name,logo:xe.logo_100px,url:xe.web_url}))}}catch{}if(j.length===0)try{const pe=await(await fetch(`https://api.themoviedb.org/3/${r().media_type||"movie"}/${r().id}/watch/providers?api_key=${Kt}`)).json(),ce=pe.results?.IN||pe.results?.US;ce&&(ce.flatrate||ce.free||ce.ads)&&(j=[...ce.flatrate||[],...ce.free||[],...ce.ads||[]].map(xe=>{const ne=Sn(xe.provider_name),ke=Eh(M,ne)?.url||pe.results?.IN?.link||`https://www.justwatch.com/in/search?q=${encodeURIComponent(M)}`;return{name:xe.provider_name,logo:`https://image.tmdb.org/t/p/w92${xe.logo_path}`,url:ke}}))}catch{}let H=[];const ee=new Set;j.forEach(de=>{const pe=Sn(de.name);pe&&!ee.has(pe)&&(ee.add(pe),H.push({...de,name:pe}))});const Ae=r().platformsList||[],ae=H.map(de=>de.name);if(Ae.forEach(de=>{const pe=Sn(de);if(!ae.includes(pe)){const ce=Eh(M,pe);ce?H.push({name:ce.name,logo:ce.logo,url:ce.url}):H.push({name:pe,isCss:!0,color:Mx(pe),url:`https://www.google.com/search?q=Watch+${encodeURIComponent(M)}+on+${encodeURIComponent(pe)}`}),ae.push(pe)}}),F(H),!e()&&ae.filter(pe=>!Ae.includes(pe)).length>0){const pe=[...new Set([...Ae,...ae])];await yr(Ct(rt,"users",n.uid,"watchlist",String(r().id)),{platformsList:pe})}})()}});const y=M=>{let z=R().platforms.split(",").map(j=>j.trim()).filter(Boolean);z.includes(M)?z=z.filter(j=>j!==M):z.push(M),$({...R(),platforms:z.join(", ")})},I=async()=>{await yr(Ct(rt,"users",n.uid,"watchlist",String(r().id)),{status:R().status,rating:parseFloat(R().rating)||0,watchDate:R().watchDate,notes:R().notes,region:R().region,season:parseInt(R().season)||1,episode:parseInt(R().episode)||1,tag:R().tag,genresList:R().genres.split(",").map(M=>M.trim()).filter(Boolean),platformsList:R().platforms.split(",").map(M=>Sn(M.trim())).filter(Boolean)}),n.showToast("Saved"),l(!1)},A=Ve(()=>!e()&&r()?.status==="Completed"),k=Ve(()=>A()?100:Math.min((r()?.episode||0)/(r()?.totalEps||1)*100,100)),b=Ve(()=>n.franchises?.filter(M=>r()?.franchises?.[M.id]!==void 0).map(M=>M.name).join(", ")),oe=async()=>{const M=r();if(n.watchlist.some(z=>String(z.id)===String(M.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const z=i().credits?.cast?.slice(0,5).map(ee=>ee.name)||[],j=i().credits?.crew?.find(ee=>ee.job==="Director")?.name||"",H=[...z,j].filter(Boolean);await es(Ct(rt,"users",n.uid,"watchlist",String(M.id)),{id:String(M.id),title:M.title||M.name,media_type:M.media_type||"movie",poster_path:M.poster_path,backdrop_path:M.backdrop_path,release_date:M.release_date||M.first_air_date||"",status:"Planned",addedAt:new Date,castList:H}),n.showToast("Added to Vault! 🍿"),n.onClose()}catch{n.showToast("Error adding to vault.")}},Z=M=>{const z=r().id,j=r().season||1,H=r().episode||1,ee=r().media_type==="tv"?"tv":"movie";switch(M){case"vidzee":return ee==="tv"?`https://player.vidzee.wtf/embed/tv/${z}/${j}/${H}`:`https://player.vidzee.wtf/embed/movie/${z}`;case"vidlink":return ee==="tv"?`https://vidlink.pro/tv/${z}/${j}/${H}?primaryColor=b1a1ff&autoplay=false`:`https://vidlink.pro/movie/${z}?primaryColor=b1a1ff&autoplay=false`;case"vidsrcru":return ee==="tv"?`https://vidsrc.ru/tv/${z}/${j}/${H}?autoplay=true&colour=b1a1ff&autonextepisode=true&backbutton=https://vidsrc.ru/&logo=https://vidsrc.ru/logo.png`:`https://vidsrc.ru/movie/${z}?autoplay=true&colour=b1a1ff&backbutton=https://vidsrc.ru/&logo=https://vidsrc.ru/logo.png`;case"embedsu":return ee==="tv"?`https://embed.su/embed/tv/${z}/${j}/${H}`:`https://embed.su/embed/movie/${z}`;case"vidsrccc":return ee==="tv"?`https://vidsrc.cc/v2/embed/tv/${z}/${j}/${H}`:`https://vidsrc.cc/v2/embed/movie/${z}`;case"autoembed":return ee==="tv"?`https://autoembed.co/tv/tmdb/${z}-${j}-${H}`:`https://autoembed.co/movie/tmdb/${z}`;default:return""}};return(()=>{var M=fx(),z=M.firstChild,j=z.firstChild;return Be(M,"click",n.onClose),g(z,E(B,{get when(){return r()?.backdrop_path},get children(){var H=ix();return X(()=>Fe(H,"src",`https://image.tmdb.org/t/p/w500${r().backdrop_path}`)),H}}),j),g(M,E(B,{get when(){return r()},get children(){var H=hx(),ee=H.firstChild,Ae=ee.nextSibling,ae=Ae.firstChild,de=ae.nextSibling,pe=de.firstChild,ce=pe.firstChild,Ue=ce.firstChild,xe=Ue.nextSibling,ne=xe.firstChild,Oe=pe.nextSibling,ke=Oe.firstChild,Pe=ke.firstChild,Ge=Pe.firstChild,Ot=ke.nextSibling,wt=Ot.firstChild,Pt=wt.firstChild,Ft=Pt.nextSibling,Ut=Ot.nextSibling,yn=Ut.firstChild,On=yn.firstChild;return H.$$click=_e=>_e.stopPropagation(),Be(ee,"click",n.onClose),g(ee,E(G,{name:"close",class:"text-sm text-white"})),g(ae,E(B,{get when(){return!f()},get fallback(){return(()=>{var _e=px();return X(()=>Fe(_e,"src",`https://www.youtube.com/embed/${u()}?autoplay=1&rel=0`)),_e})()},get children(){return[E(B,{get when(){return r().backdrop_path},get fallback(){return(()=>{var _e=gx();return g(_e,E(G,{name:"movie",class:"text-6xl"})),_e})()},get children(){var _e=sx();return X(()=>Fe(_e,"src",`https://image.tmdb.org/t/p/original${r().backdrop_path}`)),_e}}),ox(),E(B,{get when(){return u()},get children(){var _e=ax(),Et=_e.firstChild;return _e.$$click=()=>p(!0),g(Et,E(G,{name:"play_arrow",fill:!0,class:"text-white text-4xl"})),_e}})]}})),g(Ue,()=>r().title||r().name),g(xe,()=>r().release_date||i().release_date||"N/A",ne),g(xe,()=>r().media_type==="tv"?"SERIES":"MOVIE",null),g(xe,E(B,{get when(){return i().runtime||i().episode_run_time?.[0]},get children(){return[" • ",Ze(()=>Nl(i().runtime||i().episode_run_time?.[0]))]}}),null),g(pe,E(B,{get when(){return!e()},get children(){var _e=lx();return _e.$$click=()=>l(!a()),g(_e,E(G,{get name(){return a()?"check":"edit"},class:"text-sm"})),X(()=>Te(_e,`p-2.5 rounded-full border transition-colors shrink-0 ${a()?"bg-[var(--primary)] text-[#0c0e14] border-[var(--primary)]":"glass-surface text-gray-400 hover:text-white"}`)),_e}}),null),g(Pe,E(G,{name:"star",fill:!0,class:"text-[10px] text-[#f5c518]"}),Ge),g(Ge,()=>T().imdb),g(Ft,()=>T().rt),g(yn,E(G,{name:"person",fill:!0,class:"text-[10px] text-[var(--primary)]"}),On),g(On,(()=>{var _e=Ze(()=>!!r().rating);return()=>_e()?`${r().rating}/10`:"-"})()),g(de,E(B,{get when(){return a()},get fallback(){return(()=>{var _e=xx(),Et=_e.firstChild,Mn=Et.firstChild,Qt=Mn.nextSibling;Qt.nextSibling;var et=Et.nextSibling;return g(_e,E(B,{get when(){return!e()},get children(){var ue=mx(),ie=ue.firstChild,me=ie.firstChild,ye=me.firstChild,Ne=ie.nextSibling,De=Ne.nextSibling,ht=De.firstChild;return g(me,E(G,{name:"router",class:"text-[12px] text-[var(--primary)]"}),ye),g(Ne,E(Qe,{each:wh,children:Ce=>(()=>{var gt=Ix(),jt=gt.firstChild;return gt.$$click=Ht=>{Ht.stopPropagation(),S(Ce.id)},g(gt,E(G,{get name(){return Ce.icon},class:"text-[14px]"}),jt),g(gt,()=>Ce.name,null),X(()=>Te(gt,`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm ${C()===Ce.id?"border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] scale-105":"border-white/5 bg-white/5 text-gray-500 hover:text-white"}`)),gt})()})),De.$$click=Ce=>{Ce.preventDefault(),Ce.stopPropagation(),x(!0)},g(De,E(G,{name:"play_circle",fill:!0,class:"text-[18px]"}),ht),ue}}),Et),g(Et,()=>i().overview||(typeof r().overview=="string"?r().overview:"No overview available."),Qt),g(_e,E(B,{get when(){return Ze(()=>!e())()&&r().media_type==="tv"},get children(){var ue=vx(),ie=ue.firstChild,me=ie.firstChild,ye=me.firstChild,Ne=me.nextSibling,De=ie.nextSibling,ht=De.firstChild;return g(me,E(G,{name:"video_library",class:"text-[14px] text-[var(--primary)]"}),ye),g(Ne,(()=>{var Ce=Ze(()=>!!A());return()=>Ce()?"Completed":`S${r().season||1} E${r().episode||1}`})()),g(ue,E(B,{get when(){return!A()},get children(){var Ce=_x();return Ce.$$click=async()=>{let gt=(parseInt(r().episode)||1)+1,jt=r().status==="Planned"?"Watching":r().status;r().totalEps>0&&gt>=r().totalEps&&(jt="Completed",n.showToast("Completed! 🎉")),await yr(Ct(rt,"users",n.uid,"watchlist",String(r().id)),{episode:gt,status:jt})},Ce}}),null),X(Ce=>en(ht,"width",`${k()}%`)),ue}}),et),g(_e,E(B,{get when(){return i().credits},get children(){var ue=yx(),ie=ue.firstChild,me=ie.nextSibling;return g(me,E(Qe,{get each(){return i().credits.cast.slice(0,8)},children:ye=>(()=>{var Ne=Tx(),De=Ne.firstChild,ht=De.nextSibling,Ce=ht.nextSibling;return g(ht,()=>ye.name),g(Ce,()=>ye.character),X(()=>Fe(De,"src",ye.profile_path?`https://image.tmdb.org/t/p/w200${ye.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${ye.name}&backgroundColor=171921`)),Ne})()}),null),g(me,E(Qe,{get each(){return i().credits.crew.filter(ye=>ye.job==="Director"||ye.job==="Producer").slice(0,3)},children:ye=>(()=>{var Ne=Ax(),De=Ne.firstChild,ht=De.nextSibling,Ce=ht.nextSibling;return g(ht,()=>ye.name),g(Ce,()=>ye.job),X(()=>Fe(De,"src",ye.profile_path?`https://image.tmdb.org/t/p/w200${ye.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${ye.name}&backgroundColor=171921`)),Ne})()}),null),ue}}),et),g(et,E(B,{get when(){return!e()},get children(){return E(un,{icon:"adjust",label:"Status",get value(){return(()=>{var ue=Sx();return g(ue,()=>r().status||"Planned"),ue})()}})}}),null),g(et,E(B,{get when(){return!e()},get children(){return E(un,{icon:"calendar_today",label:"Watch Date",get value(){return(()=>{var ue=bh();return g(ue,()=>r().watchDate||"Not set"),ue})()}})}}),null),g(et,E(B,{get when(){return!e()},get children(){return E(un,{icon:"public",label:"Region",get value(){return r().region||"International"}})}}),null),g(et,E(un,{icon:"format_list_bulleted",label:"Genre",get value(){return(()=>{var ue=bh();return g(ue,(()=>{var ie=Ze(()=>!!i().genres);return()=>ie()?i().genres.map(me=>me.name).join(", "):Hr(r()).join(", ")||"N/A"})()),ue})()}}),null),g(et,E(un,{icon:"connected_tv",label:"Available On",get value(){return E(B,{get when(){return O().length>0},get fallback(){return Rx()},get children(){var ue=Cx();return g(ue,E(Qe,{get each(){return O().slice(0,5)},children:ie=>(()=>{var me=$x(),ye=me.firstChild;return g(me,E(B,{get when(){return!ie.isCss},get fallback(){return(()=>{var Ne=Px();return g(Ne,()=>ie.name.charAt(0).toUpperCase()),X(De=>{var ht=ie.color,Ce=ie.color==="#ffffff"?"#000":"#fff";return ht!==De.e&&en(Ne,"background-color",De.e=ht),Ce!==De.t&&en(Ne,"color",De.t=Ce),De},{e:void 0,t:void 0}),Ne})()},get children(){var Ne=kx();return X(()=>Fe(Ne,"src",ie.logo)),Ne}}),ye),g(ye,()=>ie.name),X(()=>Fe(me,"href",ie.url)),me})()})),ue}})}}),null),g(et,E(B,{get when(){return Ze(()=>!e())()&&r().tag},get children(){return E(un,{icon:"label",label:"Tag",get value(){return(()=>{var ue=Nx();return g(ue,()=>r().tag),ue})()}})}}),null),g(et,E(B,{get when(){return Ze(()=>!e())()&&b()},get children(){return E(un,{icon:"folder_special",label:"Lists",get value(){return(()=>{var ue=Dx();return g(ue,b),ue})()}})}}),null),g(et,E(B,{get when(){return Ze(()=>!!(!e()&&r().notes))()&&typeof r().notes=="string"},get children(){var ue=bx(),ie=ue.firstChild,me=ie.firstChild,ye=ie.nextSibling,Ne=ye.firstChild,De=Ne.nextSibling;return De.nextSibling,g(ie,E(G,{name:"edit_note",class:"text-[14px]"}),me),g(ye,()=>r().notes,De),ue}}),null),g(_e,E(B,{get when(){return e()},get children(){var ue=wx(),ie=ue.firstChild;return ue.$$click=oe,g(ue,E(G,{name:"add_circle",class:"text-lg"}),ie),ue}}),null),g(_e,E(B,{get when(){return!e()},get children(){var ue=Ex(),ie=ue.firstChild,me=ie.firstChild;return ie.$$click=async()=>{confirm("Permanently delete?")&&(await If(Ct(rt,"users",n.uid,"watchlist",String(r().id))),n.showToast("Deleted"),n.onClose())},g(ie,E(G,{name:"delete",class:"text-sm"}),me),ue}}),null),_e})()},get children(){var _e=ux(),Et=_e.firstChild,Mn=Et.firstChild,Qt=Mn.firstChild,et=Qt.nextSibling,ue=Mn.nextSibling,ie=ue.firstChild,me=ie.nextSibling,ye=Et.nextSibling,Ne=ye.firstChild,De=Ne.firstChild,ht=De.nextSibling,Ce=Ne.nextSibling,gt=Ce.firstChild,jt=gt.nextSibling,Ht=ye.nextSibling,hr=Ht.firstChild,Ln=hr.nextSibling,bn=Ht.nextSibling,Pr=bn.firstChild,dr=Pr.nextSibling,Yt=bn.nextSibling,J=Yt.firstChild,je=J.nextSibling,Me=Yt.nextSibling,st=Me.firstChild,tt=st.nextSibling,ge=Me.nextSibling;return et.addEventListener("change",re=>$({...R(),status:re.target.value})),me.addEventListener("change",re=>$({...R(),rating:re.target.value})),g(_e,E(B,{get when(){return r().media_type==="tv"},get children(){var re=cx(),We=re.firstChild,be=We.firstChild,mt=be.nextSibling,Ye=We.nextSibling,ft=Ye.firstChild,Nt=ft.nextSibling;return mt.$$input=Dt=>$({...R(),season:Dt.target.value}),Nt.$$input=Dt=>$({...R(),episode:Dt.target.value}),X(()=>mt.value=R().season),X(()=>Nt.value=R().episode),re}}),ye),ht.$$input=re=>$({...R(),watchDate:re.target.value}),jt.addEventListener("change",re=>$({...R(),region:re.target.value})),Ln.$$input=re=>$({...R(),tag:re.target.value}),g(dr,E(Qe,{get each(){return v()},children:re=>(()=>{var We=Vx();return We.$$click=()=>y(re),g(We,re),X(()=>Te(We,`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors shadow-sm active:scale-95 ${R().platforms.split(",").map(be=>be.trim()).includes(re)?"bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14]":"bg-white/5 text-gray-400 hover:text-white border border-white/5"}`)),We})()})),je.$$input=re=>$({...R(),genres:re.target.value}),tt.$$input=re=>$({...R(),notes:re.target.value}),ge.$$click=I,X(()=>et.value=R().status),X(()=>me.value=R().rating),X(()=>ht.value=R().watchDate),X(()=>jt.value=R().region),X(()=>Ln.value=R().tag),X(()=>je.value=R().genres||(i().genres?i().genres.map(re=>re.name).join(", "):"")),X(()=>tt.value=R().notes),_e}}),null),H}}),null),g(M,E(B,{get when(){return _()},get children(){var H=dx(),ee=H.firstChild,Ae=ee.firstChild,ae=Ae.firstChild,de=ae.nextSibling,pe=Ae.nextSibling,ce=pe.firstChild,Ue=ce.firstChild,xe=ee.nextSibling,ne=xe.firstChild,Oe=ne.firstChild,ke=ne.nextSibling;return H.$$click=Pe=>Pe.stopPropagation(),ae.$$click=Pe=>{Pe.stopPropagation(),x(!1)},g(ae,E(G,{name:"arrow_back",class:"text-sm"})),g(de,()=>r().title||r().name),g(ce,E(G,{name:"router",class:"text-gray-400 text-[14px]"}),Ue),Ue.addEventListener("change",Pe=>{Pe.stopPropagation(),S(Pe.target.value)}),g(Ue,E(Qe,{each:wh,children:Pe=>(()=>{var Ge=Ox();return g(Ge,()=>Pe.name),X(()=>Ge.value=Pe.id),Ge})()})),g(ce,E(G,{name:"expand_more",class:"text-gray-400 text-[14px] absolute right-1 pointer-events-none"}),null),g(ne,E(G,{name:"dns",class:"text-[var(--primary)] text-4xl animate-pulse"}),Oe),X(()=>Fe(ke,"src",Z(C()))),X(()=>Ue.value=C()),H}}),null),M})()}zt(["click","input"]);var Fx=D('<div class="flex gap-4 p-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0"><img class="w-28 h-40 object-cover rounded-xl shadow-lg border border-white/10 shrink-0"><div class="flex-1 overflow-hidden"><h2 class="text-2xl font-black text-white truncate"></h2><p class="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest mt-1 mb-2"> • </p><div class="h-20 overflow-y-auto hide-scrollbar text-xs text-gray-400 leading-relaxed pr-2">'),Ux=D('<div class="flex flex-wrap justify-between items-center p-4 bg-[#0c0e14] border-b border-white/5 gap-3 shrink-0"><div class="flex bg-black/50 p-1 rounded-xl border border-white/5"><button>Movies</button><button>TV Shows</button></div><div class="flex items-center gap-2 bg-black/50 border border-white/5 rounded-xl px-3 py-1.5"><select class="bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none cursor-pointer"><option value=popularity class=bg-[#0c0e14]>Most Popular</option><option value=release_desc class=bg-[#0c0e14]>Release (New → Old)</option><option value=release_asc class=bg-[#0c0e14]>Release (Old → New)'),jx=D('<div class="text-center p-10 text-gray-500 font-bold text-sm">No items found.'),Bx=D('<div class="flex-1 overflow-y-auto p-4 hide-scrollbar"><div class="grid grid-cols-3 sm:grid-cols-4 gap-4">'),qx=D('<div class="flex-1 flex items-center justify-center">'),Gx=D('<div class="fixed inset-0 z-[9999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"><div class="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none"></div><div class="w-full max-w-3xl bg-[#08090b] sm:rounded-[2rem] rounded-t-[2rem] border border-white/10 relative h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-pop-in"><button class="absolute top-4 right-4 z-50 bg-black/50 p-2.5 rounded-full hover:bg-black border border-white/10 active:scale-95 transition-all">'),zx=D('<button class="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--primary)] hover:text-[#0c0e14] hover:border-[var(--primary)] transition-all active:scale-95 z-10 text-white shadow-lg">'),Hx=D('<div class="absolute top-2 right-2 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-[#0c0e14] shadow-lg z-10">'),Wx=D('<div class="relative group cursor-pointer animate-fade-in"><img class="w-full aspect-[2/3] object-cover rounded-xl shadow-lg border border-white/10 group-hover:border-[var(--primary)] transition-all"><div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent rounded-xl flex flex-col justify-end p-2 pointer-events-none"><p class="text-[9px] font-black text-white truncate leading-tight"></p><p class="text-[8px] text-[var(--primary)] font-bold">');function Kx(n){const[e,t]=Y(null),[r,i]=Y({cast:[],crew:[]}),[s,a]=Y("movie"),[l,u]=Y("popularity");on(()=>document.body.style.overflow="hidden"),an(()=>document.body.style.overflow=""),Cn(()=>{n.personId&&fetch(`https://api.themoviedb.org/3/person/${n.personId}?api_key=${Kt}&append_to_response=combined_credits`).then(p=>p.json()).then(p=>{t(p),i(p.combined_credits||{cast:[],crew:[]})})});const h=Ve(()=>{if(!e())return[];let x=(e().known_for_department==="Directing"?r().crew.filter(T=>T.job==="Director"):r().cast).filter(T=>T.media_type===s());const C=[],S=new Set;return x.forEach(T=>{S.has(T.id)||(S.add(T.id),C.push(T))}),C.sort((T,N)=>{if(l()==="popularity")return N.popularity-T.popularity;const R=new Date(T.release_date||T.first_air_date||"1900-01-01").getTime(),$=new Date(N.release_date||N.first_air_date||"1900-01-01").getTime();return l()==="release_desc"?$-R:R-$})}),f=async(p,_)=>{if(_.stopPropagation(),n.watchlist.some(x=>String(x.id)===String(p.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const x=await(await fetch(`https://api.themoviedb.org/3/${p.media_type}/${p.id}?api_key=${Kt}&append_to_response=credits`)).json(),C=x.credits?.cast?.slice(0,5).map(N=>N.name)||[],S=x.credits?.crew?.find(N=>N.job==="Director")?.name||"",T=[...C,S].filter(Boolean);await es(Ct(rt,"users",n.uid,"watchlist",String(p.id)),{id:String(p.id),title:p.title||p.name,media_type:p.media_type,poster_path:p.poster_path,backdrop_path:p.backdrop_path,release_date:p.release_date||p.first_air_date||"",status:"Planned",addedAt:new Date,castList:T}),n.showToast("Added Successfully! 🍿")}catch{n.showToast("Error adding to vault.")}};return(()=>{var p=Gx(),_=p.firstChild,x=_.nextSibling,C=x.firstChild;return Be(p,"click",n.onClose),x.$$click=S=>S.stopPropagation(),Be(C,"click",n.onClose),g(C,E(G,{name:"close",class:"text-sm text-white"})),g(x,E(B,{get when(){return e()},get children(){return[(()=>{var S=Fx(),T=S.firstChild,N=T.nextSibling,R=N.firstChild,$=R.nextSibling,O=$.firstChild,F=$.nextSibling;return g(R,()=>e().name),g($,()=>e().known_for_department,O),g($,()=>e().birthday||"Unknown",null),g($,(()=>{var q=Ze(()=>!!e().deathday);return()=>q()?` → ${e().deathday}`:""})(),null),g(F,()=>e().biography||"No biography available."),X(()=>Fe(T,"src",e().profile_path?`https://image.tmdb.org/t/p/w300${e().profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(e().name)}&backgroundColor=171921`)),S})(),(()=>{var S=Ux(),T=S.firstChild,N=T.firstChild,R=N.nextSibling,$=T.nextSibling,O=$.firstChild;return N.$$click=()=>a("movie"),R.$$click=()=>a("tv"),g($,E(G,{name:"sort",class:"text-gray-500 text-[14px]"}),O),O.addEventListener("change",F=>u(F.target.value)),X(F=>{var q=`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${s()==="movie"?"bg-[var(--primary)] text-[#0c0e14]":"text-gray-500 hover:text-white"}`,w=`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${s()==="tv"?"bg-[var(--primary)] text-[#0c0e14]":"text-gray-500 hover:text-white"}`;return q!==F.e&&Te(N,F.e=q),w!==F.t&&Te(R,F.t=w),F},{e:void 0,t:void 0}),X(()=>O.value=l()),S})(),(()=>{var S=Bx(),T=S.firstChild;return g(T,E(Qe,{get each(){return h()},children:N=>{const R=n.watchlist.some($=>String($.id)===String(N.id));return(()=>{var $=Wx(),O=$.firstChild,F=O.nextSibling,q=F.firstChild,w=q.nextSibling;return $.$$click=()=>n.openPreview(N,"fromPerson"),g(q,()=>N.title||N.name),g(w,()=>(N.release_date||N.first_air_date||"").substring(0,4)),g($,E(B,{when:!R,get children(){var v=zx();return v.$$click=y=>f(N,y),g(v,E(G,{name:"add",class:"text-sm"})),v}}),null),g($,E(B,{when:R,get children(){var v=Hx();return g(v,E(G,{name:"check",class:"text-sm"})),v}}),null),X(()=>Fe(O,"src",N.poster_path?`https://image.tmdb.org/t/p/w342${N.poster_path}`:"https://via.placeholder.com/342x513/171921/b1a1ff?text=No+Poster")),$})()}})),g(S,E(B,{get when(){return h().length===0},get children(){return jx()}}),null),S})()]}}),null),g(x,E(B,{get when(){return!e()},get children(){var S=qx();return g(S,E(G,{name:"radar",class:"text-[var(--primary)] text-5xl animate-spin opacity-50"})),S}}),null),p})()}zt(["click"]);var Qx=D('<button class="text-gray-500 hover:text-white active:scale-95">'),Yx=D('<div class="flex flex-col items-center justify-center p-12 gap-4 opacity-50"><p class="text-[10px] uppercase font-black tracking-widest text-[var(--primary)]">Scanning Database...'),Jx=D('<div class="text-center p-12 text-gray-500"><p class="text-sm font-bold">No results found in this universe.'),Xx=D('<div class="fixed inset-0 bg-black/70 backdrop-blur-md p-4 pt-16 sm:pt-24 z-[999999] flex justify-center items-start animate-fade-in"><div class="w-full max-w-2xl mx-auto glass-surface rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col max-h-[75vh] border border-white/10 animate-pop-in bg-[#08090b]/95"><div class="p-5 border-b border-white/5 flex gap-4 items-center bg-gradient-to-b from-white/5 to-transparent"><input autofocus placeholder="Search movies, series, actors..."class="bg-transparent border-none w-full outline-none text-white text-xl font-medium placeholder-gray-600"><button class="bg-white/10 p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all ml-2"></button></div><div class="overflow-y-auto p-3 hide-scrollbar relative"><div class=space-y-2>'),Zx=D('<div class="flex items-center gap-4 p-3 glass-surface rounded-[1.5rem] border border-transparent hover:border-[var(--primary)]/30 hover:bg-white/5 transition-all cursor-pointer group shadow-sm"><img class="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-[var(--primary)] shrink-0"><div class="flex-1 min-w-0"><p class="font-black text-base text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-1"></p><p class="text-[9px] text-[var(--primary)] uppercase font-black tracking-widest mt-0.5">'),eI=D('<img class="w-14 h-20 rounded-xl object-cover shadow-md bg-[#171921] shrink-0">'),tI=D('<div><div class="flex flex-col justify-center flex-1 py-1 min-w-0"><p class="font-black text-base text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-1"></p><div class="flex items-center gap-2 mt-1.5"><span class="text-[8px] bg-white/10 text-gray-300 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-white/5"></span><span class="text-[10px] text-gray-500 font-bold"></span></div></div><div class="self-center pr-2 shrink-0"><button>'),nI=D('<div class="w-14 h-20 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 bg-[#171921] shrink-0">');function rI(n){const[e,t]=Y(""),[r,i]=Y([]),[s,a]=Y(!1),[l,u]=Y(null);on(()=>{document.body.style.overflow="hidden"}),an(()=>{document.body.style.overflow=""}),Cn(()=>{const p=e();if(p.length<2)return i([]);a(!0);const _=setTimeout(async()=>{try{const C=await(await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Kt}&query=${encodeURIComponent(p)}`)).json();i((C.results||[]).filter(S=>S.media_type==="movie"||S.media_type==="tv"||S.media_type==="person"))}catch{}a(!1)},500);return()=>clearTimeout(_)});const h=async(p,_)=>{if(_&&_.stopPropagation(),n.watchlist.some(x=>String(x.id)===String(p.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const C=await(await fetch(`https://api.themoviedb.org/3/${p.media_type}/${p.id}?api_key=${Kt}&append_to_response=watch/providers,credits`)).json(),S=C.credits?.cast?.slice(0,5).map(R=>R.name)||[],T=C.credits?.crew?.find(R=>R.job==="Director")?.name||"",N=[...S,T].filter(Boolean);await es(Ct(rt,"users",n.uid,"watchlist",String(p.id)),{id:p.id,title:p.title||p.name||"",poster_path:p.poster_path,backdrop_path:p.backdrop_path,media_type:p.media_type,status:"Planned",addedAt:bl(),castList:N,platformsList:[...new Set((C["watch/providers"]?.results?.IN?.flatrate||[]).map(R=>Sn(R.provider_name)))].filter(Boolean).slice(0,3),genresList:(C.genres||[]).map(R=>R.name),release_date:p.release_date||p.first_air_date||"",region:C.origin_country?.includes("IN")?"Indian":"International",season:1,episode:0,totalEps:C.number_of_episodes||0,runtime:C.runtime||C.episode_run_time?.[0]||0}),n.showToast("Added to Vault! 🍿"),n.onClose()}catch{n.showToast("Error adding to vault.")}},f=p=>{u(null),setTimeout(()=>n.openPreview(p,"fromPerson"),50)};return(()=>{var p=Xx(),_=p.firstChild,x=_.firstChild,C=x.firstChild,S=C.nextSibling,T=x.nextSibling,N=T.firstChild;return Be(p,"click",n.onClose),_.$$click=R=>R.stopPropagation(),g(x,E(G,{name:"search",class:"text-[var(--primary)] text-2xl"}),C),C.$$input=R=>t(R.target.value),g(x,E(B,{get when(){return e().length>0},get children(){var R=Qx();return R.$$click=()=>t(""),g(R,E(G,{name:"backspace",class:"text-sm"})),R}}),S),Be(S,"click",n.onClose),g(S,E(G,{name:"close",class:"text-white text-sm"})),g(T,E(B,{get when(){return s()},get children(){var R=Yx(),$=R.firstChild;return g(R,E(G,{name:"radar",class:"text-[var(--primary)] text-5xl animate-spin"}),$),R}}),N),g(T,E(B,{get when(){return Ze(()=>!s()&&e().length>=2)()&&r().length===0},get children(){var R=Jx(),$=R.firstChild;return g(R,E(G,{name:"sentiment_dissatisfied",class:"text-5xl mb-3 opacity-30"}),$),R}}),N),g(N,E(Qe,{get each(){return r()},children:R=>{if(R.media_type==="person")return(()=>{var O=Zx(),F=O.firstChild,q=F.nextSibling,w=q.firstChild,v=w.nextSibling;return O.$$click=()=>u(R.id),g(w,()=>R.name),g(v,()=>R.known_for_department==="Directing"?"[DIRECTOR]":"[ACTOR]"),g(O,E(G,{name:"chevron_right",class:"text-gray-500 group-hover:text-[var(--primary)] shrink-0"}),null),X(()=>Fe(F,"src",R.profile_path?`https://image.tmdb.org/t/p/w92${R.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(R.name)}&backgroundColor=171921`)),O})();const $=n.watchlist.some(O=>String(O.id)===String(R.id));return(()=>{var O=tI(),F=O.firstChild,q=F.firstChild,w=q.nextSibling,v=w.firstChild,y=v.nextSibling,I=F.nextSibling,A=I.firstChild;return O.$$click=()=>!$&&n.openPreview(R),Te(O,`flex gap-4 p-3 glass-surface rounded-[1.5rem] border border-transparent hover:border-[var(--primary)]/30 hover:bg-white/5 transition-all ${$?"opacity-60":"cursor-pointer"} group shadow-sm`),g(O,E(B,{get when(){return R.poster_path},get fallback(){return(()=>{var k=nI();return g(k,E(G,{name:"movie",class:"text-gray-600"})),k})()},get children(){var k=eI();return X(()=>Fe(k,"src",`https://image.tmdb.org/t/p/w200${R.poster_path}`)),k}}),F),g(q,()=>R.title||R.name),g(v,()=>R.media_type==="tv"?"Series":"Movie"),g(y,()=>(R.release_date||R.first_air_date||"").split("-")[0]),A.$$click=k=>h(R,k),A.disabled=$,Te(A,`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${$?"bg-[var(--primary)] text-[#08090b]":"bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[#08090b]"}`),g(A,E(G,{name:$?"check":"add",class:"text-xl font-black"})),O})()}})),g(p,E(B,{get when(){return l()},get children(){return E(Kx,{get personId(){return l()},get uid(){return n.uid},get watchlist(){return n.watchlist},get showToast(){return n.showToast},onClose:()=>u(null),openPreview:f})}}),null),X(()=>C.value=e()),p})()}zt(["click","input"]);var iI=D('<button><div class="w-6 h-6 rounded-full shadow-lg"></div><span class=font-bold>'),sI=D('<div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[999999]"><div class="glass-surface w-full max-w-sm rounded-3xl p-6 border border-white/10 animate-pop-in"><div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-lg flex items-center gap-2"> Themes</h3><button></button></div><div class="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">'),oI=D('<div class="fixed inset-0 bg-black/98 flex items-center justify-center p-4 z-[9999999] animate-pop-in"><div class="bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[#0c0e14] w-full max-w-sm h-[500px] rounded-[3rem] p-10 text-center flex flex-col justify-between shadow-2xl relative overflow-hidden"><div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div><div class="mt-4 relative z-10"><h4 class="text-white/80 font-bold uppercase text-[10px] mb-3 tracking-widest">My Cinelog Wrapped</h4><h2 class="text-4xl font-black font-headline text-white mb-8 leading-tight">I spent <br><span class="text-[#0c0e14] bg-white px-3 py-1 mt-2 inline-block rounded-lg shadow-lg"> Days</span><br> in another universe.</h2><div class="space-y-4 text-left bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10"><div><p class="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Masterpieces Finished</p><p class="text-2xl font-black text-white"> Titles</p></div><div><p class="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Favorite Vibe</p><p class="text-2xl font-black text-[var(--secondary)]"></p></div></div></div><button class="text-white bg-black/30 p-4 rounded-full mx-auto hover:bg-black transition-colors active:scale-95 relative z-10">'),aI=D('<div class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-lg bg-[#08090b]/95 rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative animate-pop-in overflow-hidden"><div class="absolute -top-20 -right-20 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[80px] pointer-events-none"></div><div class="flex justify-between items-center mb-8 relative z-10"><h2 class="text-3xl font-headline font-black text-white drop-shadow-md">Insights</h2><button class="bg-white/5 p-3 rounded-full hover:bg-white/10 active:scale-95 transition-all"></button></div><div class="flex justify-center mb-10 relative z-10"><div class="relative w-48 h-48 flex items-center justify-center rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0c0e14]"><svg class="absolute inset-0 w-full h-full -rotate-90 rounded-full"viewBox="0 0 100 100"><circle cx=50 cy=50 r=45 fill=none stroke=rgba(255,255,255,0.05) stroke-width=8 stroke-dasharray=283 stroke-dashoffset=0></circle><circle cx=50 cy=50 r=45 fill=none stroke=var(--primary) stroke-width=8 stroke-linecap=round stroke-dasharray=283 stroke-dashoffset=60 class=drop-shadow-[0_0_10px_var(--primary)]></circle></svg><div class=text-center><p class="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-widest">Watch Time</p><span class="text-5xl font-black font-headline text-white"><span class="text-sm text-gray-400 ml-1">d</span></span><div class="text-xl font-bold text-[var(--secondary)] mt-1"><span class="text-[10px] uppercase text-gray-500 ml-1">hrs</span></div></div></div></div><button class="w-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2 active:scale-95 transition-transform relative z-10"> Open Wrapped</button><div class="glass-surface rounded-[1.5rem] p-6 border border-white/5 relative z-10"><h3 class="font-bold mb-5 flex items-center gap-2 text-white"> Favorite Vibes</h3><div class=space-y-4>'),lI=D('<div><div class="flex justify-between text-[10px] font-black uppercase mb-1.5 text-gray-400 tracking-widest"><span></span><span class=text-gray-500> titles</span></div><div class="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div class="h-full bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]">');const cI=n=>(()=>{var e=iI(),t=e.firstChild,r=t.nextSibling;return e.$$click=()=>{n.set(n.id),n.onClose()},g(r,()=>n.name),X(i=>{var s=`w-full p-4 rounded-xl border ${n.curr===n.id?"border-[var(--primary)] bg-[var(--primary)]/10":"border-white/5 hover:bg-white/5"} flex gap-4 items-center transition-colors`,a=n.hex;return s!==i.e&&Te(e,i.e=s),a!==i.t&&en(t,"background",i.t=a),i},{e:void 0,t:void 0}),e})();function uI(n){on(()=>document.body.style.overflow="hidden"),an(()=>document.body.style.overflow="");const e=[{id:"sage",n:"Sage",h:"#b1a1ff"},{id:"matrix",n:"Matrix",h:"#00ff41"},{id:"netflix",n:"Netflix",h:"#e50914"},{id:"cyberpunk",n:"Cyberpunk",h:"#fce205"},{id:"interstellar",n:"Interstellar",h:"#38bdf8"},{id:"neonhorizon",n:"Neon Horizon",h:"#f472b6"},{id:"vibranium",n:"Vibranium",h:"#7c3aed"}];return(()=>{var t=sI(),r=t.firstChild,i=r.firstChild,s=i.firstChild,a=s.firstChild,l=s.nextSibling,u=i.nextSibling;return Be(t,"click",n.onClose),r.$$click=h=>h.stopPropagation(),g(s,E(G,{name:"palette",class:"text-[var(--primary)]"}),a),Be(l,"click",n.onClose),g(l,E(G,{name:"close",class:"text-gray-500 hover:text-white"})),g(u,E(Qe,{each:e,children:h=>E(cI,{get id(){return h.id},get name(){return h.n},get hex(){return h.h},get curr(){return n.currentTheme},get set(){return n.setTheme},get onClose(){return n.onClose}})})),t})()}function hI(n){const[e,t]=Y(!1);on(()=>{document.body.style.overflow="hidden"}),an(()=>{document.body.style.overflow=""});const r=Ve(()=>{let i=0;const s={},a={},l=n.watchlist().filter(f=>f.status==="Completed");l.forEach(f=>{i+=(parseInt(f.runtime)||0)*(f.media_type==="tv"&&parseInt(f.episode)||1),Hr(f).forEach(p=>s[p]=(s[p]||0)+1),ji(f).forEach(p=>a[p]=(a[p]||0)+1)});const u=Object.entries(s).sort((f,p)=>p[1]-f[1]).slice(0,5),h=Object.entries(a).sort((f,p)=>p[1]-f[1]).slice(0,5);return{days:Math.floor(i/1440),hours:Math.floor(i%1440/60),total:l.length,topGenre:u[0]?.[0]||"N/A",topG:u,topP:h,maxG:u[0]?.[1]||1,maxP:h[0]?.[1]||1}});return(()=>{var i=aI(),s=i.firstChild,a=s.firstChild,l=a.nextSibling,u=l.firstChild,h=u.nextSibling,f=l.nextSibling,p=f.firstChild,_=p.firstChild,x=_.nextSibling,C=x.firstChild,S=C.nextSibling,T=S.firstChild,N=S.nextSibling,R=N.firstChild,$=f.nextSibling,O=$.firstChild,F=$.nextSibling,q=F.firstChild,w=q.firstChild,v=q.nextSibling;return Be(i,"click",n.onClose),s.$$click=y=>y.stopPropagation(),Be(h,"click",n.onClose),g(h,E(G,{name:"close",class:"text-white"})),g(S,()=>r().days,T),g(N,()=>r().hours,R),$.$$click=()=>t(!0),g($,E(G,{name:"auto_awesome"}),O),g(q,E(G,{name:"pie_chart",class:"text-[var(--primary)]"}),w),g(v,E(Qe,{get each(){return r().topG},children:([y,I])=>(()=>{var A=lI(),k=A.firstChild,b=k.firstChild,oe=b.nextSibling,Z=oe.firstChild,M=k.nextSibling,z=M.firstChild;return g(b,y),g(oe,I,Z),X(j=>en(z,"width",`${I/r().maxG*100}%`)),A})()})),g(i,E(B,{get when(){return e()},get children(){var y=oI(),I=y.firstChild,A=I.firstChild,k=A.nextSibling,b=k.firstChild,oe=b.nextSibling,Z=oe.firstChild,M=Z.nextSibling,z=M.nextSibling,j=z.firstChild,H=oe.nextSibling,ee=H.firstChild,Ae=ee.firstChild,ae=Ae.nextSibling,de=ae.firstChild,pe=ee.nextSibling,ce=pe.firstChild,Ue=ce.nextSibling,xe=k.nextSibling;return y.$$click=()=>t(!1),I.$$click=ne=>ne.stopPropagation(),g(z,()=>r().days,j),g(ae,()=>r().total,de),g(Ue,()=>r().topGenre),xe.$$click=()=>t(!1),g(xe,E(G,{name:"close"})),y}}),null),i})()}zt(["click"]);var dI=D('<div class="fixed inset-0 z-[90]">'),fI=D('<div class="fixed top-16 right-6 w-48 glass-surface rounded-2xl shadow-2xl py-2 z-[100] animate-pop-in border border-white/10 overflow-hidden"><button class="w-full text-left px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-white/5 flex items-center gap-3"> Insights</button><div class="border-t border-white/5 my-1"></div><button class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"> Data Sync</button><button class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"> Logout</button><div class="border-t border-white/5 my-1"></div><button class="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3"> Nuke Vault'),pI=D('<div class="fixed bottom-28 left-1/2 -translate-x-1/2 glass-surface border border-[var(--primary)] text-white px-6 py-3 rounded-full shadow-2xl z-[999999] flex gap-2 items-center text-sm font-bold whitespace-nowrap animate-pop-in"> '),gI=D('<div class="h-screen flex flex-col items-center justify-center p-10 text-center"><h2 class="text-xl font-bold text-white mb-2">Something broke!</h2><p class="text-xs text-gray-500 mb-6"></p><button class="bg-red-500 text-white px-6 py-2 rounded-lg font-bold">Reload App'),mI=D('<div class="h-screen flex flex-col items-center justify-center p-6 text-center"><h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-4 tracking-tighter">CINELOG</h1><p class="text-gray-400 mb-10 text-sm">Ultimate Edition</p><button class="bg-[var(--primary)] text-black font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">Sign In with Google');function _I(){const[n,e]=Y(null),[t,r]=Y([]),[i,s]=Y([]),[a,l]=Y("dashboard"),[u,h]=Y(localStorage.getItem("cinelog_theme")||"sage"),[f,p]=Y(!0),[_,x]=Y(!0),[C,S]=Y("all"),[T,N]=Y(!1),[R,$]=Y(null),[O,F]=Y(null),[q,w]=Y(!1),[v,y]=Y(!1),[I,A]=Y(!1),[k,b]=Y({show:!1,msg:""}),oe=M=>{b({show:!0,msg:M}),setTimeout(()=>b({show:!1,msg:""}),3e3)};Cn(()=>{document.body.className=`theme-${u()}`,localStorage.setItem("cinelog_theme",u())}),Cn(()=>{a(),window.scrollTo(0,0)}),on(()=>{setTimeout(()=>x(!1),3e3),xb(ia,M=>{if(e(M),M){let z=!1,j=!1;Vu(Cy(Ps(rt,"users",M.uid,"watchlist"),Ry("addedAt","desc")),H=>{r(H.docs.map(ee=>({id:ee.id,...ee.data()}))),z=!0,j&&p(!1)}),Vu(Ps(rt,"users",M.uid,"franchises"),H=>{s(H.docs.map(ee=>({id:ee.id,...ee.data()}))),j=!0,z&&p(!1)})}else p(!1)})});const Z=async()=>{if(confirm("DANGER: Entire Vault will be wiped. Sure?")){oe("Nuking Vault...");const z=(await Py(Ps(rt,"users",n().uid,"watchlist"))).docs;for(let j=0;j<z.length;j+=500){const H=Tf(rt);z.slice(j,j+500).forEach(ee=>H.delete(ee.ref)),await H.commit()}oe("Vault wiped!"),A(!1)}};return E(Fp,{fallback:M=>(()=>{var z=gI(),j=z.firstChild,H=j.nextSibling,ee=H.nextSibling;return g(z,E(G,{name:"error",class:"text-red-500 text-6xl mb-4"}),j),g(H,()=>M.toString()),ee.$$click=()=>window.location.reload(),z})(),get children(){return E(B,{get when(){return Ze(()=>!f())()&&!_()},get fallback(){return E(E0,{})},get children(){return E(B,{get when(){return n()},get fallback(){return(()=>{var M=mI(),z=M.firstChild,j=z.nextSibling,H=j.nextSibling;return H.$$click=()=>Gb(ia,new In),M})()},get children(){return[E(z0,{user:n,watchlist:t,view:a,setView:l,openMovie:$,setActiveVaultStatus:S,showToast:oe,onUserClick:M=>{M.stopPropagation(),A(!I())},onSettingsClick:()=>w(!0),onStatsClick:()=>y(!0),onSearchClick:()=>N(!0),get children(){return[E(B,{get when(){return a()==="watchlist"},get children(){return E(iE,{watchlist:t,openMovie:$,get activeStatus(){return C()},onFilterChange:S})}}),E(B,{get when(){return a()==="franchises"},get children(){return E(TE,{watchlist:t,franchises:i,get uid(){return n().uid},openMovie:$,showToast:oe})}}),E(B,{get when(){return a()==="upcoming"},get children(){return E(QE,{watchlist:t,get uid(){return n().uid},showToast:oe})}}),E(B,{get when(){return a()==="sync"},get children(){return E(rx,{watchlist:t,get uid(){return n().uid},showToast:oe})}})]}}),E(B,{get when(){return I()},get children(){return[(()=>{var M=dI();return M.$$click=()=>A(!1),M})(),(()=>{var M=fI(),z=M.firstChild,j=z.firstChild,H=z.nextSibling,ee=H.nextSibling,Ae=ee.firstChild,ae=ee.nextSibling,de=ae.firstChild,pe=ae.nextSibling,ce=pe.nextSibling,Ue=ce.firstChild;return z.$$click=()=>{y(!0),A(!1)},g(z,E(G,{name:"bar_chart",class:"text-[18px]"}),j),ee.$$click=()=>{l("sync"),A(!1)},g(ee,E(G,{name:"import_export",class:"text-[18px]"}),Ae),ae.$$click=()=>Ib(ia),g(ae,E(G,{name:"logout",class:"text-[18px]"}),de),ce.$$click=Z,g(ce,E(G,{name:"delete_forever",class:"text-[18px]"}),Ue),M})()]}}),E(B,{get when(){return T()},get children(){return E(rI,{onClose:()=>N(!1),get uid(){return n().uid},showToast:oe,get watchlist(){return t()},openPreview:(M,z)=>{z!=="fromPerson"&&N(!1),F(z||"search"),$(`PREVIEW_${JSON.stringify(M)}`)}})}}),E(B,{get when(){return R()},get children(){return E(Lx,{get id(){return R()},get watchlist(){return t()},get franchises(){return i()},onClose:()=>{const M=O();$(null),F(null),M==="fromPerson"&&N(!0)},get uid(){return n().uid},showToast:oe,theme:u})}}),E(B,{get when(){return v()},get children(){return E(hI,{watchlist:t,onClose:()=>y(!1)})}}),E(B,{get when(){return q()},get children(){return E(uI,{get currentTheme(){return u()},setTheme:h,onClose:()=>w(!1)})}}),E(B,{get when(){return k().show},get children(){var M=pI(),z=M.firstChild;return g(M,E(G,{name:"check_circle",class:"text-[var(--primary)]",fill:!0}),z),g(M,()=>k().msg,null),M}})]}})}})}})}zt(["click"]);jp(()=>E(_I,{}),document.getElementById("root"));
