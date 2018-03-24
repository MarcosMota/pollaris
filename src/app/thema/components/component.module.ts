import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgGridComponent } from './ng-grid/ng-grid.component';
import { NgGridService } from './ng-grid/ng-grid.service';
import { GridBuilder } from './ng-grid/grid-builder.service';
import { IndexGridComponent } from './index-grid/index-grid.component';
import { AlertService } from './alert/alert.service';
import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavService } from './sidenav/sidenav.service';


const COMPONENTS = [
  IndexGridComponent,NgGridComponent
]

const PROVIDERS = [
    AlertService,SidenavService,NgGridService,GridBuilder
]


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    OrderModule,
  ],
  declarations: [...COMPONENTS],
  entryComponents:[],
  exports: [...COMPONENTS],
  providers:[PROVIDERS]
  
  
})
export class ComponentsModule { }
