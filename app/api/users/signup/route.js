import {connect} from '@/app/dbConfig/dbConfig.js';
import User from '@/models/userModel.js';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';


connect();

export async function POST(request) {
    try {
        const reqBody =await request.json();
        const {username,email,password} = reqBody;    
        //check if user already exists
        const user = await User.findOne({email});
        if(user){
            console.log("User already exists with email:",email);
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser =  await newUser.save();
        
        return NextResponse.json({
            message: "User created successfully",
            success:true,
            savedUser
    });
    } catch (error) {
        console.error("Signup API crashed ❌:", error);
        return NextResponse.json({error: error.message}, {status: 500});    
    }
}