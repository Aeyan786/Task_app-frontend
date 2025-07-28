import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import { Loader2 } from "lucide-react";

const RecentTasks = () => {
  useGetAllTasks();

  const { allTask, taskLoading } = useSelector((store) => store.task);

  const pendingTasks = allTask.filter((task)=>task.status === "pending")


  return (
    <div className="max-w-5xl mx-auto my-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        A List of Your Pending Tasks
      </h1>

      <div className="overflow-x-auto">
        <Table className="min-w-full border rounded-md">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-sm font-semibold text-gray-600">
                Title
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-600">
                Created At
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-600">
                Due Date
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-600">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex justify-center items-center p-4 ">
                    <Loader2 className="animate-spin text-gray-500" />
                  </div>
                </TableCell>
              </TableRow>
            ) : pendingTasks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-4"
                >
                  Wohoo! There aren't any pending tasks
                </TableCell>
              </TableRow>
            ) : (
              pendingTasks.map((e, i) => (
                <TableRow key={i} className="hover:bg-gray-50 transition">
                  <TableCell className="py-3">{e.title}</TableCell>
                  <TableCell className="py-3">
                    {e.createdAt.split("T")[0] || "N/A"}
                  </TableCell>
                  <TableCell className="py-3">
                    {e.dueDate || "2025-05-06"}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge className="bg-yellow-50 text-yellow-600">
                      Pending
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentTasks;
