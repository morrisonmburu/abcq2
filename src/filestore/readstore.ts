import fs from 'fs';

class ReadFileStore {

    public metadata = async (path: string = 'storage') => {
        try {
            // check if path exists
            if (!fs.existsSync(path)) {
                throw new Error('Path does not exist.');
            }
            // file path must be a directory
            if (!fs.lstatSync(path).isDirectory()) {
                throw new Error('Path is not a directory.');
            }

            // Return a list of all stored file's metadata - file name, url, file size, upload date
            const files = fs.readdirSync(path);
            const fileMetadata = files.map((file: string) => {
                const stats = fs.statSync(`${path}/${file}`);
                return {
                    name: file,
                    url: `${path}/${file}`,
                    size: stats.size,
                    sizeInMB: stats.size / 1024 / 1024,
                    sizeInKB: stats.size / 1024,
                    date: stats.birthtime
                };
            });
            console.log(fileMetadata);
            return fileMetadata;
        } catch (error) {
            console.log(error);
        }
    }

    public storageSize = async (path: string = 'storage') => {
        try {
            // check if path exists
            if (!fs.existsSync(path)) {
                throw new Error('Path does not exist.');
            }

            // file path must be a directory
            if (!fs.lstatSync(path).isDirectory()) {
                throw new Error('Path is not a directory.');
            }

            // Return the total number of files stored and the total size of the storage
            const files = fs.readdirSync(path);

            const totalSize = files.reduce((acc: number, file: string) => {
                const stats = fs.statSync(`${path}/${file}`);
                return acc + stats.size;
            }, 0);

            console.log(`Total number of files: ${files.length}`);
            console.log(`Total storage size: ${totalSize} bytes`);

            return {
                files: files.length,
                size: totalSize,
                sizeInMB: totalSize / 1024 / 1024,
                sizeInKB: totalSize / 1024
            };
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ReadFileStore();