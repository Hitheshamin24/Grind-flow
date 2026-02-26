import { useState, useEffect } from "react";

import {
  updateTask,
  setComplete,
  deleteTask,
  createTask,
  displayTask,
} from "../api/task";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async () => {
    if (title) {
      await createTask(title);

      setTitle("");
      fetchTask();
    }
  };
  const fetchTask = async () => {
    try {
      const data = await displayTask();
      if (data && data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      }
    } catch (e) {
      console.error("failed fetch error", e.message);
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  ">
      <div>
        <input
          type="text border p-5 "
          placeholder="Enter you task here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          className="bg-cyan-600 py-2 px-4 rounded-md "
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((b) => (
          <div key={b._id}>{b.title}</div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
