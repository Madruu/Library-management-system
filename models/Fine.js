import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fineSchema = new Schema({
    bookId: {
        type: String,
        required: true
    },
    fine: {
        type: Number,
        required: true
    }
})
export default mongoose.model('Fine', fineSchema);