const compress_images = require('compress-images');

class Compress {

    public compressImage = async (input: string, output: string) => {
        compress_images(input, output, { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
            { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
            { svg: { engine: 'svgo', command: '--multipass' } },
            { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
            function (error: any, completed: any, statistic: any) {
                console.log('-------------');
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log('-------------');
            }
        );
    }
    
}

export default new Compress();