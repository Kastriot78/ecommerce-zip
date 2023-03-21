import Order from '../models/Order';
import { Request, Response } from "express";


const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({ _id: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await Order.findById(id, (err: any, data: any) => {
            if (err) return res.json({ message: 'Porosia nuk ekziston.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.params.userId }) //pra me i gjet t orders t atij useri i cili eshte i logum.
        res.status(201).json({ orders: orders, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req: Request, res: Response) => {
    const newOrder = new Order({
        user: req.body.user,
        orderItems: req.body.orderItems,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
        createdAt: new Date().toISOString()
    });
    try {
        await newOrder.save();
        res.status(200).json({ newOrder: newOrder, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No order with that id.');
    }
    const deletedOrder = await Order.findByIdAndRemove(id);

    res.json({ message: 'Order deleted successfully', post: deletedOrder });
}

export { getOrders, getMyOrders, getOrder, createOrder, deleteOrder };