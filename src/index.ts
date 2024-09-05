import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Upload from './filestore/upload';
import ReadStore from './filestore/readstore';
import Delete from './filestore/delete';
import Compress from './filestore/compress';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('storage'));

app.get('/', (req: Request, res: Response) => {
    res.send('node server is running');
});

// upload files to the server api
app.post('/upload', Upload.upload.single('file'), (req: Request, res: Response) => {
    if (req.file) {
        const { originalname, mimetype, filename } = req.file;

        if (!mimetype.includes('image')) {
            const link = `http://localhost:${port}/${req.file.filename}`;
            res.json({
                message: 'File uploaded successfully',
                originalFile: link,
                originalPath: req.file.filename
            });
            return;
        }
        // load file into memory and get the buffer: Cache the file in memory
        const buffer = fs.readFileSync(`storage/${filename}`);
        // compress the file
        const timestamp = Date.now();
        // make compressed directory
        fs.mkdirSync('storage/compressed', { recursive: true });
        const compressedPath = `storage/compressed/${timestamp}-${originalname}`;

        const allowedMimes: string[] = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        if (allowedMimes.includes(mimetype)) {
            switch (mimetype) {
                case 'image/jpeg':
                    Compress.compressJpg(buffer, compressedPath);
                    break;
                case 'image/png':
                    Compress.compressPng(buffer, compressedPath);
                    break;
                case 'image/webp':
                    Compress.compressWebp(buffer, compressedPath);
                    break;
                case 'image/gif':
                    Compress.compressGif(buffer, compressedPath);
                    break;
                default:
                    break;
            }
        }

        const link = `http://localhost:${port}/${req.file.filename}`;
        const compressedLink = `http://localhost:${port}/compressed/${timestamp}-${originalname}`;

        res.json({
            message: 'File uploaded successfully',
            originalFile: link,
            compressedFile: compressedLink,
            originalPath: req.file.filename,
            compressedPath: `${timestamp}-${originalname}`
        });
    } else {
        res.send('File upload failed');
    }
});

// delete a file from the server api
app.delete('/delete', (req: Request, res: Response) => {
    const path = req.query.path as string;
    // check if a file exists
    const filePath = `storage/${path}`;
    if (fs.existsSync(filePath)) {
        Delete.deleteFile(filePath);
    }
    // check if a compressed file exists
    const compressedPath = `storage/compressed/${path}`;
    if (fs.existsSync(compressedPath)) {
        Delete.deleteFile(compressedPath);
    }
    res.send('File deleted successfully');
});

// get all stored files metadata
app.get('/metadata', async (req: Request, res: Response) => {
    const metadata = await ReadStore.metadata();
    res.send(metadata);
});

// get total storage size
app.get('/storage-size', async (req: Request, res: Response) => {
    const storageSize = await ReadStore.storageSize();
    res.send(storageSize);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
