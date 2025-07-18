import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import LostItem from './models/lostitem.js';

const app = express();

dotenv.config();

app.use(express.json());


app.post('/api/lostitems' , async (req,res) => {
    const lostitem = req.body;

    if(!lostitem.name || !lostitem.description || !lostitem.imageUrl || !lostitem.dateFound){
        return res.status(400).json({ success : false , message : "Please fill all the required fields"});
    }

    const newitem = new LostItem(lostitem);

    try{
        await newitem.save();
        res.status(201).json({ success : true , data : newitem});
    }
    catch(error){
        console.error("Error in adding lostitem to database : ", error.message);
        res.status(500).json({ success : false , message : "Server error"});
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("Server started at http://localhost:3000");
});

