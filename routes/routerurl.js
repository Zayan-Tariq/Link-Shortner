const express = require('express');
const router = express.Router();
const  HandleGeneratedUrl  = require('../controllers/UrlController.js')

router.post("/", HandleGeneratedUrl);

module.exports = router;