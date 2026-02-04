import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication } from '@azure/msal-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {

     private msalState = inject<IPublicClientApplication>(MSAL_INSTANCE);
    
     
      ngOnInit() {
    this.msalState.initialize();

     
  }
}
