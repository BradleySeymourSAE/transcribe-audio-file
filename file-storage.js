const fs = require('fs');


class FileStorage {
    constructor(storageName){
        this.basePath = `${__dirname}/Storage/${storageName}`;

        if (!fs.existsSync(this.basePath))
        {
            console.log('[FileStorage]', `Creating base directory in: `, this.basePath);

            fs.mkdirSync(this.basePath);
        }
    }

    writeDocument(documentId, buffer)
    {
        const documentPath = `${this.basePath}/${documentId}.docx`;


        try {
            fs.writeFileSync(documentPath, buffer);
            return true;
        } catch (errorException)
        {
            console.log('[FileStorage]', `There was a writing error in FileStorage at (${documentPath})`, errorException);
            return false;
        }
    }

    
    getDocument(documentId)
    {
        const docPath = `${this.basePath}/${documentId}.docx`;
        

        try {
            if (fs.existsSync(docPath))
            {
                return fs.readFileSync(docPath);
            }
        } catch (errorException)
        {
            console.log('[FileStorage]', `There was a writing error in FileStorage at (${docPath})`, errorException);
            return false;
        }
    }


    getFile(file_id)
    {
        const path = `${this.basePath}/${file_id}.json`;


        try {
            if (fs.existsSync(path))
            {
                var options = { encoding: 'utf8', flag: 'r' };
                const rawData = fs.readFileSync(path, options);
                return JSON.parse(rawData) || null;
            }
        } catch (errorException)
        {
            console.log('[FileStorage]', `There was a reading error in FileStorage at (${path})`, errorException);
        }
        return null;
    }

    writeFile(file_id, value)
    {
        const filePath = `${this.basePath}/${file_id}.json`;


        try {
            const rawData = JSON.stringify(value);
            var options = { encoding: 'utf8', mode: '666', flag: 'w' };
            fs.writeFileSync(filePath, rawData, options);
            return true;
        } catch (errorException)
        {
            console.log('[FileStorage]', `There was a writing error in FileStorage at (${filePath})`, errorException);
            return false;
        }
    }
}


module.exports = FileStorage;