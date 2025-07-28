import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_END_POINT } from "@/lib/Endpoint";
import { setLoading } from "@/Redux/Slice/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const { loading } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_END_POINT}/register`, input, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-1 block">
              Full Name
            </Label>
            <Input
              onChange={(e) => {
                setInput({ ...input, fullName: e.target.value });
              }}
              id="name"
              type="text"
              placeholder="john Doe"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-1 block">
              Email
            </Label>
            <Input
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
              id="email"
              type="email"
              placeholder="john@gmail.com"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="mb-1 block">
              Password
            </Label>

            <Input
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
              id="password"
              type="password"
              placeholder="xyz123!"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 cursor-pointer bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Please wait" : "Signup"}
          </Button>
          <a
            className="text-xs mt-6 hover:underline text-blue-600"
            href="/login"
          >
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
