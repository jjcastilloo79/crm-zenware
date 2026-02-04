import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CProgressSpinnerComponent } from '@/shared/c-progress-spinner/c-progress-spinner.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { constantesLocalStorage } from '../model/constantes';
import { UtilitariosService } from '../service/utilitarios.service';
import { MessageService } from 'primeng/api';
import { I_rptaDataLogin } from '../model/interfaces';
import { Subscription } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { CLeadReg } from './lead-reg/lead-reg';
import { LeadService } from './lead.services';

@Component({
    selector: 'app-lead',
    imports: [ReactiveFormsModule, FormsModule, TableModule, ButtonModule, CLeadReg, CProgressSpinnerComponent, DatePickerModule, TooltipModule],
    templateUrl: './lead.html',
    standalone: true,
    providers: [MessageService, UtilitariosService],    
     styleUrls: ['./lead.scss'],
})
export class Lead {
    $listSubcription: Subscription[] = [];
    lstOportunidades: any[] = [];
    vistaLista: boolean = true;
    visDetalle: boolean = false;
    tituloDetalle!: string;
    dataPrc: any;
    mensajeSpinner: string = "Cargando...!";
    blockedDocument: boolean = false;
    frmDatos!: FormGroup;
    Usuario!: I_rptaDataLogin;

    constructor(
        private leadService: LeadService,
        private fb: FormBuilder,
        private utilitariosService: UtilitariosService,
        private messageService: MessageService,
    ) {

    }

    ngOnInit() {
        this.createFrm();
        this.Usuario = JSON.parse(localStorage.getItem('ZENWARE_OPOR')!);
    }

    onEditar(data: any) {
        console.log('onEditar...', data);
        this.dataPrc = {
            idordencompra: data.idordencompra,
            paramReg: 'E'
        }
        this.tituloDetalle = "EDITAR LEAD ";
        this.vistaLista = false;
        this.visDetalle = true;
    }

    setSpinner(valor: boolean) {
        this.blockedDocument = valor;
    }

    createFrm() {
        this.frmDatos = this.fb.group({
            fechaini: [
                {
                    value: this.utilitariosService.obtenerFechaInicioMes(),
                    disabled: false,
                },
            ],
            fechafin: [
                {
                    value: this.utilitariosService.obtenerFechaFinMes(),
                    disabled: false,
                },
            ],
            idusuario: [
                {
                    value: constantesLocalStorage.idusuario,
                    disabled: false,
                },
            ],
            idcliente: [
                {
                    value: 0,
                    disabled: false,
                },
            ],
            idoportunidad: [
                {
                    value: 0,
                    disabled: false,
                },
            ],
            idvendedor: [
                {
                    value: constantesLocalStorage.idusuario,
                    disabled: false,
                },
            ],
        });
    }

    getBack() {
        this.vistaLista = true;
        this.visDetalle = false;
        //this.getListar();
    }

    onNuevo() {
        this.tituloDetalle = "REGISTRAR LEAD";
        this.dataPrc = {
            idordencompra: 0,
            paramReg: 'N'
        }
        this.vistaLista = false;
        this.visDetalle = true;
    }

    cargarOportunidades() {
        const objeto = {
            idusuario: 12,
            fechaini: this.frmDatos.value.fechaini,
            fechafin: this.frmDatos.value.fechafin
        }
        this.setSpinner(true);
        const $OportunidadesLista = this.leadService.OportunidadesLista(objeto)
            .subscribe({
                next: (rpta: any) => {
                    this.setSpinner(false);
                    console.log('cargarOportunidades...', rpta);
                    this.lstOportunidades = rpta;
                },
                error: (err) => {
                    this.setSpinner(false);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error...',
                        detail: err,
                    });
                },
                complete: () => { }
            });
        this.$listSubcription.push($OportunidadesLista)
    }

}