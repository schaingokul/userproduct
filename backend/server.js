import  express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connect} from './Model/Model.js';
import authRoute from './View/Route.js'

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', authRoute);

app.listen( PORT, () => {
    try{
        console.log(`Server Started at http://localhost:${PORT}`);
        connect();
    }catch(error){
        console.log({message: "Backend Server is not connected with MongoDB"});  
    }
});

