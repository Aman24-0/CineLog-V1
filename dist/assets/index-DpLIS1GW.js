(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Ap=!1,Sp=(n,e)=>n===e,Cp=Symbol("solid-track"),js={equals:Sp};let Ii=null,Eh=Ah;const Mn=1,Bs=2,Ih={owned:null,cleanups:null,context:null,owner:null};var He=null;let Ho=null,Rp=null,st=null,Rt=null,sn=null,uo=0;function Cs(n,e){const t=st,r=He,i=n.length===0,s=e===void 0?r:e,a=i?Ih:{owned:null,cleanups:null,context:s?s.context:null,owner:s},l=i?n:()=>n(()=>yn(()=>$i(a)));He=a,st=null;try{return Hi(l,!0)}finally{st=t,He=r}}function Y(n,e){e=e?Object.assign({},js,e):js;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=i=>(typeof i=="function"&&(i=i(t.value)),xh(t,i));return[Th.bind(t),r]}function X(n,e,t){const r=ho(n,e,!1,Mn);zi(r)}function $n(n,e,t){Eh=Np;const r=ho(n,e,!1,Mn);r.user=!0,sn?sn.push(r):zi(r)}function Le(n,e,t){t=t?Object.assign({},js,t):js;const r=ho(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,zi(r),Th.bind(r)}function yn(n){if(st===null)return n();const e=st;st=null;try{return n()}finally{st=e}}function ln(n){$n(()=>yn(n))}function cn(n){return He===null||(He.cleanups===null?He.cleanups=[n]:He.cleanups.push(n)),n}function kp(n,e){Ii||(Ii=Symbol("error")),He=ho(void 0,void 0,!0),He.context={...He.context,[Ii]:[e]};try{return n()}catch(t){fo(t)}finally{He=He.owner}}function Th(){if(this.sources&&this.state)if(this.state===Mn)zi(this);else{const n=Rt;Rt=null,Hi(()=>Gs(this),!1),Rt=n}if(st){const n=this.observers?this.observers.length:0;st.sources?(st.sources.push(this),st.sourceSlots.push(n)):(st.sources=[this],st.sourceSlots=[n]),this.observers?(this.observers.push(st),this.observerSlots.push(st.sources.length-1)):(this.observers=[st],this.observerSlots=[st.sources.length-1])}return this.value}function xh(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&Hi(()=>{for(let i=0;i<n.observers.length;i+=1){const s=n.observers[i],a=Ho&&Ho.running;a&&Ho.disposed.has(s),(a?!s.tState:!s.state)&&(s.pure?Rt.push(s):sn.push(s),s.observers&&Sh(s)),a||(s.state=Mn)}if(Rt.length>1e6)throw Rt=[],new Error},!1)),e}function zi(n){if(!n.fn)return;$i(n);const e=uo;$p(n,n.value,e)}function $p(n,e,t){let r;const i=He,s=st;st=He=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=Mn,n.owned&&n.owned.forEach($i),n.owned=null),n.updatedAt=t+1,fo(a)}finally{st=s,He=i}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?xh(n,r):n.value=r,n.updatedAt=t)}function ho(n,e,t,r=Mn,i){const s={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:He,context:He?He.context:null,pure:t};return He===null||He!==Ih&&(He.owned?He.owned.push(s):He.owned=[s]),s}function qs(n){if(n.state===0)return;if(n.state===Bs)return Gs(n);if(n.suspense&&yn(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<uo);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===Mn)zi(n);else if(n.state===Bs){const r=Rt;Rt=null,Hi(()=>Gs(n,e[0]),!1),Rt=r}}function Hi(n,e){if(Rt)return n();let t=!1;e||(Rt=[]),sn?t=!0:sn=[],uo++;try{const r=n();return Pp(t),r}catch(r){t||(sn=null),Rt=null,fo(r)}}function Pp(n){if(Rt&&(Ah(Rt),Rt=null),n)return;const e=sn;sn=null,e.length&&Hi(()=>Eh(e),!1)}function Ah(n){for(let e=0;e<n.length;e++)qs(n[e])}function Np(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:qs(r)}for(e=0;e<t;e++)qs(n[e])}function Gs(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const i=r.state;i===Mn?r!==e&&(!r.updatedAt||r.updatedAt<uo)&&qs(r):i===Bs&&Gs(r,e)}}}function Sh(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=Bs,t.pure?Rt.push(t):sn.push(t),t.observers&&Sh(t))}}function $i(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),i=t.observers;if(i&&i.length){const s=i.pop(),a=t.observerSlots.pop();r<i.length&&(s.sourceSlots[a]=r,i[r]=s,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)$i(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)$i(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Dp(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function yc(n,e,t){try{for(const r of e)r(n)}catch(r){fo(r,t&&t.owner||null)}}function fo(n,e=He){const t=Ii&&e&&e.context&&e.context[Ii],r=Dp(n);if(!t)throw r;sn?sn.push({fn(){yc(r,t,e)},state:Mn}):yc(r,t,e)}const Vp=Symbol("fallback");function bc(n){for(let e=0;e<n.length;e++)n[e]()}function Op(n,e,t={}){let r=[],i=[],s=[],a=0,l=e.length>1?[]:null;return cn(()=>bc(s)),()=>{let u=n()||[],d=u.length,f,p;return u[Cp],yn(()=>{let I,C,S,A,N,R,$,F,U;if(d===0)a!==0&&(bc(s),s=[],r=[],i=[],a=0,l&&(l=[])),t.fallback&&(r=[Vp],i[0]=Cs(W=>(s[0]=W,t.fallback())),a=1);else if(a===0){for(i=new Array(d),p=0;p<d;p++)r[p]=u[p],i[p]=Cs(_);a=d}else{for(S=new Array(d),A=new Array(d),l&&(N=new Array(d)),R=0,$=Math.min(a,d);R<$&&r[R]===u[R];R++);for($=a-1,F=d-1;$>=R&&F>=R&&r[$]===u[F];$--,F--)S[F]=i[$],A[F]=s[$],l&&(N[F]=l[$]);for(I=new Map,C=new Array(F+1),p=F;p>=R;p--)U=u[p],f=I.get(U),C[p]=f===void 0?-1:f,I.set(U,p);for(f=R;f<=$;f++)U=r[f],p=I.get(U),p!==void 0&&p!==-1?(S[p]=i[f],A[p]=s[f],l&&(N[p]=l[f]),p=C[p],I.set(U,p)):s[f]();for(p=R;p<d;p++)p in S?(i[p]=S[p],s[p]=A[p],l&&(l[p]=N[p],l[p](p))):i[p]=Cs(_);i=i.slice(0,a=d),r=u.slice(0)}return i});function _(I){if(s[p]=I,l){const[C,S]=Y(p);return l[p]=S,e(u[p],C)}return e(u[p])}}}function T(n,e){return yn(()=>n(e||{}))}const Mp=n=>`Stale read from <${n}>.`;function Ye(n){const e="fallback"in n&&{fallback:()=>n.fallback};return Le(Op(()=>n.each,n.children,e||void 0))}function G(n){const e=n.keyed,t=Le(()=>n.when,void 0,void 0),r=e?t:Le(t,void 0,{equals:(i,s)=>!i==!s});return Le(()=>{const i=r();if(i){const s=n.children;return typeof s=="function"&&s.length>0?yn(()=>s(e?i:()=>{if(!yn(r))throw Mp("Show");return t()})):s}return n.fallback},void 0,void 0)}let ws;function Lp(n){let e;const[t,r]=Y(e,void 0);return ws||(ws=new Set),ws.add(r),cn(()=>ws.delete(r)),Le(()=>{let i;if(i=t()){const s=n.fallback;return typeof s=="function"&&s.length?yn(()=>s(i,()=>r())):s}return kp(()=>n.children,r)},void 0,void 0)}const ut=n=>Le(()=>n());function Fp(n,e,t){let r=t.length,i=e.length,s=r,a=0,l=0,u=e[i-1].nextSibling,d=null;for(;a<i||l<s;){if(e[a]===t[l]){a++,l++;continue}for(;e[i-1]===t[s-1];)i--,s--;if(i===a){const f=s<r?l?t[l-1].nextSibling:t[s-l]:u;for(;l<s;)n.insertBefore(t[l++],f)}else if(s===l)for(;a<i;)(!d||!d.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[s-1]&&t[l]===e[i-1]){const f=e[--i].nextSibling;n.insertBefore(t[l++],e[a++].nextSibling),n.insertBefore(t[--s],f),e[i]=t[s]}else{if(!d){d=new Map;let p=l;for(;p<s;)d.set(t[p],p++)}const f=d.get(e[a]);if(f!=null)if(l<f&&f<s){let p=a,_=1,I;for(;++p<i&&p<s&&!((I=d.get(e[p]))==null||I!==f+_);)_++;if(_>f-l){const C=e[a];for(;l<f;)n.insertBefore(t[l++],C)}else n.replaceChild(t[l++],e[a++])}else a++;else e[a++].remove()}}}const wc="_$DX_DELEGATE";function Up(n,e,t,r={}){let i;return Cs(s=>{i=s,e===document?n():m(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{i(),e.textContent=""}}function V(n,e,t,r){let i;const s=()=>{const l=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return l.innerHTML=n,t?l.content.firstChild.firstChild:r?l.firstChild:l.content.firstChild},a=e?()=>yn(()=>document.importNode(i||(i=s()),!0)):()=>(i||(i=s())).cloneNode(!0);return a.cloneNode=a,a}function Bt(n,e=window.document){const t=e[wc]||(e[wc]=new Set);for(let r=0,i=n.length;r<i;r++){const s=n[r];t.has(s)||(t.add(s),e.addEventListener(s,jp))}}function Me(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function xe(n,e){e==null?n.removeAttribute("class"):n.className=e}function We(n,e,t,r){Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t}function nn(n,e,t){t!=null?n.style.setProperty(e,t):n.style.removeProperty(e)}function oa(n,e,t){return yn(()=>n(e,t))}function m(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return zs(n,e,r,t);X(i=>zs(n,e(),i,t),r)}function jp(n){let e=n.target;const t=`$$${n.type}`,r=n.target,i=n.currentTarget,s=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const d=e[`${t}Data`];if(d!==void 0?u.call(e,d,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&s(e.host),!0},l=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();s(u[0]);for(let d=0;d<u.length-2&&(e=u[d],!!a());d++){if(e._$host){e=e._$host,l();break}if(e.parentNode===i)break}}else l();s(r)}function zs(n,e,t,r,i){for(;typeof t=="function";)t=t();if(e===t)return t;const s=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,s==="string"||s==="number"){if(s==="number"&&(e=e.toString(),e===t))return t;if(a){let l=t[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),t=Fr(n,t,r,l)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||s==="boolean")t=Fr(n,t,r);else{if(s==="function")return X(()=>{let l=e();for(;typeof l=="function";)l=l();t=zs(n,l,t,r)}),()=>t;if(Array.isArray(e)){const l=[],u=t&&Array.isArray(t);if(aa(l,e,t,i))return X(()=>t=zs(n,l,t,r,!0)),()=>t;if(l.length===0){if(t=Fr(n,t,r),a)return t}else u?t.length===0?Ec(n,l,r):Fp(n,t,l):(t&&Fr(n),Ec(n,l));t=l}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=Fr(n,t,r,e);Fr(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function aa(n,e,t,r){let i=!1;for(let s=0,a=e.length;s<a;s++){let l=e[s],u=t&&t[n.length],d;if(!(l==null||l===!0||l===!1))if((d=typeof l)=="object"&&l.nodeType)n.push(l);else if(Array.isArray(l))i=aa(n,l,u)||i;else if(d==="function")if(r){for(;typeof l=="function";)l=l();i=aa(n,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else n.push(l),i=!0;else{const f=String(l);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return i}function Ec(n,e,t=null){for(let r=0,i=e.length;r<i;r++)n.insertBefore(e[r],t)}function Fr(n,e,t,r){if(t===void 0)return n.textContent="";const i=r||document.createTextNode("");if(e.length){let s=!1;for(let a=e.length-1;a>=0;a--){const l=e[a];if(i!==l){const u=l.parentNode===n;!s&&!a?u?n.replaceChild(i,l):n.insertBefore(i,t):u&&l.remove()}else s=!0}}else n.insertBefore(i,t);return[i]}/**
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
 */const Bp=()=>{};var Ic={};/**
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
 */const Ch=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},qp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],l=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Rh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,l=a?n[i+1]:0,u=i+2<n.length,d=u?n[i+2]:0,f=s>>2,p=(s&3)<<4|l>>4;let _=(l&15)<<2|d>>6,I=d&63;u||(I=64,a||(_=64)),r.push(t[f],t[p],t[_],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ch(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):qp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||l==null||d==null||p==null)throw new Gp;const _=s<<2|l>>4;if(r.push(_),d!==64){const I=l<<4&240|d>>2;if(r.push(I),p!==64){const C=d<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Gp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zp=function(n){const e=Ch(n);return Rh.encodeByteArray(e,!0)},Hs=function(n){return zp(n).replace(/\./g,"")},kh=function(n){try{return Rh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Hp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Wp=()=>Hp().__FIREBASE_DEFAULTS__,Kp=()=>{if(typeof process>"u"||typeof Ic>"u")return;const n=Ic.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&kh(n[1]);return e&&JSON.parse(e)},po=()=>{try{return Bp()||Wp()||Kp()||Qp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$h=n=>{var e,t;return(t=(e=po())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Yp=n=>{const e=$h(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ph=()=>{var n;return(n=po())===null||n===void 0?void 0:n.config},Nh=n=>{var e;return(e=po())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Jp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function ri(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Dh(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Xp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Hs(JSON.stringify(t)),Hs(JSON.stringify(a)),""].join(".")}const Ti={};function Zp(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ti))Ti[e]?n.emulator.push(e):n.prod.push(e);return n}function eg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Tc=!1;function Vh(n,e){if(typeof window>"u"||typeof document>"u"||!ri(window.location.host)||Ti[n]===e||Ti[n]||Tc)return;Ti[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",s=Zp().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function l(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,I){_.setAttribute("width","24"),_.setAttribute("id",I),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function d(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Tc=!0,a()},_}function f(_,I){_.setAttribute("id",I),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=eg(r),I=t("text"),C=document.getElementById(I)||document.createElement("span"),S=t("learnmore"),A=document.getElementById(S)||document.createElement("a"),N=t("preprendIcon"),R=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const $=_.element;l($),f(A,S);const F=d();u(R,N),$.append(R,C,A,F),document.body.appendChild($)}s?(C.innerText="Preview backend disconnected.",R.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function kt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function tg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(kt())}function ng(){var n;const e=(n=po())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function rg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ig(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function sg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function og(){const n=kt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ag(){return!ng()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function lg(){try{return typeof indexedDB=="object"}catch{return!1}}function cg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const ug="FirebaseError";class Ln extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ug,Object.setPrototypeOf(this,Ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wi.prototype.create)}}class Wi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?hg(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Ln(i,l,r)}}function hg(n,e){return n.replace(dg,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const dg=/\{\$([^}]+)}/g;function fg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Sr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(xc(s)&&xc(a)){if(!Sr(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function xc(n){return n!==null&&typeof n=="object"}/**
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
 */function Ki(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function pg(n,e){const t=new gg(n,e);return t.subscribe.bind(t)}class gg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");mg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Wo),i.error===void 0&&(i.error=Wo),i.complete===void 0&&(i.complete=Wo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function mg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wo(){}/**
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
 */function lt(n){return n&&n._delegate?n._delegate:n}class Cr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const br="[DEFAULT]";/**
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
 */class _g{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Jp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yg(e))try{this.getOrInitializeService({instanceIdentifier:br})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=br){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=br){return this.instances.has(e)}getOptions(e=br){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=br){return this.component?this.component.multipleInstances?e:br:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vg(n){return n===br?void 0:n}function yg(n){return n.instantiationMode==="EAGER"}/**
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
 */class bg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new _g(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ye;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ye||(ye={}));const wg={debug:ye.DEBUG,verbose:ye.VERBOSE,info:ye.INFO,warn:ye.WARN,error:ye.ERROR,silent:ye.SILENT},Eg=ye.INFO,Ig={[ye.DEBUG]:"log",[ye.VERBOSE]:"log",[ye.INFO]:"info",[ye.WARN]:"warn",[ye.ERROR]:"error"},Tg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Ig[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Va{constructor(e){this.name=e,this._logLevel=Eg,this._logHandler=Tg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ye))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ye.DEBUG,...e),this._logHandler(this,ye.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ye.VERBOSE,...e),this._logHandler(this,ye.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ye.INFO,...e),this._logHandler(this,ye.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ye.WARN,...e),this._logHandler(this,ye.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ye.ERROR,...e),this._logHandler(this,ye.ERROR,...e)}}const xg=(n,e)=>e.some(t=>n instanceof t);let Ac,Sc;function Ag(){return Ac||(Ac=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sg(){return Sc||(Sc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Oh=new WeakMap,la=new WeakMap,Mh=new WeakMap,Ko=new WeakMap,Oa=new WeakMap;function Cg(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Jn(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Oh.set(t,n)}).catch(()=>{}),Oa.set(e,n),e}function Rg(n){if(la.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});la.set(n,e)}let ca={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return la.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Mh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Jn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function kg(n){ca=n(ca)}function $g(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Qo(this),e,...t);return Mh.set(r,e.sort?e.sort():[e]),Jn(r)}:Sg().includes(n)?function(...e){return n.apply(Qo(this),e),Jn(Oh.get(this))}:function(...e){return Jn(n.apply(Qo(this),e))}}function Pg(n){return typeof n=="function"?$g(n):(n instanceof IDBTransaction&&Rg(n),xg(n,Ag())?new Proxy(n,ca):n)}function Jn(n){if(n instanceof IDBRequest)return Cg(n);if(Ko.has(n))return Ko.get(n);const e=Pg(n);return e!==n&&(Ko.set(n,e),Oa.set(e,n)),e}const Qo=n=>Oa.get(n);function Ng(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),l=Jn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Jn(a.result),u.oldVersion,u.newVersion,Jn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Dg=["get","getKey","getAll","getAllKeys","count"],Vg=["put","add","delete","clear"],Yo=new Map;function Cc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Yo.get(e))return Yo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Vg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Dg.includes(t)))return;const s=async function(a,...l){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),i&&u.done]))[0]};return Yo.set(e,s),s}kg(n=>({...n,get:(e,t,r)=>Cc(e,t)||n.get(e,t,r),has:(e,t)=>!!Cc(e,t)||n.has(e,t)}));/**
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
 */class Og{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Mg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Mg(n){const e=n.getComponent();return e?.type==="VERSION"}const ua="@firebase/app",Rc="0.13.2";/**
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
 */const Pn=new Va("@firebase/app"),Lg="@firebase/app-compat",Fg="@firebase/analytics-compat",Ug="@firebase/analytics",jg="@firebase/app-check-compat",Bg="@firebase/app-check",qg="@firebase/auth",Gg="@firebase/auth-compat",zg="@firebase/database",Hg="@firebase/data-connect",Wg="@firebase/database-compat",Kg="@firebase/functions",Qg="@firebase/functions-compat",Yg="@firebase/installations",Jg="@firebase/installations-compat",Xg="@firebase/messaging",Zg="@firebase/messaging-compat",em="@firebase/performance",tm="@firebase/performance-compat",nm="@firebase/remote-config",rm="@firebase/remote-config-compat",im="@firebase/storage",sm="@firebase/storage-compat",om="@firebase/firestore",am="@firebase/ai",lm="@firebase/firestore-compat",cm="firebase",um="11.10.0";/**
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
 */const ha="[DEFAULT]",hm={[ua]:"fire-core",[Lg]:"fire-core-compat",[Ug]:"fire-analytics",[Fg]:"fire-analytics-compat",[Bg]:"fire-app-check",[jg]:"fire-app-check-compat",[qg]:"fire-auth",[Gg]:"fire-auth-compat",[zg]:"fire-rtdb",[Hg]:"fire-data-connect",[Wg]:"fire-rtdb-compat",[Kg]:"fire-fn",[Qg]:"fire-fn-compat",[Yg]:"fire-iid",[Jg]:"fire-iid-compat",[Xg]:"fire-fcm",[Zg]:"fire-fcm-compat",[em]:"fire-perf",[tm]:"fire-perf-compat",[nm]:"fire-rc",[rm]:"fire-rc-compat",[im]:"fire-gcs",[sm]:"fire-gcs-compat",[om]:"fire-fst",[lm]:"fire-fst-compat",[am]:"fire-vertex","fire-js":"fire-js",[cm]:"fire-js-all"};/**
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
 */const Ws=new Map,dm=new Map,da=new Map;function kc(n,e){try{n.container.addComponent(e)}catch(t){Pn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Yr(n){const e=n.name;if(da.has(e))return Pn.debug(`There were multiple attempts to register component ${e}.`),!1;da.set(e,n);for(const t of Ws.values())kc(t,n);for(const t of dm.values())kc(t,n);return!0}function Ma(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function tn(n){return n==null?!1:n.settings!==void 0}/**
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
 */const fm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xn=new Wi("app","Firebase",fm);/**
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
 */class pm{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Cr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xn.create("app-deleted",{appName:this._name})}}/**
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
 */const ii=um;function Lh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ha,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Xn.create("bad-app-name",{appName:String(i)});if(t||(t=Ph()),!t)throw Xn.create("no-options");const s=Ws.get(i);if(s){if(Sr(t,s.options)&&Sr(r,s.config))return s;throw Xn.create("duplicate-app",{appName:i})}const a=new bg(i);for(const u of da.values())a.addComponent(u);const l=new pm(t,r,a);return Ws.set(i,l),l}function Fh(n=ha){const e=Ws.get(n);if(!e&&n===ha&&Ph())return Lh();if(!e)throw Xn.create("no-app",{appName:n});return e}function Zn(n,e,t){var r;let i=(r=hm[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pn.warn(l.join(" "));return}Yr(new Cr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const gm="firebase-heartbeat-database",mm=1,Pi="firebase-heartbeat-store";let Jo=null;function Uh(){return Jo||(Jo=Ng(gm,mm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pi)}catch(t){console.warn(t)}}}}).catch(n=>{throw Xn.create("idb-open",{originalErrorMessage:n.message})})),Jo}async function _m(n){try{const t=(await Uh()).transaction(Pi),r=await t.objectStore(Pi).get(jh(n));return await t.done,r}catch(e){if(e instanceof Ln)Pn.warn(e.message);else{const t=Xn.create("idb-get",{originalErrorMessage:e?.message});Pn.warn(t.message)}}}async function $c(n,e){try{const r=(await Uh()).transaction(Pi,"readwrite");await r.objectStore(Pi).put(e,jh(n)),await r.done}catch(t){if(t instanceof Ln)Pn.warn(t.message);else{const r=Xn.create("idb-set",{originalErrorMessage:t?.message});Pn.warn(r.message)}}}function jh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const vm=1024,ym=30;class bm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Em(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Pc();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>ym){const a=Im(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Pn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Pc(),{heartbeatsToSend:r,unsentEntries:i}=wm(this._heartbeatsCache.heartbeats),s=Hs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Pn.warn(t),""}}}function Pc(){return new Date().toISOString().substring(0,10)}function wm(n,e=vm){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Nc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Nc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Em{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lg()?cg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _m(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return $c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return $c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Nc(n){return Hs(JSON.stringify({version:2,heartbeats:n})).length}function Im(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Tm(n){Yr(new Cr("platform-logger",e=>new Og(e),"PRIVATE")),Yr(new Cr("heartbeat",e=>new bm(e),"PRIVATE")),Zn(ua,Rc,n),Zn(ua,Rc,"esm2017"),Zn("fire-js","")}Tm("");var Dc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var er,Bh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,v){function y(){}y.prototype=v.prototype,w.D=v.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(E,x,k){for(var b=Array(arguments.length-2),le=2;le<arguments.length;le++)b[le-2]=arguments[le];return v.prototype[x].apply(E,b)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,v,y){y||(y=0);var E=Array(16);if(typeof v=="string")for(var x=0;16>x;++x)E[x]=v.charCodeAt(y++)|v.charCodeAt(y++)<<8|v.charCodeAt(y++)<<16|v.charCodeAt(y++)<<24;else for(x=0;16>x;++x)E[x]=v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24;v=w.g[0],y=w.g[1],x=w.g[2];var k=w.g[3],b=v+(k^y&(x^k))+E[0]+3614090360&4294967295;v=y+(b<<7&4294967295|b>>>25),b=k+(x^v&(y^x))+E[1]+3905402710&4294967295,k=v+(b<<12&4294967295|b>>>20),b=x+(y^k&(v^y))+E[2]+606105819&4294967295,x=k+(b<<17&4294967295|b>>>15),b=y+(v^x&(k^v))+E[3]+3250441966&4294967295,y=x+(b<<22&4294967295|b>>>10),b=v+(k^y&(x^k))+E[4]+4118548399&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(x^v&(y^x))+E[5]+1200080426&4294967295,k=v+(b<<12&4294967295|b>>>20),b=x+(y^k&(v^y))+E[6]+2821735955&4294967295,x=k+(b<<17&4294967295|b>>>15),b=y+(v^x&(k^v))+E[7]+4249261313&4294967295,y=x+(b<<22&4294967295|b>>>10),b=v+(k^y&(x^k))+E[8]+1770035416&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(x^v&(y^x))+E[9]+2336552879&4294967295,k=v+(b<<12&4294967295|b>>>20),b=x+(y^k&(v^y))+E[10]+4294925233&4294967295,x=k+(b<<17&4294967295|b>>>15),b=y+(v^x&(k^v))+E[11]+2304563134&4294967295,y=x+(b<<22&4294967295|b>>>10),b=v+(k^y&(x^k))+E[12]+1804603682&4294967295,v=y+(b<<7&4294967295|b>>>25),b=k+(x^v&(y^x))+E[13]+4254626195&4294967295,k=v+(b<<12&4294967295|b>>>20),b=x+(y^k&(v^y))+E[14]+2792965006&4294967295,x=k+(b<<17&4294967295|b>>>15),b=y+(v^x&(k^v))+E[15]+1236535329&4294967295,y=x+(b<<22&4294967295|b>>>10),b=v+(x^k&(y^x))+E[1]+4129170786&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^x&(v^y))+E[6]+3225465664&4294967295,k=v+(b<<9&4294967295|b>>>23),b=x+(v^y&(k^v))+E[11]+643717713&4294967295,x=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(x^k))+E[0]+3921069994&4294967295,y=x+(b<<20&4294967295|b>>>12),b=v+(x^k&(y^x))+E[5]+3593408605&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^x&(v^y))+E[10]+38016083&4294967295,k=v+(b<<9&4294967295|b>>>23),b=x+(v^y&(k^v))+E[15]+3634488961&4294967295,x=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(x^k))+E[4]+3889429448&4294967295,y=x+(b<<20&4294967295|b>>>12),b=v+(x^k&(y^x))+E[9]+568446438&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^x&(v^y))+E[14]+3275163606&4294967295,k=v+(b<<9&4294967295|b>>>23),b=x+(v^y&(k^v))+E[3]+4107603335&4294967295,x=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(x^k))+E[8]+1163531501&4294967295,y=x+(b<<20&4294967295|b>>>12),b=v+(x^k&(y^x))+E[13]+2850285829&4294967295,v=y+(b<<5&4294967295|b>>>27),b=k+(y^x&(v^y))+E[2]+4243563512&4294967295,k=v+(b<<9&4294967295|b>>>23),b=x+(v^y&(k^v))+E[7]+1735328473&4294967295,x=k+(b<<14&4294967295|b>>>18),b=y+(k^v&(x^k))+E[12]+2368359562&4294967295,y=x+(b<<20&4294967295|b>>>12),b=v+(y^x^k)+E[5]+4294588738&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^x)+E[8]+2272392833&4294967295,k=v+(b<<11&4294967295|b>>>21),b=x+(k^v^y)+E[11]+1839030562&4294967295,x=k+(b<<16&4294967295|b>>>16),b=y+(x^k^v)+E[14]+4259657740&4294967295,y=x+(b<<23&4294967295|b>>>9),b=v+(y^x^k)+E[1]+2763975236&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^x)+E[4]+1272893353&4294967295,k=v+(b<<11&4294967295|b>>>21),b=x+(k^v^y)+E[7]+4139469664&4294967295,x=k+(b<<16&4294967295|b>>>16),b=y+(x^k^v)+E[10]+3200236656&4294967295,y=x+(b<<23&4294967295|b>>>9),b=v+(y^x^k)+E[13]+681279174&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^x)+E[0]+3936430074&4294967295,k=v+(b<<11&4294967295|b>>>21),b=x+(k^v^y)+E[3]+3572445317&4294967295,x=k+(b<<16&4294967295|b>>>16),b=y+(x^k^v)+E[6]+76029189&4294967295,y=x+(b<<23&4294967295|b>>>9),b=v+(y^x^k)+E[9]+3654602809&4294967295,v=y+(b<<4&4294967295|b>>>28),b=k+(v^y^x)+E[12]+3873151461&4294967295,k=v+(b<<11&4294967295|b>>>21),b=x+(k^v^y)+E[15]+530742520&4294967295,x=k+(b<<16&4294967295|b>>>16),b=y+(x^k^v)+E[2]+3299628645&4294967295,y=x+(b<<23&4294967295|b>>>9),b=v+(x^(y|~k))+E[0]+4096336452&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~x))+E[7]+1126891415&4294967295,k=v+(b<<10&4294967295|b>>>22),b=x+(v^(k|~y))+E[14]+2878612391&4294967295,x=k+(b<<15&4294967295|b>>>17),b=y+(k^(x|~v))+E[5]+4237533241&4294967295,y=x+(b<<21&4294967295|b>>>11),b=v+(x^(y|~k))+E[12]+1700485571&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~x))+E[3]+2399980690&4294967295,k=v+(b<<10&4294967295|b>>>22),b=x+(v^(k|~y))+E[10]+4293915773&4294967295,x=k+(b<<15&4294967295|b>>>17),b=y+(k^(x|~v))+E[1]+2240044497&4294967295,y=x+(b<<21&4294967295|b>>>11),b=v+(x^(y|~k))+E[8]+1873313359&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~x))+E[15]+4264355552&4294967295,k=v+(b<<10&4294967295|b>>>22),b=x+(v^(k|~y))+E[6]+2734768916&4294967295,x=k+(b<<15&4294967295|b>>>17),b=y+(k^(x|~v))+E[13]+1309151649&4294967295,y=x+(b<<21&4294967295|b>>>11),b=v+(x^(y|~k))+E[4]+4149444226&4294967295,v=y+(b<<6&4294967295|b>>>26),b=k+(y^(v|~x))+E[11]+3174756917&4294967295,k=v+(b<<10&4294967295|b>>>22),b=x+(v^(k|~y))+E[2]+718787259&4294967295,x=k+(b<<15&4294967295|b>>>17),b=y+(k^(x|~v))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+v&4294967295,w.g[1]=w.g[1]+(x+(b<<21&4294967295|b>>>11))&4294967295,w.g[2]=w.g[2]+x&4294967295,w.g[3]=w.g[3]+k&4294967295}r.prototype.u=function(w,v){v===void 0&&(v=w.length);for(var y=v-this.blockSize,E=this.B,x=this.h,k=0;k<v;){if(x==0)for(;k<=y;)i(this,w,k),k+=this.blockSize;if(typeof w=="string"){for(;k<v;)if(E[x++]=w.charCodeAt(k++),x==this.blockSize){i(this,E),x=0;break}}else for(;k<v;)if(E[x++]=w[k++],x==this.blockSize){i(this,E),x=0;break}}this.h=x,this.o+=v},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var v=1;v<w.length-8;++v)w[v]=0;var y=8*this.o;for(v=w.length-8;v<w.length;++v)w[v]=y&255,y/=256;for(this.u(w),w=Array(16),v=y=0;4>v;++v)for(var E=0;32>E;E+=8)w[y++]=this.g[v]>>>E&255;return w};function s(w,v){var y=l;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=v(w)}function a(w,v){this.h=v;for(var y=[],E=!0,x=w.length-1;0<=x;x--){var k=w[x]|0;E&&k==v||(y[x]=k,E=!1)}this.g=y}var l={};function u(w){return-128<=w&&128>w?s(w,function(v){return new a([v|0],0>v?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return A(d(-w));for(var v=[],y=1,E=0;w>=y;E++)v[E]=w/y|0,y*=4294967296;return new a(v,0)}function f(w,v){if(w.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(w.charAt(0)=="-")return A(f(w.substring(1),v));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(v,8)),E=p,x=0;x<w.length;x+=8){var k=Math.min(8,w.length-x),b=parseInt(w.substring(x,x+k),v);8>k?(k=d(Math.pow(v,k)),E=E.j(k).add(d(b))):(E=E.j(y),E=E.add(d(b)))}return E}var p=u(0),_=u(1),I=u(16777216);n=a.prototype,n.m=function(){if(S(this))return-A(this).m();for(var w=0,v=1,y=0;y<this.g.length;y++){var E=this.i(y);w+=(0<=E?E:4294967296+E)*v,v*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(S(this))return"-"+A(this).toString(w);for(var v=d(Math.pow(w,6)),y=this,E="";;){var x=F(y,v).g;y=N(y,x.j(v));var k=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=x,C(y))return k+E;for(;6>k.length;)k="0"+k;E=k+E}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var v=0;v<w.g.length;v++)if(w.g[v]!=0)return!1;return!0}function S(w){return w.h==-1}n.l=function(w){return w=N(this,w),S(w)?-1:C(w)?0:1};function A(w){for(var v=w.g.length,y=[],E=0;E<v;E++)y[E]=~w.g[E];return new a(y,~w.h).add(_)}n.abs=function(){return S(this)?A(this):this},n.add=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],E=0,x=0;x<=v;x++){var k=E+(this.i(x)&65535)+(w.i(x)&65535),b=(k>>>16)+(this.i(x)>>>16)+(w.i(x)>>>16);E=b>>>16,k&=65535,b&=65535,y[x]=b<<16|k}return new a(y,y[y.length-1]&-2147483648?-1:0)};function N(w,v){return w.add(A(v))}n.j=function(w){if(C(this)||C(w))return p;if(S(this))return S(w)?A(this).j(A(w)):A(A(this).j(w));if(S(w))return A(this.j(A(w)));if(0>this.l(I)&&0>w.l(I))return d(this.m()*w.m());for(var v=this.g.length+w.g.length,y=[],E=0;E<2*v;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var x=0;x<w.g.length;x++){var k=this.i(E)>>>16,b=this.i(E)&65535,le=w.i(x)>>>16,J=w.i(x)&65535;y[2*E+2*x]+=b*J,R(y,2*E+2*x),y[2*E+2*x+1]+=k*J,R(y,2*E+2*x+1),y[2*E+2*x+1]+=b*le,R(y,2*E+2*x+1),y[2*E+2*x+2]+=k*le,R(y,2*E+2*x+2)}for(E=0;E<v;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=v;E<2*v;E++)y[E]=0;return new a(y,0)};function R(w,v){for(;(w[v]&65535)!=w[v];)w[v+1]+=w[v]>>>16,w[v]&=65535,v++}function $(w,v){this.g=w,this.h=v}function F(w,v){if(C(v))throw Error("division by zero");if(C(w))return new $(p,p);if(S(w))return v=F(A(w),v),new $(A(v.g),A(v.h));if(S(v))return v=F(w,A(v)),new $(A(v.g),v.h);if(30<w.g.length){if(S(w)||S(v))throw Error("slowDivide_ only works with positive integers.");for(var y=_,E=v;0>=E.l(w);)y=U(y),E=U(E);var x=W(y,1),k=W(E,1);for(E=W(E,2),y=W(y,2);!C(E);){var b=k.add(E);0>=b.l(w)&&(x=x.add(y),k=b),E=W(E,1),y=W(y,1)}return v=N(w,x.j(v)),new $(x,v)}for(x=p;0<=w.l(v);){for(y=Math.max(1,Math.floor(w.m()/v.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),k=d(y),b=k.j(v);S(b)||0<b.l(w);)y-=E,k=d(y),b=k.j(v);C(k)&&(k=_),x=x.add(k),w=N(w,b)}return new $(x,w)}n.A=function(w){return F(this,w).h},n.and=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],E=0;E<v;E++)y[E]=this.i(E)&w.i(E);return new a(y,this.h&w.h)},n.or=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],E=0;E<v;E++)y[E]=this.i(E)|w.i(E);return new a(y,this.h|w.h)},n.xor=function(w){for(var v=Math.max(this.g.length,w.g.length),y=[],E=0;E<v;E++)y[E]=this.i(E)^w.i(E);return new a(y,this.h^w.h)};function U(w){for(var v=w.g.length+1,y=[],E=0;E<v;E++)y[E]=w.i(E)<<1|w.i(E-1)>>>31;return new a(y,w.h)}function W(w,v){var y=v>>5;v%=32;for(var E=w.g.length-y,x=[],k=0;k<E;k++)x[k]=0<v?w.i(k+y)>>>v|w.i(k+y+1)<<32-v:w.i(k+y);return new a(x,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Bh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,er=a}).apply(typeof Dc<"u"?Dc:typeof self<"u"?self:typeof window<"u"?window:{});var Es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qh,yi,Gh,Rs,fa,zh,Hh,Wh;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Es=="object"&&Es];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,c){if(c)e:{var h=r;o=o.split(".");for(var g=0;g<o.length-1;g++){var P=o[g];if(!(P in h))break e;h=h[P]}o=o[o.length-1],g=h[o],c=c(g),c!=g&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}function s(o,c){o instanceof String&&(o+="");var h=0,g=!1,P={next:function(){if(!g&&h<o.length){var D=h++;return{value:c(D,o[D]),done:!1}}return g=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}i("Array.prototype.values",function(o){return o||function(){return s(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,h){return o.call.apply(o.bind,arguments)}function p(o,c,h){if(!o)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,g),o.apply(c,P)}}return function(){return o.apply(c,arguments)}}function _(o,c,h){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function I(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var g=h.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function C(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(g,P,D){for(var H=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)H[Oe-2]=arguments[Oe];return c.prototype[P].apply(g,H)}}function S(o){const c=o.length;if(0<c){const h=Array(c);for(let g=0;g<c;g++)h[g]=o[g];return h}return[]}function A(o,c){for(let h=1;h<arguments.length;h++){const g=arguments[h];if(u(g)){const P=o.length||0,D=g.length||0;o.length=P+D;for(let H=0;H<D;H++)o[P+H]=g[H]}else o.push(g)}}class N{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function R(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function F(o){return F[" "](o),o}F[" "]=function(){};var U=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function W(o,c,h){for(const g in o)c.call(h,o[g],g,o)}function w(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function v(o){const c={};for(const h in o)c[h]=o[h];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let h,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(h in g)o[h]=g[h];for(let D=0;D<y.length;D++)h=y[D],Object.prototype.hasOwnProperty.call(g,h)&&(o[h]=g[h])}}function x(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function k(o){l.setTimeout(()=>{throw o},0)}function b(){var o=z;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class le{constructor(){this.h=this.g=null}add(c,h){const g=J.get();g.set(c,h),this.h?this.h.next=g:this.g=g,this.h=g}}var J=new N(()=>new O,o=>o.reset());class O{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let q,j=!1,z=new le,ee=()=>{const o=l.Promise.resolve(void 0);q=()=>{o.then(Ee)}};var Ee=()=>{for(var o;o=b();){try{o.h.call(o.g)}catch(h){k(h)}var c=J;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}j=!1};function he(){this.s=this.s,this.C=this.C}he.prototype.s=!1,he.prototype.ma=function(){this.s||(this.s=!0,this.N())},he.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function de(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}de.prototype.h=function(){this.defaultPrevented=!0};var pe=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return o}();function oe(o,c){if(de.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(U){e:{try{F(c.nodeName);var P=!0;break e}catch{}P=!1}P||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Fe[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&oe.aa.h.call(this)}}C(oe,de);var Fe={2:"touch",3:"pen",4:"mouse"};oe.prototype.h=function(){oe.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Te="closure_listenable_"+(1e6*Math.random()|0),re=0;function De(o,c,h,g,P){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!g,this.ha=P,this.key=++re,this.da=this.fa=!1}function Re(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ne(o){this.src=o,this.g={},this.h=0}Ne.prototype.add=function(o,c,h,g,P){var D=o.toString();o=this.g[D],o||(o=this.g[D]=[],this.h++);var H=Pt(o,c,g,P);return-1<H?(c=o[H],h||(c.fa=!1)):(c=new De(c,this.src,D,!!g,P),c.fa=h,o.push(c)),c};function je(o,c){var h=c.type;if(h in o.g){var g=o.g[h],P=Array.prototype.indexOf.call(g,c,void 0),D;(D=0<=P)&&Array.prototype.splice.call(g,P,1),D&&(Re(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Pt(o,c,h,g){for(var P=0;P<o.length;++P){var D=o[P];if(!D.da&&D.listener==c&&D.capture==!!h&&D.ha==g)return P}return-1}var pt="closure_lm_"+(1e6*Math.random()|0),Nt={};function Dt(o,c,h,g,P){if(Array.isArray(c)){for(var D=0;D<c.length;D++)Dt(o,c[D],h,g,P);return null}return h=ce(h),o&&o[Te]?o.K(c,h,d(g)?!!g.capture:!1,P):qt(o,c,h,!1,g,P)}function qt(o,c,h,g,P,D){if(!c)throw Error("Invalid event type");var H=d(P)?!!P.capture:!!P,Oe=un(o);if(Oe||(o[pt]=Oe=new Ne(o)),h=Oe.add(c,h,g,H,D),h.proxy)return h;if(g=En(),h.proxy=g,g.src=o,g.listener=h,o.addEventListener)pe||(P=H),P===void 0&&(P=!1),o.addEventListener(c.toString(),g,P);else if(o.attachEvent)o.attachEvent(Vt(c.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return h}function En(){function o(h){return c.call(o.src,o.listener,h)}const c=In;return o}function Fn(o,c,h,g,P){if(Array.isArray(c))for(var D=0;D<c.length;D++)Fn(o,c[D],h,g,P);else g=d(g)?!!g.capture:!!g,h=ce(h),o&&o[Te]?(o=o.i,c=String(c).toString(),c in o.g&&(D=o.g[c],h=Pt(D,h,g,P),-1<h&&(Re(D[h]),Array.prototype.splice.call(D,h,1),D.length==0&&(delete o.g[c],o.h--)))):o&&(o=un(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Pt(c,h,g,P)),(h=-1<o?c[o]:null)&&me(h))}function me(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Te])je(c.i,o);else{var h=o.type,g=o.proxy;c.removeEventListener?c.removeEventListener(h,g,o.capture):c.detachEvent?c.detachEvent(Vt(h),g):c.addListener&&c.removeListener&&c.removeListener(g),(h=un(c))?(je(h,o),h.h==0&&(h.src=null,c[pt]=null)):Re(o)}}}function Vt(o){return o in Nt?Nt[o]:Nt[o]="on"+o}function In(o,c){if(o.da)o=!0;else{c=new oe(c,this);var h=o.listener,g=o.ha||o.src;o.fa&&me(o),o=h.call(g,c)}return o}function un(o){return o=o[pt],o instanceof Ne?o:null}var ct="__closure_events_fn_"+(1e9*Math.random()>>>0);function ce(o){return typeof o=="function"?o:(o[ct]||(o[ct]=function(c){return o.handleEvent(c)}),o[ct])}function ie(){he.call(this),this.i=new Ne(this),this.M=this,this.F=null}C(ie,he),ie.prototype[Te]=!0,ie.prototype.removeEventListener=function(o,c,h,g){Fn(this,o,c,h,g)};function ge(o,c){var h,g=o.F;if(g)for(h=[];g;g=g.F)h.push(g);if(o=o.M,g=c.type||c,typeof c=="string")c=new de(c,o);else if(c instanceof de)c.target=c.target||o;else{var P=c;c=new de(g,o),E(c,P)}if(P=!0,h)for(var D=h.length-1;0<=D;D--){var H=c.g=h[D];P=we(H,g,!0,c)&&P}if(H=c.g=o,P=we(H,g,!0,c)&&P,P=we(H,g,!1,c)&&P,h)for(D=0;D<h.length;D++)H=c.g=h[D],P=we(H,g,!1,c)&&P}ie.prototype.N=function(){if(ie.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],g=0;g<h.length;g++)Re(h[g]);delete o.g[c],o.h--}}this.F=null},ie.prototype.K=function(o,c,h,g){return this.i.add(String(o),c,!1,h,g)},ie.prototype.L=function(o,c,h,g){return this.i.add(String(o),c,!0,h,g)};function we(o,c,h,g){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var P=!0,D=0;D<c.length;++D){var H=c[D];if(H&&!H.da&&H.capture==h){var Oe=H.listener,mt=H.ha||H.src;H.fa&&je(o.i,H),P=Oe.call(mt,g)!==!1&&P}}return P&&!g.defaultPrevented}function ke(o,c,h){if(typeof o=="function")h&&(o=_(o,h));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function Ve(o){o.g=ke(()=>{o.g=null,o.i&&(o.i=!1,Ve(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class rt extends he{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ve(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Se(o){he.call(this),this.h=o,this.g={}}C(Se,he);var bt=[];function Gt(o){W(o.g,function(c,h){this.g.hasOwnProperty(h)&&me(c)},o),o.g={}}Se.prototype.N=function(){Se.aa.N.call(this),Gt(this)},Se.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Kt=l.JSON.stringify,Vr=l.JSON.parse,pr=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function hn(){}hn.prototype.h=null;function Un(o){return o.h||(o.h=o.i())}function jn(){}var Qt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gr(){de.call(this,"d")}C(gr,de);function Tn(){de.call(this,"c")}C(Tn,de);var Lt={},Z=null;function Be(){return Z=Z||new ie}Lt.La="serverreachability";function dt(o){de.call(this,Lt.La,o)}C(dt,de);function _e(o){const c=Be();ge(c,new dt(c))}Lt.STAT_EVENT="statevent";function Je(o,c){de.call(this,Lt.STAT_EVENT,o),this.stat=c}C(Je,de);function te(o){const c=Be();ge(c,new Je(c,o))}Lt.Ma="timingevent";function $e(o,c){de.call(this,Lt.Ma,o),this.size=c}C($e,de);function Xe(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function ze(){this.g=!0}ze.prototype.xa=function(){this.g=!1};function wt(o,c,h,g,P,D){o.info(function(){if(o.g)if(D)for(var H="",Oe=D.split("&"),mt=0;mt<Oe.length;mt++){var Ae=Oe[mt].split("=");if(1<Ae.length){var Et=Ae[0];Ae=Ae[1];var It=Et.split("_");H=2<=It.length&&It[1]=="type"?H+(Et+"="+Ae+"&"):H+(Et+"=redacted&")}}else H=null;else H=D;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+c+`
`+h+`
`+H})}function Ze(o,c,h,g,P,D,H){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+c+`
`+h+`
`+D+" "+H})}function gt(o,c,h,g){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Yt(o,h)+(g?" "+g:"")})}function zt(o,c){o.info(function(){return"TIMEOUT: "+c})}ze.prototype.info=function(){};function Yt(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var g=h[o];if(!(2>g.length)){var P=g[1];if(Array.isArray(P)&&!(1>P.length)){var D=P[0];if(D!="noop"&&D!="stop"&&D!="close")for(var H=1;H<P.length;H++)P[H]=""}}}}return Kt(h)}catch{return c}}var Pe={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Jt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Xt;function Zt(){}C(Zt,hn),Zt.prototype.g=function(){return new XMLHttpRequest},Zt.prototype.i=function(){return{}},Xt=new Zt;function Bn(o,c,h,g){this.j=o,this.i=c,this.l=h,this.R=g||1,this.U=new Se(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vl}function Vl(){this.i=null,this.g="",this.h=!1}var Ol={},Vo={};function Oo(o,c,h){o.L=1,o.v=ds(xn(c)),o.m=h,o.P=!0,Ml(o,null)}function Ml(o,c){o.F=Date.now(),cs(o),o.A=xn(o.v);var h=o.A,g=o.R;Array.isArray(g)||(g=[String(g)]),Jl(h.i,"t",g),o.C=0,h=o.j.J,o.h=new Vl,o.g=gc(o.j,h?c:null,!o.m),0<o.O&&(o.M=new rt(_(o.Y,o,o.g),o.O)),c=o.U,h=o.g,g=o.ca;var P="readystatechange";Array.isArray(P)||(P&&(bt[0]=P.toString()),P=bt);for(var D=0;D<P.length;D++){var H=Dt(h,P[D],g||c.handleEvent,!1,c.h||c);if(!H)break;c.g[H.key]=H}c=o.H?v(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),_e(),wt(o.i,o.u,o.A,o.l,o.R,o.m)}Bn.prototype.ca=function(o){o=o.target;const c=this.M;c&&An(o)==3?c.j():this.Y(o)},Bn.prototype.Y=function(o){try{if(o==this.g)e:{const It=An(this.g);var c=this.g.Ba();const Lr=this.g.Z();if(!(3>It)&&(It!=3||this.g&&(this.h.h||this.g.oa()||ic(this.g)))){this.J||It!=4||c==7||(c==8||0>=Lr?_e(3):_e(2)),Mo(this);var h=this.g.Z();this.X=h;t:if(Ll(this)){var g=ic(this.g);o="";var P=g.length,D=An(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){mr(this),hi(this);var H="";break t}this.h.i=new l.TextDecoder}for(c=0;c<P;c++)this.h.h=!0,o+=this.h.i.decode(g[c],{stream:!(D&&c==P-1)});g.length=0,this.h.g+=o,this.C=0,H=this.h.g}else H=this.g.oa();if(this.o=h==200,Ze(this.i,this.u,this.A,this.l,this.R,It,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Oe,mt=this.g;if((Oe=mt.g?mt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(Oe)){var Ae=Oe;break t}}Ae=null}if(h=Ae)gt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Lo(this,h);else{this.o=!1,this.s=3,te(12),mr(this),hi(this);break e}}if(this.P){h=!0;let en;for(;!this.J&&this.C<H.length;)if(en=ap(this,H),en==Vo){It==4&&(this.s=4,te(14),h=!1),gt(this.i,this.l,null,"[Incomplete Response]");break}else if(en==Ol){this.s=4,te(15),gt(this.i,this.l,H,"[Invalid Chunk]"),h=!1;break}else gt(this.i,this.l,en,null),Lo(this,en);if(Ll(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),It!=4||H.length!=0||this.h.h||(this.s=1,te(16),h=!1),this.o=this.o&&h,!h)gt(this.i,this.l,H,"[Invalid Chunked Response]"),mr(this),hi(this);else if(0<H.length&&!this.W){this.W=!0;var Et=this.j;Et.g==this&&Et.ba&&!Et.M&&(Et.j.info("Great, no buffering proxy detected. Bytes received: "+H.length),Go(Et),Et.M=!0,te(11))}}else gt(this.i,this.l,H,null),Lo(this,H);It==4&&mr(this),this.o&&!this.J&&(It==4?hc(this.j,this):(this.o=!1,cs(this)))}else Tp(this.g),h==400&&0<H.indexOf("Unknown SID")?(this.s=3,te(12)):(this.s=0,te(13)),mr(this),hi(this)}}}catch{}finally{}};function Ll(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function ap(o,c){var h=o.C,g=c.indexOf(`
`,h);return g==-1?Vo:(h=Number(c.substring(h,g)),isNaN(h)?Ol:(g+=1,g+h>c.length?Vo:(c=c.slice(g,g+h),o.C=g+h,c)))}Bn.prototype.cancel=function(){this.J=!0,mr(this)};function cs(o){o.S=Date.now()+o.I,Fl(o,o.I)}function Fl(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Xe(_(o.ba,o),c)}function Mo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}Bn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(zt(this.i,this.A),this.L!=2&&(_e(),te(17)),mr(this),this.s=2,hi(this)):Fl(this,this.S-o)};function hi(o){o.j.G==0||o.J||hc(o.j,o)}function mr(o){Mo(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Gt(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Lo(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Fo(h.h,o))){if(!o.K&&Fo(h.h,o)&&h.G==3){try{var g=h.Da.g.parse(c)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)vs(h),ms(h);else break e;qo(h),te(18)}}else h.za=P[1],0<h.za-h.T&&37500>P[2]&&h.F&&h.v==0&&!h.C&&(h.C=Xe(_(h.Za,h),6e3));if(1>=Bl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else vr(h,11)}else if((o.K||h.g==o)&&vs(h),!R(c))for(P=h.Da.g.parse(c),c=0;c<P.length;c++){let Ae=P[c];if(h.T=Ae[0],Ae=Ae[1],h.G==2)if(Ae[0]=="c"){h.K=Ae[1],h.ia=Ae[2];const Et=Ae[3];Et!=null&&(h.la=Et,h.j.info("VER="+h.la));const It=Ae[4];It!=null&&(h.Aa=It,h.j.info("SVER="+h.Aa));const Lr=Ae[5];Lr!=null&&typeof Lr=="number"&&0<Lr&&(g=1.5*Lr,h.L=g,h.j.info("backChannelRequestTimeoutMs_="+g)),g=h;const en=o.g;if(en){const bs=en.g?en.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(bs){var D=g.h;D.g||bs.indexOf("spdy")==-1&&bs.indexOf("quic")==-1&&bs.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Uo(D,D.h),D.h=null))}if(g.D){const zo=en.g?en.g.getResponseHeader("X-HTTP-Session-Id"):null;zo&&(g.ya=zo,qe(g.I,g.D,zo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),g=h;var H=o;if(g.qa=pc(g,g.J?g.ia:null,g.W),H.K){ql(g.h,H);var Oe=H,mt=g.L;mt&&(Oe.I=mt),Oe.B&&(Mo(Oe),cs(Oe)),g.g=H}else cc(g);0<h.i.length&&_s(h)}else Ae[0]!="stop"&&Ae[0]!="close"||vr(h,7);else h.G==3&&(Ae[0]=="stop"||Ae[0]=="close"?Ae[0]=="stop"?vr(h,7):Bo(h):Ae[0]!="noop"&&h.l&&h.l.ta(Ae),h.v=0)}}_e(4)}catch{}}var lp=class{constructor(o,c){this.g=o,this.map=c}};function Ul(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function jl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Bl(o){return o.h?1:o.g?o.g.size:0}function Fo(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Uo(o,c){o.g?o.g.add(c):o.h=c}function ql(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Ul.prototype.cancel=function(){if(this.i=Gl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Gl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return S(o.i)}function cp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],h=o.length,g=0;g<h;g++)c.push(o[g]);return c}c=[],h=0;for(g in o)c[h++]=o[g];return c}function up(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const g in o)c[h++]=g;return c}}}function zl(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=up(o),g=cp(o),P=g.length,D=0;D<P;D++)c.call(void 0,g[D],h&&h[D],o)}var Hl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function hp(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var g=o[h].indexOf("="),P=null;if(0<=g){var D=o[h].substring(0,g);P=o[h].substring(g+1)}else D=o[h];c(D,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function _r(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof _r){this.h=o.h,us(this,o.j),this.o=o.o,this.g=o.g,hs(this,o.s),this.l=o.l;var c=o.i,h=new pi;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Wl(this,h),this.m=o.m}else o&&(c=String(o).match(Hl))?(this.h=!1,us(this,c[1]||"",!0),this.o=di(c[2]||""),this.g=di(c[3]||"",!0),hs(this,c[4]),this.l=di(c[5]||"",!0),Wl(this,c[6]||"",!0),this.m=di(c[7]||"")):(this.h=!1,this.i=new pi(null,this.h))}_r.prototype.toString=function(){var o=[],c=this.j;c&&o.push(fi(c,Kl,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(fi(c,Kl,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(fi(h,h.charAt(0)=="/"?pp:fp,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",fi(h,mp)),o.join("")};function xn(o){return new _r(o)}function us(o,c,h){o.j=h?di(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function hs(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Wl(o,c,h){c instanceof pi?(o.i=c,_p(o.i,o.h)):(h||(c=fi(c,gp)),o.i=new pi(c,o.h))}function qe(o,c,h){o.i.set(c,h)}function ds(o){return qe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function di(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function fi(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,dp),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function dp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Kl=/[#\/\?@]/g,fp=/[#\?:]/g,pp=/[#\?]/g,gp=/[#\?@]/g,mp=/#/g;function pi(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function qn(o){o.g||(o.g=new Map,o.h=0,o.i&&hp(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=pi.prototype,n.add=function(o,c){qn(this),this.i=null,o=Or(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Ql(o,c){qn(o),c=Or(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Yl(o,c){return qn(o),c=Or(o,c),o.g.has(c)}n.forEach=function(o,c){qn(this),this.g.forEach(function(h,g){h.forEach(function(P){o.call(c,P,g,this)},this)},this)},n.na=function(){qn(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let g=0;g<c.length;g++){const P=o[g];for(let D=0;D<P.length;D++)h.push(c[g])}return h},n.V=function(o){qn(this);let c=[];if(typeof o=="string")Yl(this,o)&&(c=c.concat(this.g.get(Or(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},n.set=function(o,c){return qn(this),this.i=null,o=Or(this,o),Yl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function Jl(o,c,h){Ql(o,c),0<h.length&&(o.i=null,o.g.set(Or(o,c),S(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var g=c[h];const D=encodeURIComponent(String(g)),H=this.V(g);for(g=0;g<H.length;g++){var P=D;H[g]!==""&&(P+="="+encodeURIComponent(String(H[g]))),o.push(P)}}return this.i=o.join("&")};function Or(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function _p(o,c){c&&!o.j&&(qn(o),o.i=null,o.g.forEach(function(h,g){var P=g.toLowerCase();g!=P&&(Ql(this,g),Jl(this,P,h))},o)),o.j=c}function vp(o,c){const h=new ze;if(l.Image){const g=new Image;g.onload=I(Gn,h,"TestLoadImage: loaded",!0,c,g),g.onerror=I(Gn,h,"TestLoadImage: error",!1,c,g),g.onabort=I(Gn,h,"TestLoadImage: abort",!1,c,g),g.ontimeout=I(Gn,h,"TestLoadImage: timeout",!1,c,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else c(!1)}function yp(o,c){const h=new ze,g=new AbortController,P=setTimeout(()=>{g.abort(),Gn(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:g.signal}).then(D=>{clearTimeout(P),D.ok?Gn(h,"TestPingServer: ok",!0,c):Gn(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(P),Gn(h,"TestPingServer: error",!1,c)})}function Gn(o,c,h,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(h)}catch{}}function bp(){this.g=new pr}function wp(o,c,h){const g=h||"";try{zl(o,function(P,D){let H=P;d(P)&&(H=Kt(P)),c.push(g+D+"="+encodeURIComponent(H))})}catch(P){throw c.push(g+"type="+encodeURIComponent("_badmap")),P}}function fs(o){this.l=o.Ub||null,this.j=o.eb||!1}C(fs,hn),fs.prototype.g=function(){return new ps(this.l,this.j)},fs.prototype.i=function(o){return function(){return o}}({});function ps(o,c){ie.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(ps,ie),n=ps.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,mi(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,gi(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,mi(this)),this.g&&(this.readyState=3,mi(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?gi(this):mi(this),this.readyState==3&&Xl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,gi(this))},n.Qa=function(o){this.g&&(this.response=o,gi(this))},n.ga=function(){this.g&&gi(this)};function gi(o){o.readyState=4,o.l=null,o.j=null,o.v=null,mi(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function mi(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ps.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Zl(o){let c="";return W(o,function(h,g){c+=g,c+=":",c+=h,c+=`\r
`}),c}function jo(o,c,h){e:{for(g in h){var g=!1;break e}g=!0}g||(h=Zl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):qe(o,c,h))}function Qe(o){ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Qe,ie);var Ep=/^https?$/i,Ip=["POST","PUT"];n=Qe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,h,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Xt.g(),this.v=this.o?Un(this.o):Un(Xt),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(D){ec(this,D);return}if(o=h||"",h=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)h.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())h.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(h.keys()).find(D=>D.toLowerCase()=="content-type"),P=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Ip,c,void 0))||g||P||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,H]of h)this.g.setRequestHeader(D,H);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{rc(this),this.u=!0,this.g.send(o),this.u=!1}catch(D){ec(this,D)}};function ec(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,tc(o),gs(o)}function tc(o){o.A||(o.A=!0,ge(o,"complete"),ge(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ge(this,"complete"),ge(this,"abort"),gs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),gs(this,!0)),Qe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?nc(this):this.bb())},n.bb=function(){nc(this)};function nc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||An(o)!=4||o.Z()!=2)){if(o.u&&An(o)==4)ke(o.Ea,0,o);else if(ge(o,"readystatechange"),An(o)==4){o.h=!1;try{const H=o.Z();e:switch(H){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var g;if(g=H===0){var P=String(o.D).match(Hl)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),g=!Ep.test(P?P.toLowerCase():"")}h=g}if(h)ge(o,"complete"),ge(o,"success");else{o.m=6;try{var D=2<An(o)?o.g.statusText:""}catch{D=""}o.l=D+" ["+o.Z()+"]",tc(o)}}finally{gs(o)}}}}function gs(o,c){if(o.g){rc(o);const h=o.g,g=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||ge(o,"ready");try{h.onreadystatechange=g}catch{}}}function rc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function An(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<An(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Vr(c)}};function ic(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Tp(o){const c={};o=(o.g&&2<=An(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(R(o[g]))continue;var h=x(o[g]);const P=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const D=c[P]||[];c[P]=D,D.push(h)}w(c,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function _i(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function sc(o){this.Aa=0,this.i=[],this.j=new ze,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=_i("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=_i("baseRetryDelayMs",5e3,o),this.cb=_i("retryDelaySeedMs",1e4,o),this.Wa=_i("forwardChannelMaxRetries",2,o),this.wa=_i("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ul(o&&o.concurrentRequestLimit),this.Da=new bp,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=sc.prototype,n.la=8,n.G=1,n.connect=function(o,c,h,g){te(0),this.W=o,this.H=c||{},h&&g!==void 0&&(this.H.OSID=h,this.H.OAID=g),this.F=this.X,this.I=pc(this,null,this.W),_s(this)};function Bo(o){if(oc(o),o.G==3){var c=o.U++,h=xn(o.I);if(qe(h,"SID",o.K),qe(h,"RID",c),qe(h,"TYPE","terminate"),vi(o,h),c=new Bn(o,o.j,c),c.L=2,c.v=ds(xn(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=gc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),cs(c)}fc(o)}function ms(o){o.g&&(Go(o),o.g.cancel(),o.g=null)}function oc(o){ms(o),o.u&&(l.clearTimeout(o.u),o.u=null),vs(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function _s(o){if(!jl(o.h)&&!o.s){o.s=!0;var c=o.Ga;q||ee(),j||(q(),j=!0),z.add(c,o),o.B=0}}function xp(o,c){return Bl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Xe(_(o.Ga,o,c),dc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const P=new Bn(this,this.j,o);let D=this.o;if(this.S&&(D?(D=v(D),E(D,this.S)):D=this.S),this.m!==null||this.O||(P.H=D,D=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var g=this.i[h];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(c+=g,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=lc(this,P,c),h=xn(this.I),qe(h,"RID",o),qe(h,"CVER",22),this.D&&qe(h,"X-HTTP-Session-Id",this.D),vi(this,h),D&&(this.O?c="headers="+encodeURIComponent(String(Zl(D)))+"&"+c:this.m&&jo(h,this.m,D)),Uo(this.h,P),this.Ua&&qe(h,"TYPE","init"),this.P?(qe(h,"$req",c),qe(h,"SID","null"),P.T=!0,Oo(P,h,null)):Oo(P,h,c),this.G=2}}else this.G==3&&(o?ac(this,o):this.i.length==0||jl(this.h)||ac(this))};function ac(o,c){var h;c?h=c.l:h=o.U++;const g=xn(o.I);qe(g,"SID",o.K),qe(g,"RID",h),qe(g,"AID",o.T),vi(o,g),o.m&&o.o&&jo(g,o.m,o.o),h=new Bn(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=lc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Uo(o.h,h),Oo(h,g,c)}function vi(o,c){o.H&&W(o.H,function(h,g){qe(c,g,h)}),o.l&&zl({},function(h,g){qe(c,g,h)})}function lc(o,c,h){h=Math.min(o.i.length,h);var g=o.l?_(o.l.Na,o.l,o):null;e:{var P=o.i;let D=-1;for(;;){const H=["count="+h];D==-1?0<h?(D=P[0].g,H.push("ofs="+D)):D=0:H.push("ofs="+D);let Oe=!0;for(let mt=0;mt<h;mt++){let Ae=P[mt].g;const Et=P[mt].map;if(Ae-=D,0>Ae)D=Math.max(0,P[mt].g-100),Oe=!1;else try{wp(Et,H,"req"+Ae+"_")}catch{g&&g(Et)}}if(Oe){g=H.join("&");break e}}}return o=o.i.splice(0,h),c.D=o,g}function cc(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;q||ee(),j||(q(),j=!0),z.add(c,o),o.v=0}}function qo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Xe(_(o.Fa,o),dc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,uc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Xe(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,te(10),ms(this),uc(this))};function Go(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function uc(o){o.g=new Bn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=xn(o.qa);qe(c,"RID","rpc"),qe(c,"SID",o.K),qe(c,"AID",o.T),qe(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&qe(c,"TO",o.ja),qe(c,"TYPE","xmlhttp"),vi(o,c),o.m&&o.o&&jo(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=ds(xn(c)),h.m=null,h.P=!0,Ml(h,o)}n.Za=function(){this.C!=null&&(this.C=null,ms(this),qo(this),te(19))};function vs(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function hc(o,c){var h=null;if(o.g==c){vs(o),Go(o),o.g=null;var g=2}else if(Fo(o.h,c))h=c.D,ql(o.h,c),g=1;else return;if(o.G!=0){if(c.o)if(g==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var P=o.B;g=Be(),ge(g,new $e(g,h)),_s(o)}else cc(o);else if(P=c.s,P==3||P==0&&0<c.X||!(g==1&&xp(o,c)||g==2&&qo(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),P){case 1:vr(o,5);break;case 4:vr(o,10);break;case 3:vr(o,6);break;default:vr(o,2)}}}function dc(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function vr(o,c){if(o.j.info("Error code "+c),c==2){var h=_(o.fb,o),g=o.Xa;const P=!g;g=new _r(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||us(g,"https"),ds(g),P?vp(g.toString(),h):yp(g.toString(),h)}else te(2);o.G=0,o.l&&o.l.sa(c),fc(o),oc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),te(2)):(this.j.info("Failed to ping google.com"),te(1))};function fc(o){if(o.G=0,o.ka=[],o.l){const c=Gl(o.h);(c.length!=0||o.i.length!=0)&&(A(o.ka,c),A(o.ka,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.ra()}}function pc(o,c,h){var g=h instanceof _r?xn(h):new _r(h);if(g.g!="")c&&(g.g=c+"."+g.g),hs(g,g.s);else{var P=l.location;g=P.protocol,c=c?c+"."+P.hostname:P.hostname,P=+P.port;var D=new _r(null);g&&us(D,g),c&&(D.g=c),P&&hs(D,P),h&&(D.l=h),g=D}return h=o.D,c=o.ya,h&&c&&qe(g,h,c),qe(g,"VER",o.la),vi(o,g),g}function gc(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Qe(new fs({eb:h})):new Qe(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function mc(){}n=mc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ys(){}ys.prototype.g=function(o,c){return new Ft(o,c)};function Ft(o,c){ie.call(this),this.g=new sc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!R(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!R(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Mr(this)}C(Ft,ie),Ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){Bo(this.g)},Ft.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Kt(o),o=h);c.i.push(new lp(c.Ya++,o)),c.G==3&&_s(c)},Ft.prototype.N=function(){this.g.l=null,delete this.j,Bo(this.g),delete this.g,Ft.aa.N.call(this)};function _c(o){gr.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}C(_c,gr);function vc(){Tn.call(this),this.status=1}C(vc,Tn);function Mr(o){this.g=o}C(Mr,mc),Mr.prototype.ua=function(){ge(this.g,"a")},Mr.prototype.ta=function(o){ge(this.g,new _c(o))},Mr.prototype.sa=function(o){ge(this.g,new vc)},Mr.prototype.ra=function(){ge(this.g,"b")},ys.prototype.createWebChannel=ys.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,Wh=function(){return new ys},Hh=function(){return Be()},zh=Lt,fa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Pe.NO_ERROR=0,Pe.TIMEOUT=8,Pe.HTTP_ERROR=6,Rs=Pe,Jt.COMPLETE="complete",Gh=Jt,jn.EventType=Qt,Qt.OPEN="a",Qt.CLOSE="b",Qt.ERROR="c",Qt.MESSAGE="d",ie.prototype.listen=ie.prototype.K,yi=jn,Qe.prototype.listenOnce=Qe.prototype.L,Qe.prototype.getLastError=Qe.prototype.Ka,Qe.prototype.getLastErrorCode=Qe.prototype.Ba,Qe.prototype.getStatus=Qe.prototype.Z,Qe.prototype.getResponseJson=Qe.prototype.Oa,Qe.prototype.getResponseText=Qe.prototype.oa,Qe.prototype.send=Qe.prototype.ea,Qe.prototype.setWithCredentials=Qe.prototype.Ha,qh=Qe}).apply(typeof Es<"u"?Es:typeof self<"u"?self:typeof window<"u"?window:{});const Vc="@firebase/firestore",Oc="4.8.0";/**
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
 */class xt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}xt.UNAUTHENTICATED=new xt(null),xt.GOOGLE_CREDENTIALS=new xt("google-credentials-uid"),xt.FIRST_PARTY=new xt("first-party-uid"),xt.MOCK_USER=new xt("mock-user");/**
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
 */let si="11.10.0";/**
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
 */const Rr=new Va("@firebase/firestore");function jr(){return Rr.logLevel}function Q(n,...e){if(Rr.logLevel<=ye.DEBUG){const t=e.map(La);Rr.debug(`Firestore (${si}): ${n}`,...t)}}function Nn(n,...e){if(Rr.logLevel<=ye.ERROR){const t=e.map(La);Rr.error(`Firestore (${si}): ${n}`,...t)}}function ir(n,...e){if(Rr.logLevel<=ye.WARN){const t=e.map(La);Rr.warn(`Firestore (${si}): ${n}`,...t)}}function La(n){if(typeof n=="string")return n;try{/**
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
 */function se(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Kh(n,r,t)}function Kh(n,e,t){let r=`FIRESTORE (${si}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Nn(r),new Error(r)}function Ce(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Kh(e,i,r)}function fe(n,e){return n}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends Ln{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class tr{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Qh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(xt.UNAUTHENTICATED))}shutdown(){}}class Am{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Sm{constructor(e){this.t=e,this.currentUser=xt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Ce(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new tr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new tr,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new tr)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ce(typeof r.accessToken=="string",31837,{l:r}),new Qh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ce(e===null||typeof e=="string",2055,{h:e}),new xt(e)}}class Cm{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=xt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Rm{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Cm(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(xt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Mc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class km{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,tn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Ce(this.o===void 0,3512);const r=s=>{s.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Mc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Ce(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Mc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function $m(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function Yh(){return new TextEncoder}/**
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
 */class Fa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=$m(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ve(n,e){return n<e?-1:n>e?1:0}function pa(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return ve(r,i);{const s=Yh(),a=Pm(s.encode(Lc(n,t)),s.encode(Lc(e,t)));return a!==0?a:ve(r,i)}}t+=r>65535?2:1}return ve(n.length,e.length)}function Lc(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Pm(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ve(n[t],e[t]);return ve(n.length,e.length)}function Jr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */const Fc="__name__";class dn{constructor(e,t,r){t===void 0?t=0:t>e.length&&se(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&se(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return dn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof dn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=dn.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ve(e.length,t.length)}static compareSegments(e,t){const r=dn.isNumericId(e),i=dn.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?dn.extractNumericId(e).compare(dn.extractNumericId(t)):pa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return er.fromString(e.substring(4,e.length-2))}}class Ue extends dn{construct(e,t,r){return new Ue(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new Ue(t)}static emptyPath(){return new Ue([])}}const Nm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class vt extends dn{construct(e,t,r){return new vt(e,t,r)}static isValidIdentifier(e){return Nm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),vt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fc}static keyField(){return new vt([Fc])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new K(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new K(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new K(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new vt(t)}static emptyPath(){return new vt([])}}/**
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
 */class ne{constructor(e){this.path=e}static fromPath(e){return new ne(Ue.fromString(e))}static fromName(e){return new ne(Ue.fromString(e).popFirst(5))}static empty(){return new ne(Ue.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ue.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ue.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ne(new Ue(e.slice()))}}/**
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
 */function Jh(n,e,t){if(!t)throw new K(M.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Dm(n,e,t,r){if(e===!0&&r===!0)throw new K(M.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Uc(n){if(!ne.isDocumentKey(n))throw new K(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function jc(n){if(ne.isDocumentKey(n))throw new K(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Xh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function go(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":se(12329,{type:typeof n})}function jt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=go(n);throw new K(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function at(n,e){const t={typeString:n};return e&&(t.value=e),t}function Qi(n,e){if(!Xh(n))throw new K(M.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new K(M.INVALID_ARGUMENT,t);return!0}/**
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
 */const Bc=-62135596800,qc=1e6;class Ge{static now(){return Ge.fromMillis(Date.now())}static fromDate(e){return Ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*qc);return new Ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Bc)throw new K(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qc}_compareTo(e){return this.seconds===e.seconds?ve(this.nanoseconds,e.nanoseconds):ve(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Qi(e,Ge._jsonSchema))return new Ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Bc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ge._jsonSchemaVersion="firestore/timestamp/1.0",Ge._jsonSchema={type:at("string",Ge._jsonSchemaVersion),seconds:at("number"),nanoseconds:at("number")};/**
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
 */class ue{static fromTimestamp(e){return new ue(e)}static min(){return new ue(new Ge(0,0))}static max(){return new ue(new Ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ni=-1;function Vm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=ue.fromTimestamp(r===1e9?new Ge(t+1,0):new Ge(t,r));return new sr(i,ne.empty(),e)}function Om(n){return new sr(n.readTime,n.key,Ni)}class sr{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new sr(ue.min(),ne.empty(),Ni)}static max(){return new sr(ue.max(),ne.empty(),Ni)}}function Mm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=ne.comparator(n.documentKey,e.documentKey),t!==0?t:ve(n.largestBatchId,e.largestBatchId))}/**
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
 */const Lm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Fm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function oi(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==Lm)throw n;Q("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&se(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new L((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof L?t:L.resolve(t)}catch(t){return L.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):L.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):L.reject(t)}static resolve(e){return new L((t,r)=>{t(e)})}static reject(e){return new L((t,r)=>{r(e)})}static waitFor(e){return new L((t,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&t()},u=>r(u))}),a=!0,s===i&&t()})}static or(e){let t=L.resolve(!1);for(const r of e)t=t.next(i=>i?L.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new L((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let u=0;u<s;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,t){return new L((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function Um(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ai(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class mo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}mo.ue=-1;/**
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
 */const Ua=-1;function _o(n){return n==null}function Ks(n){return n===0&&1/n==-1/0}function jm(n){return typeof n=="number"&&Number.isInteger(n)&&!Ks(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Zh="";function Bm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Gc(e)),e=qm(n.get(t),e);return Gc(e)}function qm(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Zh:t+="";break;default:t+=s}}return t}function Gc(n){return n+Zh+""}/**
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
 */function zc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function hr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ed(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ke{constructor(e,t){this.comparator=e,this.root=t||_t.EMPTY}insert(e,t){return new Ke(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_t.BLACK,null,null))}remove(e){return new Ke(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_t.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Is(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Is(this.root,e,this.comparator,!1)}getReverseIterator(){return new Is(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Is(this.root,e,this.comparator,!0)}}class Is{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _t{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??_t.RED,this.left=i??_t.EMPTY,this.right=s??_t.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new _t(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return _t.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return _t.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw se(43730,{key:this.key,value:this.value});if(this.right.isRed())throw se(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw se(27949);return e+(this.isRed()?0:1)}}_t.EMPTY=null,_t.RED=!0,_t.BLACK=!1;_t.EMPTY=new class{constructor(){this.size=0}get key(){throw se(57766)}get value(){throw se(16141)}get color(){throw se(16727)}get left(){throw se(29726)}get right(){throw se(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new _t(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ht{constructor(e){this.comparator=e,this.data=new Ke(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Hc(this.data.getIterator())}getIteratorFrom(e){return new Hc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ht)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ht(this.comparator);return t.data=e,t}}class Hc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ut{constructor(e){this.fields=e,e.sort(vt.comparator)}static empty(){return new Ut([])}unionWith(e){let t=new ht(vt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ut(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class td extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class yt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new td("Invalid base64 string: "+s):s}}(e);return new yt(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new yt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ve(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}yt.EMPTY_BYTE_STRING=new yt("");const Gm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function or(n){if(Ce(!!n,39018),typeof n=="string"){let e=0;const t=Gm.exec(n);if(Ce(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ar(n){return typeof n=="string"?yt.fromBase64String(n):yt.fromUint8Array(n)}/**
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
 */const nd="server_timestamp",rd="__type__",id="__previous_value__",sd="__local_write_time__";function ja(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[rd])===null||t===void 0?void 0:t.stringValue)===nd}function vo(n){const e=n.mapValue.fields[id];return ja(e)?vo(e):e}function Di(n){const e=or(n.mapValue.fields[sd].timestampValue);return new Ge(e.seconds,e.nanos)}/**
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
 */class zm{constructor(e,t,r,i,s,a,l,u,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const Qs="(default)";class Vi{constructor(e,t){this.projectId=e,this.database=t||Qs}static empty(){return new Vi("","")}get isDefaultDatabase(){return this.database===Qs}isEqual(e){return e instanceof Vi&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const od="__type__",Hm="__max__",Ts={mapValue:{}},ad="__vector__",Ys="value";function lr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ja(n)?4:Km(n)?9007199254740991:Wm(n)?10:11:se(28295,{value:n})}function bn(n,e){if(n===e)return!0;const t=lr(n);if(t!==lr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Di(n).isEqual(Di(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=or(i.timestampValue),l=or(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return ar(i.bytesValue).isEqual(ar(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return et(i.geoPointValue.latitude)===et(s.geoPointValue.latitude)&&et(i.geoPointValue.longitude)===et(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return et(i.integerValue)===et(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=et(i.doubleValue),l=et(s.doubleValue);return a===l?Ks(a)===Ks(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Jr(n.arrayValue.values||[],e.arrayValue.values||[],bn);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(zc(a)!==zc(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!bn(a[u],l[u])))return!1;return!0}(n,e);default:return se(52216,{left:n})}}function Oi(n,e){return(n.values||[]).find(t=>bn(t,e))!==void 0}function Xr(n,e){if(n===e)return 0;const t=lr(n),r=lr(e);if(t!==r)return ve(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ve(n.booleanValue,e.booleanValue);case 2:return function(s,a){const l=et(s.integerValue||s.doubleValue),u=et(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return Wc(n.timestampValue,e.timestampValue);case 4:return Wc(Di(n),Di(e));case 5:return pa(n.stringValue,e.stringValue);case 6:return function(s,a){const l=ar(s),u=ar(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const f=ve(l[d],u[d]);if(f!==0)return f}return ve(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const l=ve(et(s.latitude),et(a.latitude));return l!==0?l:ve(et(s.longitude),et(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Kc(n.arrayValue,e.arrayValue);case 10:return function(s,a){var l,u,d,f;const p=s.fields||{},_=a.fields||{},I=(l=p[Ys])===null||l===void 0?void 0:l.arrayValue,C=(u=_[Ys])===null||u===void 0?void 0:u.arrayValue,S=ve(((d=I?.values)===null||d===void 0?void 0:d.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Kc(I,C)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Ts.mapValue&&a===Ts.mapValue)return 0;if(s===Ts.mapValue)return 1;if(a===Ts.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const _=pa(u[p],f[p]);if(_!==0)return _;const I=Xr(l[u[p]],d[f[p]]);if(I!==0)return I}return ve(u.length,f.length)}(n.mapValue,e.mapValue);default:throw se(23264,{le:t})}}function Wc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ve(n,e);const t=or(n),r=or(e),i=ve(t.seconds,r.seconds);return i!==0?i:ve(t.nanos,r.nanos)}function Kc(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Xr(t[i],r[i]);if(s)return s}return ve(t.length,r.length)}function Zr(n){return ga(n)}function ga(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=or(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return ar(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return ne.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=ga(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${ga(t.fields[a])}`;return i+"}"}(n.mapValue):se(61005,{value:n})}function ks(n){switch(lr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=vo(n);return e?16+ks(e):16;case 5:return 2*n.stringValue.length;case 6:return ar(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+ks(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return hr(r.fields,(s,a)=>{i+=s.length+ks(a)}),i}(n.mapValue);default:throw se(13486,{value:n})}}function Qc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ma(n){return!!n&&"integerValue"in n}function Ba(n){return!!n&&"arrayValue"in n}function Yc(n){return!!n&&"nullValue"in n}function Jc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function $s(n){return!!n&&"mapValue"in n}function Wm(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[od])===null||t===void 0?void 0:t.stringValue)===ad}function xi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return hr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=xi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Km(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Hm}/**
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
 */class Mt{constructor(e){this.value=e}static empty(){return new Mt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!$s(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xi(t)}setAll(e){let t=vt.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=l.popLast()}a?r[l.lastSegment()]=xi(a):i.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());$s(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return bn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];$s(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){hr(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Mt(xi(this.value))}}function ld(n){const e=[];return hr(n.fields,(t,r)=>{const i=new vt([t]);if($s(r)){const s=ld(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new Ut(e)}/**
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
 */class At{constructor(e,t,r,i,s,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new At(e,0,ue.min(),ue.min(),ue.min(),Mt.empty(),0)}static newFoundDocument(e,t,r,i){return new At(e,1,t,ue.min(),r,i,0)}static newNoDocument(e,t){return new At(e,2,t,ue.min(),ue.min(),Mt.empty(),0)}static newUnknownDocument(e,t){return new At(e,3,t,ue.min(),ue.min(),Mt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ue.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ue.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof At&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new At(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Js{constructor(e,t){this.position=e,this.inclusive=t}}function Xc(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=ne.comparator(ne.fromName(a.referenceValue),t.key):r=Xr(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Zc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!bn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Mi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Qm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class cd{}class ot extends cd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Jm(e,t,r):t==="array-contains"?new e_(e,r):t==="in"?new t_(e,r):t==="not-in"?new n_(e,r):t==="array-contains-any"?new r_(e,r):new ot(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Xm(e,r):new Zm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Xr(t,this.value)):t!==null&&lr(this.value)===lr(t)&&this.matchesComparison(Xr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return se(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class an extends cd{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new an(e,t)}matches(e){return ud(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ud(n){return n.op==="and"}function hd(n){return Ym(n)&&ud(n)}function Ym(n){for(const e of n.filters)if(e instanceof an)return!1;return!0}function _a(n){if(n instanceof ot)return n.field.canonicalString()+n.op.toString()+Zr(n.value);if(hd(n))return n.filters.map(e=>_a(e)).join(",");{const e=n.filters.map(t=>_a(t)).join(",");return`${n.op}(${e})`}}function dd(n,e){return n instanceof ot?function(r,i){return i instanceof ot&&r.op===i.op&&r.field.isEqual(i.field)&&bn(r.value,i.value)}(n,e):n instanceof an?function(r,i){return i instanceof an&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&dd(a,i.filters[l]),!0):!1}(n,e):void se(19439)}function fd(n){return n instanceof ot?function(t){return`${t.field.canonicalString()} ${t.op} ${Zr(t.value)}`}(n):n instanceof an?function(t){return t.op.toString()+" {"+t.getFilters().map(fd).join(" ,")+"}"}(n):"Filter"}class Jm extends ot{constructor(e,t,r){super(e,t,r),this.key=ne.fromName(r.referenceValue)}matches(e){const t=ne.comparator(e.key,this.key);return this.matchesComparison(t)}}class Xm extends ot{constructor(e,t){super(e,"in",t),this.keys=pd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Zm extends ot{constructor(e,t){super(e,"not-in",t),this.keys=pd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function pd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>ne.fromName(r.referenceValue))}class e_ extends ot{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ba(t)&&Oi(t.arrayValue,this.value)}}class t_ extends ot{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Oi(this.value.arrayValue,t)}}class n_ extends ot{constructor(e,t){super(e,"not-in",t)}matches(e){if(Oi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Oi(this.value.arrayValue,t)}}class r_ extends ot{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ba(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Oi(this.value.arrayValue,r))}}/**
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
 */class i_{constructor(e,t=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.Pe=null}}function eu(n,e=null,t=[],r=[],i=null,s=null,a=null){return new i_(n,e,t,r,i,s,a)}function qa(n){const e=fe(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>_a(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),_o(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Zr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Zr(r)).join(",")),e.Pe=t}return e.Pe}function Ga(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Qm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!dd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zc(n.startAt,e.startAt)&&Zc(n.endAt,e.endAt)}function va(n){return ne.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class li{constructor(e,t=null,r=[],i=[],s=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function s_(n,e,t,r,i,s,a,l){return new li(n,e,t,r,i,s,a,l)}function za(n){return new li(n)}function tu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function gd(n){return n.collectionGroup!==null}function Ai(n){const e=fe(n);if(e.Te===null){e.Te=[];const t=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ht(vt.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Mi(s,r))}),t.has(vt.keyField().canonicalString())||e.Te.push(new Mi(vt.keyField(),r))}return e.Te}function pn(n){const e=fe(n);return e.Ie||(e.Ie=o_(e,Ai(n))),e.Ie}function o_(n,e){if(n.limitType==="F")return eu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Mi(i.field,s)});const t=n.endAt?new Js(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Js(n.startAt.position,n.startAt.inclusive):null;return eu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ya(n,e){const t=n.filters.concat([e]);return new li(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ba(n,e,t){return new li(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function yo(n,e){return Ga(pn(n),pn(e))&&n.limitType===e.limitType}function md(n){return`${qa(pn(n))}|lt:${n.limitType}`}function Br(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>fd(i)).join(", ")}]`),_o(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Zr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Zr(i)).join(",")),`Target(${r})`}(pn(n))}; limitType=${n.limitType})`}function bo(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):ne.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Ai(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,l,u){const d=Xc(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,Ai(r),i)||r.endAt&&!function(a,l,u){const d=Xc(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,Ai(r),i))}(n,e)}function a_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function _d(n){return(e,t)=>{let r=!1;for(const i of Ai(n)){const s=l_(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function l_(n,e,t){const r=n.field.isKeyField()?ne.comparator(e.key,t.key):function(s,a,l){const u=a.data.field(s),d=l.data.field(s);return u!==null&&d!==null?Xr(u,d):se(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return se(19790,{direction:n.dir})}}/**
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
 */class Nr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){hr(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return ed(this.inner)}size(){return this.innerSize}}/**
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
 */const c_=new Ke(ne.comparator);function Dn(){return c_}const vd=new Ke(ne.comparator);function bi(...n){let e=vd;for(const t of n)e=e.insert(t.key,t);return e}function yd(n){let e=vd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function wr(){return Si()}function bd(){return Si()}function Si(){return new Nr(n=>n.toString(),(n,e)=>n.isEqual(e))}const u_=new Ke(ne.comparator),h_=new ht(ne.comparator);function be(...n){let e=h_;for(const t of n)e=e.add(t);return e}const d_=new ht(ve);function f_(){return d_}/**
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
 */function Ha(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ks(e)?"-0":e}}function wd(n){return{integerValue:""+n}}function p_(n,e){return jm(e)?wd(e):Ha(n,e)}/**
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
 */class wo{constructor(){this._=void 0}}function g_(n,e,t){return n instanceof Li?function(i,s){const a={fields:{[rd]:{stringValue:nd},[sd]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ja(s)&&(s=vo(s)),s&&(a.fields[id]=s),{mapValue:a}}(t,e):n instanceof Fi?Id(n,e):n instanceof Ui?Td(n,e):function(i,s){const a=Ed(i,s),l=nu(a)+nu(i.Ee);return ma(a)&&ma(i.Ee)?wd(l):Ha(i.serializer,l)}(n,e)}function m_(n,e,t){return n instanceof Fi?Id(n,e):n instanceof Ui?Td(n,e):t}function Ed(n,e){return n instanceof Xs?function(r){return ma(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Li extends wo{}class Fi extends wo{constructor(e){super(),this.elements=e}}function Id(n,e){const t=xd(e);for(const r of n.elements)t.some(i=>bn(i,r))||t.push(r);return{arrayValue:{values:t}}}class Ui extends wo{constructor(e){super(),this.elements=e}}function Td(n,e){let t=xd(e);for(const r of n.elements)t=t.filter(i=>!bn(i,r));return{arrayValue:{values:t}}}class Xs extends wo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function nu(n){return et(n.integerValue||n.doubleValue)}function xd(n){return Ba(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class __{constructor(e,t){this.field=e,this.transform=t}}function v_(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Fi&&i instanceof Fi||r instanceof Ui&&i instanceof Ui?Jr(r.elements,i.elements,bn):r instanceof Xs&&i instanceof Xs?bn(r.Ee,i.Ee):r instanceof Li&&i instanceof Li}(n.transform,e.transform)}class y_{constructor(e,t){this.version=e,this.transformResults=t}}class $t{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new $t}static exists(e){return new $t(void 0,e)}static updateTime(e){return new $t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ps(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Eo{}function Ad(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Io(n.key,$t.none()):new Yi(n.key,n.data,$t.none());{const t=n.data,r=Mt.empty();let i=new ht(vt.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new dr(n.key,r,new Ut(i.toArray()),$t.none())}}function b_(n,e,t){n instanceof Yi?function(i,s,a){const l=i.value.clone(),u=iu(i.fieldTransforms,s,a.transformResults);l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof dr?function(i,s,a){if(!Ps(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=iu(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(Sd(i)),u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ci(n,e,t,r){return n instanceof Yi?function(s,a,l,u){if(!Ps(s.precondition,a))return l;const d=s.value.clone(),f=su(s.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof dr?function(s,a,l,u){if(!Ps(s.precondition,a))return l;const d=su(s.fieldTransforms,u,a),f=a.data;return f.setAll(Sd(s)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,a,l){return Ps(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function w_(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Ed(r.transform,i||null);s!=null&&(t===null&&(t=Mt.empty()),t.set(r.field,s))}return t||null}function ru(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Jr(r,i,(s,a)=>v_(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Yi extends Eo{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class dr extends Eo{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Sd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function iu(n,e,t){const r=new Map;Ce(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,m_(a,l,t[i]))}return r}function su(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,g_(s,a,e))}return r}class Io extends Eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class E_ extends Eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class I_{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&b_(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ci(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ci(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=bd();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=t.has(i.key)?null:l;const u=Ad(a,l);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(ue.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),be())}isEqual(e){return this.batchId===e.batchId&&Jr(this.mutations,e.mutations,(t,r)=>ru(t,r))&&Jr(this.baseMutations,e.baseMutations,(t,r)=>ru(t,r))}}class Wa{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Ce(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return u_}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Wa(e,t,r,i)}}/**
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
 */class x_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var it,Ie;function A_(n){switch(n){case M.OK:return se(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return se(15467,{code:n})}}function Cd(n){if(n===void 0)return Nn("GRPC error has no .code"),M.UNKNOWN;switch(n){case it.OK:return M.OK;case it.CANCELLED:return M.CANCELLED;case it.UNKNOWN:return M.UNKNOWN;case it.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case it.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case it.INTERNAL:return M.INTERNAL;case it.UNAVAILABLE:return M.UNAVAILABLE;case it.UNAUTHENTICATED:return M.UNAUTHENTICATED;case it.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case it.NOT_FOUND:return M.NOT_FOUND;case it.ALREADY_EXISTS:return M.ALREADY_EXISTS;case it.PERMISSION_DENIED:return M.PERMISSION_DENIED;case it.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case it.ABORTED:return M.ABORTED;case it.OUT_OF_RANGE:return M.OUT_OF_RANGE;case it.UNIMPLEMENTED:return M.UNIMPLEMENTED;case it.DATA_LOSS:return M.DATA_LOSS;default:return se(39323,{code:n})}}(Ie=it||(it={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const S_=new er([4294967295,4294967295],0);function ou(n){const e=Yh().encode(n),t=new Bh;return t.update(e),new Uint8Array(t.digest())}function au(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new er([t,r],0),new er([i,s],0)]}class Ka{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new wi(`Invalid padding: ${t}`);if(r<0)throw new wi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new wi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new wi(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=er.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(er.fromNumber(r)));return i.compare(S_)===1&&(i=new er([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=ou(e),[r,i]=au(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Ka(s,i,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=ou(e),[r,i]=au(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class wi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class To{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Ji.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new To(ue.min(),i,new Ke(ve),Dn(),be())}}class Ji{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ji(r,t,be(),be(),be())}}/**
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
 */class Ns{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}}class Rd{constructor(e,t){this.targetId=e,this.De=t}}class kd{constructor(e,t,r=yt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class lu{constructor(){this.ve=0,this.Ce=cu(),this.Fe=yt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=be(),t=be(),r=be();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:se(38017,{changeType:s})}}),new Ji(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=cu()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,Ce(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class C_{constructor(e){this.We=e,this.Ge=new Map,this.ze=Dn(),this.je=xs(),this.Je=xs(),this.He=new Ke(ve)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:se(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,r=e.De.count,i=this.st(t);if(i){const s=i.target;if(va(s))if(r===0){const a=new ne(s.path);this.Xe(t,a,At.newNoDocument(a,ue.min()))}else Ce(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),u=l?this.ut(l,e,a):1;if(u!==0){this.rt(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,d)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,l;try{a=ar(r).toUint8Array()}catch(u){if(u instanceof td)return ir("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Ka(a,i,s)}catch(u){return ir(u instanceof wi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,s,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((s,a)=>{const l=this.st(a);if(l){if(s.current&&va(l.target)){const u=new ne(l.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,At.newNoDocument(u,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=be();this.Je.forEach((s,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.st(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));const i=new To(e,t,this.He,this.ze,r);return this.ze=Dn(),this.je=xs(),this.Je=xs(),this.He=new Ke(ve),i}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new lu,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new ht(ve),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new ht(ve),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||Q("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new lu),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function xs(){return new Ke(ne.comparator)}function cu(){return new Ke(ne.comparator)}const R_={asc:"ASCENDING",desc:"DESCENDING"},k_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},$_={and:"AND",or:"OR"};class P_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function wa(n,e){return n.useProto3Json||_o(e)?e:{value:e}}function Zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $d(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function N_(n,e){return Zs(n,e.toTimestamp())}function gn(n){return Ce(!!n,49232),ue.fromTimestamp(function(t){const r=or(t);return new Ge(r.seconds,r.nanos)}(n))}function Qa(n,e){return Ea(n,e).canonicalString()}function Ea(n,e){const t=function(i){return new Ue(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Pd(n){const e=Ue.fromString(n);return Ce(Md(e),10190,{key:e.toString()}),e}function Ia(n,e){return Qa(n.databaseId,e.path)}function Xo(n,e){const t=Pd(e);if(t.get(1)!==n.databaseId.projectId)throw new K(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new ne(Dd(t))}function Nd(n,e){return Qa(n.databaseId,e)}function D_(n){const e=Pd(n);return e.length===4?Ue.emptyPath():Dd(e)}function Ta(n){return new Ue(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Dd(n){return Ce(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function uu(n,e,t){return{name:Ia(n,e),fields:t.value.mapValue.fields}}function V_(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:se(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,f){return d.useProto3Json?(Ce(f===void 0||typeof f=="string",58123),yt.fromBase64String(f||"")):(Ce(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),yt.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const f=d.code===void 0?M.UNKNOWN:Cd(d.code);return new K(f,d.message||"")}(a);t=new kd(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Xo(n,r.document.name),s=gn(r.document.updateTime),a=r.document.createTime?gn(r.document.createTime):ue.min(),l=new Mt({mapValue:{fields:r.document.fields}}),u=At.newFoundDocument(i,s,a,l),d=r.targetIds||[],f=r.removedTargetIds||[];t=new Ns(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Xo(n,r.document),s=r.readTime?gn(r.readTime):ue.min(),a=At.newNoDocument(i,s),l=r.removedTargetIds||[];t=new Ns([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Xo(n,r.document),s=r.removedTargetIds||[];t=new Ns([],s,i,null)}else{if(!("filter"in e))return se(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new x_(i,s),l=r.targetId;t=new Rd(l,a)}}return t}function O_(n,e){let t;if(e instanceof Yi)t={update:uu(n,e.key,e.value)};else if(e instanceof Io)t={delete:Ia(n,e.key)};else if(e instanceof dr)t={update:uu(n,e.key,e.data),updateMask:z_(e.fieldMask)};else{if(!(e instanceof E_))return se(16599,{Rt:e.type});t={verify:Ia(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof Li)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Fi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ui)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Xs)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw se(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:N_(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:se(27497)}(n,e.precondition)),t}function M_(n,e){return n&&n.length>0?(Ce(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?gn(i.updateTime):gn(s);return a.isEqual(ue.min())&&(a=gn(s)),new y_(a,i.transformResults||[])}(t,e))):[]}function L_(n,e){return{documents:[Nd(n,e.path)]}}function F_(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Nd(n,i);const s=function(d){if(d.length!==0)return Od(an.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(d){if(d.length!==0)return d.map(f=>function(_){return{field:qr(_.field),direction:B_(_.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=wa(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{Vt:t,parent:i}}function U_(n){let e=D_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Ce(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(p){const _=Vd(p);return _ instanceof an&&hd(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(_=>function(C){return new Mi(Gr(C.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(t.orderBy));let l=null;t.limit&&(l=function(p){let _;return _=typeof p=="object"?p.value:p,_o(_)?null:_}(t.limit));let u=null;t.startAt&&(u=function(p){const _=!!p.before,I=p.values||[];return new Js(I,_)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const _=!p.before,I=p.values||[];return new Js(I,_)}(t.endAt)),s_(e,i,a,s,l,"F",u,d)}function j_(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return se(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Gr(t.unaryFilter.field);return ot.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Gr(t.unaryFilter.field);return ot.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Gr(t.unaryFilter.field);return ot.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Gr(t.unaryFilter.field);return ot.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return se(61313);default:return se(60726)}}(n):n.fieldFilter!==void 0?function(t){return ot.create(Gr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return se(58110);default:return se(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return an.create(t.compositeFilter.filters.map(r=>Vd(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return se(1026)}}(t.compositeFilter.op))}(n):se(30097,{filter:n})}function B_(n){return R_[n]}function q_(n){return k_[n]}function G_(n){return $_[n]}function qr(n){return{fieldPath:n.canonicalString()}}function Gr(n){return vt.fromServerFormat(n.fieldPath)}function Od(n){return n instanceof ot?function(t){if(t.op==="=="){if(Jc(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NAN"}};if(Yc(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Jc(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NOT_NAN"}};if(Yc(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:qr(t.field),op:q_(t.op),value:t.value}}}(n):n instanceof an?function(t){const r=t.getFilters().map(i=>Od(i));return r.length===1?r[0]:{compositeFilter:{op:G_(t.op),filters:r}}}(n):se(54877,{filter:n})}function z_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Md(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Yn{constructor(e,t,r,i,s=ue.min(),a=ue.min(),l=yt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Yn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Yn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Yn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Yn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class H_{constructor(e){this.gt=e}}function W_(n){const e=U_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ba(e,e.limit,"L"):e}/**
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
 */class K_{constructor(){this.Dn=new Q_}addToCollectionParentIndex(e,t){return this.Dn.add(t),L.resolve()}getCollectionParents(e,t){return L.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return L.resolve()}deleteFieldIndex(e,t){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,t){return L.resolve()}getDocumentsMatchingTarget(e,t){return L.resolve(null)}getIndexType(e,t){return L.resolve(0)}getFieldIndexes(e,t){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,t){return L.resolve(sr.min())}getMinOffsetFromCollectionGroup(e,t){return L.resolve(sr.min())}updateCollectionGroup(e,t,r){return L.resolve()}updateIndexEntries(e,t){return L.resolve()}}class Q_{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ht(Ue.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ht(Ue.comparator)).toArray()}}/**
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
 */const hu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ld=41943040;class Ot{static withCacheSize(e){return new Ot(e,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ot.DEFAULT_COLLECTION_PERCENTILE=10,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ot.DEFAULT=new Ot(Ld,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ot.DISABLED=new Ot(-1,0,0);/**
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
 */class ei{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new ei(0)}static ur(){return new ei(-1)}}/**
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
 */const du="LruGarbageCollector",Y_=1048576;function fu([n,e],[t,r]){const i=ve(n,t);return i===0?ve(e,r):i}class J_{constructor(e){this.Tr=e,this.buffer=new ht(fu),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();fu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class X_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){Q(du,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ai(t)?Q(du,"Ignoring IndexedDB error during garbage collection: ",t):await oi(t)}await this.Rr(3e5)})}}class Z_{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return L.resolve(mo.ue);const r=new J_(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(hu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),hu):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,l,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,a=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),jr()<=ye.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function ev(n,e){return new Z_(n,e)}/**
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
 */class tv{constructor(){this.changes=new Nr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,At.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?L.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class nv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class rv{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Ci(r.mutation,i,Ut.empty(),Ge.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,be()).next(()=>r))}getLocalViewOfDocuments(e,t,r=be()){const i=wr();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=bi();return s.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=wr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,be()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,i){let s=Dn();const a=Si(),l=function(){return Si()}();return t.forEach((u,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof dr)?s=s.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),Ci(f.mutation,d,f.mutation.getFieldMask(),Ge.now())):a.set(d.key,Ut.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>{var p;return l.set(d,new nv(f,(p=a.get(d))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Si();let i=new Ke((a,l)=>a-l),s=be();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||Ut.empty();f=l.applyToLocalView(d,f),r.set(u,f);const p=(i.get(l.batchId)||be()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,f=u.value,p=bd();f.forEach(_=>{if(!s.has(_)){const I=Ad(t.get(_),r.get(_));I!==null&&p.set(_,I),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return L.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return ne.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):gd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):L.resolve(wr());let l=Ni,u=s;return a.next(d=>L.forEach(d,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),s.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,u,d,be())).next(f=>({batchId:l,changes:yd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ne(t)).next(r=>{let i=bi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=bi();return this.indexManager.getCollectionParents(e,s).next(l=>L.forEach(l,u=>{const d=function(p,_){return new li(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(f=>{f.forEach((p,_)=>{a=a.insert(p,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,At.newInvalidDocument(f)))});let l=bi();return a.forEach((u,d)=>{const f=s.get(u);f!==void 0&&Ci(f.mutation,d,Ut.empty(),Ge.now()),bo(t,d)&&(l=l.insert(u,d))}),l})}}/**
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
 */class iv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return L.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:gn(i.createTime)}}(t)),L.resolve()}getNamedQuery(e,t){return L.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:W_(i.bundledQuery),readTime:gn(i.readTime)}}(t)),L.resolve()}}/**
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
 */class sv{constructor(){this.overlays=new Ke(ne.comparator),this.kr=new Map}getOverlay(e,t){return L.resolve(this.overlays.get(t))}getOverlays(e,t){const r=wr();return L.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),L.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),L.resolve()}getOverlaysForCollection(e,t,r){const i=wr(),s=t.length+1,a=new ne(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return L.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ke((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=s.get(d.largestBatchId);f===null&&(f=wr(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const l=wr(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>l.set(d,f)),!(l.size()>=i)););return L.resolve(l)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new T_(t,r));let s=this.kr.get(t);s===void 0&&(s=be(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}}/**
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
 */class ov{constructor(){this.sessionToken=yt.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,L.resolve()}}/**
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
 */class Ya{constructor(){this.qr=new ht(ft.Qr),this.$r=new ht(ft.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new ft(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ft(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new ne(new Ue([])),r=new ft(t,e),i=new ft(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new ne(new Ue([])),r=new ft(t,e),i=new ft(t,e+1);let s=be();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new ft(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ft{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return ne.comparator(e.key,t.key)||ve(e.Hr,t.Hr)}static Ur(e,t){return ve(e.Hr,t.Hr)||ne.comparator(e.key,t.key)}}/**
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
 */class av{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new ht(ft.Qr)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new I_(s,t,r,i);this.mutationQueue.push(a);for(const l of i)this.Yr=this.Yr.add(new ft(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(a)}lookupMutationBatch(e,t){return L.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return L.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?Ua:this.er-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ft(t,0),i=new ft(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{const l=this.Zr(a.Hr);s.push(l)}),L.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ht(ve);return t.forEach(i=>{const s=new ft(i,0),a=new ft(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],l=>{r=r.add(l.Hr)})}),L.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;ne.isDocumentKey(s)||(s=s.child(""));const a=new ft(new ne(s),0);let l=new ht(ve);return this.Yr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(l=l.add(u.Hr)),!0)},a),L.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Ce(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return L.forEach(t.mutations,i=>{const s=new ft(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new ft(t,0),i=this.Yr.firstAfterOrEqual(r);return L.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class lv{constructor(e){this.ni=e,this.docs=function(){return new Ke(ne.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return L.resolve(r?r.document.mutableCopy():At.newInvalidDocument(t))}getEntries(e,t){let r=Dn();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():At.newInvalidDocument(i))}),L.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Dn();const a=t.path,l=new ne(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Mm(Om(f),r)<=0||(i.has(f.key)||bo(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return L.resolve(s)}getAllFromCollectionGroup(e,t,r,i){se(9500)}ri(e,t){return L.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new cv(this)}getSize(e){return L.resolve(this.size)}}class cv extends tv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),L.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class uv{constructor(e){this.persistence=e,this.ii=new Nr(t=>qa(t),Ga),this.lastRemoteSnapshotVersion=ue.min(),this.highestTargetId=0,this.si=0,this.oi=new Ya,this.targetCount=0,this._i=ei.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),L.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new ei(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,L.resolve()}updateTargetData(e,t){return this.hr(t),L.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),L.waitFor(s).next(()=>i)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return L.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),L.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),L.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),L.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return L.resolve(r)}containsKey(e,t){return L.resolve(this.oi.containsKey(t))}}/**
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
 */class Fd{constructor(e,t){this.ai={},this.overlays={},this.ui=new mo(0),this.ci=!1,this.ci=!0,this.li=new ov,this.referenceDelegate=e(this),this.hi=new uv(this),this.indexManager=new K_,this.remoteDocumentCache=function(i){return new lv(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new H_(t),this.Ti=new iv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new av(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){Q("MemoryPersistence","Starting transaction:",e);const i=new hv(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return L.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class hv extends Fm{constructor(e){super(),this.currentSequenceNumber=e}}class Ja{constructor(e){this.persistence=e,this.Ai=new Ya,this.Ri=null}static Vi(e){return new Ja(e)}get mi(){if(this.Ri)return this.Ri;throw se(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),L.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),L.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.mi,r=>{const i=ne.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,ue.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return L.or([()=>L.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class eo{constructor(e,t){this.persistence=e,this.gi=new Nr(r=>Bm(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=ev(this,t)}static Vi(e,t){return new eo(e,t)}Ii(){}di(e){return L.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return L.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?L.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,s.removeEntry(a,ue.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),L.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),L.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ks(e.data.value)),t}Sr(e,t,r){return L.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return L.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Xa{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=be(),i=be();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Xa(e,t.fromCache,r,i)}}/**
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
 */class dv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class fv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return ag()?8:Um(kt())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new dv;return this.ws(e,t,a).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(jr()<=ye.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",Br(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),L.resolve()):(jr()<=ye.DEBUG&&Q("QueryEngine","Query:",Br(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(jr()<=ye.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",Br(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,pn(t))):L.resolve())}ps(e,t){if(tu(t))return L.resolve(null);let r=pn(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ba(t,null,"F"),r=pn(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=be(...s);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.bs(t,l);return this.Ds(t,d,a,u.readTime)?this.ps(e,ba(t,null,"F")):this.vs(e,d,t,u)}))})))}ys(e,t,r,i){return tu(t)||i.isEqual(ue.min())?L.resolve(null):this.gs.getDocuments(e,r).next(s=>{const a=this.bs(t,s);return this.Ds(t,a,r,i)?L.resolve(null):(jr()<=ye.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Br(t)),this.vs(e,a,t,Vm(i,Ni)).next(l=>l))})}bs(e,t){let r=new ht(_d(e));return t.forEach((i,s)=>{bo(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return jr()<=ye.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",Br(t)),this.gs.getDocumentsMatchingQuery(e,t,sr.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
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
 */const Za="LocalStore",pv=3e8;class gv{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new Ke(ve),this.Ms=new Nr(s=>qa(s),Ga),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new rv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function mv(n,e,t,r){return new gv(n,e,t,r)}async function Ud(n,e){const t=fe(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let u=be();for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of s){l.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:l}))})})}function _v(n,e){const t=fe(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,d,f){const p=d.batch,_=p.keys();let I=L.resolve();return _.forEach(C=>{I=I.next(()=>f.getEntry(u,C)).next(S=>{const A=d.docVersions.get(C);Ce(A!==null,48541),S.version.compareTo(A)<0&&(p.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),f.addEntry(S)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=be();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function jd(n){const e=fe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function vv(n,e){const t=fe(n),r=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const _=i.get(p);if(!_)return;l.push(t.hi.removeMatchingKeys(s,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,p)));let I=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(yt.EMPTY_BYTE_STRING,ue.min()).withLastLimboFreeSnapshotVersion(ue.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(p,I),function(S,A,N){return S.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=pv?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(_,I,f)&&l.push(t.hi.updateTargetData(s,I))});let u=Dn(),d=be();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(yv(s,a,e.documentUpdates).next(f=>{u=f.Ls,d=f.ks})),!r.isEqual(ue.min())){const f=t.hi.getLastRemoteSnapshotVersion(s).next(p=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,d)).next(()=>u)}).then(s=>(t.Fs=i,s))}function yv(n,e,t){let r=be(),i=be();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Dn();return t.forEach((l,u)=>{const d=s.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(ue.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):Q(Za,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ls:a,ks:i}})}function bv(n,e){const t=fe(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ua),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function wv(n,e){const t=fe(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,L.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new Yn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function xa(n,e,t){const r=fe(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ai(a))throw a;Q(Za,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function pu(n,e,t){const r=fe(n);let i=ue.min(),s=be();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=fe(u),_=p.Ms.get(f);return _!==void 0?L.resolve(p.Fs.get(_)):p.hi.getTargetData(d,f)}(r,a,pn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:ue.min(),t?s:be())).next(l=>(Ev(r,a_(e),l),{documents:l,qs:s})))}function Ev(n,e,t){let r=n.xs.get(e)||ue.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}class gu{constructor(){this.activeTargetIds=f_()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Iv{constructor(){this.Fo=new gu,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new gu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */let As=null;function Aa(){return As===null?As=function(){return 268435456+Math.round(2147483648*Math.random())}():As++,"0x"+As.toString(16)}/**
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
 */const Zo="RestConnection",xv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Av{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Qs?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=Aa(),l=this.Go(e,t.toUriEncodedString());Q(Zo,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);const{host:d}=new URL(l),f=ri(d);return this.jo(e,l,u,r,f).then(p=>(Q(Zo,`Received RPC '${e}' ${a}: `,p),p),p=>{throw ir(Zo,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+si}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){const r=xv[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Sv{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const Tt="WebChannelConnection";class Cv extends Av{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){const a=Aa();return new Promise((l,u)=>{const d=new qh;d.setWithCredentials(!0),d.listenOnce(Gh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Rs.NO_ERROR:const p=d.getResponseJson();Q(Tt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case Rs.TIMEOUT:Q(Tt,`RPC '${e}' ${a} timed out`),u(new K(M.DEADLINE_EXCEEDED,"Request time out"));break;case Rs.HTTP_ERROR:const _=d.getStatus();if(Q(Tt,`RPC '${e}' ${a} failed with status:`,_,"response text:",d.getResponseText()),_>0){let I=d.getResponseJson();Array.isArray(I)&&(I=I[0]);const C=I?.error;if(C&&C.status&&C.message){const S=function(N){const R=N.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(R)>=0?R:M.UNKNOWN}(C.status);u(new K(S,C.message))}else u(new K(M.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new K(M.UNAVAILABLE,"Connection failed."));break;default:se(9055,{c_:e,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{Q(Tt,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(i);Q(Tt,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",f,r,15)})}P_(e,t,r){const i=Aa(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Wh(),l=Hh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=s.join("");Q(Tt,`Creating RPC '${e}' stream ${i}: ${f}`,u);const p=a.createWebChannel(f,u);this.T_(p);let _=!1,I=!1;const C=new Sv({Ho:A=>{I?Q(Tt,`Not sending because RPC '${e}' stream ${i} is closed:`,A):(_||(Q(Tt,`Opening RPC '${e}' stream ${i} transport.`),p.open(),_=!0),Q(Tt,`RPC '${e}' stream ${i} sending:`,A),p.send(A))},Yo:()=>p.close()}),S=(A,N,R)=>{A.listen(N,$=>{try{R($)}catch(F){setTimeout(()=>{throw F},0)}})};return S(p,yi.EventType.OPEN,()=>{I||(Q(Tt,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),S(p,yi.EventType.CLOSE,()=>{I||(I=!0,Q(Tt,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(p))}),S(p,yi.EventType.ERROR,A=>{I||(I=!0,ir(Tt,`RPC '${e}' stream ${i} transport errored. Name:`,A.name,"Message:",A.message),C.__(new K(M.UNAVAILABLE,"The operation could not be completed")))}),S(p,yi.EventType.MESSAGE,A=>{var N;if(!I){const R=A.data[0];Ce(!!R,16349);const $=R,F=$?.error||((N=$[0])===null||N===void 0?void 0:N.error);if(F){Q(Tt,`RPC '${e}' stream ${i} received error:`,F);const U=F.status;let W=function(y){const E=it[y];if(E!==void 0)return Cd(E)}(U),w=F.message;W===void 0&&(W=M.INTERNAL,w="Unknown error status: "+U+" with message "+F.message),I=!0,C.__(new K(W,w)),p.close()}else Q(Tt,`RPC '${e}' stream ${i} received:`,R),C.a_(R)}}),S(l,zh.STAT_EVENT,A=>{A.stat===fa.PROXY?Q(Tt,`RPC '${e}' stream ${i} detected buffering proxy`):A.stat===fa.NOPROXY&&Q(Tt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function ea(){return typeof document<"u"?document:null}/**
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
 */function xo(n){return new P_(n,!0)}/**
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
 */class Bd{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&Q("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const vu="PersistentStream";class qd{constructor(e,t,r,i,s,a,l,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Bd(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(Nn(t.toString()),Nn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{const i=new K(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return Q(vu,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(Q(vu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Rv extends qd{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=V_(this.serializer,e),r=function(s){if(!("targetChange"in s))return ue.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?ue.min():a.readTime?gn(a.readTime):ue.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Ta(this.serializer),t.addTarget=function(s,a){let l;const u=a.target;if(l=va(u)?{documents:L_(s,u)}:{query:F_(s,u).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=$d(s,a.resumeToken);const d=wa(s,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(ue.min())>0){l.readTime=Zs(s,a.snapshotVersion.toTimestamp());const d=wa(s,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=j_(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Ta(this.serializer),t.removeTarget=e,this.k_(t)}}class kv extends qd{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return Ce(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ce(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){Ce(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=M_(e.writeResults,e.commitTime),r=gn(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Ta(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>O_(this.serializer,r))};this.k_(t)}}/**
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
 */class $v{}class Pv extends $v{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new K(M.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,Ea(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(M.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,Ea(t,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new K(M.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Nv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Nn(t),this._a=!1):Q("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const kr="RemoteStore";class Dv{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Dr(this)&&(Q(kr,"Restarting streams for network reachability change."),await async function(u){const d=fe(u);d.Ia.add(4),await Xi(d),d.Aa.set("Unknown"),d.Ia.delete(4),await Ao(d)}(this))})}),this.Aa=new Nv(r,i)}}async function Ao(n){if(Dr(n))for(const e of n.da)await e(!0)}async function Xi(n){for(const e of n.da)await e(!1)}function Gd(n,e){const t=fe(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),rl(t)?nl(t):ci(t).x_()&&tl(t,e))}function el(n,e){const t=fe(n),r=ci(t);t.Ta.delete(e),r.x_()&&zd(t,e),t.Ta.size===0&&(r.x_()?r.B_():Dr(t)&&t.Aa.set("Unknown"))}function tl(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ue.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ci(n).H_(e)}function zd(n,e){n.Ra.$e(e),ci(n).Y_(e)}function nl(n){n.Ra=new C_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),ci(n).start(),n.Aa.aa()}function rl(n){return Dr(n)&&!ci(n).M_()&&n.Ta.size>0}function Dr(n){return fe(n).Ia.size===0}function Hd(n){n.Ra=void 0}async function Vv(n){n.Aa.set("Online")}async function Ov(n){n.Ta.forEach((e,t)=>{tl(n,e)})}async function Mv(n,e){Hd(n),rl(n)?(n.Aa.la(e),nl(n)):n.Aa.set("Unknown")}async function Lv(n,e,t){if(n.Aa.set("Online"),e instanceof kd&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,e)}catch(r){Q(kr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await to(n,r)}else if(e instanceof Ns?n.Ra.Ye(e):e instanceof Rd?n.Ra.it(e):n.Ra.et(e),!t.isEqual(ue.min()))try{const r=await jd(n.localStore);t.compareTo(r)>=0&&await function(s,a){const l=s.Ra.Pt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ta.get(d);f&&s.Ta.set(d,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(yt.EMPTY_BYTE_STRING,f.snapshotVersion)),zd(s,u);const p=new Yn(f.target,u,d,f.sequenceNumber);tl(s,p)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){Q(kr,"Failed to raise snapshot:",r),await to(n,r)}}async function to(n,e,t){if(!ai(e))throw e;n.Ia.add(1),await Xi(n),n.Aa.set("Offline"),t||(t=()=>jd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{Q(kr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ao(n)})}function Wd(n,e){return e().catch(t=>to(n,t,e))}async function So(n){const e=fe(n),t=cr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ua;for(;Fv(e);)try{const i=await bv(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,Uv(e,i)}catch(i){await to(e,i)}Kd(e)&&Qd(e)}function Fv(n){return Dr(n)&&n.Pa.length<10}function Uv(n,e){n.Pa.push(e);const t=cr(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Kd(n){return Dr(n)&&!cr(n).M_()&&n.Pa.length>0}function Qd(n){cr(n).start()}async function jv(n){cr(n).na()}async function Bv(n){const e=cr(n);for(const t of n.Pa)e.X_(t.mutations)}async function qv(n,e,t){const r=n.Pa.shift(),i=Wa.from(r,e,t);await Wd(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await So(n)}async function Gv(n,e){e&&cr(n).Z_&&await async function(r,i){if(function(a){return A_(a)&&a!==M.ABORTED}(i.code)){const s=r.Pa.shift();cr(r).N_(),await Wd(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await So(r)}}(n,e),Kd(n)&&Qd(n)}async function yu(n,e){const t=fe(n);t.asyncQueue.verifyOperationInProgress(),Q(kr,"RemoteStore received new credentials");const r=Dr(t);t.Ia.add(3),await Xi(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ao(t)}async function zv(n,e){const t=fe(n);e?(t.Ia.delete(2),await Ao(t)):e||(t.Ia.add(2),await Xi(t),t.Aa.set("Unknown"))}function ci(n){return n.Va||(n.Va=function(t,r,i){const s=fe(t);return s.ia(),new Rv(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:Vv.bind(null,n),e_:Ov.bind(null,n),n_:Mv.bind(null,n),J_:Lv.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),rl(n)?nl(n):n.Aa.set("Unknown")):(await n.Va.stop(),Hd(n))})),n.Va}function cr(n){return n.ma||(n.ma=function(t,r,i){const s=fe(t);return s.ia(),new kv(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:jv.bind(null,n),n_:Gv.bind(null,n),ea:Bv.bind(null,n),ta:qv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await So(n)):(await n.ma.stop(),n.Pa.length>0&&(Q(kr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class il{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new tr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,l=new il(e,t,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sl(n,e){if(Nn("AsyncQueue",`${e}: ${n}`),ai(n))return new K(M.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class zr{static emptySet(e){return new zr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||ne.comparator(t.key,r.key):(t,r)=>ne.comparator(t.key,r.key),this.keyedMap=bi(),this.sortedSet=new Ke(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof zr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new zr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class bu{constructor(){this.fa=new Ke(ne.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):se(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class ti{constructor(e,t,r,i,s,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new ti(e,t,zr.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&yo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class Hv{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class Wv{constructor(){this.queries=wu(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=fe(t),s=i.queries;i.queries=wu(),s.forEach((a,l)=>{for(const u of l.wa)u.onError(r)})})(this,new K(M.ABORTED,"Firestore shutting down"))}}function wu(){return new Nr(n=>md(n),yo)}async function Yd(n,e){const t=fe(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new Hv,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const l=sl(a,`Initialization of query '${Br(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&ol(t)}async function Jd(n,e){const t=fe(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Kv(n,e){const t=fe(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&ol(t)}function Qv(n,e,t){const r=fe(n),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(t);r.queries.delete(e)}function ol(n){n.Da.forEach(e=>{e.next()})}var Sa,Eu;(Eu=Sa||(Sa={})).Fa="default",Eu.Cache="cache";class Xd{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ti(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=ti.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Sa.Cache}}/**
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
 */class Zd{constructor(e){this.key=e}}class ef{constructor(e){this.key=e}}class Yv{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=be(),this.mutatedKeys=be(),this.Xa=_d(e),this.eu=new zr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new bu,i=t?t.eu:this.eu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const _=i.get(f),I=bo(this.query,p)?p:null,C=!!_&&this.mutatedKeys.has(_.key),S=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let A=!1;_&&I?_.data.isEqual(I.data)?C!==S&&(r.track({type:3,doc:I}),A=!0):this.iu(_,I)||(r.track({type:2,doc:I}),A=!0,(u&&this.Xa(I,u)>0||d&&this.Xa(I,d)<0)&&(l=!0)):!_&&I?(r.track({type:0,doc:I}),A=!0):_&&!I&&(r.track({type:1,doc:_}),A=!0,(u||d)&&(l=!0)),A&&(I?(a=a.add(I),s=S?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(I,C){const S=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return se(20277,{At:A})}};return S(I)-S(C)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),i=i!=null&&i;const l=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,d=u!==this.Ya;return this.Ya=u,a.length!==0||d?{snapshot:new ti(this.query,e.eu,s,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new bu,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=be(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new ef(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Zd(r))}),t}uu(e){this.Ha=e.qs,this.Za=be();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return ti.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const al="SyncEngine";class Jv{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Xv{constructor(e){this.key=e,this.lu=!1}}class Zv{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Nr(l=>md(l),yo),this.Tu=new Map,this.Iu=new Set,this.du=new Ke(ne.comparator),this.Eu=new Map,this.Au=new Ya,this.Ru={},this.Vu=new Map,this.mu=ei.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function ey(n,e,t=!0){const r=af(n);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await tf(r,e,t,!0),i}async function ty(n,e){const t=af(n);await tf(t,e,!0,!1)}async function tf(n,e,t,r){const i=await wv(n.localStore,pn(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await ny(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Gd(n.remoteStore,i),l}async function ny(n,e,t,r,i){n.gu=(p,_,I)=>async function(S,A,N,R){let $=A.view.nu(N);$.Ds&&($=await pu(S.localStore,A.query,!1).then(({documents:w})=>A.view.nu(w,$)));const F=R&&R.targetChanges.get(A.targetId),U=R&&R.targetMismatches.get(A.targetId)!=null,W=A.view.applyChanges($,S.isPrimaryClient,F,U);return Tu(S,A.targetId,W._u),W.snapshot}(n,p,_,I);const s=await pu(n.localStore,e,!0),a=new Yv(e,s.qs),l=a.nu(s.documents),u=Ji.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(l,n.isPrimaryClient,u);Tu(n,t,d._u);const f=new Jv(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),d.snapshot}async function ry(n,e,t){const r=fe(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!yo(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await xa(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&el(r.remoteStore,i.targetId),Ca(r,i.targetId)}).catch(oi)):(Ca(r,i.targetId),await xa(r.localStore,i.targetId,!0))}async function iy(n,e){const t=fe(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),el(t.remoteStore,r.targetId))}async function sy(n,e,t){const r=dy(n);try{const i=await function(a,l){const u=fe(a),d=Ge.now(),f=l.reduce((I,C)=>I.add(C.key),be());let p,_;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let C=Dn(),S=be();return u.Os.getEntries(I,f).next(A=>{C=A,C.forEach((N,R)=>{R.isValidDocument()||(S=S.add(N))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,C)).next(A=>{p=A;const N=[];for(const R of l){const $=w_(R,p.get(R.key).overlayedDocument);$!=null&&N.push(new dr(R.key,$,ld($.value.mapValue),$t.exists(!0)))}return u.mutationQueue.addMutationBatch(I,d,N,l)}).next(A=>{_=A;const N=A.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(I,A.batchId,N)})}).then(()=>({batchId:_.batchId,changes:yd(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,u){let d=a.Ru[a.currentUser.toKey()];d||(d=new Ke(ve)),d=d.insert(l,u),a.Ru[a.currentUser.toKey()]=d}(r,i.batchId,t),await Zi(r,i.changes),await So(r.remoteStore)}catch(i){const s=sl(i,"Failed to persist write");t.reject(s)}}async function nf(n,e){const t=fe(n);try{const r=await vv(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Eu.get(s);a&&(Ce(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?Ce(a.lu,14607):i.removedDocuments.size>0&&(Ce(a.lu,42227),a.lu=!1))}),await Zi(t,r,e)}catch(r){await oi(r)}}function Iu(n,e,t){const r=fe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const u=fe(a);u.onlineState=l;let d=!1;u.queries.forEach((f,p)=>{for(const _ of p.wa)_.va(l)&&(d=!0)}),d&&ol(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function oy(n,e,t){const r=fe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Eu.get(e),s=i&&i.key;if(s){let a=new Ke(ne.comparator);a=a.insert(s,At.newNoDocument(s,ue.min()));const l=be().add(s),u=new To(ue.min(),new Map,new Ke(ve),a,l);await nf(r,u),r.du=r.du.remove(s),r.Eu.delete(e),ll(r)}else await xa(r.localStore,e,!1).then(()=>Ca(r,e,t)).catch(oi)}async function ay(n,e){const t=fe(n),r=e.batch.batchId;try{const i=await _v(t.localStore,e);sf(t,r,null),rf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Zi(t,i)}catch(i){await oi(i)}}async function ly(n,e,t){const r=fe(n);try{const i=await function(a,l){const u=fe(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,l).next(p=>(Ce(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);sf(r,e,t),rf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Zi(r,i)}catch(i){await oi(i)}}function rf(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function sf(n,e,t){const r=fe(n);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Ca(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||of(n,r)})}function of(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(el(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),ll(n))}function Tu(n,e,t){for(const r of t)r instanceof Zd?(n.Au.addReference(r.key,e),cy(n,r)):r instanceof ef?(Q(al,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||of(n,r.key)):se(19791,{yu:r})}function cy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(Q(al,"New document in limbo: "+t),n.Iu.add(r),ll(n))}function ll(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new ne(Ue.fromString(e)),r=n.mu.next();n.Eu.set(r,new Xv(t)),n.du=n.du.insert(t,r),Gd(n.remoteStore,new Yn(pn(za(t.path)),r,"TargetPurposeLimboResolution",mo.ue))}}async function Zi(n,e,t){const r=fe(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{a.push(r.gu(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){i.push(d);const p=Xa.Es(u.targetId,d);s.push(p)}}))}),await Promise.all(a),r.hu.J_(i),await async function(u,d){const f=fe(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>L.forEach(d,_=>L.forEach(_.Is,I=>f.persistence.referenceDelegate.addReference(p,_.targetId,I)).next(()=>L.forEach(_.ds,I=>f.persistence.referenceDelegate.removeReference(p,_.targetId,I)))))}catch(p){if(!ai(p))throw p;Q(Za,"Failed to update sequence numbers: "+p)}for(const p of d){const _=p.targetId;if(!p.fromCache){const I=f.Fs.get(_),C=I.snapshotVersion,S=I.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(_,S)}}}(r.localStore,s))}async function uy(n,e){const t=fe(n);if(!t.currentUser.isEqual(e)){Q(al,"User change. New user:",e.toKey());const r=await Ud(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(l=>{l.forEach(u=>{u.reject(new K(M.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Zi(t,r.Bs)}}function hy(n,e){const t=fe(n),r=t.Eu.get(e);if(r&&r.lu)return be().add(r.key);{let i=be();const s=t.Tu.get(e);if(!s)return i;for(const a of s){const l=t.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function af(n){const e=fe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=nf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=hy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=oy.bind(null,e),e.hu.J_=Kv.bind(null,e.eventManager),e.hu.pu=Qv.bind(null,e.eventManager),e}function dy(n){const e=fe(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ay.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ly.bind(null,e),e}class no{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return mv(this.persistence,new fv,e.initialUser,this.serializer)}Du(e){return new Fd(Ja.Vi,this.serializer)}bu(e){return new Iv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}no.provider={build:()=>new no};class fy extends no{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){Ce(this.persistence.referenceDelegate instanceof eo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new X_(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Ot.withCacheSize(this.cacheSizeBytes):Ot.DEFAULT;return new Fd(r=>eo.Vi(r,t),this.serializer)}}class Ra{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Iu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=uy.bind(null,this.syncEngine),await zv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Wv}()}createDatastore(e){const t=xo(e.databaseInfo.databaseId),r=function(s){return new Cv(s)}(e.databaseInfo);return function(s,a,l,u){return new Pv(s,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,l){return new Dv(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Iu(this.syncEngine,t,0),function(){return _u.C()?new _u:new Tv}())}createSyncEngine(e,t){return function(i,s,a,l,u,d,f){const p=new Zv(i,s,a,l,u,d);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=fe(i);Q(kr,"RemoteStore shutting down."),s.Ia.add(5),await Xi(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ra.provider={build:()=>new Ra};/**
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
 */class lf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Nn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const ur="FirestoreClient";class py{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=xt.UNAUTHENTICATED,this.clientId=Fa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{Q(ur,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(Q(ur,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new tr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=sl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ta(n,e){n.asyncQueue.verifyOperationInProgress(),Q(ur,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Ud(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{ir("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{Q("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{ir("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function xu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await gy(n);Q(ur,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>yu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>yu(e.remoteStore,i)),n._onlineComponents=e}async function gy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Q(ur,"Using user provided OfflineComponentProvider");try{await ta(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ir("Error using user provided cache. Falling back to memory cache: "+t),await ta(n,new no)}}else Q(ur,"Using default OfflineComponentProvider"),await ta(n,new fy(void 0));return n._offlineComponents}async function cf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Q(ur,"Using user provided OnlineComponentProvider"),await xu(n,n._uninitializedComponentsProvider._online)):(Q(ur,"Using default OnlineComponentProvider"),await xu(n,new Ra))),n._onlineComponents}function my(n){return cf(n).then(e=>e.syncEngine)}async function ka(n){const e=await cf(n),t=e.eventManager;return t.onListen=ey.bind(null,e.syncEngine),t.onUnlisten=ry.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ty.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=iy.bind(null,e.syncEngine),t}function _y(n,e,t={}){const r=new tr;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,d){const f=new lf({next:_=>{f.Ou(),a.enqueueAndForget(()=>Jd(s,p)),_.fromCache&&u.source==="server"?d.reject(new K(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(_)},error:_=>d.reject(_)}),p=new Xd(l,f,{includeMetadataChanges:!0,ka:!0});return Yd(s,p)}(await ka(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function uf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const hf="firestore.googleapis.com",Su=!0;class Cu{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hf,this.ssl=Su}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Su;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ld;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Y_)throw new K(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Dm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Co{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new xm;switch(r.type){case"firstParty":return new Rm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Au.get(t);r&&(Q("ComponentProvider","Removing Datastore"),Au.delete(t),r.terminate())}(this),Promise.resolve()}}function vy(n,e,t,r={}){var i;n=jt(n,Co);const s=ri(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;s&&(Dh(`https://${u}`),Vh("Firestore",!0)),a.host!==hf&&a.host!==u&&ir("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:u,ssl:s,emulatorOptions:r});if(!Sr(d,l)&&(n._setSettings(d),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=xt.MOCK_USER;else{f=Xp(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const _=r.mockUserToken.sub||r.mockUserToken.user_id;if(!_)throw new K(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new xt(_)}n._authCredentials=new Am(new Qh(f,p))}}/**
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
 */class fr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new fr(this.firestore,e,this._query)}}class nt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nt(this.firestore,e,this._key)}toJSON(){return{type:nt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Qi(t,nt._jsonSchema))return new nt(e,r||null,new ne(Ue.fromString(t.referencePath)))}}nt._jsonSchemaVersion="firestore/documentReference/1.0",nt._jsonSchema={type:at("string",nt._jsonSchemaVersion),referencePath:at("string")};class nr extends fr{constructor(e,t,r){super(e,t,za(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nt(this.firestore,null,new ne(e))}withConverter(e){return new nr(this.firestore,e,this._path)}}function Ds(n,e,...t){if(n=lt(n),Jh("collection","path",e),n instanceof Co){const r=Ue.fromString(e,...t);return jc(r),new nr(n,null,r)}{if(!(n instanceof nt||n instanceof nr))throw new K(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ue.fromString(e,...t));return jc(r),new nr(n.firestore,null,r)}}function St(n,e,...t){if(n=lt(n),arguments.length===1&&(e=Fa.newId()),Jh("doc","path",e),n instanceof Co){const r=Ue.fromString(e,...t);return Uc(r),new nt(n,null,new ne(r))}{if(!(n instanceof nt||n instanceof nr))throw new K(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ue.fromString(e,...t));return Uc(r),new nt(n.firestore,n instanceof nr?n.converter:null,new ne(r))}}/**
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
 */const Ru="AsyncQueue";class ku{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Bd(this,"async_queue_retry"),this.oc=()=>{const r=ea();r&&Q(Ru,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ea();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ea();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new tr;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ai(e))throw e;Q(Ru,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Nn("INTERNAL UNHANDLED ERROR: ",$u(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=il.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&se(47125,{hc:$u(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function $u(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Pu(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Vn extends Co{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ku,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ku(e),this._firestoreClient=void 0,await e}}}function yy(n,e){const t=typeof n=="object"?n:Fh(),r=typeof n=="string"?n:Qs,i=Ma(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Yp("firestore");s&&vy(i,...s)}return i}function Ro(n){if(n._terminated)throw new K(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||by(n),n._firestoreClient}function by(n){var e,t,r;const i=n._freezeSettings(),s=function(l,u,d,f){return new zm(l,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,uf(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new py(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(l){const u=l?._online.build();return{_offline:l?._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class Ht{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ht(yt.fromBase64String(e))}catch(t){throw new K(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ht(yt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Qi(e,Ht._jsonSchema))return Ht.fromBase64String(e.bytes)}}Ht._jsonSchemaVersion="firestore/bytes/1.0",Ht._jsonSchema={type:at("string",Ht._jsonSchemaVersion),bytes:at("string")};/**
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
 */class es{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new vt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class ko{constructor(e){this._methodName=e}}/**
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
 */class mn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ve(this._lat,e._lat)||ve(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mn._jsonSchemaVersion}}static fromJSON(e){if(Qi(e,mn._jsonSchema))return new mn(e.latitude,e.longitude)}}mn._jsonSchemaVersion="firestore/geoPoint/1.0",mn._jsonSchema={type:at("string",mn._jsonSchemaVersion),latitude:at("number"),longitude:at("number")};/**
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
 */class _n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:_n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Qi(e,_n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new _n(e.vectorValues);throw new K(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}_n._jsonSchemaVersion="firestore/vectorValue/1.0",_n._jsonSchema={type:at("string",_n._jsonSchemaVersion),vectorValues:at("object")};/**
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
 */const wy=/^__.*__$/;class Ey{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new dr(e,this.data,this.fieldMask,t,this.fieldTransforms):new Yi(e,this.data,t,this.fieldTransforms)}}class df{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new dr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ff(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw se(40011,{Ec:n})}}class cl{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new cl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return ro(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(ff(this.Ec)&&wy.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Iy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||xo(e)}Dc(e,t,r,i=!1){return new cl({Ec:e,methodName:t,bc:r,path:vt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ts(n){const e=n._freezeSettings(),t=xo(n._databaseId);return new Iy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ul(n,e,t,r,i,s={}){const a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);dl("Data must be an object, but it was:",a,r);const l=mf(r,a);let u,d;if(s.merge)u=new Ut(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const _=$a(e,p,t);if(!a.contains(_))throw new K(M.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);vf(f,_)||f.push(_)}u=new Ut(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new Ey(new Mt(l),u,d)}class $o extends ko{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof $o}}class hl extends ko{_toFieldTransform(e){return new __(e.path,new Li)}isEqual(e){return e instanceof hl}}function pf(n,e,t,r){const i=n.Dc(1,e,t);dl("Data must be an object, but it was:",i,r);const s=[],a=Mt.empty();hr(r,(u,d)=>{const f=fl(e,u,t);d=lt(d);const p=i.gc(f);if(d instanceof $o)s.push(f);else{const _=ns(d,p);_!=null&&(s.push(f),a.set(f,_))}});const l=new Ut(s);return new df(a,l,i.fieldTransforms)}function gf(n,e,t,r,i,s){const a=n.Dc(1,e,t),l=[$a(e,r,t)],u=[i];if(s.length%2!=0)throw new K(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)l.push($a(e,s[_])),u.push(s[_+1]);const d=[],f=Mt.empty();for(let _=l.length-1;_>=0;--_)if(!vf(d,l[_])){const I=l[_];let C=u[_];C=lt(C);const S=a.gc(I);if(C instanceof $o)d.push(I);else{const A=ns(C,S);A!=null&&(d.push(I),f.set(I,A))}}const p=new Ut(d);return new df(f,p,a.fieldTransforms)}function Ty(n,e,t,r=!1){return ns(t,n.Dc(r?4:3,e))}function ns(n,e){if(_f(n=lt(n)))return dl("Unsupported field value:",e,n),mf(n,e);if(n instanceof ko)return function(r,i){if(!ff(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let u=ns(l,i.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=lt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return p_(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ge.fromDate(r);return{timestampValue:Zs(i.serializer,s)}}if(r instanceof Ge){const s=new Ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zs(i.serializer,s)}}if(r instanceof mn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ht)return{bytesValue:$d(i.serializer,r._byteString)};if(r instanceof nt){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Qa(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof _n)return function(a,l){return{mapValue:{fields:{[od]:{stringValue:ad},[Ys]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.wc("VectorValues must only contain numeric values.");return Ha(l.serializer,d)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${go(r)}`)}(n,e)}function mf(n,e){const t={};return ed(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):hr(n,(r,i)=>{const s=ns(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function _f(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ge||n instanceof mn||n instanceof Ht||n instanceof nt||n instanceof ko||n instanceof _n)}function dl(n,e,t){if(!_f(t)||!Xh(t)){const r=go(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function $a(n,e,t){if((e=lt(e))instanceof es)return e._internalPath;if(typeof e=="string")return fl(n,e);throw ro("Field path arguments must be of type string or ",n,!1,void 0,t)}const xy=new RegExp("[~\\*/\\[\\]]");function fl(n,e,t){if(e.search(xy)>=0)throw ro(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new es(...e.split("."))._internalPath}catch{throw ro(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ro(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new K(M.INVALID_ARGUMENT,l+n+u)}function vf(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class yf{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ay(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(pl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Ay extends yf{data(){return super.data()}}function pl(n,e){return typeof e=="string"?fl(n,e):e instanceof es?e._internalPath:e._delegate._internalPath}/**
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
 */function bf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gl{}class wf extends gl{}function Sy(n,e,...t){let r=[];e instanceof gl&&r.push(e),r=r.concat(t),function(s){const a=s.filter(u=>u instanceof _l).length,l=s.filter(u=>u instanceof ml).length;if(a>1||a>0&&l>0)throw new K(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class ml extends wf{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ml(e,t,r)}_apply(e){const t=this._parse(e);return Ef(e._query,t),new fr(e.firestore,e.converter,ya(e._query,t))}_parse(e){const t=ts(e.firestore);return function(s,a,l,u,d,f,p){let _;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new K(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Du(p,f);const C=[];for(const S of p)C.push(Nu(u,s,S));_={arrayValue:{values:C}}}else _=Nu(u,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Du(p,f),_=Ty(l,a,p,f==="in"||f==="not-in");return ot.create(d,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class _l extends gl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new _l(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:an.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const l=s.getFlattenedFilters();for(const u of l)Ef(a,u),a=ya(a,u)}(e._query,t),new fr(e.firestore,e.converter,ya(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class vl extends wf{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new vl(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new K(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new K(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Mi(s,a)}(e._query,this._field,this._direction);return new fr(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new li(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Cy(n,e="asc"){const t=e,r=pl("orderBy",n);return vl._create(r,t)}function Nu(n,e,t){if(typeof(t=lt(t))=="string"){if(t==="")throw new K(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!gd(e)&&t.indexOf("/")!==-1)throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ue.fromString(t));if(!ne.isDocumentKey(r))throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Qc(n,new ne(r))}if(t instanceof nt)return Qc(n,t._key);throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${go(t)}.`)}function Du(n,e){if(!Array.isArray(n)||n.length===0)throw new K(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ef(n,e){const t=function(i,s){for(const a of i)for(const l of a.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new K(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Ry{convertValue(e,t="none"){switch(lr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return et(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ar(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw se(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return hr(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Ys].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>et(a.doubleValue));return new _n(s)}convertGeoPoint(e){return new mn(et(e.latitude),et(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=vo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Di(e));default:return null}}convertTimestamp(e){const t=or(e);return new Ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ue.fromString(e);Ce(Md(r),9688,{name:e});const i=new Vi(r.get(1),r.get(3)),s=new ne(r.popFirst(5));return i.isEqual(t)||Nn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function yl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Ei{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Tr extends yf{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Vs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(pl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new K(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Tr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Tr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Tr._jsonSchema={type:at("string",Tr._jsonSchemaVersion),bundleSource:at("string","DocumentSnapshot"),bundleName:at("string"),bundle:at("string")};class Vs extends Tr{data(e={}){return super.data(e)}}class xr{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ei(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Vs(this._firestore,this._userDataWriter,r.key,r,new Ei(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const u=new Vs(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ei(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Vs(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ei(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:ky(l.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new K(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=xr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Fa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ky(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return se(61501,{type:n})}}xr._jsonSchemaVersion="firestore/querySnapshot/1.0",xr._jsonSchema={type:at("string",xr._jsonSchemaVersion),bundleSource:at("string","QuerySnapshot"),bundleName:at("string"),bundle:at("string")};class bl extends Ry{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ht(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new nt(this.firestore,null,t)}}function $y(n){n=jt(n,fr);const e=jt(n.firestore,Vn),t=Ro(e),r=new bl(e);return bf(n._query),_y(t,n._query).then(i=>new xr(e,r,n,i))}function rs(n,e,t){n=jt(n,nt);const r=jt(n.firestore,Vn),i=yl(n.converter,e,t);return is(r,[ul(ts(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,$t.none())])}function Er(n,e,t,...r){n=jt(n,nt);const i=jt(n.firestore,Vn),s=ts(i);let a;return a=typeof(e=lt(e))=="string"||e instanceof es?gf(s,"updateDoc",n._key,e,t,r):pf(s,"updateDoc",n._key,e),is(i,[a.toMutation(n._key,$t.exists(!0))])}function If(n){return is(jt(n.firestore,Vn),[new Io(n._key,$t.none())])}function Py(n,e){const t=jt(n.firestore,Vn),r=St(n),i=yl(n.converter,e);return is(t,[ul(ts(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,$t.exists(!1))]).then(()=>r)}function Vu(n,...e){var t,r,i;n=lt(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Pu(e[a])||(s=e[a++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Pu(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let u,d,f;if(n instanceof nt)d=jt(n.firestore,Vn),f=za(n._key.path),u={next:p=>{e[a]&&e[a](Ny(d,n,p))},error:e[a+1],complete:e[a+2]};else{const p=jt(n,fr);d=jt(p.firestore,Vn),f=p._query;const _=new bl(d);u={next:I=>{e[a]&&e[a](new xr(d,_,p,I))},error:e[a+1],complete:e[a+2]},bf(n._query)}return function(_,I,C,S){const A=new lf(S),N=new Xd(I,A,C);return _.asyncQueue.enqueueAndForget(async()=>Yd(await ka(_),N)),()=>{A.Ou(),_.asyncQueue.enqueueAndForget(async()=>Jd(await ka(_),N))}}(Ro(d),f,l,u)}function is(n,e){return function(r,i){const s=new tr;return r.asyncQueue.enqueueAndForget(async()=>sy(await my(r),i,s)),s.promise}(Ro(n),e)}function Ny(n,e,t){const r=t.docs.get(e._key),i=new bl(n);return new Tr(n,i,e._key,r,new Ei(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class Dy{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=ts(e)}set(e,t,r){this._verifyNotCommitted();const i=na(e,this._firestore),s=yl(i.converter,t,r),a=ul(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,$t.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=na(e,this._firestore);let a;return a=typeof(t=lt(t))=="string"||t instanceof es?gf(this._dataReader,"WriteBatch.update",s._key,t,r,i):pf(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,$t.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=na(e,this._firestore);return this._mutations=this._mutations.concat(new Io(t._key,$t.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new K(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function na(n,e){if((n=lt(n)).firestore!==e)throw new K(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function wl(){return new hl("serverTimestamp")}/**
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
 */function Tf(n){return Ro(n=jt(n,Vn)),new Dy(n,e=>is(n,e))}(function(e,t=!0){(function(i){si=i})(ii),Yr(new Cr("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new Vn(new Sm(r.getProvider("auth-internal")),new km(a,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new K(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vi(d.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Zn(Vc,Oc,e),Zn(Vc,Oc,"esm2017")})();function El(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function xf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Vy=xf,Af=new Wi("auth","Firebase",xf());/**
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
 */const io=new Va("@firebase/auth");function Oy(n,...e){io.logLevel<=ye.WARN&&io.warn(`Auth (${ii}): ${n}`,...e)}function Os(n,...e){io.logLevel<=ye.ERROR&&io.error(`Auth (${ii}): ${n}`,...e)}/**
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
 */function wn(n,...e){throw Tl(n,...e)}function on(n,...e){return Tl(n,...e)}function Il(n,e,t){const r=Object.assign(Object.assign({},Vy()),{[e]:t});return new Wi("auth","Firebase",r).create(e,{appName:n.name})}function Ar(n){return Il(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function My(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&wn(n,"argument-error"),Il(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Tl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Af.create(n,...e)}function ae(n,e,...t){if(!n)throw Tl(e,...t)}function Cn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Os(e),new Error(e)}function On(n,e){n||Cn(e)}/**
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
 */function Pa(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Ly(){return Ou()==="http:"||Ou()==="https:"}function Ou(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Fy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ly()||ig()||"connection"in navigator)?navigator.onLine:!0}function Uy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ss{constructor(e,t){this.shortDelay=e,this.longDelay=t,On(t>e,"Short delay should be less than long delay!"),this.isMobile=tg()||sg()}get(){return Fy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function xl(n,e){On(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Sf{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const jy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const By=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qy=new ss(3e4,6e4);function Al(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ui(n,e,t,r,i={}){return Cf(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=Ki(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},s);return rg()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&ri(n.emulatorConfig.host)&&(d.credentials="include"),Sf.fetch()(await Rf(n,n.config.apiHost,t,l),d)})}async function Cf(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},jy),e);try{const i=new zy(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ss(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ss(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ss(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ss(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Il(n,f,d);wn(n,f)}}catch(i){if(i instanceof Ln)throw i;wn(n,"network-request-failed",{message:String(i)})}}async function Gy(n,e,t,r,i={}){const s=await ui(n,e,t,r,i);return"mfaPendingCredential"in s&&wn(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Rf(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?xl(n.config,i):`${n.config.apiScheme}://${i}`;return By.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class zy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(on(this.auth,"network-request-failed")),qy.get())})}}function Ss(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=on(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */async function Hy(n,e){return ui(n,"POST","/v1/accounts:delete",e)}async function so(n,e){return ui(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ri(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Wy(n,e=!1){const t=lt(n),r=await t.getIdToken(e),i=Sl(r);ae(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:Ri(ra(i.auth_time)),issuedAtTime:Ri(ra(i.iat)),expirationTime:Ri(ra(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function ra(n){return Number(n)*1e3}function Sl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Os("JWT malformed, contained fewer than 3 sections"),null;try{const i=kh(t);return i?JSON.parse(i):(Os("Failed to decode base64 JWT payload"),null)}catch(i){return Os("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Mu(n){const e=Sl(n);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ji(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ln&&Ky(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ky({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Qy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Na{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ri(this.lastLoginAt),this.creationTime=Ri(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function oo(n){var e;const t=n.auth,r=await n.getIdToken(),i=await ji(n,so(t,{idToken:r}));ae(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?kf(s.providerUserInfo):[],l=Jy(n.providerData,a),u=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!l?.length,f=u?d:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new Na(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function Yy(n){const e=lt(n);await oo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Jy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function kf(n){return n.map(e=>{var{providerId:t}=e,r=El(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Xy(n,e){const t=await Cf(n,{},async()=>{const r=Ki({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Rf(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&ri(n.emulatorConfig.host)&&(u.credentials="include"),Sf.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Zy(n,e){return ui(n,"POST","/v2/accounts:revokeToken",Al(n,e))}/**
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
 */class Hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const t=Mu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Xy(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Hr;return r&&(ae(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(ae(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(ae(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Hr,this.toJSON())}_performRefresh(){return Cn("not implemented")}}/**
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
 */function zn(n,e){ae(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class rn{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=El(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Qy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Na(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ji(this,this.stsTokenManager.getToken(this.auth,e));return ae(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Wy(this,e)}reload(){return Yy(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new rn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await oo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tn(this.auth.app))return Promise.reject(Ar(this.auth));const e=await this.getIdToken();return await ji(this,Hy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,l,u,d,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,I=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,S=(l=t.tenantId)!==null&&l!==void 0?l:void 0,A=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,N=(d=t.createdAt)!==null&&d!==void 0?d:void 0,R=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:F,isAnonymous:U,providerData:W,stsTokenManager:w}=t;ae($&&w,e,"internal-error");const v=Hr.fromJSON(this.name,w);ae(typeof $=="string",e,"internal-error"),zn(p,e.name),zn(_,e.name),ae(typeof F=="boolean",e,"internal-error"),ae(typeof U=="boolean",e,"internal-error"),zn(I,e.name),zn(C,e.name),zn(S,e.name),zn(A,e.name),zn(N,e.name),zn(R,e.name);const y=new rn({uid:$,auth:e,email:_,emailVerified:F,displayName:p,isAnonymous:U,photoURL:C,phoneNumber:I,tenantId:S,stsTokenManager:v,createdAt:N,lastLoginAt:R});return W&&Array.isArray(W)&&(y.providerData=W.map(E=>Object.assign({},E))),A&&(y._redirectEventId=A),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new Hr;i.updateFromServerResponse(t);const s=new rn({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await oo(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];ae(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?kf(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,l=new Hr;l.updateFromIdToken(r);const u=new rn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Na(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,d),u}}/**
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
 */const Lu=new Map;function Rn(n){On(n instanceof Function,"Expected a class definition");let e=Lu.get(n);return e?(On(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Lu.set(n,e),e)}/**
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
 */class $f{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}$f.type="NONE";const Fu=$f;/**
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
 */function Ms(n,e,t){return`firebase:${n}:${e}:${t}`}class Wr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ms(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ms("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await so(this.auth,{idToken:e}).catch(()=>{});return t?rn._fromGetAccountInfoResponse(this.auth,t,e):null}return rn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Wr(Rn(Fu),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Rn(Fu);const a=Ms(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const f=await d._get(a);if(f){let p;if(typeof f=="string"){const _=await so(e,{idToken:f}).catch(()=>{});if(!_)break;p=await rn._fromGetAccountInfoResponse(e,_,f)}else p=rn._fromJSON(e,f);d!==s&&(l=p),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Wr(s,e,r):(s=u[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new Wr(s,e,r))}}/**
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
 */function Uu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mf(e))return"Blackberry";if(Lf(e))return"Webos";if(Nf(e))return"Safari";if((e.includes("chrome/")||Df(e))&&!e.includes("edge/"))return"Chrome";if(Of(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Pf(n=kt()){return/firefox\//i.test(n)}function Nf(n=kt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Df(n=kt()){return/crios\//i.test(n)}function Vf(n=kt()){return/iemobile/i.test(n)}function Of(n=kt()){return/android/i.test(n)}function Mf(n=kt()){return/blackberry/i.test(n)}function Lf(n=kt()){return/webos/i.test(n)}function Cl(n=kt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function eb(n=kt()){var e;return Cl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function tb(){return og()&&document.documentMode===10}function Ff(n=kt()){return Cl(n)||Of(n)||Lf(n)||Mf(n)||/windows phone/i.test(n)||Vf(n)}/**
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
 */function Uf(n,e=[]){let t;switch(n){case"Browser":t=Uu(kt());break;case"Worker":t=`${Uu(kt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ii}/${r}`}/**
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
 */class nb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const u=e(s);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function rb(n,e={}){return ui(n,"GET","/v2/passwordPolicy",Al(n,e))}/**
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
 */const ib=6;class sb{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:ib,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class ob{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ju(this),this.idTokenSubscription=new ju(this),this.beforeStateQueue=new nb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Af,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Rn(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Wr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await so(this,{idToken:e}),r=await rn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(tn(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await oo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Uy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tn(this.app))return Promise.reject(Ar(this));const t=e?lt(e):null;return t&&ae(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tn(this.app)?Promise.reject(Ar(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tn(this.app)?Promise.reject(Ar(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rb(this),t=new sb(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Wi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Zy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Rn(e)||this._popupRedirectResolver;ae(t,this,"argument-error"),this.redirectPersistenceManager=await Wr.create(this,[Rn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Uf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(tn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Oy(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Po(n){return lt(n)}class ju{constructor(e){this.auth=e,this.observer=null,this.addObserver=pg(t=>this.observer=t)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Rl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ab(n){Rl=n}function lb(n){return Rl.loadJS(n)}function cb(){return Rl.gapiScript}function ub(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function hb(n,e){const t=Ma(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Sr(s,e??{}))return i;wn(i,"already-initialized")}return t.initialize({options:e})}function db(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Rn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function fb(n,e,t){const r=Po(n);ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=jf(e),{host:a,port:l}=pb(e),u=l===null?"":`:${l}`,d={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){ae(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),ae(Sr(d,r.config.emulator)&&Sr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ri(a)?(Dh(`${s}//${a}${u}`),Vh("Auth",!0)):gb()}function jf(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function pb(n){const e=jf(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Bu(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Bu(a)}}}function Bu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function gb(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Bf{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Cn("not implemented")}_getIdTokenResponse(e){return Cn("not implemented")}_linkToIdToken(e,t){return Cn("not implemented")}_getReauthenticationResolver(e){return Cn("not implemented")}}/**
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
 */async function Kr(n,e){return Gy(n,"POST","/v1/accounts:signInWithIdp",Al(n,e))}/**
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
 */const mb="http://localhost";class $r extends Bf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new $r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):wn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=El(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new $r(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Kr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Kr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kr(e,t)}buildRequest(){const e={requestUri:mb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ki(t)}return e}}/**
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
 */class kl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class os extends kl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Wn extends os{constructor(){super("facebook.com")}static credential(e){return $r._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wn.PROVIDER_ID="facebook.com";/**
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
 */class Sn extends os{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $r._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Sn.credential(t,r)}catch{return null}}}Sn.GOOGLE_SIGN_IN_METHOD="google.com";Sn.PROVIDER_ID="google.com";/**
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
 */class Kn extends os{constructor(){super("github.com")}static credential(e){return $r._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kn.credential(e.oauthAccessToken)}catch{return null}}}Kn.GITHUB_SIGN_IN_METHOD="github.com";Kn.PROVIDER_ID="github.com";/**
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
 */class Qn extends os{constructor(){super("twitter.com")}static credential(e,t){return $r._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Qn.credential(t,r)}catch{return null}}}Qn.TWITTER_SIGN_IN_METHOD="twitter.com";Qn.PROVIDER_ID="twitter.com";/**
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
 */class ni{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await rn._fromIdTokenResponse(e,r,i),a=qu(r);return new ni({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=qu(r);return new ni({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function qu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ao extends Ln{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ao.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new ao(e,t,r,i)}}function qf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ao._fromErrorAndOperation(n,s,e,r):s})}async function _b(n,e,t=!1){const r=await ji(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ni._forOperation(n,"link",r)}/**
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
 */async function vb(n,e,t=!1){const{auth:r}=n;if(tn(r.app))return Promise.reject(Ar(r));const i="reauthenticate";try{const s=await ji(n,qf(r,i,e,n),t);ae(s.idToken,r,"internal-error");const a=Sl(s.idToken);ae(a,r,"internal-error");const{sub:l}=a;return ae(n.uid===l,r,"user-mismatch"),ni._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&wn(r,"user-mismatch"),s}}/**
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
 */async function yb(n,e,t=!1){if(tn(n.app))return Promise.reject(Ar(n));const r="signIn",i=await qf(n,r,e),s=await ni._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function bb(n,e,t,r){return lt(n).onIdTokenChanged(e,t,r)}function wb(n,e,t){return lt(n).beforeAuthStateChanged(e,t)}function Eb(n,e,t,r){return lt(n).onAuthStateChanged(e,t,r)}function Ib(n){return lt(n).signOut()}const lo="__sak";/**
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
 */class Gf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(lo,"1"),this.storage.removeItem(lo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Tb=1e3,xb=10;class zf extends Gf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ff(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);tb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,xb):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Tb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}zf.type="LOCAL";const Ab=zf;/**
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
 */class Hf extends Gf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hf.type="SESSION";const Wf=Hf;/**
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
 */function Sb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class No{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new No(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async d=>d(t.origin,s)),u=await Sb(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}No.receivers=[];/**
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
 */function $l(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Cb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((l,u)=>{const d=$l("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(p){const _=p;if(_.data.eventId===d)switch(_.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(_.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function vn(){return window}function Rb(n){vn().location.href=n}/**
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
 */function Kf(){return typeof vn().WorkerGlobalScope<"u"&&typeof vn().importScripts=="function"}async function kb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $b(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Pb(){return Kf()?self:null}/**
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
 */const Qf="firebaseLocalStorageDb",Nb=1,co="firebaseLocalStorage",Yf="fbase_key";class as{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Do(n,e){return n.transaction([co],e?"readwrite":"readonly").objectStore(co)}function Db(){const n=indexedDB.deleteDatabase(Qf);return new as(n).toPromise()}function Da(){const n=indexedDB.open(Qf,Nb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(co,{keyPath:Yf})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(co)?e(r):(r.close(),await Db(),e(await Da()))})})}async function Gu(n,e,t){const r=Do(n,!0).put({[Yf]:e,value:t});return new as(r).toPromise()}async function Vb(n,e){const t=Do(n,!1).get(e),r=await new as(t).toPromise();return r===void 0?null:r.value}function zu(n,e){const t=Do(n,!0).delete(e);return new as(t).toPromise()}const Ob=800,Mb=3;class Jf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Da(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Mb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Kf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=No._getInstance(Pb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await kb(),!this.activeServiceWorker)return;this.sender=new Cb(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$b()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Da();return await Gu(e,lo,"1"),await zu(e,lo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Vb(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Do(i,!1).getAll();return new as(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ob)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Jf.type="LOCAL";const Lb=Jf;new ss(3e4,6e4);/**
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
 */function Xf(n,e){return e?Rn(e):(ae(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Pl extends Bf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Fb(n){return yb(n.auth,new Pl(n),n.bypassAuthState)}function Ub(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),vb(t,new Pl(n),n.bypassAuthState)}async function jb(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),_b(t,new Pl(n),n.bypassAuthState)}/**
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
 */class Zf{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Fb;case"linkViaPopup":case"linkViaRedirect":return jb;case"reauthViaPopup":case"reauthViaRedirect":return Ub;default:wn(this.auth,"internal-error")}}resolve(e){On(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){On(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Bb=new ss(2e3,1e4);async function qb(n,e,t){if(tn(n.app))return Promise.reject(on(n,"operation-not-supported-in-this-environment"));const r=Po(n);My(n,e,kl);const i=Xf(r,t);return new Ir(r,"signInViaPopup",e,i).executeNotNull()}class Ir extends Zf{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Ir.currentPopupAction&&Ir.currentPopupAction.cancel(),Ir.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){On(this.filter.length===1,"Popup operations only handle one event");const e=$l();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(on(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(on(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ir.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(on(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Bb.get())};e()}}Ir.currentPopupAction=null;/**
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
 */const Gb="pendingRedirect",Ls=new Map;class zb extends Zf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ls.get(this.auth._key());if(!e){try{const r=await Hb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ls.set(this.auth._key(),e)}return this.bypassAuthState||Ls.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Hb(n,e){const t=Qb(e),r=Kb(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Wb(n,e){Ls.set(n._key(),e)}function Kb(n){return Rn(n._redirectPersistence)}function Qb(n){return Ms(Gb,n.config.apiKey,n.name)}async function Yb(n,e,t=!1){if(tn(n.app))return Promise.reject(Ar(n));const r=Po(n),i=Xf(r,e),a=await new zb(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Jb=10*60*1e3;class Xb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Zb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!ep(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(on(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Jb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hu(e))}saveEventToCache(e){this.cachedEventUids.add(Hu(e)),this.lastProcessedEventTime=Date.now()}}function Hu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ep({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Zb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ep(n);default:return!1}}/**
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
 */async function ew(n,e={}){return ui(n,"GET","/v1/projects",e)}/**
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
 */const tw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nw=/^https?/;async function rw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ew(n);for(const t of e)try{if(iw(t))return}catch{}wn(n,"unauthorized-domain")}function iw(n){const e=Pa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!nw.test(t))return!1;if(tw.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const sw=new ss(3e4,6e4);function Wu(){const n=vn().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ow(n){return new Promise((e,t)=>{var r,i,s;function a(){Wu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wu(),t(on(n,"network-request-failed"))},timeout:sw.get()})}if(!((i=(r=vn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=vn().gapi)===null||s===void 0)&&s.load)a();else{const l=ub("iframefcb");return vn()[l]=()=>{gapi.load?a():t(on(n,"network-request-failed"))},lb(`${cb()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Fs=null,e})}let Fs=null;function aw(n){return Fs=Fs||ow(n),Fs}/**
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
 */const lw=new ss(5e3,15e3),cw="__/auth/iframe",uw="emulator/auth/iframe",hw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},dw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function fw(n){const e=n.config;ae(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?xl(e,uw):`https://${n.config.authDomain}/${cw}`,r={apiKey:e.apiKey,appName:n.name,v:ii},i=dw.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ki(r).slice(1)}`}async function pw(n){const e=await aw(n),t=vn().gapi;return ae(t,n,"internal-error"),e.open({where:document.body,url:fw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:hw,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=on(n,"network-request-failed"),l=vn().setTimeout(()=>{s(a)},lw.get());function u(){vn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(a)})}))}/**
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
 */const gw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mw=500,_w=600,vw="_blank",yw="http://localhost";class Ku{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function bw(n,e,t,r=mw,i=_w){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},gw),{width:r.toString(),height:i.toString(),top:s,left:a}),d=kt().toLowerCase();t&&(l=Df(d)?vw:t),Pf(d)&&(e=e||yw,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[I,C])=>`${_}${I}=${C},`,"");if(eb(d)&&l!=="_self")return ww(e||"",l),new Ku(null);const p=window.open(e||"",l,f);ae(p,n,"popup-blocked");try{p.focus()}catch{}return new Ku(p)}function ww(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Ew="__/auth/handler",Iw="emulator/auth/handler",Tw=encodeURIComponent("fac");async function Qu(n,e,t,r,i,s){ae(n.config.authDomain,n,"auth-domain-config-required"),ae(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ii,eventId:i};if(e instanceof kl){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",fg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof os){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),d=u?`#${Tw}=${encodeURIComponent(u)}`:"";return`${xw(n)}?${Ki(l).slice(1)}${d}`}function xw({config:n}){return n.emulator?xl(n,Iw):`https://${n.authDomain}/${Ew}`}/**
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
 */const ia="webStorageSupport";class Aw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wf,this._completeRedirectFn=Yb,this._overrideRedirectResult=Wb}async _openPopup(e,t,r,i){var s;On((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Qu(e,t,r,Pa(),i);return bw(e,a,$l())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Qu(e,t,r,Pa(),i);return Rb(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(On(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await pw(e),r=new Xb(e);return t.register("authEvent",i=>(ae(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ia,{type:ia},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[ia];a!==void 0&&t(!!a),wn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ff()||Nf()||Cl()}}const Sw=Aw;var Yu="@firebase/auth",Ju="1.10.8";/**
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
 */class Cw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Rw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kw(n){Yr(new Cr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;ae(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Uf(n)},d=new ob(r,i,s,u);return db(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Yr(new Cr("auth-internal",e=>{const t=Po(e.getProvider("auth").getImmediate());return(r=>new Cw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Zn(Yu,Ju,Rw(n)),Zn(Yu,Ju,"esm2017")}/**
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
 */const $w=5*60,Pw=Nh("authIdTokenMaxAge")||$w;let Xu=null;const Nw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Pw)return;const i=t?.token;Xu!==i&&(Xu=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Dw(n=Fh()){const e=Ma(n,"auth");if(e.isInitialized())return e.getImmediate();const t=hb(n,{popupRedirectResolver:Sw,persistence:[Lb,Ab,Wf]}),r=Nh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Nw(s.toString());wb(t,a,()=>a(t.currentUser)),bb(t,l=>a(l))}}const i=$h("auth");return i&&fb(t,`http://${i}`),t}function Vw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}ab({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=on("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Vw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kw("Browser");var Ow="firebase",Mw="11.10.0";/**
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
 */Zn(Ow,Mw,"app");var Zu;(function(n){n.STRING="string",n.NUMBER="number",n.INTEGER="integer",n.BOOLEAN="boolean",n.ARRAY="array",n.OBJECT="object"})(Zu||(Zu={}));/**
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
 */const nh=["user","model","function","system"];var rh;(function(n){n.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",n.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",n.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",n.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",n.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",n.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(rh||(rh={}));var ih;(function(n){n.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",n.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",n.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",n.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",n.BLOCK_NONE="BLOCK_NONE"})(ih||(ih={}));var sh;(function(n){n.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",n.NEGLIGIBLE="NEGLIGIBLE",n.LOW="LOW",n.MEDIUM="MEDIUM",n.HIGH="HIGH"})(sh||(sh={}));var oh;(function(n){n.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",n.SAFETY="SAFETY",n.OTHER="OTHER"})(oh||(oh={}));var ki;(function(n){n.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",n.STOP="STOP",n.MAX_TOKENS="MAX_TOKENS",n.SAFETY="SAFETY",n.RECITATION="RECITATION",n.LANGUAGE="LANGUAGE",n.BLOCKLIST="BLOCKLIST",n.PROHIBITED_CONTENT="PROHIBITED_CONTENT",n.SPII="SPII",n.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",n.OTHER="OTHER"})(ki||(ki={}));var ah;(function(n){n.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",n.RETRIEVAL_QUERY="RETRIEVAL_QUERY",n.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",n.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",n.CLASSIFICATION="CLASSIFICATION",n.CLUSTERING="CLUSTERING"})(ah||(ah={}));var lh;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.AUTO="AUTO",n.ANY="ANY",n.NONE="NONE"})(lh||(lh={}));var ch;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.MODE_DYNAMIC="MODE_DYNAMIC"})(ch||(ch={}));/**
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
 */class Ct extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class Ur extends Ct{constructor(e,t){super(e),this.response=t}}class tp extends Ct{constructor(e,t,r,i){super(e),this.status=t,this.statusText=r,this.errorDetails=i}}class rr extends Ct{}class np extends Ct{}/**
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
 */const Lw="https://generativelanguage.googleapis.com",Fw="v1beta",Uw="0.24.1",jw="genai-js";var Pr;(function(n){n.GENERATE_CONTENT="generateContent",n.STREAM_GENERATE_CONTENT="streamGenerateContent",n.COUNT_TOKENS="countTokens",n.EMBED_CONTENT="embedContent",n.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Pr||(Pr={}));class Bw{constructor(e,t,r,i,s){this.model=e,this.task=t,this.apiKey=r,this.stream=i,this.requestOptions=s}toString(){var e,t;const r=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||Fw;let s=`${((t=this.requestOptions)===null||t===void 0?void 0:t.baseUrl)||Lw}/${r}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function qw(n){const e=[];return n?.apiClient&&e.push(n.apiClient),e.push(`${jw}/${Uw}`),e.join(" ")}async function Gw(n){var e;const t=new Headers;t.append("Content-Type","application/json"),t.append("x-goog-api-client",qw(n.requestOptions)),t.append("x-goog-api-key",n.apiKey);let r=(e=n.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(r){if(!(r instanceof Headers))try{r=new Headers(r)}catch(i){throw new rr(`unable to convert customHeaders value ${JSON.stringify(r)} to Headers: ${i.message}`)}for(const[i,s]of r.entries()){if(i==="x-goog-api-key")throw new rr(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new rr(`Header name ${i} can only be set using the apiClient field`);t.append(i,s)}}return t}async function zw(n,e,t,r,i,s){const a=new Bw(n,e,t,r,s);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Qw(s)),{method:"POST",headers:await Gw(a),body:i})}}async function ls(n,e,t,r,i,s={},a=fetch){const{url:l,fetchOptions:u}=await zw(n,e,t,r,i,s);return Hw(l,u,a)}async function Hw(n,e,t=fetch){let r;try{r=await t(n,e)}catch(i){Ww(i,n)}return r.ok||await Kw(r,n),r}function Ww(n,e){let t=n;throw t.name==="AbortError"?(t=new np(`Request aborted when fetching ${e.toString()}: ${n.message}`),t.stack=n.stack):n instanceof tp||n instanceof rr||(t=new Ct(`Error fetching from ${e.toString()}: ${n.message}`),t.stack=n.stack),t}async function Kw(n,e){let t="",r;try{const i=await n.json();t=i.error.message,i.error.details&&(t+=` ${JSON.stringify(i.error.details)}`,r=i.error.details)}catch{}throw new tp(`Error fetching from ${e.toString()}: [${n.status} ${n.statusText}] ${t}`,n.status,n.statusText,r)}function Qw(n){const e={};if(n?.signal!==void 0||n?.timeout>=0){const t=new AbortController;n?.timeout>=0&&setTimeout(()=>t.abort(),n.timeout),n?.signal&&n.signal.addEventListener("abort",()=>{t.abort()}),e.signal=t.signal}return e}/**
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
 */function Nl(n){return n.text=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Us(n.candidates[0]))throw new Ur(`${Hn(n)}`,n);return Yw(n)}else if(n.promptFeedback)throw new Ur(`Text not available. ${Hn(n)}`,n);return""},n.functionCall=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Us(n.candidates[0]))throw new Ur(`${Hn(n)}`,n);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),uh(n)[0]}else if(n.promptFeedback)throw new Ur(`Function call not available. ${Hn(n)}`,n)},n.functionCalls=()=>{if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&console.warn(`This response had ${n.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Us(n.candidates[0]))throw new Ur(`${Hn(n)}`,n);return uh(n)}else if(n.promptFeedback)throw new Ur(`Function call not available. ${Hn(n)}`,n)},n}function Yw(n){var e,t,r,i;const s=[];if(!((t=(e=n.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const a of(i=(r=n.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)a.text&&s.push(a.text),a.executableCode&&s.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&s.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}function uh(n){var e,t,r,i;const s=[];if(!((t=(e=n.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const a of(i=(r=n.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)a.functionCall&&s.push(a.functionCall);if(s.length>0)return s}const Jw=[ki.RECITATION,ki.SAFETY,ki.LANGUAGE];function Us(n){return!!n.finishReason&&Jw.includes(n.finishReason)}function Hn(n){var e,t,r;let i="";if((!n.candidates||n.candidates.length===0)&&n.promptFeedback)i+="Response was blocked",!((e=n.promptFeedback)===null||e===void 0)&&e.blockReason&&(i+=` due to ${n.promptFeedback.blockReason}`),!((t=n.promptFeedback)===null||t===void 0)&&t.blockReasonMessage&&(i+=`: ${n.promptFeedback.blockReasonMessage}`);else if(!((r=n.candidates)===null||r===void 0)&&r[0]){const s=n.candidates[0];Us(s)&&(i+=`Candidate was blocked due to ${s.finishReason}`,s.finishMessage&&(i+=`: ${s.finishMessage}`))}return i}function Bi(n){return this instanceof Bi?(this.v=n,this):new Bi(n)}function Xw(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(n,e||[]),i,s=[];return i={},a("next"),a("throw"),a("return"),i[Symbol.asyncIterator]=function(){return this},i;function a(_){r[_]&&(i[_]=function(I){return new Promise(function(C,S){s.push([_,I,C,S])>1||l(_,I)})})}function l(_,I){try{u(r[_](I))}catch(C){p(s[0][3],C)}}function u(_){_.value instanceof Bi?Promise.resolve(_.value.v).then(d,f):p(s[0][2],_)}function d(_){l("next",_)}function f(_){l("throw",_)}function p(_,I){_(I),s.shift(),s.length&&l(s[0][0],s[0][1])}}/**
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
 */const hh=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Zw(n){const e=n.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),t=n0(e),[r,i]=t.tee();return{stream:t0(r),response:e0(i)}}async function e0(n){const e=[],t=n.getReader();for(;;){const{done:r,value:i}=await t.read();if(r)return Nl(r0(e));e.push(i)}}function t0(n){return Xw(this,arguments,function*(){const t=n.getReader();for(;;){const{value:r,done:i}=yield Bi(t.read());if(i)break;yield yield Bi(Nl(r))}})}function n0(n){const e=n.getReader();return new ReadableStream({start(r){let i="";return s();function s(){return e.read().then(({value:a,done:l})=>{if(l){if(i.trim()){r.error(new Ct("Failed to parse stream"));return}r.close();return}i+=a;let u=i.match(hh),d;for(;u;){try{d=JSON.parse(u[1])}catch{r.error(new Ct(`Error parsing JSON response: "${u[1]}"`));return}r.enqueue(d),i=i.substring(u[0].length),u=i.match(hh)}return s()}).catch(a=>{let l=a;throw l.stack=a.stack,l.name==="AbortError"?l=new np("Request aborted when reading from the stream"):l=new Ct("Error reading from the stream"),l})}}})}function r0(n){const e=n[n.length-1],t={promptFeedback:e?.promptFeedback};for(const r of n){if(r.candidates){let i=0;for(const s of r.candidates)if(t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:i}),t.candidates[i].citationMetadata=s.citationMetadata,t.candidates[i].groundingMetadata=s.groundingMetadata,t.candidates[i].finishReason=s.finishReason,t.candidates[i].finishMessage=s.finishMessage,t.candidates[i].safetyRatings=s.safetyRatings,s.content&&s.content.parts){t.candidates[i].content||(t.candidates[i].content={role:s.content.role||"user",parts:[]});const a={};for(const l of s.content.parts)l.text&&(a.text=l.text),l.functionCall&&(a.functionCall=l.functionCall),l.executableCode&&(a.executableCode=l.executableCode),l.codeExecutionResult&&(a.codeExecutionResult=l.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),t.candidates[i].content.parts.push(a)}i++}r.usageMetadata&&(t.usageMetadata=r.usageMetadata)}return t}/**
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
 */async function rp(n,e,t,r){const i=await ls(e,Pr.STREAM_GENERATE_CONTENT,n,!0,JSON.stringify(t),r);return Zw(i)}async function ip(n,e,t,r){const s=await(await ls(e,Pr.GENERATE_CONTENT,n,!1,JSON.stringify(t),r)).json();return{response:Nl(s)}}/**
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
 */function sp(n){if(n!=null){if(typeof n=="string")return{role:"system",parts:[{text:n}]};if(n.text)return{role:"system",parts:[n]};if(n.parts)return n.role?n:{role:"system",parts:n.parts}}}function qi(n){let e=[];if(typeof n=="string")e=[{text:n}];else for(const t of n)typeof t=="string"?e.push({text:t}):e.push(t);return i0(e)}function i0(n){const e={role:"user",parts:[]},t={role:"function",parts:[]};let r=!1,i=!1;for(const s of n)"functionResponse"in s?(t.parts.push(s),i=!0):(e.parts.push(s),r=!0);if(r&&i)throw new Ct("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!r&&!i)throw new Ct("No content is provided for sending chat message.");return r?e:t}function s0(n,e){var t;let r={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(t=e?.cachedContent)===null||t===void 0?void 0:t.name,contents:[]};const i=n.generateContentRequest!=null;if(n.contents){if(i)throw new rr("CountTokensRequest must have one of contents or generateContentRequest, not both.");r.contents=n.contents}else if(i)r=Object.assign(Object.assign({},r),n.generateContentRequest);else{const s=qi(n);r.contents=[s]}return{generateContentRequest:r}}function dh(n){let e;return n.contents?e=n:e={contents:[qi(n)]},n.systemInstruction&&(e.systemInstruction=sp(n.systemInstruction)),e}function o0(n){return typeof n=="string"||Array.isArray(n)?{content:qi(n)}:n}/**
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
 */const fh=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],a0={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function l0(n){let e=!1;for(const t of n){const{role:r,parts:i}=t;if(!e&&r!=="user")throw new Ct(`First content should be with role 'user', got ${r}`);if(!nh.includes(r))throw new Ct(`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(nh)}`);if(!Array.isArray(i))throw new Ct("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new Ct("Each Content should have at least one part");const s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const l of i)for(const u of fh)u in l&&(s[u]+=1);const a=a0[r];for(const l of fh)if(!a.includes(l)&&s[l]>0)throw new Ct(`Content with role '${r}' can't contain '${l}' part`);e=!0}}function ph(n){var e;if(n.candidates===void 0||n.candidates.length===0)return!1;const t=(e=n.candidates[0])===null||e===void 0?void 0:e.content;if(t===void 0||t.parts===void 0||t.parts.length===0)return!1;for(const r of t.parts)if(r===void 0||Object.keys(r).length===0||r.text!==void 0&&r.text==="")return!1;return!0}/**
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
 */const gh="SILENT_ERROR";class c0{constructor(e,t,r,i={}){this.model=t,this.params=r,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,r?.history&&(l0(r.history),this._history=r.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var r,i,s,a,l,u;await this._sendPromise;const d=qi(e),f={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),t);let _;return this._sendPromise=this._sendPromise.then(()=>ip(this._apiKey,this.model,f,p)).then(I=>{var C;if(ph(I.response)){this._history.push(d);const S=Object.assign({parts:[],role:"model"},(C=I.response.candidates)===null||C===void 0?void 0:C[0].content);this._history.push(S)}else{const S=Hn(I.response);S&&console.warn(`sendMessage() was unsuccessful. ${S}. Inspect response object for details.`)}_=I}).catch(I=>{throw this._sendPromise=Promise.resolve(),I}),await this._sendPromise,_}async sendMessageStream(e,t={}){var r,i,s,a,l,u;await this._sendPromise;const d=qi(e),f={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),t),_=rp(this._apiKey,this.model,f,p);return this._sendPromise=this._sendPromise.then(()=>_).catch(I=>{throw new Error(gh)}).then(I=>I.response).then(I=>{if(ph(I)){this._history.push(d);const C=Object.assign({},I.candidates[0].content);C.role||(C.role="model"),this._history.push(C)}else{const C=Hn(I);C&&console.warn(`sendMessageStream() was unsuccessful. ${C}. Inspect response object for details.`)}}).catch(I=>{I.message!==gh&&console.error(I)}),_}}/**
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
 */async function u0(n,e,t,r){return(await ls(e,Pr.COUNT_TOKENS,n,!1,JSON.stringify(t),r)).json()}/**
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
 */async function h0(n,e,t,r){return(await ls(e,Pr.EMBED_CONTENT,n,!1,JSON.stringify(t),r)).json()}async function d0(n,e,t,r){const i=t.requests.map(a=>Object.assign(Object.assign({},a),{model:e}));return(await ls(e,Pr.BATCH_EMBED_CONTENTS,n,!1,JSON.stringify({requests:i}),r)).json()}/**
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
 */class mh{constructor(e,t,r={}){this.apiKey=e,this._requestOptions=r,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=sp(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var r;const i=dh(e),s=Object.assign(Object.assign({},this._requestOptions),t);return ip(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}async generateContentStream(e,t={}){var r;const i=dh(e),s=Object.assign(Object.assign({},this._requestOptions),t);return rp(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}startChat(e){var t;return new c0(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(t=this.cachedContent)===null||t===void 0?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){const r=s0(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),t);return u0(this.apiKey,this.model,r,i)}async embedContent(e,t={}){const r=o0(e),i=Object.assign(Object.assign({},this._requestOptions),t);return h0(this.apiKey,this.model,r,i)}async batchEmbedContents(e,t={}){const r=Object.assign(Object.assign({},this._requestOptions),t);return d0(this.apiKey,this.model,e,r)}}/**
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
 */class f0{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new Ct("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new mh(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,r){if(!e.name)throw new rr("Cached content must contain a `name` field.");if(!e.model)throw new rr("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const a of i)if(t?.[a]&&e[a]&&t?.[a]!==e[a]){if(a==="model"){const l=t.model.startsWith("models/")?t.model.replace("models/",""):t.model,u=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(l===u)continue}throw new rr(`Different value for "${a}" specified in modelParams (${t[a]}) and cachedContent (${e[a]})`)}const s=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new mh(this.apiKey,s,r)}}const p0={apiKey:"AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",authDomain:"watchlist-bcdfd.firebaseapp.com",projectId:"watchlist-bcdfd",storageBucket:"watchlist-bcdfd.firebasestorage.app",messagingSenderId:"479628005507",appId:"1:479628005507:web:12e0aa5b98977c82860bb6"},op=Lh(p0),tt=yy(op),sa=Dw(op),g0=new f0(void 0);g0.getGenerativeModel({model:"gemini-1.5-flash-latest"});var m0=V("<span>"),_0=V('<div class="grid grid-cols-[100px_1fr] items-center py-1"><span class="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"> </span><div class="text-sm font-bold text-gray-200">');const Wt=["415186758","b41cc5f8","c0ea969f6","d6c165"].join(""),v0="2a444b24",kn=n=>{if(!n)return null;const e=n.toLowerCase();return e.includes("netflix")?"Netflix":e.includes("prime")||e.includes("amazon")?"Amazon Prime Video":e.includes("hotstar")||e.includes("jio")||e.includes("disney")?"JioHotstar":e.includes("sony")||e.includes("liv")?"Sony LIV":e.includes("zee")?"Zee5":e.includes("apple")?"Apple TV":e.includes("crunchyroll")?"Crunchyroll":n.trim()},Qr=n=>n?.genresList||(typeof n?.genres=="string"?n.genres.split(","):[])||[],Gi=n=>[...new Set((n?.platformsList||[]).map(kn).filter(Boolean))],Dl=n=>{if(!n||n<=0)return null;const e=Math.floor(n/60),t=n%60;return e>0?`${e}h ${t>0?t+"m":""}`:`${t}m`},B=n=>(()=>{var e=m0();return m(e,()=>n.name),X(()=>xe(e,`material-symbols-outlined ${n.fill?"filled":""} ${n.class||""}`)),e})(),fn=n=>(()=>{var e=_0(),t=e.firstChild,r=t.firstChild,i=t.nextSibling;return m(t,T(B,{get name(){return n.icon},class:"text-[14px]"}),r),m(t,()=>n.label,null),m(i,()=>n.value),e})();var y0=V('<div class="h-screen w-full flex items-center justify-center bg-[#08090b] overflow-hidden relative"><div class="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse pointer-events-none"style=animation-duration:4s></div><div class="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-[var(--secondary)]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"style=animation-duration:5s;animation-delay:1s></div><div class="absolute inset-0 pointer-events-none opacity-20"style="background-image:radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);background-size:24px 24px"></div><div class="absolute inset-0 bg-gradient-to-b from-[#08090b]/40 via-transparent to-[#08090b]/80 pointer-events-none"></div><div class="relative z-20 flex flex-col items-center animate-pop-in"><div class="relative mb-10"><h1 class="text-6xl md:text-8xl font-black font-headline text-transparent bg-clip-text bg-gradient-to-br from-white via-[var(--primary)] to-[var(--secondary)] tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">CINELOG</h1></div><div class="flex flex-col items-center gap-4 w-64"><div class="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-inner relative border border-white/5"><div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent skeleton-bg opacity-80"></div></div><div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"><span>Syncing Universe');function b0(){return(()=>{var n=y0(),e=n.firstChild,t=e.nextSibling,r=t.nextSibling,i=r.nextSibling,s=i.nextSibling,a=s.firstChild,l=a.nextSibling,u=l.firstChild,d=u.nextSibling,f=d.firstChild;return m(d,T(B,{name:"radar",class:"text-[12px] animate-spin text-[var(--primary)] drop-shadow-[0_0_8px_var(--primary)]"}),f),n})()}var w0=V("<div class=hero><div class=hero-img></div><div class=hero-body><div class=hero-eyebrow><div class=hero-dot></div><div class=hero-eyebrow-text></div></div><h1 class=hero-title></h1><div class=hero-meta><div class=hero-meta-item><span>★</span> <span class=rating-val></span></div><div class=hero-meta-sep>/</div><div class=hero-meta-item></div><div class=hero-meta-sep>/</div><div class=hero-meta-item> MIN</div></div><div class=hero-actions><button class=btn-solid>▶ PLAY NOW</button><button class=btn-ghost>✚ VAULT INFO"),E0=V("<div class=section><div class=section-head><div class=section-name>Recently Added</div><div class=section-action>VIEW ALL →</div></div><div class=movie-row>"),I0=V("<div class=section><div class=section-head><div class=section-name>Your Top Rated</div><div class=section-action>SEE MORE →</div></div><div class=movie-row>"),T0=V("<div class=section><div class=section-head><div class=section-name style=text-transform:uppercase>"),x0=V('<div class=neural-root><div id=cursor></div><div id=cursor-ring></div><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div><header><div class=logo-wrap><div class=logo-mark><svg viewBox="0 0 32 32"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 2L2 9L16 16L30 9L16 2Z"fill=#c8f135></path><path d="M2 23L16 30L30 23V9L16 16L2 9V23Z"fill=#c8f135 fill-opacity=0.3></path></svg></div><div class=logo-text>CINE<span>LOG</span><span class=logo-version>v4.0</span></div></div><div class=header-center><div>DASHBOARD</div><div>VAULT</div><div>LISTS</div><div>SOON</div></div><div class=header-right><div class=status-pill><div class=status-dot></div>NEURAL_LINK</div><img class=avatar></div></header><div class=layout><aside class=sidebar><div class=sidebar-label>Interface</div><div><span class=side-icon>⌂</span> Home</div><div><span class=side-icon>◈</span> Vault<span class=side-badge></span></div><div><span class=side-icon>≡</span> Lists</div><div><span class=side-icon>◷</span> Soon<span class="side-badge hot">HOT</span></div><div class=sidebar-label>System</div><div class=side-item><span class=side-icon>⚙</span> Settings</div><div class=side-item><span class=side-icon>✦</span> Insights</div><div class=sidebar-footer><div class=sf-label>DATA_INTEGRITY</div><div class=sf-bar-wrap><div class=sf-bar><div class=sf-bar-top><span>Storage</span><span> %</span></div><div class=sf-bar-track><div class=sf-bar-fill style=background:var(--pulse)></div></div></div></div></div></aside><main class=content></main><aside class=right-panel><div class=ai-block><div class=ai-header><div class=ai-icon>✦</div><div class=ai-title>AI Picks</div><div class=ai-sub>NEURAL // LIVE</div></div><div class=ai-pick><div class=ai-pick-n>01</div><div class=ai-pick-title>Neural Suggestion</div><div class=ai-pick-genre>AI CORE</div></div><button class=ai-btn>✦ &nbsp; Refresh Picks</button></div><div class=stats-grid><div class=stat-mini><div class=stat-mini-val style=color:var(--pulse)></div><div class=stat-mini-lbl>WATCHED</div></div><div class=stat-mini><div class=stat-mini-val></div><div class=stat-mini-lbl>HOURS</div></div><div class=stat-mini><div class=stat-mini-val style=color:var(--ember)></div><div class=stat-mini-lbl>WATCHLIST</div></div><div class=stat-mini><div class=stat-mini-val style=color:var(--frost)></div><div class=stat-mini-lbl>TOTAL</div></div></div><div class=receipt-teaser><div class=rt-title>Watchlist Receipt</div><div class=rt-sub>Generate your shareable cinema year in review</div><div class=rt-tag>NEW FEATURE</div></div><div class=activity-block><div class=activity-title>RECENT ACTIVITY</div></div></aside></div><div class=bottom-nav><div><div class=bnav-ico>⌂</div>HOME</div><div><div class=bnav-ico>◈</div>VAULT</div><div><div class=bnav-ico>≡</div>LISTS</div><div><div class=bnav-ico>◷</div>SOON</div></div><button class=fab-mobile>+'),_h=V("<div class=mcard><div class=mcard-img><img><div class=mcard-badge><span></span><span class=mcard-rating>★ </span></div></div><div class=mcard-title></div><div class=mcard-year>"),A0=V(`<div class=act-item><img class=act-img alt><div class=act-body><div class=act-name></div><div class=act-time>Recently Added</div></div><span style="font-family:'DM Mono',monospace;font-size:8px;padding:2px 7px;border-radius:5px">`);const S0=n=>{const[e,t]=Y(0),[r,i]=Y(0),[s,a]=Y(0),[l,u]=Y(0);let d,f;ln(()=>{const N=$=>{t($.clientX),i($.clientY),d&&(d.style.left=`${$.clientX}px`,d.style.top=`${$.clientY}px`)};document.addEventListener("mousemove",N);const R=()=>{a($=>$+(e()-$)*.12),u($=>$+(r()-$)*.12),f&&(f.style.left=`${s()}px`,f.style.top=`${l()}px`),requestAnimationFrame(R)};return R(),()=>document.removeEventListener("mousemove",N)});const p=()=>{d&&f&&(d.style.width="14px",d.style.height="14px",f.style.width="48px",f.style.height="48px",f.style.borderColor="rgba(200,241,53,0.6)")},_=()=>{d&&f&&(d.style.width="8px",d.style.height="8px",f.style.width="32px",f.style.height="32px",f.style.borderColor="rgba(200,241,53,0.4)")},I=Le(()=>{const N=n.watchlist();return{total:N.length,completed:N.filter(R=>R.status==="Completed").length,watching:N.filter(R=>R.status==="Watching").length,planned:N.filter(R=>R.status==="Planned"||R.status==="Plan to Watch").length,hours:Math.floor(N.filter(R=>R.status==="Completed").reduce((R,$)=>R+(parseInt($.runtime)||0),0)/60)}}),C=Le(()=>n.watchlist().slice(0,3)),S=Le(()=>[...n.watchlist()].sort((N,R)=>(parseFloat(R.imdbRating)||0)-(parseFloat(N.imdbRating)||0)).slice(0,4)),A=Le(()=>{const N=n.watchlist().filter(R=>R.status==="Watching");return N.length>0?N[0]:n.watchlist()[0]});return(()=>{var N=x0(),R=N.firstChild,$=R.nextSibling,F=$.nextSibling,U=F.nextSibling,W=U.nextSibling,w=W.nextSibling,v=w.firstChild,y=v.nextSibling,E=y.firstChild,x=E.nextSibling,k=x.nextSibling,b=k.nextSibling,le=y.nextSibling,J=le.firstChild,O=J.nextSibling,q=w.nextSibling,j=q.firstChild,z=j.firstChild,ee=z.nextSibling,Ee=ee.nextSibling,he=Ee.firstChild,de=he.nextSibling,pe=de.nextSibling,oe=Ee.nextSibling,Fe=oe.nextSibling,Te=Fe.nextSibling,re=Te.nextSibling,De=re.nextSibling,Re=De.nextSibling,Ne=Re.firstChild,je=Ne.nextSibling,Pt=je.firstChild,pt=Pt.firstChild,Nt=pt.firstChild,Dt=Nt.nextSibling,qt=Dt.firstChild,En=pt.nextSibling,Fn=En.firstChild,me=j.nextSibling,Vt=me.nextSibling,In=Vt.firstChild,un=In.firstChild,ct=un.nextSibling,ce=ct.nextSibling,ie=In.nextSibling,ge=ie.firstChild,we=ge.firstChild,ke=ge.nextSibling,Ve=ke.firstChild,rt=ke.nextSibling,Se=rt.firstChild,bt=rt.nextSibling,Gt=bt.firstChild,Kt=ie.nextSibling,Vr=Kt.nextSibling;Vr.firstChild;var pr=q.nextSibling,hn=pr.firstChild,Un=hn.nextSibling,jn=Un.nextSibling,Qt=jn.nextSibling,gr=pr.nextSibling;N.$$mousemove=Z=>{Z.target.closest("button, .mcard, .tab, .side-item, .ai-pick, .receipt-teaser")?p():_()};var Tn=d;typeof Tn=="function"?oa(Tn,R):d=R;var Lt=f;return typeof Lt=="function"?oa(Lt,$):f=$,E.$$click=()=>n.setView("dashboard"),x.$$click=()=>n.setView("watchlist"),k.$$click=()=>n.setView("franchises"),b.$$click=()=>n.setView("upcoming"),We(O,"click",n.onUserClick),ee.$$click=()=>n.setView("dashboard"),Ee.$$click=()=>n.setView("watchlist"),m(pe,()=>I().total),oe.$$click=()=>n.setView("franchises"),Fe.$$click=()=>n.setView("upcoming"),We(re,"click",n.onSettingsClick),We(De,"click",n.onStatsClick),m(Dt,()=>Math.min(100,Math.floor(I().total/10)),qt),m(me,T(G,{get when(){return n.view()==="dashboard"},get children(){return[T(G,{get when(){return A()},get children(){var Z=w0(),Be=Z.firstChild,dt=Be.nextSibling,_e=dt.firstChild,Je=_e.firstChild,te=Je.nextSibling,$e=_e.nextSibling,Xe=$e.nextSibling,ze=Xe.firstChild,wt=ze.firstChild,Ze=wt.nextSibling,gt=Ze.nextSibling,zt=ze.nextSibling,Yt=zt.nextSibling,Pe=Yt.nextSibling,Jt=Pe.nextSibling,Xt=Jt.firstChild;return Z.$$click=()=>n.openMovie(A().id),m(te,()=>A().status==="Watching"?"CONTINUE WATCHING":"FEATURED FROM VAULT"),m($e,()=>A().title||A().name),m(gt,()=>A().imdbRating||"N/A"),m(Yt,()=>A().release_date?.split("-")[0]),m(Jt,()=>A().runtime,Xt),X(Zt=>nn(Be,"background",`linear-gradient(to right, rgba(4,6,10,0.97) 35%, rgba(4,6,10,0.5) 70%, rgba(4,6,10,0.2) 100%), url('https://image.tmdb.org/t/p/original${A().backdrop_path}') center/cover`)),Z}}),(()=>{var Z=E0(),Be=Z.firstChild,dt=Be.firstChild,_e=dt.nextSibling,Je=Be.nextSibling;return _e.$$click=()=>n.setView("watchlist"),m(Je,T(Ye,{get each(){return n.watchlist().slice(0,6)},children:te=>(()=>{var $e=_h(),Xe=$e.firstChild,ze=Xe.firstChild,wt=ze.nextSibling,Ze=wt.firstChild,gt=Ze.nextSibling;gt.firstChild;var zt=Xe.nextSibling,Yt=zt.nextSibling;return $e.$$click=()=>n.openMovie(te.id),m(Ze,(()=>{var Pe=ut(()=>te.status==="Completed");return()=>Pe()?"DONE":te.status==="Watching"?"WATCHING":"PLANNED"})()),m(gt,()=>te.imdbRating||"N/A",null),m(zt,()=>te.title||te.name),m(Yt,()=>te.release_date?.split("-")[0]),X(Pe=>{var Jt=`https://image.tmdb.org/t/p/w300${te.poster_path}`,Xt=te.title||te.name,Zt=`mbadge ${te.status==="Completed"?"mbadge-done":te.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`;return Jt!==Pe.e&&Me(ze,"src",Pe.e=Jt),Xt!==Pe.t&&Me(ze,"alt",Pe.t=Xt),Zt!==Pe.a&&xe(Ze,Pe.a=Zt),Pe},{e:void 0,t:void 0,a:void 0}),$e})()})),Z})(),(()=>{var Z=I0(),Be=Z.firstChild,dt=Be.firstChild,_e=dt.nextSibling,Je=Be.nextSibling;return _e.$$click=()=>n.setView("watchlist"),m(Je,T(Ye,{get each(){return S()},children:te=>(()=>{var $e=_h(),Xe=$e.firstChild,ze=Xe.firstChild,wt=ze.nextSibling,Ze=wt.firstChild,gt=Ze.nextSibling;gt.firstChild;var zt=Xe.nextSibling,Yt=zt.nextSibling;return $e.$$click=()=>n.openMovie(te.id),m(Ze,(()=>{var Pe=ut(()=>te.status==="Completed");return()=>Pe()?"DONE":te.status==="Watching"?"WATCHING":"PLANNED"})()),m(gt,()=>te.imdbRating||"N/A",null),m(zt,()=>te.title||te.name),m(Yt,()=>te.release_date?.split("-")[0]),X(Pe=>{var Jt=`https://image.tmdb.org/t/p/w300${te.poster_path}`,Xt=te.title||te.name,Zt=`mbadge ${te.status==="Completed"?"mbadge-done":te.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`;return Jt!==Pe.e&&Me(ze,"src",Pe.e=Jt),Xt!==Pe.t&&Me(ze,"alt",Pe.t=Xt),Zt!==Pe.a&&xe(Ze,Pe.a=Zt),Pe},{e:void 0,t:void 0,a:void 0}),$e})()})),Z})()]}}),null),m(me,T(G,{get when(){return n.view()!=="dashboard"},get children(){var Z=T0(),Be=Z.firstChild,dt=Be.firstChild;return m(dt,()=>n.view()),m(Z,()=>n.children,null),Z}}),null),ce.$$click=()=>n.onStatsClick(),m(we,()=>I().completed),m(Ve,()=>I().hours),m(Se,()=>I().planned),m(Gt,()=>I().total),Kt.$$click=()=>n.onStatsClick(),m(Vr,T(Ye,{get each(){return C()},children:Z=>(()=>{var Be=A0(),dt=Be.firstChild,_e=dt.nextSibling,Je=_e.firstChild,te=_e.nextSibling;return Be.$$click=()=>n.openMovie(Z.id),m(Je,()=>Z.title||Z.name),m(te,()=>Z.status==="Completed"?"DONE":"SAVED"),X($e=>{var Xe=`https://image.tmdb.org/t/p/w92${Z.poster_path}`,ze=`act-badge ${Z.status==="Completed"?"mbadge-done":Z.status==="Watching"?"mbadge-wtch":"mbadge-plan"}`,wt=Z.status==="Completed"?"rgba(200,241,53,0.12)":"rgba(142,184,255,0.15)",Ze=Z.status==="Completed"?"var(--pulse)":"var(--frost)";return Xe!==$e.e&&Me(dt,"src",$e.e=Xe),ze!==$e.t&&xe(te,$e.t=ze),wt!==$e.a&&nn(te,"background",$e.a=wt),Ze!==$e.o&&nn(te,"color",$e.o=Ze),$e},{e:void 0,t:void 0,a:void 0,o:void 0}),Be})()}),null),hn.$$click=()=>n.setView("dashboard"),Un.$$click=()=>n.setView("watchlist"),jn.$$click=()=>n.setView("franchises"),Qt.$$click=()=>n.setView("upcoming"),We(gr,"click",n.onSearchClick),X(Z=>{var Be=`tab ${n.view()==="dashboard"?"active":""}`,dt=`tab ${n.view()==="watchlist"?"active":""}`,_e=`tab ${n.view()==="franchises"?"active":""}`,Je=`tab ${n.view()==="upcoming"?"active":""}`,te=n.user().photoURL,$e=`side-item ${n.view()==="dashboard"?"active":""}`,Xe=`side-item ${n.view()==="watchlist"?"active":""}`,ze=`side-item ${n.view()==="franchises"?"active":""}`,wt=`side-item ${n.view()==="upcoming"?"active":""}`,Ze=`${Math.min(100,Math.floor(I().total/10))}%`,gt=`bnav ${n.view()==="dashboard"?"active":""}`,zt=`bnav ${n.view()==="watchlist"?"active":""}`,Yt=`bnav ${n.view()==="franchises"?"active":""}`,Pe=`bnav ${n.view()==="upcoming"?"active":""}`;return Be!==Z.e&&xe(E,Z.e=Be),dt!==Z.t&&xe(x,Z.t=dt),_e!==Z.a&&xe(k,Z.a=_e),Je!==Z.o&&xe(b,Z.o=Je),te!==Z.i&&Me(O,"src",Z.i=te),$e!==Z.n&&xe(ee,Z.n=$e),Xe!==Z.s&&xe(Ee,Z.s=Xe),ze!==Z.h&&xe(oe,Z.h=ze),wt!==Z.r&&xe(Fe,Z.r=wt),Ze!==Z.d&&nn(Fn,"width",Z.d=Ze),gt!==Z.l&&xe(hn,Z.l=gt),zt!==Z.u&&xe(Un,Z.u=zt),Yt!==Z.c&&xe(jn,Z.c=Yt),Pe!==Z.w&&xe(Qt,Z.w=Pe),Z},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0}),N})()};Bt(["mousemove","click"]);var C0=V('<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"loading=lazy>',!0,!1,!1),R0=V('<div class="absolute top-2 right-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-wider shadow-lg max-w-[60px] truncate">'),k0=V('<div class="group cursor-pointer animate-pop-in relative"><div class="aspect-[2/3] rounded-3xl overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-300 border border-white/10 group-hover:border-[var(--primary)]/50 bg-[#171921]"><div class="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none"></div><div class="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-[var(--primary)] uppercase tracking-wider"></div><div class="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-end"><h4 class="text-xs font-black truncate text-white drop-shadow-md mb-1 leading-tight"></h4><p class="text-[9px] text-gray-300 font-bold mb-1 flex items-center gap-1 drop-shadow-md whitespace-nowrap overflow-hidden"> • <!> </p><div class="grid grid-cols-3 gap-1 mt-1 w-full"><span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-[#f5c518] flex items-center justify-center gap-0.5 shadow-sm truncate"> </span><span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-red-500 flex items-center justify-center gap-0.5 shadow-sm truncate">🍅 </span><span class="text-[8px] py-1 rounded-md bg-[var(--primary)]/20 border border-[var(--primary)]/20 font-black text-[var(--primary)] flex items-center justify-center gap-0.5 shadow-sm truncate"> '),$0=V('<div class="w-full h-full flex items-center justify-center skeleton-bg">');const P0=n=>(()=>{var e=k0(),t=e.firstChild,r=t.firstChild,i=r.nextSibling,s=i.nextSibling,a=s.firstChild,l=a.nextSibling,u=l.firstChild,d=u.nextSibling;d.nextSibling;var f=l.nextSibling,p=f.firstChild,_=p.firstChild,I=p.nextSibling;I.firstChild;var C=I.nextSibling,S=C.firstChild;return We(e,"click",n.onClick),m(t,T(G,{get when(){return n.movie.poster_path},get fallback(){return(()=>{var A=$0();return m(A,T(B,{name:"movie",class:"text-4xl text-gray-600"})),A})()},get children(){var A=C0();return X(()=>Me(A,"src",`https://image.tmdb.org/t/p/w500${n.movie.poster_path}`)),A}}),r),m(i,(()=>{var A=ut(()=>n.movie.status==="Plan to Watch");return()=>A()?"Planned":n.movie.status||"NEW"})()),m(t,T(G,{get when(){return n.movie.tag},get children(){var A=R0();return m(A,()=>n.movie.tag),A}}),s),m(a,()=>n.movie.title||n.movie.name),m(l,()=>(n.movie.release_date||"").split("-")[0]||"N/A",u),m(l,()=>n.movie.media_type==="tv"?"Series":"Movie",d),m(l,T(G,{get when(){return n.movie.runtime>0},get children(){return["• ",ut(()=>Dl(n.movie.runtime))]}}),null),m(p,T(B,{name:"star",class:"text-[10px]",fill:!0}),_),m(p,()=>n.movie.imdbRating||"-",null),m(I,()=>n.movie.rtRating||"-",null),m(C,T(B,{name:"person",class:"text-[10px]",fill:!0}),S),m(C,()=>n.movie.rating||"-",null),e})();Bt(["click"]);Bt(["click"]);Bt(["click"]);var N0=V('<button class="text-[9px] text-white bg-red-500/20 border border-red-500/50 hover:bg-red-500 px-3 py-1.5 rounded-full font-black uppercase tracking-widest active:scale-95 transition-all shrink-0">Clear'),D0=V('<div class="text-center p-12 text-gray-500 opacity-50"><p class="font-bold text-sm">No titles match your filters.'),V0=V('<div class="animate-fade-in pb-10"><div class="sticky top-0 z-40 bg-[#08090b]/80 backdrop-blur-2xl pt-4 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 border-b border-white/5 mb-6"><div class="flex justify-between items-center mb-5"><h2 class="text-3xl font-headline font-black drop-shadow-md">Vault</h2><button class="glass-surface px-4 py-2.5 rounded-full text-xs font-bold flex gap-2 border border-white/10 hover:bg-white/10 active:scale-95 transition-all shadow-lg"> Filter </button></div><div class="relative group animate-pop-in"><div class="flex items-center gap-3 glass-surface rounded-2xl px-5 py-4 relative border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors shadow-xl"><input placeholder="Search movies, series, or actors..."class="bg-transparent border-none w-full outline-none text-white text-sm font-medium placeholder-gray-600"></div></div></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-4">'),O0=V('<span class="bg-[var(--primary)] text-[#0c0e14] px-2 py-0.5 rounded-full text-[10px]">'),M0=V('<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 z-[999999] animate-fade-in"><div class="glass-surface w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 pb-32 sm:p-8 border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform transition-transform animate-pop-in bg-[#08090b]/95"><div class="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden"></div><div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-xl text-white flex items-center gap-2"> Filters</h3><button class="bg-white/5 p-2 rounded-full active:scale-95 transition-all"></button></div><div class="space-y-4 max-h-[50vh] overflow-y-auto pr-2 hide-scrollbar"></div><button class="w-full mt-6 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20">Apply Filters'),L0=V('<div class="grid grid-cols-[90px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest"></span><select class="glass-surface p-2.5 rounded-lg text-xs text-white outline-none border border-white/5 focus:border-[var(--primary)]">'),F0=V("<option>");function U0(n){const[e,t]=Y(""),[r,i]=Y({type:"all",status:n.activeStatus||"all",region:"all",genre:"all",platform:"all",sort:"recent",tag:"all"}),[s,a]=Y(!1),[l,u]=Y(30);$n(()=>i(S=>({...S,status:n.activeStatus||"all"})));const d=()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&u(S=>S+30)};ln(()=>window.addEventListener("scroll",d)),cn(()=>window.removeEventListener("scroll",d));const f=Le(()=>[...new Set(n.watchlist().flatMap(S=>Qr(S)))].filter(Boolean).sort()),p=Le(()=>[...new Set(n.watchlist().flatMap(S=>Gi(S)))].filter(Boolean).sort()),_=Le(()=>[...new Set(n.watchlist().map(S=>S.tag).filter(Boolean))].sort()),I=Le(()=>{let S=n.watchlist();if(e()){const A=e().toLowerCase();S=S.filter(N=>(N.title||N.name||"").toLowerCase().includes(A)||N.castList&&N.castList.some(R=>R.toLowerCase().includes(A)))}return r().type!=="all"&&(S=S.filter(A=>A.media_type===r().type)),r().status!=="all"&&(S=S.filter(A=>A.status===r().status||r().status==="Planned"&&A.status==="Plan to Watch")),r().region!=="all"&&(S=S.filter(A=>(A.region||"International")===r().region)),r().genre!=="all"&&(S=S.filter(A=>Qr(A).includes(r().genre))),r().platform!=="all"&&(S=S.filter(A=>Gi(A).includes(r().platform))),r().tag!=="all"&&(S=S.filter(A=>A.tag===r().tag)),S.sort((A,N)=>r().sort==="year_desc"?(parseInt(String(N.release_date||N.first_air_date||"").substring(0,4))||0)-(parseInt(String(A.release_date||A.first_air_date||"").substring(0,4))||0):r().sort==="rating_desc"?(N.rating||0)-(A.rating||0):r().sort==="title_asc"?(A.title||A.name||"").localeCompare(N.title||N.name||""):(N.addedAt?.seconds||0)-(A.addedAt?.seconds||0))}),C=Le(()=>Object.values(r()).filter(S=>S!=="all"&&S!=="recent").length);return(()=>{var S=V0(),A=S.firstChild,N=A.firstChild,R=N.firstChild,$=R.nextSibling,F=$.firstChild,U=N.nextSibling,W=U.firstChild,w=W.firstChild,v=A.nextSibling;return $.$$click=()=>a(!0),m($,T(B,{name:"tune",class:"text-sm"}),F),m($,(()=>{var y=ut(()=>C()>0);return()=>y()&&(()=>{var E=O0();return m(E,C),E})()})(),null),m(W,T(B,{name:"search",class:"text-gray-400"}),w),w.$$input=y=>{t(y.target.value),u(30)},m(W,T(G,{get when(){return e().length>0||C()>0},get children(){var y=N0();return y.$$click=()=>{i({type:"all",status:"all",region:"all",genre:"all",platform:"all",sort:"recent",tag:"all"}),t(""),u(30),n.onFilterChange&&n.onFilterChange("all")},y}}),null),m(S,T(G,{get when(){return I().length===0},get children(){var y=D0(),E=y.firstChild;return m(y,T(B,{name:"sentiment_dissatisfied",class:"text-5xl mb-3"}),E),y}}),v),m(v,T(Ye,{get each(){return I().slice(0,l())},children:y=>T(P0,{movie:y,onClick:()=>n.openMovie(y.id)})})),m(S,T(G,{get when(){return s()},get children(){return T(j0,{get filters(){return r()},setFilters:y=>{i(y),u(30)},get uniqueGenres(){return f()},get uniquePlatforms(){return p()},get uniqueTags(){return _()},onClose:()=>a(!1),get onFilterChange(){return n.onFilterChange}})}}),null),X(()=>w.value=e()),S})()}function j0(n){return ln(()=>document.body.style.overflow="hidden"),cn(()=>document.body.style.overflow=""),(()=>{var e=M0(),t=e.firstChild,r=t.firstChild,i=r.nextSibling,s=i.firstChild,a=s.firstChild,l=s.nextSibling,u=i.nextSibling,d=u.nextSibling;return We(e,"click",n.onClose),t.$$click=f=>f.stopPropagation(),m(s,T(B,{name:"tune",class:"text-[var(--primary)]"}),a),We(l,"click",n.onClose),m(l,T(B,{name:"close",class:"text-gray-400 hover:text-white"})),m(u,T(yr,{label:"Status",get val(){return n.filters.status},set:f=>{n.setFilters({...n.filters,status:f}),n.onFilterChange&&n.onFilterChange(f)},opts:[{l:"All",v:"all"},{l:"Planned",v:"Planned"},{l:"Watching",v:"Watching"},{l:"Completed",v:"Completed"}]}),null),m(u,T(yr,{label:"Tags",get val(){return n.filters.tag},set:f=>n.setFilters({...n.filters,tag:f}),get opts(){return[{l:"All Tags",v:"all"},...n.uniqueTags.map(f=>({l:f,v:f}))]}}),null),m(u,T(yr,{label:"Type",get val(){return n.filters.type},set:f=>n.setFilters({...n.filters,type:f}),opts:[{l:"All",v:"all"},{l:"Movies",v:"movie"},{l:"Series",v:"tv"}]}),null),m(u,T(yr,{label:"Region",get val(){return n.filters.region},set:f=>n.setFilters({...n.filters,region:f}),opts:[{l:"All",v:"all"},{l:"Indian",v:"Indian"},{l:"International",v:"International"}]}),null),m(u,T(yr,{label:"Platform",get val(){return n.filters.platform},set:f=>n.setFilters({...n.filters,platform:f}),get opts(){return[{l:"All Platforms",v:"all"},...n.uniquePlatforms.map(f=>({l:f,v:f}))]}}),null),m(u,T(yr,{label:"Genre",get val(){return n.filters.genre},set:f=>n.setFilters({...n.filters,genre:f}),get opts(){return[{l:"All Genres",v:"all"},...n.uniqueGenres.map(f=>({l:f,v:f}))]}}),null),m(u,T(yr,{label:"Sort By",get val(){return n.filters.sort},set:f=>n.setFilters({...n.filters,sort:f}),opts:[{l:"Recently Added",v:"recent"},{l:"Release Year (Newest)",v:"year_desc"},{l:"Rating (High-Low)",v:"rating_desc"},{l:"Title (A-Z)",v:"title_asc"}]}),null),We(d,"click",n.onClose),e})()}const yr=n=>(()=>{var e=L0(),t=e.firstChild,r=t.nextSibling;return m(t,()=>n.label),r.addEventListener("change",i=>n.set(i.target.value)),m(r,T(Ye,{get each(){return n.opts},children:i=>(()=>{var s=F0();return m(s,()=>i.l||i),X(()=>s.value=i.v||i),s})()})),X(()=>r.value=n.val),e})();Bt(["click","input"]);var B0=V('<div class="text-center py-12 text-gray-500"><p class="text-sm font-bold">Saari movies folder mein hain already!'),q0=V('<div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-lg bg-[#08090b]/97 rounded-[2rem] border border-white/10 shadow-2xl animate-pop-in overflow-hidden flex flex-col max-h-[80vh]"><div class="p-5 border-b border-white/5 flex justify-between items-center shrink-0"><h3 class="font-black text-lg text-white flex items-center gap-2"> Vault se Add karo</h3><button class="bg-white/5 p-2 rounded-full active:scale-95 hover:bg-white/10 transition-all"></button></div><div class="p-4 border-b border-white/5 shrink-0"><div class="flex items-center gap-3 glass-surface rounded-2xl px-4 py-3 border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors"><input autofocus placeholder="Movie ya series dhundo..."class="bg-transparent border-none w-full outline-none text-white text-sm font-medium placeholder-gray-600"></div></div><div class="overflow-y-auto hide-scrollbar p-3 space-y-2">'),G0=V('<img class="w-10 h-14 rounded-xl object-cover shrink-0 bg-[#171921]">'),z0=V('<div class="flex items-center gap-3 glass-surface p-3 rounded-2xl border border-white/5 hover:border-[var(--primary)]/30 transition-all group"><div class="flex-1 min-w-0"><p class="font-bold text-sm text-white truncate"></p><p class="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest"> • </p></div><button class="w-9 h-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-[#0c0e14] transition-all active:scale-95 shrink-0">'),H0=V('<div class="w-10 h-14 bg-white/5 rounded-xl shrink-0 flex items-center justify-center">'),W0=V('<button class="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/5 hover:bg-white/20 active:scale-95 transition-all shadow-lg flex items-center gap-1"> Folder'),K0=V('<button class="mb-6 glass-surface px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest w-max active:scale-95 transition-transform"> Back'),Q0=V('<div class="flex flex-col gap-5 mb-10">'),Y0=V('<div class="flex justify-between items-end mb-4 px-2"><h3 class="font-bold text-xl font-headline">Titles <span class="text-[var(--primary)] text-sm">(<!>)</span></h3><select class="bg-[#08090b] text-[var(--primary)] text-[10px] font-bold uppercase outline-none border border-white/10 rounded-full px-3 py-1.5 shadow-lg"><option value=order>Sort: Custom</option><option value=year>Sort: Year'),J0=V('<div class="text-center py-16 opacity-40"><p class="text-sm font-bold text-gray-300">Folder empty hai</p><p class="text-[11px] text-gray-500 mt-1">"Add Movie" button se vault se add karo'),X0=V("<div class=space-y-3>"),Z0=V('<div class="pb-10 animate-fade-in"><div class="flex justify-between items-center mb-6"><h2 class="text-3xl font-headline font-black drop-shadow-md">Lists'),eE=V('<button class="bg-[var(--primary)] text-[#0c0e14] px-4 py-2 rounded-full text-xs font-black border border-[var(--primary)] active:scale-95 transition-all shadow-lg flex items-center gap-1"> Add Movie'),tE=V('<img class="absolute inset-0 w-full h-full object-cover z-0">'),nE=V('<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">'),rE=V('<div class="relative rounded-[2rem] cursor-pointer group hover:-translate-y-1 transition-all shadow-2xl flex flex-col justify-end min-h-[160px] overflow-hidden border border-white/10 bg-[#171921]"><div class="relative z-20 p-6 sm:p-8 w-full h-full flex flex-col justify-end"><div class="w-full pr-12"><p class="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest mb-1 opacity-90 drop-shadow-md">Collection</p><h3 class="font-black font-headline text-2xl sm:text-3xl text-white leading-tight drop-shadow-lg"></h3><p class="text-[10px] text-gray-300 mt-1 font-bold"> titles</p></div></div><button class="absolute top-4 right-4 z-30 text-white hover:text-red-500 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-95">'),iE=V('<div class="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1 shrink-0"><button></button><span class="text-[10px] font-black text-[var(--primary)]"></span><button>'),sE=V('<div class="flex items-center gap-3 glass-surface p-3 rounded-[1.5rem] border border-white/5 shadow-lg group hover:border-white/20 transition-all"><div class="flex-1 flex items-center gap-3 cursor-pointer min-w-0"><img class="w-11 h-16 rounded-xl object-cover shadow-md shrink-0"><div class=min-w-0><p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] transition-colors truncate"></p><p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1"></p></div></div><button class="w-8 h-8 rounded-full text-gray-600 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all active:scale-95 shrink-0">');function oE(n){const[e,t]=Y("");ln(()=>{document.body.style.overflow="hidden"}),cn(()=>{document.body.style.overflow=""});const r=Le(()=>{const s=e().toLowerCase();return n.watchlist().filter(a=>a.franchises?.[n.folderId]===void 0).filter(a=>!s||(a.title||a.name||"").toLowerCase().includes(s))}),i=async s=>{const a=n.currentMovies().length+1;await Er(St(tt,"users",n.uid,"watchlist",String(s.id)),{[`franchises.${n.folderId}`]:a}),n.showToast("Added!")};return(()=>{var s=q0(),a=s.firstChild,l=a.firstChild,u=l.firstChild,d=u.firstChild,f=u.nextSibling,p=l.nextSibling,_=p.firstChild,I=_.firstChild,C=p.nextSibling;return We(s,"click",n.onClose),a.$$click=S=>S.stopPropagation(),m(u,T(B,{name:"playlist_add",class:"text-[var(--primary)]"}),d),We(f,"click",n.onClose),m(f,T(B,{name:"close",class:"text-gray-400"})),m(_,T(B,{name:"search",class:"text-gray-500 text-sm shrink-0"}),I),I.$$input=S=>t(S.target.value),m(C,T(G,{get when(){return r().length===0},get children(){var S=B0(),A=S.firstChild;return m(S,T(B,{name:"check_circle",class:"text-4xl mb-2 opacity-30"}),A),S}}),null),m(C,T(Ye,{get each(){return r()},children:S=>(()=>{var A=z0(),N=A.firstChild,R=N.firstChild,$=R.nextSibling,F=$.firstChild,U=N.nextSibling;return m(A,T(G,{get when(){return S.poster_path},get fallback(){return(()=>{var W=H0();return m(W,T(B,{name:"movie",class:"text-gray-600 text-sm"})),W})()},get children(){var W=G0();return X(()=>Me(W,"src",`https://image.tmdb.org/t/p/w92${S.poster_path}`)),W}}),N),m(R,()=>S.title||S.name),m($,()=>(S.release_date||S.first_air_date||"").split("-")[0],F),m($,()=>S.media_type==="tv"?"Series":"Movie",null),U.$$click=()=>i(S),m(U,T(B,{name:"add",class:"text-lg"})),A})()}),null),X(()=>I.value=e()),s})()}function aE(n){const[e,t]=Y(null),[r,i]=Y("order"),[s,a]=Y(!1),l=Le(()=>n.franchises().filter(_=>_.parentId===e()).sort((_,I)=>_.name.localeCompare(I.name))),u=Le(()=>n.watchlist().filter(I=>I.franchises&&I.franchises[e()]!==void 0).sort((I,C)=>r()==="year"?(parseInt(String(C.release_date||C.first_air_date||"").substring(0,4))||0)-(parseInt(String(I.release_date||I.first_air_date||"").substring(0,4))||0):I.franchises[e()]-C.franchises[e()])),d=async()=>{const _=prompt("Folder Name:");_&&_.trim()&&(await Py(Ds(tt,"users",n.uid,"franchises"),{name:_.trim(),parentId:e(),createdAt:wl()}),n.showToast("Folder created!"))},f=async(_,I)=>{let C=[...u()];if(_+I<0||_+I>=C.length)return;const S=Tf(tt);[C[_],C[_+I]]=[C[_+I],C[_]],C.forEach((A,N)=>S.update(St(tt,"users",n.uid,"watchlist",String(A.id)),{[`franchises.${e()}`]:N+1})),await S.commit()},p=async _=>{if(!confirm(`"${_.title||_.name}" ko folder se hatayein?`))return;const I={..._.franchises};delete I[e()],await Er(St(tt,"users",n.uid,"watchlist",String(_.id)),{franchises:I}),n.showToast("Removed from folder")};return(()=>{var _=Z0(),I=_.firstChild;return I.firstChild,m(I,T(G,{get when(){return!e()},get fallback(){return(()=>{var C=eE(),S=C.firstChild;return C.$$click=()=>a(!0),m(C,T(B,{name:"playlist_add",class:"text-[16px]"}),S),C})()},get children(){var C=W0(),S=C.firstChild;return C.$$click=d,m(C,T(B,{name:"add",class:"text-[16px]"}),S),C}}),null),m(_,T(G,{get when(){return e()},get children(){var C=K0(),S=C.firstChild;return C.$$click=()=>t(null),m(C,T(B,{name:"arrow_back",class:"text-[14px]"}),S),C}}),null),m(_,T(G,{get when(){return l().length>0},get children(){var C=Q0();return m(C,T(Ye,{get each(){return l()},children:S=>{const A=()=>n.watchlist().find($=>$.franchises&&$.franchises[S.id]!==void 0),N=()=>A()?.backdrop_path?`https://image.tmdb.org/t/p/w500${A().backdrop_path}`:"none",R=()=>n.watchlist().filter($=>$.franchises&&$.franchises[S.id]!==void 0).length;return(()=>{var $=rE(),F=$.firstChild,U=F.firstChild,W=U.firstChild,w=W.nextSibling,v=w.nextSibling,y=v.firstChild,E=F.nextSibling;return $.$$click=()=>t(S.id),m($,T(G,{get when(){return N()!=="none"},get children(){return[(()=>{var x=tE();return X(()=>Me(x,"src",N())),x})(),nE()]}}),F),m(w,()=>S.name),m(v,R,y),E.$$click=x=>{x.stopPropagation(),confirm("Delete folder?")&&If(St(tt,"users",n.uid,"franchises",S.id))},m(E,T(B,{name:"delete",class:"text-[18px]"})),m($,T(G,{get when(){return N()==="none"},get children(){return T(B,{name:"folder",class:"absolute right-6 top-1/2 -translate-y-1/2 text-white/5 text-8xl pointer-events-none z-10",fill:!0})}}),null),$})()}})),C}}),null),m(_,T(G,{get when(){return e()},get children(){return[(()=>{var C=Y0(),S=C.firstChild,A=S.firstChild,N=A.nextSibling,R=N.firstChild,$=R.nextSibling;$.nextSibling;var F=S.nextSibling;return m(N,()=>u().length,$),F.addEventListener("change",U=>i(U.target.value)),X(()=>F.value=r()),C})(),T(G,{get when(){return u().length===0},get children(){var C=J0(),S=C.firstChild;return m(C,T(B,{name:"video_library",class:"text-5xl text-[var(--primary)] mb-3"}),S),C}}),(()=>{var C=X0();return m(C,T(Ye,{get each(){return u()},children:(S,A)=>(()=>{var N=sE(),R=N.firstChild,$=R.firstChild,F=$.nextSibling,U=F.firstChild,W=U.nextSibling,w=R.nextSibling;return m(N,T(G,{get when(){return r()==="order"},get children(){var v=iE(),y=v.firstChild,E=y.nextSibling,x=E.nextSibling;return y.$$click=()=>f(A(),-1),m(y,T(B,{name:"keyboard_arrow_up",class:"text-[18px]"})),m(E,()=>A()+1),x.$$click=()=>f(A(),1),m(x,T(B,{name:"keyboard_arrow_down",class:"text-[18px]"})),X(k=>{var b=`text-gray-500 hover:text-white ${A()===0?"opacity-20 pointer-events-none":""}`,le=`text-gray-500 hover:text-white ${A()===u().length-1?"opacity-20 pointer-events-none":""}`;return b!==k.e&&xe(y,k.e=b),le!==k.t&&xe(x,k.t=le),k},{e:void 0,t:void 0}),v}}),R),R.$$click=()=>n.openMovie(S.id),m(U,()=>S.title||S.name),m(W,()=>(S.release_date||S.first_air_date||"").split("-")[0]),w.$$click=()=>p(S),m(w,T(B,{name:"remove_circle",class:"text-[18px]"})),X(()=>Me($,"src",`https://image.tmdb.org/t/p/w200${S.poster_path}`)),N})()})),C})()]}}),null),m(_,T(G,{get when(){return ut(()=>!!s())()&&e()},get children(){return T(oE,{get uid(){return n.uid},get folderId(){return e()},get watchlist(){return n.watchlist},currentMovies:u,get showToast(){return n.showToast},onClose:()=>a(!1)})}}),null),_})()}Bt(["click","input"]);var lE=V('<img class="w-full h-full object-cover opacity-40">'),cE=V('<div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent pointer-events-none">'),uE=V('<button class="absolute inset-0 flex items-center justify-center z-10 group"><div class="w-14 h-14 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50 group-hover:scale-110 transition-transform shadow-lg">'),hE=V('<div class=mb-8><h3 class="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-3 px-1">Cast & Crew</h3><div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">'),dE=V('<div class="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-xl bg-[#0c0e14] rounded-3xl overflow-hidden border border-white/10 relative max-h-[90vh] shadow-2xl animate-pop-in flex flex-col"><button class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"></button><div class="overflow-y-auto hide-scrollbar w-full"><div class="relative h-48 md:h-64 bg-black"></div><div class="p-6 md:px-8 pb-28 -mt-16 relative z-10"><h2 class="text-3xl font-black drop-shadow-md mb-2"></h2><p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6"> • </p><p class="text-gray-400 text-sm mb-6 leading-relaxed"></p><div class="glass-surface p-5 rounded-2xl border border-white/5 space-y-3 mb-6"></div><button class="w-full bg-[var(--primary)] text-[#0c0e14] font-bold py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20"> Add to Vault'),fE=V('<iframe class="w-full h-full absolute inset-0 z-10"frameborder=0 allowfullscreen>'),pE=V('<div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]">'),gE=V('<div class="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-white/5">No Video Available'),vh=V('<span class="text-xs text-gray-300">'),mE=V('<span class="text-xs font-bold text-[var(--secondary)]">'),_E=V('<div class="flex flex-col items-center min-w-[70px] shrink-0"><img class="w-12 h-12 rounded-full object-cover border border-[var(--primary)] mb-2 bg-[#171921]"><p class="text-[9px] font-bold text-center text-white truncate w-full"></p><p class="text-[8px] text-[var(--primary)] font-bold text-center uppercase tracking-widest mt-0.5">'),vE=V('<div class="flex flex-col items-center min-w-[70px] shrink-0"><img class="w-12 h-12 rounded-full object-cover border border-white/10 mb-2 bg-[#171921]"><p class="text-[9px] font-bold text-center text-white truncate w-full"></p><p class="text-[8px] text-gray-500 text-center uppercase truncate w-full mt-0.5">'),yE=V('<div class="flex gap-2 overflow-x-auto hide-scrollbar mb-6 glass-surface p-2 rounded-2xl border border-white/5 shadow-inner">'),bE=V('<div class="text-center p-12 flex flex-col items-center gap-4 text-[var(--primary)] animate-pulse font-bold text-sm tracking-widest uppercase"> Scanning Radar...'),wE=V('<div class="pb-10 animate-fade-in"><h2 class="text-3xl font-headline font-black drop-shadow-md mb-6">Upcoming</h2><div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4 border border-white/5 shadow-lg"><button>Indian</button><button>International</button></div><div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4 border border-white/5 shadow-lg"><button>Movies</button><button>Series</button></div><div class="flex justify-center mb-8"><div class="glass-surface p-2 pr-6 rounded-[2rem] flex items-center gap-4 border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors shadow-xl relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent pointer-events-none"></div><div class="bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_var(--primary)] relative z-10"></div><div class="flex flex-col relative z-10"><span class="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Scan Radar From</span><input type=date class="bg-transparent border-none outline-none text-white font-black text-sm [color-scheme:dark] p-0 m-0 w-32">'),EE=V("<button>"),IE=V('<div class="space-y-6 relative before:absolute before:inset-0 before:ml-[38px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">'),TE=V('<div class="text-center p-12 glass-surface rounded-[2rem] text-gray-500 text-sm font-bold border border-white/5 flex flex-col items-center gap-3"> No releases found.'),xE=V('<img class="w-16 h-24 rounded-xl object-cover shadow-md bg-[#171921]">'),AE=V('<span class="text-[8px] bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max"> '),SE=V('<div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#08090b] border-4 border-[var(--primary)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_var(--primary)] z-10 ml-5 md:ml-0 overflow-hidden"><div class="flex flex-col items-center justify-center leading-none"><span class="text-[10px] font-black text-white"></span><span class="text-[7px] font-bold text-[var(--primary)] uppercase"></span></div></div><div class="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-surface p-3 rounded-[1.5rem] border border-white/5 hover:border-[var(--primary)]/50 transition-all shadow-lg flex gap-4 animate-pop-in"><div class="flex-1 flex flex-col justify-center py-1 min-w-0"><p class="font-bold text-sm text-gray-100 line-clamp-2 group-hover:text-[var(--primary)] transition-colors"></p><div class="flex items-center gap-2 mt-2">'),CE=V('<div class="w-16 h-24 bg-[#171921] rounded-xl flex items-center justify-center">'),RE=V('<span class="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max"> Theatrical');function kE(n){const[e,t]=Y(n.movie),[r,i]=Y(null),[s,a]=Y(!1),[l,u]=Y("");ln(()=>{document.body.style.overflow="hidden"}),cn(()=>{document.body.style.overflow=""}),$n(()=>{const f=n.movie.media_type||"movie";fetch(`https://api.themoviedb.org/3/${f}/${n.movie.id}?api_key=${Wt}&append_to_response=videos,credits,watch/providers`).then(p=>p.json()).then(p=>{t(p);const _=p.videos?p.videos.results:null;if(_){let S=_.find(A=>A.site==="YouTube"&&(A.type==="Trailer"||A.type==="Teaser"))||_.find(A=>A.site==="YouTube");S&&i(S.key)}const I=p["watch/providers"]?.results?.IN;let C=[];if(I){const S=[...I.flatrate||[],...I.free||[],...I.ads||[],...I.buy||[]];C=[...new Set(S.map(A=>kn(A.provider_name)))].filter(Boolean)}C.length===0&&p.networks&&(C=[...new Set(p.networks.map(S=>kn(S.name)))].filter(Boolean)),C.length>0&&u(C.join(", "))}).catch(()=>{})});const d=()=>e().runtime||e().episode_run_time?.[0]||0;return(()=>{var f=dE(),p=f.firstChild,_=p.firstChild,I=_.nextSibling,C=I.firstChild,S=C.nextSibling,A=S.firstChild,N=A.nextSibling,R=N.firstChild,$=N.nextSibling,F=$.nextSibling,U=F.nextSibling,W=U.firstChild;return We(f,"click",n.onClose),p.$$click=w=>w.stopPropagation(),We(_,"click",n.onClose),m(_,T(B,{name:"close",class:"text-sm text-white"})),m(C,T(G,{get when(){return!s()},get fallback(){return(()=>{var w=fE();return X(()=>Me(w,"src",`https://www.youtube.com/embed/${r()}?autoplay=1&rel=0`)),w})()},get children(){return[T(G,{get when(){return e().backdrop_path},get fallback(){return(()=>{var w=pE();return m(w,T(B,{name:"movie",class:"text-6xl"})),w})()},get children(){var w=lE();return X(()=>Me(w,"src",`https://image.tmdb.org/t/p/original${e().backdrop_path}`)),w}}),cE(),T(G,{get when(){return r()},get fallback(){return gE()},get children(){var w=uE(),v=w.firstChild;return w.$$click=()=>a(!0),m(v,T(B,{name:"play_arrow",fill:!0,class:"text-white text-3xl"})),w}})]}})),m(A,()=>e().title||e().name),m(N,()=>e().release_date||e().first_air_date,R),m(N,()=>n.movie.media_type==="tv"?"SERIES":"MOVIE",null),m(N,T(G,{get when(){return d()>0},get children(){return[" • ",ut(()=>Dl(d()))]}}),null),m($,()=>e().overview||"No overview available."),m(F,T(fn,{icon:"format_list_bulleted",label:"Genre",get value(){return(()=>{var w=vh();return m(w,()=>(e().genres||[]).map(v=>v.name).join(", ")||"N/A"),w})()}}),null),m(F,T(fn,{icon:"language",label:"Language",get value(){return(()=>{var w=vh();return m(w,()=>e().spoken_languages?.[0]?.english_name||(e().original_language?e().original_language.toUpperCase():"N/A")),w})()}}),null),m(F,T(G,{get when(){return l()},get children(){return T(fn,{icon:"connected_tv",label:"Platform",get value(){return(()=>{var w=mE();return m(w,l),w})()}})}}),null),m(S,T(G,{get when(){return e().credits||e().created_by},get children(){var w=hE(),v=w.firstChild,y=v.nextSibling;return m(y,T(G,{get when(){return e().credits?.crew?.find(E=>E.job==="Director")||e().created_by?.[0]},children:E=>{const x=E();return(()=>{var k=_E(),b=k.firstChild,le=b.nextSibling,J=le.nextSibling;return m(le,()=>x.name),m(J,()=>e().created_by?"Creator":"Director"),X(()=>Me(b,"src",x.profile_path?`https://image.tmdb.org/t/p/w200${x.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${x.name}&backgroundColor=171921`)),k})()}}),null),m(y,T(Ye,{get each(){return e().credits?.cast?.slice(0,5)},children:E=>(()=>{var x=vE(),k=x.firstChild,b=k.nextSibling,le=b.nextSibling;return m(b,()=>E.name),m(le,()=>E.character),X(()=>Me(k,"src",E.profile_path?`https://image.tmdb.org/t/p/w200${E.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${E.name}&backgroundColor=171921`)),x})()}),null),w}}),U),We(U,"click",n.onAdd),m(U,T(B,{name:"add_circle",fill:!0}),W),f})()}function $E(n){const[e,t]=Y("Indian"),[r,i]=Y("movie"),[s,a]=Y("all"),[l,u]=Y(new Date().toISOString().split("T")[0]),[d,f]=Y([]),[p,_]=Y(!1),[I,C]=Y(null);$n(()=>{_(!0);const A=new Date(l()),N=A.toISOString().split("T")[0];A.setDate(A.getDate()+30);const R=A.toISOString().split("T")[0];let $=`https://api.themoviedb.org/3/discover/movie?api_key=${Wt}&primary_release_date.gte=${N}&primary_release_date.lte=${R}&sort_by=popularity.desc`,F=`https://api.themoviedb.org/3/discover/tv?api_key=${Wt}&air_date.gte=${N}&air_date.lte=${R}&sort_by=popularity.desc&without_genres=10764,10767`;e()==="Indian"&&($+="&with_origin_country=IN",F+="&with_origin_country=IN",s()!=="all"&&($+=`&with_original_language=${s()}`,F+=`&with_original_language=${s()}`)),Promise.all([fetch($+"&page=1").then(U=>U.json()),fetch($+"&page=2").then(U=>U.json()),fetch(F+"&page=1").then(U=>U.json()),fetch(F+"&page=2").then(U=>U.json())]).then(async([U,W,w,v])=>{let y=[...U.results||[],...W.results||[]].map(j=>({...j,media_type:"movie",calc_date:j.release_date}));const x=[...w.results||[],...v.results||[]].slice(0,25).map(j=>fetch(`https://api.themoviedb.org/3/tv/${j.id}?api_key=${Wt}`).then(z=>z.json()).catch(()=>null));let b=(await Promise.all(x)).filter(Boolean).map(j=>{let z=j.next_episode_to_air,ee=z?z.air_date:j.first_air_date||N,Ee=!!z,he=z?`S${z.season_number} E${z.episode_number}`:"New Drop";return{...j,media_type:"tv",title:j.name,release_date:j.first_air_date,calc_date:ee,isReturning:Ee,epTag:he}});const le=new Set(n.watchlist().map(j=>String(j.id)));if(b=b.filter(j=>!j.isReturning||le.has(String(j.id))),e()==="International"){const j=z=>(z.origin_country||[]).includes("IN")||["hi","te","ta","ml","bn"].includes(z.original_language);y=y.filter(z=>!j(z)),b=b.filter(z=>!j(z))}let J=[...y,...b].filter(j=>j.calc_date&&j.poster_path);J.sort((j,z)=>new Date(j.calc_date)-new Date(z.calc_date));const O=[],q=new Set;for(const j of J)q.has(j.id)||(q.add(j.id),O.push(j));f(O),_(!1)}).catch(()=>_(!1))});const S=async A=>{if(n.watchlist().some(F=>String(F.id)===String(A.id)))return n.showToast("Already in vault!");const N=A.media_type==="tv"?"tv":"movie",$=await(await fetch(`https://api.themoviedb.org/3/${N}/${A.id}?api_key=${Wt}`)).json();await rs(St(tt,"users",n.uid,"watchlist",String(A.id)),{id:A.id,title:A.title||A.name,poster_path:A.poster_path,backdrop_path:A.backdrop_path,media_type:A.media_type,status:"Planned",addedAt:wl(),release_date:A.calc_date||"",region:e()==="Indian"?"Indian":"International",season:1,episode:0,totalEps:$.number_of_episodes||0,runtime:$.runtime||$.episode_run_time?.[0]||0}),n.showToast("Added to Vault"),C(null)};return(()=>{var A=wE(),N=A.firstChild,R=N.nextSibling,$=R.firstChild,F=$.nextSibling,U=R.nextSibling,W=U.firstChild,w=W.nextSibling,v=U.nextSibling,y=v.firstChild,E=y.firstChild,x=E.nextSibling,k=x.nextSibling,b=k.firstChild,le=b.nextSibling;return $.$$click=()=>{t("Indian"),a("all")},F.$$click=()=>{t("International"),a("all")},W.$$click=()=>i("movie"),w.$$click=()=>i("tv"),m(A,T(G,{get when(){return e()==="Indian"},get children(){var J=yE();return m(J,T(Ye,{each:["all","hi","te","ta","ml"],children:O=>(()=>{var q=EE();return q.$$click=()=>a(O),m(q,()=>O==="all"?"All":O.toUpperCase()),X(()=>xe(q,`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${s()===O?"bg-[var(--primary)]/20 text-[var(--primary)]":"text-gray-400 hover:text-white"}`)),q})()})),J}}),v),m(x,T(B,{name:"calendar_month",class:"text-[#0c0e14] text-xl"})),le.$$input=J=>u(J.target.value),m(A,T(G,{get when(){return p()},get fallback(){return T(G,{get when(){return d().filter(J=>J.media_type===r()).length>0},get fallback(){return(()=>{var J=TE(),O=J.firstChild;return m(J,T(B,{name:"event_busy",class:"text-4xl opacity-50"}),O),J})()},get children(){var J=IE();return m(J,T(Ye,{get each(){return d().filter(O=>O.media_type===r())},children:O=>{const q=new Date(O.calc_date).getDate(),j=new Date(O.calc_date).toLocaleString("default",{month:"short"});return(()=>{var z=SE(),ee=z.firstChild,Ee=ee.firstChild,he=Ee.firstChild,de=he.nextSibling,pe=ee.nextSibling,oe=pe.firstChild,Fe=oe.firstChild,Te=Fe.nextSibling;return z.$$click=()=>C(O),m(he,q),m(de,j),m(pe,T(G,{get when(){return O.poster_path},get fallback(){return(()=>{var re=CE();return m(re,T(B,{name:"movie",class:"text-gray-600"})),re})()},get children(){var re=xE();return X(()=>Me(re,"src",`https://image.tmdb.org/t/p/w200${O.poster_path}`)),re}}),oe),m(Fe,()=>O.title),m(Te,T(G,{get when(){return O.media_type==="tv"},get fallback(){return(()=>{var re=RE(),De=re.firstChild;return m(re,T(B,{name:"theaters",class:"text-[10px]"}),De),re})()},get children(){var re=AE(),De=re.firstChild;return m(re,T(B,{name:"tv",class:"text-[10px]"}),De),m(re,()=>O.epTag||"Series Drop",null),re}})),z})()}})),J}})},get children(){var J=bE(),O=J.firstChild;return m(J,T(B,{name:"radar",class:"text-5xl animate-spin"}),O),J}}),null),m(A,T(G,{get when(){return I()},get children(){return T(kE,{get movie(){return I()},onClose:()=>C(null),onAdd:()=>S(I())})}}),null),X(J=>{var O=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${e()==="Indian"?"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,q=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${e()==="International"?"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,j=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${r()==="movie"?"bg-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`,z=`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${r()==="tv"?"bg-[var(--primary)] text-[#0c0e14] shadow-md":"text-gray-400 hover:text-white"}`;return O!==J.e&&xe($,J.e=O),q!==J.t&&xe(F,J.t=q),j!==J.a&&xe(W,J.a=j),z!==J.o&&xe(w,J.o=z),J},{e:void 0,t:void 0,a:void 0,o:void 0}),X(()=>le.value=l()),A})()}Bt(["click","input"]);var PE=V('<div class="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6 animate-pulse"><div class="flex justify-between items-center mb-2"><span class="text-[9px] font-black uppercase text-[var(--primary)] tracking-widest flex items-center gap-1"> Scanning Network</span><span class="text-[10px] font-bold text-white"> / </span></div><div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3"><div class="h-full bg-[var(--primary)] transition-all duration-300"></div></div><p class="text-[10px] text-gray-500 font-bold truncate">'),NE=V('<div class="bg-green-500/10 border border-green-500/30 p-3 rounded-xl mb-6 text-[10px] font-black text-green-400 tracking-widest uppercase flex items-center gap-2"> '),DE=V('<div class="bg-black/50 p-4 rounded-2xl border border-white/5 mt-2 animate-fade-in"><div class="flex justify-between items-center mb-2"><span class="text-[9px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1"> </span><span class="text-[10px] font-bold text-white"> / </span></div><div class="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3"><div class="h-full bg-[var(--primary)] transition-all duration-300"></div></div><div class="flex gap-4 text-[10px] font-bold tracking-wide"><span class=text-green-400>Success: </span><span class=text-red-400>Skipped: '),VE=V('<div class="mt-4 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl animate-fade-in"><div class="flex justify-between items-center border-b border-red-500/20 pb-2 mb-2"><span class="text-[10px] font-black uppercase text-red-400 tracking-widest flex items-center gap-1"> Skipped Log</span><button class="text-[8px] font-black uppercase bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-colors">Clear Log</button></div><div class="max-h-24 overflow-y-auto hide-scrollbar space-y-1">'),OE=V('<div class="animate-fade-in max-w-3xl mx-auto pb-10"><div class="flex items-center gap-3 mb-8 px-2"><div class="w-10 h-10 bg-[var(--primary)]/20 rounded-full flex items-center justify-center border border-[var(--primary)]/50"></div><div><h2 class="text-3xl font-headline font-black drop-shadow-md">Data Center</h2><p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Maintenance & Backups</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between"><div class="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[50px] rounded-full pointer-events-none"></div><div><h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"> Vault Repair Engine</h3><p class="text-xs text-gray-400 leading-relaxed mb-6">Runs a deep background scan across all saved titles. Fetches missing streaming platforms, genres, and episodes from external APIs. Your personal edits remain 100% untouched.</p></div><button></button></div><div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-start"><div><h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"> Local Backup & Restore</h3><p class="text-xs text-gray-400 leading-relaxed mb-6">Export your cinematic universe to a JSON file, or restore from a previous backup. Duplicate entries are automatically skipped.</p></div><div class="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4"><div class="flex items-center gap-4"><div><h4 class="text-xs font-black text-white">Vault Size</h4><p class="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-widest"> Titles</p></div></div></div><div class="grid grid-cols-2 gap-3 mb-2"><button class="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"> Export</button><input type=file accept=.json class=hidden><button> '),ME=V('<div class="text-[9px] flex justify-between text-gray-300 border-b border-red-500/10 pb-1 mb-1 last:border-0"><span class="truncate pr-2 font-bold w-1/2"></span><span class="text-red-400/80 truncate w-1/2 text-right">');const LE="QQQ2oiV5GK9fIM0sjEfgHwMTjGtusEYSy6I8TIfp";function FE(n){const[e,t]=Y(!1),[r,i]=Y({current:0,total:0,pct:0}),[s,a]=Y(""),[l,u]=Y(!1),[d,f]=Y({total:0,success:0,skipped:0}),[p,_]=Y([]);let I;const C=async()=>{if(!confirm(`Start Deep Scan?
This will check and update missing streaming platforms and genres for all your saved movies. Your personal edits remain 100% untouched.`))return;t(!0);const N=n.watchlist(),R=N.length;let $=0;for(let F=0;F<R;F++){const U=N[F];a(`Scanning: ${U.title||U.name}...`),i({current:F+1,total:R,pct:Math.round((F+1)/R*100)});try{let W=[],w=U.genresList||[],v=U.totalEps||0;const y=await fetch(`https://api.themoviedb.org/3/${U.media_type||"movie"}/${U.id}?api_key=${Wt}&append_to_response=watch/providers`);if(y.ok){const J=await y.json();J.genres&&J.genres.forEach(q=>{w.includes(q.name)||w.push(q.name)}),J.number_of_episodes&&(v=J.number_of_episodes);const O=J["watch/providers"]?.results?.IN||J["watch/providers"]?.results?.US;O&&[...O.flatrate||[],...O.free||[],...O.ads||[]].forEach(j=>W.push(j.provider_name))}const E=U.media_type==="tv"?"tv":"movie",x=await fetch(`https://api.watchmode.com/v1/title/${E}-${U.id}/sources/?apiKey=${LE}&regions=IN,US`);if(x.ok){const J=await x.json();Array.isArray(J)&&J.forEach(O=>{(O.type==="sub"||O.type==="free")&&W.push(O.name)})}const k=U.platformsList||[];let b=new Set([...k]);W.forEach(J=>{const O=kn(J);O&&b.add(O)});const le=Array.from(b);(le.length>k.length||w.length>(U.genresList?.length||0)||v!==U.totalEps)&&(await Er(St(tt,"users",n.uid,"watchlist",String(U.id)),{platformsList:le,genresList:w,totalEps:v}),$++)}catch{console.log("Error syncing:",U.id)}await new Promise(W=>setTimeout(W,300))}t(!1),a(`Scan Complete! 🚀 Successfully updated ${$} titles.`),n.showToast(`Vault Repaired! ${$} items synced.`)},S=()=>{const N="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(n.watchlist())),R=document.createElement("a");R.setAttribute("href",N),R.setAttribute("download",`Cinelog_Vault_Backup_${new Date().toLocaleDateString()}.json`),document.body.appendChild(R),R.click(),R.remove(),n.showToast("Backup Downloaded!")},A=async N=>{const R=N.target.files[0];if(!R)return;const $=new FileReader;$.onload=async F=>{try{const U=JSON.parse(F.target.result);if(!Array.isArray(U))throw new Error("Invalid format. Expected an array.");u(!0),f({total:U.length,success:0,skipped:0}),_([]);const W=new Set(n.watchlist().map(w=>String(w.id)));for(let w=0;w<U.length;w++){const v=U[w];try{if(!v.id)throw new Error("Missing ID in object");if(W.has(String(v.id)))throw new Error("Already exists in Vault");await rs(St(tt,"users",n.uid,"watchlist",String(v.id)),v),W.add(String(v.id)),f(y=>({...y,success:y.success+1}))}catch(y){f(E=>({...E,skipped:E.skipped+1})),_(E=>[...E,{title:v.title||v.name||"Unknown Item",reason:y.message}])}}u(!1),n.showToast("Import Finished!"),I&&(I.value="")}catch{u(!1),n.showToast("Failed to parse file. Is it a valid JSON?")}},$.readAsText(R)};return(()=>{var N=OE(),R=N.firstChild,$=R.firstChild,F=R.nextSibling,U=F.firstChild,W=U.firstChild,w=W.nextSibling,v=w.firstChild,y=v.firstChild,E=w.nextSibling,x=U.nextSibling,k=x.firstChild,b=k.firstChild,le=b.firstChild,J=k.nextSibling,O=J.firstChild,q=O.firstChild,j=q.firstChild,z=j.nextSibling,ee=z.firstChild,Ee=J.nextSibling,he=Ee.firstChild,de=he.firstChild,pe=he.nextSibling,oe=pe.nextSibling,Fe=oe.firstChild;m($,T(B,{name:"sync",class:"text-[var(--primary)]"})),m(v,T(B,{name:"build_circle",class:"text-[var(--primary)]"}),y),m(U,T(G,{get when(){return e()},get children(){var re=PE(),De=re.firstChild,Re=De.firstChild,Ne=Re.firstChild,je=Re.nextSibling,Pt=je.firstChild,pt=De.nextSibling,Nt=pt.firstChild,Dt=pt.nextSibling;return m(Re,T(B,{name:"radar",class:"text-[12px] animate-spin"}),Ne),m(je,()=>r().current,Pt),m(je,()=>r().total,null),m(Dt,s),X(qt=>nn(Nt,"width",`${r().pct}%`)),re}}),E),m(U,T(G,{get when(){return ut(()=>!e())()&&s().includes("Complete")},get children(){var re=NE(),De=re.firstChild;return m(re,T(B,{name:"check_circle",class:"text-[14px]"}),De),m(re,s,null),re}}),E),E.$$click=C,m(E,()=>e()?"Sync in Progress...":"Start Deep Scan"),m(b,T(B,{name:"download",class:"text-[var(--secondary)]"}),le),m(O,T(B,{name:"folder_zip",class:"text-3xl text-gray-500"}),q),m(z,()=>n.watchlist().length,ee),he.$$click=S,m(he,T(B,{name:"file_download",class:"text-[14px]"}),de),pe.addEventListener("change",A);var Te=I;return typeof Te=="function"?oa(Te,pe):I=pe,oe.$$click=()=>I.click(),m(oe,T(B,{get name(){return l()?"hourglass_empty":"file_upload"},class:"text-[14px]"}),Fe),m(oe,()=>l()?"Wait...":"Import",null),m(x,T(G,{get when(){return l()||d().total>0},get children(){var re=DE(),De=re.firstChild,Re=De.firstChild,Ne=Re.firstChild,je=Re.nextSibling,Pt=je.firstChild,pt=De.nextSibling,Nt=pt.firstChild,Dt=pt.nextSibling,qt=Dt.firstChild;qt.firstChild;var En=qt.nextSibling;return En.firstChild,m(Re,T(B,{get name(){return l()?"cloud_sync":"cloud_done"},class:"text-[12px]"}),Ne),m(Re,()=>l()?"Importing...":"Complete",null),m(je,()=>d().success+d().skipped,Pt),m(je,()=>d().total,null),m(qt,()=>d().success,null),m(En,()=>d().skipped,null),X(Fn=>nn(Nt,"width",`${(d().success+d().skipped)/Math.max(d().total,1)*100}%`)),re}}),null),m(x,T(G,{get when(){return p().length>0},get children(){var re=VE(),De=re.firstChild,Re=De.firstChild,Ne=Re.firstChild,je=Re.nextSibling,Pt=De.nextSibling;return m(Re,T(B,{name:"error",class:"text-[14px]"}),Ne),je.$$click=()=>{_([]),f({total:0,success:0,skipped:0})},m(Pt,T(Ye,{get each(){return p()},children:pt=>(()=>{var Nt=ME(),Dt=Nt.firstChild,qt=Dt.nextSibling;return m(Dt,()=>pt.title),m(qt,()=>pt.reason),Nt})()})),re}}),null),X(re=>{var De=e(),Re=`w-full font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-transform shadow-lg flex items-center justify-center gap-2 ${e()?"bg-gray-800 text-gray-500 cursor-not-allowed":"bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] hover:scale-[1.02] active:scale-95 shadow-[var(--primary)]/20"}`,Ne=l(),je=`font-black py-3 rounded-xl text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 border border-transparent ${l()?"bg-gray-800 text-gray-500 cursor-not-allowed":"bg-white/5 hover:bg-white/10 text-[var(--primary)] border hover:border-[var(--primary)]/50 active:scale-95"}`;return De!==re.e&&(E.disabled=re.e=De),Re!==re.t&&xe(E,re.t=Re),Ne!==re.a&&(oe.disabled=re.a=Ne),je!==re.o&&xe(oe,re.o=je),re},{e:void 0,t:void 0,a:void 0,o:void 0}),N})()}Bt(["click"]);var UE=V('<img class="w-full h-full object-cover opacity-40 blur-3xl scale-125">'),jE=V('<img class="w-full h-full object-cover opacity-60">'),BE=V('<div class="absolute inset-0 bg-gradient-to-t from-[#08090b]/90 via-[#08090b]/40 to-transparent pointer-events-none">'),qE=V('<button class="absolute inset-0 flex items-center justify-center z-10 group"><div class="w-16 h-16 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50 group-hover:scale-110 active:scale-95 transition-transform shadow-2xl">'),GE=V("<button>"),zE=V('<div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Season</label><input type=number class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Episode</label><input type=number class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]">'),HE=V('<div class="glass-surface p-6 rounded-2xl space-y-4 animate-fade-in border border-[var(--primary)]/30 mt-4 shadow-lg shadow-[var(--primary)]/10"><div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Status</label><select class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"><option value=Planned>Planned</option><option value=Watching>Watching</option><option value=Completed>Completed</option></select></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Personal Rating</label><input type=number step=0.1 min=0 max=10 class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Watch Date</label><input type=date class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white [color-scheme:dark] outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Region</label><select class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"><option>International</option><option>Indian</option></select></div></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Custom Tag</label><input placeholder="e.g. Theatre"class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)] placeholder-gray-700"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Available Platforms</label><div class="flex flex-wrap gap-2 p-3 bg-[#0c0e14] border border-white/5 rounded-xl"></div></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">Genres (Comma separated)</label><input class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)]"></div><div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block tracking-widest">My Notes</label><textarea class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl text-sm text-white outline-none focus:border-[var(--primary)] placeholder-gray-700"rows=3 placeholder="Write your thoughts..."></textarea></div><button class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest mt-2 active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20">Save Universe Changes'),WE=V('<div class="w-full max-w-xl bg-[#08090b]/80 backdrop-blur-3xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 relative max-h-[95vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-pop-in flex flex-col"><button class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"></button><div class="overflow-y-auto hide-scrollbar w-full"><div class="h-56 md:h-72 relative bg-black shrink-0"></div><div class="px-6 md:px-8 pb-28 -mt-16 relative z-10"><div class="flex justify-between items-start mb-2"><div class=pr-2><h2 class="text-3xl font-black drop-shadow-md leading-tight"></h2><p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1"> • </p></div></div><div class="grid grid-cols-3 gap-2 my-5 w-full"><div class="bg-black/40 backdrop-blur-md border border-white/10 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class="text-xs font-black text-white"></span></div><span class="text-[7px] font-black text-gray-500 uppercase tracking-widest">IMDb</span></div><div class="bg-black/40 backdrop-blur-md border border-white/10 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class=text-[10px]>🍅</span><span class="text-xs font-black text-white"></span></div><span class="text-[7px] font-black text-gray-500 uppercase tracking-widest">RT</span></div><div class="bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/20 py-2 rounded-xl flex flex-col items-center justify-center text-center shadow-md"><div class="flex items-center gap-1 mb-0.5"><span class="text-xs font-black text-[var(--primary)]"></span></div><span class="text-[7px] font-black text-[var(--primary)] uppercase tracking-widest opacity-70">Sage'),KE=V('<div class="fixed inset-0 bg-black z-[10000000] flex flex-col animate-fade-in"><div class="p-4 flex justify-between items-center bg-[#0c0e14] border-b border-white/5 shadow-xl"><div class="flex items-center gap-3 overflow-hidden pr-2 flex-1"><button type=button class="p-2 bg-white/5 hover:bg-white/10 rounded-full active:scale-95 transition-all shrink-0"></button><h3 class="font-bold text-sm text-white truncate max-w-[150px]"></h3></div><div class="flex gap-2 shrink-0"><div class="relative bg-white/5 border border-white/10 rounded-xl px-2 py-1.5 flex items-center gap-1 hover:bg-white/10 transition-colors"><select class="bg-transparent text-[10px] font-black uppercase tracking-widest text-[var(--primary)] outline-none appearance-none cursor-pointer pr-4 pl-1"></select></div></div></div><div class="flex-1 bg-black w-full h-full relative"><div class="absolute inset-0 flex flex-col gap-3 items-center justify-center pointer-events-none opacity-50"><p class="text-[10px] uppercase font-black tracking-widest text-[var(--primary)]">Connecting to Node...</p></div><iframe class="w-full h-full border-none relative z-10"allowfullscreen>'),QE=V('<div class="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"><div class="absolute inset-0 bg-[#08090b] overflow-hidden pointer-events-none"><div class="absolute inset-0 bg-black/60">'),YE=V('<iframe class="w-full h-full absolute inset-0 z-10"frameborder=0 allowfullscreen>'),JE=V('<div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]">'),XE=V('<div class="mb-6 bg-black/40 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/5 shadow-inner"><div class="flex justify-between items-center mb-3 px-1"><span class="text-[9px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-1.5"> Streaming Node</span></div><div class="flex flex-wrap gap-2 pb-2 px-1"></div><button type=button class="w-full mt-3 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl uppercase text-[11px] tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20"> Watch Now'),ZE=V('<button class="w-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 rounded-xl py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary)] hover:text-[#0c0e14] active:scale-95 transition-all">+1 Episode'),eI=V('<div class="glass-surface p-5 rounded-2xl border border-white/5 mb-6"><div class="flex justify-between items-center mb-3"><span class="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"> Tracker</span><span class="font-black text-sm text-white"></span></div><div class="w-full h-2 bg-black rounded-full overflow-hidden mb-4"><div class="h-full bg-[var(--primary)] transition-all shadow-[0_0_10px_var(--primary)]">'),tI=V('<div class=mb-8><h3 class="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Cast & Crew</h3><div class="flex gap-5 overflow-x-auto hide-scrollbar pb-2">'),nI=V('<div class="border-t border-white/5 pt-3 mt-3"><p class="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1 flex items-center gap-1"> Notes</p><p class="text-sm text-gray-300 italic">"<!>"'),rI=V('<button class="w-full mt-6 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2"> Add to My Universe'),iI=V('<div class="mt-8 flex justify-end"><button class="text-red-500/50 hover:text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors mx-auto active:scale-95"> Remove from Universe'),sI=V('<div class=animate-fade-in><p class="text-gray-400 text-sm mb-6 leading-relaxed italic border-l-2 border-[var(--primary)]/30 pl-3">"<!>"</p><div class="glass-surface p-5 rounded-2xl space-y-4 border border-white/5">'),oI=V("<button type=button> "),aI=V('<div class="flex flex-col items-center min-w-[75px] shrink-0"><img class="w-16 h-16 rounded-full object-cover border border-white/10 mb-2 shadow-lg bg-[#171921]"><p class="text-[9px] font-black text-center text-white truncate w-full"></p><p class="text-[7px] text-gray-500 text-center uppercase truncate w-full font-bold mt-0.5">'),lI=V('<div class="flex flex-col items-center min-w-[75px] shrink-0"><img class="w-16 h-16 rounded-full object-cover border border-[var(--secondary)] mb-2 shadow-lg bg-[#171921]"><p class="text-[9px] font-black text-center text-white truncate w-full"></p><p class="text-[7px] text-[var(--secondary)] text-center uppercase font-black tracking-widest mt-0.5">'),cI=V('<span class="text-[var(--primary)] font-black uppercase text-[10px] tracking-widest">'),yh=V('<span class="text-xs text-gray-300">'),uI=V('<div class="flex flex-wrap gap-2 mt-1">'),hI=V('<span class="text-xs font-bold text-gray-500">-'),dI=V('<img class="w-4 h-4 rounded-full object-cover bg-black border border-white/10">'),fI=V('<a target=_blank rel="noopener noreferrer"class="flex items-center gap-1.5 bg-white/5 hover:bg-[var(--primary)]/20 border border-white/10 hover:border-[var(--primary)]/50 px-2.5 py-1.5 rounded-lg transition-all group shadow-sm"><span class="text-[9px] font-black text-gray-300 group-hover:text-white uppercase tracking-widest">'),pI=V('<div class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-inner">'),gI=V('<span class="text-[9px] font-black uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/20">'),mI=V('<span class="text-xs font-bold text-white">'),_I=V("<button type=button>"),vI=V('<option class="bg-[#0c0e14] text-white">');const bh=[{id:"vidzee",name:"VidZee (Fast)",icon:"smart_display"},{id:"vidlink",name:"VidLink",icon:"play_circle"},{id:"vidsrcru",name:"Vidsrc.ru",icon:"dns"},{id:"embedsu",name:"Embed.su",icon:"stream"},{id:"vidsrccc",name:"Vidsrc.cc",icon:"dynamic_feed"},{id:"autoembed",name:"AutoEmbed",icon:"bolt"}],wh=(n,e)=>{const t=encodeURIComponent(n||""),r=e?e.toLowerCase().replace(/[^a-z0-9]/g,""):"";return{netflix:{name:"Netflix",logo:"https://image.tmdb.org/t/p/w92/t2yyOv40HZeVlLjVrCsPhIdZfC4.jpg",url:`https://www.netflix.com/search?q=${t}`},amazonprimevideo:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},primevideo:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},amazon:{name:"Amazon Prime Video",logo:"https://image.tmdb.org/t/p/w92/5NyLm42TmCqCMOZFvH4fvn2FI11.jpg",url:`https://www.primevideo.com/search/ref=atv_sr_sug_sc?phrase=${t}`},jiohotstar:{name:"JioHotstar",logo:"https://image.tmdb.org/t/p/w92/uzKjVDmQIA2rZGSNpGbnWXUWVQIM.jpg",url:`https://www.hotstar.com/in/explore?searchQuery=${t}`},hotstar:{name:"JioHotstar",logo:"https://image.tmdb.org/t/p/w92/uzKjVDmQIA2rZGSNpGbnWXUWVQIM.jpg",url:`https://www.hotstar.com/in/explore?searchQuery=${t}`},sonyliv:{name:"Sony LIV",logo:"https://image.tmdb.org/t/p/w92/8N0DNa4BO3lH24KWv1EjJh4TxGL.jpg",url:"https://www.sonyliv.com/"},zee5:{name:"Zee5",logo:"https://image.tmdb.org/t/p/w92/5vVzg0rtZAwQGzQoT2Zk0n43Nym.jpg",url:`https://www.zee5.com/global/search?q=${t}`},appletv:{name:"Apple TV",logo:"https://image.tmdb.org/t/p/w92/2E0ficP6ijhlCSJuwHI4isW0QhD.jpg",url:"https://tv.apple.com/"},crunchyroll:{name:"Crunchyroll",logo:"https://image.tmdb.org/t/p/w92/mXeC4TrcgdU6j81XreWIjA6k7yC.jpg",url:`https://www.crunchyroll.com/search?q=${t}`},youtube:{name:"YouTube",logo:"https://image.tmdb.org/t/p/w92/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",url:`https://www.youtube.com/results?search_query=${t}`}}[r]||null},yI=n=>{const e=n.toLowerCase();if(e.includes("vi "))return"#ed1c24";if(e.includes("aha"))return"#ff6600";if(e.includes("hoichoi"))return"#e50b14";if(e.includes("sun"))return"#f09a36";if(e.includes("voot"))return"#5a2282";if(e.includes("mx"))return"#003366";if(e.includes("ullu"))return"#00b0b8";if(e.includes("alt"))return"#e30f1d";if(e.includes("eros"))return"#ff0000";if(e.includes("apple"))return"#ffffff";if(e.includes("discovery"))return"#001e61";let t=0;for(let r=0;r<n.length;r++)t=n.charCodeAt(r)+((t<<5)-t);return`hsl(${Math.abs(t)%360}, 70%, 45%)`};function bI(n){const e=Le(()=>typeof n.id=="string"&&n.id.startsWith("PREVIEW_")),t=Le(()=>{if(!e())return null;try{return JSON.parse(n.id.replace("PREVIEW_",""))}catch{return null}}),r=Le(()=>e()?t():n.watchlist.find(O=>String(O.id)===String(n.id))),[i,s]=Y({}),[a,l]=Y(!1),[u,d]=Y(null),[f,p]=Y(!1),[_,I]=Y(!1),[C,S]=Y("vidzee"),[A,N]=Y({imdb:"-",rt:"-"}),[R,$]=Y({status:"",rating:"",watchDate:"",notes:"",region:"",season:1,episode:1,tag:"",platforms:"",genres:""}),[F,U]=Y([]),W="QQQ2oiV5GK9fIM0sjEfgHwMTjGtusEYSy6I8TIfp",w=O=>{if(O.origin==="https://player.vidzee.wtf"&&O.data?.type==="MEDIA_DATA"){const q=O.data.data;localStorage.setItem("vidZeeProgress",JSON.stringify(q))}};ln(()=>{document.body.style.overflow="hidden",window.addEventListener("message",w)}),cn(()=>{document.body.style.overflow="",window.removeEventListener("message",w)});const v=Le(()=>[...new Set(n.watchlist.flatMap(O=>Gi(O)))].filter(Boolean).sort());$n(()=>{if(r()){e()||$({status:r().status||"Planned",rating:r().rating||"",watchDate:typeof r().watchDate=="string"?r().watchDate:"",notes:typeof r().notes=="string"?r().notes:"",region:r().region||"International",season:r().season||1,episode:r().episode||1,tag:r().tag||"",platforms:Gi(r()).join(", "),genres:Qr(r()).join(", ")}),fetch(`https://api.themoviedb.org/3/${r().media_type||"movie"}/${r().id}?api_key=${Wt}&append_to_response=videos,credits`).then(j=>j.json()).then(j=>{s(j);const z=j?.videos?.results;if(z){let ee=z.find(Ee=>Ee.site==="YouTube"&&Ee.type==="Trailer")||z.find(Ee=>Ee.site==="YouTube"&&Ee.type==="Teaser")||z.find(Ee=>Ee.site==="YouTube");ee&&d(ee.key)}if(!e()&&j.genres&&j.genres.length>0){const ee=j.genres.map(he=>he.name).join(", ");Qr(r()).join(", ")||$(he=>({...he,genres:ee}))}});const O=r().title||r().name;fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(O)}&apikey=${v0}`).then(j=>j.json()).then(j=>{if(j.Response==="True"){const z=j.Ratings?.find(ee=>ee.Source==="Rotten Tomatoes")?.Value||"-";N({imdb:j.imdbRating||"-",rt:z}),e()||Er(St(tt,"users",n.uid,"watchlist",String(r().id)),{imdbRating:j.imdbRating||"-",rtRating:z.replace("%","")})}}),(async()=>{let j=[];try{const de=r().media_type==="tv"?"tv":"movie",oe=await(await fetch(`https://api.watchmode.com/v1/title/${de}-${r().id}/sources/?apiKey=${W}&regions=IN,US`)).json();if(Array.isArray(oe)&&oe.length>0){const Fe=new Set;for(let Te of oe)!Fe.has(Te.name)&&(Te.type==="sub"||Te.type==="free")&&(Fe.add(Te.name),j.push({name:Te.name,logo:Te.logo_100px,url:Te.web_url}))}}catch{}if(j.length===0)try{const pe=await(await fetch(`https://api.themoviedb.org/3/${r().media_type||"movie"}/${r().id}/watch/providers?api_key=${Wt}`)).json(),oe=pe.results?.IN||pe.results?.US;oe&&(oe.flatrate||oe.free||oe.ads)&&(j=[...oe.flatrate||[],...oe.free||[],...oe.ads||[]].map(Te=>{const re=kn(Te.provider_name),Re=wh(O,re)?.url||pe.results?.IN?.link||`https://www.justwatch.com/in/search?q=${encodeURIComponent(O)}`;return{name:Te.provider_name,logo:`https://image.tmdb.org/t/p/w92${Te.logo_path}`,url:Re}}))}catch{}let z=[];const ee=new Set;j.forEach(de=>{const pe=kn(de.name);pe&&!ee.has(pe)&&(ee.add(pe),z.push({...de,name:pe}))});const Ee=r().platformsList||[],he=z.map(de=>de.name);if(Ee.forEach(de=>{const pe=kn(de);if(!he.includes(pe)){const oe=wh(O,pe);oe?z.push({name:oe.name,logo:oe.logo,url:oe.url}):z.push({name:pe,isCss:!0,color:yI(pe),url:`https://www.google.com/search?q=Watch+${encodeURIComponent(O)}+on+${encodeURIComponent(pe)}`}),he.push(pe)}}),U(z),!e()&&he.filter(pe=>!Ee.includes(pe)).length>0){const pe=[...new Set([...Ee,...he])];await Er(St(tt,"users",n.uid,"watchlist",String(r().id)),{platformsList:pe})}})()}});const y=O=>{let q=R().platforms.split(",").map(j=>j.trim()).filter(Boolean);q.includes(O)?q=q.filter(j=>j!==O):q.push(O),$({...R(),platforms:q.join(", ")})},E=async()=>{await Er(St(tt,"users",n.uid,"watchlist",String(r().id)),{status:R().status,rating:parseFloat(R().rating)||0,watchDate:R().watchDate,notes:R().notes,region:R().region,season:parseInt(R().season)||1,episode:parseInt(R().episode)||1,tag:R().tag,genresList:R().genres.split(",").map(O=>O.trim()).filter(Boolean),platformsList:R().platforms.split(",").map(O=>kn(O.trim())).filter(Boolean)}),n.showToast("Saved"),l(!1)},x=Le(()=>!e()&&r()?.status==="Completed"),k=Le(()=>x()?100:Math.min((r()?.episode||0)/(r()?.totalEps||1)*100,100)),b=Le(()=>n.franchises?.filter(O=>r()?.franchises?.[O.id]!==void 0).map(O=>O.name).join(", ")),le=async()=>{const O=r();if(n.watchlist.some(q=>String(q.id)===String(O.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const q=i().credits?.cast?.slice(0,5).map(ee=>ee.name)||[],j=i().credits?.crew?.find(ee=>ee.job==="Director")?.name||"",z=[...q,j].filter(Boolean);await rs(St(tt,"users",n.uid,"watchlist",String(O.id)),{id:String(O.id),title:O.title||O.name,media_type:O.media_type||"movie",poster_path:O.poster_path,backdrop_path:O.backdrop_path,release_date:O.release_date||O.first_air_date||"",status:"Planned",addedAt:new Date,castList:z}),n.showToast("Added to Vault! 🍿"),n.onClose()}catch{n.showToast("Error adding to vault.")}},J=O=>{const q=r().id,j=r().season||1,z=r().episode||1,ee=r().media_type==="tv"?"tv":"movie";switch(O){case"vidzee":return ee==="tv"?`https://player.vidzee.wtf/embed/tv/${q}/${j}/${z}`:`https://player.vidzee.wtf/embed/movie/${q}`;case"vidlink":return ee==="tv"?`https://vidlink.pro/tv/${q}/${j}/${z}?primaryColor=b1a1ff&autoplay=false`:`https://vidlink.pro/movie/${q}?primaryColor=b1a1ff&autoplay=false`;case"vidsrcru":return ee==="tv"?`https://vidsrc.ru/tv/${q}/${j}/${z}?autoplay=true&colour=b1a1ff&autonextepisode=true&backbutton=https://vidsrc.ru/&logo=https://vidsrc.ru/logo.png`:`https://vidsrc.ru/movie/${q}?autoplay=true&colour=b1a1ff&backbutton=https://vidsrc.ru/&logo=https://vidsrc.ru/logo.png`;case"embedsu":return ee==="tv"?`https://embed.su/embed/tv/${q}/${j}/${z}`:`https://embed.su/embed/movie/${q}`;case"vidsrccc":return ee==="tv"?`https://vidsrc.cc/v2/embed/tv/${q}/${j}/${z}`:`https://vidsrc.cc/v2/embed/movie/${q}`;case"autoembed":return ee==="tv"?`https://autoembed.co/tv/tmdb/${q}-${j}-${z}`:`https://autoembed.co/movie/tmdb/${q}`;default:return""}};return(()=>{var O=QE(),q=O.firstChild,j=q.firstChild;return We(O,"click",n.onClose),m(q,T(G,{get when(){return r()?.backdrop_path},get children(){var z=UE();return X(()=>Me(z,"src",`https://image.tmdb.org/t/p/w500${r().backdrop_path}`)),z}}),j),m(O,T(G,{get when(){return r()},get children(){var z=WE(),ee=z.firstChild,Ee=ee.nextSibling,he=Ee.firstChild,de=he.nextSibling,pe=de.firstChild,oe=pe.firstChild,Fe=oe.firstChild,Te=Fe.nextSibling,re=Te.firstChild,De=pe.nextSibling,Re=De.firstChild,Ne=Re.firstChild,je=Ne.firstChild,Pt=Re.nextSibling,pt=Pt.firstChild,Nt=pt.firstChild,Dt=Nt.nextSibling,qt=Pt.nextSibling,En=qt.firstChild,Fn=En.firstChild;return z.$$click=me=>me.stopPropagation(),We(ee,"click",n.onClose),m(ee,T(B,{name:"close",class:"text-sm text-white"})),m(he,T(G,{get when(){return!f()},get fallback(){return(()=>{var me=YE();return X(()=>Me(me,"src",`https://www.youtube.com/embed/${u()}?autoplay=1&rel=0`)),me})()},get children(){return[T(G,{get when(){return r().backdrop_path},get fallback(){return(()=>{var me=JE();return m(me,T(B,{name:"movie",class:"text-6xl"})),me})()},get children(){var me=jE();return X(()=>Me(me,"src",`https://image.tmdb.org/t/p/original${r().backdrop_path}`)),me}}),BE(),T(G,{get when(){return u()},get children(){var me=qE(),Vt=me.firstChild;return me.$$click=()=>p(!0),m(Vt,T(B,{name:"play_arrow",fill:!0,class:"text-white text-4xl"})),me}})]}})),m(Fe,()=>r().title||r().name),m(Te,()=>r().release_date||i().release_date||"N/A",re),m(Te,()=>r().media_type==="tv"?"SERIES":"MOVIE",null),m(Te,T(G,{get when(){return i().runtime||i().episode_run_time?.[0]},get children(){return[" • ",ut(()=>Dl(i().runtime||i().episode_run_time?.[0]))]}}),null),m(pe,T(G,{get when(){return!e()},get children(){var me=GE();return me.$$click=()=>l(!a()),m(me,T(B,{get name(){return a()?"check":"edit"},class:"text-sm"})),X(()=>xe(me,`p-2.5 rounded-full border transition-colors shrink-0 ${a()?"bg-[var(--primary)] text-[#0c0e14] border-[var(--primary)]":"glass-surface text-gray-400 hover:text-white"}`)),me}}),null),m(Ne,T(B,{name:"star",fill:!0,class:"text-[10px] text-[#f5c518]"}),je),m(je,()=>A().imdb),m(Dt,()=>A().rt),m(En,T(B,{name:"person",fill:!0,class:"text-[10px] text-[var(--primary)]"}),Fn),m(Fn,(()=>{var me=ut(()=>!!r().rating);return()=>me()?`${r().rating}/10`:"-"})()),m(de,T(G,{get when(){return a()},get fallback(){return(()=>{var me=sI(),Vt=me.firstChild,In=Vt.firstChild,un=In.nextSibling;un.nextSibling;var ct=Vt.nextSibling;return m(me,T(G,{get when(){return!e()},get children(){var ce=XE(),ie=ce.firstChild,ge=ie.firstChild,we=ge.firstChild,ke=ie.nextSibling,Ve=ke.nextSibling,rt=Ve.firstChild;return m(ge,T(B,{name:"router",class:"text-[12px] text-[var(--primary)]"}),we),m(ke,T(Ye,{each:bh,children:Se=>(()=>{var bt=oI(),Gt=bt.firstChild;return bt.$$click=Kt=>{Kt.stopPropagation(),S(Se.id)},m(bt,T(B,{get name(){return Se.icon},class:"text-[14px]"}),Gt),m(bt,()=>Se.name,null),X(()=>xe(bt,`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm ${C()===Se.id?"border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] scale-105":"border-white/5 bg-white/5 text-gray-500 hover:text-white"}`)),bt})()})),Ve.$$click=Se=>{Se.preventDefault(),Se.stopPropagation(),I(!0)},m(Ve,T(B,{name:"play_circle",fill:!0,class:"text-[18px]"}),rt),ce}}),Vt),m(Vt,()=>i().overview||(typeof r().overview=="string"?r().overview:"No overview available."),un),m(me,T(G,{get when(){return ut(()=>!e())()&&r().media_type==="tv"},get children(){var ce=eI(),ie=ce.firstChild,ge=ie.firstChild,we=ge.firstChild,ke=ge.nextSibling,Ve=ie.nextSibling,rt=Ve.firstChild;return m(ge,T(B,{name:"video_library",class:"text-[14px] text-[var(--primary)]"}),we),m(ke,(()=>{var Se=ut(()=>!!x());return()=>Se()?"Completed":`S${r().season||1} E${r().episode||1}`})()),m(ce,T(G,{get when(){return!x()},get children(){var Se=ZE();return Se.$$click=async()=>{let bt=(parseInt(r().episode)||1)+1,Gt=r().status==="Planned"?"Watching":r().status;r().totalEps>0&&bt>=r().totalEps&&(Gt="Completed",n.showToast("Completed! 🎉")),await Er(St(tt,"users",n.uid,"watchlist",String(r().id)),{episode:bt,status:Gt})},Se}}),null),X(Se=>nn(rt,"width",`${k()}%`)),ce}}),ct),m(me,T(G,{get when(){return i().credits},get children(){var ce=tI(),ie=ce.firstChild,ge=ie.nextSibling;return m(ge,T(Ye,{get each(){return i().credits.cast.slice(0,8)},children:we=>(()=>{var ke=aI(),Ve=ke.firstChild,rt=Ve.nextSibling,Se=rt.nextSibling;return m(rt,()=>we.name),m(Se,()=>we.character),X(()=>Me(Ve,"src",we.profile_path?`https://image.tmdb.org/t/p/w200${we.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${we.name}&backgroundColor=171921`)),ke})()}),null),m(ge,T(Ye,{get each(){return i().credits.crew.filter(we=>we.job==="Director"||we.job==="Producer").slice(0,3)},children:we=>(()=>{var ke=lI(),Ve=ke.firstChild,rt=Ve.nextSibling,Se=rt.nextSibling;return m(rt,()=>we.name),m(Se,()=>we.job),X(()=>Me(Ve,"src",we.profile_path?`https://image.tmdb.org/t/p/w200${we.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${we.name}&backgroundColor=171921`)),ke})()}),null),ce}}),ct),m(ct,T(G,{get when(){return!e()},get children(){return T(fn,{icon:"adjust",label:"Status",get value(){return(()=>{var ce=cI();return m(ce,()=>r().status||"Planned"),ce})()}})}}),null),m(ct,T(G,{get when(){return!e()},get children(){return T(fn,{icon:"calendar_today",label:"Watch Date",get value(){return(()=>{var ce=yh();return m(ce,()=>r().watchDate||"Not set"),ce})()}})}}),null),m(ct,T(G,{get when(){return!e()},get children(){return T(fn,{icon:"public",label:"Region",get value(){return r().region||"International"}})}}),null),m(ct,T(fn,{icon:"format_list_bulleted",label:"Genre",get value(){return(()=>{var ce=yh();return m(ce,(()=>{var ie=ut(()=>!!i().genres);return()=>ie()?i().genres.map(ge=>ge.name).join(", "):Qr(r()).join(", ")||"N/A"})()),ce})()}}),null),m(ct,T(fn,{icon:"connected_tv",label:"Available On",get value(){return T(G,{get when(){return F().length>0},get fallback(){return hI()},get children(){var ce=uI();return m(ce,T(Ye,{get each(){return F().slice(0,5)},children:ie=>(()=>{var ge=fI(),we=ge.firstChild;return m(ge,T(G,{get when(){return!ie.isCss},get fallback(){return(()=>{var ke=pI();return m(ke,()=>ie.name.charAt(0).toUpperCase()),X(Ve=>{var rt=ie.color,Se=ie.color==="#ffffff"?"#000":"#fff";return rt!==Ve.e&&nn(ke,"background-color",Ve.e=rt),Se!==Ve.t&&nn(ke,"color",Ve.t=Se),Ve},{e:void 0,t:void 0}),ke})()},get children(){var ke=dI();return X(()=>Me(ke,"src",ie.logo)),ke}}),we),m(we,()=>ie.name),X(()=>Me(ge,"href",ie.url)),ge})()})),ce}})}}),null),m(ct,T(G,{get when(){return ut(()=>!e())()&&r().tag},get children(){return T(fn,{icon:"label",label:"Tag",get value(){return(()=>{var ce=gI();return m(ce,()=>r().tag),ce})()}})}}),null),m(ct,T(G,{get when(){return ut(()=>!e())()&&b()},get children(){return T(fn,{icon:"folder_special",label:"Lists",get value(){return(()=>{var ce=mI();return m(ce,b),ce})()}})}}),null),m(ct,T(G,{get when(){return ut(()=>!!(!e()&&r().notes))()&&typeof r().notes=="string"},get children(){var ce=nI(),ie=ce.firstChild,ge=ie.firstChild,we=ie.nextSibling,ke=we.firstChild,Ve=ke.nextSibling;return Ve.nextSibling,m(ie,T(B,{name:"edit_note",class:"text-[14px]"}),ge),m(we,()=>r().notes,Ve),ce}}),null),m(me,T(G,{get when(){return e()},get children(){var ce=rI(),ie=ce.firstChild;return ce.$$click=le,m(ce,T(B,{name:"add_circle",class:"text-lg"}),ie),ce}}),null),m(me,T(G,{get when(){return!e()},get children(){var ce=iI(),ie=ce.firstChild,ge=ie.firstChild;return ie.$$click=async()=>{confirm("Permanently delete?")&&(await If(St(tt,"users",n.uid,"watchlist",String(r().id))),n.showToast("Deleted"),n.onClose())},m(ie,T(B,{name:"delete",class:"text-sm"}),ge),ce}}),null),me})()},get children(){var me=HE(),Vt=me.firstChild,In=Vt.firstChild,un=In.firstChild,ct=un.nextSibling,ce=In.nextSibling,ie=ce.firstChild,ge=ie.nextSibling,we=Vt.nextSibling,ke=we.firstChild,Ve=ke.firstChild,rt=Ve.nextSibling,Se=ke.nextSibling,bt=Se.firstChild,Gt=bt.nextSibling,Kt=we.nextSibling,Vr=Kt.firstChild,pr=Vr.nextSibling,hn=Kt.nextSibling,Un=hn.firstChild,jn=Un.nextSibling,Qt=hn.nextSibling,gr=Qt.firstChild,Tn=gr.nextSibling,Lt=Qt.nextSibling,Z=Lt.firstChild,Be=Z.nextSibling,dt=Lt.nextSibling;return ct.addEventListener("change",_e=>$({...R(),status:_e.target.value})),ge.addEventListener("change",_e=>$({...R(),rating:_e.target.value})),m(me,T(G,{get when(){return r().media_type==="tv"},get children(){var _e=zE(),Je=_e.firstChild,te=Je.firstChild,$e=te.nextSibling,Xe=Je.nextSibling,ze=Xe.firstChild,wt=ze.nextSibling;return $e.$$input=Ze=>$({...R(),season:Ze.target.value}),wt.$$input=Ze=>$({...R(),episode:Ze.target.value}),X(()=>$e.value=R().season),X(()=>wt.value=R().episode),_e}}),we),rt.$$input=_e=>$({...R(),watchDate:_e.target.value}),Gt.addEventListener("change",_e=>$({...R(),region:_e.target.value})),pr.$$input=_e=>$({...R(),tag:_e.target.value}),m(jn,T(Ye,{get each(){return v()},children:_e=>(()=>{var Je=_I();return Je.$$click=()=>y(_e),m(Je,_e),X(()=>xe(Je,`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors shadow-sm active:scale-95 ${R().platforms.split(",").map(te=>te.trim()).includes(_e)?"bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14]":"bg-white/5 text-gray-400 hover:text-white border border-white/5"}`)),Je})()})),Tn.$$input=_e=>$({...R(),genres:_e.target.value}),Be.$$input=_e=>$({...R(),notes:_e.target.value}),dt.$$click=E,X(()=>ct.value=R().status),X(()=>ge.value=R().rating),X(()=>rt.value=R().watchDate),X(()=>Gt.value=R().region),X(()=>pr.value=R().tag),X(()=>Tn.value=R().genres||(i().genres?i().genres.map(_e=>_e.name).join(", "):"")),X(()=>Be.value=R().notes),me}}),null),z}}),null),m(O,T(G,{get when(){return _()},get children(){var z=KE(),ee=z.firstChild,Ee=ee.firstChild,he=Ee.firstChild,de=he.nextSibling,pe=Ee.nextSibling,oe=pe.firstChild,Fe=oe.firstChild,Te=ee.nextSibling,re=Te.firstChild,De=re.firstChild,Re=re.nextSibling;return z.$$click=Ne=>Ne.stopPropagation(),he.$$click=Ne=>{Ne.stopPropagation(),I(!1)},m(he,T(B,{name:"arrow_back",class:"text-sm"})),m(de,()=>r().title||r().name),m(oe,T(B,{name:"router",class:"text-gray-400 text-[14px]"}),Fe),Fe.addEventListener("change",Ne=>{Ne.stopPropagation(),S(Ne.target.value)}),m(Fe,T(Ye,{each:bh,children:Ne=>(()=>{var je=vI();return m(je,()=>Ne.name),X(()=>je.value=Ne.id),je})()})),m(oe,T(B,{name:"expand_more",class:"text-gray-400 text-[14px] absolute right-1 pointer-events-none"}),null),m(re,T(B,{name:"dns",class:"text-[var(--primary)] text-4xl animate-pulse"}),De),X(()=>Me(Re,"src",J(C()))),X(()=>Fe.value=C()),z}}),null),O})()}Bt(["click","input"]);var wI=V('<div class="flex gap-4 p-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0"><img class="w-28 h-40 object-cover rounded-xl shadow-lg border border-white/10 shrink-0"><div class="flex-1 overflow-hidden"><h2 class="text-2xl font-black text-white truncate"></h2><p class="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest mt-1 mb-2"> • </p><div class="h-20 overflow-y-auto hide-scrollbar text-xs text-gray-400 leading-relaxed pr-2">'),EI=V('<div class="flex flex-wrap justify-between items-center p-4 bg-[#0c0e14] border-b border-white/5 gap-3 shrink-0"><div class="flex bg-black/50 p-1 rounded-xl border border-white/5"><button>Movies</button><button>TV Shows</button></div><div class="flex items-center gap-2 bg-black/50 border border-white/5 rounded-xl px-3 py-1.5"><select class="bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none cursor-pointer"><option value=popularity class=bg-[#0c0e14]>Most Popular</option><option value=release_desc class=bg-[#0c0e14]>Release (New → Old)</option><option value=release_asc class=bg-[#0c0e14]>Release (Old → New)'),II=V('<div class="text-center p-10 text-gray-500 font-bold text-sm">No items found.'),TI=V('<div class="flex-1 overflow-y-auto p-4 hide-scrollbar"><div class="grid grid-cols-3 sm:grid-cols-4 gap-4">'),xI=V('<div class="flex-1 flex items-center justify-center">'),AI=V('<div class="fixed inset-0 z-[9999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"><div class="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none"></div><div class="w-full max-w-3xl bg-[#08090b] sm:rounded-[2rem] rounded-t-[2rem] border border-white/10 relative h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-pop-in"><button class="absolute top-4 right-4 z-50 bg-black/50 p-2.5 rounded-full hover:bg-black border border-white/10 active:scale-95 transition-all">'),SI=V('<button class="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--primary)] hover:text-[#0c0e14] hover:border-[var(--primary)] transition-all active:scale-95 z-10 text-white shadow-lg">'),CI=V('<div class="absolute top-2 right-2 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-[#0c0e14] shadow-lg z-10">'),RI=V('<div class="relative group cursor-pointer animate-fade-in"><img class="w-full aspect-[2/3] object-cover rounded-xl shadow-lg border border-white/10 group-hover:border-[var(--primary)] transition-all"><div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent rounded-xl flex flex-col justify-end p-2 pointer-events-none"><p class="text-[9px] font-black text-white truncate leading-tight"></p><p class="text-[8px] text-[var(--primary)] font-bold">');function kI(n){const[e,t]=Y(null),[r,i]=Y({cast:[],crew:[]}),[s,a]=Y("movie"),[l,u]=Y("popularity");ln(()=>document.body.style.overflow="hidden"),cn(()=>document.body.style.overflow=""),$n(()=>{n.personId&&fetch(`https://api.themoviedb.org/3/person/${n.personId}?api_key=${Wt}&append_to_response=combined_credits`).then(p=>p.json()).then(p=>{t(p),i(p.combined_credits||{cast:[],crew:[]})})});const d=Le(()=>{if(!e())return[];let I=(e().known_for_department==="Directing"?r().crew.filter(A=>A.job==="Director"):r().cast).filter(A=>A.media_type===s());const C=[],S=new Set;return I.forEach(A=>{S.has(A.id)||(S.add(A.id),C.push(A))}),C.sort((A,N)=>{if(l()==="popularity")return N.popularity-A.popularity;const R=new Date(A.release_date||A.first_air_date||"1900-01-01").getTime(),$=new Date(N.release_date||N.first_air_date||"1900-01-01").getTime();return l()==="release_desc"?$-R:R-$})}),f=async(p,_)=>{if(_.stopPropagation(),n.watchlist.some(I=>String(I.id)===String(p.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const I=await(await fetch(`https://api.themoviedb.org/3/${p.media_type}/${p.id}?api_key=${Wt}&append_to_response=credits`)).json(),C=I.credits?.cast?.slice(0,5).map(N=>N.name)||[],S=I.credits?.crew?.find(N=>N.job==="Director")?.name||"",A=[...C,S].filter(Boolean);await rs(St(tt,"users",n.uid,"watchlist",String(p.id)),{id:String(p.id),title:p.title||p.name,media_type:p.media_type,poster_path:p.poster_path,backdrop_path:p.backdrop_path,release_date:p.release_date||p.first_air_date||"",status:"Planned",addedAt:new Date,castList:A}),n.showToast("Added Successfully! 🍿")}catch{n.showToast("Error adding to vault.")}};return(()=>{var p=AI(),_=p.firstChild,I=_.nextSibling,C=I.firstChild;return We(p,"click",n.onClose),I.$$click=S=>S.stopPropagation(),We(C,"click",n.onClose),m(C,T(B,{name:"close",class:"text-sm text-white"})),m(I,T(G,{get when(){return e()},get children(){return[(()=>{var S=wI(),A=S.firstChild,N=A.nextSibling,R=N.firstChild,$=R.nextSibling,F=$.firstChild,U=$.nextSibling;return m(R,()=>e().name),m($,()=>e().known_for_department,F),m($,()=>e().birthday||"Unknown",null),m($,(()=>{var W=ut(()=>!!e().deathday);return()=>W()?` → ${e().deathday}`:""})(),null),m(U,()=>e().biography||"No biography available."),X(()=>Me(A,"src",e().profile_path?`https://image.tmdb.org/t/p/w300${e().profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(e().name)}&backgroundColor=171921`)),S})(),(()=>{var S=EI(),A=S.firstChild,N=A.firstChild,R=N.nextSibling,$=A.nextSibling,F=$.firstChild;return N.$$click=()=>a("movie"),R.$$click=()=>a("tv"),m($,T(B,{name:"sort",class:"text-gray-500 text-[14px]"}),F),F.addEventListener("change",U=>u(U.target.value)),X(U=>{var W=`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${s()==="movie"?"bg-[var(--primary)] text-[#0c0e14]":"text-gray-500 hover:text-white"}`,w=`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${s()==="tv"?"bg-[var(--primary)] text-[#0c0e14]":"text-gray-500 hover:text-white"}`;return W!==U.e&&xe(N,U.e=W),w!==U.t&&xe(R,U.t=w),U},{e:void 0,t:void 0}),X(()=>F.value=l()),S})(),(()=>{var S=TI(),A=S.firstChild;return m(A,T(Ye,{get each(){return d()},children:N=>{const R=n.watchlist.some($=>String($.id)===String(N.id));return(()=>{var $=RI(),F=$.firstChild,U=F.nextSibling,W=U.firstChild,w=W.nextSibling;return $.$$click=()=>n.openPreview(N,"fromPerson"),m(W,()=>N.title||N.name),m(w,()=>(N.release_date||N.first_air_date||"").substring(0,4)),m($,T(G,{when:!R,get children(){var v=SI();return v.$$click=y=>f(N,y),m(v,T(B,{name:"add",class:"text-sm"})),v}}),null),m($,T(G,{when:R,get children(){var v=CI();return m(v,T(B,{name:"check",class:"text-sm"})),v}}),null),X(()=>Me(F,"src",N.poster_path?`https://image.tmdb.org/t/p/w342${N.poster_path}`:"https://via.placeholder.com/342x513/171921/b1a1ff?text=No+Poster")),$})()}})),m(S,T(G,{get when(){return d().length===0},get children(){return II()}}),null),S})()]}}),null),m(I,T(G,{get when(){return!e()},get children(){var S=xI();return m(S,T(B,{name:"radar",class:"text-[var(--primary)] text-5xl animate-spin opacity-50"})),S}}),null),p})()}Bt(["click"]);var $I=V('<button class="text-gray-500 hover:text-white active:scale-95">'),PI=V('<div class="flex flex-col items-center justify-center p-12 gap-4 opacity-50"><p class="text-[10px] uppercase font-black tracking-widest text-[var(--primary)]">Scanning Database...'),NI=V('<div class="text-center p-12 text-gray-500"><p class="text-sm font-bold">No results found in this universe.'),DI=V('<div class="fixed inset-0 bg-black/70 backdrop-blur-md p-4 pt-16 sm:pt-24 z-[999999] flex justify-center items-start animate-fade-in"><div class="w-full max-w-2xl mx-auto glass-surface rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col max-h-[75vh] border border-white/10 animate-pop-in bg-[#08090b]/95"><div class="p-5 border-b border-white/5 flex gap-4 items-center bg-gradient-to-b from-white/5 to-transparent"><input autofocus placeholder="Search movies, series, actors..."class="bg-transparent border-none w-full outline-none text-white text-xl font-medium placeholder-gray-600"><button class="bg-white/10 p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all ml-2"></button></div><div class="overflow-y-auto p-3 hide-scrollbar relative"><div class=space-y-2>'),VI=V('<div class="flex items-center gap-4 p-3 glass-surface rounded-[1.5rem] border border-transparent hover:border-[var(--primary)]/30 hover:bg-white/5 transition-all cursor-pointer group shadow-sm"><img class="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-[var(--primary)] shrink-0"><div class="flex-1 min-w-0"><p class="font-black text-base text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-1"></p><p class="text-[9px] text-[var(--primary)] uppercase font-black tracking-widest mt-0.5">'),OI=V('<img class="w-14 h-20 rounded-xl object-cover shadow-md bg-[#171921] shrink-0">'),MI=V('<div><div class="flex flex-col justify-center flex-1 py-1 min-w-0"><p class="font-black text-base text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-1"></p><div class="flex items-center gap-2 mt-1.5"><span class="text-[8px] bg-white/10 text-gray-300 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-white/5"></span><span class="text-[10px] text-gray-500 font-bold"></span></div></div><div class="self-center pr-2 shrink-0"><button>'),LI=V('<div class="w-14 h-20 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 bg-[#171921] shrink-0">');function FI(n){const[e,t]=Y(""),[r,i]=Y([]),[s,a]=Y(!1),[l,u]=Y(null);ln(()=>{document.body.style.overflow="hidden"}),cn(()=>{document.body.style.overflow=""}),$n(()=>{const p=e();if(p.length<2)return i([]);a(!0);const _=setTimeout(async()=>{try{const C=await(await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Wt}&query=${encodeURIComponent(p)}`)).json();i((C.results||[]).filter(S=>S.media_type==="movie"||S.media_type==="tv"||S.media_type==="person"))}catch{}a(!1)},500);return()=>clearTimeout(_)});const d=async(p,_)=>{if(_&&_.stopPropagation(),n.watchlist.some(I=>String(I.id)===String(p.id)))return n.showToast("Already in Vault! 🍿");n.showToast("Adding to Vault...");try{const C=await(await fetch(`https://api.themoviedb.org/3/${p.media_type}/${p.id}?api_key=${Wt}&append_to_response=watch/providers,credits`)).json(),S=C.credits?.cast?.slice(0,5).map(R=>R.name)||[],A=C.credits?.crew?.find(R=>R.job==="Director")?.name||"",N=[...S,A].filter(Boolean);await rs(St(tt,"users",n.uid,"watchlist",String(p.id)),{id:p.id,title:p.title||p.name||"",poster_path:p.poster_path,backdrop_path:p.backdrop_path,media_type:p.media_type,status:"Planned",addedAt:wl(),castList:N,platformsList:[...new Set((C["watch/providers"]?.results?.IN?.flatrate||[]).map(R=>kn(R.provider_name)))].filter(Boolean).slice(0,3),genresList:(C.genres||[]).map(R=>R.name),release_date:p.release_date||p.first_air_date||"",region:C.origin_country?.includes("IN")?"Indian":"International",season:1,episode:0,totalEps:C.number_of_episodes||0,runtime:C.runtime||C.episode_run_time?.[0]||0}),n.showToast("Added to Vault! 🍿"),n.onClose()}catch{n.showToast("Error adding to vault.")}},f=p=>{u(null),setTimeout(()=>n.openPreview(p,"fromPerson"),50)};return(()=>{var p=DI(),_=p.firstChild,I=_.firstChild,C=I.firstChild,S=C.nextSibling,A=I.nextSibling,N=A.firstChild;return We(p,"click",n.onClose),_.$$click=R=>R.stopPropagation(),m(I,T(B,{name:"search",class:"text-[var(--primary)] text-2xl"}),C),C.$$input=R=>t(R.target.value),m(I,T(G,{get when(){return e().length>0},get children(){var R=$I();return R.$$click=()=>t(""),m(R,T(B,{name:"backspace",class:"text-sm"})),R}}),S),We(S,"click",n.onClose),m(S,T(B,{name:"close",class:"text-white text-sm"})),m(A,T(G,{get when(){return s()},get children(){var R=PI(),$=R.firstChild;return m(R,T(B,{name:"radar",class:"text-[var(--primary)] text-5xl animate-spin"}),$),R}}),N),m(A,T(G,{get when(){return ut(()=>!s()&&e().length>=2)()&&r().length===0},get children(){var R=NI(),$=R.firstChild;return m(R,T(B,{name:"sentiment_dissatisfied",class:"text-5xl mb-3 opacity-30"}),$),R}}),N),m(N,T(Ye,{get each(){return r()},children:R=>{if(R.media_type==="person")return(()=>{var F=VI(),U=F.firstChild,W=U.nextSibling,w=W.firstChild,v=w.nextSibling;return F.$$click=()=>u(R.id),m(w,()=>R.name),m(v,()=>R.known_for_department==="Directing"?"[DIRECTOR]":"[ACTOR]"),m(F,T(B,{name:"chevron_right",class:"text-gray-500 group-hover:text-[var(--primary)] shrink-0"}),null),X(()=>Me(U,"src",R.profile_path?`https://image.tmdb.org/t/p/w92${R.profile_path}`:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(R.name)}&backgroundColor=171921`)),F})();const $=n.watchlist.some(F=>String(F.id)===String(R.id));return(()=>{var F=MI(),U=F.firstChild,W=U.firstChild,w=W.nextSibling,v=w.firstChild,y=v.nextSibling,E=U.nextSibling,x=E.firstChild;return F.$$click=()=>!$&&n.openPreview(R),xe(F,`flex gap-4 p-3 glass-surface rounded-[1.5rem] border border-transparent hover:border-[var(--primary)]/30 hover:bg-white/5 transition-all ${$?"opacity-60":"cursor-pointer"} group shadow-sm`),m(F,T(G,{get when(){return R.poster_path},get fallback(){return(()=>{var k=LI();return m(k,T(B,{name:"movie",class:"text-gray-600"})),k})()},get children(){var k=OI();return X(()=>Me(k,"src",`https://image.tmdb.org/t/p/w200${R.poster_path}`)),k}}),U),m(W,()=>R.title||R.name),m(v,()=>R.media_type==="tv"?"Series":"Movie"),m(y,()=>(R.release_date||R.first_air_date||"").split("-")[0]),x.$$click=k=>d(R,k),x.disabled=$,xe(x,`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${$?"bg-[var(--primary)] text-[#08090b]":"bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[#08090b]"}`),m(x,T(B,{name:$?"check":"add",class:"text-xl font-black"})),F})()}})),m(p,T(G,{get when(){return l()},get children(){return T(kI,{get personId(){return l()},get uid(){return n.uid},get watchlist(){return n.watchlist},get showToast(){return n.showToast},onClose:()=>u(null),openPreview:f})}}),null),X(()=>C.value=e()),p})()}Bt(["click","input"]);var UI=V('<button><div class="w-6 h-6 rounded-full shadow-lg"></div><span class=font-bold>'),jI=V('<div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[999999]"><div class="glass-surface w-full max-w-sm rounded-3xl p-6 border border-white/10 animate-pop-in"><div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-lg flex items-center gap-2"> Themes</h3><button></button></div><div class="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">'),BI=V('<div class="fixed inset-0 bg-black/98 flex items-center justify-center p-4 z-[9999999] animate-pop-in"><div class="bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[#0c0e14] w-full max-w-sm h-[500px] rounded-[3rem] p-10 text-center flex flex-col justify-between shadow-2xl relative overflow-hidden"><div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div><div class="mt-4 relative z-10"><h4 class="text-white/80 font-bold uppercase text-[10px] mb-3 tracking-widest">My Cinelog Wrapped</h4><h2 class="text-4xl font-black font-headline text-white mb-8 leading-tight">I spent <br><span class="text-[#0c0e14] bg-white px-3 py-1 mt-2 inline-block rounded-lg shadow-lg"> Days</span><br> in another universe.</h2><div class="space-y-4 text-left bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10"><div><p class="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Masterpieces Finished</p><p class="text-2xl font-black text-white"> Titles</p></div><div><p class="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Favorite Vibe</p><p class="text-2xl font-black text-[var(--secondary)]"></p></div></div></div><button class="text-white bg-black/30 p-4 rounded-full mx-auto hover:bg-black transition-colors active:scale-95 relative z-10">'),qI=V('<div class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[999999] animate-fade-in"><div class="w-full max-w-lg bg-[#08090b]/95 rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative animate-pop-in overflow-hidden"><div class="absolute -top-20 -right-20 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[80px] pointer-events-none"></div><div class="flex justify-between items-center mb-8 relative z-10"><h2 class="text-3xl font-headline font-black text-white drop-shadow-md">Insights</h2><button class="bg-white/5 p-3 rounded-full hover:bg-white/10 active:scale-95 transition-all"></button></div><div class="flex justify-center mb-10 relative z-10"><div class="relative w-48 h-48 flex items-center justify-center rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0c0e14]"><svg class="absolute inset-0 w-full h-full -rotate-90 rounded-full"viewBox="0 0 100 100"><circle cx=50 cy=50 r=45 fill=none stroke=rgba(255,255,255,0.05) stroke-width=8 stroke-dasharray=283 stroke-dashoffset=0></circle><circle cx=50 cy=50 r=45 fill=none stroke=var(--primary) stroke-width=8 stroke-linecap=round stroke-dasharray=283 stroke-dashoffset=60 class=drop-shadow-[0_0_10px_var(--primary)]></circle></svg><div class=text-center><p class="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-widest">Watch Time</p><span class="text-5xl font-black font-headline text-white"><span class="text-sm text-gray-400 ml-1">d</span></span><div class="text-xl font-bold text-[var(--secondary)] mt-1"><span class="text-[10px] uppercase text-gray-500 ml-1">hrs</span></div></div></div></div><button class="w-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest mb-8 shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2 active:scale-95 transition-transform relative z-10"> Open Wrapped</button><div class="glass-surface rounded-[1.5rem] p-6 border border-white/5 relative z-10"><h3 class="font-bold mb-5 flex items-center gap-2 text-white"> Favorite Vibes</h3><div class=space-y-4>'),GI=V('<div><div class="flex justify-between text-[10px] font-black uppercase mb-1.5 text-gray-400 tracking-widest"><span></span><span class=text-gray-500> titles</span></div><div class="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div class="h-full bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]">');const zI=n=>(()=>{var e=UI(),t=e.firstChild,r=t.nextSibling;return e.$$click=()=>{n.set(n.id),n.onClose()},m(r,()=>n.name),X(i=>{var s=`w-full p-4 rounded-xl border ${n.curr===n.id?"border-[var(--primary)] bg-[var(--primary)]/10":"border-white/5 hover:bg-white/5"} flex gap-4 items-center transition-colors`,a=n.hex;return s!==i.e&&xe(e,i.e=s),a!==i.t&&nn(t,"background",i.t=a),i},{e:void 0,t:void 0}),e})();function HI(n){ln(()=>document.body.style.overflow="hidden"),cn(()=>document.body.style.overflow="");const e=[{id:"sage",n:"Sage",h:"#b1a1ff"},{id:"matrix",n:"Matrix",h:"#00ff41"},{id:"netflix",n:"Netflix",h:"#e50914"},{id:"cyberpunk",n:"Cyberpunk",h:"#fce205"},{id:"interstellar",n:"Interstellar",h:"#38bdf8"},{id:"neonhorizon",n:"Neon Horizon",h:"#f472b6"},{id:"vibranium",n:"Vibranium",h:"#7c3aed"}];return(()=>{var t=jI(),r=t.firstChild,i=r.firstChild,s=i.firstChild,a=s.firstChild,l=s.nextSibling,u=i.nextSibling;return We(t,"click",n.onClose),r.$$click=d=>d.stopPropagation(),m(s,T(B,{name:"palette",class:"text-[var(--primary)]"}),a),We(l,"click",n.onClose),m(l,T(B,{name:"close",class:"text-gray-500 hover:text-white"})),m(u,T(Ye,{each:e,children:d=>T(zI,{get id(){return d.id},get name(){return d.n},get hex(){return d.h},get curr(){return n.currentTheme},get set(){return n.setTheme},get onClose(){return n.onClose}})})),t})()}function WI(n){const[e,t]=Y(!1);ln(()=>{document.body.style.overflow="hidden"}),cn(()=>{document.body.style.overflow=""});const r=Le(()=>{let i=0;const s={},a={},l=n.watchlist().filter(f=>f.status==="Completed");l.forEach(f=>{i+=(parseInt(f.runtime)||0)*(f.media_type==="tv"&&parseInt(f.episode)||1),Qr(f).forEach(p=>s[p]=(s[p]||0)+1),Gi(f).forEach(p=>a[p]=(a[p]||0)+1)});const u=Object.entries(s).sort((f,p)=>p[1]-f[1]).slice(0,5),d=Object.entries(a).sort((f,p)=>p[1]-f[1]).slice(0,5);return{days:Math.floor(i/1440),hours:Math.floor(i%1440/60),total:l.length,topGenre:u[0]?.[0]||"N/A",topG:u,topP:d,maxG:u[0]?.[1]||1,maxP:d[0]?.[1]||1}});return(()=>{var i=qI(),s=i.firstChild,a=s.firstChild,l=a.nextSibling,u=l.firstChild,d=u.nextSibling,f=l.nextSibling,p=f.firstChild,_=p.firstChild,I=_.nextSibling,C=I.firstChild,S=C.nextSibling,A=S.firstChild,N=S.nextSibling,R=N.firstChild,$=f.nextSibling,F=$.firstChild,U=$.nextSibling,W=U.firstChild,w=W.firstChild,v=W.nextSibling;return We(i,"click",n.onClose),s.$$click=y=>y.stopPropagation(),We(d,"click",n.onClose),m(d,T(B,{name:"close",class:"text-white"})),m(S,()=>r().days,A),m(N,()=>r().hours,R),$.$$click=()=>t(!0),m($,T(B,{name:"auto_awesome"}),F),m(W,T(B,{name:"pie_chart",class:"text-[var(--primary)]"}),w),m(v,T(Ye,{get each(){return r().topG},children:([y,E])=>(()=>{var x=GI(),k=x.firstChild,b=k.firstChild,le=b.nextSibling,J=le.firstChild,O=k.nextSibling,q=O.firstChild;return m(b,y),m(le,E,J),X(j=>nn(q,"width",`${E/r().maxG*100}%`)),x})()})),m(i,T(G,{get when(){return e()},get children(){var y=BI(),E=y.firstChild,x=E.firstChild,k=x.nextSibling,b=k.firstChild,le=b.nextSibling,J=le.firstChild,O=J.nextSibling,q=O.nextSibling,j=q.firstChild,z=le.nextSibling,ee=z.firstChild,Ee=ee.firstChild,he=Ee.nextSibling,de=he.firstChild,pe=ee.nextSibling,oe=pe.firstChild,Fe=oe.nextSibling,Te=k.nextSibling;return y.$$click=()=>t(!1),E.$$click=re=>re.stopPropagation(),m(q,()=>r().days,j),m(he,()=>r().total,de),m(Fe,()=>r().topGenre),Te.$$click=()=>t(!1),m(Te,T(B,{name:"close"})),y}}),null),i})()}Bt(["click"]);var KI=V('<div class="fixed inset-0 z-[90]">'),QI=V('<div class="fixed top-16 right-6 w-48 glass-surface rounded-2xl shadow-2xl py-2 z-[100] animate-pop-in border border-white/10 overflow-hidden"><button class="w-full text-left px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-white/5 flex items-center gap-3"> Insights</button><div class="border-t border-white/5 my-1"></div><button class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"> Data Sync</button><button class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"> Logout</button><div class="border-t border-white/5 my-1"></div><button class="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3"> Nuke Vault'),YI=V('<div class="fixed bottom-28 left-1/2 -translate-x-1/2 glass-surface border border-[var(--primary)] text-white px-6 py-3 rounded-full shadow-2xl z-[999999] flex gap-2 items-center text-sm font-bold whitespace-nowrap animate-pop-in"> '),JI=V('<div class="h-screen flex flex-col items-center justify-center p-10 text-center"><h2 class="text-xl font-bold text-white mb-2">Something broke!</h2><p class="text-xs text-gray-500 mb-6"></p><button class="bg-red-500 text-white px-6 py-2 rounded-lg font-bold">Reload App'),XI=V('<div class="h-screen flex flex-col items-center justify-center p-6 text-center"><h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-4 tracking-tighter">CINELOG</h1><p class="text-gray-400 mb-10 text-sm">Ultimate Edition</p><button class="bg-[var(--primary)] text-black font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">Sign In with Google');function ZI(){const[n,e]=Y(null),[t,r]=Y([]),[i,s]=Y([]),[a,l]=Y("dashboard"),[u,d]=Y(localStorage.getItem("cinelog_theme")||"sage"),[f,p]=Y(!0),[_,I]=Y(!0),[C,S]=Y("all"),[A,N]=Y(!1),[R,$]=Y(null),[F,U]=Y(null),[W,w]=Y(!1),[v,y]=Y(!1),[E,x]=Y(!1),[k,b]=Y({show:!1,msg:""}),le=O=>{b({show:!0,msg:O}),setTimeout(()=>b({show:!1,msg:""}),3e3)};$n(()=>{document.body.className=`theme-${u()}`,localStorage.setItem("cinelog_theme",u())}),$n(()=>{a(),window.scrollTo(0,0)}),ln(()=>{setTimeout(()=>I(!1),3e3),Eb(sa,O=>{if(e(O),O){let q=!1,j=!1;Vu(Sy(Ds(tt,"users",O.uid,"watchlist"),Cy("addedAt","desc")),z=>{r(z.docs.map(ee=>({id:ee.id,...ee.data()}))),q=!0,j&&p(!1)}),Vu(Ds(tt,"users",O.uid,"franchises"),z=>{s(z.docs.map(ee=>({id:ee.id,...ee.data()}))),j=!0,q&&p(!1)})}else p(!1)})});const J=async()=>{if(confirm("DANGER: Entire Vault will be wiped. Sure?")){le("Nuking Vault...");const q=(await $y(Ds(tt,"users",n().uid,"watchlist"))).docs;for(let j=0;j<q.length;j+=500){const z=Tf(tt);q.slice(j,j+500).forEach(ee=>z.delete(ee.ref)),await z.commit()}le("Vault wiped!"),x(!1)}};return T(Lp,{fallback:O=>(()=>{var q=JI(),j=q.firstChild,z=j.nextSibling,ee=z.nextSibling;return m(q,T(B,{name:"error",class:"text-red-500 text-6xl mb-4"}),j),m(z,()=>O.toString()),ee.$$click=()=>window.location.reload(),q})(),get children(){return T(G,{get when(){return ut(()=>!f())()&&!_()},get fallback(){return T(b0,{})},get children(){return T(G,{get when(){return n()},get fallback(){return(()=>{var O=XI(),q=O.firstChild,j=q.nextSibling,z=j.nextSibling;return z.$$click=()=>qb(sa,new Sn),O})()},get children(){return[T(S0,{user:n,watchlist:t,view:a,setView:l,openMovie:$,onUserClick:O=>{O.stopPropagation(),x(!E())},onSettingsClick:()=>w(!0),onStatsClick:()=>y(!0),onSearchClick:()=>N(!0),get children(){return[T(G,{get when(){return a()==="watchlist"},get children(){return T(U0,{watchlist:t,openMovie:$,get activeStatus(){return C()},onFilterChange:S})}}),T(G,{get when(){return a()==="franchises"},get children(){return T(aE,{watchlist:t,franchises:i,get uid(){return n().uid},openMovie:$,showToast:le})}}),T(G,{get when(){return a()==="upcoming"},get children(){return T($E,{watchlist:t,get uid(){return n().uid},showToast:le})}}),T(G,{get when(){return a()==="sync"},get children(){return T(FE,{watchlist:t,get uid(){return n().uid},showToast:le})}})]}}),T(G,{get when(){return E()},get children(){return[(()=>{var O=KI();return O.$$click=()=>x(!1),O})(),(()=>{var O=QI(),q=O.firstChild,j=q.firstChild,z=q.nextSibling,ee=z.nextSibling,Ee=ee.firstChild,he=ee.nextSibling,de=he.firstChild,pe=he.nextSibling,oe=pe.nextSibling,Fe=oe.firstChild;return q.$$click=()=>{y(!0),x(!1)},m(q,T(B,{name:"bar_chart",class:"text-[18px]"}),j),ee.$$click=()=>{l("sync"),x(!1)},m(ee,T(B,{name:"import_export",class:"text-[18px]"}),Ee),he.$$click=()=>Ib(sa),m(he,T(B,{name:"logout",class:"text-[18px]"}),de),oe.$$click=J,m(oe,T(B,{name:"delete_forever",class:"text-[18px]"}),Fe),O})()]}}),T(G,{get when(){return A()},get children(){return T(FI,{onClose:()=>N(!1),get uid(){return n().uid},showToast:le,get watchlist(){return t()},openPreview:(O,q)=>{q!=="fromPerson"&&N(!1),U(q||"search"),$(`PREVIEW_${JSON.stringify(O)}`)}})}}),T(G,{get when(){return R()},get children(){return T(bI,{get id(){return R()},get watchlist(){return t()},get franchises(){return i()},onClose:()=>{const O=F();$(null),U(null),O==="fromPerson"&&N(!0)},get uid(){return n().uid},showToast:le,theme:u})}}),T(G,{get when(){return v()},get children(){return T(WI,{watchlist:t,onClose:()=>y(!1)})}}),T(G,{get when(){return W()},get children(){return T(HI,{get currentTheme(){return u()},setTheme:d,onClose:()=>w(!1)})}}),T(G,{get when(){return k().show},get children(){var O=YI(),q=O.firstChild;return m(O,T(B,{name:"check_circle",class:"text-[var(--primary)]",fill:!0}),q),m(O,()=>k().msg,null),O}})]}})}})}})}Bt(["click"]);Up(()=>T(ZI,{}),document.getElementById("root"));
