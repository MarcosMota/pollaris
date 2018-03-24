export class NgGrid {
    dataSourceLoaded: boolean = false;
    name: string;
    columns: NgGridColunm[] = [];
    dataSource: any[];

    /**
     *
     */
    constructor(name: string) {
        this.name = name;
    }
}

export class NgGridColunm {
    field: string;
    description: string;
    type: string;
    width?: string = 'auto';
    filtable: boolean = true;
    filtered: boolean = false;
    constructor(fields?: {
        field: string,
        description: string,
        type:string
        width?: string,
        filtable?: boolean
    }) {
        if (fields) Object.assign(this, fields);
    }
}


