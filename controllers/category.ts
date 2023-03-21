import Category from '../models/Category';
import { Request, Response } from "express";


const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort( { _id: -1 } );
        res.status(200).json(categories);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

const getCategory = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await Category.findById(id, (err: any, data: any) => {
            if(err) return res.json({message: 'Kategoria nuk ekziston.'});
            res.send(data);
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

const createCategory = async (req: Request, res: Response) => { 
    const newCategory = new Category({ 
        name: req.body.name,
        subCategories: req.body.subCategories,
        createdAt: new Date().toISOString()
    });
    try {
        await newCategory.save();
        res.status(201).json({ newCategory: newCategory, success: true });
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

const updateCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    const category = await Category.findById(id);

    if(!id) {
        return res.status(404).send('No category with that id.');
    }

    if(category) {
        category.name = req.body.name;
        category.subCategories = req.body.subCategories;
        const updatedPost = await category.save();
        
        if(updatedPost) {
            return res.status(200).send({ msg: 'Category Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating category' });
        }
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).send('No category with that id.');
    }
    const deletedCategory = await Category.findByIdAndRemove(id);

    res.json({ message: 'Category deleted successfully', post: deletedCategory });
}

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };