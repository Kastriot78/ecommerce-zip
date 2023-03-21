import Color from '../models/Color';
import { Request, Response } from "express";

const getColors = async (req: Request, res: Response) => {
    try {
        const colors = await Color.find().sort({ _id: -1 });
        res.status(200).json(colors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getColor = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await Color.findById(id, (err: any, data: any) => {
            if (err) return res.json({ message: 'Ngjyra nuk ekziston.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createColor = async (req: Request, res: Response) => {
    const newColor = new Color({
        hexColor: req.body.colorHex,
        name: req.body.name,
        createdAt: new Date().toISOString()
    });
    try {
        await newColor.save();
        res.status(200).json({ newColor: newColor, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateColor = async (req: Request, res: Response) => {
    const id = req.params.id;

    const color = await Color.findById(id);

    if (!id) {
        return res.status(404).send('No color with that id.');
    }

    if (color) {
        color.hexColor = req.body.hexColor;
        color.name = req.body.name;
        const updatedPost = await color.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'Color Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating color' });
        }
    }
}

const deleteColor = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No color with that id.');
    }
    const deletedColor = await Color.findByIdAndRemove(id);

    res.json({ message: 'Color deleted successfully', post: deletedColor });
}

export { getColors, getColor, createColor, updateColor, deleteColor };