import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { constantesApiWeb } from '../model/apiVariables';

@Injectable({ providedIn: 'root' })
export class LeadService {

    constructor(@Inject(HttpClient) private http: HttpClient) { }

    obtenerClientes(tipoRol:string) {
        const url = `${constantesApiWeb.kanbanListaClientes}${tipoRol}`;
        return this.http.get<any>(url);
    }

    OportunidadesLista(objeto:any) {
        const url = `${constantesApiWeb.OportunidadListar}`;
          return  this.http.post<any>(url, objeto);
    }

    obtenerItemsTabla(id:number) {
        const url = `${constantesApiWeb.lstItemsTabla}${id}`;
        return this.http.get<any>(url);
    }

    newProyecto(objeto:any) {
        const url = `${constantesApiWeb.newProyecto}`;
        return  this.http.post<any>(url, objeto)
    }

     oportunidadTraeruno(idportunidad:string) {
        const url = `${constantesApiWeb.kanbanOportunidadUno}${idportunidad}`;
        return this.http.get<any>(url);
    }
}
