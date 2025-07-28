import { TASK_END_POINT } from "@/lib/Endpoint";
import { setAllTask, setTaskLoading } from "@/Redux/Slice/taskSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllTasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllTasks = async () => {
      try {
          dispatch(setTaskLoading(true))
        const response = await axios.get(`${TASK_END_POINT}/gettask`, {
          withCredentials: true,
        });
        if (response.status === 200) {
            dispatch(setAllTask(response.data.allTasks));
        }
      } catch (error) {
        console.log(error);
      }finally{
          dispatch(setTaskLoading(false))

      }
    };
    getAllTasks();
  }, [dispatch]);
};

export default useGetAllTasks;
