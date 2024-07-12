 // server.js

// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (not necessary for this example but can be useful)
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    // Log the request data
    const requestData = {
        timestamp: new Date(),
        formData: req.body
    };
    // Append to a log file (you can modify the path as needed)
    fs.appendFile(path.join(__dirname, 'form-log.txt'), JSON.stringify(requestData) + '\n', (err) => {
        if (err) throw err;
        console.log(`Form data logged successfully: ${JSON.stringify(requestData, null, 2)}`);
    });

    // Respond with a success message
    res.send('Form data logged successfully');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
