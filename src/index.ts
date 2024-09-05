import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Upload from './filestore/upload';
import ReadStore from './filestore/readstore';
import Delete from './filestore/delete';
import Compress from './filestore/compress';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('node server is running');
});

// upload files to the server api
app.post('/upload', Upload.upload.single('file'), (req: Request, res: Response) => {
    res.send('File uploaded successfully');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
