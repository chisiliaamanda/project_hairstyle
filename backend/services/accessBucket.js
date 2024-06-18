import { Storage } from '@google-cloud/storage';
const storage = new Storage({ projectId: 'capstone-hairstyle' }); 

const bucketName = 'model-hairstyle';
const folders = ['tipe_rambut/bald hair/', 'tipe_rambut/curly hair/', 'tipe_rambut/straight hair/', 'tipe_rambut/wavy hair/'];

export async function getHairstyleUrls() {
  const hairstyles = {};
  try {
    for (const folderName of folders) {
      const [files] = await storage.bucket(bucketName).getFiles({ prefix: folderName });

      files.forEach(file => {
        const fileName = file.name;
        const encodedFileName = encodeURIComponent(fileName);
        const fileUrl = `https://storage.googleapis.com/${bucketName}/${encodedFileName}`;

        // Extract the key from the filename, including the extension
        // Remove the folder prefix and trim any extra spaces
        const baseName = fileName.replace(folderName, '').split('/').pop().trim();
        const key = baseName; // Use the entire base name including extension to ensure uniqueness

        // Add the URL to the hairstyles object using the extracted key
        hairstyles[key] = fileUrl;
      });
    }

    return hairstyles;
  } catch (error) {
    console.error('Error fetching files from GCS:', error);
    throw error;
  }
}
