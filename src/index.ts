import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import sockets from './connection/sockets';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.NODE_ENV === 'development' || process.env.BASE_URL,
  credentials: true,
};

sockets.init(server, app);

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

server.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
