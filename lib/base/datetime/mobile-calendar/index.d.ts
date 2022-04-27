import { PropertyValues } from "lit";
import { KucBase } from "../../kuc-base";
import "./header";
import "./body";
import "./footer";
export declare class BaseMobileDateTimeCalendar extends KucBase {
    language: string;
    value: string;
    _month: number;
    _year: number;
    update(changedProperties: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    updated(changedProperties: PropertyValues): void;
    private _getStyleTagTemplate;
    private _handleClickCalendarGroup;
    private _handleCalendarHeaderChange;
    private _updateValue;
    private _separateValue;
}
