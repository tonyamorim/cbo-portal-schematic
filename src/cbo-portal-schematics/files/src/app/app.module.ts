import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  CboAuthInterceptor,
  CboCommonModule,
  CboLoaderInterceptor,
} from 'cbo-portal-common-lib';
import { BbLayoutModule, BbThemeModule } from 'dls-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultarClienteModule } from './consultar-cliente/consultar-cliente.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BbThemeModule.forRoot({ name: 'serotonina' }),
    BbLayoutModule.forRoot(),
    CboCommonModule,
    ConsultarClienteModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CboLoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CboAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
