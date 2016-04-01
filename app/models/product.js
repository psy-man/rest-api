import mongoose from 'mongoose';
import {VariantSchema} from "./variant";
import {ImageSchema} from "./image";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  variants: [VariantSchema],
  images: [ImageSchema],
  modified: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', ProductSchema);