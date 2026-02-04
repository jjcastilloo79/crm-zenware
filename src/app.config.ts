import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { MsalService, MsalGuard, MsalBroadcastService, MSAL_INSTANCE, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';

export function msalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            clientId: 'ffe8b473-e4f7-4107-9f29-6ae05838f1e2',
            authority: 'https://login.microsoftonline.com/02157777-a391-40f4-b293-125e2aee9f72',
            //redirectUri: 'http://localhost:4200/auth',
            
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false
        }
    });
}

export function interceptorConfigFactory() {
    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me', ['User.Read']]])
    };
}

// export const msalInstance = new PublicClientApplication({
//   auth: {
//     clientId: 'ffe8b473-e4f7-4107-9f29-6ae05838f1e2',
//     authority: 'https://login.microsoftonline.com/02157777-a391-40f4-b293-125e2aee9f72',
//     redirectUri: '/',
//     postLogoutRedirectUri: '/'
//   },
//   cache: {
//     cacheLocation: 'localStorage',
//     storeAuthStateInCookie: false
//   }
// });

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),

        {
            provide: MSAL_INSTANCE,
            useFactory: msalInstanceFactory
            //  useFactory: async () => {
            //     await msalInstance.initialize();
            //     return msalInstance;
            // },
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useValue: {
                interactionType: InteractionType.Redirect
            }
        },

        MsalService,
        MsalGuard,
        MsalBroadcastService
    ]
};
