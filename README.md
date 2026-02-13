# ConTech Mini Zoning API

A simple **TypeScript + Express** backend API built to explore zoning constraints, basic permitting logic, and domain modeling in the **ConTech** (Construction Technology) space.

This project was created during a long-weekend upskilling session to bridge architecture background with modern backend development.

## Features

- `/health` — Simple server status check
- `POST /zoning/check` — Typed zoning feasibility endpoint with dummy rules (request/response interfaces)
- Strong TypeScript typing for requests and responses
- Express server with JSON parsing
- Ready for future extensions: PostGIS spatial queries, JSON/DB-loaded rules, permitting workflow states

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express
- **Runtime**: Node.js
- **Dev tools**: ts-node-dev (hot reload), nodemon
- **Future planned**: PostgreSQL + PostGIS for geospatial zoning/parcel data

## Setup & Run

1. **Clone the repo:**
   ```bash
   git clone https://github.com/SwethaVijayaraju/contech-mini-api.git
   cd contech-mini-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Server runs at: `http://localhost:3000`

## API Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Response (200 OK):**
```json
{
  "status": "healthy",
  "message": "ConTech backend alive!"
}
```

---

### 2. Zoning Feasibility Check

**Endpoint:** `POST /zoning/check`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "zoneType": "R2",
  "lotSizeSqFt": 8000
}
```

**Response Examples:**

**Valid R1 zone:**
```json
{
  "maxFAR": 0.45,
  "frontSetbackFt": 25,
  "sideSetbackFt": 5,
  "rearSetbackFt": 20,
  "maxHeightFt": 35,
  "allowedUses": ["Single-family residential"]
}
```

**Valid R2 zone (higher density):**
```json
{
  "maxFAR": 0.75,
  "frontSetbackFt": 15,
  "sideSetbackFt": 5,
  "rearSetbackFt": 20,
  "maxHeightFt": 45,
  "allowedUses": ["Single-family residential", "Duplex"]
}
```

**Invalid input:**
```json
{
  "error": "Lot too small for most zoning rules"
}
```