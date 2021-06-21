


# Google Speech Upload & Transcribe 
### Uploads a Local Audio WAV file to Google Cloud Stroage
### _IMPORTANT NOTE_ 

> If you are using Google Speech Client & wanting to upload large file sizes, make sure that you are not > uploading 3-4 hour long audio clips to transcribe as this can be quite expensive


#### __Environment Config__

###### Your google application project id
<b>GOOGLE_PROJECT_ID=</b>YOUR_GOOGLE_PROJECT_ID

###### The path to your google application credentials 
<b>GOOGLE_APPLICATION_CREDENTIALS=</b>./PATH_TO_CREDENTIALS

###### The name of your google cloud storage bucket 
<b>STORAGE_BUCKET=</b>YOUR_STORAGE_BUCKET_NAME 

###### Name of the local file you want to transcribe / upload to your bucket  
<b>FILEPATH=</b>audio-file.wav

###### The remote file name of the file you want to transcribe 
<b>CLOUD_STORAGE_FILE=</b>audio-file-in-bucket.wav

###### The desired output file name
<b>OUTPUT_FILENAME=</b>output.docx


##### Uploading & Transcribing 
<b>COMMAND=?</b> upload
##### Will upload the file from the local directory to google cloud and then transcribe 

<b>COMMAND=?</b> transcribe
###### Transcribe the file from the remote google cloud storage bucket

####  Audio Configuration 
<b>FORMAT=</b> LINEAR16

<b>HERTZ=</b> 480000 
<b>LANG=</b> en-US

## Installation
Clone the repository and install the dependencies.

```
1) git clone https://github.com/BradleySeymourSAE/transcribe-audio-file.git 

2) Create a directory in the project called Storage

```
> Create google application credential keys    
> Get your google project id 
> Create google storage bucket
> <b> Enable the API's in Google Admin </b>
```
3) npm install

4) npm start
```

#### Setup 
> Create .env file in local directory 
> > Fill in the parameters above   

## Initialization
> npm install
>> Install required dependencies 

> npm start
>> Begins Runs the program 


<br></br>
#### Node & NPM Versions  
__node@12.18.3__
__npm@6.14.6__

## License

MIT