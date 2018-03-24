import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './forms/input/dynamic-form/dynamic-form.component';
import { InjectService } from './util/inject.service';
import { ComponentsModule } from './components/component.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { LayoutService } from './layout/layout.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from './forms/input/ng-grid/keys-pipe';

const MODULES= [
    LayoutModule,
    ComponentsModule
];
const COMPONENETS= [
    DynamicFormComponent 
];
const SERVICES= [
    LayoutService,InjectService
];

@NgModule({
    declarations: [
        ...COMPONENETS,KeysPipe
    ],
    imports: [
        CommonModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ...SERVICES
     ],
     entryComponents:[...COMPONENETS],
     exports: [...COMPONENETS,MODULES]
  })
export class ThemaModule{
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
          ngModule: ThemaModule,
          providers: [],
        };
      }
}