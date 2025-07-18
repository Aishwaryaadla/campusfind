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
        required : true
    },
    dateLost : {
        type : Date,
        required : true
    },
    tags : {
        type : [String],
        default : []
    }
}, {
    timestamps : true
});

const Lostitem = mongoose.model('Lostitem' , lostSchema);

export default Lostitem;
