
<h1 align="center">🛰️ API Reference</h1>

<b>Public</b> routes do not require any type of authentication

<b>Private</b> routes require authentication made via <b>[JWT](https://jwt.io/) Bearer Tokens</b>:

`Bearer Token`
```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg5MjAxODksImV4cCI6MTU5OTAwNjU4OSwic3ViIjoiOTZiZDM2YjgtNTFjYy00OTI5LTlmMDAtMDYwYmJhNjdiZTlhIn0.AeSB_uPg2P8huDfOswwL1dL0DBNlkJ3Ue8rb5NJL2eI"
```

<br><br>

### 🧙‍♂️ User Routes

<br><br>

#### `POST` `/users`
Public
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
<br>

#### `POST` `/sessions`
Public
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
<br>

#### `POST` `/password/forgot`
Public
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
<br>

#### `POST` `/password/reset`
Public
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

<br>


#### `GET` `/profile`
Private
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
<br>

#### `PATCH` `/users/avatar`
Private
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
<br>

#### `PUT` `/profile/update`
Private
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
<br><br>

### 🗓 Appointment Routes

<br><br>

#### `POST` `/appointments`
Private
#### Schedules an appointment with another user (provider)

```js
{
  "provider_id":"96bd36b8-51cc-4929-9f00-060bba67be9a", // The ID of the user that will be the service provider
  "date":"2020-09-02T12:00:38.126Z" //  Date of the appointment in ISO Format
}
```

Response:
<br>
`201` `Created`
<br>
```js
{
  "provider_id": "96bd36b8-51cc-4929-9f00-060bba67be9a",
  "user_id": "aa90dceb-bb5e-400d-9279-5f5fb542de47", // The ID of the authenticated user (sent as Bearer Token)
  "date": "2020-09-02T12:00:00.000Z",
  "id": "972dce37-4246-418b-a248-69dfd73cd96a",
  "created_at": "2020-09-01T03:29:03.072Z",
  "updated_at": "2020-09-01T03:29:03.072Z"
}
```
<br>

#### `GET` `/providers`
Private
#### Lists all the users (providers) except the authenticated user

`No body`

Response:
<i> Returns an array of users </i>
<br>
`200` `OK`
<br>
```js
[
  {
    "id": "0b92e24c-fba6-44b2-aae5-792c78b8a562",
    "name": "provider",
    "email": "provider@provider",
    "avatar": null,
    "created_at": "2020-05-04T01:41:19.981Z",
    "updated_at": "2020-05-04T01:41:19.981Z",
    "avatarUrl": null
  },
  .
  .
  .
]
```
<br>

#### `GET` `/providers/<provider-id>/month-availability`
Private
#### Lists the availability of a provider on a given month

```js
{
  "year": 2020,
  "month": 9
}
```

Response:
<i> Returns an array of days</i>
<br>
`200` `OK`
<br>
```js
[
  {
    "day": 1,
    "available": true
  },
  {
    "day": 2,
    "available": true
  },
    {
    "day": 3,
    "available": false
  },
    {
    "day": 4,
    "available": true
  },
  .
  .
  .
]
```
<br>

#### `GET` `/providers/<provider-id>/day-availability`
Private
#### Lists the availability of a provider on a given day

```js
{
  "year": 2020,
  "month": 9,
  "day": 23
}
```

Response:
<i> Returns an array of hours</i>
<br>
`200` `OK`
<br>
```js
[
  {
    "hour": 8,
    "available": false
  },
  {
    "day": 9,
    "available": false
  },
    {
    "day": 10,
    "available": true
  },
    {
    "day": 11,
    "available": false
  },
  .
  .
  .
]
```
<br>

#### `GET` `/appointments/me`
Private
#### Lists all appointments with the authenticated user as provider in a given day

```js
{
  "year": 2020,
  "month": 9,
  "day": 23
}
```

Response:
<i> Returns an array of appointments </i>
<br>
`200` `OK`
<br>
```js
[
  {
    "id": "ac796d64-82c2-46c0-a8cd-c8d1350847e3",
    "provider_id": "96bd36b8-51cc-4929-9f00-060bba67be9a",
    "user_id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
    "date": "2020-09-02T11:00:00.000Z",
    "created_at": "2020-09-01T03:28:58.742Z",
    "updated_at": "2020-09-01T03:28:58.742Z"
  },
  {
    "id": "972dce37-4246-418b-a248-69dfd73cd96a",
    "provider_id": "96bd36b8-51cc-4929-9f00-060bba67be9a",
    "user_id": "aa90dceb-bb5e-400d-9279-5f5fb542de47",
    "date": "2020-09-02T12:00:00.000Z",
    "created_at": "2020-09-01T03:29:03.072Z",
    "updated_at": "2020-09-01T03:29:03.072Z"
  },
  .
  .
  .
]
```
<br>
