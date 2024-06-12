const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([128, 128]) // Adjust based on model requirements
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    // Face Shape Classes
    const faceShapes = ['Oval', 'Rectangular', 'Square', 'Round'];
    const faceShapeResult = tf.argMax(prediction, 1).dataSync()[0];
    const faseShapeLabel = faceShapes[faceShapeResult];

    // Define hairstyle classes
    const hairstyles = ['Straight', 'Wavy', 'Curly'];

    // Map face shapes to recommended hairstyles (example mappings)
    const hairstyleRecommendations = {
      'Oval': ['Straight', 'Wavy', 'Curly'],
      'Rectangular': ['Wavy', 'Curly'],
      'Square': ['Wavy', 'Curly'],
      'Round': ['Straight', 'Wavy'],
    };

    // Get a random hairstyle recommendation for the predicted face shape
    const recommendedHairstyles = hairstyleRecommendations[faceShapeLabel];
    const randomHairstyle = recommendedHairstyles[Math.floor(Math.random() * recommendedHairstyles.length)];

    const suggestion = `Based on your face shape (${faceShapeLabel}), we recommend the following hairstyle: ${randomHairstyle}.`;

    return { confidenceScore, label: faceShapeLabel, suggestion };
  } catch (error) {
    throw new InputError('Error occurred during prediction.');
  }
}

module.exports = predictClassification;
