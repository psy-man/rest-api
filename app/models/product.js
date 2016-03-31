import mongoose from 'mongoose';
import {VariantSchema} from "./variant";
import {ImageSchema} from "./image";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    variants: [VariantSchema],
    images: [ImageSchema],
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', ProductSchema);