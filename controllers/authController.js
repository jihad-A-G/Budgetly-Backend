import User from "../models/userModel.js";
import bcrypt, { hash } from 'bcrypt';
import { Op } from "sequelize";

export const userSignUp = async (req,res,next) =>{
const {username,email,password} = req.body;
try{
    let user= await User.findOne({where:{[Op.or]: [{ username: username }, { email: email }], }});
    if(user){
        return res.status(400).json({message:'User already exist'});
    }

    const hashedPassword= await bcrypt.hash(password,12);
    user=await User.create({username:username,email:email,password:hashedPassword});
    res.status(200).json({user:user,message:'User signup successfully'});

}catch(err){console.error(err);}
}
export const userLogin = async (req,res,next) =>{
    const {username,password}= req.body;
    try{
        const user= await User.findOne({where:{username:username}});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(404).json({message:'Invalid username or password'});
        }
        req.session.isLoggedIn=true;
        req.session.user=user;
        await req.session.save();
        res.status(200).json({message:'logged in!'});
    }catch(err){console.error(err);}
}
