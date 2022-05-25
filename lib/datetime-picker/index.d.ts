import { PropertyValues } from "lit";
import { KucBase } from "../base/kuc-base";
import "../base/datetime/date";
import "../base/datetime/time";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
declare type DateTimePickerProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    language?: "ja" | "en" | "zh" | "auto";
    value?: string;
    disabled?: boolean;
    hour12?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
};
export declare class DateTimePicker extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    language: string;
    value?: string | undefined;
    disabled: boolean;
    hour12: boolean;
    requiredIcon: boolean;
    visible: boolean;
    private _dateInput;
    private _baseLabelEl;
    private _baseErrorEl;
    private _dateValue;
    private _timeValue;
    private _previousTimeValue;
    private _previousDateValue;
    private _errorFormat;
    private _errorText;
    private _GUID;
    private _dateAndTime;
    private _dateConverted;
    private _changeDateByUI;
    private _changeTimeByUI;
    constructor(props?: DateTimePickerProps);
    protected shouldUpdate(_changedProperties: PropertyValues): boolean;
    willUpdate(_changedProperties: PropertyValues): void;
    private _updateValueChangeByUI;
    private _validateDateTimeFormat;
    private _updateValueWhenSetter;
    private _setDateTimeValueSeparate;
    update(changedProperties: PropertyValues): void;
    private _setUndefinedValue;
    private _setEmptyValue;
    render(): import("lit").TemplateResult<1>;
    updated(): void;
    private _resetState;
    private _updateErrorWidth;
    private _handleDateChange;
    private _handleTimeChange;
    private _updateDateTimeValue;
    private _getDateTimeString;
    private _getDateTimeValue;
    private _getLanguage;
    private _getStyleTagTemplate;
}