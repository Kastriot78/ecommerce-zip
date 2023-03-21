import User from '../models/User';
import { getToken } from '../util';
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

export const users = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //findByCredentials() -e kemi kriju tek modeli User(e kemi bo statike qe me thirr ktu direkt)
        // const user: IUser | null = await User.methods.statics.findByCredentials(email, password);

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(`Useri me emailin ${email} nuk ekziston!`);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Fjalëkalimi gabim!");
        }

        res.status(200).send({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
            token: getToken(user),
            success: true
        });
    } catch (error) {
        if (error) {
            return res.status(400).json({ error: error.message }); //error.message - e marrim errorin qe e qet tek User.js e kom bo throw new() nese ka naj error tek metoda findByCredentials, kurse error: me kete i qasemi atje n front pra error: bon me lan qfare do
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
        return res.status(400).json({ error: `Useri me emailin ${req.body.email} ekziston` });
    }

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date().toISOString()
    });

    try {
        await user.save();
        res.send({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            success: true,
            token: getToken(user)
        })
    } catch (error) {
        if (error) {
            return res.status(400).json({
                title: "error",
                error: "Email-i ekziston.Provo një tjetër.", //atje ne fron i qasna response.data.error - error sepse ktu e kom lan emrin error: 'Email is taken..!
            });
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            return res.status(200).send({ user: user });
        } else {
            return res.status(404).send({ msg: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export const editUser = async (req: any, res: Response) => {
    const url = req.protocol + '://' + req.get('host');
    const { name, lastName, email, password } = req.body;
    // console.log(req.files['avatar']);
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            user.name = name ? name : user.name;
            user.lastName = lastName ? lastName : user.lastName;
            user.email = email ? email : user.email;
            if (req.files['avatar']) {
                user.avatar = url + '/images/' + req.files['avatar'][0].filename;
            }

            const updatedUser = await user.save();
            if (updatedUser) {
                return res.status(200).send({ msg: 'User Updated.', user: updatedUser, token: getToken(user), success: true });
            } else {
                console.log('error');
                return res.status(500).send({ msg: 'Error in Updating User.' })
            }
        }
    } catch (e) {
        console.log('e', e);
        res.send({ error: e.message });
    }
}

export const editPassword = async (req: Request, res: Response) => {
    const { password } = req.body;

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            user.password = password ? password : user.password;
        }

        const updatedUser = await user.save();
        if (updatedUser) {
            return res.status(200).send({ msg: 'User Password Updated.', user: updatedUser, success: true });
        } else {
            console.log('error');
            return res.status(500).send({ msg: 'Error in Updating User Password.' })
        }
    } catch (e) {
        console.log('error');
        res.send({ error: e.message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const deletedUser = await user.remove();
        res.status(200).send({ msg: 'Përdoruesi u fshi me sukses.', data: deletedUser });
    } else {
        res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
};