import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { TASK_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllTask } from "@/Redux/Slice/taskSlice";
import { setLoading } from "@/Redux/Slice/authSlice";

const NewTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  const { loading } = -useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleTaskSumbit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${TASK_END_POINT}/create`, task, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/dashboard/overview");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Task
      </h1>

      <form onSubmit={handleTaskSumbit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">
            Title
          </Label>
          <Input
            onChange={(e) => {
              setTask({ ...task, title: e.target.value });
            }}
            id="title"
            placeholder="Enter task title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">
            Description
          </Label>
          <Textarea
            onChange={(e) => {
              setTask({ ...task, description: e.target.value });
            }}
            id="description"
            placeholder="Write task details..."
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date" className="text-base">
            Due Date
          </Label>
          <Input
            onChange={(e) => {
              setTask({ ...task, dueDate: e.target.value });
            }}
            id="due-date"
            type="date"
          />
        </div>

        <div className="text-right">
          <Button
            disabled={loading}
            type="submit"
            className="mt-4 cursor-pointer"
          >
            {loading ? "Please wait" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
