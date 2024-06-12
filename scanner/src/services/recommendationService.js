const hairstyles = {
    'Oval': 'https://your-image-url/oval-hairstyle.jpg',
    'Rectangular': 'https://your-image-url/rectangular-hairstyle.jpg',
    'Square': 'https://your-image-url/square-hairstyle.jpg',
    'Round': 'https://your-image-url/round-hairstyle.jpg'
  };
  
  async function getRecommendation(faceShape) {
    return hairstyles[faceShape];
  }
  
  module.exports = getRecommendation;
  