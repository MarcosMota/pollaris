import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NgGrid, NgGridColunm } from './ng-grid.entity';
import { isArray } from 'util';

@Injectable()
export class GridBuilder {

    private grid: NgGrid;

    init(name: string) {
        this.grid = new NgGrid(name);
        return this;
    }

    create() {
        return this.grid;
    }

    dataSource(dataSource: any[] | Observable<any>) {
        if (isArray(dataSource)) {
            this.grid.dataSource = <any[]>dataSource;
            this.grid.dataSourceLoaded = true;
        } else {
            this.grid.dataSourceLoaded = false;
            dataSource = <Observable<any>>dataSource;
            dataSource.subscribe(response => {
                this.grid.dataSource = <any[]>response;
                this.grid.dataSourceLoaded = true;
            }, (error) => {
                console.log('Problemas ao tentar carregar o grid.');
            });
        }
        return this;
    }

    addColumn(column: NgGridColunm) {
        this.grid.columns.push(column);
        return this
    }
}