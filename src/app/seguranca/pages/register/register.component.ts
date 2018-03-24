import { AuthService } from './../../auth.service';
import { AlertService } from './../../../thema/components/alert/alert.service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.html'],
    providers: [AlertService]
})
export class RegisterComponent {

    form: FormGroup;
    pageReturn: string;

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private build: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.build.group({
            nome: [null, Validators.required],
            email: [null, Validators.required],
            senha: [null, Validators.required],
            conf_senha: [null, Validators.required]
        })
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.pageReturn = params['return'] || '/pages'
            });
    }

    onRegister() {
        if(!this.isValid()) return;

        this.authService.register(
            this.form.get('nome').value,
            this.form.get('email').value,
            this.form.get('senha').value
        ).subscribe(response => {
            this.alertService.success('Usuario cadastrado com sucesso.');
            this.router.navigate(['/auth', 'login']);
        }, (error) => {
            this.alertService.error(error);
        });
    }

    isValid(): boolean {
        if (!this.form.valid) {
            this.alertService.error('Por favor preenha o formulario corretamente.');
            return false;
        }

        if (this.form.get('senha').value != this.form.get('conf_senha').value) {
            this.alertService.error('Senhas não correnspondem.');
            return false;
        }

        return true;
    }
}