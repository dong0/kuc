export function validateProps(props) {
    if (!props || typeof props !== "object")
        return {};
    const validProps = { ...props };
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
export async function throwErrorAfterUpdateComplete(_this, message) {
    await _this.updateComplete;
    throw new Error(message);
}