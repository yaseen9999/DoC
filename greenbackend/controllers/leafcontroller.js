const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');

// Define storage for uploaded files
const storage = multer.memoryStorage(); // Use memory storage as we are dealing with small files

// Create multer instance with the storage configuration
const upload = multer({ storage });

const leaf = async (req, res) => {
    try {
        const { buffer, originalname } = req.file;

        const formData = new FormData();
        formData.append('image', buffer, { filename: originalname });

        const pythonResponse = await axios.post('http://127.0.0.1:5000/submit', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        res.json(pythonResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { leaf, upload };
