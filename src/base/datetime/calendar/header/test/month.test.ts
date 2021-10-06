import { expect, fixture } from "@open-wc/testing";
import "../index";

describe("BaseDateTimeCalendarHeader", () => {
  describe("month", () => {
    it("should be 1 when not assigning", async () => {
      const container = document.createElement(
        "kuc-base-datetime-calendar-header"
      );
      const el = await fixture(container);
      const monthSelectEl = el.querySelector(
        ".kuc-base-datetime-month-dropdown__toggle__label"
      ) as HTMLSpanElement;

      const optionMonthEl = el.querySelector(
        ".kuc-base-datetime-month-dropdown__menu"
      ) as HTMLUListElement;

      expect(monthSelectEl.innerText).to.equal("JANUARY");
      expect(optionMonthEl.children[1].children.length).to.equal(12);
    });

    it("should be 5 when assigning 5 by setter", async () => {
      const container = document.createElement(
        "kuc-base-datetime-calendar-header"
      );
      container.setAttribute("month", "5");
      const el = await fixture(container);
      const monthSelectEl = el.querySelector(
        ".kuc-base-datetime-month-dropdown__toggle__label"
      ) as HTMLSpanElement;

      expect(monthSelectEl.innerText).to.equal("MAY");
    });
  });
});
