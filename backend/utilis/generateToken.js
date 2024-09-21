import JWT from 'jsonwebtoken';

const generateToken = (user) => {
    const TOKEN_KEY = "tokenkey";
        const {id, role} = user;
         return JWT.sign({payload: {id, role}}, TOKEN_KEY, {expiresIn: "1d"});
};

export default generateToken;



