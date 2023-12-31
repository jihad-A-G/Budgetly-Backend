import Admin from "../models/adminModel.js";
import Company from "../models/companyModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.status(200).json({ users: users });
    }
    res.status(400).json({ message: "Users not found" });
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findByPk(userId, { include: Company });
    if (user) {
      return res.status(200).json({ user: user });
    }
    res.status(400).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async (req, res, next) => {
  const { username, email, password} = req.body;
  try {
    if (req.body) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        compId: 1,
      });
      return res
        .status(200)
        .json({ user: user, message: "User created successfully" });
    }
    res.status(400).json({ message: "Something went wrong" });
  } catch (err) {
    console.error(err);
  }
};
export const updateUser = async(req,res,next) =>{
  const {id}= req.params;
  try{
    if(id){
      const user = await User.update({...req.body},{where:{
        id:id
      }});
      return res.status(200).json({message:'user updated successfully'});
    }
    res.status(500).json({message:'something went wrong'});

  }catch(err){
    console.log(err);
  }
}

export const deleteUser = async (req,res, next)=>{
     const {id:userId} = req.params;
    try{
if(userId){
    await User.destroy({where:{id:userId}});
    return res.status(200).json({message:'user deleted successfully'});
}
        res.status(400).json({message:'User not found'});

    }catch(err){console.error(err);};
}

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.findAll();
    if (!admins) {
      return res.status(400).json({ message: "Admins not found" });
    }
    res.status(200).json({ admins: admins });
  } catch (err) {
    console.error(err);
  }
};
export const getAdminById = async (req, res, next) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.findByPk(adminId, { include: Company });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res.status(200).json({ admin: admin });
  } catch (err) {
    console.error(err);
  }
};

export const addAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (req.body) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const admin = await Admin.create({
        username: username,
        email: email,
        password: hashedPassword,
        compId: 1,
      });
      return res
        .status(200)
        .json({ admin: admin, message: "Admin created successfully" });
    }
    res.status(400).json({ message: "Something went wrong!" });
  } catch (err) {
    console.error(err);
  }
};

export const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.destroy({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res
      .status(200)
      .json({ admin: admin, message: "admin deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const updateUserProfileImg = async (req, res, next) => {
  const image = req.file;
  const { id } = req.params;
  try {
    if (image) {
      await User.update({ user_img: image.path }, { where: { id: id } });
      return res.status(200).json({ message: "image updated succesfully" });
    }
    res.status(500).json({ message: "image not found" });
  } catch (err) {
    console.error(err);
  }
};

export const updateAdminProfileImg = async (req, res, next) => {
  const image = req.file;
  const { id } = req.params;
  try {
    if (image) {
      await Admin.update({ admin_img: image.path }, { where: { id: id } });
      return res.status(200).json({ message: "image updated succesfully" });
    }
    res.status(500).json({ message: "image not found" });
  } catch (err) {
    console.error(err);
  }
};
