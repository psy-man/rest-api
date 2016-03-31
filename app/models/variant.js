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
        required: true,
        trim: true
    },
    color: String
});

export default mongoose.model('Variant', VariantSchema);