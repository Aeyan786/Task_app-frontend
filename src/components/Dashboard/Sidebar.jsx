import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  FileText,
  LayoutDashboard,
  Plus,
  PlusIcon,
  PlusSquareIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/Slice/authSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <SheetTitle className="hidden">Dashboard</SheetTitle>
          <SheetDescription className="sr-only">
            Sidebar navigation for task dashboard.
          </SheetDescription>
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen  w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/");
        dispatch(setUser(null))
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full px-4 py-6">
      <div className="flex justify-between items-center gap-2 mb-6 px-2">
        <Link to={"/"}>
          <span className="text-xl font-bold">Task Manager</span>
        </Link>
      </div>
      <nav>
        <NavLink
          to={"overview"}
          className={({ isActive }) =>
            isActive ? "bg-gray-100 rounded-md py-2" : ""
          }
        >
          <Button
            variant={"ghost"}
            className="cursor-pointer w-full justify-start "
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Overview
          </Button>
        </NavLink>
        <NavLink
          to={"new-task"}
          className={({ isActive }) => (isActive ? "bg-gray-100 rounded-md py-2" : "")}
        >
          <Button
            variant={"ghost"}
            className="cursor-pointer w-full justify-start "
          >
            <PlusSquareIcon className="h-5 w-5 mr-2" />
            New Task
          </Button>
        </NavLink>
        <NavLink
          to={"all-tasks"}
          className={({ isActive }) => (isActive ? "bg-gray-100 rounded-md py-2" : "")}
        >
          <Button
            variant={"ghost"}
            className="cursor-pointer w-full justify-start "
          >
            <FileText className="h-5 w-5 mr-2" />
            All Tasks
          </Button>
        </NavLink>

        <div className="my-10 text-start">
          <Button
            className="cursor-pointer "
            variant={"outline"}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </nav>
    </div>
  );
};
