import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const VariantSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    trim: true
  }
});

export default mongoose.model('Variant', VariantSchema);