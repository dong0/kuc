import { html, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import {
  KucBase,
  CustomEventDetail,
  dispatchCustomEvent
} from "../../../kuc-base";
import { getDisplayingDates, WeekDate, getLocale } from "../../utils/";

export class BaseMobileDateTimeCalendarBody extends KucBase {
  @property({ type: Number }) month = 1;
  @property({ type: Number }) year = 2021;
  @property({ type: String }) language = "en";
  @property({ type: String, reflect: true }) value = "";

  @state() _month = 1;
  @state() _year = 2021;

  @query(
    '.kuc-base-mobile-datetime-calendar-body__table__date__button[tabindex="0"]'
  )
  private _focusedItem!: HTMLButtonElement;

  private _locale = getLocale("en");

  constructor() {
    super();
    this._handleClickDocument = this._handleClickDocument.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      document.addEventListener("click", this._handleClickDocument);
    }, 1);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this._handleClickDocument);
    super.disconnectedCallback();
  }

  update(changedProperties: PropertyValues) {
    changedProperties.forEach((_oldValue, propName) => {
      propName === "language" && (this._locale = getLocale(this.language));
    });
    if (changedProperties.has("month")) this._month = this.month;
    if (changedProperties.has("year")) this._year = this.year;
    if (changedProperties.has("value")) {
      const { month, year } = this._separateDateValue();
      this._month = parseInt(month, 10);
      this._year = parseInt(year, 10);
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      ${this._getStyleTagTemplate()}
      <table class="kuc-base-mobile-datetime-calendar-body__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `;
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("value")) {
      this._focusDateButtonEl();
    }
    super.update(changedProperties);
  }

  private _handleClickDocument() {
    dispatchCustomEvent(this, "kuc:mobile-calendar-body-blur", {});
  }

  private _handleClickDateBtn(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    const itemEl = event.target as HTMLButtonElement;
    itemEl.setAttribute("aria-current", "true");

    const value = itemEl.getAttribute("data-date") || "";
    this._dispatchClickEvent(value);
  }

  private _dispatchClickEvent(value: string) {
    const detail: CustomEventDetail = { oldValue: this.value, value: value };
    dispatchCustomEvent(this, "kuc:mobile-calendar-body-click-date", detail);
    this.value = value;
  }

  private _isToday(dateParts: string[]) {
    const today = new Date();
    return (
      parseInt(dateParts[0], 10) === today.getFullYear() &&
      parseInt(dateParts[1], 10) === today.getMonth() + 1 &&
      parseInt(dateParts[2], 10) === today.getDate()
    );
  }

  private _separateDateValue(value = this.value) {
    const dates = value.split("-");
    return {
      day: dates[2],
      month: dates[1],
      year: dates[0]
    };
  }

  private _getDateClass(dateParts: string[], isThisMonth: boolean) {
    if (isThisMonth) {
      const isToday = this._isToday(dateParts);
      if (isToday)
        return " kuc-base-mobile-datetime-calendar-body__table__date__button--today";

      return "";
    }
    const isToday = this._isToday(dateParts);
    if (isToday)
      return " kuc-base-mobile-datetime-calendar-body__table__date__button--today";
    return " kuc-base-mobile-datetime-calendar-body__table__date__button--other-month";
  }

  private _isSameDayOfMoment(dates: string[]) {
    const month = parseInt(dates[1], 10);
    const day = parseInt(dates[2], 10);
    const year = parseInt(dates[0], 10);
    let dateFocused = new Date().getDate();

    const currentDay = this.value.split("-")[2];
    if (!currentDay) return false;

    if (this.value) dateFocused = new Date(this.value).getDate();
    if (dateFocused === day && month === this._month) return true;
    const lastDayOfMonth = new Date(year, this._month, 0).getDate();
    if (
      dateFocused > lastDayOfMonth &&
      lastDayOfMonth === day &&
      month === this._month
    )
      return true;
    return false;
  }

  private _getHeaderItemsTemplate() {
    return html`
      <thead>
        <tr>
          ${this._locale.MOBILE_WEEK_DAYS.map(wday => {
            return html`
              <th
                class="kuc-base-mobile-datetime-calendar-body__table__header"
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

  private _getDateItemsTemplate() {
    const displayingDates = getDisplayingDates(this._year, this._month - 1);
    return html`
      <tbody>
        ${displayingDates.map(weeks => {
          return html`
            <tr>
              ${weeks.map((weekDate: WeekDate) => {
                const dateParts = weekDate.text.split("-");
                const isSameDate = this._isSameDayOfMoment(dateParts);
                const isThisMonth = parseInt(dateParts[1], 10) === this._month;
                return html`
                  <td
                    role="gridcell"
                    class="kuc-base-mobile-datetime-calendar-body__table__date${(this
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
                      class="kuc-base-mobile-datetime-calendar-body__table__date__button${this._getDateClass(
                        dateParts,
                        isThisMonth
                      )}"
                      data-date="${weekDate.attr}"
                      @click="${this._handleClickDateBtn}"
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

  private _focusDateButtonEl() {
    const buttonEl = this._focusedItem as HTMLButtonElement;
    if (!buttonEl) return;
    buttonEl.focus();
  }

  private _getStyleTagTemplate() {
    return html`
      <style>
        kuc-base-mobile-datetime-calendar-body,
        kuc-base-mobile-datetime-calendar-body *,
        :lang(en) kuc-base-mobile-datetime-calendar-body,
        :lang(en) kuc-base-mobile-datetime-calendar-body * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-base-mobile-datetime-calendar-body,
        :lang(ja) kuc-base-mobile-datetime-calendar-body * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-base-mobile-datetime-calendar-body,
        :lang(zh) kuc-base-mobile-datetime-calendar-body * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        .kuc-base-mobile-datetime-calendar-body__table,
        .kuc-base-mobile-datetime-calendar-body__table tr {
          border-collapse: separate;
          border-spacing: 0;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date,
        .kuc-base-mobile-datetime-calendar-body__table__date--selected {
          border-spacing: 1px;
          padding: 0px;
          border: 1px solid #ffffff;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button,
        .kuc-base-mobile-datetime-calendar-body__table__date--selected
          .kuc-base-mobile-datetime-calendar-body__table__date__button,
        .kuc-base-mobile-datetime-calendar-body__table__header {
          text-align: center;
          font-size: 10px;
          font-weight: 400;
          color: #333333;
        }
        th.kuc-base-mobile-datetime-calendar-body__table__header {
          font-weight: 700;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date--selected
          .kuc-base-mobile-datetime-calendar-body__table__date__button,
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button,
        .kuc-base-mobile-datetime-calendar-body__table__header {
          box-sizing: border-box;
          padding: 8px 0;
          width: 36px;
          height: 31px;
          border: 1px solid #ffffff;
        }
        .kuc-base-mobile-datetime-calendar-body__table__header:nth-child(1),
        .kuc-base-mobile-datetime-calendar-body__table__header:nth-child(7) {
          color: #d4d7d7;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date--selected
          .kuc-base-mobile-datetime-calendar-body__table__date__button,
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button {
          background: none;
          cursor: pointer;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button:hover {
          color: #000000;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date--selected {
          border: 1px solid #3498db;
          box-sizing: border-box;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date--selected
          .kuc-base-mobile-datetime-calendar-body__table__date__button {
          outline: none;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button:focus-visible {
          outline: none;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date--selected
          .kuc-base-mobile-datetime-calendar-body__table__date__button--today,
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button--today {
          color: #ffffff;
          background: #888888;
          border: none;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date__button--today:hover {
          color: #333333;
        }
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button--other-month,
        .kuc-base-mobile-datetime-calendar-body__table__date
          .kuc-base-mobile-datetime-calendar-body__table__date__button--other-month:hover {
          color: #d4d7d7;
        }
      </style>
    `;
  }
}

if (!window.customElements.get("kuc-base-mobile-datetime-calendar-body")) {
  window.customElements.define(
    "kuc-base-mobile-datetime-calendar-body",
    BaseMobileDateTimeCalendarBody
  );
}
