import Jwt from 'jsonwebtoken';
import bCrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Users from '../models/users.js';
import dotenv from "dotenv";

dotenv.config()


//@desc Register new user
//@route POST/api/users
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error('Please Add All Fields');
    }

    //Check if the user exists
    const userExists = await Users.findOne({where:{ email:email} })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bCrypt.genSalt(10)
    const hashedPassword = await bCrypt.hash(password, salt)

    //Create user
    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//@desc Authenticate a user
//@route POST/api/login
//@access Public

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for user email
    const user = await Users.findOne({where:{ email:email} })

    if (user && (await bCrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')


    }
})


//@desc GET user data
//@route GET/api/users/me
//@access Public

export const getUser = asyncHandler(async (req, res) => {
    res.json({ message: 'User Data Display' });
})


//Generate JWT
const generateToken = (id) => {
    return Jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}