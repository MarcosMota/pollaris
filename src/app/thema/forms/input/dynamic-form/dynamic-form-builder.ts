import { Constructor } from 'reflect-helper/util';
import { DynamicFormControl } from './model/dynamic-form-control';
import { Injectable, ChangeDetectorRef } from "@angular/core";
import { ColumnAnnotation, ColumnDecorator, EntityAnnotation } from '../../../core';
import { Agenda } from '../../../../pages/agenda/entity/agenda.entity';
import { getType } from '../../../core/reflect';
import { isObject } from 'util';

@Injectable()
export class DynamicFormBuilder {

    /**
     *
     */
    constructor(private ref: ChangeDetectorRef) {

    }

    /**
     * Constroi o formulario através da classe com os decorators
     * @param entity Classe com o decorator Entity e Column
     */
    builder(entity: Constructor<any>): DynamicFormControl[] {
        let controls: DynamicFormControl[] = [];
        try {
            // Verifica se existe o decorator
            if (!this.hasEntityDecorator(entity)) return;

            // Busca o tipo do decorator
            let entityType = getType(entity);

            // Varre todas as propriedades mapeadas
            entityType.properties.forEach((item) => {

                // Busca a instancia do decorator
                let column: ColumnAnnotation = entityType.getProperty(item.name).getAnnotations(ColumnAnnotation)[0];
                if (!column) return;

                // Cria uma instancia do DynamicFormControl
                let dynamic = new DynamicFormControl({
                    type: column.controlType,
                    key: item.name,
                    validators: column.validators,
                    model: {
                        label: column.field
                    },
                    css: column.css
                });

                // Adiciona a entidade na lista
                controls.push(dynamic);
            });

        } catch (error) {
            console.error(error);
        }

        return controls;
    }

    /**
     * 
     * @param entity Classe com o decorator Entity e Column
     * @param controls Controles construido pelo dynamic form control
     * @param data Dados baseado com formulario
     */
    setDynamicForm(entity: Constructor<any>, controls: DynamicFormControl[], data: any) {
        try {
            // Verifica se é objeto
            if (!isObject(data)) throw new Error("Os dados não é do tipo objeto.");

            // Verifica se existe o decorator
            if (!this.hasEntityDecorator(entity)) return;

            // Captura as propriedades do json
            let properties = Object.keys(data);
            debugger
            // Varre as propriedades
            properties.forEach(property => {
                // Busca o control com o key igual a propriedade
                const index = controls.findIndex(p => p.key.toUpperCase() == property.toUpperCase());

                if (index != -1) {
                    // Se encontrar, atribui o valor do json
                    controls[index].value = data[property];
                }
            });

        } catch (error) {
            console.error(error);
        }

        return controls
    }


    /**
     * Verifica se a entity contém o decorator Entity
     * @param entity Classe com o decorator Entity e Column
     * @returns true ou false
     */
    private hasEntityDecorator(entity: Constructor<any>): boolean {
        let entityType = getType(entity);

        // Se tiver o annotation @Entity
        if (entityType.hasAnnotation(EntityAnnotation)) {
            return true;
        } else {
            console.error('Por favor. Coloque annotation na entidade.');
            throw new Error();
        }
    } catch(error) {
        console.error('Problemas em configurar repositório');
        return false;
    }

}