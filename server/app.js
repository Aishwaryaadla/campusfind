import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
import path from 'path';


import lostitemsroute from './routes/lostitems.js';
import founditemsroute from './routes/founditems.js';
import authRoutes from './routes/auth.js';
import adminRoute from './routes/admin.js';


const app = express();

// app.use('/uploads', express.static('server/uploads'));


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:5174',
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

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

