import { LayoutService } from './layout.service';
import { SideBar } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
    NavBar,SideBar
]

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [...COMPONENTS],
  entryComponents:[NavBar],
  exports: [...COMPONENTS],
  providers:[LayoutService]
})
export class LayoutModule { }
