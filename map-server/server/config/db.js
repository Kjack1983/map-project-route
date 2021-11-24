import mongoose from 'mongoose';
import "babel-polyfill";

const connectDb = async () => {
    try {
        // process.env.DATABASE local CONNECTION.
        const conn = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongodb Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDb;