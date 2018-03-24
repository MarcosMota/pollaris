import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base-repository.entity' ;
import { IRepository } from './repository.interface' ;
import { Constructor } from '../../core/reflect/util';
import { Observable } from 'rxjs/Observable';

export class Respository<T> extends BaseRepository implements IRepository<T> {

    controllerName: string;

    constructor(private http: HttpClient, entity: Constructor<T>) {
        super(entity);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.controllerName);
    }

    get(id: number): Observable<T> {
        return this.http.get<T>(this.controllerName + `/${id}`);
    }


    save(entity: T): Observable<T> {
        if (this.identifyKey == null)
            throw Error('Chave de identificação não definida.');

        if (entity[this.identifyKey] === 0)
            return this.insert(entity);
        else
            return this.update(entity);
    }

    insert(entity: T): Observable<T> {
        return this.http.post<T>(this.controllerName, entity);
    }

    update(entity: T): Observable<T> {
        return this.http.put<T>(this.controllerName, entity);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.controllerName + `/${id}`);
    }

}