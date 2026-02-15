"use client"

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const getUsername = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUsername(response.data.data.username);
    } catch (error) {
      console.error("Failed to get username:", error);
    }
  }
  const logout = async () => {
    try {
      const response =await axios.get("/api/users/logout");
       router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error); 
    }
  }
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-5 '>profile
      <button className='bg-red-500 text-white p-2 rounded-md ' onClick={logout}>Logout</button>
      <button className='bg-green-500 text-white p-2 rounded-md ' onClick={getUsername}>Get Username</button>
      <p className='text-xl font-semibold bg-blue-500 text-white px-4 py-2 rounded-lg'> {username}</p>
    </div>
  )
}

export default page