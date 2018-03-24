import { EntityDecorator, Column } from './../../../thema/core/metadata/decorators.entity';
import { Entity } from '../../../thema/core';
import "reflect-metadata";
import { getType } from "reflect-helper";
import { Validators } from '@angular/forms';
import { ControlTypeEnum } from '../../../thema/forms/input/dynamic-form/enums/control-type.enum';


@Entity({
    controllerName: 'http://localhost:5000/api/contato'
})
export class Agenda {

    @Column({ identifyKey: true, field: 'Código', validators: [Validators.required], controlType: ControlTypeEnum.Hidden })
    Id: number;

    @Column({ field: 'Nome', validators: [Validators.required], controlType: ControlTypeEnum.Textbox })
    Nome: string;

    @Column({ field: 'Endereço', validators: [Validators.required], controlType: ControlTypeEnum.Textbox })
    End: string;

    @Column({ field: 'E-Mail', validators: [Validators.required], controlType: ControlTypeEnum.Email })
    Email: string;

    @Column({ field: 'Numero', validators: [Validators.required], controlType: ControlTypeEnum.Numeric })
    Numero: number;

}

