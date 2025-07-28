import { TASK_END_POINT } from "@/lib/Endpoint";
import { setSingleTask } from "@/Redux/Slice/taskSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleTask = (taskId) => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(
          `${TASK_END_POINT}/getsingletask/${taskId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          dispatch(setSingleTask(response.data.singleTask));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleTask()
  }, [taskId]);
};

export default useGetSingleTask;
