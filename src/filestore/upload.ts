import multer from 'multer';
import fs from 'fs';

class Upload {
    public storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdir('storage', { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
                cb(null, 'storage');
            });
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + '-' + Date.now());
        }
    });

    public upload = multer(
        {
            storage: this.storage,
            limits: {
                // limit file size to 100MB - to be adjusted as needed
                fileSize: 100 * 1024 * 1024
            },
            fileFilter: (req, file, cb) => {
                /**
                 * Allow the following file types:
                 * - all image types
                 * - all video types
                 * - all audio types
                 * - pdf, - doc, - docx, - xls, - xlsx, - ppt, - pptx, - txt, - csv, - json, - xml, - zip
                 * - tar, - 
                 * gz, - bz2, - 7z, - rar
                 */
                
                const allowedMimes: string[] = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/bmp',
                    'image/webp',
                    'image/svg+xml',
                    'video/mp4',
                    'video/quicktime',
                    'video/webm',
                    'video/ogg',
                    'audio/mpeg',
                    'audio/ogg',
                    'audio/wav',
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'text/plain',
                    'text/csv',
                    'application/json',
                    'application/xml',
                    'application/zip',
                    'application/x-tar',
                    'application/gzip',
                    'application/x-bzip2',
                    'application/x-7z-compressed',
                    'application/x-rar-compressed'
                ];

                if (!allowedMimes.includes(file.mimetype)) {
                    cb(new Error('Invalid file type.'));
                }

                cb(null, true);
            }
        }
    )
}

export default new Upload();