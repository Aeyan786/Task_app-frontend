import RecentTasks from "@/components/Tasks/RecentTasks";
import TaskNotification from "@/components/Tasks/TaskNotification";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import { File, ListTodo, SquareCheckBig } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Overview = () => {
  useGetAllTasks();
  const { allTask } = useSelector((store) => store.task);
  const completedTask = allTask.filter((task) => task.status === "completed");
  const pendingTask = allTask.filter((task) => task.status === "pending");

  return (
    <>
    <TaskNotification/>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-8 ">
        <div className="flex justify-between shadow-md p-5 rounded-xl">
          <div>
            <h1 className="font-medium text-lg ">Total Tasks</h1>
            <p className="text-xs mb-5 text-muted-foreground">
              Tasks you have created
            </p>
            <span className="text-2xl font-bold">{allTask.length}</span>
          </div>
          <div>
            <File />
          </div>
        </div>
        <div className="flex justify-between shadow-md p-5 rounded-xl">
          <div>
            <h1 className="font-medium text-lg ">Completed</h1>
            <p className="text-xs mb-5 text-muted-foreground">
              Tasks you have completed
            </p>

            <span className="text-2xl font-bold">{completedTask.length}</span>
          </div>
          <div>
            <SquareCheckBig />
          </div>
        </div>
        <div className="flex justify-between shadow-md p-5 rounded-xl">
          <div>
            <h1 className="font-medium text-lg ">Pending</h1>
            <p className="text-xs mb-5 text-muted-foreground">
              Tasks you have pending
            </p>

            <span className="text-2xl font-bold">{pendingTask.length}</span>
          </div>
          <div>
            <ListTodo />
          </div>
        </div>
      </div>
      <RecentTasks />
    </>
  );
};

export default Overview;
