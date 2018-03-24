import { Observable } from 'rxjs/Observable';

export interface IRepository<T> {
    controllerName: string;

    getAll(): Observable<T[]>;
    get(id: number): Observable<T>;
    insert(entity: T): Observable<T>;
    update(entity: T): Observable<T>;
    save(entity: T): Observable<T>;
    delete(id: number): Observable<any>;
}