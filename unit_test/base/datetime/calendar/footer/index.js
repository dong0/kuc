import { __decorate } from "tslib";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../../kuc-base";
import { getLocale } from "../../utils";
import { CALENDAR_FOOTER_CSS } from "./style";
export class BaseDateTimeCalendarFooter extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    _handleClickCalendarFooterButtonNone(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:calendar-footer-click-none");
    }
    _handleClickCalendarFooterButtonToday(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:calendar-footer-click-today");
    }
    _handleKeyDownCalendarFooterButtonNone(event) {
        if (event.key !== "Tab")
            return;
        if (event.shiftKey)
            return;
        event.preventDefault();
        dispatchCustomEvent(this, "kuc:calendar-footer-tab-none");
    }
    render() {
        return html `
      <div class="kuc-base-datetime-calendar-footer__group">
        <button
          type="button"
          tabindex="0"
          class="kuc-base-datetime-calendar-footer__group__button kuc-base-datetime-calendar-footer__group__button--today"
          @click="${this._handleClickCalendarFooterButtonToday}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.today}
        </button>
        <span class="kuc-base-datetime-calendar-footer__group__center"></span>
        <button
          type="button"
          tabindex="0"
          class="kuc-base-datetime-calendar-footer__group__button kuc-base-datetime-calendar-footer__group__button--none"
          @click="${this._handleClickCalendarFooterButtonNone}"
          @keydown="${this._handleKeyDownCalendarFooterButtonNone}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.none}
        </button>
      </div>
    `;
    }
}
__decorate([
    property({ type: String })
], BaseDateTimeCalendarFooter.prototype, "language", void 0);
__decorate([
    state()
], BaseDateTimeCalendarFooter.prototype, "_locale", void 0);
if (!window.customElements.get("kuc-base-datetime-calendar-footer")) {
    createStyleOnHeader(CALENDAR_FOOTER_CSS);
    window.customElements.define("kuc-base-datetime-calendar-footer", BaseDateTimeCalendarFooter);
}