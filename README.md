# Maps Backend Service

## Short Description

Maps Backend Service is a Node.js and Express-based REST API that
provides place search, travel route calculation, and generating Google
Maps embed URLs. The system includes JWT authentication, request
validation, rate limiting, caching, and OpenAPI-based API documentation.

## Key Features

-   JWT Authentication (JSON Web Token)\
-   Maps Endpoints:
    -   Place Search (Google Maps Text Search API)
    -   Directions API (travel routes)
    -   Embed URL (Google Maps Embed API)
-   Request Validation using Joi\
-   Rate Limiting (global & endpoint-level)\
-   Response Caching to optimize Google API quota\
-   HTTP Logging using Morgan\
-   Security with Helmet\
-   CORS enabled\
-   OpenAPI (Swagger) for API documentation

## Installation

Clone the repository and enter the project folder:
````
    git clone https://github.com/USERNAME/maps-backend.git
    cd maps-backend
    npm install
````
## How to Run
````
    npm start
````
The server will run by default at:
````
    http://localhost:3000
````
## Environment Variables

Rename `.env.example` to `.env` and adjust the values:
````
    PORT=3000
    JWT_SECRET=your_jwt_secret
    GMAPS_SERVER_KEY=your_google_maps_server_key
    GMAPS_EMBED_KEY=your_google_maps_embed_key
    RATE_LIMIT_WINDOW_MS=60000
    RATE_LIMIT_MAX=100
````
**Notes:**\
- `GMAPS_SERVER_KEY` is used for Directions & Place Search\
- `GMAPS_EMBED_KEY` should be restricted (embed only)

## API Documentation

API documentation file:
````
    openapi.json
````
How to open it:

1.  Visit https://editor.swagger.io\
2.  Import the `openapi.json` file

Or access it directly via endpoint:
````
    GET /openapi.json
````

### Auth
````
    GET /auth/generate
````
Generates a JWT for testing (Postman/Thunder Client).

### Maps

All Maps endpoints require a header:
````
    Authorization: Bearer <token>
````
1.  **POST /api/search**\
    Search places based on a query + optional location.

2.  **POST /api/directions**\
    Retrieve travel route information.

3.  **GET /api/embed**\
    Generate a Google Maps embed URL.

## Running with Docker (Optional)

### Build image
````
    docker build -t maps-backend .
````
### Run container
````
    docker-compose up -d
````
Access the app:

    http://localhost:3001

## Integration with open-webui (Optional)

You can integrate the Maps Backend into open-webui for internal use,
such as:

-   Providing Maps endpoints as an HTTP plugin\
-   Adding internal API keys for Maps access\
-   Integration via reverse proxy (Nginx)\
-   Connecting JWT tokens to the open-webui login system
-   Integration via reverse proxy (Nginx)\
-   Connecting JWT tokens to the open-webui login system
