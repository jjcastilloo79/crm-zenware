export interface I_loginUsuario {
    nombreUsuario: string;
    clave: string;
}

export interface I_respuestaLogin {
    estado: boolean;
    mensaje: string;
    respuestaData: I_rptaDataLogin;
}

export interface I_rptaDataLogin {
    nombreUsuario: string;
    login: string;
    imagen:string;
    estado: number;
    idusuario: number;
    mensaje: string;
    token: string;
    tipoacceso: string;
    idperfil: number;
    nomperfil: string;
}

export interface I_Menu {
    label:    string;
    icon:    string;
    routerLink: string;
    items:    any;
}

export interface I_respuestaGeneral {
    estado: boolean;
    mensaje: string;
    respuestaData: any;
}

export interface I_ConfirmDialog {
    message?: string;
    header?: string;
    rejectButtonStyleClass?: string;
    acceptButtonStyleClass?: string;
    acceptLabel?: string;
    acceptIcon?: string;
    rejectLabel?: string;
    rejectIcon?: string;
}

export interface I_MessageToast {
    severity?: string;
    summary?: string;
    detail?: string;
}


export interface I_RespuestaProceso{
    procesoSwitch: number
    errorNumero:number;
    errorSeveridad:number;
    errorEstado:number;
    errorProcedimiento:string;
    errorLinea:number;
    mensaje:string;
    resultProceso:string;
}

export interface Users {
    idusuario: number;
    name?: string;
    image?: string;
    indvig?: boolean;
    fechaini?: string;
    fechafin?: string;
    nomusuario?: string ;
    url1?: string ;
    email?: string ;
}

export interface KanbanCard {
    id: string ;
    title?: string;
    description?: string;
    startDate?: string;
    dueDate: string;
    completed?: boolean;
    progress?: number;
    idcliente?:number;
    assignees?: Assignees[];
    comments?: Comments[];
    contactos?: Contacto[];
    priority?: object;
    attachments?: number;
    taskList: TaskList;
    monto: number;
    idlista?: number;
    razonsocial?: string;
    simbmoneda?: string;
    idmoneda?:number;
    nroasignados?: number;
    nrocontactos?: number;
    nrotareas?: number;
    nroadjuntos?: number;
    nomlista?: string;
    idpreventa?:number;
    acciones?: Acciones[]|undefined;
    bgcolor?: string;
    bgicon?: string;
    tipocambio: number;
    nomcreador?: string;
    tipoproducto?: undefined;
    nommoneda?: string;
    indestado_qu?: boolean;
    indestado_bc?: boolean;
    nomestado_qu?: string;
    nomestado_bc?: string;
    montodolar?: number;
    nomcomercial?: string;
    nompreventa?: string;
    nomproveedor?: string;
    idproveedor?:number;
    idmarca?:number;
    regoportunidadesext?: RegOportunidadExt[];
    idtrx?: number;
    preventas?: Assignees[];
    idnotifica?: number;
    codigoproyecto?: string;
    fecampliacion: string;
    justificacion?: string;
    fechacierre?: string;
    prcannio?: number;
    desproblema?: string;
    despersona?: string;
    desproyecto?: string;
    despresupuesto?: string;
    desprioridad?: string;
    desplazos?: string;
    desproceso?: string;
    descompetencia?: string;
    planes?: Plan[];
    idtipoprod?: number;
    idorigenopor?: number;
    idsectorind?: number;
}

export interface Plan{
    idplan: number;
    idoportunidad: number;
    descripcion?: string;
    fecha: string;
    indvig?: boolean;
    completo?: boolean;
    codplan?: number;
}

export interface RegOportunidadExt{
    idregoportunidadext: number;
    idoportunidad: string;
    numregoportunidad: string;
    fechavence: string;
    idusuario: number;
    idproveedor?:number;
    idmarca?:number;
    nommarca?: string;
    nomproveedor?: string;
}


export interface KanbanList {
    map: any;
    //listId: number;
    listId: string;
    title?: string;
    cards: KanbanCard[];
    nroorden: number;
    indvig: boolean;
    bgcolor: string;
    bgicon: string;
    creaOportunidad: number;
    porcentaje?: string;
    codigoproyecto?: string;
}

export interface Acciones {
    idtrx: number;
    nomtrx?: string;
    nomtrxbtn?: string;
}
export interface Comments {
    idcomentario: number;
    name: string;
    image?: string;
    text: string;
    fechareg: string;
}

export interface TaskList {
    id?: number;
    title: string;
    tasks: Tasks[];    
}

export interface Tasks {
    idtarea: number;
    sidtarea: string;
    text: string;
    completed: boolean;
    fechafin: string;
    asignados: TareaAsignado[];
    asignados_str?: string;
    nroorden: number;
    fechaini: string;
    nomasignados?: string;
    horafin?: string;
    horaini?: string;
    descripcion?: string;
}


export interface Assignees {
    idasignado: number;
    name: string;
    image: string;
}

export interface TareaAsignado {
    idasignado: number;
    name: string;
    image: string;
    idtarea: number;
}

export interface Priority {
    color?: string;
    title?: string;
}

export interface Contacto {
    idcontacto: number;
    idcliente?: number;
    nombrecontacto?: string;
    cargo?: string;
    email?: string;
    telefono?: string;
    image?: string;
    idcotiza?: number;
    tiporol?: number;
    nomtiporol?: string;
}
