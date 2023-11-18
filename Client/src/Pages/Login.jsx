import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [loginData,SetLoginData] = useState({
    email:"",
    password:"",
  });

  function handleUserInput(e){
    const {name,value} = e.target;
    SetLoginData({
        ...loginData,
        [name]: value
    })
  }


  async function onLogin(event){
    event.preventDefault();
    if(!loginData.email || !loginData.password){
        toast.error("Please fill all the details! ");
        return;
    }

    const response= await dispatch(login(loginData));
    if(response?.payload?.success){   
      navigate("/");
    }

    

    SetLoginData({
        email:"",
        password:""
    });
  }


  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh] p-1">
        <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-2xl">
          <h2 className="text-xl text-center font-bold">Want to Login here? </h2>

          <div className=" flex flex-col gap-1">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              className="bg-transparent px-2 py-1  text-[#FF6A3D]"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="email" className=" font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your Password"
              autoComplete="password"
              className="bg-transparent px-2 py-1  text-[#FF6A3D]"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            className=" bg-slate-600 p-2 rounded-sm hover:bg-slate-500 hover:text-[#FF6A3D] mt-2"
            type="submit"
          >
            Log in
          </button>

          <p className="text-center mt-1">
            Don't have any account?{" "}
            <Link to="/signup" className=" cursor-pointer text-[#FF6A3D]">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;

