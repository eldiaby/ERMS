require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on port', PORT));
