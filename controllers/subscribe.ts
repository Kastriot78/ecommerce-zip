import Subscribe from '../models/Subscribe';
import { Request, Response } from "express";

export const getSubscribes = async (req: Request, res: Response) => {
    try {
        const subscribers = await Subscribe.find().sort({ _id: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSubscibe = async (req: Request, res: Response) => {
    const newSubscribe = new Subscribe({
        email: req.body.email,
        createdAt: new Date().toISOString()
    });
    try {
        await newSubscribe.save();
        res.status(200).json({ newSubscribe: newSubscribe, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteSubscribe = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No subscribe with that id.');
    }
    const deletedSubscribe = await Subscribe.findByIdAndRemove(id);

    res.json({ message: 'Subscribe deleted successfully', post: deletedSubscribe });
}