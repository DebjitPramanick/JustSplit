import httpClient from "./client";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchUserGroups = (userId: string) =>
  httpClient.get(`${API_URL}/groups/users/${userId}`);
