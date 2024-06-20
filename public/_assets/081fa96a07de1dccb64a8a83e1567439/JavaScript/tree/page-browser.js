/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __decorate=function(e,t,n,o){var r,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(i<3?r(s):i>3?r(t,n,s):r(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};import{html,LitElement,nothing}from"lit";import{customElement,property,query}from"lit/decorators.js";import{until}from"lit/directives/until.js";import{lll}from"@typo3/core/lit-helper.js";import{PageTree}from"@typo3/backend/tree/page-tree.js";import AjaxRequest from"@typo3/core/ajax/ajax-request.js";import"@typo3/backend/tree/tree-toolbar.js";import ElementBrowser from"@typo3/backend/element-browser.js";import LinkBrowser from"@typo3/backend/link-browser.js";import"@typo3/backend/element/icon-element.js";import Persistent from"@typo3/backend/storage/persistent.js";let PageBrowserTree=class extends PageTree{getNodeClasses(e){const t=super.getNodeClasses(e);return this.settings.actions.includes("link")?(this.isLinkable(e)||t.push("node-disabled"),t):t}createNodeContentAction(e){return this.settings.actions.includes("link")?this.isLinkable(e)?html`
          <span class="node-action" @click="${()=>this.linkItem(e)}">
            <typo3-backend-icon identifier="actions-link" size="small"></typo3-backend-icon>
          </span>
        `:super.createNodeContentAction(e):this.settings.actions.includes("select")?html`
        <span class="node-action" @click="${()=>this.selectItem(e)}">
          <typo3-backend-icon identifier="actions-link" size="small"></typo3-backend-icon>
        </span>
      `:super.createNodeContentAction(e)}linkItem(e){LinkBrowser.finalizeFunction("t3://page?uid="+e.identifier)}isLinkable(e){return!1===["199","254","255"].includes(String(e.recordType))}selectItem(e){ElementBrowser.insertElement(e.recordType,e.identifier,e.name,e.identifier,!0)}};PageBrowserTree=__decorate([customElement("typo3-backend-component-page-browser-tree")],PageBrowserTree);export{PageBrowserTree};let PageBrowser=class extends LitElement{constructor(){super(...arguments),this.mountPointPath=null,this.activePageId=0,this.actions=[],this.configuration=null,this.selectActivePageInTree=e=>{const t=e.detail.nodes;e.detail.nodes=t.map((e=>(parseInt(e.identifier,10)===this.activePageId&&(e.checked=!0),e)))},this.loadRecordsOfPage=e=>{const t=e.detail.node;if(!t.checked)return;const n=new URL(document.location.href,window.location.origin);n.searchParams.set("contentOnly","1"),n.searchParams.set("expandPage",t.identifier),new AjaxRequest(n).get().then((e=>e.resolve())).then((e=>{document.querySelector(".element-browser-main-content .element-browser-body").innerHTML=e}))},this.setMountPoint=e=>{this.setTemporaryMountPoint(e.detail.pageId)}}connectedCallback(){super.connectedCallback(),document.addEventListener("typo3:pagetree:mountPoint",this.setMountPoint)}disconnectedCallback(){document.removeEventListener("typo3:pagetree:mountPoint",this.setMountPoint),super.disconnectedCallback()}firstUpdated(){this.activePageId=parseInt(this.getAttribute("active-page"),10),this.actions=JSON.parse(this.getAttribute("tree-actions")??"[]")}createRenderRoot(){return this}getConfiguration(){if(null!==this.configuration)return Promise.resolve(this.configuration);const e=top.TYPO3.settings.ajaxUrls.page_tree_browser_configuration,t=this.hasAttribute("alternative-entry-points")?JSON.parse(this.getAttribute("alternative-entry-points")):[];let n=new AjaxRequest(e);return t.length&&(n=n.withQueryArguments("alternativeEntryPoints="+encodeURIComponent(t))),n.get().then((async e=>{const t=await e.resolve("json");return t.actions=this.actions,this.configuration=t,this.mountPointPath=t.temporaryMountPoint||null,t}))}render(){return html`
      <div class="tree">
      ${until(this.renderTree(),"")}
      </div>
    `}renderTree(){return this.getConfiguration().then((e=>html`
          <typo3-backend-tree-toolbar .tree="${this.tree}"></typo3-backend-tree-toolbar>
          <div class="navigation-tree-container">
            ${this.renderMountPoint()}
            <typo3-backend-component-page-browser-tree id="typo3-pagetree-tree" class="tree-wrapper" .setup=${e} @tree:initialized=${()=>{this.tree.addEventListener("typo3:tree:node-selected",this.loadRecordsOfPage),this.tree.addEventListener("typo3:tree:nodes-prepared",this.selectActivePageInTree);this.querySelector("typo3-backend-tree-toolbar").tree=this.tree}}></typo3-backend-component-page-browser-tree>
          </div>
        `))}unsetTemporaryMountPoint(){Persistent.unset("pageTree_temporaryMountPoint").then((()=>{this.mountPointPath=null}))}renderMountPoint(){return null===this.mountPointPath?nothing:html`
      <div class="node-mount-point">
        <div class="node-mount-point__icon"><typo3-backend-icon identifier="actions-info-circle" size="small"></typo3-backend-icon></div>
        <div class="node-mount-point__text">${this.mountPointPath}</div>
        <div class="node-mount-point__icon mountpoint-close" @click="${()=>this.unsetTemporaryMountPoint()}" title="${lll("labels.temporaryDBmount")}">
          <typo3-backend-icon identifier="actions-close" size="small"></typo3-backend-icon>
        </div>
      </div>
    `}setTemporaryMountPoint(e){new AjaxRequest(this.configuration.setTemporaryMountPointUrl).post("pid="+e,{headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).then((e=>e.resolve())).then((e=>{e&&e.hasErrors?(this.tree.errorNotification(e.message),this.tree.loadData()):this.mountPointPath=e.mountPointPath})).catch((e=>{this.tree.errorNotification(e),this.tree.loadData()}))}};__decorate([property({type:String})],PageBrowser.prototype,"mountPointPath",void 0),__decorate([query(".tree-wrapper")],PageBrowser.prototype,"tree",void 0),PageBrowser=__decorate([customElement("typo3-backend-component-page-browser")],PageBrowser);export{PageBrowser};