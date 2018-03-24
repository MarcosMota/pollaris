import { Component, Renderer2, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'index-grid',
    templateUrl: './index-grid.component.html',
    styleUrls: ['./index-grid.component.scss'],
})
export class IndexGridComponent {

    //#region >> Input
    @Input()
    dataSource: any[] = [];

    @Input()
    fieldName: string;

    @Input()
    fieldValue: string;

    @Input()
    title: string;
    //#endregion
    //#region >> Outputs

    constructor(){
        
    }

    ngAfterViewInit() {
        console.log(typeof(this.dataSource));
    }

    @Output()
    select: EventEmitter<any> = new EventEmitter();

    @Output()
    filter: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    @Output()
    newOrEdit: EventEmitter<any> = new EventEmitter();

    @Output()
    edit: EventEmitter<any> = new EventEmitter();
    //#endregion

    selected: any;

    // Chamado quando é um elemento é selecionado
    onSelect(index) {
        if (this.selected == index) {
            this.selected = null;
            this.select.emit({
                selected: false,
                data: this.dataSource[index]
            });
        }
        else{
            this.selected = index;
            this.select.emit({
                selected: true,
                data: this.dataSource[index]
            });
        }
    }

    onFilter() {
        this.filter.emit();
    }

    onNewOrEdit() {
        if (this.selected == null)
            this.newOrEdit.emit({
                type: 'new'
            });
        else
            this.newOrEdit.emit({
                type: 'edit',
                data: this.dataSource[this.selected]
            });

    }

    onDelete() {
        if (this.selected == null) {
            // alertar para selecionar um registro
            return;
        }
        this.delete.emit({
            data: this.dataSource[this.selected]
        });
    }

}