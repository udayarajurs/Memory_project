import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async (req , res) => {
   const { email , password} = req.body;

   try {
       const existingUser = await User.findOne({email});

       if(!existingUser) return res.status(400).json({message: 'User doesnt exist'});

       const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);

       if(!isPasswordCorrect) return res.status(400).json({message: 'Password is incorrect'});

       const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test' , {expiresIn: '1h'}); // test : token set in env file

       res.status(200).json({result: existingUser, token});

   } catch (error) {
       res.status(500).json({message: 'Something went worng'});
   }
}

export const signup = async (req , res) => {

}
