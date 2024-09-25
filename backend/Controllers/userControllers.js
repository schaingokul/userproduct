import User,{  Product  } from '../Model/Model.js';
import bcryptjs from 'bcrypt';
import generateToken from '../utilis/generateToken.js';

export const signup = async(req,res) => {
    try {
        const {username, email, password, role, isBoolean} = req.body;
        

        if(!username || !email || !password || !role || !isBoolean){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailValid.test(email)){
            return res.status(400).json({success: false, message: "Incorrect email"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({success: false, message: "Already have an account"});
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password Should be more than 6 Character"});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const currentDate = new Date().toISOString();
        const newUser = new User({
            username, email, password:hashPassword, role, isBoolean, date: currentDate
        });
        const token = generateToken(newUser._id);
        
        await newUser.save();

        res.status(201).json({success:true, message: "User is Created", token});
        
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during signup"});
    }
};


export const login = async(req,res) => {
    try {
        const { email, password} = req.body;

        if( !email || !password){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailValid.test(email)){
            return res.status(400).json({success: false, message: "Incorrect email"});
        }

        const existingEmail = await User.findOne({email});
        if(!existingEmail){
            return res.status(400).json({success: false, message: "Create an new account"});
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password Should be more than 6 Character"});
        }
        
        const isPasswordValid = await bcryptjs.compare(password, existingEmail.password)

        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Password Incorrect"});
        }
        const token = generateToken(existingEmail._id);
        res.status(202).json({success:true, message: "User is Accepted", token});
        
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during login"});
    }
};

export const dashboard = async(req,res) => {
    try {
        const {id} = req.user;
        const allUser = await User.find();
        const product = await Product.find();
        const adminUser = await User.findById(id);
        if(adminUser.role === 'admin'){
            return res.status(202).json({sucess: true, message: "Admin can Access all user", user: allUser, role: adminUser.role ,  product});
        }else{
            return res.status(202).json({sucess: true, message: "User can View Products", product, role: adminUser.role});
        }
       
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during dashboard"});
    }
};