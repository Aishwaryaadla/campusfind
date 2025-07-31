import mongoose from 'mongoose';

const foundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    dateFound: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    location: { type: String, required: true }, 
    rollNo: { type: String, required: true },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Returned']
      }      
}, {
    timestamps: true
});

const Founditem = mongoose.model('Founditem', foundSchema);

export default Founditem;
