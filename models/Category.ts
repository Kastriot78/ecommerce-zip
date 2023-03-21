import mongoose, { Schema } from 'mongoose';

const categorySchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
