# Maps Backend Service

## Deskripsi Singkat
Maps Backend Service adalah REST API berbasis Node.js dan Express yang menyediakan fitur pencarian tempat, rute perjalanan, dan pembuatan URL embed Google Maps. Sistem ini dilengkapi autentikasi JWT, validasi request, rate limiting, caching, dan dokumentasi API berbasis OpenAPI.

## Fitur Utama
- Autentikasi JWT (JSON Web Token)
- Endpoint Maps:
  - Place Search (Google Maps Text Search API)
  - Directions API (rute perjalanan)
  - Embed URL (Google Maps Embed API)
- Request Validation menggunakan Joi
- Rate Limiting (global & endpoint-level)
- Caching response untuk optimasi kuota Google API
- Logging HTTP menggunakan Morgan
- Keamanan menggunakan Helmet
- CORS enabled
- OpenAPI (Swagger) untuk dokumentasi API

## Cara Instalasi
Clone repository dan masuk ke folder project:

```
git clone https://github.com/USERNAME/maps-backend.git
cd maps-backend
npm install
```

## Cara Menjalankan
```
npm start
```

Server akan berjalan default pada:
```
http://localhost:3000
```
## Environment Variables
Edit file `.env.example` menjadi `.env`, kemudian sesuaikan isinya:
````
PORT=3000
JWT_SECRET=your_jwt_secret
GMAPS_SERVER_KEY=your_google_maps_server_key
GMAPS_EMBED_KEY=your_google_maps_embed_key
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
````
**Catatan:**  
- `GMAPS_SERVER_KEY` digunakan untuk Directions & Place Search  
- `GMAPS_EMBED_KEY` harus restricted (khusus embed)

## API Documentation
File dokumentasi API:
````
openapi.json
````
Cara membukanya:

1. Kunjungi https://editor.swagger.io
2. Import file `openapi.json`

Atau akses langsung melalui endpoint:
````
GET /openapi.json
````
## Endpoint Utama

### Auth
````
GET /auth/generate
````
Menghasilkan JWT untuk testing (Postman/Thunder Client).

### Maps
Semua endpoint Maps memerlukan header:
Authorization: Bearer <token>


1. **POST /api/search**  
   Pencarian tempat berdasarkan query + optional lokasi.

2. **POST /api/directions**  
   Mendapatkan rute perjalanan.

3. **GET /api/embed**  
   Menghasilkan URL embed Google Maps.

## Cara Menjalankan dengan Docker (Opsional)

### Build image
````
docker build -t maps-backend .
````
### Jalankan container
````
docker-compose up -d
````
Akses aplikasi:
http://localhost:3001


## Integration to open-webui (Opsional)
Anda dapat mengintegrasikan Maps Backend ke open-webui untuk kebutuhan internal seperti:

- Menyediakan endpoint Maps sebagai plugin HTTP
- Menambahkan API-key internal untuk akses Maps
- Integrasi melalui reverse proxy (Nginx)
- Menyambungkan token JWT ke sistem login open-webui





