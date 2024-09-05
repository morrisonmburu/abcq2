import fs from 'fs';
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

class Delete {

    public deleteFile = async (path: string) => {
        try {
            // check if file path exists
            if (!fs.existsSync(path)) {
                throw new Error('File does not exist.');
            }

            // delete file
            await unlinkAsync(path);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Delete();