# Treki API

## Database Structure

Database using Firebase Real Time Database
### Users
Every user has their own unique ID provided by firebase (ex: "-LARdlvlVYAZd_HlbxSS")
```json
{
  "name": "Fadhil", // string
  "email": "fadhilmch@xys.com" // string
}
```

### Treki
Every Treki has their own unique ID provided by firebase (ex: "-LARdlvlVYAZd_HlbxSS")
```json
{
  "name": "Wallet", 
  "device_id": "34:FE:3F:34:4D",
  "image_url": "flickr.com/img348jjr4.jpg", 
  "user_id": "-LARdlvlVYAZd_HlbxSS",
  "location": {
    "accuracy": 5,
    "latitude": 37.785834,
    "longitude": -122.406417,
  },
  "status": true
}
```

## Running

Server runs on Node v9.11.1

```bash
$ npm install
$ npm start
```

## Endpoints

### Find all Treki devices 
```
GET /treki
```

### Create new Treki device 
```
POST /treki
```

### Find Treki device by ID
```
GET /treki/:id
```

### Update Treki device
```
PUT /treki/:id
```

### Delete Treki device
```
DELETE /treki/:id
```

### Update Treki location
```
PUT /treki/:id/location
```

### Update other Treki location
```
PUT /treki/device_id/:device_id
```

### Find Treki by User ID
```
GET /treki/user_id/:user_id
```

### Find all users
```
GET /users/
```

### Create user
```
POST /users/
```

### Find user by ID
```
GET /users/:id
```

### Update user
```
PUT /users/:id
```

### Delete user
```
DELETE /users/:id
```


