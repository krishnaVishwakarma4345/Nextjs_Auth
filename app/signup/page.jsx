"use client"; 
import React,{useState} from 'react'   
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

function page() {
    const router = useRouter();
    const[user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const onClickHandler = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup successful:",response.data);
            router.push("/login");
        } catch (error) {
            console.log("Signup failed",error);    
        }
    }
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
        <h1>Signup</h1>
        <form className='flex flex-col justify-center items-center gap-5 text-black '>
            <input className='bg-gray-200 rounded-lg py-1 px-4' type="text" placeholder="userName" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}></input>
            <input className='bg-gray-200 rounded-lg py-1 px-4'  type="email" placeholder="Email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}></input>
            <input className='bg-gray-200 rounded-lg py-1 px-4'  type="password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}></input>
            <button className='bg-blue-500 text-white rounded-lg py-1 px-4' onClick={onClickHandler}>Signup</button>
        </form> 
        <Link href="/login">Already have an account? Login</Link>
    </div>
  )
}

export default page