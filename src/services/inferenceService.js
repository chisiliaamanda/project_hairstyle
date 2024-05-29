const tf = require('@tensorflow/tfjs-node');
const { classifyFaceType } = require('../services/faceAndHairstyle'); // Face type classification
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      // .resizeNearestNeighbor([<model_input_height>, <model_input_width>]) // Adjust based on model requirements
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    // Adapt class interpretation to face types (replace placeholders)
    const classess = ['Oval', 'Round', 'Square', 'Heart', 'Oblong', 'Diamond'];
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classess[classResult];

    // Hairstyle recommendation (replace with your implementation)
    const hairstyleRecommendation = 'Hairstyle recommendation based on face type is not implemented yet.';

    return { confidenceScore, label, hairstyleRecommendation };
  } catch (error) {
    throw new InputError('Error occurred during prediction.');
  }
}

module.exports = predictClassification;
