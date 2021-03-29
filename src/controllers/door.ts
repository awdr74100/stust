import { Request, Response } from 'express';
import { Server } from 'socket.io';

export const call = (req: Request, res: Response): Response => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const io: Server = req.app.get('io');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { hash } = req.body;
  // const { hash } = req.params;
  io.emit('close_webview', true);
  io.emit('play_sound', hash);
  return res.send({ success: true });
};

export const open = (req: Request, res: Response): Response => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const io: Server = req.app.get('io');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { hash } = req.body;
  /* check hash */
  io.emit('open_door', true);
  return res.send({ success: true });
};
