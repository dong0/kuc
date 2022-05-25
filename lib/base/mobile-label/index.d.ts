import { KucBase } from "../kuc-base";
export declare class BaseMobileLabel extends KucBase {
    requiredIcon: boolean;
    guid: string;
    text: string;
    render(): import("lit").TemplateResult<1>;
    private _getTextTemplate;
    private _getStyleTagTemplate;
}