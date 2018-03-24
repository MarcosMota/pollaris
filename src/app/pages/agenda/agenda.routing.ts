import { IndexComponent } from './index/index.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { path: 'index', component: IndexComponent },
    { path: 'createEdit', component: CreateEditComponent },
    { path: 'createEdit/:id', component: CreateEditComponent },
    { path: '', redirectTo: 'index' },
    {
        path: '**',
        redirectTo: '/index',
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AgendaRoutingModule {
}
