require('dotenv').config();
const jwt = require('jsonwebtoken');

function createJWT(user){
    return jwt.sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1Hour'
    });
};

function verifyJWT(req,res,next){
    try{
        const token = req.cookies["LegitimateUser"] !== null ? req.cookies["LegitimateUser"] : "Please Register!";
        const validation = null;
        if(token !== "Please Register!"){
            validation = jwt.verify(token, process.env.SECRET_KEY);
            if(validation){
                req.authenticated = true;
                next();
            } else {
                res.status(400).json({err: "Please Register!"})
            }
        } else {
            res.status(400).json({err: "Please Register!"})
        }
    } catch(error){
        res.status(400).json({err: error.message})
    }
};

module.exports = {createJWT, verifyJWT};