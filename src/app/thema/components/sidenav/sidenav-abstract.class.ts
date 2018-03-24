import { EventEmitter } from '@angular/core';
export abstract class  SidenavAbstract{
    abstract close: EventEmitter<any> = new EventEmitter(); 
}