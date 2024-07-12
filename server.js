 // Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Require Axios for making HTTP requests

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (not necessary for this example but can be useful)
app.use(express.static(path.join(__dirname, 'public')));

// Discord webhook URL
const discordWebhookUrl = 'https://discord.com/api/webhooks/1261432791824990230/STXNnMXn9KzAgsjZ5J7kE4Dr0gIaUD-dJbOTE7EmVCaNLu1XmLXofUKlomMXkHfWZAtT';

// POST endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
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

    try {
        // Send data to Discord webhook
        await axios.post(discordWebhookUrl, {
            content: `New form submission at ${requestData.timestamp}`,
            embeds: [{
                title: 'Form Data',
                description: '```json\n' + JSON.stringify(requestData.formData, null, 2) + '\n```',
                color: 0x42f56c // Optional: Green color for the embed
            }]
        });
        console.log('Form data sent to Discord webhook successfully');
    } catch (error) {
        console.error('Error sending form data to Discord webhook:', error.message);
    }

    // Respond with a success message
    res.send('Form data logged and sent to Discord webhook successfully');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
