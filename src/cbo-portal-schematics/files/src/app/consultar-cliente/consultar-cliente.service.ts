import { Injectable } from '@angular/core';
import { CboHttpClientService } from 'cbo-portal-common-lib';
import { Observable } from 'rxjs';
import {
  ConsultarMCIInputV1,
  ConsultarMCIOutputV1,
} from './consultar-cliente.models';

@Injectable({
  providedIn: 'root',
})
export class ConsultarClienteService {
  constructor(private http: CboHttpClientService) {}

  consultarMciCliente(
    input: ConsultarMCIInputV1,
  ): Observable<ConsultarMCIOutputV1> {
    return this.http.post(
      '/api/cfe-mci/api/v1/consultarmci/WEB_CORRESPONDENTE_BANCARIO_CHAVEJ/por-cpf',
      input,
    );
  }
}
