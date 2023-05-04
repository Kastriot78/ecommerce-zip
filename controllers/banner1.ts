import Banner1 from '../models/Banner1';
import { Request, Response } from "express";

const getBanner1All = async (req: Request, res: Response) => {
    try {
        const categories = await Banner1.find().sort({ 'createdAt': -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBanner1 = async (req: Request, res: Response) => {
    try {
        const banner = await Banner1.findOne({ _id: req.params.id });
        if (!banner) {
            return res.status(404).json({ message: 'Banneri nuk ekziston.' });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBanner = async (req: any, res: Response) => {
    const url = req.protocol + '://' + req.get('host');
    const newBanner = new Banner1({
        image: url + '/images/' + req.files[0].filename,
        title: req.body.title,
        createdAt: new Date().toISOString()
    });
    try {
        await newBanner.save();
        res.status(201).json({ newBanner: newBanner, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateBanner1 = async (req: any, res: Response) => {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get('host')

    const banner1 = await Banner1.findById(id);

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }

    if (banner1) {
        if (req.files[0]) {
            banner1.image = url + '/images/' + req.files[0].filename;
        }
        banner1.title = req.body.title;
        const updatedPost = await banner1.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'banner1 Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating banner1' });
        }
    }
}

const deleteBanner1 = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }
    const deletedBanner = await Banner1.findByIdAndRemove(id);

    res.json({ message: 'Banner deleted successfully', post: deletedBanner });
}

export { getBanner1All, getBanner1, createBanner, updateBanner1, deleteBanner1 };
