const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');  // We'll use axios to send HTTP requests
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// URL of your deployed model API (replace with actual URL)
const MODEL_API_URL = "https://femaura-api.onrender.com/predict";

// Routes
app.get('/', (req, res) => {
    res.send('✅ PCOS Prediction API is working!');
});

app.post('/predict', async (req, res) => {
    const inputData = req.body;

    try {
        // Send the input data to your deployed model API
        const response = await axios.post(MODEL_API_URL, inputData);

        // Extract prediction result from the response
        const predictionResult = response.data;

        // Send prediction result back to the frontend
        return res.json(predictionResult);
    } catch (error) {
        console.error('❌ Error while contacting model API:', error);
        return res.status(500).json({ error: 'Error in making prediction' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
