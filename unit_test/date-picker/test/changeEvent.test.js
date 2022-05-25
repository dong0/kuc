import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { DatePicker } from "../index";
import { padStart } from "../../base/datetime/utils";
describe("DatePicker", () => {
    describe("change event", () => {
        it("should be focus to the second day of month when value is empty and click ArrowRight on date in calendar", async () => {
            let triggeredEvent = null;
            const container = new DatePicker();
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const selectedElRight = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            selectedElRight.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
            await elementUpdated(container);
            const today = new Date();
            const year = today.getFullYear();
            const month = padStart(today.getMonth() + 1);
            const secondDayOfThisMonth = year + "-" + month + "-02";
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal(secondDayOfThisMonth);
        });
        it("should be triggered when ArrowRight/ArrowLeft on date in calendar", async () => {
            let triggeredEvent = null;
            const container = new DatePicker({ value: "2021-12-20" });
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const selectedElRight = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            selectedElRight.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-21");
            const selectedElLeft = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            selectedElLeft.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-20");
        });
        it("should be triggered when ArrowUp/ArrowDown on date in calendar", async () => {
            let triggeredEvent = null;
            const container = new DatePicker({ value: "2021-12-20" });
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const selectedElUp = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            selectedElUp.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-13");
            const selectedElDown = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            selectedElDown.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-20");
        });
        it("should be triggered when mousedown on date in calendar", async () => {
            var _a;
            let triggeredEvent = null;
            const container = new DatePicker({ value: "2021-12-20", language: "en" });
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const selectedElUp = el.querySelector('kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]');
            const nextEl = (_a = selectedElUp.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
            const buttonEl = nextEl.firstElementChild;
            buttonEl.click();
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-21");
        });
        it("should be triggered with error when change value on input", async () => {
            let triggeredEvent = null;
            const container = new DatePicker({
                value: "2021-12-20",
                language: "auto"
            });
            document.documentElement.setAttribute("lang", "en");
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.value = "2021-12/12";
            inputDateEl.dispatchEvent(new Event("change"));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal(undefined);
            inputDateEl.value = "12/12/2021";
            inputDateEl.dispatchEvent(new Event("change"));
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("2021-12-12");
        });
        it("should be triggered when click none button on calendar", async () => {
            let triggeredEvent = null;
            const container = new DatePicker({ value: "2021-12-20", language: "en" });
            container.addEventListener("change", event => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const noneBtnEl = el.querySelector(".kuc-base-datetime-calendar-footer__group__button--none");
            noneBtnEl.click();
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const noneBtnElEmpty = el.querySelector(".kuc-base-datetime-calendar-footer__group__button--none");
            noneBtnElEmpty.click();
            await elementUpdated(container);
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("");
        });
        it("should be 2021-12-13 when change input value", async () => {
            const container = new DatePicker({ value: "2021-12-20", language: "en" });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.value = "12/13/2021";
            inputDateEl.dispatchEvent(new Event("input"));
            await elementUpdated(container);
            await elementUpdated(el);
            expect(inputDateEl.value).to.equal("12/13/2021");
        });
    });
});