import mongoose from 'mongoose';

const lostSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : false
    },
    dateLost : {
        type : Date,
        required : true
    },
    tags : {
        type : [String],
        default : []
    },
    location: { type: String, required: true }, 
    rollNo: { type: String, required: true },
}, {
    timestamps : true
});

const Lostitem = mongoose.model('Lostitem' , lostSchema);

export default Lostitem;
