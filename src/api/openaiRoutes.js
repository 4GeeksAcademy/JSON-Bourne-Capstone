const express = require('express');
const { generateImage } = require('../fileController');
const router = express.Router();


router.post('/generateimage', generateImage);


module.exports = router;