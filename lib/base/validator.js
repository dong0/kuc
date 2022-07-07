var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { convertTimeValueToMinutes } from "./datetime/utils";
export function validateProps(props) {
    if (!props || typeof props !== "object")
        return {};
    const validProps = Object.assign({}, props);
    for (const _propName in validProps) {
        if (Object.prototype.hasOwnProperty.call(validProps, _propName) &&
            validProps[_propName] === undefined) {
            delete validProps[_propName];
        }
    }
    return validProps;
}
export function validateDateValue(value) {
    const regex = /(^(\d{1,4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$)|(^(\d{1,4})$)|(^(\d{1,4})-(0?[1-9]|1[0-2])$)/g;
    if (value === "" || value === undefined || regex.test(value))
        return true;
    return false;
}
export function validateTimeValue(value) {
    const regexHour24 = /^(2[0-3]|[01]?[0-9]):([0-9]|[0-5][0-9])$/;
    if (value === "" || regexHour24.test(value))
        return true;
    return false;
}
export function validateTimeStepNumber(timeStep) {
    if (typeof timeStep !== "number") {
        return false;
    }
    return true;
}
export function validateTimeStep(timeStep, max, min) {
    const _tempTimeStep = Math.round(timeStep);
    const maxMinutes = convertTimeValueToMinutes(max);
    const minMinutes = convertTimeValueToMinutes(min);
    return (!isNaN(_tempTimeStep) &&
        _tempTimeStep > 0 &&
        _tempTimeStep <= maxMinutes - minMinutes);
}
export function isValidDate(date) {
    const [year, month, day] = date.split("-");
    const dateObj = new Date(date);
    const newYear = dateObj.getFullYear();
    const newMonth = dateObj.getMonth();
    const newDay = dateObj.getDate();
    if (newYear === Number(year) &&
        newMonth === Number(month) - 1 &&
        newDay === Number(day))
        return true;
    return false;
}
export function validateItems(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    return true;
}
export function validateValueArray(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    return true;
}
export function validateValueString(value) {
    if (typeof value !== "string") {
        return false;
    }
    return true;
}
export function validateSelectedIndexArray(selectedIndex) {
    if (!Array.isArray(selectedIndex)) {
        return false;
    }
    return true;
}
export function validateSelectedIndexNumber(selectedIndex) {
    if (typeof selectedIndex !== "number") {
        return false;
    }
    return true;
}
export function validateDateTimeValue(date, time) {
    const regexDate = /(^(\d{4})-(0[0-9]|1[0-2])-(0[1-9]|([12][0-9]|3[01]))$)|(^(\d{4})$)|(^(\d{4})-(0[0-9]|1[0-2])$)/g;
    const regexTime = /(^([01][0-9]|2[0-3])$)|(^([01][0-9]|2[0-3]):([0-5][0-9]))$|(^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/;
    if (!regexDate.test(date) || !regexTime.test(time))
        return false;
    return true;
}
export function throwErrorAfterUpdateComplete(_this, message) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _this.updateComplete;
        throw new Error(message);
    });
}