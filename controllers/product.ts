import Product from '../models/Product';
import { Request, Response } from "express";

export const getProducts = async (req: any, res: any) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (product) {
            return res.status(200).send({ product: product, success: true })
        } else {
            return res.status(404).send({ message: 'Produkti nuk ekziston' });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    // Handle uploaded files
    const files = req.files as Express.Multer.File[];
    // Create a new product with the uploaded file names
    const product = new Product({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        discountPrice: req.body.discountPrice || 0,
        images: files?.map((file) => file.filename),
        colors: req.body.colors,
        sizes: req.body.sizes,
        description: req.body.description,
        tags: req.body.tags,
        InStock: req.body.InStock,
        sku: req.body.sku,
        sasia: req.body.sasia
    });

    try {
        // Save the product to the database
        await product.save();
        res.status(200).json({ product: product, success: true, message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const id = req.params.id;
    const product = await Product.findById(id);

    if (!id) {
        return res.status(404).send("No product with that id.");
    }
    // if req.body.images ekziston athere e dijm qe jemi duke bo update images ekzistuese t produktit.
    let bodyImages;
    if (req.body.images) {
        bodyImages = Array.isArray(req.body.images) ? req.body.images : req.body.images.split(',');
    }

    if (product) {
        product.title = req.body.title;
        product.category = req.body.category;
        product.price = req.body.price;
        product.discountPrice = req.body.discountPrice;
        product.images = files?.length > 0 ? files?.map((file) => file.filename) : bodyImages ? bodyImages?.map((file: any) => file) : product?.images.map((file: any) => file);
        product.colors = req.body.colors;
        product.sizes = req.body.sizes;
        product.description = req.body.description;
        product.tags = req.body.tags;
        product.inStock = req.body.inStock;
        product.sku = req.body.sku;
        product.sasia = req.body.sasia;

        try {
            await product.save();
            return res.status(200).send({ msg: "Product Updated", data: product, success: true });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

export const deleteProduct = async (req: any, res: any) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No product with that id.');
    }
    const deletedProduct = await Product.findByIdAndRemove(id);

    res.json({ message: 'Product deleted successfully', post: deletedProduct });
}