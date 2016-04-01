import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  }
});

export default mongoose.model('Image', ImageSchema);