import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js'
const router = express.Router();

export const signin = async (req , res) => {
   const { email , password} = req.body;

   try {
       const existingUser = await User.findOne({email});

       if(!existingUser) return res.status(404).json({message: 'User doesnt exist'});

       const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);

       if(!isPasswordCorrect) return res.status(400).json({message: 'Password is incorrect'});

       const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test' , {expiresIn: '1h'}); // test : token set in env file

       res.status(200).json({result: existingUser, token});

   } catch (error) {
       res.status(500).json({message: 'Something went worng'});
   }
}

export const signup = async (req , res) => {
    const {firstname , lastname , email, password , confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});
       
        if(existingUser) return res.status(400).json({message: 'User already exist'});
       
        if(password !== confirmPassword) return res.status(400).json({message: 'Password and confirm password are not same'});

        const hashedPassword= await bcrypt.hash(password , 12);

        const result = await User.create({email , password: hashedPassword , name: `${firstname} ${lastname}`});
       
        const token = jwt.sign({ email: result.email, id: result._id}, 'test' , {expiresIn: '1h'}); // test : token set in env file

        res.status(200).json({result: result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went worng'});
    }
}

export default router;
