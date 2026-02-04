import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { LeadService } from '../lead.services';
import { UtilitariosService } from '@/pages/service/utilitarios.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShareService } from '@/pages/service/serviceShare.service';
import { CProgressSpinnerComponent } from '@/shared/c-progress-spinner/c-progress-spinner.component';
import { constantesLocalStorage } from '@/pages/model/constantes';
import { catchError, forkJoin, Observable, of, Subscription, switchMap } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Assignees, Contacto, KanbanCard, RegOportunidadExt, TareaAsignado, Tasks } from '@/pages/model/interfaces';
import { ProgressBarModule } from 'primeng/progressbar';
import { InplaceModule } from 'primeng/inplace';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PopoverModule } from 'primeng/popover';

@Component({
    selector: 'app-c-lead-reg',
    imports: [
        InputTextModule,
        FluidModule,
        ButtonModule,
        SelectModule,
        FormsModule,
        TextareaModule,
        InputNumberModule,
        DatePickerModule,
        DividerModule,
        TableModule,
        ReactiveFormsModule,
        CProgressSpinnerComponent,
        TabsModule,
        FieldsetModule,
        CommonModule,
        DialogModule,
        ProgressBarModule,
        InplaceModule,
        AvatarModule,
        AvatarGroupModule,
        AutoCompleteModule,
        PopoverModule
    ],
    templateUrl: './lead-reg.html',
    standalone: true,
    providers: [MessageService, UtilitariosService, ShareService, ConfirmationService],
})
export class CLeadReg {
    $listSubcription: Subscription[] = [];
    frmDatos: KanbanCard = { id: '0', idlista: 1, monto: 0, tipocambio: 0, dueDate: '', taskList: { title: 'Lista de tareas sin título', tasks: [] }, fecampliacion: '' };
    mensajeSpinner: string = "Cargando...!";
    blockedDocument: boolean = false;
    lstOrigenOportunidad: any[] = [];
    lstClientes: any[] = [];
    lstTipoProducto: any[] = [];
    lstSectorInd: any[] = [];
    lstContactos: any[] = [];
    lstTipoProy: any[] = [];
    lstEstProy: any[] = [];
    lstMoneda: any[] = [];
    lstEstPresupuesto: any[] = [];
    lstPrioridad: any[] = [];
    lstEtapas: any[] = [];
    lstTiempo: any[] = [];
    isMoneda: boolean = false;
    etiquetaMonto: string = 'Monto';
    Usuarios: any[] = [];
    verjustificacion: boolean = false;
    verfecAmplia: boolean = false;
    minimaFechaAmpli: Date = new Date();
    submitted: boolean = false;
    registerFormRegistro: any = FormGroup;
    registerFormContacto: any = FormGroup;
    registerFormCliente!: FormGroup;
    listaRegistroInicial: any = undefined;
    IdRegistro: number = 0;
    paramRegistro: string = '';
    headerTitle: string = '';
    registroVisible: boolean = false;
    nroindex: number = 0;
    lstProveedores: any[] = [];
    lstMarcas: any[] = [];
    regoportunidadesext: RegOportunidadExt = { idregoportunidadext: 0, numregoportunidad: '', idoportunidad: '0', fechavence: '', idusuario: 0, idmarca: 0, idproveedor: 0, nommarca: '', nomproveedor: '' };
    maxDateValue: Date = new Date();
    newTask: Tasks = { idtarea: 0, sidtarea: '', text: '', completed: false, fechafin: '', fechaini: '', nroorden: 0, asignados: [], horafin: '00:00', horaini: '00:00' };
    timeout: any = null;
    filteredAssignees: Assignees[] = [];
    filteredContac: Contacto[] = [];
    assignees: Assignees[] = [];
    assigneesTarea: TareaAsignado[] = [];
    asignadosTareas: TareaAsignado[] = [];
    asignadosTareaVisible: boolean = false;
    filteredAsignadosTareas: TareaAsignado[] = [];
    idtarea: number = 0;
    _nroorden: number = 0;
    headerTarea?: string;
    minDateValueTarea!: Date;
    maxDateValueTarea!: Date;
    listaContacInicial: any = undefined;
    lstTotalcontacs: Contacto[] = [];

    @ViewChild('inputTitle') inputTitle!: ElementRef;
    @ViewChild('inputTaskListTitle') inputTaskListTitle!: ElementRef;
    @ViewChild('inputTaskList') inputTaskList!: ElementRef;

    @Output() TaskList = new EventEmitter<any>();
    @Output() contactos = new EventEmitter<any>();
    @Output() registroExt = new EventEmitter<any>();

    @Output() verCotizacion = new EventEmitter<any>();
    @Output() verBussines = new EventEmitter<any>();

    IdContacto: number = 0;
    contactoVisible: boolean = false;
    isLoading: boolean = false;



    constructor(
        private leadService: LeadService,
        private formBuilder: FormBuilder,
        private utilitariosService: UtilitariosService,
        private messageService: MessageService,
        private shareService: ShareService,
        private confirmationService: ConfirmationService,
    ) {

    }

    get formContacto() { return this.registerFormContacto.controls; }
    get formCliente() { return this.registerFormCliente.controls; }
    get formRegistro() { return this.registerFormRegistro.controls; }

    setSpinner(valor: boolean) {
        this.blockedDocument = valor;
    }

    ngOnInit() {
        //this.createFrm();
        this.cargarOrigen();
        this.cargarEmpresa();

        this.createFormContacto();
        this.createFormCliente();
        this.createFormRegistro();
    }

    // createFrm() {
    //     this.frmDatos = this.formBuilder.group({
    //         idoportunidad: [{ value: 0, disabled: false, },],
    //         idlista: [{ value: 0, disabled: false, },],
    //         idusuario: [{ value: constantesLocalStorage.idusuario, disabled: false, },],
    //         idcliente: [{ value: '', disabled: false, },],
    //         title: [{ value: '', disabled: false, },],
    //         description: [{ value: '', disabled: false, },],
    //         idpreventa: [{ value: 0, disabled: false, },],
    //         progress: [{ value: 0, disabled: false, },],
    //         indcompleto: [{ value: 0, disabled: false, },],
    //         fecoportunidad: [{ value: this.utilitariosService.obtenerFechaActual(), disabled: false, },],
    //         fecfinoportunidad: [{ value: this.utilitariosService.obtenerFechaFinMes(), disabled: false, },],
    //         idtipoprod: [{ value: 0, disabled: false, },],
    //         codigoproyecto: [{ value: '', disabled: false, },],
    //         idmoneda: [{ value: 0, disabled: false, },],
    //         monto: [{ value: 0, disabled: false, },],
    //         tipocambio: [{ value: 0, disabled: false, },],
    //         fecampliacion: [{ value: '', disabled: false, },],
    //         startDate: [{ value: '', disabled: false, },],
    //         dueDate: [{ value: '', disabled: false, },],
    //         id: [{ value: 0, disabled: false, },],
    //         justificacion: [{ value: '', disabled: false, },],
    //         idorigen: [{ value: '', disabled: false, },],
    //         idnivproblema: [{ value: '', disabled: false, },],
    //         desproblema: [{ value: '', disabled: false, },],
    //         idorigenopor: [{ value: 0, disabled: false, },],
    //         idsectorind: [{ value: '', disabled: false, },],
    //         desimpacto: [{ value: '', disabled: false }],
    //         idtipoproy: [{ value: '', disabled: false, },],
    //         idestadoproy: [{ value: '', disabled: false, },],
    //         alcanceproy: [{ value: '', disabled: false, },],
    //         idestadopresu: [{ value: '', disabled: false, },],
    //         feciniprio: [{ value: '', disabled: false, },],
    //         feccieprio: [{ value: '', disabled: false, },],
    //         desprioridad: [{ value: '', disabled: false, },],
    //         idetapaproc: [{ value: '', disabled: false, },],
    //         idtiempoproc: [{ value: '', disabled: false, },],
    //         desstakeholders: [{ value: '', disabled: false, },],
    //         descompetidor: [{ value: '', disabled: false, },],
    //         desfodacompetidor: [{ value: '', disabled: false, },],
    //         compresupuesto: [{ value: '', disabled: false, },],
    //         idprioridad: [{ value: '', disabled: false, },],
    //         montodolar: [{ value: 0, disabled: false, },],
    //         nomcreador: [{ value: '', disabled: false, },],
    //         taskList: [{ value: { tasks: [] }, disabled: false, },],
    //     });
    // }

    createFormContacto() {
        //Agregar validaciones de formulario
        this.registerFormContacto = this.formBuilder.group({
            nombrecontacto: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required]],
            cargo: ['', [Validators.required]],
            tiporol: ['', [Validators.required]],
        });
    }

    createFormCliente() {
        //Agregar validaciones de formulario
        this.registerFormCliente = this.formBuilder.group({
            idrolpersona: [{ value: 'CLI', disabled: false }],
            tipopersona: [{ value: 'J', disabled: false }],
            tipoalta: [{ value: 'NOR', disabled: false }],
            indnacionalidad: [{ value: null, disabled: false }, [Validators.required]],
            idpais: [{ value: '1', disabled: false }],
            idtipodoc: [{ value: null, disabled: false }, [Validators.required]],
            nrodocumento: [{ value: null, disabled: false }, [Validators.required]],
            appaterno: [{ value: null, disabled: false }, [Validators.required]],
            apmaterno: [{ value: null, disabled: false }, [Validators.required]],
            apcasada: [{ value: null, disabled: false }],
            nombres: [{ value: null, disabled: false }, [Validators.required]],
            razonsocial: [{ value: null, disabled: false }, [Validators.required]],
            nomcomercial: [{ value: null, disabled: false }],
            direcresumen: [{ value: null, disabled: false }, [Validators.required]],
            telefresumen: [{ value: null, disabled: false }],
            email: ['', [Validators.required, Validators.email]],
            paginaweb: [{ value: null, disabled: false }],
            facebook: [{ value: null, disabled: false }],
            youtube: [{ value: null, disabled: false }],
            indmigrado: [{ value: false, disabled: false }],
            indestado: [{ value: '1', disabled: false }],
            indvig: [{ value: true, disabled: false }],
            fechareg: [{ value: new Date(), disabled: false }],
            iduserreg: [{ value: 1, disabled: false }],
            fechaact: [{ value: new Date(), disabled: false }],
            iduseract: [{ value: 1, disabled: false }],
            idpersona: [{ value: 0, disabled: false }],
            tipocambio: [{ value: 0, disabled: false }],
            tipoentidad: [{ value: null, disabled: false }, [Validators.required]],
            idtipoprod: [{ value: null, disabled: false }],
            codigoproyecto: [{ value: null, disabled: false }],
            proyecto_cod: [{ value: null, disabled: false }]
        });
    }

    createFormRegistro() {
        //Agregar validaciones de formulario
        this.registerFormRegistro = this.formBuilder.group({
            fechavence: [{ value: new Date(), disabled: false }],
            numregoportunidad: ['', [Validators.required]],
            idproveedor: ['', [Validators.required]],
            idmarca: ['', [Validators.required]],
        });
    }

    cargarOrigen() {
        const $OportunidadesLista = this.leadService.obtenerItemsTabla(136)
            .subscribe({
                next: (rpta: any) => {
                    this.setSpinner(false);
                    console.log('lstOrigenOportunidad...', rpta);
                    this.lstOrigenOportunidad = rpta;
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

    cargarEmpresa() {
        const $OportunidadesLista = this.leadService.obtenerClientes('CLI')
            .subscribe({
                next: (rpta: any) => {
                    this.setSpinner(false);
                    this.lstClientes = rpta;
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

    cambioDolares(id: any) {
        console.log('cambioDolares', id);
        this.frmDatos.montodolar = 0;
        this.frmDatos.monto = 0;

        if (id === 1) {
            this.etiquetaMonto = "Monto Dolares";
        }
        if (id === 2) {
            this.etiquetaMonto = "Monto Soles";
        }
    }

    calcularDolaresM(event: any) {

        if (event > 900000000) {
            this.messageService.add({ severity: 'info', detail: "Tipo de Cambio no debe ser mayor a " });
            this.frmDatos.monto = 0
            return;
        }

        if (this.frmDatos.tipocambio == 0) {
            return;
        }


        if (this.frmDatos.idmoneda == 1) {
            this.frmDatos.montodolar = event / this.frmDatos.tipocambio;
        } else {
            this.frmDatos.montodolar = event * this.frmDatos.tipocambio;
        }
    }

    calcularDolaresT(event: any) {
        //console.log('calcularDolaresT', event);
        if (event > 9) {
            this.messageService.add({ severity: 'info', detail: "Tipo de Cambio no debe ser mayor a 9" });
            //this.formValue.tipocambio = 0
            return;
        }

        if (this.frmDatos.monto == 0) {
            return;
        }

        if (this.frmDatos.idmoneda == 1) {
            this.frmDatos.montodolar = this.frmDatos.monto / event;
        } else {
            this.frmDatos.montodolar = this.frmDatos.monto * event;
        }
    }

    changeFecha(event: Date) {
        console.log('changeFecha event', event);
        this.verjustificacion = false;
    }

    crearRegistro() {
        this.submitted = false;
        this.registerFormRegistro.reset();
        this.listaRegistroInicial = this.frmDatos.regoportunidadesext;
        this.IdRegistro = 0;
        this.paramRegistro = "N";
        this.headerTitle = "Nuevo Registro";
        this.registroVisible = true;
    }

    editarRegistro(data: any, index: number) {
        console.log(data);
        this.nroindex = index;
        this.submitted = false;
        this.registerFormRegistro.reset();
        this.listaRegistroInicial = this.frmDatos.regoportunidadesext;
        this.paramRegistro = "E";
        this.headerTitle = "Editar Registro";

        this.IdRegistro = data.idregoportunidadext;
        this.registerFormRegistro.patchValue(data);

        this.registroVisible = true;
    }

    eliminarRegistro(data: any, index: number) {
        this.confirmationService.confirm({
            key: 'confirm1',
            header: 'Confirmación',
            message: '¿Estás seguro de Eliminar el Registro?',
            icon: 'pi pi-exclamation-triangle text-3xl',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                this.frmDatos.regoportunidadesext?.splice(index, 1);
            }
        });
    }

    guardarRegistro() {
        this.submitted = true;
        // deténgase aquí si el formulario no es válido
        if (this.registerFormRegistro.invalid) {
            return;
        }
        //Verdadero si todos los campos están llenos
        if (this.submitted) {
            const _nomproveedor = this.lstProveedores.filter(x => x.idcliente === this.registerFormRegistro.idproveedor)[0].razonsocial;
            const _nommarca = this.lstMarcas.filter(x => x.idmarca === this.registerFormRegistro.idmarca)[0].nommarca;

            console.log('this.IdRegistro', this.IdRegistro);
            console.log('this.frmDatos.id', this.frmDatos.id);
            console.log('this.registerFormRegistro', this.registerFormRegistro);

            if (this.IdRegistro !== 0) {
                for (let i = 0; i < this.listaRegistroInicial.length; i++) {
                    if (this.IdRegistro === this.listaRegistroInicial[i].idregoportunidadext) {
                        this.frmDatos.regoportunidadesext?.splice(i, 1);
                    }
                }
            }

            if (this.IdRegistro === 0 && this.paramRegistro === "E") {
                console.log('entro listaRegistroInicial', this.listaRegistroInicial);
                for (let i = 0; i < this.listaRegistroInicial.length; i++) {
                    if (this.IdRegistro === this.listaRegistroInicial[i].idregoportunidadext && this.nroindex === i) {
                        console.log('entro', this.listaRegistroInicial[i].idregoportunidadext, i);
                        this.frmDatos.regoportunidadesext?.splice(i, 1);
                    }
                }
            }

            console.log('this.antes', this.regoportunidadesext);

            this.regoportunidadesext = {
                idregoportunidadext: this.IdRegistro,
                numregoportunidad: this.registerFormRegistro.numregoportunidad,
                idoportunidad: this.frmDatos.id,
                fechavence: this.registerFormRegistro.fechavence,
                idusuario: constantesLocalStorage.idusuario,
                idmarca: this.registerFormRegistro.idmarca,
                idproveedor: this.registerFormRegistro.idproveedor,
                nommarca: _nommarca,
                nomproveedor: _nomproveedor
            }
            console.log('this.regoportunidadesext', this.regoportunidadesext);

            this.frmDatos.regoportunidadesext?.unshift(this.regoportunidadesext);
            console.log('regoportunidadesext', this.frmDatos.regoportunidadesext);
            this.registroVisible = false;
        }
    }

    setFechaMin(event: Date) {
        this.maxDateValue = event;
    }

    crearRegistroTarea() {
        const desdeStr = this.utilitariosService.obtenerFechaActualFormat();
        console.log('desdeStr...', desdeStr);
        const inroorden = this.frmDatos.taskList.tasks.length + 1;
        this.newTask = { idtarea: 0, sidtarea: '', text: 'nueva tarea...!', completed: false, fechafin: '', fechaini: '', horafin: '00:00', horaini: '00:00', nroorden: inroorden, asignados: [{ idasignado: constantesLocalStorage.idusuario, name: constantesLocalStorage.nombreUsuario, image: constantesLocalStorage.imagen, idtarea: 0 }] };
        this.frmDatos.taskList?.tasks.unshift(this.newTask);
        this.timeout = setTimeout(
            () => this.inputTitle.nativeElement.focus(),
            1
        );
        this.calculateProgress();
    }

    calculateProgress() {
        console.log('Cálculo...');
        if (this.frmDatos.taskList) {
            let completed = this.frmDatos.taskList.tasks.filter(
                (t: { completed: any; }) => t.completed
            ).length;

            if (this.frmDatos.taskList.tasks.length == 0) {
                this.frmDatos.progress = 0;
            } else {
                this.frmDatos.progress = Math.round(
                    100 * (completed / this.frmDatos.taskList.tasks.length)
                );
            }
        }
    }

    draggedBlock: any;
    starter: number = 0;

    dragStart(task: any, i: number) {
        this.draggedBlock = task;
        this.starter = i;
        console.log("Start: " + i);
    }

    dragEnd() {
        this.draggedBlock = null;
    }

    drop(event: any, i: number) {
        console.log("Drop: " + i);
        this.frmDatos.taskList.tasks.splice(this.starter, 1);
        this.frmDatos.taskList?.tasks.splice(i, 0, this.draggedBlock);
    }

    focus(arg: number) {
        if (arg == 1) {
            this.timeout = setTimeout(
                () => this.inputTitle.nativeElement.focus(),
                1
            );
        }
        if (arg == 2) {
            this.timeout = setTimeout(
                () => this.inputTaskListTitle.nativeElement.focus(),
                1
            );
        }
        if (arg == 3) {
            this.timeout = setTimeout(
                () => this.inputTaskList.nativeElement.focus(),
                1
            );
        }
    }

    removeTask(index: number) {
        this.frmDatos.taskList.tasks.splice(index, 1);
        this.TaskList.emit(this.frmDatos.taskList);
        this.calculateProgress();
    }

    anexosT(dato: any, param: string) {
        // console.log("anexos : ", dato);
        // const ref = this.dialogService.open(CListadoFileComponent, {
        //     data: { idoportunidad: this.formValue.id , codtipoproc: 3, idnroproceso: dato.idtarea, parametro: param, texto: dato.text},
        //     header: this.formValue.title,
        //     styleClass: 'testDialog',
        //     closeOnEscape: false,
        //     closable: true,
        // });
    }

    AsignarTarea(task: Tasks) {
        console.log('task...', task);
        this.asignadosTareas = [];
        this.idtarea = task.idtarea;
        this._nroorden = task.nroorden;
        this.asignadosTareas = task.asignados;
        this.headerTitle = 'Asignados de la Tarea';
        this.headerTarea = 'Tarea: ' + task.text;
        this.asignadosTareaVisible = true;
    }

    filterAssignees(event: any) {
        let filtered: Assignees[] = [];
        let query = event.query;

        for (let i = 0; i < this.assignees.length; i++) {
            let assignee = this.assignees[i];
            if (
                assignee.name &&
                assignee.name.toLowerCase().indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(assignee);
            }
        }

        this.filteredAssignees = filtered;
        console.log('this.filteredAssignees...', this.filteredAssignees);
    }

    changeHeaderTitle(arg: number, contac: any) {
        console.log('changeHeaderTitle...', this.frmDatos.idcliente);

        if (this.frmDatos.idcliente === 0) {
            this.messageService.add({ severity: 'info', detail: "Debe elegir un cliente" });
            return;
        }

        this.submitted = false;
        this.registerFormContacto.reset();

        this.listaContacInicial = this.frmDatos.contactos;
        console.log('lista contactos', this.listaContacInicial);

        if (arg == 1) {
            this.headerTitle = "Nuevo Contacto";
            this.IdContacto = 0;
        }
        if (arg == 2) {
            this.headerTitle = "Editar Contacto";
            this.IdContacto = contac.idcontacto;
            this.registerFormContacto.get('nombrecontacto').setValue(contac.nombrecontacto);
            this.registerFormContacto.get('email').setValue(contac.email);
            this.registerFormContacto.get('telefono').setValue(contac.telefono);
            this.registerFormContacto.get('cargo').setValue(contac.cargo);
            this.registerFormContacto.get('tiporol').setValue(contac.tiporol);

        }
        this.contactoVisible = true;
    }

    filterContac(event: any) {
        let filtered: Contacto[] = [];
        let query = event.query;

        for (let i = 0; i < this.lstTotalcontacs.length; i++) {
            let contac = this.lstTotalcontacs[i];
            if (
                contac.nombrecontacto &&
                contac.nombrecontacto.toLowerCase().indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(contac);
            }
        }
        this.filteredContac = filtered;
    }

    Quote(data: any) {
        //this.parent.sidebarVisible = false;
        this.verCotizacion.emit(data);
    }

    businessCase(data: KanbanCard) {
        this.verBussines.emit(data);
    }

    crearProyecto(data: any) {
        console.log('crearProyecto...', data);
        this.confirmationService.confirm({
            key: 'confirm1',
            header: 'Confirmación',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            //target: event.target || new EventTarget,
            message: '¿Desea Generar Código de Proyecto.?',
            icon: 'pi pi-exclamation-triangle text-6xl',
            accept: () => {
                this.generarCodigo(data);
            }
        });
    }

    generarCodigo(data: any) {
        const objeto = {
            idtipoproyecto: 1,
            idoportunidad: data.id,
            idrequerimiento: 0,
            nomproyecto: data.title,
            descripcion: data.description,
            idusuario: constantesLocalStorage.idusuario
        }
        console.log('objeto...', objeto);
        this.leadService.newProyecto(objeto).subscribe({
            next: (rpta: any) => {
                console.log('generarCodigo...', rpta);
                if (rpta.procesoSwitch === 0) {
                    this.messageService.add({ severity: 'success', summary: 'OK...', detail: rpta.mensaje });
                    this.oportunidadTraerUno();
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error...', detail: rpta.mensaje });
                }
            },
            error: (err) => {
                console.info('error : ', err);
                this.messageService.add({ severity: 'error', summary: 'Error...', detail: err.message });
            },
            complete: () => {
            },
        });
    }

    oportunidadTraerUno() {
        this.setSpinner(true);
        this.leadService.oportunidadTraeruno(this.frmDatos.id).subscribe({
            next: (rpta: any) => {
                this.setSpinner(false);
                console.log('oportunidadTraerUno', rpta);
                this.frmDatos = { ...rpta };
                this.cambioDolaresK(rpta.idmoneda);
                this.minimaFechaAmpli = new Date(this.utilitariosService.formatFecha(this.frmDatos.dueDate));
                if (this.frmDatos.fecampliacion === '01/01/1900' || this.frmDatos.fecampliacion === null) {
                    this.frmDatos.fecampliacion = '';
                    this.verjustificacion = true;
                    this.verfecAmplia = false;
                } else {
                    this.verfecAmplia = true;
                    this.verjustificacion = true;
                }
            },
            error: (err) => {
                this.setSpinner(false);
                console.info('error : ', err);
                this.messageService.clear();
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message,
                });
            },
            complete: () => {
            },
        });
    }

    cambioDolaresK(id: any) {
        this.frmDatos.montodolar = 0;
        if (id === 1) {
            this.etiquetaMonto = "Monto Dolares";
            if (this.frmDatos.monto > 0 && this.frmDatos.tipocambio > 0) {
                this.frmDatos.montodolar = this.frmDatos.monto / this.frmDatos.tipocambio;
            }
        }
        if (id === 2) {
            this.etiquetaMonto = "Monto Soles";
            if (this.frmDatos.monto > 0 && this.frmDatos.tipocambio > 0) {
                this.frmDatos.montodolar = this.frmDatos.monto * this.frmDatos.tipocambio;
            }
        }
    }

    anexosK(dato: any, param: string) {
        // const ref = this.dialogService.open(CListadoFileComponent, {
        //     data: { idoportunidad: this.formValue.id , codtipoproc: 1, idnroproceso: 0, parametro: param},
        //     header: this.formValue.title,
        //     styleClass: 'testDialog',
        //     closeOnEscape: false,
        //     closable: true,
        // });
    }
}
