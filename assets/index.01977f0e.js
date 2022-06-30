const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerpolicy&&(o.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?o.credentials="include":a.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}};T();function k(){}function H(t){return t()}function L(){return Object.create(null)}function _(t){t.forEach(H)}function Y(t){return typeof t=="function"}function C(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function f(t,e){t.appendChild(e)}function P(t,e,n){t.insertBefore(e,n||null)}function O(t){t.parentNode.removeChild(t)}function h(t){return document.createElement(t)}function D(t){return document.createTextNode(t)}function z(){return D(" ")}function q(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function u(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function B(t){return Array.from(t.childNodes)}function W(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let I;function b(t){I=t}const x=[],S=[],w=[],M=[],K=Promise.resolve();let A=!1;function R(){A||(A=!0,K.then(N))}function E(t){w.push(t)}const j=new Set;let y=0;function N(){const t=I;do{for(;y<x.length;){const e=x[y];y++,b(e),G(e.$$)}for(b(null),x.length=0,y=0;S.length;)S.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];j.has(n)||(j.add(n),n())}w.length=0}while(x.length);for(;M.length;)M.pop()();A=!1,j.clear(),b(t)}function G(t){if(t.fragment!==null){t.update(),_(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const J=new Set;function Q(t,e){t&&t.i&&(J.delete(t),t.i(e))}function U(t,e,n,i){const{fragment:a,on_mount:o,on_destroy:l,after_update:r}=t.$$;a&&a.m(e,n),i||E(()=>{const d=o.map(H).filter(Y);l?l.push(...d):_(d),t.$$.on_mount=[]}),r.forEach(E)}function V(t,e){const n=t.$$;n.fragment!==null&&(_(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){t.$$.dirty[0]===-1&&(x.push(t),R(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Z(t,e,n,i,a,o,l,r=[-1]){const d=I;b(t);const s=t.$$={fragment:null,ctx:null,props:o,update:k,not_equal:a,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:L(),dirty:r,skip_bound:!1,root:e.target||d.$$.root};l&&l(s.root);let g=!1;if(s.ctx=n?n(t,e.props||{},(c,p,...v)=>{const m=v.length?v[0]:p;return s.ctx&&a(s.ctx[c],s.ctx[c]=m)&&(!s.skip_bound&&s.bound[c]&&s.bound[c](m),g&&X(t,c)),p}):[],s.update(),g=!0,_(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){const c=B(e.target);s.fragment&&s.fragment.l(c),c.forEach(O)}else s.fragment&&s.fragment.c();e.intro&&Q(t.$$.fragment),U(t,e.target,e.anchor,e.customElement),N()}b(d)}class tt{$destroy(){V(this,1),this.$destroy=k}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const a=i.indexOf(n);a!==-1&&i.splice(a,1)}}$set(e){this.$$set&&!F(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function et(t){let e,n,i,a,o,l,r,d,s,g,c,p,v;return{c(){e=h("main"),n=h("div"),i=h("div"),a=h("p"),o=D(t[0]),l=z(),r=h("div"),r.innerHTML=`<div class="content"><a href="https://github.com/rhpo/" class="fa-brands fa-github"></a> 
          <a href="https://www.linkedin.com/in/ramy-hadid-15aa70243/" class="fa-brands fa-linkedin"></a> 
          <a href="https://instagram.com/ramyhadid/" class="fa-brands fa-instagram"></a> 
          <a href="mailto:me@ramey.ml" class="fal fa-envelope"></a> 
          <a href="tel:+213549768894" class="fal fa-phone"></a></div>`,d=z(),s=h("div"),g=z(),c=h("div"),c.innerHTML=`<div class="content main"><h1 data-aos="fade-right" data-aos-duration="1000">Hi, I&#39;m <span class="name">Ramy Hadid</span>.</h1> 
        <p data-aos="fade" data-aos-duration="1200" data-aos-delay="1000">I&#39;m a Web Developer and Software Enginneer, I&#39;m 17 years old and I live in
          Algeria.
          Am a full-stack developer working in Maisons d&#39;Antan, You might know me by my online aliases, ramyhadid or
          ramey, that&#39;s because of username unavailability. I develop for the web &amp; Windows, make random utilities. You
          can find some of my work on my Discord Server. You might also catch me on Discord, ramey#0001 or
          procrastinating on YouTube or Instagram.</p></div>`,u(a,"class","clock"),u(r,"class","social-icons"),u(r,"data-aos","fade"),u(r,"data-aos-duration","2500"),u(s,"class","solar far fa-sun"),u(i,"class","left-nav"),u(i,"data-aos","fade-right"),u(i,"data-aos-duration","600"),u(c,"class","right-nav"),u(n,"class","hero")},m(m,$){P(m,e,$),f(e,n),f(n,i),f(i,a),f(a,o),f(i,l),f(i,r),f(i,d),f(i,s),f(n,g),f(n,c),p||(v=q(s,"click",t[1]),p=!0)},p(m,[$]){$&1&&W(o,m[0])},i:k,o:k,d(m){m&&O(e),p=!1,v()}}}function nt(t,e,n){let i,a,o,l;var r=new Date;setInterval(()=>n(2,r=new Date),1e3);const d=()=>{document.body.classList.toggle("white-mode"),document.querySelector(".solar").classList.toggle("solar-active")};return t.$$.update=()=>{t.$$.dirty&4&&n(5,i=r.getHours()<10?"0"+r.getHours():r.getHours()),t.$$.dirty&4&&n(4,a=r.getMinutes()<10?"0"+r.getMinutes():r.getMinutes()),t.$$.dirty&4&&n(3,o=r.getSeconds()<10?"0"+r.getSeconds():r.getSeconds()),t.$$.dirty&56&&n(0,l=i+":"+a+":"+o)},[l,d,r,o,a,i]}class at extends tt{constructor(e){super(),Z(this,e,nt,et,C,{})}}new at({target:document.getElementById("app")});
