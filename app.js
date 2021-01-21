import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import currencyRoutes from './routes/currencyRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use('/api/currencies', currencyRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>
    app.listen(PORT, () => {
        console.log(`server started on ${PORT}...`)
    }))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    });

