import mongoose, { Schema } from 'mongoose';

const contactSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const contactModel = mongoose.model('Contact', contactSchema);

export default contactModel;
