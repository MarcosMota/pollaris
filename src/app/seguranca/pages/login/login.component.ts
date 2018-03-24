import { AuthService } from './../../auth.service';
import { AlertService } from './../../../thema/components/alert/alert.service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.html'],
    providers: [AlertService]
})
export class LoginComponent {

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
            email: [null, Validators.required],
            senha: [null, Validators.required]
        })
    }

    ngOnInit() {
        // Get the query params
        this.route.queryParams
          .subscribe(params => {
            this.pageReturn = params['return'] || '/pages'
            });
      }

    onLogin() {
        if (!this.form.valid)
            this.alertService.error('Por favor preenha o formulario corretamente.');

        this.authService.login(
            this.form.get('email').value,
            this.form.get('senha').value
        ).subscribe(response => {
            this.router.navigateByUrl(this.pageReturn);
        }, (error) => {
            this.alertService.error(error);
        });

    }
}