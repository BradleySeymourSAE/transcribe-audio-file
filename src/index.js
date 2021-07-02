import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { transcriptionClient } from './transcription-client';
import express from 'express';
import './bucket-policy.json';
require('dotenv').config();
import config from './config';
import { uploadToStorage } from './lib/upload-to-storage';
import cors from 'cors';
import { StartTranscriptionJobCommand } from '@aws-sdk/client-transcribe';
import FileStorage from './file-storage';


const localStorage = new FileStorage("transcriptions");


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
        console.log(`Folder ${desiredDirectory} already exists in ${m_UploadDirectoryPath}.. Skipping!`);
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
    .then(async response => {
        console.log(`Uploading to S3: `, response);

        let fileBucketURL = `https://${storageBucket}.s3.${region}.amazonaws.com/${fileName}.${extension}`;

        const params = {
            TranscriptionJobName: config["TRANSCRIPTION_JOB_TITLE"],
            LanguageCode: config["LANG"],
            MediaFormat: config["EXT"],
            Media: {
                MediaFileUri: fileBucketURL
            },
        };



    try 
    { 
         const transcriptionResult = await transcriptionClient.send(
             new StartTranscriptionJobCommand(params)
         );

         let l_FileId = config["TRANSCRIPTION_JOB_TITLE"];

         console.log(`Transcription Success: `, transcriptionResult);

         localStorage.writeFile(l_FileId, transcriptionResult);
    }
    catch (error)
    {
        console.error(`There was an error transcribing that audio! Error: `, error);
    }
    });


    return app;
}



Initialize();


export default Initialize;
export { Initialize };