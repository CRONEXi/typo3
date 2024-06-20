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
import{AbstractInteractableModule}from"@typo3/install/module/abstract-interactable-module.js";import Modal from"@typo3/backend/modal.js";import Notification from"@typo3/backend/notification.js";import AjaxRequest from"@typo3/core/ajax/ajax-request.js";import{InfoBox}from"@typo3/install/renderable/info-box.js";import Severity from"@typo3/install/renderable/severity.js";import Router from"@typo3/install/router.js";import RegularEvent from"@typo3/core/event/regular-event.js";var Identifiers;!function(e){e.analyzeTrigger=".t3js-databaseAnalyzer-analyze",e.executeTrigger=".t3js-databaseAnalyzer-execute",e.outputContainer=".t3js-databaseAnalyzer-output",e.suggestionBlock=".t3js-databaseAnalyzer-suggestion-block",e.suggestionBlockCheckbox=".t3js-databaseAnalyzer-suggestion-block-checkbox",e.suggestionBlockLegend=".t3js-databaseAnalyzer-suggestion-block-legend",e.suggestionBlockLabel=".t3js-databaseAnalyzer-suggestion-block-label",e.suggestionList=".t3js-databaseAnalyzer-suggestion-list",e.suggestionLineTemplate=".t3js-databaseAnalyzer-suggestion-line-template",e.suggestionLineCheckbox=".t3js-databaseAnalyzer-suggestion-line-checkbox",e.suggestionLineLabel=".t3js-databaseAnalyzer-suggestion-line-label",e.suggestionLineStatement=".t3js-databaseAnalyzer-suggestion-line-statement",e.suggestionLineCurrent=".t3js-databaseAnalyzer-suggestion-line-current",e.suggestionLineCurrentValue=".t3js-databaseAnalyzer-suggestion-line-current-value",e.suggestionLineCount=".t3js-databaseAnalyzer-suggestion-line-count",e.suggestionLineCountValue=".t3js-databaseAnalyzer-suggestion-line-count-value"}(Identifiers||(Identifiers={}));class DatabaseAnalyzer extends AbstractInteractableModule{initialize(e){super.initialize(e),this.loadModuleFrameAgnostic("@typo3/install/renderable/info-box.js").then((()=>{this.getData()})),new RegularEvent("click",((e,t)=>{t.closest("fieldset").querySelectorAll('input[type="checkbox"]').forEach((e=>{e.checked=t.checked}))})).delegateTo(e,Identifiers.suggestionBlockCheckbox),new RegularEvent("click",(e=>{e.preventDefault(),this.analyze()})).delegateTo(e,Identifiers.analyzeTrigger),new RegularEvent("click",(e=>{e.preventDefault(),this.execute()})).delegateTo(e,Identifiers.executeTrigger)}getData(){const e=this.getModalBody();new AjaxRequest(Router.getUrl("databaseAnalyzer")).get({cache:"no-cache"}).then((async t=>{const s=await t.resolve();!0===s.success?(e.innerHTML=s.html,Modal.setButtons(s.buttons),this.analyze()):Notification.error("Something went wrong","The request was not processed successfully. Please check the browser's console and TYPO3's log.")}),(t=>{Router.handleAjaxError(t,e)}))}analyze(){this.setModalButtonsState(!1);const e=this.getModalBody(),t=e.querySelector(Identifiers.outputContainer),s=this.renderProgressBar(t,{label:"Analyzing current database schema..."});new RegularEvent("change",(()=>{const e=t.querySelectorAll(":checked").length>0;this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.executeTrigger),e)})).delegateTo(t,'input[type="checkbox"]'),new AjaxRequest(Router.getUrl("databaseAnalyzerAnalyze")).get({cache:"no-cache"}).then((async a=>{const o=await a.resolve();!0===o.success?(Array.isArray(o.status)&&(s.remove(),o.status.forEach((e=>{t.append(InfoBox.create(e.severity,e.title,e.message))}))),Array.isArray(o.suggestions)&&(o.suggestions.forEach((s=>{const a=e.querySelector(Identifiers.suggestionBlock).cloneNode(!0);a.classList.remove(Identifiers.suggestionBlock.substring(1));const o=s.key;a.querySelector(Identifiers.suggestionBlockLegend).innerText=s.label,a.querySelector(Identifiers.suggestionBlockCheckbox).setAttribute("id","t3-install-"+o+"-checkbox"),s.enabled&&a.querySelector(Identifiers.suggestionBlockCheckbox).setAttribute("checked","checked"),a.querySelector(Identifiers.suggestionBlockLabel).setAttribute("for","t3-install-"+o+"-checkbox"),s.children.forEach((t=>{const o=e.querySelector(Identifiers.suggestionLineTemplate).children[0].cloneNode(!0),r=t.hash,n=o.querySelector(Identifiers.suggestionLineCheckbox);n.setAttribute("id","t3-install-db-"+r),n.setAttribute("data-hash",r),s.enabled&&n.setAttribute("checked","checked"),o.querySelector(Identifiers.suggestionLineLabel).setAttribute("for","t3-install-db-"+r),o.querySelector(Identifiers.suggestionLineStatement).innerText=t.statement,void 0!==t.current&&(o.querySelector(Identifiers.suggestionLineCurrentValue).innerText=t.current,o.querySelector(Identifiers.suggestionLineCurrent).style.display="inline"),void 0!==t.rowCount&&(o.querySelector(Identifiers.suggestionLineCountValue).innerText=t.rowCount,o.querySelector(Identifiers.suggestionLineCount).style.display="inline"),a.querySelector(Identifiers.suggestionList).append(o)})),t.append(a)})),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.analyzeTrigger),!0),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.executeTrigger),t.querySelectorAll(":checked").length>0)),0===o.suggestions.length&&0===o.status.length&&t.append(InfoBox.create(Severity.ok,"Database schema is up to date. Good job!"))):(Notification.error("Something went wrong","The request was not processed successfully. Please check the browser's console and TYPO3's log."),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.analyzeTrigger),!0),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.executeTrigger),!1))}),(t=>{Router.handleAjaxError(t,e),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.analyzeTrigger),!0),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.executeTrigger),!1)}))}execute(){this.setModalButtonsState(!1);const e=this.getModalBody(),t=this.getModuleContent().dataset.databaseAnalyzerExecuteToken,s=e.querySelector(Identifiers.outputContainer),a=[];s.querySelectorAll(".t3js-databaseAnalyzer-suggestion-line input:checked").forEach((e=>{a.push(e.dataset.hash)})),this.renderProgressBar(s,{label:"Executing database updates..."}),new AjaxRequest(Router.getUrl()).post({install:{action:"databaseAnalyzerExecute",token:t,hashes:a}}).then((async e=>{const t=await e.resolve();Array.isArray(t.status)&&t.status.forEach((e=>{Notification.showMessage(e.title,e.message,e.severity)})),this.analyze()}),(t=>{Router.handleAjaxError(t,e)})).finally((()=>{this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.analyzeTrigger),!0),this.setModalButtonState(this.getModalFooter().querySelector(Identifiers.executeTrigger),!1)}))}}export default new DatabaseAnalyzer;