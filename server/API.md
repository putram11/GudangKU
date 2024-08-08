API Documentation
Authentication
POST /login
Login pengguna.

Request Body:
```
{
  "email": "string",
  "password": "string"
}
```
Response:
```
{
  "access_token": "string",
  "id": "integer",
  "role": "string"
}
```

POST /google-login
Login pengguna menggunakan Google.

Request Body:
```
{
  "credential": "string"
}
```
Response:
```
{
  "access_token": "string",
  "id": "integer",
  "role": "string"
}
```

Categories
GET /cat
Mendapatkan semua kategori.

Response:
```
[
  {
    "id": "integer",
    "name": "string"
  }
]
```

Goods
GET /goods
Mendapatkan semua barang.

Response:
```
[
  {
    "id": "integer",
    "name": "string",
    "quantity": "integer",
    "price": "number",
    "categoryId": "integer"
  }
]
```

GET /goods/:id
Mendapatkan barang berdasarkan ID.

Response:
```
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```
POST /create
Menambahkan barang baru. (Hanya untuk admin)

Request Body:
```
{
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```
Response:
```
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

PUT /goods/:id
Memperbarui barang berdasarkan ID. (Hanya untuk admin)

Request Body:
```
{
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```
Response:
```
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```
DELETE /goods/:id
Menghapus barang berdasarkan ID. (Hanya untuk admin)

Response:
```
{
  "message": "Item deleted successfully"
}
```

Logs
GET /logs

Response:
```
[
  {
    "id": "integer",
    "description": "string",
    "goods": [
      {
        "name": "string",
        "numberOfItems": "integer"
      }
    ],
    "type": "string",
    "total": "integer",
    "userId": "integer",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```
Request
POST /request
Membuat request barang (pengeluaran atau pemasukan).

Request Body:
```
{
  "description": "string",
  "goods": [
    {
      "name": "string",
      "numberOfItems": "integer"
    }
  ],
  "type": "string"
}
```
Response:
```
{
  "id": "integer",
  "description": "string",
  "goods": [
    {
      "name": "string",
      "numberOfItems": "integer"
    }
  ],
  "type": "string",
  "total": "integer",
  "userId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

