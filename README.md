
# Calculador de Frete

Esse projeto é um calculador de frete que escolhe entre dois operadores logísticos qual possui o menor preço e o que leva menos tempo pra entregar dado um endereço de origem, um endereço de destino e informações de um produto (dimensões). O projeto também armazena todas as consultas em um banco de dados para que elas possam ser consultadas posteriormente. O frontend é feito com ReactJS empacotado pelo Vite e o backend é feito com NestJS.


## Funcionalidades

- Calcular frete
- Visualizar histórico de fretes calculados
- Visualizar detalhes de um frete calculado


## Instalação

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




## Variáveis de Ambiente

Para rodar este projeto, para o backend você precisará adicionar e preencher na raíz da pasta apps/back em um arquivo .env as seguinte variáveis de ambiente:

`NODE_ENV`

`PORT`

`MONGO_URI`

`GOOGLE_GEOCODING_API_KEY`

`JWT_SECRET`

`JWT_EXPIRE_TIME`

## Rodar o Projeto em Desenvolvimento

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


## Rodar o Projeto em Produção

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
  npm run preview
```
## Rodando testes

Para rodar os testes do backend em Jest, execute os seguintes comandos:

```bash
  cd apps/back
  npm run test
```

