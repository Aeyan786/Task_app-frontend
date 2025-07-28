import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const {user} = useSelector((store)=>store.user)

    const naviagate = useNavigate()

  return (
    <div>
      <header className="shadow-md bg-white rounded-b-2xl">
        <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-b-xl">
          <h1 className="sm:text-2xl text-xl font-semibold tracking-wide">
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            {
              user === null?(
                <>
                <Button
            onClick={()=>{
                naviagate("/login")
            }}
              className="bg-white cursor-pointer text-indigo-600 hover:bg-gray-100 font-medium border border-white"
            >
              Login
            </Button>
            <Button
            onClick={()=>{
                naviagate("/signup")
            }}
            className="bg-white cursor-pointer text-indigo-600 hover:bg-gray-100 font-medium border border-white">
              Signup
            </Button>
                </>
              ):(
            <Button
            onClick={()=>{
                naviagate("/dashboard/overview")
            }}
            className="bg-white cursor-pointer text-indigo-600 hover:bg-gray-100 font-medium border border-white">
              Dashboard
            </Button>              )
            }
          </div>
        </div>
      </header>

      <section className="flex flex-wrap-reverse justify-around max-w-5xl mx-auto px-3 items-center my-10">
        <div className="text-center">
          <h1 className="sm:text-3xl text-xl  font-bold mb-2">Your Daily Task Manager</h1>
          <p className="text-sm sm:text-md text-muted-foreground">
            Organize, track, and manage your tasks effortlessly.
            <br />
            Stay focused and boost your productivity every day.
          </p>
          <Button
          onClick={()=>{
                naviagate(user? "/dashboard/overview":"/login")
            }}
          className="mt-5 cursor-pointer bg-indigo-500 hover:bg-indigo-800" >Get Started</Button>
        </div>
        <div>
            <img width={400} src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_52683-39659.jpg?semt=ais_hybrid&w=740" alt="" />
        </div>
      </section>
    </div>
  );
};

export default Home;
