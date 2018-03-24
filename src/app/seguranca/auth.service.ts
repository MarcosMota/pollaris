import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private route: Router
    ) { }

    public getToken(): any {
        let token = localStorage.getItem('token');
        if (token == null) return null;

        return JSON.parse(token);
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token == null) return false;

        return this.tokenNotExpired(token);
    }

    tokenNotExpired(token: any): boolean {
        return moment(token.expiration) > moment();
    }

    login(email: string, senha: string): Observable<any> {

        return new Observable((res) => {
            this.http.post('http://localhost:5000/api/Auth/Login', {
                "Email": email,
                "Senha": senha
            })
                .map(response => response.json())
                .subscribe(
                response => {
                    if (!response.authenticated)
                        res.error('Email e/ou senha incorretos.');
                    else {
                        localStorage.setItem('token', JSON.stringify(response));
                        res.next(response);
                    }
                }, (error) => {
                    res.error(error);
                })

        });
    }
    register(nome: string, email: string, senha: string): Observable<any> {

        return this.http.post('http://localhost:5000/api/Auth/Register', {
                Nome: nome,
                Email: email,
                Senha: senha
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.route.navigate(['/auth', 'login']);
    }
}