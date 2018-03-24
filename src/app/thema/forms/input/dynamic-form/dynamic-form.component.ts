import { InputValidator } from './../input-validator.class';
import { Component, Input, SimpleChanges, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, DefaultIterableDiffer, IterableDiffers, IterableDiffer } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormItem } from './model/form-item';
import { GridModel } from '../ng-grid/model/grid-model';
import { ControlTypeEnum } from './enums/control-type.enum';
import { DynamicFormControl } from './model/dynamic-form-control';
import { KeysPipe } from '../ng-grid/keys-pipe';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent extends InputValidator {
    @Input('controls') controls: DynamicFormControl[];
    
    @Output('save') save = new EventEmitter<any>();
    
    @Output('reset') reset = new EventEmitter<any>();
    
    iterableDiffer:any;

    dynamicForm: FormGroup;

    constructor(
        private _iterableDiffers: IterableDiffers,
        private fb: FormBuilder
    ) {
        super();
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);

    }

    /**
     * @description Observa a mudança da variável controls para criar o formulário dinamicamente
     * @event LifeCicleHooks
     * @param changes 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['controls']) {
            console.log('changes detected');
            this.buildFormControls();
        } else {
            this.dynamicForm = this.fb.group({});
        }
    }


    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.controls);
        if (changes) {
            console.log('changes detected');
        }
    }

    // Gera as instâncias de formControls, ou formArrays baseado em cada controle
    private buildFormControls(): void {
        this.dynamicForm = this.fb.group({});
        for (const control of this.controls) {
            // FormArray usado para o controle do tipo grid
            if (control.type === ControlTypeEnum.Grid) {
                this.dynamicForm.addControl(control.key, this.fb.array([]))
            } else {
                this.dynamicForm.addControl(
                    control.key,
                    new FormControl(control.value));
            }
        }
    }

    // Retorna o tipo de controle a ser renderizado
    getControlType(index: number): ControlTypeEnum {
        return this.controls[index].type;
    }

    // Emite os valores para quem assinou o event emitter(Output property onSubmit)
    getValues(): void {
        if (this.dynamicForm.invalid)
            this.setFormAsTouched();

        this.save.emit(this.dynamicForm);

    }

    onCancel() {
        this.dynamicForm.reset();
        this.reset.emit();
    }

    private setFormAsTouched(): void {
        for (let inner in this.dynamicForm.controls) {
            this.dynamicForm.get(inner).markAsTouched();
        }
    }
}
