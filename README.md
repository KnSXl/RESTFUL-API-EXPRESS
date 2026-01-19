# RESTFUL API EXPRESS

Uma API RESTful de usuários usando Express.js. Consiste na listagem de usuários, busca de usuários por ID, nome e e-mail, criação e edição de usuários com campos validados e exclusão de usuários.

## REQUISITOS

* Node.js
* npm

## PASSO A PASSO

### CLONAR O REPOSITÓRIO

```bash
git clone https://github.com/KnSXl/RESTFUL-API-EXPRESS.git
```

### ACESSAR A PASTA DO PROJETO

```bash
cd RESTFUL-API-EXPRESS
```

### BAIXAR AS DEPENDÊNCIAS

```bash
npm install
```

### INICIAR O SERVIDOR

```bash
npm run serve
```

## ROTAS

O servidor estará rodando na porta **3000**.

* `GET` `http://localhost:3000/api/v1/users` Lista todos os usuários

* `GET` `http://localhost:3000/api/v1/users/{id}` Busca um usuário pelo ID especificado

* `POST` `http://localhost:3000/api/v1/users` Cria um novo usuário

* `PUT` / `PATCH` `http://localhost:3000/api/v1/users/{id}` Atualiza um usuário pelo ID especificado

* `DELETE` `http://localhost:3000/api/v1/users/{id}` Remove um usuário pelo ID especificado