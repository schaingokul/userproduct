import express from 'express';
import {signup, login, dashboard} from '../Controllers/userControllers.js';
import protectionRoute from '../utilis/protectionRoute.js';

const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);
route.get('/in', protectionRoute, dashboard);


export default route;

