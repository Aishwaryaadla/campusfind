import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';


import lostitemsroute from './routes/lostitems.js';
import founditemsroute from './routes/founditems.js';
import authRoutes from './routes/auth.js';
import adminRoute from './routes/admin.js';
import { fileURLToPath } from 'url';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

// app.use('/uploads', express.static('server/uploads'));



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/lostitems",lostitemsroute);
app.use("/api/founditems",founditemsroute);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoute);

// app.listen(PORT, () => {
//     connectDB();
//     console.log("Server started at http://localhost:"+PORT);
// });

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

server.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

