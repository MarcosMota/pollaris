import { Directive, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormControl } from './model/dynamic-form-control';

// Diretiva para carregamento dinâmico do componente
@Directive({
    selector: '[dynamic-form-target]'
})
export class DynamicFormDirective {
    @Input("controls") controls: DynamicFormControl[] = [];
    @Output('onSubmit') onSubmitting = new EventEmitter<any>();
    
    constructor(public viewContainerRef: ViewContainerRef) {}
}