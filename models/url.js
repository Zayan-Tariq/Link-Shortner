const mongoose = require('mongoose');

// Define schema for the URL model
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Date, default: Date.now } }],  // Use Date for timestamps and set default value
});

// Create the model based on the schema
const Url = mongoose.model("Url", urlSchema);  // Capitalize model name to follow convention

// Export the model
module.exports = Url;