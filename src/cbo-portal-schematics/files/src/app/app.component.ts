import { Component, OnInit } from '@angular/core';
import { CboDadosAppModel, CboStorageService } from 'cbo-portal-common-lib';

declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  informacoes: string = 'Versão: ' + require('../../package.json').version;

  title = '<%= dasherize(name) %>';
  nomePagina = 'Projeto Padrão da Nova Plataforma do Correspondente';

  constructor(private cboStorageService: CboStorageService) {}

  ngOnInit(): void {
    this.initApp();
  }

  private initApp(): void {
    this.cboStorageService.setDadosApp(
      new CboDadosAppModel(
        'Projeto Padrão da Nova Plataforma do Correspondente',
        '<%= dasherize(name) %>',
      ),
    );
  }
}
