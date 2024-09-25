import JWT from 'jsonwebtoken';

const generateToken = (user) => {
    const TOKEN_KEY = "TOKENKEY";
        const {id} = user;
         return JWT.sign({id}, TOKEN_KEY, {expiresIn: "1d"});
};

export default generateToken;



