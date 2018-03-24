import { Renderer2, Injectable, Inject, RendererFactory2 } from '@angular/core';
import { AlertEnum } from './alert.enum';

@Injectable()
export class AlertService{

    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2){
        this.renderer = rendererFactory.createRenderer(null, null);

    }
     
    error(
        message: string,
        time: number = 3000
    ){
        let id = this.build(message,AlertEnum.DANGER);
        setTimeout(()=>{
            this.destroy(id);
        },3000)
    }
    
    success(
        message: string,
        time: number = 3000
    ){
        let id = this.build(message,AlertEnum.SUCCESS);
        setTimeout(()=>{
            this.destroy(id);
        },3000)
    }
    
    warning(
        message: string,
        time: number = 3000
    ){
        let id = this.build(message,AlertEnum.WARNING);
        setTimeout(()=>{
            this.destroy(id);
        },3000)
    }

    private build(message:string,type: string){
        let id = this.generateGuid();
        let body = document.getElementsByTagName("body");
        
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div,'alert');
        this.renderer.addClass(div,type);
        const text = this.renderer.createText(message);
        
        this.renderer.appendChild(div,text);
        this.renderer.setAttribute(div,'id',id);

        this.renderer.appendChild(document.body,div);
        return id;
    }

    private destroy(id: string){
        let elem = document.getElementById(id);
        elem.remove();
    }

    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

}