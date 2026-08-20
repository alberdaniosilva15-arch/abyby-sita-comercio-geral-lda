import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import path from 'path';

// Configuração lazy — só efetiva se as chaves existirem.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
} else {
  console.warn('CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET em falta no .env — uploads desativados.');
}

/**
 * Faz o upload de um buffer (ficheiro recebido no Multer) para o Cloudinary,
 * preservando a extensão original (.pdf, .docx, .doc) para garantir que
 * o download no navegador vem com o formato e nome correto.
 */
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto',
  originalFilename?: string
): Promise<string> => {
  if (!cloudName || !apiKey || !apiSecret) {
    return Promise.reject(new Error('Cloudinary não configurado. Adicione as chaves CLOUDINARY_* ao .env.'));
  }

  let publicId: string | undefined = undefined;
  if (originalFilename) {
    const ext = path.extname(originalFilename);
    const rawBase = path.basename(originalFilename, ext);
    const cleanBase = rawBase
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 40);
    publicId = `${cleanBase}_${Date.now()}${ext}`;
  }

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      folder,
      resource_type: resourceType,
    };

    if (publicId) {
      options.public_id = publicId;
      options.use_filename = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) return resolve(result.secure_url);
        reject(new Error('Cloudinary devolveu resposta vazia.'));
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
