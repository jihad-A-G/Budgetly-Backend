import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const getUsers = async(req,res,next) =>{
    try{
        const users= await User.findAll();
        if(users){
            return res.status(200).json({users:users});
        }
        res.status(400).json({message:'Users not found'});

    }catch(err){console.error(err);}
};

export const getUserById =async (req,res, next) =>{
    const {id:userId} = req.params;
    try{
        const user= await User.findByPk(userId);
        if(user){
            return res.status(200).json({user:user});
        }
        res.status(400).json({message:'User not found'});

    }catch(err){console.error(err);}
    
};

export const addUser = async (req,res,next) => {
    const {username,email,password,role} = req.body;
    try{
        if(req.body){
            const hashedPassword = await bcrypt.hash(password,12);
            const user = await User.create({username:username,email:email,password:hashedPassword,role:role});
            return res.status(200).json({user:user,message:'User created successfully'});
        }
        res.status(400).json({message:'Something went wrong'});
    }catch(err){console.error(err);}

};

export const deleteUser = async (req,res, next)=>{
     const {id:userId} = req.params;
    try{
if(userId){
    await User.destroy({where:{id:userId}});
    return res.status(200).json({message:'user deleted successfully'});
}
        res.status(400).json({message:'User not found'});

    }catch(err){console.error(err);};
    
};