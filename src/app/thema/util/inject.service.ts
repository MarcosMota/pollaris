import { Injectable, ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef } from '@angular/core';

@Injectable()
export class InjectService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    loadComponentDynamic(componentRef: Type<{}>, container: ViewContainerRef) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(componentRef);
        return container.createComponent(factory);
    }
}