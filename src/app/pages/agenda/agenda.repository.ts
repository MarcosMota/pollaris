import { Agenda } from './entity/agenda.entity';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { getType } from 'reflect-helper';
import { EntityAnnotation, EntityDecorator, ColumnAnnotation } from '../../thema/core';
import { Constructor } from 'reflect-helper/util';
import { Respository } from '../../thema/orm/repository/repository.entity';


// export interface IRepositoryGeneric<T> {
//     controllerName: string;

//     getAll(): Observable<T[]>;
//     get(id: number): Observable<T>;
//     insert(entity: T): Observable<T>;
//     update(entity: T): Observable<T>;
//     save(entity: T): Observable<T>;
//     delete(id: number): Observable<any>;
// }

// export class BaseRepository {
//     controllerName: string;
//     identifyKey: string;

//     constructor(entity: Constructor<any>) {
//         this.configure(entity);
//     }

//     /**
//      * 
//      * @param entity Classe da entidade
//      */
//     configure(entity: Constructor<any>) {
//         try {
//             let entityType = getType(entity);

//             // Se tiver o annotation @Entity
//             if (entityType.hasAnnotation(EntityAnnotation)) {
//                 this.setProperties(<EntityDecorator>entityType.getAnnotations(EntityAnnotation)[0].config);

//                 entityType.properties.forEach((item) => {

//                     // Busca a instancia do decorator
//                     let column: ColumnAnnotation = entityType.getProperty(item.name).getAnnotations(ColumnAnnotation)[0];
//                     if (!column) return;

//                     if(column.identifyKey){
//                         this.identifyKey = item.name;
//                     }

//                 });

//             } else {
//                 console.log('Por favor. Coloque annotation na entidade.');
//             }
//         } catch (error) {
//             console.log('Problemas em configurar repositório');
//         }
//     }

//     /**
//      * 
//      * @param config Configurações do Decorator
//      */
//     setProperties(config: EntityDecorator) {
//         this.controllerName = config.controllerName;
//     }

// }

// export class Respository<T> extends BaseRepository implements IRepositoryGeneric<T> {

//     controllerName: string;

//     constructor(private http: HttpClient, entity: Constructor<T>) {
//         super(entity);
//     }

//     getAll(): Observable<T[]> {
//         return this.http.get<T[]>(this.controllerName);
//     }

//     get(id: number): Observable<T> {
//         return this.http.get<T>(this.controllerName + `/${id}`);
//     }


//     save(entity: T): Observable<T> {
//         debugger;
//         if(this.identifyKey == null)
//             throw Error("Chave de identificação não definida.");

//         if (entity[this.identifyKey] == 0)
//             return this.insert(entity);
//         else
//             return this.update(entity);
//     }

//     insert(entity: T): Observable<T> {
//         return this.http.post<T>(this.controllerName, entity);
//     }

//     update(entity: T): Observable<T> {
//         return this.http.put<T>(this.controllerName, entity);
//     }

//     delete(id: number): Observable<any> {
//         return this.http.delete(this.controllerName + `/${id}`);
//     }

// }

@Injectable()
export class AgendaRepository extends Respository<Agenda> {

    constructor(http: HttpClient) {
        super(http, Agenda);
    }

}