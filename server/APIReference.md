
# <p align="center">🛰️ API Reference</p>

### 🧙‍♂️ User Routes
Public

#### `POST` `/users`
#### Registrates a new user

`Content-Type: application/json`
```js
{
	"name":string, //User's name
	"email":string, //User's email
	"password":string, //User's password
	"password_confirmation":string, //Password confirmation
}
```

Response:
<br>
`201` `Created`
<br>
```js
{
  "name": "user-name",
  "email": "user@email.com",
  "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
  "created_at": "2020-09-01T03:12:10.176Z",
  "updated_at": "2020-09-01T03:12:10.176Z",
  "avatarUrl": null
}
```

#### `POST` `/sessions`
#### Generates a token so the user can acess private routes

`Content-Type: application/json`
```js
{
	"email":"user@email.com",
	"password":"123456"
}
```

Response:
<br>
`201` `Created`
<br>
```js
{
  "user": {
    "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
    "name": "user-name",
    "email": "user@email.com",
    "avatar": null,
    "created_at": "2020-09-01T03:12:10.176Z",
    "updated_at": "2020-09-01T03:12:10.176Z",
    "avatarUrl": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg5MjAxODksImV4cCI6MTU5OTAwNjU4OSwic3ViIjoiOTZiZDM2YjgtNTFjYy00OTI5LTlmMDAtMDYwYmJhNjdiZTlhIn0.AeSB_uPg2P8huDfOswwL1dL0DBNlkJ3Ue8rb5NJL2eI"
}
```
