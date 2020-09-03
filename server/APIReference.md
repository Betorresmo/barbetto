
<h1 align="center">🛰️ API Reference</h1>

### 🧙‍♂️ User Routes
Public (No authentication required)

#### `POST` `/users`
#### Registrates a new user

`Content-Type: application/json`
```js
{
	"name": "user-name" //User's name
	"email": "user@email", //User's email
	"password": "123456", //User's password
	"password_confirmation": "123456", //Password confirmation
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
  "avatar": null,
  "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
  "created_at": "2020-09-01T03:12:10.176Z",
  "updated_at": "2020-09-01T03:12:10.176Z",
  "avatarUrl": null
}
```

#### `POST` `/sessions`
#### Generates a token that can be used to acess private routes 

`Content-Type: application/json`
```js
{
	"email":"user@email.com",
	"password":"123456"
}
```

Response:
<br>
`200` `OK`
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

#### `POST` `/password/forgot`
#### Sends password reset token to the user's email

`Content-Type: application/json`
```js
{
	"email":"user@email.com",
}
```


Response:
<br>
`204` `No Content`

#### `POST` `/password/reset`
#### Resets the password

`Content-Type: application/json`
```js
{
	"token": "05b8ed1e-fd7b-49e1-8c24-8a0b50ff3e28", // Token received in /password/forgot
	"password": "654321", // New passsword
	"password_confirmation": "654321" //New passsword confirmation
}
```

Response:
<br>
`204` `No Content`

<br>
<br>

Private (Authentication token required)

<br>

Every private route requires a <b>Bearer Token</b>:

`Bearer Token`
```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg5MjAxODksImV4cCI6MTU5OTAwNjU4OSwic3ViIjoiOTZiZDM2YjgtNTFjYy00OTI5LTlmMDAtMDYwYmJhNjdiZTlhIn0.AeSB_uPg2P8huDfOswwL1dL0DBNlkJ3Ue8rb5NJL2eI"
```

#### `GET` `/profile`
#### Shows profile

`No body`

Response:
<br>
`200` `OK`
<br>
```js
{
  "name": "user-name",
  "email": "user@email.com",
  "avatar": null,
  "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
  "created_at": "2020-09-01T03:12:10.176Z",
  "updated_at": "2020-09-01T03:12:10.176Z",
  "avatarUrl": null
}
```

#### `PATCH` `/users/avatar`
#### Updates the profile picture (avatar)

`Content-Type: multipart/form-data`
```js
{
	"avatar": my-avatar.jpg, // Accepts .jpg, .jpeg and .png files
}
```


Response:
<br>
`200` `OK`
<br>
```js
{
  "name": "user-name",
  "email": "user@email.com",
  "avatar": "my-avatar.jpg",
  "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
  "created_at": "2020-09-01T03:12:10.176Z",
  "updated_at": "2020-09-01T03:12:10.176Z",
  "avatarUrl": ""http://<hosting>/my-avatar.jpg"
}
```

#### `PUT` `/profile/update`
#### Updates the profile picture (avatar)

`Content-Type: application/json`
```js
{
  "name": "My new name", // Optional & Does not require current password
  "email": "myNewEmail@email.com", // Optional & Requires current password
  "new_password": "my new password", // Optional & Requires current password
  
  "password": "123456", // Current password (Is not required to update name)
}
```

Response:
<br>
`201` `Created`
<br>
```js
{
  "name": "My new name",
  "email": "myNewEmail@email.com",
  "avatar": "my-avatar.jpg",
  "id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
  "created_at": "2020-09-01T03:12:10.176Z",
  "updated_at": "2020-09-01T03:12:10.176Z",
  "avatarUrl": "http://<hosting>/my-avatar.jpg"
}
```
