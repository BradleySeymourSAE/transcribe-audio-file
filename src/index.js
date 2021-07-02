import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { transcriptionClient } from './transcription-client';
import { StartTranscriptionJobCommand } from '@aws-sdk/client-transcribe';
import { uploadToStorage } from './lib/upload-to-storage';
import express from 'express';
import cors from 'cors';
import FileStorage from './file-storage';
import './bucket-policy.json';
const config = require('dotenv').config().parsed;


const localStorage = new FileStorage("transcriptions");
const m_UploadDirectoryPath = path.join(__dirname, "uploads");
let storageBucket = process.env["AWS_STORAGE_BUCKET"];
let region = process.env["AWS_STORAGE_REGION"];

async function Initialize()
{
    const app = express();
  
    const { PORT: port, HOST: host, NODE_ENV: environment } = config;
    
    app.use(cors(true));
    app.listen(port, () => console.log(`Server started running at ${host}:${port} in ${environment} mode.`));
   
    // Check if the uploads directory exists 
    if (!fs.existsSync(m_UploadDirectoryPath))
    {
        // If it doesnt, create one 
        fs.mkdirSync(m_UploadDirectoryPath);
        console.log(`Creating directory ${DIRECTORY} in ${m_UploadDirectoryPath}`);
    }

 
   // Loop through all the audio files found in the directory 
   const audioFiles = fs.readdirSync(m_UploadDirectoryPath, (err, files) => {
       if (err) return console.error(`There was an error locating audio files in ${m_UploadDirectoryPath}... Error: ${err}`);
       else
       {
         for (const file of files)
            return file;
       }
    });

    // Loop through each of the audio files found 
    for (var i = 0; i < audioFiles.length; i++)
    {
        let directory, extension, fileName;
            
            try
            {
                fileName = audioFiles[i].split(".")[0]; // exampleaudio
                extension = audioFiles[i].split(".")[1]; // wav 
                directory = m_UploadDirectoryPath + `\\${fileName}.${extension}`; // src\uploads\filename.ext
            } 
            catch (error)
            {
                console.error(`Please setup the configuration environment variables correctly..`, error);
            }

            console.log(`Attempting to upload...\nFile: ${fileName}\nAWS Storage: ${storageBucket}\nRegion: [${region}]\nDirectory: ${directory}`);

            // Begin uploading the file to AWS storage 
            uploadToStorage(storageBucket, "", directory)
            .then(async response => {
                console.log(`Uploading to AWS S3 Storage Bucket...`, response);
                let fileBucketURL = `https://${storageBucket}.s3.${region}.amazonaws.com/${fileName}.${extension}`;

                // Set the transcription job params 
                const params = {
                    TranscriptionJobName: `${fileName}-transcription`,
                    LanguageCode: config["LANG"],
                    MediaFormat: extension,
                    Media: {
                        MediaFileUri: fileBucketURL
                    },
                };

            try 
            { 
                // Start the transcription job 
                const transcriptionResult = await transcriptionClient.send(new StartTranscriptionJobCommand(params));
                let l_FileId = params["TranscriptionJobName"];

                console.log(`Successfully transcribed file: ${l_FileId}...\nYou can download the transcribed file from here ${params.Media["MediaFileUri"]}`);
                console.log(`Writing transcription results to ${__dirname + "\\Storage\\transcriptions"}`);
                // Write the response status to local directory src/Storage/transcriptions/transcription-result.json 
                localStorage.writeFile(l_FileId, transcriptionResult);
            }
            catch (error)
            {
                console.error(`There was an error transcribing that audio file. If the error persists please contact support on discord. -Ventiii-VIPs-#3108`, error);
            }
        });
    }

    // Return express server  (app) 
    return app;
}


// Initializes the express server 
Initialize();


export default Initialize;
export { Initialize };