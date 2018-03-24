import { MENU } from './menu.const';
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SideBar{
    menu: any[] = [];

    constructor(){
        this.menu = MENU;
    }
}