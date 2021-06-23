import path from 'path';
import fs from 'fs';
import bucket from '../bucket';

function uploadToStorage(p_BucketName, p_Prefix, p_Filename) {
    var l_LocalFile = path.basename(p_Filename);
    var l_UploadedFileStream = fs.createReadStream(p_Filename);
    var l_UploadedFileKey = path.join(p_Prefix, l_LocalFile);

    return new Promise(function(resolve, reject) {
        l_UploadedFileStream.once('error', reject);
        bucket.upload({
            Bucket: p_BucketName,
            Key: l_UploadedFileKey,
            Body: l_UploadedFileStream
         })
        .promise().then(resolve, reject);
    })
}


export default uploadToStorage;
export { uploadToStorage };
