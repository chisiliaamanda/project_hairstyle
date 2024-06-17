const hairstyles = {
    'Oval': 'https://storage.googleapis.com/model-hairstyle-ml/tipe_wajah/ovale/15.jpg',
    'Rectangular': 'https://your-image-url/rectangular-hairstyle.jpg',
    'Square': 'https://your-image-url/square-hairstyle.jpg',
    'Round': 'https://your-image-url/round-hairstyle.jpg'
  };
  
  async function getRecommendation(faceShape) {
    return hairstyles[faceShape];
  }
  
  module.exports = getRecommendation;
  