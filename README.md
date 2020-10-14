# API Boilerplate

This is a simple api boilerplate with user authentication.

### Built with:

- typescript
- express
- bcryptjs
- jsonwebtoken
- yup
- typeorm
- postgres (not tested with any other database)

### Getting Started

- Install all dependencies
- yarn typeorm migration:run
  > Make sure you've edited .env
- yarn dev to start the server

### Commands

yarn typeorm <br/>
`Any command related to typeorm cli such as migration:create`<br/>
yarn dev <br/>
`Starts the server`

### Routes

POST => /register <br/>
`expects 3 params: { name: string, email: string, password: string }`

---

POST => /login <br/>
`expects 2 params: { email: string, password: string }`<br/>
returns a token if success

---

GET => /me <br/>
`Expects Bearer token`<br/>
returns information about the user based on the token.
