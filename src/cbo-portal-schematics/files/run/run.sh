#!/bin/bash

function solicitaCredenciais() {
  if [ -z "$USER_BINARIOS" ]; then
  echo "Informe sua matrícula de usuário:"
  read -r -p "Chave: " USER_BINARIOS
  if [[ "${USER_BINARIOS}" -gt 8 ]]; then
    textoErro "Por favor informe a matricula com até 8 caracteres."
    exit 1
  fi
  read -r -sp "Senha do SisBB: " PASSWORD_BINARIOS
  if [[ -z "$PASSWORD_BINARIOS" ]]; then
    textoErro "Por favor informe a senha."
    exit 1
  fi
  echo -e ''
  if [[ "${USER_BINARIOS}" =~ ^[c,C] ]]; then
    read -r -p "Endereço do proxy da empresa no formato 'http://<ip>:<porta>':" PROXY_EMPRESA
    OPTION_PROXY=" -x $PROXY_EMPRESA"
  fi
  echo
  fi
}

function localizarAcesso(){
    if [ -d "$PATH_NODE_MODULES/cbo-portal-acesso" ]; then
        echo "Acesso instalado."
    else
        echo "Acesso não instalado, inciando download."
        downloadPacote cbo-portal-acesso https://binarios.intranet.bb.com.br:443/artifactory/npm-bb-apps-atfleg-local/cbo-portal-acesso/-/cbo-portal-acesso-1.0.19.tgz
    fi
}

function localizarWebui(){
    if [ -d "$PATH_NODE_MODULES/cbo-portal-web-ui" ]; then
        echo "Web-ui instalado."
    else
        echo "Web-ui não instalado, inciando download."
        downloadPacote cbo-portal-web-ui https://binarios.intranet.bb.com.br:443/artifactory/npm-bb-local/cbo-portal-web-ui/-/cbo-portal-web-ui-1.2.42.tgz
    fi
}

function descompactarPacote(){
    mkdir "$PATH_NODE_MODULES/$1"
    tar -zxvf "$PATH_NODE_MODULES/$1.tgz" -C "$PATH_NODE_MODULES/$1/"
    rm -rf "$PATH_NODE_MODULES/$1.tgz"
}

function downloadPacote() {
  NOME_PACOTE="$1"
  LINK="$2"
  if [ -r "$PATH_NODE_MODULES/$1" ]; then
     echo "Encontrou o arquivo $1."
     descompactarWebui
  else
    echo "Não encontrou o arquivo $1.tgz, iniciando o download de " $2
    solicitaCredenciais
    set +e
    CODE=$(curl -w %{http_code} ${OPTION_PROXY} -u ${USER_BINARIOS}:${PASSWORD_BINARIOS} -k "${LINK}" -o "$PATH_NODE_MODULES/$1.tgz")
    ERRO=$?
    set -e
    if [[ "$CODE" =~ ^2 ]]; then
      echo "Baixou o $1.tgz com sucesso"
      descompactarPacote "$1"
    else
      textoErro "Não foi possivel baixar o $1.tgz, retornou status code: $CODE. \n"
      textoErro "O comando curl retornou o erro: $ERRO . Erros do curl: https://curl.se/libcurl/c/libcurl-errors.html \n"
      textoErro "Tente baixar manualmente do endereço $LINK e coloque dentro da pasta node_modules do projeto. \n"
      rm -rf "$PATH_NODE_MODULES/$1.tgz"
      exit 1
    fi
  fi
}

function textoErro() {
  printf "%b" "\e[1;31m"
  printf "$1"
  printf "\e[0m"
}

function executarApp(){
    node run/server.js &
    ng serve --proxy-config run/proxyHttp.conf.js
}

printf '==========================================================================\n'
printf '=======================  INSTALANDO SERVIDOR LOCAL =======================\n'
printf '==========================================================================\n'

PATH_NODE_MODULES="$PWD/node_modules"
if [ -d "$PATH_NODE_MODULES" ]; then
    echo "Diretório node_modules encontrado."
    localizarAcesso
    localizarWebui

    printf '==========================================================================\n'
    printf '===========================  INICIANDO PROJETO ===========================\n'
    printf '==========================================================================\n'

    executarApp
    ctrl_c
else
    echo "Diretório node_modules não encontrado. Execute o 'npm install' antes do 'npm start'."
fi
