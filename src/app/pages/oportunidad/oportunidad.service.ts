import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { constantesApiWeb } from '../model/apiVariables';

@Injectable({ providedIn: 'root' })
export class OportunidadService {

    constructor(@Inject(HttpClient) private http: HttpClient) { }

  ListaProveedores(objeto: any) {
        const url = `${constantesApiWeb.ListaProveedores}`;
        return this.http.post<any>(url, objeto)
    }

    listarOportxCliente(objeto: any) {
        const url = `${constantesApiWeb.listarOportxCliente}`;
        return this.http.post<any>(url, objeto)
    }

    listarUsuariosxPerfil(idperfil:any) {
        const url = `${constantesApiWeb.kanbanListaUsuarioxPerfil}${idperfil}`;
        return this.http.get<any>(url);
    }

    OportunidadesLista(objeto:any) {
        const url = `${constantesApiWeb.OportunidadListar}`;
          return  this.http.post<any>(url, objeto);
    }

    listaTareas(objeto:any) {
    const url = `${constantesApiWeb.listaGestionTareas}`;
      return  this.http.post<any>(url, objeto)
  }
}
