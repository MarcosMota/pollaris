import { TextValuePair } from "../../ng-grid/model/text-value-pair";
import { ControlTypeEnum } from "../enums/control-type.enum";

export class FormItem {
    // Label do controle
    label: string;

    // Opções caso o controle seja um select
    options?: TextValuePair[];

    constructor(
        label: string,
        options?: TextValuePair[]
    ) {
        this.label = label;
        this.options = options || [];
    }
}
