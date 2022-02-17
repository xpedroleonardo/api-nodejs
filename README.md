## API-Nodejs | Em desenvolvimento...

Api desenvolvida em node, para ter uma base para um projeto futuro.

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- TypeScript
- Express
- Multer
- TypeORM
- MySQL

## 🚀 Como executar

Clone o projeto e acesse a pasta

```bash
$ git clone https://github.com/xpedroleonardo/api-nodejs.git

$ cd api-nodejs
```

Antes você deverá acessar o arquivo <b>src/database/database.sql</b>, nele comtém o comando para realizar a criação do banco de dados. (Se quiser pode alterar no nome)

Após a criação do banco de dados você deverá acessar o arquivo <b>ormconfig.json</b>, e altere os campos relacionados ao banco de dados, conforme está configurado na sua máquina.

```json
{
  "type": "mysql", //Drive de Conexão
  "host": "localhost", //Host
  "port": 3306, //Porta de Conexão
  "username": "root", //Usuário do Banco de Dados
  "password": "", //Senha do Banco de Dados
  "database": "apinodejs" //Nome do Banco de Dados
}
```

Para iniciá-lo, siga os passos abaixo:

### Utilizando Yarn

```bash
# Instalar as dependências
$ yarn

# Criar as tabelas do banco de dados.
$ yarn typeorm migration:run

# Iniciar o projeto
$ yarn server
```

### Utilizando NPM

```bash
# Instalar as dependências
$ npm install

# Criar as tabelas do banco de dados.
$ npm run typeorm migration:run

# Iniciar o projeto
$ npm run server
```

A API estará disponível no endereço http://localhost:3333.

## 💻 Projeto

O projeto foi desenvolvido para ser utilizado como base, quando for desenvolver uma API para projetos futuros, para adiantar alguns passos, como CRUD, rotas, banco de dados, upload de arquivos entre outros.

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤ por [Pedro Leonardo](https://github.com/xpedroleonardo)
