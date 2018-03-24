import { SegurancaComponent } from './seguranca.component';
import { RegisterComponent } from './pages/register/register.component';
import { SecurityGuard } from './security-guard.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './token.interceptor';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemaModule } from '../thema/thema.module';


const COMPONENETS = [
    SegurancaComponent,LoginComponent,RegisterComponent
];
const SERVICES = [
    AuthService, SecurityGuard
];

@NgModule({
    declarations: [
        ...COMPONENETS
    ],
    imports: [
        ReactiveFormsModule,
        ThemaModule,
        SegurancaRoutingModule,
        HttpModule
    ],
    providers: [
        
    ]
})
export class SegurancaModule {
}