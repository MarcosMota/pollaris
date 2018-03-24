import { GridColumn } from "./grid-column";

export class GridModel {
    private columns: GridColumn[];
    public title: string;

    constructor(title: string) {
        this.title = title;
        this.columns = [];        
    }

    public getTitle(): string {
        return this.title;
    }

    public getColumns(): GridColumn[] {
        return this.columns;
    }

    public getColumn(index: number): GridColumn {
        return this.columns[index];
    }

    public addColumn(column: GridColumn): void {
        this.columns.push(column);
    }
}