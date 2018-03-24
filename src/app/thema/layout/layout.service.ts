import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LayoutService {

    public logout: EventEmitter<any> = new EventEmitter();

    onLogout() {
        localStorage.removeItem('token');
        this.logout.emit();
    }

}