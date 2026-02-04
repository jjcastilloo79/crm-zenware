import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { I_rptaDataLogin, Users } from '../model/interfaces';
import { CProgressSpinnerComponent } from '@/shared/c-progress-spinner/c-progress-spinner.component';
import { Subscription } from 'rxjs';
import { OportunidadService } from './oportunidad.service';
import { MessageService } from 'primeng/api';
import { constantesLocalStorage } from '../model/constantes';
import { UtilitariosService } from '../service/utilitarios.service';

@Component({
    selector: 'app-oportunidad',
    imports: [ReactiveFormsModule, FormsModule, TableModule,ButtonModule,SelectModule, DatePickerModule, CProgressSpinnerComponent],
    templateUrl: './oportunidad.html',
    standalone: true,
    providers: [MessageService, UtilitariosService],
})
export class Oportunidad {

    $listSubcription: Subscription[] = [];
    lstOportunidades: any[] = [];
    lstOportunidad: any[] = [];
    opor_total: number = 0;
    opor_pendiente: number = 0;
    Usuario!:I_rptaDataLogin;
    lstProveedores: any;
    idoportunidad: any = 0;
    frmDatos!: FormGroup;
    Vendedor: Users[] = [];
    mensajeSpinner: string = "Cargando...!";
    blockedDocument: boolean = false;

    constructor(
        private oportunidadService: OportunidadService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private utilitariosService: UtilitariosService,
    ) {
        
    }

    ngOnInit() {
        this.createFrm();
        this.Usuario = JSON.parse(localStorage.getItem('ZENWARE_OPOR')!);
        //this.listaClientes();
        //this.listaVendedor();
        //this.cargarOportunidades();
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

    listaClientes() {
        const objeto = {
            idrolpersona: 'CLI',
            idusuario: this.Usuario.idusuario,
        };

        const $getClientes = this.oportunidadService.ListaProveedores(objeto).subscribe({
                next: (rpta: any) => {
                    this.lstProveedores = rpta;
                    const objet = {
                        idcliente: 0,
                        nomcomercial: 'TODOS',
                    };
                    this.lstProveedores.unshift(objet);
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error...',
                        detail: '',
                    });
                },
                complete: () => { },
            });
        this.$listSubcription.push($getClientes);
    }

    listarOportunidades() {
        if (this.frmDatos.value.idcliente > 0) {
            const objeto = {
                idcliente: this.frmDatos.value.idcliente,
            };

            const $getClientes = this.oportunidadService
                .listarOportxCliente(objeto)
                .subscribe({
                    next: (rpta: any) => {
                        this.lstOportunidad = rpta;
                        const objet = {
                            id: 0,
                            titulo: 'TODOS',
                        };
                        this.lstOportunidad.unshift(objet);
                    },
                    error: (err) => {
                        this.messageService.add({
                        severity: 'error',
                        summary: 'Error...',
                        detail: '',
                    });
                    },
                    complete: () => { },
                });
            this.$listSubcription.push($getClientes);
        }
    }

     listaVendedor() {
        this.oportunidadService.listarUsuariosxPerfil(2).subscribe({
            next: (rpta: any) => {
                //console.info('next : ', rpta);
                this.Vendedor = rpta;
                this.Vendedor.unshift({
                    idusuario: 0,
                    name: "TODOS",
                } as Users);
            },
            error: (err) => {
                console.info('error : ', err);
                this.messageService.clear();
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error...',
                    detail: '',
                });
            },
            complete: () => { },
        });
    }

    cargarOportunidades() {
        const objeto  ={
            idusuario: 12 ,
            fechaini: this.frmDatos.value.fechaini,
            fechafin: this.frmDatos.value.fechafin
        }
        this.setSpinner(true);
        const $OportunidadesLista = this.oportunidadService.OportunidadesLista(objeto)
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