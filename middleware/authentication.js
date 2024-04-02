import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({success:false,message: 'No token, authorization denied'});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({success:false,message: 'Token verification failed, authorization denied'});
        }
        req.user = verified.id;
        next();
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message: 'Internal Server Error'});
    }
}