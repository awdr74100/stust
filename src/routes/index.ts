import express from 'express';
import * as soundController from '../controllers/sound';
import * as doorController from '../controllers/door';
import * as uploadHandler from '../middleware/uploadHandler';

const router = express.Router();

/* Sound Routes */
router.post(
  '/sounds',
  uploadHandler.upload.array('sounds', 5),
  uploadHandler.catchErrors,
  soundController.upload,
);
router.get('/sounds/:hash', soundController.stream);

/* Door Routes */
router.post('/doors/call/:hash', doorController.call);
router.post('/doors/open', doorController.open);

export default router;
