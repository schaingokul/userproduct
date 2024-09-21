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
        const token = generateToken(newUser);
        
        await newUser.save();

        res.status(201).json({success:true, message: "User is Created", token, newUser});
        
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during signup"});
    }
};


export const login = async(req,res) => {
    try {
        const { email, password, role} = req.body;

        if( !email || !password || !role){
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
        const token = generateToken(existingEmail);
        res.status(201).json({success:true, message: "User is Created", token});
        
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during login"});
    }
};

export const dashboard = async(req,res) => {
    try {
        const userId = req.user.id;
        const userRole = req.params;

        const userVerify = await User.findById(userId);

        if(!userVerify) {
            return res.status(404).json({success: true, message: "User not found"})
        }

        if(userVerify && userVerify.role === userRole ){
            if(userRole ==="admin") {
                const product = await Product.find();
                return res.status(200).json({success: true, message: "Admin user can View all the User & product details", user: userVerify, product});
            }
            if(userRole ==='user'){
                const product = await Product.find();
                return res.status(200).json({success: true, message: "user can View all the Product details",product });
            }
        }else {
            return res.status(401).json({success: false, message: "user role not match"});
        }
       
    } catch (error) {
        return res.status(500).json({success: false, message: "An error occurred during dashboard"});
    }
};