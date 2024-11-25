const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Function to connect to MongoDB
const connectToMongoDB = async (url) => {
    try {
        // Connect to MongoDB and return the connection instance
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        // Handle any errors that occur during the connection
        console.error('Error connecting to MongoDB:', err);
        throw err;  // Optional: rethrow the error to be handled by the calling function
    }
};

module.exports = connectToMongoDB;
