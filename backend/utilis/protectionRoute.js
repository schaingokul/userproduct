import JWT from 'jsonwebtoken';
import User from '../Model/Model.js';

 const protectionRoute = async (req, res, next) => {
    const TOKEN_KEY = "TOKENKEY";
    try {
        
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({sucess:false , message: "Token not generated"});
        }
        const token = authHeader.split(' ')[1];
        try{
            const decode = JWT.verify(token, TOKEN_KEY);
            const existingUser = await User.findById(decode.id);
            if(!existingUser){
                return res.status(400).json({ success: false, message: "Token is not valid" });
            }
            req.user = existingUser;
            
        }catch(error){
            return res.status(400).json({ success: false, message: "Token is not valid", error: error.message });
        }
        next();
        
    } catch (error) {
        res.status(401).json({sucess: false, message: "Protection route occurs an error"});
    }
};

export default protectionRoute;


