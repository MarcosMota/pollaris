import { Validators, Validator } from '@angular/forms';
import { ControlTypeEnum } from "../enums/control-type.enum";

// Classe utilizada para construir o formulário dinâmico
export class DynamicFormControl  {
    // Nome da propriedade que será utilizada para associar o valor 'inputado'
    key: string;

    // Tipo de controle sendo renderizado
    type: ControlTypeEnum;

    // Suporta dois tipos de objetos apenas
    //      FormItem: Controle simples(input html5, select)
    //      GridModel: modelo de grid utilizado para construir um NgGridComponent
    model: any;

    // Indica se o campo é obrigatório
    required: boolean;

    // Valor que o controle deve carregar
    value?: any;

    // Tamanho da coluna sendo aplicada. Default col-12
    css?: string;

    validators: Validators[];

    constructor(data :{
        value?: any,
        css?: string,
        key?: string,
        type?: ControlTypeEnum,
        model?: any,
        required?: boolean,
        validators?: Validators[]
    }) {
        this.key = data['key'];
        this.required = data['required'] || false;
        this.type = data['type'] || ControlTypeEnum.Textbox;
        this.model = data['model'];
        this.value = data['value'] || '';
        this.css = data['css'] || 'col-lg-12';
        this.validators = data['validators'] || [];
    }
}