import { expect, fixture, elementUpdated } from "@open-wc/testing";
import { getTodayStringByLocale } from "../../utils";
import "../index";
describe("BaseMobileDate", () => {
    describe("kuc:mobile-base-date-change", () => {
        it("should be triggered when pressing date on calendar", async () => {
            let triggeredEvent = null;
            const container = document.createElement("kuc-mobile-base-date");
            container.setAttribute("value", "2022-02-14");
            container.addEventListener("kuc:mobile-base-date-change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            inputEl.click();
            await elementUpdated(container);
            const dateSelected = el.querySelector(".kuc-base-mobile-datetime-calendar-body__table__date--selected");
            const dateNext = dateSelected === null || dateSelected === void 0 ? void 0 : dateSelected.nextElementSibling;
            dateNext.click();
            await elementUpdated(container);
            expect(inputEl.value).to.equal("02/15/2022");
            expect(triggeredEvent.type).to.equal("kuc:mobile-base-date-change");
        });
        it("should not triggered when pressing the same date on calendar", async () => {
            let triggeredEvent = null;
            const container = document.createElement("kuc-mobile-base-date");
            container.setAttribute("value", "2022-02-14");
            container.addEventListener("kuc:mobile-base-date-change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            inputEl.click();
            await elementUpdated(container);
            const dateSelected = el.querySelector(".kuc-base-mobile-datetime-calendar-body__table__date--selected");
            dateSelected.click();
            await elementUpdated(container);
            expect(inputEl.value).to.equal("02/14/2022");
            expect(triggeredEvent).to.equal(null);
        });
        it("should triggered when pressing none button on calendar", async () => {
            let triggeredEvent = null;
            const container = document.createElement("kuc-mobile-base-date");
            container.addEventListener("kuc:mobile-base-date-change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            inputEl.click();
            await elementUpdated(container);
            const noneButton = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--none");
            noneButton.click();
            await elementUpdated(container);
            expect(inputEl.value).to.equal("");
            expect(triggeredEvent.type).to.equal("kuc:mobile-base-date-change");
            expect(triggeredEvent.detail.value).to.equal("");
        });
        it("should triggered when pressing none button on calendar", async () => {
            const container = document.createElement("kuc-mobile-base-date");
            container.setAttribute("value", "2022-02-14");
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            inputEl.click();
            await elementUpdated(container);
            const noneButton = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--none");
            noneButton.click();
            await elementUpdated(container);
            expect(inputEl.value).to.equal("");
        });
        it("should triggered when pressing today button on calendar", async () => {
            let triggeredEvent = null;
            const container = document.createElement("kuc-mobile-base-date");
            container.addEventListener("kuc:mobile-base-date-change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            inputEl.click();
            await elementUpdated(container);
            const todayButton = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--today");
            todayButton.click();
            await elementUpdated(container);
            const todayString = getTodayStringByLocale("en");
            expect(inputEl.value).to.equal(todayString);
            expect(triggeredEvent.type).to.equal("kuc:mobile-base-date-change");
        });
        it("should close calendar when pressing close button", async () => {
            let triggeredEvent = null;
            const container = document.createElement("kuc-mobile-base-date");
            container.setAttribute("value", "2022-02-14");
            container.addEventListener("kuc:mobile-base-date-change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-base-date__group__input");
            const iconCalendar = el.querySelector(".kuc-mobile-base-date__group__button");
            inputEl.click();
            await elementUpdated(container);
            const closeButton = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--close");
            iconCalendar.click();
            await elementUpdated(container);
            closeButton.click();
            await elementUpdated(container);
            const calendar = el.querySelector(".kuc-base-mobile-date__calendar");
            expect(inputEl.value).to.equal("02/14/2022");
            expect(triggeredEvent).to.equal(null);
            expect(calendar).to.equal(null);
        });
    });
});