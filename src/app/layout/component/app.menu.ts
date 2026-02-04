import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Subscription } from 'rxjs';
import { AuthService } from '@/pages/auth/auth.service';
import { constantesLocalStorage, moduloAPP } from '@/pages/model/constantes';
import { PanelMenu } from "primeng/panelmenu";

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
    
    <ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> 
    <!-- <p-panelMenu [model]="model" class="custom-panelmenu"></p-panelMenu> -->
    `
})
export class AppMenu {
    model: any[] = [];

     $listSubcription: Subscription[] = [];

    constructor(private serviceAuth: AuthService){ }

    ngOnInit() {
        this.model = [
            
            {
                label: 'OPORTUNIDAD X',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/dashboard'] },
                    { label: 'Oportunidad', icon: 'pi pi-fw pi-list', routerLink: ['/oportunidad/oportunidad'] },
                    { label: 'Lead', icon: 'pi pi-fw pi-table', routerLink: ['/lead/lead'] },
                    { label: 'Agenda', icon: 'pi pi-fw pi-calendar', routerLink: ['/agenda/agenda'] },
                    { label: 'Acciones', icon: 'pi pi-fw pi-list', routerLink: ['/accion/accion'] },
                    { label: 'Balance Actividades', icon: 'pi pi-fw pi-list', routerLink: ['/balance/balance'] },

                    // { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            }
        ];
        //this.getMenuItems();
    }

     ngOnDestroy() {
        if (this.$listSubcription != undefined) {
          this.$listSubcription.forEach((sub) => sub.unsubscribe());
        }
    }

    getMenuItems() {
        const $obtenerMenu = this.serviceAuth.obtenerMenu(moduloAPP, constantesLocalStorage.idusuario)
          .subscribe({
            next: (rpta:any) => {
                console.log('obtenerMenu...', rpta);
                this.model = rpta;
            },
            error:(err)=>{ },
            complete:() => { }
          });
        this.$listSubcription.push($obtenerMenu);
    }
}
