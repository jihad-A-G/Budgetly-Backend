import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendgrid from '@sendgrid/mail';
import Admin from "../models/adminModel.js";
import io from "../server.js";
dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const userSignUp = async (req,res,next) =>{
const {username,email,password} = req.body;
try{
    let user= await User.findOne({where:{[Op.or]: [{ username: username }, { email: email }], }});
    if(user){
        return res.status(400).json({message:'User already exist'});
    }

    const hashedPassword= await bcrypt.hash(password,12);
    user=await User.create({username:username,email:email,password:hashedPassword,compId:1});
    io.to('adminRoom').emit('confirmUser',user);
    res.status(200).json({user:user,message:'User signup wating to confirm'});

}catch(err){console.error(err);}
}
export const userLogin = async (req,res,next) =>{
    const {username,password}= req.body;
    let loggedInUser;
    try{
        const user= await User.findOne({where:{username:username}});
        if(user){
            loggedInUser=user;
        }
        else{
            const admin = await Admin.findOne({where:{username:username}});
            if(admin){
                loggedInUser=admin;
            }else{
                return res.status(404).json({message:'User not found'});
            }
        }
        const match = await bcrypt.compare(password,loggedInUser.password);
        if(!match){
            return res.status(400).json({message:'Invalid username or password'});
        }
        
        const token = jwt.sign({user:loggedInUser},'cat in the box',{expiresIn:'1d'});

       return res.status(200).json({token:token,user:loggedInUser,message:'logged in!'});
    
  
    }catch(err){console.error(err);}
}

export const requestResetPassword = async(req,res,next) =>{
    const {email} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const token = jwt.sign({data:'reset password', exp:Date().now +360000},'JAG1000');
        await sendgrid.send({
            to:`${email}`,
            from:'jihadabdlghani73@gmail.com',
            subject:'Reset Password',
            html:`
            <p>Please click on this <a href='http://localhost:3000/api/auth/resetPassword/${token}'>Link</a> to reset your password.</p>
            `
        });
        res.status(200).json({message:'Email Sent'});
    }catch(err){console.error(err);}
}

export const resetPassword = async(req,res,next) =>{
    const {token,userId} =req.params;
    const {password} = req.body;
    try{ 
            if(jwt.verify(token,'JAG1000') && password){
        const hashedPassword= await bcrypt.hash(password,12);
        const user = await User.update({password:hashedPassword},{where:{id:userId}});
        return res.status(200).json({user:user,message:'Password cahnged successfully!'});
    }
    res.status(400).json({message:'Token is not valid, request new one!'});
}catch(err){console.error(err);}

}