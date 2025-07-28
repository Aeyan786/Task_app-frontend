import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TASK_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetSingleTask from "@/hooks/useGetSingleTask";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/Redux/Slice/authSlice";

const EditTask = () => {
  const { id } = useParams();

  useGetSingleTask(id);

  const { singleTask } = useSelector((store) => store.task);
  const { loading } = -useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (singleTask) {
      setEditTask({
        title: singleTask.title || "",
        description: singleTask.description || "",
        dueDate: singleTask.dueDate ? singleTask.dueDate.split("T")[0] : "",
      });
    }
  }, [singleTask]);

  const handleTaskSumbit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${TASK_END_POINT}/update/${id}`,
        editTask,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/dashboard/all-tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!singleTask) {
    return (
      <div className="flex justify-center mt-20 text-gray-500 text-sm">
        <Loader2 className="animate animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Edit Task</h1>

      <form onSubmit={handleTaskSumbit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">
            Title
          </Label>
          <Input
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            id="title"
            placeholder="Enter task title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">
            Description
          </Label>
          <Textarea
            value={editTask.description}
            onChange={(e) =>
              setEditTask({ ...editTask, description: e.target.value })
            }
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
            value={editTask.dueDate}
            onChange={(e) =>
              setEditTask({ ...editTask, dueDate: e.target.value })
            }
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
            {loading ? "Please wait" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
