import client from "./client";

export const createTask = async (title) => {
  const response = await client.post("/tasks/create-task", { title });
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await client.put(`/tasks/update-task/${id}`, { data });
  return response.data;
};
export const setComplete = async (id, data) => {
  const response=  await client.put(`/tasks/complete-task/${id}`, { data });
  return response.data
};
export const displayTask = async () => {
 const response=  await client.get("/tasks/get-tasks");
 return response.data
};
export const deleteTask = async (id) => {
 const response=  await client.delete(`/tasks/delete-task/${id}`);
 return response.data
};
