import * as AWS from 'aws-sdk';
require('dotenv').config();

let params = {};

params["accessKeyId"] = process.env["AWS_ACCESS_KEY_ID"];
params["secretAccessKey"] = process.env["AWS_SECRET_ACCESS_KEY"];

const bucket = new AWS.S3(params);

bucket.config.update(params);

if (bucket) console.log(`Connecting to AWS storage bucket!`);
    else console.log(`Failed to connect to AWS storage bucket!`);

export default bucket;
export { bucket };
