import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const upload = (req: Request, res: Response): Response => {
  return res.send({ success: true, message: '上傳成功' });
};

export const stream = (req: Request, res: Response): Response => {
  const { hash } = req.params;
  const sound = path.resolve(__dirname, '../../sounds', `${hash}.mp3`);
  if (!fs.existsSync(sound)) {
    return res.send({ success: false, message: '找不到檔案' });
  }
  const { size } = fs.statSync(sound);
  const { range } = req.headers;
  console.log(range);
  if (range) {
    const parts: string[] = range.replace(/bytes=/, '').split('-');
    const partialStart = parts[0];
    const partialEnd = parts[1];
    const start = parseInt(partialStart, 10);
    const end = partialEnd ? parseInt(partialEnd, 10) : size - 1;
    const contentLength = end - start + 1;
    res.status(206).header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': contentLength,
      'Content-Range': `bytes ${start}-${end}/${size}`,
    });
    return fs.createReadStream(sound, { start, end }).pipe(res);
  }
  res.header({
    'Content-Type': 'audio/mpeg',
    'Content-Length': size,
  });
  return fs.createReadStream(sound).pipe(res);
};
