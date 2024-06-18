import { getHairstyleUrls } from '../services/getHairstyleUrlsService.js';

export async function getHairstyleUrlsHandler(req, res) {
  try {
    const hairstyles = await getHairstyleUrls();
    res.status(200).json({
      status: 'success',
      data: hairstyles,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch hairstyle URLs',
    });
  }
}
