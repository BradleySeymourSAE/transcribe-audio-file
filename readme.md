


# AWS Upload & Transcribe Local Files 
###### Uploads local audio files to Amazon AWS bucket and starts the transcription job



### _Future Features_
```
1) Save file locally after transcription is completed
2) Format and save the file as a .docx format 
3) Identify and split multiple speakers and format in the response 
4) Accept audio and video files  
```



#### Setup Environment 
###### Create a .env file in the src directory and add the following keys 

###### The language to transcribe the audio in, by default set to english  
LANG=en-US

###### The AWS access key id  
AWS_ACCESS_KEY_ID
###### The AWS secret access token 
AWS_SECRET_ACCESS_KEY=
###### The storage bucket name 
AWS_STORAGE_BUCKET=
###### The region name that the bucket is located in 
AWS_STORAGE_REGION=

### Setup

Clone the repository and install the dependencies.

```
Step 1 - git clone https://github.com/BradleySeymourSAE/transcribe-audio-file.git 
Step 2 - Get AWS authentication credentials and create a .env file with the above keys
Step 3 - npm install
Step 4 - npm start
```


<br></br>
#### Version
__node@12.18.3__ <br>
__npm@6.14.6__
</br>
## License

MIT
