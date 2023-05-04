import mongoose, { Schema } from 'mongoose';

const bannerSchema: Schema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const banner1Model = mongoose.model('Banner1', bannerSchema);

export default banner1Model;
