import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../auth.service';
import { I_rptaDataLogin } from '@/pages/model/interfaces';
import { mensajesQuestion, moduloAPP, tipoAcceso, mensajesGenericos } from '@/pages/model/constantes';
import { MessageService } from 'primeng/api';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventType } from 'node_modules/@azure/msal-browser/dist/event/EventType';
import { AccountInfo, AuthenticationResult, EventMessage, InteractionStatus, LogLevel, PopupRequest, PublicClientApplication, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { LocalStorageService } from '@/pages/service/localStorage.service';
import { Toast } from "primeng/toast";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, Toast],
    templateUrl: './login.html',
    providers: [MessageService],
})

export class Login {
    $listSubcription: Subscription[] = [];
    @Output() OB_pass = new EventEmitter<boolean>();
    @Output() OS_nombreUser = new EventEmitter<string>();
    //private msal = inject<PublicClientApplication>(MSAL_INSTANCE);
  
    isLoading: boolean = false;
    //loginUser: FormControl = new FormControl({ value: null, disabled: false }, [Validators.required]);
    loginUser!: any;
    email: string = '';
    password: string = '';
    checked: boolean = false;
    isIframe = false;
    loginDisplay = false;
    msalInstance:any;
  _homeAccountId:string = '';

     private readonly _destroying$ = new Subject<void>();

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        //@Inject(MSAL_INSTANCE) private msal: PublicClientApplication,
        protected router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private msalService: MsalService,
        private msalBroadcastService: MsalBroadcastService,
        private localStorage: LocalStorageService,
    ) { }

     ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
        this.setLoginDisplay();

        this.msalService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
        this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
        )
        .subscribe((result: EventMessage) => {
            if (this.msalService.instance.getAllAccounts().length === 0) {
            window.location.pathname = "/";
            } else {
            this.setLoginDisplay();
            }
        });

        this.msalBroadcastService.inProgress$
        .pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None),
            takeUntil(this._destroying$)
        )
        .subscribe(() => {
            this.setLoginDisplay();
            this.checkAndSetActiveAccount();
        })
    }

    setLoginDisplay() {
        this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    }

    checkAndSetActiveAccount() {
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        let activeAccount = this.msalService.instance.getActiveAccount();

        if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
        let accounts = this.msalService.instance.getAllAccounts();
        this.msalService.instance.setActiveAccount(accounts[0]);
        }
    }

   

   validaNombreUsuario(): void {
    this.isLoading = true;

    const $validaNombreUsuario = this.authService.validaNombreUsuario({ loginUser: this.email, moduloAPP })
      .subscribe({
        next: (rpta: I_rptaDataLogin) => {
          this.isLoading = false;
          if (rpta.estado != 1) {
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'Acceso denegado',
              detail: rpta.mensaje
            })
            return;
          };
          //this.isLoading = false;
          if (rpta.tipoacceso == tipoAcceso.azure) {
            this.loginAzure();
          } else {
            this.OB_pass.emit(true);
            this.OS_nombreUser.emit(this.loginUser.value)
          }
          //this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: mensajesGenericos.msgErrorGenerico
          })
        },
        complete: () => { }
      });
    this.$listSubcription.push($validaNombreUsuario)
  }

  async loginAzure() {
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: 'b65e275c-ca73-4aac-b3e3-fd74c0658fd8',
        authority: 'https://login.microsoftonline.com/02157777-a391-40f4-b293-125e2aee9f72',
        //postLogoutRedirectUri: 'http://localhost:4200/',
      },
      system: {
        //allowNativeBroker: true,
         loggerOptions: {
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false
        }
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      }
    });

    try {
      await this.msalInstance.initialize();
      const _login = await this.msalInstance.loginPopup();
      //console.log("_login : ", _login);
      this.msalInstance.setActiveAccount(_login.account);
      const _acquireToken = await this.msalInstance.acquireTokenSilent({
        scopes: ["email", "openid", "profile", "User.Read"]
      });
      //console.log("_acquireToken : ", _acquireToken);
      
      const cuentaUsuario: AccountInfo = this.msalInstance.getAccountByHomeId(_acquireToken.account.homeAccountId)!;
      const {idToken, homeAccountId, name, username} = cuentaUsuario;

      console.log("cuentaUsuario : ", cuentaUsuario);

      this._homeAccountId = homeAccountId
      this.validarloginAzure(name, username);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  validarloginAzure(nombreUser:string|undefined, emailUser:string){
    const $validarloginAzure = this.authService.validarloginAzure({ loginUser: this.email, nombreUser: nombreUser, emailUser: emailUser, moduloAPP})
    .subscribe({
      next: (rpta: I_rptaDataLogin) => {
        this.isLoading = false;
        if (rpta.estado != 1) {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Acceso denegado',
            detail: rpta.mensaje
          })
          this.logoutAzure();
          return;
        };
        if (rpta.idusuario == 0){
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Usuario/Email denegado',
            detail: rpta.mensaje
          })
          this.logoutAzure();
          return;
        }
        rpta.nombreUsuario = this.email
        this.localStorage.setearLocalStorage(rpta);
        this.isLoading = false;
        this.router.navigate(['/pages/oportunidad'])
      },
      error: (err) => {
        this.logoutAzure();
        this.isLoading = false;
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: mensajesGenericos.msgErrorGenerico
        })
      },
      complete: () => { }
    });
  this.$listSubcription.push($validarloginAzure)
  }

  async logoutAzure() {
    try {
      const currentAccount = this.msalInstance.getAccountByHomeId(this._homeAccountId);
      const logoutRed = await this.msalInstance.logoutPopup({ 
        account: currentAccount,
        //postLogoutRedirectUri: 'http://localhost:4200/'
      });
      //console.log("logoutRed : ", logoutRed);
      
    } catch (error) {
      //console.error("Error al cerrar la sesión: ", error);
    }
  }
 
}
