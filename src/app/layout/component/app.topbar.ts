import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { AppConfigurator } from "./app.configurator";
import { constantesLocalStorage } from '@/pages/model/constantes';
import { ScriptService } from './script.service';
import { LocalStorageService } from '@/pages/service/localStorage.service';
import { I_rptaDataLogin } from '@/pages/model/interfaces';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ImageModule],
    template: ` <div class="layout-topbar fonthead">
        <div class="layout-topbar-logo-container">
          
              <button class="layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars text-white font-bold"></i>
            </button>
           
            <a class="flex">
               
                <img src="assets/layout/images/ico_negativo_sinfondo.png" style="height: 45px" />
                <span class="text-2xl mt-6 font-bold">CRM Zenware</span>
            </a>

        </div>

        <div class="layout-topbar-actions">

            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <!-- <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button> -->
                    <app-configurator />
                </div>
                
            </div>
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <div class="relative">
                        <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user text-white text-4xl font-bold"></i>
                    </button>
                    </div>
                    
                    <!-- <a pStyleClass="@next" enterClass="ng-hidden" enterActiveClass="px-scalein" leaveToClass="ng-hidden" leaveActiveClass="px-fadeout" [hideOnOutsideClick]="true" pRipple>
                        <p-image [src]="logoUsuario" alt="avatar" class="w-2rem h-2rem"/>
                    </a>
                    <div class="ng-hidden">
                        <ul class="list-none p-0 m-0">
                            <li>
                                <a class="cursor-pointer flex align-items-center py-2 hover:surface-hover transition-duration-150 transition-all px-3 py-2" pRipple>
                                    <i class="pi pi-user-edit mr-2"></i>
                                    <span>Perfil</span>
                                </a>
                            </li>
                            <li>
                                <a class="cursor-pointer flex align-items-center py-2 hover:surface-hover transition-duration-150 transition-all px-3 py-2" pRipple>
                                    <i class="pi pi-power-off mr-2"></i>
                                    <span>Cerrar sesión</span>
                                </a>
                            </li>
                        </ul>
                    </div> -->
                    
                    <span class="text-xl ml-1 mt-2 font-bold">{{nomUsuario}}</span>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    logoUsuario: String = ''
    nomUsuario!: string;
    Usuario!:I_rptaDataLogin;

    constructor(
        public layoutService: LayoutService,
        private scriptService: ScriptService,
        private localStorage: LocalStorageService,
    ) {
        
    }

    ngOnInit(): void {
        this.Usuario = JSON.parse(localStorage.getItem('ZENWARE_OPOR')!);
        console.log('Usuario', this.Usuario);
        this.nomUsuario = this.Usuario.nombreUsuario;
        this.logoUsuario = this.Usuario.imagen; 
        this.scriptService.load('uw');
        //this.localStorage.obtenerDataGeneral();
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
