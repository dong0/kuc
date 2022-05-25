import { __decorate } from "tslib";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { visiblePropConverter, dateValueConverter } from "../../base/converter";
import { dispatchCustomEvent, generateGUID, KucBase } from "../../base/kuc-base";
import { validateProps, validateDateValue, isValidDate, throwErrorAfterUpdateComplete } from "../../base/validator";
import "../../base/datetime/mobile-date";
import "../../base/mobile-label";
import "../../base/mobile-error";
import { FORMAT_IS_NOT_VALID } from "../../base/datetime/resource/constant";
export class MobileDatePicker extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.disabled = false;
        this.requiredIcon = false;
        this.language = "auto";
        this.value = "";
        this.visible = true;
        this._dateConverted = "";
        this._inputValue = "";
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    shouldUpdate(_changedProperties) {
        if (this.value === undefined || this.value === "")
            return true;
        if (!validateDateValue(this.value)) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        this._dateConverted = dateValueConverter(this.value);
        if (this._dateConverted !== "" && !isValidDate(this._dateConverted)) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        return true;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("value")) {
            if (this.value !== undefined && this.value !== "") {
                this.value = this._dateConverted;
            }
        }
    }
    update(changedProperties) {
        if (changedProperties.has("value")) {
            this._updateInputValue();
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div class="kuc-mobile-date-picker__group">
        <label
          class="kuc-mobile-date-picker__group__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label
            .requiredIcon="${this.requiredIcon}"
            .text="${this.label}"
          ></kuc-base-mobile-label>
        </label>
        <kuc-mobile-base-date
          class="kuc-mobile-date-picker__group__base__date"
          .disabled="${this.disabled}"
          .value="${this._inputValue}"
          .inputId="${this._GUID}"
          .inputAriaInvalid="${this.error !== ""}"
          .required="${this.requiredIcon}"
          .language="${this._getLanguage()}"
          @kuc:mobile-base-date-change="${this._handleDateChange}"
        >
        </kuc-mobile-base-date>
        <kuc-base-mobile-error .guid="${this._GUID}" .text="${this.error}">
        </kuc-base-mobile-error>
      </div>
    `;
    }
    _updateInputValue() {
        if (this.value === undefined || this.value === "") {
            this._inputValue = "";
            return;
        }
        this._inputValue = this.value;
    }
    _getLanguage() {
        const langs = ["en", "ja", "zh"];
        if (langs.indexOf(this.language) !== -1)
            return this.language;
        if (langs.indexOf(document.documentElement.lang) !== -1)
            return document.documentElement.lang;
        return "en";
    }
    _handleDateChange(event) {
        event.stopPropagation();
        event.preventDefault();
        const eventDetail = {
            oldValue: this.value,
            value: ""
        };
        const theSameValue = event.detail.value === this.value ||
            (event.detail.value === undefined && this.value === "");
        if (!theSameValue) {
            this.error = "";
        }
        this.value = event.detail.value;
        eventDetail.value = this.value;
        this._disptchChangeEvent(eventDetail);
    }
    _disptchChangeEvent(eventDetail) {
        dispatchCustomEvent(this, "change", eventDetail);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-mobile-date-picker,
        kuc-mobile-date-picker * {
          color: #333333;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-mobile-date-picker,
        :lang(zh) kuc-mobile-date-picker * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-mobile-date-picker {
          font-size: 13px;
          color: #333333;
          display: inline-table;
          vertical-align: top;
          width: 100%;
        }
        kuc-mobile-date-picker[hidden] {
          display: none;
        }
        .kuc-mobile-date-picker__group {
          display: flex;
          flex-direction: column;
          border: none;
          padding: 0px;
          height: auto;
          margin: 0px;
        }
        .kuc-mobile-date-picker__group__label {
          display: inline-block;
          font-weight: bold;
          line-height: 1.5;
          padding: 0px;
          white-space: nowrap;
          margin: 0 0 4px 0;
        }
        .kuc-mobile-date-picker__group__base__date {
          width: 130px;
          margin-right: 0.5em;
          margin-left: 0.5em;
        }
        .kuc-mobile-date-picker__group__label[hidden] {
          display: none;
        }
        .kuc-mobile-date-picker__group input.kuc-base-date__input {
          width: 100px;
          height: 40px;
          padding: 0px;
          text-align: center;
          border: 1px solid #e3e7e8;
          box-sizing: border-box;
          font-size: 14px;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
        }

        .kuc-mobile-date-picker__group input.kuc-base-date__input:focus {
          outline: none;
          border: 1px solid #3498db;
        }
        .kuc-mobile-date-picker__group input.kuc-base-date__input--focus {
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
          border: 1px solid #3498db;
          background-color: #ffffff;
          color: #333333;
        }
        .kuc-mobile-date-picker__group input.kuc-base-date__input:disabled {
          color: #888888;
          background-color: #d4d7d7;
          box-shadow: none;
          cursor: not-allowed;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MobileDatePicker.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MobileDatePicker.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MobileDatePicker.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MobileDatePicker.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], MobileDatePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MobileDatePicker.prototype, "requiredIcon", void 0);
__decorate([
    property({ type: String })
], MobileDatePicker.prototype, "language", void 0);
__decorate([
    property({ type: String })
], MobileDatePicker.prototype, "value", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MobileDatePicker.prototype, "visible", void 0);
__decorate([
    state()
], MobileDatePicker.prototype, "_inputValue", void 0);
if (!window.customElements.get("kuc-mobile-date-picker")) {
    window.customElements.define("kuc-mobile-date-picker", MobileDatePicker);
}
