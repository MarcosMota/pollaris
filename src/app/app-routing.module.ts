import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: 'pages', loadChildren: './pages/page.module#PagesModule'
  },
  {
    path: '',
    redirectTo: '/pages',
    pathMatch: 'full'
  },{
    path:'**',
    redirectTo: '/pages',
  }
];

const config: ExtraOptions = {
  useHash: true,
};

//export const appRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {

}
 