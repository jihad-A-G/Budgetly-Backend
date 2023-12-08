// import jwt  from "jsonwebtoken";

// const verfiyToken = async (req,res,next) =>{
//     const token = req.headers['authorization'];
//     if(!token){
//         return res.status(403).json({message:'token not found!'});
//     }

//     jwt.verify(token.split(' ')[1],'cat in the box',(err,decoded)=>{
//         if(err){
//             return res.status(403).json({message:'authentication failed, please try to login'})
//         }
//         req.user=decoded.user;
//         next();
//     })
// }

// export default verfiyToken;