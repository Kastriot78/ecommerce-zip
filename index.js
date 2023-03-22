import express from 'express';
import mongoose from 'mongoose';
// routes
import categoryRoutes from './routes/categoryRoutes';
import contactRoutes from './routes/contactRoutes';
import subscribeRoutes from './routes/subscribeRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import colorRoutes from './routes/colorRoutes';
import orderRoutes from './routes/orderRoutes';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
    CORS_DOMAINS
} from './config';
const app = express();
const port = process.env.PORT || 5000;

const domainsFromEnv = CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/categories', categoryRoutes);
app.use('/contacts', contactRoutes);
app.use('/subscribers', subscribeRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/colors', colorRoutes);
app.use('/orders', orderRoutes);

// mongoose.connect('mongodb://localhost/ecommerce');
mongoose.connect('mongodb+srv://Kastriot:fU4BERd8D2s3ufqi@cluster-shop.qmsbd0e.mongodb.net/?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APP.');
});

app.use("/images", express.static("images"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express API
module.exports = app;
