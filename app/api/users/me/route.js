import getDataFromToken from "@/helpers/getDataFromToken.js";
import { NextResponse , NextRequest} from "next/server";


import User from "@/models/userModel";
import {connect} from "@/app/dbConfig/dbConfig.js";


connect();

export async function GET(request){
        console.log("GET request received at me");
    try {
        const userId = await getDataFromToken(request);   
        const user = await User.findOne({_id :userId}).select("-password");
        return NextResponse.json({
            message: "User data fetched successfully",
            data: user
        })   
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch user data"}, {status: 500});    
    }

}