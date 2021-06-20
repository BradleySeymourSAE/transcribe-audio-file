
const googleSpeech = require('@google-cloud/speech');
const googleStorage = require('@google-cloud/storage');
const FileStorage = require('./file-storage');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
require('dotenv').config().parsed;


let GOOGLE_PROJECT_ID,
    GOOGLE_APPLICATION_CREDENTIALS,
    BUCKET,
    FILEPATH,
    STORAGE_URI,
    CLOUD_STORAGE_FILE,
    VALID_COMMANDS = ["transcribe", "upload"],
    audio = {},
    request = {},
    localStorage,
    COMMAND,
    config = {};

try 
{
   GOOGLE_PROJECT_ID = process.env["GOOGLE_PROJECT_ID"];
   GOOGLE_APPLICATION_CREDENTIALS = process.env["GOOGLE_APPLICATION_CREDENTIALS"];
   BUCKET = process.env["STORAGE_BUCKET"];
   FILEPATH = process.env["FILEPATH"];
   CLOUD_STORAGE_FILE = process.env["CLOUD_STORAGE_FILE"];
   COMMAND = process.env["COMMAND"];
   config['encoding'] = process.env["FORMAT"];
   config["sampleRateHertz"] = process.env["HERTZ"];
   config["languageCode"] = process.env["LANG"];
   if (!fs.existsSync("speech"))
   {
       console.log(`Creating a new directory to store transcription documents`);
       localStorage = new FileStorage('speech');
   }
} 
catch (e)
{
    console.error(`Environment configuration has not been setup correctly! ${e}`);
}

// Google Speech & Google Storage Client 
const client = new googleSpeech.SpeechClient({ projectId: GOOGLE_PROJECT_ID, keyFilename: GOOGLE_APPLICATION_CREDENTIALS });
const storage = new googleStorage.Storage({ projectId: GOOGLE_PROJECT_ID, keyFilename: GOOGLE_APPLICATION_CREDENTIALS });


const Main = async () => {
    const command = COMMAND.toString();

    if (command == VALID_COMMANDS[0])
    {
        // Transcribe
        STORAGE_URI = `gs://${BUCKET}/${CLOUD_STORAGE_FILE}`;
        audio["uri"] = STORAGE_URI;
        request["audio"] = audio;
        request["config"] = config;
        console.log(`Transcribing ${CLOUD_STORAGE_FILE} from ${STORAGE_URI}. [Command]: `, command);
        withHandleSpeechRequest(request);
    }
    else if (command == VALID_COMMANDS[1])
    {
        handleUploadGoogleCloudStorage()
        .then(async (gcsUri) => {
            audio["uri"] = gcsUri;
            request["audio"] = audio;
            request["config"] = config;
            
            console.log(`Uploading to Google Cloud Storage: ${gcsUri}. ${STORAGE_URI}. [Command]: `, command);
            withHandleSpeechRequest(request);
        })
       .catch(err => console.error(`Error: `, err));
    }
    else
    {
        console.error(`Please provide a valid command in your configuration file! `, `Valid Commands include "${VALID_COMMANDS.join(', ')}"`);
    }
};


// Handles Uploading to Google Cloud
  const handleUploadGoogleCloudStorage = async () => {
    const bucket = storage.bucket(BUCKET);
    const fileName = path.basename(FILEPATH);
    console.log(`Uploading ${fileName} to your Google Cloud Storage!`);
    await bucket.upload(FILEPATH);
    return `gs://${BUCKET}/${fileName}`;
  };
  

  // Upload to Cloud Storage first, this function is called to detect speech within an audio file using the speech client 
  const withHandleSpeechRequest = async (request) => {
    const [operation] = await client.longRunningRecognize(request); // called asyncronously 
    const [response] = await operation.promise(); // returns a promise once the transcription result is done 

    // The transcription is stored in an array of results. 
    // Here we map through each result, joining the resulting string section into one long transcription result 
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    let output = process.env["OUTPUT"] ? process.env["OUTPUT"] : getRandomStringName(15);
    

    console.log(`Transcription has completed... `, `Saving transcription to ${output}!`);
    localStorage.writeDocument(output, transcription);
  };

  const getRandomStringName = (length) => {
      var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < length; i++)
        result += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
        
    return result;
  };


  Main().catch(console.error);