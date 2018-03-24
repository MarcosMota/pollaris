import { SidenavConfig } from "./sidenav-config.class";
import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class SidenavService {
    id: string;
    config: SidenavConfig;

    sidenav: HTMLElement;
    backDrop: HTMLElement;
    
    constructor(
        private renderer: Renderer2
    ) {  
     }

    // Inicializa o sidenav e cria o backdrop
    init(id: string, config: any): void {
        this.id = id;
        this.config = Object.assign(SidenavConfig, config);

        this.sidenav = <HTMLElement>document.getElementById(this.id);
        if (this.sidenav == null)
            throw new Error('Sidenav não encontrado.');

        this.backDrop = this.renderer.createElement('div');
        this.renderer.addClass(this.backDrop, 'sidenav-backdrop');
        this.renderer.listen(this.backDrop, 'click', () => this.close());
        this.renderer.appendChild(document.body, this.backDrop);

    }

    // Abre o sidenav e mostra o backdrop
    open() {
        this.renderer.setStyle(this.sidenav, 'width', this.config.width);
        this.renderer.setStyle(this.backDrop, 'display', 'unset');
    }

     // Fecha o sidenav e esconde o backdrop
    close() {
        this.renderer.setStyle(this.sidenav, 'width', '0px');
        this.renderer.setStyle(this.backDrop, 'display', 'none');
    }

    // E destroy todos os componentes do sidenav
    destroy() {
        this.backDrop.remove();
        this.sidenav.remove();
    }
}