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

export const compressImage3 = (image, options) => {
    return new Promise((resolve, reject) => {
        new Compressor(image, {
            quality: 0.5,
            width: 700,
            convertSize: 100,
            success: resolve,
            error: reject,
            ...options,
        });
    });
};

