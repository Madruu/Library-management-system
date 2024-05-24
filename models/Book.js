import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        is_available: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        borrowedAt: {
            type: Date,
            default: null
        },
        id: {type: Number}
    }
)

export default mongoose.model('Book', bookSchema);