import Compressor from 'compressorjs';

const compressImage = (image) => {
    if (image) {
        new Compressor(image, {
            quality: 0.5,
            width: 700,
            convertSize: 100,
            success: (compressedResult) => {
                return (compressedResult);
            }
        });
    } else {
        return
    }
};

export default compressImage