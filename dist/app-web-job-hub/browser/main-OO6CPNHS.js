import{a as j}from"./chunk-XLSEDACP.js";import{a as D,b as E}from"./chunk-R6AN7JFM.js";import{c as T}from"./chunk-XGI462JW.js";import{c as _}from"./chunk-HA6RUP2S.js";import{W as x,sa as S}from"./chunk-4PSSOT7F.js";import"./chunk-IX6G3U3V.js";import{c as N,d as F,e as I,i as O,m}from"./chunk-ZCOQR2LJ.js";import{$ as l,Fa as v,Wa as C,X as c,Ya as M,_ as u,_a as b,ab as w,bb as R,ea as f,ja as g,ka as d,ma as y,wc as P,xb as A}from"./chunk-XRRDNWOE.js";var U=[{path:"login",loadChildren:()=>import("./chunk-Y7HE2SQS.js").then(o=>o.LoginModule)},{path:"Postulantes",loadChildren:()=>import("./chunk-IANJUN2Y.js").then(o=>o.PostulantesModule)},{path:"Ofertantes",loadChildren:()=>import("./chunk-2KKOULIF.js").then(o=>o.OfertantesModule)},{path:"crear-cv",component:E},{path:"editar-curriculum",component:D}],B=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=d({type:e}),e.\u0275inj=l({imports:[m.forRoot(U),m]});let o=e;return o})();var k=(()=>{let e=class e{constructor(){this.title="App-Web-JobHub"}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=g({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(i,n){i&1&&A(0,"router-outlet")},dependencies:[O],styles:[".app-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.content[_ngcontent-%COMP%]{flex-grow:1}"]});let o=e;return o})();var W="@",H=(()=>{let e=class e{constructor(r,i,n,s,a){this.doc=r,this.delegate=i,this.zone=n,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=f(M,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-2GVYI6DS.js")).catch(i=>{throw new c(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:n})=>{this._engine=i(this.animationType,this.doc,this.scheduler);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(r,i){let n=this.delegate.createRenderer(r,i);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new h(n);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let z=a.createRenderer(r,i);s.use(z)}).catch(a=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(i){C()},e.\u0275prov=u({token:e,factory:e.\u0275fac});let o=e;return o})(),h=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,i){this.delegate.insertBefore(e,t,r,i)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,i){this.delegate.setAttribute(e,t,r,i)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,i){this.delegate.setStyle(e,t,r,i)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(i=>i.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(i=>i.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(W)}};function L(o="animations"){return w("NgAsyncAnimations"),y([{provide:b,useFactory:(e,t,r)=>new H(e,t,r,o),deps:[P,N,R]},{provide:v,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var V=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=d({type:e,bootstrap:[k]}),e.\u0275inj=l({providers:[L()],imports:[I,B,j,x,S,T,_]});let o=e;return o})();F().bootstrapModule(V).catch(o=>console.error(o));
