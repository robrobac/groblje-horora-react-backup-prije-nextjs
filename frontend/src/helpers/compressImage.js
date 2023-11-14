import Compressor from 'compressorjs';

export const compressImage = (image, successCallback) => {
    if (image) {
        new Compressor(image, {
            quality: 0.1,
            width: 700,
            convertSize: 20,
            success: successCallback,
        });
    } else {
        successCallback(null)
    }
};
