// File: backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/generate";

// Define form structures
const FORM_SCHEMAS = {
    scholarship: ["full_name", "education_background", "financial_need", "career_goals"],
    job_application: ["full_name", "work_experience", "skills", "expected_salary"],
    government_grant: ["full_name", "business_description", "annual_revenue", "project_goals"]
};

app.post('/api/extract-data', async (req, res) => {
    const { formType, paragraph } = req.body;
    const fields = FORM_SCHEMAS[formType] || ["full_name"];

    const prompt = `
    You are a data extraction assistant. 
    The user wants to fill out a ${formType} form.
    Based on the paragraph provided below, extract information for these fields: ${fields.join(", ")}.
    
    Return the result ONLY as a valid JSON object. Do not include any explanation.
    
    Paragraph: "${paragraph}"
    `;

    try {
        const response = await axios.post(OLLAMA_URL, {
            model: "llama3",
            prompt: prompt,
            stream: false,
            format: "json"
        });

        // Parse the string from Ollama into a JS Object
        const extractedData = JSON.parse(response.data.response);
        res.json(extractedData);
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to process information with local AI." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
