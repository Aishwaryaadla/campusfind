import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

import lostitemsroute from './routes/lostitems.js';
import founditemsroute from './routes/founditems.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/lostitems",lostitemsroute);
app.use("/api/founditems",founditemsroute);

app.listen(4000, () => {
    connectDB();
    console.log("Server started at http://localhost:4000");
});

