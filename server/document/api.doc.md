# Project: Test Dekornata

Test-Dekornata is a duplicate from web Dekornata. It performs standard CRUD actions based on RESTful concept.

This project has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

Link for ERD: https://drive.google.com/file/d/1-MyHQfT9jtSGbWk0MNKPjGl7EQdJ_YT4/view?usp=sharing

Link for postman: https://www.getpostman.com/collections/ddb73744742387e903cd

# Test-Dekornata-server

API for Test-Dekornata

&nbsp;

## **Endpoints**

---

- `POST` /users/signup
- `POST` /users/signin

---

- `GET` /products
- `GET` /products/:id

---

- `POST` /carts
- `GET` /carts
- `DELETE` /carts/:id/delete
- `PATCH` /carts/:id/editQty

---

- `POST` /transactions
- `GET` /transactions

## &nbsp;

### POST /users/signup

> sign up a new user
> _Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<User email>",
  "password: "<User Password>",
  "username": "<User Username>"
  "full_name": "<User full_name>"
  "address": "<User address>"
}
```

_Response (201 - Created)_

```
{
    "data" : {
                "id": <given id by system>,
                 "email": "<User email>",
    }
}
```

_Response (400 - Bad Request)_ => Validation Error

```
{
  "message": "<message from system>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### POST /users/signin

> sign in user
> _Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<User email>",
  "password: "<User Password>"

}
```

_Response (200 - OK)_

```
{
  "id": <given id by system>,
  "email": "<User email>",
  "address": "<User address>",
  "username": "<User Username>",
  "access_token": "<given by system>"
}
```

_Response (400 - Bad Request)_ => Validation Error

```
{
  "message": <message from system>
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET /products

> Get all products

> _Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
         "id": 1,
        "name": "SERA COFFEE TRAY / TATAKAN GELAS / NAMPAN KAYU - SERA COFFEE",
        "price": 40000,
        "image": [
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1589022481570.jpeg",
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1612168583047.jpeg",
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1589022432021.jpeg"
        ],
        "quantity": 50,
        "description": "Sera coffee tray will never let you spill your coffee. Made using mahogany wood and finished with beeswax food-grade. This coffee tray boast natural colors that is brought out by the wax. Serve your coffee and afternoon dessert with this coffee tray, nothing will go wrong, we guarantee it. Have we mentioned, that you can also engrave this tray with a personal text or logo?",
        "dimension": "22.5 * 12 * 1 cm",
        "weight": 0.25,
        "material": "Mahogany/Mahoni",
        "finishing": "Food-Grade Beeswax",
        "createdAt": "2021-08-13T04:02:40.750Z",
        "updatedAt": "2021-08-13T04:02:40.750Z"
    }
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET /products/:id

> Get one product by id

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Request Params_

```
{
  "id": "product id"
}
```

_Response (200 - OK)_

```
{

         "id": 1,
        "name": "SERA COFFEE TRAY / TATAKAN GELAS / NAMPAN KAYU - SERA COFFEE",
        "price": 40000,
        "image": [
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1589022481570.jpeg",
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1612168583047.jpeg",
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1589022432021.jpeg"
        ],
        "quantity": 50,
        "description": "Sera coffee tray will never let you spill your coffee. Made using mahogany wood and finished with beeswax food-grade. This coffee tray boast natural colors that is brought out by the wax. Serve your coffee and afternoon dessert with this coffee tray, nothing will go wrong, we guarantee it. Have we mentioned, that you can also engrave this tray with a personal text or logo?",
        "dimension": "22.5 * 12 * 1 cm",
        "weight": 0.25,
        "material": "Mahogany/Mahoni",
        "finishing": "Food-Grade Beeswax",
        "createdAt": "2021-08-13T04:02:40.750Z",
        "updatedAt": "2021-08-13T04:02:40.750Z"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

---

### GET /carts

> Get all user carts
> _Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
         "id": 7,
        "CustomerId": 1,
        "ProductId": 12,
        "quantity": 3,
        "total_price": 0,
        "createdAt": "2021-08-14T11:03:17.901Z",
        "updatedAt": "2021-08-14T11:03:36.818Z",
        "Product": {
            "id": 12,
            "name": "RECTANGULAR TISSUE BOX / TISU BOX KAYU / TEMPAT TISU / KOTAK TISU KAYU - WALNUT RECTANGULAR TISSUE BOX",
            "price": 87000,
            "image": [
                "https://asset.dekornata.com/image/variant/original/rectangular-tissue-box-tisu-box-kayu-tempat-tisu-kotak-tisu-kayu-rectangular-tissue-box-walnut-1626957241655.jpeg",
                "https://asset.dekornata.com/image/variant/original/rectangular-tissue-box-tisu-box-kayu-tempat-tisu-kotak-tisu-kayu-rectangular-tissue-box-walnut-1626964302494.jpeg",
                "https://asset.dekornata.com/image/variant/original/rectangular-tissue-box-tisu-box-kayu-tempat-tisu-kotak-tisu-kayu-rectangular-tissue-box-walnut-1626957256899.jpeg"
            ],
            "quantity": 50,
            "description": "A minimalist and simple tissue box. Made out of solid mahogany wood, it's especially designed to look attractive and elegant.",
            "dimension": "26.00 * 14.00 * 8.00 cm",
            "weight": 0.5,
            "material": "Mahogany/Mahoni",
            "finishing": "Natural Melamine/Walnut Melamine",
            "createdAt": "2021-08-13T04:02:40.750Z",
            "updatedAt": "2021-08-13T04:02:40.750Z"
        }
    }
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### POST /carts

> Create a New Cart

_Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
{
  "ProdcutId": "<id of choosen product>",
}
```

_Response (201 - Created)_

```
{
  "total_price": 0,
    "id": "<given id by system>",
    "CustomerId": "<given id by system>",
    "ProductId": "<given id by system>",
    "quantity": "<quantity of product>",
    "updatedAt": "<given date by system>",
    "createdAt": "<given date by system>"
}
```

_Response (401 - Authentication Failed)_ => Validation Error

```
{
  "message": "message from errorHandler"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### PATCH /carts/:id/editQty

> Modify product quantity with a new quantity

_Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
{
  "quantity": "<new cart quantity>",
}
```

_Request Params_

```
{
  "id": "cart id"
}
```

_Response (200 - OK)_

```
{
  "id": "<given id by system>",
  "CustomerId": "<Current id from signed in Customer>",
  "ProductId": "<Current id from choosen Product>",
  "quantity": "<new cart quantity>",
  "total_price": "<cart total_price>",
  "createdAt": "<given date by system>",
  "updatedAt": "<given date by system>"
}
```

_Response (400 - Bad Request)_ => validation error

```
{
  "message": "message from errorHandler"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "internal server error"
}
```

---

### DELETE /carts/:id/delete

> Delete specific task by id

_Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
{
  "id": "cart id"
}
```

_Response (200 - OK)_

```
{
  message: 'cart susccess to delete'
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "internal server error"
}
```

---

### GET /transactions

> Get all transactions

> _Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
        "id": 4,
        "status": "pending",
        "invoice_number": "INVOICE/2021-08-14/DEKORNATA/762738",
        "total_price": 70000,
        "total_amount": 2,
        "createdAt": "2021-08-14T08:02:18.971Z",
        "updatedAt": "2021-08-14T08:02:18.971Z",
        "Carts": []
    }
]
```

_Response (401 - Authentication Failed)_ => Validation Error

```
{
  "message": "message from errorHandler"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### POST /transactions

> Create a New Transactions

_Request Header_

```
{
  "access_token": "<customer access token>"
}
```

_Request Body_

```
{
  "CartId": "<id of choosen cart>",
}
```

_Response (201 - Created)_

```
{
    "status": "pending",
    "id": "<id given by system>",
    "total_price": 261000,
    "total_amount": 3,
    "invoice_number": "<invoice_number given by system>",
    "updatedAt": "<date given by system>",
    "createdAt": "<date given by system>"
}
```

_Response (401 - Authentication Failed)_ => Validation Error

```
{
  "message": "message from errorHandler"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---
