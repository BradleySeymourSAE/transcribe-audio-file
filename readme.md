


# Google Speech Upload & Transcribe 
### Uploads a Local Audio WAV file to Google Cloud Stroage
#### Returns a transcription of the result  

#### _Environment Config (.env)_
Your google application project id 
GOOGLE_PROJECT_ID=YOUR_GOOGLE_PROJECT_ID

###### The path to your google application credentials 
GOOGLE_APPLICATION_CREDENTIALS=./PATH_TO_CREDENTIALS

###### The name of your google cloud storage bucket 
STORAGE_BUCKET=YOUR_STORAGE_BUCKET_NAME 

###### Local path to the file you want to transcribe / upload 
FILEPATH=file.wav

###### The remote file name of the file you want to transcribe 
CLOUD_STORAGE_FILE=sound.wav

###### The desired output file name
OUTPUT_FILENAME=output.docx


##### Uploading & Transcribing 
<b>COMMAND=upload</b>
##### Will upload the file from the local directory to google cloud and then transcribe 
<b>COMMAND=transcribe</b>
###### Transcribe the file from the remote google cloud bucket

####  Audio Configuration 
FORMAT=LINEAR16
HERTZ=480000
LANG=en-US

#### Install 
> git clone https://github.com/BradleySeymourSAE/transcribe-audio-file.git
>  Create a directory in the project called Storage
>  Create google application credential  keys  
>  Get your google account project id 
>  Create a google cloud storage bucket 


#### Setup 
> Create .env file in local directory 
> > Fill in the parameters above   

## Initialization
> npm install
>> Install required dependencies 

> npm start
>> Begins Runs the program 


<br></br>
#### Node & NPM Versoions  
###### node@12.18.3
###### npm@6.14.6

