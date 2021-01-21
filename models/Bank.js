import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        unique: true
    },
    EUR: {
        currency:{
            type: String
        },
        buy: {
            type: Number
        },
        sell: {
            type: Number
        }
    }
}, {timestamps: true});

export default mongoose.model('Bank', bankSchema);