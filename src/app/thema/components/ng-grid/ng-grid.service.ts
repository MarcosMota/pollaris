import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NgGridService{
    readonly apiBase: string = 'api/produtos';

    constructor(private http: Http) {
        
    }

    public getProdutos(): Observable<any>{
        return this.http
                        .get('api/produtos')
                        .map(p => p.json());
    }
}