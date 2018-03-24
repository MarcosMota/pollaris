import { Component,Renderer2 } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavBar {

    expanded: boolean = true;
    
    constructor(
        private layoutService: LayoutService,
        private rederer: Renderer2
    ){

    }

    onToggle() {
        if(this.expanded){
            let sidenav = <HTMLElement>document.querySelector('.side-navbar');
            this.rederer.addClass(sidenav,'shrink');
    
    
            let page = <HTMLElement>document.querySelector('.page');
            this.rederer.addClass(page,'active');
        }else{
            let sidenav = <HTMLElement>document.querySelector('.side-navbar');
            this.rederer.removeClass(sidenav,'shrink');
    
            let page = <HTMLElement>document.querySelector('.page');
            this.rederer.removeClass(page,'active');
        }
        this.expanded = !this.expanded;
    }

    onLogout(){
        this.layoutService.onLogout();
    }
}