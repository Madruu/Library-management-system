import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fineSchema = new Schema({
    bookTitle: {
        type: String
    },
    fine: {
        type: Number,
        required: true
    }
}, { _id: false })

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    num_matricula: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    borrowedBooks: {
        type: Array,
    },
    fines: [fineSchema]
})

export default mongoose.model('User', userSchema);