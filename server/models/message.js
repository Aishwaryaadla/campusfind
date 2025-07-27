import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {
        type: String,
        required : true
    },
    receiver : {
        type : String,
        required : true
    },
    itemId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        refPath: 'itemType' 
    },
    itemType: { 
        type: String, 
        enum: ['Lostitem', 'Founditem'], 
        required: true },
    content: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

export default mongoose.model('Message',messageSchema);