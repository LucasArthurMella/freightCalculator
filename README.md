
# Calculador de Frete

Esse projeto é um calculador de frete que escolhe entre dois operadores logísticos qual possui o menor preço e o que leva menos tempo pra entregar dado um endereço de origem, um endereço de destino e informações de um produto (dimensões). O projeto também armazena todas as consultas em um banco de dados para que elas possam ser consultadas posteriormente. O frontend é feito com ReactJS empacotado pelo Vite e o backend é feito com NestJS.


## Funcionalidades

- Calcular frete
- Visualizar histórico de fretes calculados
- Visualizar detalhes de um frete calculado


## Instalação
É necessário ter Node.js 22+ instalado para instalar e rodar o programa.

Para o backend:

```bash
  cd apps/back
  npm install
```

Para o frontend:

```bash
  cd apps/front
  npm install
```

Para instalar os dois ao mesmo tempo:

```bash
  npm run install-all
```

## Variáveis de Ambiente

Para rodar este projeto, para o backend você precisará adicionar e preencher na raíz da pasta apps/back em um arquivo .env as seguinte variáveis de ambiente:

`NODE_ENV`

`PORT`

`MONGO_URI`

`GOOGLE_GEOCODING_API_KEY`

`JWT_SECRET`

`JWT_EXPIRE_TIME`

E para o frontend você precisará adicionar e preenchar na raíz da pasta apps/front em um arquivo .env as seguintes variáveis de ambiente:

`VITE_API_URL`
## Rodar o projeto com o Docker

Certifique-se de ter o Docker e o Docker Compose instalados e rodando, e então execute estes comandos na raíz do projeto:

```bash
  docker-compose build
  docker-compose up
```
## Rodar o Projeto em Desenvolvimento localmente

Para o backend:

```bash
  cd apps/back
  npm install
  npm run start:dev
```

Para o frontend:

```bash
  cd apps/front
  npm install
  npm run dev
```

Se quiser rodar os dois ao mesmo tempo no mesmo terminal: 

```bash
  npm run install-all
  npm run start-all:dev
```
## Rodar o Projeto em Produção localmente

Caso esteja no linux certifique-se de ter permissões sudo para realizar os builds

Para o backend:

```bash
  cd apps/back
  npm install
  npm run build
  npm run start:prod
```

Para o frontend:

```bash
  cd apps/front
  npm install
  npm run build
  npm run preview -- --host
```

Se quiser rodar os dois ao mesmo tempo no mesmo terminal:

```bash
  npm run install-all
  npm run build-all
  npm run start-all:prod
```
## Rodando Testes

Para rodar os testes do backend em Jest, execute os seguintes comandos:

```bash
  cd apps/back
  npm run test
```

