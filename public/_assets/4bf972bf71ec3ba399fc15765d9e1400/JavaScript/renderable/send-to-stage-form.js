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
var __decorate=function(e,t,o,a){var n,l=arguments.length,i=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(i=(l<3?n(i):l>3?n(t,o,i):n(t,o))||i);return l>3&&i&&Object.defineProperty(t,o,i),i};import{customElement,property}from"lit/decorators.js";import{html,LitElement,nothing}from"lit";let SendToStageFormElement=class extends LitElement{constructor(){super(...arguments),this.data=null,this.TYPO3lang=null}createRenderRoot(){return this}render(){return html`
      <form>
        ${void 0!==this.data.sendMailTo&&this.data.sendMailTo.length>0?html`
          <label class="form-label">${this.TYPO3lang["window.sendToNextStageWindow.itemsWillBeSentTo"]}</label>
          ${this.renderRecipientCheckboxes()}
        `:nothing}
        ${void 0!==this.data.additional?html`
          <div class="form-group">
            <label for="additional" class="form-label">
              ${this.TYPO3lang["window.sendToNextStageWindow.additionalRecipients"]}
            </label>
            <textarea class="form-control" name="additional" id="additional">${this.data.additional.value}</textarea>
            <div class="form-text">
              ${this.TYPO3lang["window.sendToNextStageWindow.additionalRecipients.hint"]}
            </div>
          </div>
        `:nothing}
        <div class="form-group">
          <label for="comments" class="form-label">
            ${this.TYPO3lang["window.sendToNextStageWindow.comments"]}
          </label>
          <textarea class="form-control" name="comments" id="comments">${this.data.comments.value}</textarea>
        </div>
      </form>
    `}renderRecipientCheckboxes(){const e=[];return this.data.sendMailTo?.forEach((t=>{e.push(html`
        <div class="form-check">
          <input
            type="checkbox"
            name="recipients"
            class="form-check-input t3js-workspace-recipient"
            id=${t.name}
            value=${t.value}
            ?checked=${t.checked}
            ?disabled=${t.disabled}
            />
          <label class="form-check-label" for=${t.name}>
            ${t.label}
          </label>
        </div>
      `)})),e}};__decorate([property({type:Object})],SendToStageFormElement.prototype,"data",void 0),__decorate([property({type:Object})],SendToStageFormElement.prototype,"TYPO3lang",void 0),SendToStageFormElement=__decorate([customElement("typo3-workspaces-send-to-stage-form")],SendToStageFormElement);export{SendToStageFormElement};