import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { transcriptionClient } from './transcription-client';
import { StartTranscriptionJobCommand } from '@aws-sdk/client-transcribe';
import express from 'express';
import './bucket-policy.json';
require('dotenv').config();
import config from './config';
import { uploadToStorage } from './lib/upload-to-storage';
import cors from 'cors';



let desiredDirectory = config["DIRECTORY"] ? config["DIRECTORY"] : process.env["DIRECTORY"];
const m_UploadDirectoryPath = path.join(__dirname, desiredDirectory);



async function Initialize()
{
    const app = express();
    app.use(cors());
    app.listen(5000, () => console.log(`Server listening on port 5000`));


    let storageBucket, directory, extension, region, fileName;
    if (!fs.existsSync(m_UploadDirectoryPath))
    {
        fs.mkdirSync(m_UploadDirectoryPath);
        console.log(`Creating directory ${DIRECTORY} in ${m_UploadDirectoryPath}`);
    }
    else
    {
        console.log(`Folder ${DIRECTORY} already exists in ${m_UploadDirectoryPath}.. Skipping!`);
    }

    try
    {
        storageBucket = config["AWS_STORAGE_BUCKET"];
        extension = config["EXT"];
        region = config["AWS_STORAGE_REGION"];
        fileName = config["FILE"];
        directory = m_UploadDirectoryPath + `\\${fileName}.${extension}`;
    } 
    catch (error)
    {
        console.error(`Please setup the configuration environment variables correctly..`, error);
    }
    

    console.log(`Attempting to upload file:\nFile:${fileName}\nAWS Storage: ${storageBucket}\nRegion: [${region}]\nDirectory: ${directory}`);

    uploadToStorage(storageBucket, "", directory)
    .then(response => {
        console.log(`Uploading to S3: `, response);

        let params = {};
        let mediaFileUrl = `s3://${storageBucket}.s3.${region}.amazonaws.com/${fileName}.${extension}`;
        params["TranscriptionJobName"] = config["TRANSCRIPTION_JOB_TITLE"];
        params["LanguageCode"] = config["LANG"];
        params["MediaFormat"] = extension;
        params.Media["MediaFileUri"] = mediaFileUrl;

        console.log(`Parameters: ${params}`);
    })
    .catch(err => {
        console.error(`Something went wrong: Error: `, `${err}`);
    });


    return app;
}



Initialize();


export default Initialize;
export { Initialize };