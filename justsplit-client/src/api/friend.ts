import httpClient from "./client";
import { IGroup } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchUserFriends = () =>
  httpClient.get(`${API_URL}/users/friends`);

export const createGroup = ({ payload }: { payload: Partial<IGroup> }) =>
  httpClient.post(`${API_URL}/groups`, payload);
