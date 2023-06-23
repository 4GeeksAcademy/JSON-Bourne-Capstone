
const AWS = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// Initialize AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

exports.uploadFile = async (req, res) => {
    const fileContent = await readFile(req.file.path);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.filename,
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        res.send(data.Location);
    });
};

exports.getFile = (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.filename
    };

    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            res.send(data.Body);
        }
    });
};
