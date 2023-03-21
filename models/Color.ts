import mongoose, { Schema } from 'mongoose';

const colorSchema: Schema = new mongoose.Schema({
    hexColor: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const colorModel = mongoose.model('Color', colorSchema);

export default colorModel;
