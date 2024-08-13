# <%= dasherize(name) %>

Esse projeto foi criado para servir de ponto de partida para criação de aplicações de frontend da Plataforma de Parceiros. Ele foi gerado com Angular 15 e utiliza o [DLS BB Angular](https://angular.dls.desenv.bb.com.br/) como bibliotecas de componentes visuais.

## Requisitos Básicos

Para rodar o projeto, deve-se usar uma versão do node compatível com Angular 15 (node 14+) instalada e configurada para utilizar os repositórios do BB. Recomendamos utilizar o NVM para gerenciar as versões de node no seu ambiente de desenvolvimento.

Para que todo ambiente seja criado e configurado, recomendamos o uso do [Pengwin](https://fontes.intranet.bb.com.br/dev/publico/pengwin). Com ele todos os sotfwares e as configurações necessários para desenvolvimento no BB são feitos de forma facilitada.

Como IDE recomendamos utilizar o VS Code.

## Utilizando o projeto

Após clonar o projeto. Basta executar o `npm install` para instalar as dependências necessárias.

Após o install, é só executar o `npm start` que o projeto será iniciado. Durante a primeira execução, será realizado o download e configuração dos projetos cbo-portal-web-ui e cbo-portal-acesso. Esses projetos são necessários para rodar a aplicação.

Iniciado o projeto, basta acessar o endereço <http://localhost:4200/cbo-portal-acesso/#/> e efetuar o login para usar a aplicação. Recomendamos usar uma guia anônima para evitar carregar um cache de projetos anteriores.

## Refatorando o Código

Apesar de ser totalmente funcional, esse projeto serve apenas de base para que uma aplicação de negócio seja criada. Então são necessários alguns passos para que você possa utilizá-lo.

### 1º Subustituir o nome do projeto

Você deve substituir todas as ocorrências de `<%= dasherize(name) %>`, para `<sua sigla>-<seu projeto>`

### 2º Alterar o nome da página

No arquivo `src/app/app.component.ts` alterar as strings com o valor `'Projeto Padrão da Nova Plataforma do Correspondente'` para um texto que represente sua aplicação.

### 3º Configurar proxy da aplicação (se necessário)

A aplicação utiliza um proxy para os contextos `/cbo-portal-acesso`, `/cbo-portal-web-ui` e `/api`.

O `/api` está apontado para homologação, caso necessário, você pode apontá-lo para outros ambientes. Talvez, para seu projeto, possa ser necessário incluir novos contexto no proxy.

Para fazer isso basta editar o arquivo `run/proxyHttp.conf.js`

### 4º Criando novos componentes e módulos

Recomendamos utilizar um partner baseado em feature modules, onde cada módulo entrega um valor para o usuário do sistema.

[Nessa página](https://angular.io/guide/feature-modules) da documentação do Angular tem uma explicação desse conceito.

Isso facilita a manutenção e evolução de seu projeto.

O módulo `consultar-cliente` foi construído para servir de exemplo para acionamentos de serviços e implementação de teste. Você pode usá-lo como referência, mas deve removê-lo de seu projeto.

### 5º Editar o README.md

Esse arquivo é referência para o projeto <%= dasherize(name) %>. Após utilizá-lo para criar seu próprio projeto, esse texto não fará mais sentido e você deve reescrevê-lo com informações relevantes para sua aplicação.

## Build, Deploy e Publicação

O build e deploy da sua aplicação segue a esteira da Arq3 do Banco do Brasil para aplicações Javascript. Você pode entender melhor essa esteira acessando a [documentação da Arq3](https://fontes.intranet.bb.com.br/aic/publico/atendimento/-/wikis/Pipelines/Javascript). O repositório do código para sua aplicação deve ser criado via oferta do [Portal OAAS](https://portal.nuvem.bb.com.br/).

Após deploy, para que sua aplicação fique disponível no Portal da Plataforma de Parceiros, deve ser criado o menu para ela. A solicitação de criação do menu e publicação do mesmo poder ser feito através da abertura de uma [Issue](https://fontes.intranet.bb.com.br/cbo/publico/atendimento/-/issues).

## Dúvidas e Suporte

Esse projeto foi criado e é mantido pela equipe da sigla CBO. Seu suporte é feito através de issues.

Você pode criar e consultar issues [nesse link](https://fontes.intranet.bb.com.br/cbo/publico/atendimento/-/issues).

Você também pode acessar a [documentação da Plataforma de Parceiros](https://fontes.intranet.bb.com.br/cbo/publico/cbo-portal-docs).
