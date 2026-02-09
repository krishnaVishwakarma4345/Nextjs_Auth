import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request){
    const reqBody = await request.json();
    const {email,password} = reqBody;

    const user =await User.findOne({email});
    if(!user){
        return NextResponse.json({error: "Invalid email or password"}, {status: 400});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return NextResponse.json({error: "Invalid email or password"}, {status: 400});
    }

    const response = NextResponse.json({
        message: "Login successful",
        success:true,
        user
    });

    //token data
    const tokenData ={
        id: user._id,
        email: user.email,
        username: user.username,
    }
    //generate token
    const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn: "1d"});

    //set token in cookie
    response.cookies.set("token",token,{httpOnly:true , path:"/" });
    return response;


}

