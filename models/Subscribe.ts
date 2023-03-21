import mongoose, { Schema } from 'mongoose';

const subscribeSchema: Schema = new mongoose.Schema({
    email: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const subscribeModel = mongoose.model('Subscriber', subscribeSchema);

export default subscribeModel;
