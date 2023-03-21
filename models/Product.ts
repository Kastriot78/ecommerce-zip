import mongoose, { Schema } from 'mongoose';

const productSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    images: { type: Array, required: true },
    colors: { type: Array, required: true },
    sizes: { type: Array, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    InStock: { type: Boolean, required: true, default: false },
    sku: { type: String, required: true },
    sasia: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
