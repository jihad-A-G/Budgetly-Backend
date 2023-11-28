import Goal from "../models/";
import User from "../models/userModel.js";

export const getGoals = async(req,res,next) =>{
    try{
        const goals= await Goal.findAll({include:User});
        if(goals){
            res.status(200).json({goals:goals});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'No goals found'});
    }
};

export const getGoalById = async(req,res,next) =>{
    const {id} = req.params;
    try{
        const goal = await Goal.findByPk(id,{include:User});
        if(goal){
            res.status(201).json({goal:goal});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'No goals found'});
    }
};

export const addGoal = async(req,res,next) =>{
    const {name, start_date,end_date,target_amount,userId} = req.body;
    try{
        if(req.body){
            const goal= await Goal.create({name:name,start_date:start_date,end_date:end_date,target_amount:target_amount,userId:userId});
            res.status(200).json({goal:goal,message:'Goal created successfully'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Something went wrong!'});

    }
}

export const updateGoal = async(req,res,next) =>{
    const {id} = req.params;
    try{
            await Goal.update({...req.body},{where:{id:id}});
            return res.status(200).json({message:'Goal updated successfully'});

        
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Goal not found!'});
    }
}

export const deleteGoal = async(req,res,next) =>{
    const {id} =req.params;
    try{
        if(id){
            const goal = await Goal.destroy({where:{id:id}});
            
            res.status(200).json({goal:goal,message:'goal deleted successfully'});
        }

    }catch(err){
        console.error(err);
    }
}