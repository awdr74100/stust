import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

export const upload = multer({
  limits: { fieldSize: 1024 * 1024 * 10 }, // 10MB
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const folder = path.resolve(__dirname, '../../sounds');
      if (!fs.existsSync(folder)) fs.mkdirSync(folder);
      cb(null, folder);
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter(req, file, cb) {
    const rx = /\.(mp3|wav)$/i;
    if (rx.test(file.originalname)) return cb(null, true);
    return cb(new Error('Invalid audio type'));
  },
});

export const catchErrors = (
  err: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err.message === 'Invalid audio type') {
    return res.send({ success: false, message: '不支援的檔案格式' });
  }
  if (err.message === 'Audio too large') {
    return res.send({ success: false, message: '超過音檔限制大小' });
  }
  if (err.message === 'Unexpected field' && err.field === 'sounds') {
    return res.send({ success: false, message: '超過上傳數量限制' });
  }
  if (err.message === 'Unexpected field') {
    return res.send({ success: false, message: '超過上傳數量限制' });
  }
  return res.status(500).send({ success: false, message: err.message });
};
