import { __decorate } from "tslib";
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../../kuc-base";
import { getDisplayingDates, padStart, getLocale } from "../../utils/";
export class BaseDateTimeCalendarBody extends KucBase {
    constructor() {
        super();
        this.month = 1;
        this.year = 2021;
        this.language = "en";
        this.value = "";
        this._month = 1;
        this._year = 2021;
        this._locale = getLocale("en");
        this._handleClickDocument = this._handleClickDocument.bind(this);
        this._handleKeyDownDocument = this._handleKeyDownDocument.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            document.addEventListener("click", this._handleClickDocument);
            document.addEventListener("keydown", this._handleKeyDownDocument);
        }, 1);
    }
    disconnectedCallback() {
        document.removeEventListener("click", this._handleClickDocument);
        document.removeEventListener("keydown", this._handleKeyDownDocument);
        super.disconnectedCallback();
    }
    update(changedProperties) {
        changedProperties.forEach((_oldValue, propName) => {
            propName === "language" && (this._locale = getLocale(this.language));
        });
        if (changedProperties.has("month"))
            this._month = this.month;
        if (changedProperties.has("year"))
            this._year = this.year;
        if (changedProperties.has("value")) {
            const { month, year } = this._separateDateValue();
            this._month = parseInt(month, 10);
            this._year = parseInt(year, 10);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <table class="kuc-base-datetime-calendar-body__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("value")) {
            this._focusDateButtonEl();
        }
        super.update(changedProperties);
    }
    _handleClickDocument() {
        dispatchCustomEvent(this, "kuc:calendar-body-blur", {});
    }
    _handleKeyDownDocument(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            dispatchCustomEvent(this, "kuc:calendar-body-blur", {});
        }
    }
    _handleClickDateBtn(event) {
        event.preventDefault();
        event.stopPropagation();
        const itemEl = event.target;
        itemEl.setAttribute("aria-current", "true");
        const value = itemEl.getAttribute("data-date") || "";
        this._dispatchClickEvent(value);
    }
    _handleKeyDownDateBtn(event) {
        let doPreventEvent = false;
        switch (event.key) {
            case "Up":
            case "ArrowUp": {
                doPreventEvent = true;
                this._moveToDate(-7);
                break;
            }
            case "Down":
            case "ArrowDown": {
                doPreventEvent = true;
                this._moveToDate(7);
                break;
            }
            case "Left":
            case "ArrowLeft": {
                doPreventEvent = true;
                this._moveToDate(-1);
                break;
            }
            case "Right":
            case "ArrowRight": {
                doPreventEvent = true;
                this._moveToDate(1);
                break;
            }
            case " ":
            case "Enter": {
                doPreventEvent = true;
                const value = this._getSelectedValue();
                this._dispatchClickEvent(value);
                break;
            }
            default:
                break;
        }
        if (doPreventEvent) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    _dispatchClickEvent(value) {
        const detail = { oldValue: this.value, value: value };
        dispatchCustomEvent(this, "kuc:calendar-body-click-date", detail);
        this.value = value;
    }
    _isToday(dateParts) {
        const today = new Date();
        return (parseInt(dateParts[0], 10) === today.getFullYear() &&
            parseInt(dateParts[1], 10) === today.getMonth() + 1 &&
            parseInt(dateParts[2], 10) === today.getDate());
    }
    _moveToDate(days) {
        let value = this.value;
        const selectedValue = this._getSelectedValue();
        const { day } = this._separateDateValue(selectedValue);
        value = `${this._year}-${padStart(this._month)}-${day}`;
        const date = new Date(value || this._getValueItemFocused());
        if (isNaN(date.getTime()))
            return;
        date.setDate(date.getDate() + days);
        const nextDate = this._getDateString(date);
        const oldValue = value;
        this.value = nextDate;
        const detail = { oldValue: oldValue, value: nextDate };
        dispatchCustomEvent(this, "kuc:calendar-body-change-date", detail);
    }
    _separateDateValue(value = this.value) {
        const dates = value.split("-");
        return {
            day: dates[2],
            month: dates[1],
            year: dates[0]
        };
    }
    _getSelectedValue() {
        if (this._highlightItem) {
            const button = this._highlightItem.children[0];
            return button.dataset.date || "";
        }
        if (this._selectedItem)
            return this._selectedItem.getAttribute("data-date") || "";
        return "";
    }
    _getValueItemFocused() {
        if (this._focusedItem) {
            return this._focusedItem.getAttribute("data-date") || "";
        }
        return "";
    }
    _getDateClass(dateParts, isThisMonth) {
        if (isThisMonth) {
            const isToday = this._isToday(dateParts);
            if (isToday)
                return " kuc-base-datetime-calendar-body__table__date__button--today";
            return "";
        }
        const isToday = this._isToday(dateParts);
        if (isToday)
            return " kuc-base-datetime-calendar-body__table__date__button--today";
        return " kuc-base-datetime-calendar-body__table__date__button--other-month";
    }
    _getDateString(date = new Date()) {
        const year = date.getFullYear();
        const month = padStart(date.getMonth() + 1);
        const day = padStart(date.getDate());
        return `${year}-${month}-${day}`;
    }
    _isSameDayOfMoment(dates) {
        const month = parseInt(dates[1], 10);
        const day = parseInt(dates[2], 10);
        const year = parseInt(dates[0], 10);
        let dateFocused = new Date().getDate();
        const currentDay = this.value.split("-")[2];
        if (!currentDay)
            return false;
        if (this.value)
            dateFocused = new Date(this.value).getDate();
        if (dateFocused === day && month === this._month)
            return true;
        const lastDayOfMonth = new Date(year, this._month, 0).getDate();
        if (dateFocused > lastDayOfMonth &&
            lastDayOfMonth === day &&
            month === this._month)
            return true;
        return false;
    }
    _getHeaderItemsTemplate() {
        return html `
      <thead>
        <tr>
          ${this._locale.WEEK_DAYS.map(wday => {
            return html `
              <th
                class="kuc-base-datetime-calendar-body__table__header"
                role="columnheader"
                abbr="${wday.abbr}"
              >
                ${wday.text}
              </th>
            `;
        })}
        </tr>
      </thead>
    `;
    }
    _getDateItemsTemplate() {
        const displayingDates = getDisplayingDates(this._year, this._month - 1);
        return html `
      <tbody>
        ${displayingDates.map(weeks => {
            return html `
            <tr>
              ${weeks.map((weekDate) => {
                const dateParts = weekDate.text.split("-");
                const isSameDate = this._isSameDayOfMoment(dateParts);
                const isThisMonth = parseInt(dateParts[1], 10) === this._month;
                return html `
                  <td
                    role="gridcell"
                    class="kuc-base-datetime-calendar-body__table__date${(this
                    .value === weekDate.attr ||
                    isSameDate) &&
                    isThisMonth
                    ? "--selected"
                    : ""}"
                  >
                    <button
                      aria-current="${this.value === weekDate.attr}"
                      tabindex="${(this.value === weekDate.attr ||
                    isSameDate) &&
                    isThisMonth
                    ? "0"
                    : "-1"}"
                      class="kuc-base-datetime-calendar-body__table__date__button${this._getDateClass(dateParts, isThisMonth)}"
                      data-date="${weekDate.attr}"
                      @click="${this._handleClickDateBtn}"
                      @keydown="${this._handleKeyDownDateBtn}"
                    >
                      ${dateParts[2] || ""}
                    </button>
                  </td>
                `;
            })}
            </tr>
          `;
        })}
      </tbody>
    `;
    }
    _focusDateButtonEl() {
        const buttonEl = this._focusedItem;
        if (!buttonEl)
            return;
        buttonEl.focus({ preventScroll: true });
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-datetime-calendar-body,
        kuc-base-datetime-calendar-body *,
        :lang(en) kuc-base-datetime-calendar-body,
        :lang(en) kuc-base-datetime-calendar-body * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-base-datetime-calendar-body,
        :lang(ja) kuc-base-datetime-calendar-body * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-base-datetime-calendar-body,
        :lang(zh) kuc-base-datetime-calendar-body * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        .kuc-base-datetime-calendar-body__table,
        .kuc-base-datetime-calendar-body__table tr {
          border-collapse: separate;
          border-spacing: 0;
        }
        .kuc-base-datetime-calendar-body__table__date,
        .kuc-base-datetime-calendar-body__table__date--selected {
          border-spacing: 1px;
          padding: 0px;
          border: 1px solid #ffffff;
        }
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button,
        .kuc-base-datetime-calendar-body__table__date--selected
          .kuc-base-datetime-calendar-body__table__date__button,
        .kuc-base-datetime-calendar-body__table__header {
          text-align: center;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 400;
          color: #333333;
        }
        :lang(ja) th.kuc-base-datetime-calendar-body__table__header {
          font-weight: 700;
        }
        .kuc-base-datetime-calendar-body__table__date--selected
          .kuc-base-datetime-calendar-body__table__date__button,
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button,
        .kuc-base-datetime-calendar-body__table__header {
          box-sizing: border-box;
          padding: 8px 0;
          width: 36px;
          height: 31px;
          border: 1px solid #ffffff;
        }
        .kuc-base-datetime-calendar-body__table__header:nth-child(1),
        .kuc-base-datetime-calendar-body__table__header:nth-child(7) {
          color: #d4d7d7;
        }
        .kuc-base-datetime-calendar-body__table__date--selected
          .kuc-base-datetime-calendar-body__table__date__button,
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button {
          background: none;
          cursor: pointer;
        }
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button:hover {
          color: #000000;
        }
        .kuc-base-datetime-calendar-body__table__date--selected {
          border: 1px solid #3498db;
          box-sizing: border-box;
        }
        .kuc-base-datetime-calendar-body__table__date--selected
          .kuc-base-datetime-calendar-body__table__date__button {
          outline: none;
        }
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button:focus-visible {
          outline: none;
        }
        .kuc-base-datetime-calendar-body__table__date--selected
          .kuc-base-datetime-calendar-body__table__date__button--today,
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button--today {
          color: #ffffff;
          background: #888888;
          border: none;
        }
        .kuc-base-datetime-calendar-body__table__date__button--today:hover {
          color: #333333;
        }
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button--other-month,
        .kuc-base-datetime-calendar-body__table__date
          .kuc-base-datetime-calendar-body__table__date__button--other-month:hover {
          color: #d4d7d7;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: Number })
], BaseDateTimeCalendarBody.prototype, "month", void 0);
__decorate([
    property({ type: Number })
], BaseDateTimeCalendarBody.prototype, "year", void 0);
__decorate([
    property({ type: String })
], BaseDateTimeCalendarBody.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseDateTimeCalendarBody.prototype, "value", void 0);
__decorate([
    state()
], BaseDateTimeCalendarBody.prototype, "_month", void 0);
__decorate([
    state()
], BaseDateTimeCalendarBody.prototype, "_year", void 0);
__decorate([
    query('.kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]')
], BaseDateTimeCalendarBody.prototype, "_selectedItem", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-body__table__date--selected")
], BaseDateTimeCalendarBody.prototype, "_highlightItem", void 0);
__decorate([
    query('.kuc-base-datetime-calendar-body__table__date__button[tabindex="0"]')
], BaseDateTimeCalendarBody.prototype, "_focusedItem", void 0);
if (!window.customElements.get("kuc-base-datetime-calendar-body")) {
    window.customElements.define("kuc-base-datetime-calendar-body", BaseDateTimeCalendarBody);
}