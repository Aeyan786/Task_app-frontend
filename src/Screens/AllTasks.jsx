import AllTasksCard from "@/components/Tasks/AllTasksCard";
import { Input } from "@/components/ui/input";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import { setSearch } from "@/Redux/Slice/taskSlice";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllTasks = () => {
  useGetAllTasks();

  const dispatch = useDispatch();
  const { allTask, taskLoading, search } = useSelector((store) => store.task);

  const filteredTask = allTask.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(filteredTask.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = filteredTask.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 p-5">All Tasks</h1>
      <div className="w-42 mb-5">
        <Input
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            setCurrentPage(1);
          }}
          placeholder="Search by Title"
        />
      </div>

      {taskLoading ? (
        <div className="flex justify-center my-20 text-muted-foreground text-sm animate">
          <Loader2 className="animate-spin" />
        </div>
      ) : filteredTask.length === 0 ? (
        <div className="text-center my-20 text-sm items-center">
          <span className="text-muted-foreground">
            Create a new Task to track your daily progress
          </span>
        </div>
      ) : (
        <>
          {paginatedTasks.map((e, i) => (
            <AllTasksCard key={i} taskData={e} />
          ))}

          <div className="flex justify-center items-center gap-4 my-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTasks;
