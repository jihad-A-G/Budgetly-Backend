import Company from "../models/company.js";

export const addCompany = async (req,res,next) =>{
    const {company_name,description,profit} = req.body;
    try{
        if(req.body){
            await Company.create({company_name:company_name, description:description, profit:profit});
            return res.status(200).json({message:`Company created successfully!`})
        }
        res.status(400).json({message:'something went wrong'})


    }catch(err){
        console.error(err);
    }

}
export const updateCompany = async (req,res,next) =>{
    try{
        if(req.body){
            const company=await Company.update({...req.body},{where:{company_name:'Codi tech'}});
            return res.status(200).json({message:`Company updated successfully!`,company});
        }
        res.status(400).json({message:'something went wrong'})

    }catch(err){console.error(err);}

}