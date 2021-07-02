import { TranscribeClient } from "@aws-sdk/client-transcribe";
require('dotenv').config();

let region = process.env["AWS_STORAGE_REGION"];
const transcriptionClient = new TranscribeClient({ region: region });

if (transcriptionClient)
    console.log(`AWS Transcription Client has Connected Successfully!`);

export default transcriptionClient;
export { transcriptionClient };