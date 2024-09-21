import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://schaingokul:2nCVOyttqhPe6BBp@cluster0.vq5in.mongodb.net/netflix?retryWrites=true&w=majority&appName=Cluster0';

const userSchema = new mongoose.Schema({
    username: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    isBoolean: { required: true, type: Boolean },
    date: { required: true, type: Date },
    role: { required: true, type: String }
});

const User = mongoose.model('User', userSchema);
export default User;

const productSchema = new mongoose.Schema({
    id: { required: true, type: String, unique: true },
    title: { required: true, type: String, unique: true },
    description: { required: true, type: String, unique: true },
    price: { required: true, type: Number },
    date: { required: true, type: String }
});

const Product = mongoose.model('Product', productSchema);
export {Product};


export const connect = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};



