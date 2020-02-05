const { pack } = require('texture-compressor');
const fs = require('fs');

const in_dir = 'input';
const out_dir = 'output';

if (fs.existsSync(in_dir)) {
    fs.readdir(in_dir, (err, items) => {
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            compression(items[i])
        }
    });
} else {
    fs.mkdirSync(in_dir);
    console.log('input folder not found!');
}

compressor = (img) => {
    !fs.existsSync(out_dir) && fs.mkdirSync(out_dir);
    !fs.existsSync(out_dir + '/astc') && fs.mkdirSync(out_dir + '/astc');
    !fs.existsSync(out_dir + '/etc') && fs.mkdirSync(out_dir + '/etc');
    !fs.existsSync(out_dir + '/pvrtc') && fs.mkdirSync(out_dir + '/pvrtc');
    !fs.existsSync(out_dir + '/s3tc') && fs.mkdirSync(out_dir + '/s3tc');

    if (img.endsWith('.jpg')) {
        //desktop, jpg
        pack({
            type: 's3tc',
            input: img,
            output: out_dir + '/s3tc/' + img.split('/').pop() + '.ktx',
            compression: 'DXT1',
            quality: 'superfast',
            verbose: true,
        }).then(() => console.log('done!'));

        //android, jpg
        pack({
            type: 'etc',
            input: img,
            output: out_dir + '/etc/' + img.split('/').pop() + '.ktx',
            compression: 'ETC2_RGB',
            quality: 'etcfast',
            verbose: true,
        }).then(() => console.log('done!'));

        //ios, jpg
        pack({
            type: 'pvrtc',
            input: img,
            output: out_dir + '/pvrtc/' + img.split('/').pop() + '.ktx',
            compression: 'PVRTC1_2_RGB',
            quality: 'pvrtcfastest',
            verbose: true,
        }).then(() => console.log('done!'));
    }

    if (img.endsWith('.png')) {
        //desktop, png
        pack({
            type: 's3tc',
            input: img,
            output: out_dir + '/s3tc/' + img.split('/').pop() + '.ktx',
            compression: 'DXT5',
            quality: 'superfast',
            verbose: true,
        }).then(() => console.log('done!'));

        //android, png
        pack({
            type: 'astc',
            input: img,
            output: out_dir + '/astc/' + img.split('/').pop() + '.ktx',
            compression: 'ASTC_4x4',
            quality: 'astcmedium',
            verbose: true,
        }).then(() => console.log('done!'));

        //ios, png
        pack({
            type: 'pvrtc',
            input: img,
            output: out_dir + '/pvrtc/' + img.split('/').pop() + '.ktx',
            compression: 'PVRTC1_4',
            quality: 'pvrtcfastest',
            verbose: true,
        }).then(() => console.log('done!'));
    }
}