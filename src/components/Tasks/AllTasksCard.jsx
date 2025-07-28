import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "axios";
import { TASK_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AllTasksCard = ({ taskData }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState();

  const handleStatus = async (id) => {
    const status = "completed";
    try {
      const response = await axios.post(
        `${TASK_END_POINT}/updatestatus/${id}`,
        { status },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/dashboard/overview");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${TASK_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/dashboard/overview");

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 px-2 sm:px-6">
      <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl capitalize font-semibold text-gray-800">
                {taskData.title}
              </h2>
              <Badge
                className={`capitalize text-xs ${
                  taskData.status === "completed"
                    ? "text-green-700 bg-green-100"
                    : "text-yellow-700 bg-yellow-100"
                }`}
              >
                {taskData.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Due: {taskData.dueDate}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={taskData.status === "completed"}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <Button
                    onClick={() => {
                      handleStatus(taskData._id);
                    }}
                    className="cursor-pointer"
                    variant="ghost"
                  >
                    Completed
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigate(`/dashboard/edit-task/${taskData._id}`);
              }}
              disabled={taskData.status === "completed"}
              className="flex cursor-pointer items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                handleDelete(taskData._id);
              }}
              className="flex cursor-pointer items-center gap-1"
            >
              {loading ? (
                <Loader2 className="animate animate-spin w-5 h-5" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 border-t pt-4 text-sm text-gray-600 animate-slide-down">
            <p className="mb-3"> {taskData.description}</p>
            <span className="font-medium">
              created by {taskData.userId?.fullName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasksCard;
