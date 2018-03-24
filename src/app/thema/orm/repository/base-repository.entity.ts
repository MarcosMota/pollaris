import { EntityAnnotation, EntityDecorator, ColumnAnnotation } from './../../core/metadata/decorators.entity';
import { getType } from 'reflect-helper';
import { Constructor } from './../../core/reflect/util';

export class BaseRepository {
    controllerName: string;
    identifyKey: string;

    constructor(entity: Constructor<any>) {
        this.configure(entity);
    }

    /**
     * @param entity Classe da entidade
     */
    configure(entity: Constructor<any>) {
        try {
            const entityType = getType(entity);

            // Se tiver o annotation @Entity
            if (entityType.hasAnnotation(EntityAnnotation)) {
                this.setProperties(<EntityDecorator>entityType.getAnnotations(EntityAnnotation)[0].config);

                entityType.properties.forEach((item) => {

                    // Busca a instancia do decorator
                    const column: ColumnAnnotation = entityType.getProperty(item.name).getAnnotations(ColumnAnnotation)[0];
                    if (!column) return;

                    if (column.identifyKey) {
                        this.identifyKey = item.name;
                    }

                });

            } else {
                console.log('Por favor. Coloque annotation na entidade.');
            }
        } catch (error) {
            console.log('Problemas em configurar repositório');
        }
    }

    /**
     * @param config Configurações do Decorator
     */
    setProperties(config: EntityDecorator) {
        this.controllerName = config.controllerName;
    }

}
