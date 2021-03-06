import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
  
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = this.auth.getToken();
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.accessToken}`
            }
          });
      
          return next.handle(request);
    }
}