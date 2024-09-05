import sharp from 'sharp';

class Compress {

    public compressPng = async (buffer: Buffer, ref: string) => {
        await sharp(buffer)
            .png()
            .toFile(ref);
    }

    public compressJpg = async (buffer: Buffer, ref: string) => {
        await sharp(buffer)
            .jpeg()
            .toFile(ref);
    }

    public compressWebp = async (buffer: Buffer, ref: string) => {
        await sharp(buffer)
            .webp()
            .toFile(ref);
    }
    
    public compressGif = async (buffer: Buffer, ref: string) => {
        await sharp(buffer)
            .gif()
            .toFile(ref);
    }
    
}

export default new Compress();