import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import currencyRoutes from './routes/currencyRoutes.js';
import * as path from "path";

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.js'));
    });
}