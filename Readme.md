# Teste ByCoders (bycoders)

## About project

Clean code, boas práticas e  boa gestão do estado do app foram os principais focos quando se fala de codificação, já em relação a
Desing UX foi priorizado a praticidade, ultizando um tema dark para poder permanecer um longo período de tempo assistindo os vídeos pela plataforma.
 
Foi utilizado as seguintes tecnologias:
> Framework Quasar.dev (https://quasar.dev/)
  📚 Material UI
  🌐 Google Icons
> Framework Vue.js (https://vuejs.org/)
  📂 Vuex
  📂 Router
  📂 ESlint (linters)
> Lib Vue3GoogleOauth (https://www.npmjs.com/package/vue3-google-oauth2)
 
A aplicação:
 > Fornece um mecanismo para o usuário poder pesquisar vídeos
 > Possui home page que exiba algum conteúdo interessante para uma plataforma de vídeos
 > Fornece uma estrutura de gerência do estado da aplicação
 
Como desenvolvimento extra foi desenvolvido: 
 > Permite cadastro de usuário / login através da API do YouTube + OAuth2
 > Player de controle dos vídeos em execução
 > Checkbox com gráfico para controlar os vídeos assitidos (persistindo localmente)

### Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
desafio-frontend
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   ├── layouts/
│   │   ├── MainLayout/
│   ├── pages/
│   │   ├── Index.vue/
│   │   ├── Videos.vue/
│   ├── store/
│   │   ├── user-google/
│   │   ├── videos-google/
│   └── libs/
│       ├── Notify/
│       ├── credencials/
│       │   ├── client_secret/
│       └── main.scss
├── index.template.html
└── App.vue

```

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
