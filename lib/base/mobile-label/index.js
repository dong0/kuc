var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, createStyleOnHeader } from "../kuc-base";
import { BASE_MOBILE_LABEL_CSS } from "./style";
export class BaseMobileLabel extends KucBase {
    constructor() {
        super(...arguments);
        this.requiredIcon = false;
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this._getTextTemplate()}
      <span
        class="kuc-base-mobile-label-1-3-2__required-icon"
        ?hidden="${!this.requiredIcon}"
        >*</span
      >
    `;
    }
    _getTextTemplate() {
        return this.guid && this.guid !== ""
            ? html `
          <span class="kuc-base-mobile-label-1-3-2__text" .id="${this.guid}-group"
            >${this.text}</span
          >
        `
            : html ` <span class="kuc-base-mobile-label-1-3-2__text">${this.text}</span> `;
    }
}
__decorate([
    property({ type: Boolean })
], BaseMobileLabel.prototype, "requiredIcon", void 0);
__decorate([
    property({ type: String })
], BaseMobileLabel.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseMobileLabel.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-mobile-label-1-3-2")) {
    createStyleOnHeader(BASE_MOBILE_LABEL_CSS);
    window.customElements.define("kuc-base-mobile-label-1-3-2", BaseMobileLabel);
}