"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/app/services/api_services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      const response = await loginUser(email, password);
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <form className="flex justify-center min-h-full flex-col space-y-4 bg-slate-50 p-14 rounded-3xl w-[600px] shadow-lg relative">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label>Email</Label>
            <Input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              required
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="Enter your password"
              required
              className="rounded-xl h-12"
            />
          </div>
        </div>
        <div className="flex items-center justify-around">
          <p className="flex items-center gap-2 text-sm">
            <Checkbox /> Remember me?
          </p>
          <p className="text-blue-800 text-sm hover:text-black underline cursor-pointer">
            Forgot password?
          </p>
        </div>
        <div className="py-3">
          <Button
            className="bg-blue-500 p-5 text-base rounded-xl w-full hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500"
            type="submit"
            onClick={onSubmitHandler}
          >
            Login
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-black text-sm">Don't have an account?</p>
          <p
            className="text-blue-800 hover:text-black underline cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            signup
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-1/3 h-px bg-gray-300"></div>
          <span className="text-gray-400 font-medium">or</span>
          <div className="w-1/3 h-px bg-gray-300"></div>
        </div>
        <div>
          <Button
            className="p-5 text-base rounded-xl w-full hover:scale-x-105 hover:text-gray-200 transition-all duration-500 flex items-center gap-3"
            type="submit"
          >
            Login with Google <FcGoogle className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
