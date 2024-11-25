const express = require('express');
const app = express();
const routerurl = require('./routes/routerurl.js');
const connectToMongoDB = require('./connect.js');

// Zayan is STUPID :>

const PORT = process.env.PORT || 5000;

connectToMongoDB("mongodb://localhost:27017/Link-Shortner").then(() => {console.log('nConnected to mongoDb successfully')})

app.use('/url', routerurl); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}
);


