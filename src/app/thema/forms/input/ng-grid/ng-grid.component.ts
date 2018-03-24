import { Component, Input, SimpleChange, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { KeysPipe } from './keys-pipe';
import { TextValuePair } from './model/text-value-pair';
import { GridColumnType } from './enums/grid-column-type.enum';
import { GridModel } from './model/grid-model';

/**
 * Estrutura do component: formGroup possui um formArray<FormGroup>[]
 * Cada elemento do formArray é uma linha (do tipo FormGroup)
 * Cada formGroup (linha) é composto por n-colunas, sendo cada coluna um formControl
 * Cada formControl é construído com base numa GridColumn
 */
@Component({
    selector: 'ng-grid',
    templateUrl: './ng-grid.component.html',
    styleUrls: ['./ng-grid.component.scss']
})
export class NgGridComponent {
    // Input variabel base para criação do grid
    @Input('model') model: GridModel;
    @Input('parentFormGroup') parentFormGroup: FormGroup;
    @Input('controlName') formControlName;
    @Input('dataSource') dataSource: any;

    // Cabeçalhos
    private headers: string[];

    constructor(
        private formBuilder: FormBuilder
    ) { }

    // Constrói os cabeçalhos do grid
    private buildHeader(): void {
        this.headers = [];
        for (let column of this.model.getColumns()) {
            this.headers.push(column.header);
        }
    }

    // Verifica o binding do parent component para recriar o grid
    ngOnChanges(changes: SimpleChange) {
        if (changes['model'] && this.model) {
            this.buildHeader();
        }

        if (this.model && changes['dataSource']) {
            this.updateDataSource();
        }
    }

    // Atualiza o dataSource do grid
    private updateDataSource(): void {
        for (let dataItem of this.dataSource) {
            this.addRow(dataItem)
        }
    }

    // Retorna o tipo de controle baseado no modelo (input)
    private getControlType(index: number): GridColumnType {
        const result = this.model.getColumn(index).type;
        return result;
    }

    // Retorna uma coleção de KeyValuePair<value, text>[] para ser utilizada nos tipos combobox
    private getControlOptions(index: number): TextValuePair[] {
        const result: TextValuePair[] = this.model.getColumn(index).options;
        return result;
    }

    // Retorna o nome do controle baseado no modelo (input)
    private getControlName(index: number): string {
        const result = this.model.getColumn(index).key;
        return result;
    }

    // Retorna a largura definida em cada coluna baseando-se no modelo
    private getControlWidth(index: number): string {
        const result = this.model.getColumn(index).width;
        return result + "%";
    }

    // Retorna o grupo de formulários (cada formGroup é uma linha)
    getFormGroups(): FormGroup[] {
        return <FormGroup[]>((<FormArray>this.parentFormGroup.controls[this.formControlName]).controls);
    }

    // Adiciona uma linha, sendo essa linha um formGroup
    public addRow(dataItem?: any): void {
        // if (!this.parentFormGroup.valid) return;
        const grid = <FormArray>this.parentFormGroup.controls[this.formControlName];
        const row: FormGroup = this.getRow(dataItem);
        grid.push(row);
    }

    // Instancia e retorna um formGroup onde cada formControl é uma coluna baseada na modelo (input)
    private getRow(dataItem?: any): FormGroup {
        let result = new FormGroup({});

        for (let column of this.model.getColumns()) {
            const controlValue = dataItem === undefined ? null : dataItem[column.key];
            result.addControl(
                column.key,
                new FormControl(controlValue, column.required ? Validators.required : null));
        }

        return result;
    }

    // Remove uma linha do grid e caso o grid não tenha linhas
    // reseta o estado inicial do grid
    protected removeRow(index): void {
        (<FormArray>this.parentFormGroup.controls[this.formControlName]).controls.splice(index, 1);
        if ((<FormArray>this.parentFormGroup.controls[this.formControlName]).controls.length == 0) {
            this.parentFormGroup.controls[this.formControlName].reset();
        }
    }
}