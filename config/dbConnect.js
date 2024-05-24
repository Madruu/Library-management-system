import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useUnifiedTopology: true
            //useUrlParser: true
        })
    } catch(err) {
        console.log(err)
    }
}

export default connectDB;