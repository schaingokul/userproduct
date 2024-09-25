import  express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connect} from './Model/Model.js';
import authRoute from './View/Route.js';
// import JWT from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', authRoute);
/* comments
app.post('/' , async (req, res) => {
    try {
        const { data } = req.body;
        const newData = new Data({ data });
        await newData.save();
        
        const token = JWT.sign({ id: newData._id }, "TOKEN", { expiresIn: "1d" });
        
        res.status(201).json({ success: true, message: "Stored in DB", token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
});

app.get('/auth', async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ success: false, message: "Token is not provided" });
    }
  
    const token = authHeader.split(' ')[1];

    try {
        const decode = JWT.verify(token, "TOKEN");
        const existingData = await Data.findById(decode.id); 

        if (!existingData) {
        return res.status(400).json({ success: false, message: "Token is not valid" });
        }

        return res.status(200).json({ success: true, message: "Secure Data", data: existingData });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Token is not valid", error: error.message });
    }
  });
  */

app.listen( PORT, () => {
    try{
        console.log(`Server Started at http://localhost:${PORT}`);
        connect();
    }catch(error){
        console.log({message: "Backend Server is not connected with MongoDB"});  
    }
});

