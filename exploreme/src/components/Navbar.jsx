"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  // Check if the current path is home, login, or signup
  const showButtons = pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <div className="p-4 sticky top-0 shadow-sm bg-slate-100 border-b-2 border-gray-300 z-20">
      <div className='flex justify-between mx-24'>
        <div 
          className='flex items-center gap-3 cursor-pointer'
          onClick={()=>router.push("/")}
        >
          <Image 
            className='w-8 h-8 object-contain'
            src="/learnlogo.svg"
            width={30}
            height={30}
            alt='logopng'
          />
          <h1 className='text-lg text-black font-semibold tracking-wider'>Learnr</h1>
        </div>

        {showButtons && (
          <div className='flex gap-5 items-center'>
            <Button
              className={`p-4 rounded-xl transition-all duration-500 ${
                pathname === "/login" 
                  ? "bg-blue-800 text-gray-200" 
                  : "border-blue-500 bg-transparent text-black border-2 hover:scale-x-105 hover:bg-blue-800 hover:text-gray-200"
              }`}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              className={`p-4 rounded-xl transition-all duration-500 ${
                pathname === "/signup" || pathname === "/" 
                  ? "bg-blue-800 text-gray-200" 
                  : "bg-transparent text-black border-2 border-blue-500 hover:scale-x-105 hover:bg-blue-800 hover:text-gray-200"
              }`}
              onClick={() => router.push("/signup")}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
