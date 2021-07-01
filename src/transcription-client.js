import { TranscribeClient } from "@aws-sdk/client-transcribe";
import config from './config';



let region = config["AWS_STORAGE_REGION"];


const transcriptionClient = new TranscribeClient({ region: region });

if (transcriptionClient)
    console.log(`AWS Transcription Client has Connected Successfully!`);

export default transcriptionClient;
export { transcriptionClient };