import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicFormBuilder } from '../../../thema/forms/input/dynamic-form/dynamic-form-builder';
import { DynamicFormControl } from '../../../thema/forms/input/dynamic-form/model/dynamic-form-control';
import { AgendaRepository } from '../agenda.repository';
import { Agenda } from '../entity/agenda.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../thema/components/alert/alert.service';

@Component({
    selector: 'create-edit',
    templateUrl: 'create-edit.component.html',
    styleUrls: ['create-edit.component.scss'],
    providers: [DynamicFormBuilder, AgendaRepository]
})

export class CreateEditComponent {
    controls: DynamicFormControl[] = [];
    dataSource: Agenda[];

    constructor(
        private agendaRepository: AgendaRepository,
        private dfBuilder: DynamicFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
    ) {
        this.controls = this.dfBuilder.builder(Agenda);
        this.route.params.subscribe(res => this.loadDataSource(res.id));
    }

    loadDataSource(id: number) {
        this.agendaRepository.get(id).subscribe(
            response => {
                if (!response) {
                    this.router.navigate(['/pages/agenda/index']);
                    this.alertService.warning('Contato não encontrado.');
                    return;
                }
 
                this.controls = this.dfBuilder.setDynamicForm(Agenda, this.controls, response)
                this.controls = Object.assign([],this.controls);
                console.log(this.controls);
            }, (error) => {
                console.error(error);

            }
        )
    }

    onSave(form: FormGroup) {
        if (form.valid) {
            this.agendaRepository.save(form.value)
                .subscribe(response => {
                    console.log(response);
                    this.router.navigate(['/pages/agenda/index']);
                    this.alertService.success('Contato salvo com sucesso.');
                },(error)=>{
                    console.log(error);
                });
        }else{
            this.alertService.error('Formulario invalido.');
        }
    }

    onReset() {
        this.router.navigate(['/pages/agenda/index']);
    }
}