# <p align = "center"> RepoProvas API </p>

<p align="center">
   <img src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55629/card-file-box-emoji-clipart-xl.png" width="150"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Fernanda-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/acfernanda/repoprovas-api?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

Um sistema de compartilhamento de provas entre estudantes! No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros :)

---

## :computer: Tecnologias e Conceitos

- TypeScript
- JWTs & refresh tokens
- Node.js
- SQL, Postgres
- Prisma
- Layered Architecture (Routers, Controllers, Services e Repositories).

---

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:
        {
            "email": "lorem@gmail.com",
            "password": "loremipsum",
            "confirmPassword": "loremipsum"
        }
```

```yml
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body:
        {
            "email": "lorem@gmail.com",
            "password": "loremipsum"
        }
```

```yml
POST /tests (autenticada)
    - Rota para postar um novo teste
    - headers: { "Authorization": "Bearer $token" }
    - body:
        {
            "name": "earum",
            "pdfUrl": "http://nimble-archer.name",
            "categoryId": 2,
            "teacherDisciplineId": 4
        }
```

```yml
GET /tests/disciplines (autenticada)
    - Rota para listar todos os testes separados por disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}

```

```yml
GET /tests/teachers (autenticada)
    - Rota para listar todos os testes separados por professor(a)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/acfernanda/repoprovas-api
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```

:stop_sign: Para rodar os testes:

```
npm run test
```

---

## 🏁 Deploy

https://driven-repoprovas.herokuapp.com/
