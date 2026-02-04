import { KanbanCard, Users } from '@/pages/model/interfaces';
import { CProgressSpinnerComponent } from '@/shared/c-progress-spinner/c-progress-spinner.component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { InputNumberModule } from 'primeng/inputnumber';
import { constantesLocalStorage } from '@/pages/model/constantes';
import { OportunidadService } from '@/pages/oportunidad/oportunidad.service';
import { MessageService } from 'primeng/api';
import { UtilitariosService } from '@/pages/service/utilitarios.service';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CLead } from './componentes/c-lead/c-lead';
import { CProblema } from "./componentes/c-problema/c-problema";
import { CPersona } from './componentes/c-persona/c-persona';
import { CProyecto } from "./componentes/c-proyecto/c-proyecto";
import { CPresupuesto } from './componentes/c-presupuesto/c-presupuesto';
import { CPrioridad } from './componentes/c-prioridad/c-prioridad';
import { CProceso } from './componentes/c-proceso/c-proceso';
import { CCompetencia } from './componentes/c-competencia/c.competencia';

@Component({
    selector: 'app-leadmnt',
    imports: [TabsModule, 
        ButtonModule, 
        ReactiveFormsModule, 
        FormsModule, 
        TableModule, 
        SelectModule, 
        InputNumberModule, 
        DatePickerModule, 
        CProgressSpinnerComponent, 
        InputTextModule,
        TextareaModule,
    CLead, CProblema, CPersona, CProyecto, CPresupuesto, CPrioridad, CProceso, CCompetencia],
    templateUrl: './leadmnt.html',
    standalone: true,
    providers: [MessageService, UtilitariosService],
})
export class LeadMnt {

    lstOportunidades: any[] = [];
    vistaLista: boolean = true;
    visDetalle: boolean = false;
    tituloDetalle!: string;
    dataPrc: any;
    frmDatos!: FormGroup;
    Vendedor: Users[] = [];
    mensajeSpinner: string = "Cargando...!";
    blockedDocument: boolean = false;
    lstSector: any[] = [];
    lstCliente: any[] = [];
    lstOrigen: any[] = [];
    oportunidad!: KanbanCard;
    lstContactos: any[] = [];


    constructor(
        private oportunidadService: OportunidadService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private utilitariosService: UtilitariosService,
    ) {

    }

    ngOnInit() {
        this.createFrm();
    }

    createFrm() {
        this.frmDatos = this.fb.group({
            idoportunidad: [{ value: 0, disabled: false, },],
            idlista: [{ value: 0, disabled: false, },],
            idusuario: [{ value: constantesLocalStorage.idusuario, disabled: false, },],
            idcliente: [{ value: 0, disabled: false, },],
            title: [{ value: '', disabled: false, },],
            description: [{ value: '', disabled: false, },],
            idpreventa: [{ value: 0, disabled: false, },],
            progress: [{ value: 0, disabled: false, },],
            indcompleto: [{ value: 0, disabled: false, },],
            fecoportunidad: [{ value: this.utilitariosService.obtenerFechaActual(), disabled: false, },],
            fecfinoportunidad: [{ value: this.utilitariosService.obtenerFechaFinMes(), disabled: false, },],
            idtipoprod: [{ value: 0, disabled: false, },],
            codigoproyecto: [{ value: '', disabled: false, },],
            idmoneda: [{ value: 0, disabled: false, },],
            monto: [{ value: 0, disabled: false, },],
            tipocambio: [{ value: 0, disabled: false, },],
            fecampliacion: [{ value: '', disabled: false, },],
            startDate: [{ value: '', disabled: false, },],
            dueDate: [{ value: '', disabled: false, },],
            id: [{ value: 0, disabled: false, },],
            justificacion: [{ value: '', disabled: false, },],
            rucempresa: [{ value: '', disabled: false, },],
            idsector: [{ value: 0, disabled: false, },],
            idorigen: [{ value: '', disabled: false, },],
            idnivproblema: [{ value: '', disabled: false, },],
            desproblema: [{ value: '', disabled: false, },],
            consproblema: [{ value: '', disabled: false, },],
            // dueDate: [{value: '',disabled: false,},],
            // dueDate: [{value: '',disabled: false,},],
        });
    }




}