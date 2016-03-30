import mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ImageSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Image', ImageSchema);