import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const TaskNotification = () => {
  const { allTask } = useSelector((store) => store.task);

  useEffect(() => {
    const date = new Date();

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const dueDate = allTask.filter((task) => {
      return task.dueDate.split("T")[0] === formattedDate;
    });
    console.log(dueDate);
    const status = dueDate.map((task) => task.status);

    if (dueDate.length > 0 && status == "pending") {
      toast.info(`you have ${dueDate.length} task(s) due soon!`);
    }
  }, [allTask]);

  return null;
};

export default TaskNotification;
