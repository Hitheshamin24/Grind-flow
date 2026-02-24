import client from "./client";

export const login = async (email, password) =>
  await client.post("/auth/login", { email, password });

export const register = async (name, email, password) =>
  await client.post("/auth/register", { name, email, password });
