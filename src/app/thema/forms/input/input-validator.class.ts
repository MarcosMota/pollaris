import { InputError } from './../../erros/input-error.const';
import { FormControl } from "@angular/forms/src/model";

export class InputValidator {


    getClassForm(control: FormControl): string {
        if (!control.touched) return;

        if (control.valid)
            return 'has-success';
        else
            return 'has-danger';
    }

    getMessageForm(control: FormControl): string {
        if (control.invalid && control.touched) {
            if (control.hasError('required'))
                return InputError.required;
            if (control.hasError('email'))
                return InputError.email;
            if (control.hasError('min'))
                return InputError.min.replace('{min}','5');
        }

    }
}