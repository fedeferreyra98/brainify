import {v2 as cloudinary} from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (imageBuffer) => {
    const uploadResult = new Promise((resolve, reject) => {
        cloudinary.uploader
        .upload_stream((error, result) => {
            if (error){
                console.error("Error al subir el archivo a Cloudinary:" ,error);
                reject(error.message);
            }
            resolve(result.secure_url);
        })
        .end(imageBuffer);
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw new Error(error);
    });

    return uploadResult;
}
