// import express from 'express'
// import multer from 'multer';
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import dotenv from 'dotenv'

// dotenv.config()

// const express = require('express');
// const app = express();
// const storage = multer.memoryStorage()
// const upload = multer({storage: storage})

// const { generateImage } = require('./fileController'); // Adjust the path as necessary
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// app.post('/generateImage', async (req, res) => {
//   try {
//     const result = await generateImage(req, res);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });



// app.use('/files', fileRoutes),

// app.listen(3000, () => console.log('Server started on port 3000'));
