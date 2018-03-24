import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SecurityGuard } from '../seguranca/security-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SegurancaComponent } from './seguranca.component';

const routes: Routes = [
  {
  path: '',
  component: SegurancaComponent,
  children:[{
  path: 'login',  component: LoginComponent,
},{
  path: 'register',  component: RegisterComponent
}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurancaRoutingModule {
}
