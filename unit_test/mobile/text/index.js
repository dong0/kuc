import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps } from "../../base/validator";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
export class MobileText extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.placeholder = "";
        this.prefix = "";
        this.suffix = "";
        this.textAlign = "left";
        this.value = "";
        this.disabled = false;
        this.requiredIcon = false;
        this.visible = true;
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    _handleFocusInput(event) {
        const detail = { value: this.value };
        dispatchCustomEvent(this, "focus", detail);
    }
    _handleChangeInput(event) {
        event.stopPropagation();
        const targetEl = event.target;
        const detail = { value: "", oldValue: this.value };
        this.value = targetEl.value;
        detail.value = this.value;
        dispatchCustomEvent(this, "change", detail);
    }
    _handleInputText(event) {
        event.stopPropagation();
        const targetEl = event.target;
        const detail = {
            value: targetEl.value,
            data: event.data
        };
        dispatchCustomEvent(this, "input", detail);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <label
        class="kuc-mobile-text__label"
        for="${this._GUID}-label"
        ?hidden="${!this.label}"
      >
        <kuc-base-mobile-label
          .requiredIcon="${this.requiredIcon}"
          .text="${this.label}"
        ></kuc-base-mobile-label>
      </label>
      <div class="kuc-mobile-text__input-form">
        <span
          class="kuc-mobile-text__input-form__prefix"
          ?hidden="${!this.prefix}"
          >${this.prefix}</span
        >
        <input
          class="kuc-mobile-text__input-form__input"
          id="${this._GUID}-label"
          placeholder="${this.placeholder}"
          textAlign="${this.textAlign}"
          type="text"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          aria-invalid="${this.error !== ""}"
          aria-describedby="${this._GUID}-error"
          aria-required="${this.requiredIcon}"
          @focus="${this._handleFocusInput}"
          @change="${this._handleChangeInput}"
          @input="${this._handleInputText}"
        />
        <span
          class="kuc-mobile-text__input-form__suffix"
          ?hidden="${!this.suffix}"
          >${this.suffix}</span
        >
      </div>
      <kuc-base-mobile-error .guid="${this._GUID}" .text="${this.error}">
      </kuc-base-mobile-error>
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-mobile-text {
          display: block;
          font-size: 13px;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-mobile-text,
        :lang(zh) kuc-mobile-text * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-mobile-text[hidden] {
          display: none;
        }
        .kuc-mobile-text__label {
          display: inline-block;
          font-weight: bold;
          line-height: 1.5;
          padding: 0;
          margin: 0 0 4px 0;
          white-space: nowrap;
        }
        .kuc-mobile-text__label[hidden] {
          display: none;
        }
        .kuc-mobile-text__input-form {
          padding-left: 0.5em;
          padding-right: 0.5em;
          display: flex;
          align-items: center;
        }
        .kuc-mobile-text__input-form__prefix {
          margin-right: 4px;
          color: #888888;
        }
        .kuc-mobile-text__input-form__prefix[hidden] {
          display: none;
        }
        .kuc-mobile-text__input-form__input {
          width: 100%;
          min-width: 20px;
          padding: 0.4em;
          border: 1px solid #b3b3b3;
          outline: 0;
          box-shadow: 0 1px 0 #ffffff, inset 0 2px 3px #dadada;
          border-radius: 0.4em;
          box-sizing: border-box;
          text-align: left;
        }
        .kuc-mobile-text__input-form__input[aria-required="true"] {
          border: 1px solid #cf4a38;
        }
        .kuc-mobile-text__input-form__input[textAlign="right"] {
          text-align: right;
        }
        .kuc-mobile-text__input-form__input:disabled {
          color: #999999;
          background-color: #d5d7d9;
          -webkit-text-fill-color: #999999;
          opacity: 1;
          -webkit-opacity: 1;
        }
        .kuc-mobile-text__input-form__suffix {
          margin-left: 4px;
          color: #888888;
        }
        .kuc-mobile-text__input-form__suffix[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MobileText.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MobileText.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "label", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "prefix", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "suffix", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "textAlign", void 0);
__decorate([
    property({ type: String })
], MobileText.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], MobileText.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MobileText.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MobileText.prototype, "visible", void 0);
if (!window.customElements.get("kuc-mobile-text")) {
    window.customElements.define("kuc-mobile-text", MobileText);
}