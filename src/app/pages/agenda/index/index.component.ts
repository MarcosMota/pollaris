import { Router } from '@angular/router';
import { AgendaRepository } from './../agenda.repository';
import { Component } from '@angular/core';
import { NgGrid, NgGridColunm } from '../../../thema/components/ng-grid/ng-grid.entity';
import { GridBuilder } from '../../../thema/components/ng-grid/grid-builder.service';
import { NgGridService } from '../../../thema/components/ng-grid/ng-grid.service';

@Component({
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.scss'],
    providers: [AgendaRepository]
})
export class IndexComponent {
    grid: NgGrid;

    dataSource: any[] = [];

    fieldName: string;

    fieldValue: string;

    title: string;

    selected: any;

    //#endregion
    //#region >> Outputs
    constructor(
        private ngGridService: NgGridService,
        private agendaRepository: AgendaRepository,
        private router: Router,
        private gridBuilder: GridBuilder) {

        this.grid = gridBuilder
            .init('Produtos')
            .addColumn(new NgGridColunm({
                field: 'id',
                description: '#',
                type: 'number',
                filtable: false,
                width: 'auto'
            }))
            .addColumn(new NgGridColunm({
                field: 'nome',
                description: 'Descrição',
                type: 'text',
                width: 'auto'
            }))
            .dataSource(
                this.agendaRepository.getAll()
            )
            .create();
    }

    // Chamado quando é um elemento é selecionado
    onSelect(entity) {
        
        console.log(entity);
    }

    onFilter() {

    }

    onNewOrEdit() {
        this.router.navigate(['/pages/agenda/createEdit']);
    }

    onDelete() {

    }

}