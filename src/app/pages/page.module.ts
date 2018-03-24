import { AgendaModule } from './agenda/agenda.module';
import { IndexComponent } from './agenda/index/index.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';
import { HttpModule } from '@angular/http';
import { SegurancaModule } from './../seguranca/seguranca.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemaModule } from '../thema/thema.module';
import { SecurityGuard } from '../seguranca/security-guard.service';
import { AuthService } from '../seguranca/auth.service';
import { TokenInterceptor } from '../seguranca/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditComponent } from './agenda/create-edit/create-edit.component';
import { AlertService } from '../thema/components/alert/alert.service';

const SIDENAV = [
  
];


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SegurancaModule,
    ThemaModule.forRoot(),
    AgendaModule,
    HttpClientModule
  ],
  declarations: [
    ...SIDENAV,
    PageComponent,
    HomeComponent
  ]
  ,
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  },
    SecurityGuard,AuthService,HttpClient,AlertService
  ],entryComponents:[
    ...SIDENAV
  ],
})
export class PagesModule { }
