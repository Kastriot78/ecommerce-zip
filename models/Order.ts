import mongoose, { Schema } from 'mongoose';

const orderSchema: Schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: [],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
