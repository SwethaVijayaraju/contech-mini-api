import express from 'express';

interface ZoningRequest {
    zoneType: string;      // e.g., "R1", "R2", "C-1"
    lotSizeSqFt: number;   // in square feet
}

interface ZoningResponse {
    maxFAR: number;                // Floor Area Ratio
    frontSetbackFt: number;
    sideSetbackFt: number;
    rearSetbackFt: number;
    maxHeightFt: number;
    allowedUses: string[];         // e.g., ["Single-family", "Duplex"]
    error?: string;                // optional error message
}

const app = express();
const port = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', message: 'ConTech backend alive!' });
});

app.post('/zoning/check', (req, res) => {
    const body = req.body as ZoningRequest;

    // Basic validation
    if (!body.zoneType || !body.lotSizeSqFt) {
        return res.status(400).json({ error: 'Missing zoneType or lotSizeSqFt' });
    }

    if (body.lotSizeSqFt < 3000) {
        return res.status(400).json({ error: 'Lot too small for most zoning rules' });
    }

    // Dummy zoning logic – in real life this would come from DB, rules engine, or PostGIS query
    let response: ZoningResponse = {
        maxFAR: 0.45,
        frontSetbackFt: 25,
        sideSetbackFt: 5,
        rearSetbackFt: 20,
        maxHeightFt: 35,
        allowedUses: ['Single-family residential'],
    };

    // Simple rule variations
    if (body.zoneType.toUpperCase() === 'R2') {
        response.maxFAR = 0.75;
        response.frontSetbackFt = 15;
        response.maxHeightFt = 45;
        response.allowedUses.push('Duplex');
    } else if (body.zoneType.toUpperCase() === 'C-1') {
        response.maxFAR = 1.0;
        response.frontSetbackFt = 0;
        response.sideSetbackFt = 0;
        response.maxHeightFt = 60;
        response.allowedUses = ['Commercial retail', 'Mixed-use'];
    }

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});