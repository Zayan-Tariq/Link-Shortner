const shortid = require('shortid');
const URL = require('../models/url.js');

const HandleGeneratedUrl = async (req, res) => {
    const body = req.body;

    // Check if URL is provided
    if (!body.url) {
        return res.status(400).json({ 'error': 'URL is required!' });
    }

    // Generate short ID
    const shortID = shortid();

    try {
        // Save the URL with a generated short ID and empty visit history
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],  // Use correct field name
        });

        // Return the short ID to the client
        console.log("Working Fine")
        return res.json({ id: shortID });
    } catch (err) {
        // Handle any errors that occur during the URL creation process
        console.error(err);
        return res.status(500).json({ error: 'Failed to generate the URL' });
    }
};


module.exports = HandleGeneratedUrl;
