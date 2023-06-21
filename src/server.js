import express from 'express'
import multer from 'multer';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv'

dotenv.config()

const awsAccessKey = process.env.AWS_ACCESS_KEY
const awsSecretKey = process.env.AWS_SECRET_KEY
const awsBucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3Client ({
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
    }
});

const express = require('express');
const app = express();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})


app.post('/api/posts', upload.single('image'), async(req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    
    req.file.buffer

    const params = {
        Bucket: awsBucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
    }
    
    const command = new PutObjectCommand(params)
    await s3.send(command)

    res.send({})
}


app.use('/files', fileRoutes),

app.listen(3000, () => console.log('Server started on port 3000'));
