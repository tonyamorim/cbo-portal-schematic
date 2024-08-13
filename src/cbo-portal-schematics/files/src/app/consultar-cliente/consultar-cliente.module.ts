import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BbButtonModule, BbCardModule, BbTextFieldModule } from 'dls-angular';
import { ConsultarClienteComponent } from './consultar-cliente.component';
import { CboCommonModule } from 'cbo-portal-common-components';

@NgModule({
  declarations: [ConsultarClienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    BbButtonModule,
    BbCardModule,
    BbTextFieldModule,
    CboCommonModule,
  ],
  exports: [ConsultarClienteComponent],
})
export class ConsultarClienteModule {}
