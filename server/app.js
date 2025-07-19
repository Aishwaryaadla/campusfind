import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

import lostitemsroute from './routes/lostitems.js';
import founditemsroute from './routes/founditems.js';

const app = express();
app.use('/uploads', express.static('server/uploads'));


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/lostitems",lostitemsroute);
app.use("/api/founditems",founditemsroute);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

