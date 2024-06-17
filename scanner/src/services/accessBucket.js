const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ projectId: 'hairstyle-tresstech' }); 

const bucketName = 'model-hairstyle-ml';
const folders = ['tipe_rambut/bald hair/', 'tipe_rambut/curly hair/', 'tipe_rambut/straight hair/', 'tipe_rambut/wavy hair/'];
const hairstyles = {};

async function getHairstyleUrls() {
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

    console.log(hairstyles);
  } catch (error) {
    console.error('Error fetching files from GCS:', error);
  }
}

getHairstyleUrls();
