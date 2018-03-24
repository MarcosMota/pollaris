import { GridBuilder } from './grid-builder.service';
import { NgGrid, NgGridColunm } from './ng-grid.entity';
import { NgGridService } from './ng-grid.service';
import { Component, Input, trigger, transition, animate, style, Output, EventEmitter } from "@angular/core";
import { NgbDropdownConfig, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Predicate } from '@angular/core/src/debug/debug_node';

@Component({
    selector: 'ng-grid',
    templateUrl: './ng-grid.component.html',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('500ms ease-in-out', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('500ms ease-in-out', style({ opacity: 0 }))
                ])
            ]
        )
    ],
    styleUrls: ['./ng-grid.component.scss'],
    providers: [NgbDropdownConfig]
})
export class NgGridComponent {

    @Input()
    grid: NgGrid;

    @Output()
    select: EventEmitter<any> = new EventEmitter<any>();

    dataSourceAux: any[];
    order: string = 'descricao';
    reverse: boolean = false;
    conditionsFilter: any[] = [
        { id: 1, name: "Igual a", filter: this.filterEquals },
        { id: 2, name: "Diferente de", filter: this.filterNotEquals },
        { id: 3, name: "Contém", filter: this.filterContains },
        { id: 4, name: "Não contém", filter: this.filterNotContains },
        { id: 5, name: "Inica com", filter: this.filterStartWith },
        { id: 6, name: "Termina com", filter: this.filterEndWith }
    ]
    filteres: any[] = [];

    constructor(
        private ngGridService: NgGridService,
        private gridBuilder: GridBuilder,
        config: NgbDropdownConfig
    ) {
        config.autoClose = false;

    }

    onOrderByColumn(column: NgGridColunm): void {
        if (column.field == this.order)
            this.reverse = !this.reverse;
        else
            this.order = column.field;
    }

    onFilterColumn(dropDown: NgbDropdown, column: NgGridColunm, condition: any, value): void {

        this.grid.columns.find(p => p.field == column.field).filtered = true;

        switch (parseInt(condition)) {
            case 1:
                this.filterEquals(column, value);
                break;
            case 2:
                this.filterNotEquals(column, value);
                break;
            case 3:
                this.filterContains(column, value);
                break;
            case 4:
                this.filterNotContains(column, value);
                break;
            case 5:
                this.filterStartWith(column, value);
                break;
            case 6:
                this.filterEndWith(column, value);
                break;
        }

        this.executeFilter();
        dropDown.close();
    }

    onClearFilter(dropDown: NgbDropdown, column: NgGridColunm) {
        this.grid.columns.find(p => p.field == column.field).filtered = false;
        this.grid.dataSource = this.dataSourceAux;
        let index = this.filteres.findIndex(p => p.column == column.field);
        this.filteres.splice(index, 1);
        this.executeFilter();
        dropDown.close();
    }

    filterEquals(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field] == value
        });
    }

    filterNotEquals(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field] != value
        });
    }

    filterContains(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field].indexOf(value) >= 0
        });
    }

    filterNotContains(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field].indexOf(value) == -1
        });
    }

    filterStartWith(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field].startsWith(value)
        });
    }

    filterEndWith(column: NgGridColunm, value) {
        this.filteres.push({
            column: column.field,
            filter: p => p[column.field].endsWith(value)
        });
    }

    executeFilter() {
        debugger;
        if (this.filteres && !this.dataSourceAux)
            this.dataSourceAux = this.grid.dataSource;
        this.filteres.forEach(elem => {
            this.grid.dataSource = this.grid.dataSource.filter(elem.filter);
        })

    }

    public getPlacement(index): string {
        return index == (this.grid.columns.length - 1) ? 'bottom-right' : 'bottom-left';
    }

    onSelect(entity: any) {
        console.log(entity);
        this.select.emit(entity);
    }
}