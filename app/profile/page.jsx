"use client"

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response =await axios.get("/api/users/logout");
       router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error); 
    }
  }
  return (
    <div>profile
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default page