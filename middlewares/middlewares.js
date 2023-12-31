import jwt from 'jsonwebtoken'


export const middlewarefunc = (req, res, next)=>{
    try{
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(404).jsob("denied: because you are not authenticake, token missing")
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY,(err, user)=>{
            if(err){
                return res.status(403).json("you are not authorized")
            }
            req.user = user;
            next()
        })
    }
    catch(error){
        res.status(500).json("inrenal server error")
    }


}