import httpClient from "./client";
import { IUser } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const signupUser = ({ payload }: { payload: Partial<IUser> }) =>
  httpClient.post(`${API_URL}/signup`, payload);

export const loginUser = ({ payload }: { payload: Partial<IUser> }) =>
  httpClient.post(`${API_URL}/login`, payload);

export const logoutUser = ({ payload = {} }: { payload?: object }) =>
  httpClient.post(`${API_URL}/logout`, payload);

export const fetchUser = () => httpClient.get(`${API_URL}/users`);

export const fetchUsersByGroupId = (groupId: string) =>
  httpClient.get(`${API_URL}/users/groups/${groupId}`);
