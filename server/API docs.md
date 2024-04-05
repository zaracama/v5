# K-eat API Docs

## Models:

_User_

```
- discord: string, required, unique
- username: string, required
```

_Catalog_

```
- name: string, required
```

_Cuisine_

```
- name: string, required
- price: integer, required
- description: string, required
- imageUrl: string, required
- CatalogId: integer, required
```

_Bin_

```
- UserId: integer, required
- CuisineId: integer, required
```

## Endpoints

List of Available Endpoints
- `GET /discord-login`
- `GET /cuisines`
- `GET /cuisines/featured`
- `GET /catalogs`
- `GET /bins`
- `POST /bins/:cuisineId`
- `DELETE /bins/:id`
- `PATCH /bins/:id`
- `POST /generate-midtrans-token`
- `DELETE /checkout`

### GET /discord-login

#### Description

> login to access bin, via discord

#### response

_201 - Created_
_200 - OK_

```json
{
    "access_token": "<jsonwebtoken>"
}
```

### GET /cuisines

#### Description

> get all cuisines data

#### response

_200 - OK_

```json
[
    {
        "id": 7,
        "name": "Cilok ",
        "price": 10000,
        "description": "Makanan Ringan khas indonesia dengan bahan dasar aci",
        "imageUrl": "https://media.istockphoto.com/id/1407337463/id/foto/cilok-bandung-makanan-asia-dengan-piring-putih-dan-latar-belakang-daun.jpg?s=2048x2048&w=is&k=20&c=ptkPM79kKsu9YZ3fHCmzjZXaoF5ID9Oy0tkbXwu7YU4=",
        "CatalogId": 1,
        "createdAt": "2024-09-28T14:03:27.369Z",
        "updatedAt": "2024-09-28T14:03:27.369Z",
        "Catalog": {
            "id": 1,
            "name": "Makanan Ringan",
            "createdAt": "2024-09-28T14:03:27.360Z",
            "updatedAt": "2024-09-28T14:03:27.360Z"
        }
    },
    {
        "id": 6,
        "name": "Kolak biji Salak",
        "price": 10000,
        "description": "Makanan Ringan khas indonesia dengan cita rasa manis dipadu dengan kuah santan",
        "imageUrl": "https://media.istockphoto.com/id/1456971294/id/foto/kolak-biji-salak.jpg?s=2048x2048&w=is&k=20&c=xrW7gBUROHLwIHO2uMXE4lwGOIrDm0Sfslqp6JsVPS0=",
        "CatalogId": 1,
        "createdAt": "2024-09-28T14:03:27.369Z",
        "updatedAt": "2024-09-28T14:03:27.369Z",
        "Catalog": {
            "id": 1,
            "name": "Makanan Ringan",
            "createdAt": "2024-09-28T14:03:27.360Z",
            "updatedAt": "2024-09-28T14:03:27.360Z"
        }
    }
    ...
]
```

### GET /cuisines/featured

#### Description

> get cuisine by each catalog

#### response

_200 - OK_

```json
[
    {
        "id": 1,
        "name": "Makanan Ringan",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z",
        "Cuisines": [
            {
                "id": 6,
                "name": "Kolak Biji Salak",
                "price": 10000,
                "description": "Makanan Ringan khas indonesia dengan cita rasa manis dipadu dengan kuah santan",
                "imageUrl": "https://media.istockphoto.com/id/1456971294/id/foto/kolak-biji-salak.jpg?s=2048x2048&w=is&k=20&c=xrW7gBUROHLwIHO2uMXE4lwGOIrDm0Sfslqp6JsVPS0=",
                "CatalogId": 1,
                "createdAt": "2024-09-28T14:03:27.369Z",
                "updatedAt": "2024-09-28T14:03:27.369Z"
            }
        ]
    },
    {
        "id": 2,
        "name": "Makanan Domestik",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z",
        "Cuisines": [
            {
                "id": 1,
                "name": "Soto",
                "price": 8000,
                "description": "Makanan khas indonesia yang dipanggang beraroma khas",
                "imageUrl": "https://media.istockphoto.com/id/1166125076/id/foto/soto-ayam.jpg?s=2048x2048&w=is&k=20&c=RYjAR35hnCsonvicFTGY6XwFPe7j4_HX4aKZBcr30vQ=",
                "CatalogId": 2,
                "createdAt": "2024-09-28T14:03:27.369Z",
                "updatedAt": "2024-09-28T14:03:27.369Z"
            }
        ]
    }
    ...
]
```

### GET /catalogs

#### Description

> get all catalogs data

#### Response

_200 - OK_

```json
[
    {
        "id": 1,
        "name": "Makanan Ringan",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z"
    },
    {
        "id": 2,
        "name": "Makanan Domestik",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z"
    },
    {
        "id": 3,
        "name": "Makanan Internasional",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z"
    },
    {
        "id": 4,
        "name": "Minuman",
        "createdAt": "2024-09-28T14:03:27.360Z",
        "updatedAt": "2024-09-28T14:03:27.360Z"
    }
]
```

### GET /bins


#### Description

> get bins data for login user

#### Response

```json
[
    {
        "id": 9,
        "UserId": 1,
        "CuisineId": 5,
        "quantity": 1,
        "createdAt": "2024-09-28T14:38:34.013Z",
        "updatedAt": "2024-09-28T14:38:34.013Z",
        "Cuisine": {
            "id": 5,
            "name": "Bebek Goreng dan Nasi Kuning",
            "price": 25000,
            "description": "Makanan khas indonesia dari dataran sunda yang sangat khas oleh Rempah dan tentunya sambal",
            "imageUrl": "https://media.istockphoto.com/id/1469972381/id/foto/nasi-tutug-oncom-traditional-sundanese-meal-rice.jpg?s=2048x2048&w=is&k=20&c=_XRyEfn6k57CLUjE-E8lRJm7ynLpApZJby4a0G-nlDI",
            "CatalogId": 2,
            "createdAt": "2024-09-28T14:03:27.369Z",
            "updatedAt": "2024-09-28T14:03:27.369Z"
        }
    }
    ...
]
```

### POST /bins/:cuisineId

#### Description

> add new bin by cuisine id

#### Response

_201 - Created_

```json
{
    "message": "Add new chart successfully"
}
```

_404 - Error Not Found_

```json
{
    "message": "Cuisine not found"
}
```

### DELETE /bins/:id

#### Description

> Delete bin by bin id

#### Response

_200 - OK_

```json
{
    "message": "Success delete from bin"
}
```

_400 - Error Not Found_

```json
{
    "message": "Bin not found"
}
```

### PATCH /bins/:id

#### Description

> update increment/decrement quantity of bins

#### Response

_200 - OK_

```json
{
    "message": "Bin updated successfully"
}
```

_404 - Error Not Found_

```json
{
    "message": "Bin not found"
}
```

### POST /generate-midtrans-token

#### Description

> payment item in bin

#### response

_201 - Created_

```json
{
  "token": "<token_from_midtrans>",
  "redirect_url": "example[string]<token_from_midtrans>"
}
```

### DELETE /checkout

#### Description

> delete all item in bin after payment success

#### Response

_200 - OK_

```json
{
    "message": "Thankyou for your order"
}
```

### GLOBAL ERROR

#### Response

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_500 - Internal Server Error_

```json
{
  "message": "Internal server error"
}
```