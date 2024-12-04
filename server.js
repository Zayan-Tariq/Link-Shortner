const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const URL = require('./models/url.js')
const express = require('express');
const app = express();
const routerurl = require('./routes/routerurl.js');
const connectToMongoDB = require('./connect.js');
const { timeStamp } = require('console');



const PORT = process.env.PORT || 5000;

connectToMongoDB("mongodb://localhost:27017/Link-Shortner").then(() => {console.log('Connected to mongoDb successfully')})

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({})
    res.render('home', {urls: allUrls})
    // res.end(`<html>
    //         <head></head>
    //         <body>
    //             <ol>
    //                 ${allUrls.map(
    //                     (url) =>
    //                         `<li> ${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`
    //                 )
    //                 .join("")}
    //             </ol>
    //         </body>
    //          </html>`)
})

app.use('/url', routerurl); 

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
         $push: {
            visitHistory: {
                timeStamp: Date.now()
            },
         }
    });
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}
);


