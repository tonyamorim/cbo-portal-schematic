import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarClienteComponent } from './consultar-cliente/consultar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
