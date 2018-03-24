import { IndexComponent } from './agenda/index/index.component';
import { CreateEditComponent } from './agenda/create-edit/create-edit.component';
import { PageComponent } from './page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: 'home', component: HomeComponent
}, {
  path: 'agenda', loadChildren: './agenda/agenda.module#AgendaModule'
}, {
  path: '',
  redirectTo: '/pages/home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/pages/home',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
