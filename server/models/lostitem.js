import mongoose from 'mongoose';

const lostSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    decription : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    dateFound : {
        type : Date,
        required : true
    },
    tags : {
        type : [String],
        defualt : []
    }
}, {
    timestamps : true
});

const LostItem = mongoose.model('LostItem' , lostSchema);

export default LostItem;
