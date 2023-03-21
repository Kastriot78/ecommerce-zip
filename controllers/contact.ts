import Contact from '../models/Contact';
import { Request, Response } from "express";


const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find().sort({ _id: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createContact = async (req: Request, res: Response) => { 
    const newContact = new Contact({ 
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        subject: req.body.subject,
        message: req.body.message,
        createdAt: new Date().toISOString()
    });
    try {
        await newContact.save();
        res.status(200).json({ newContact: newContact, success: true });
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteContact = async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).send('No contact with that id.');
    }
    const deletedContact = await Contact.findByIdAndRemove(id);

    res.json({ message: 'Contact deleted successfully', post: deletedContact });
}

export { getContacts, createContact, deleteContact };