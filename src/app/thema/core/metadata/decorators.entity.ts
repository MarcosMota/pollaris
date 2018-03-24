
import { Validators } from '@angular/forms';
import { makeDecorator } from "../reflect";
import { ControlTypeEnum } from '../../forms/input/dynamic-form/enums/control-type.enum';

export interface EntityDecorator {

    controllerName: string
}

export class EntityAnnotation {

    constructor(public config: EntityDecorator) {
    }
}

export const Entity: (config: EntityDecorator) => ClassDecorator = makeDecorator(EntityAnnotation);

export interface ColumnDecorator {

    /** Primary Key */
    identifyKey?: boolean;

    /** field for show in grid */
    field?: string;

    /** validators for form dynamics */
    validators?: Validators[]

    controlType?: ControlTypeEnum;

    css?: string;
}

export class ColumnAnnotation {

    /** Primary Key */
    identifyKey?: boolean;

    /** field for show in grid */
    field?: string;

    /** validators for form dynamics */
    validators?: Validators[]

    controlType?: ControlTypeEnum;

    css?: string;

    constructor(config: ColumnDecorator) {
        this.identifyKey = config.identifyKey;
        this.field = config.field;
        this.validators = config.validators;
        this.controlType = config.controlType;
    }
}

export const Column: (config: ColumnDecorator) => PropertyDecorator = makeDecorator(ColumnAnnotation);


export interface JsonIgnoreDecorator {

    controllerName: string
}

export class JsonIgnoreAnnotation {

    constructor(public config: JsonIgnoreDecorator) {
    }
}

export const JsonIgnore: (config: EntityDecorator) => PropertyDecorator = makeDecorator(JsonIgnoreAnnotation);

