import { CreateEditComponent } from './create-edit/create-edit.component';
import { IndexComponent } from './index/index.component';
import { AgendaRepository } from './agenda.repository';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda.routing';
import { NgModule } from '@angular/core';
import { ThemaModule } from '../../thema/thema.module';


const COMPONENTS = [
    IndexComponent, CreateEditComponent
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        HttpClientModule,
        ThemaModule.forRoot(),
        AgendaRoutingModule
    ],
    declarations: [
        IndexComponent, CreateEditComponent
    ],
    providers: [],
})
export class AgendaModule {

}
