import JWT from 'jsonwebtoken';
import User from '../Model/Model.js';

 const protectionRoute = async (req, res, next) => {
    try {
        const TOKEN_KEY = "tokenkey";
        const authHeader = req.headers['authorization'];

        if(!authHeader) {
            return res.status(401).json({sucess:false, message: "Token not generated"});
        }
        const token = authHeader.split(' ')[1];

        if(!token || !authHeader.startsWith('Bearer')){
            return res.status(401).json({sucess: false, message: "Unathuarized entry"});
        }

        const decoded = JWT.verify(token, TOKEN_KEY);
        const userValid = await User.findById(decoded.payload.id);

        if(!userValid){
            return res.status(400).json({sucess:false, message: "User not found"});
        }

        req.user = { id: userValid.id, role: userValid.role };
        next();
    } catch (error) {
        res.status(401).json({sucess: false, message: "Protection route occurs an error"});
    }
};

export default protectionRoute;


