import { GridColumnType } from '../enums/grid-column-type.enum';
import { TextValuePair } from './text-value-pair';

export class GridColumn {
    key: string;
    header: string;
    type: GridColumnType;
    options?: TextValuePair[]
    required?: boolean;
    width?: number;

    constructor(
        key: string,
        header: string,
        type: GridColumnType,
        options?: TextValuePair[],
        required?: boolean,
        width?: number) {
        this.key = key;
        this.header = header;
        this.type = type;
        this.options = options || [];
        this.required = required || false;
        this.width = width || 25;
    }
}