import httpClient from "./client";
import { IExpense } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchFriendExpenses = async (friendId: string) =>
  httpClient.get(`${API_URL}/expenses/friends/${friendId}`);

export const fetchGroupExpenses = async (groupId: string) =>
  httpClient.get(`${API_URL}/expenses/groups/${groupId}`);

export const addExpense = async ({ payload }: { payload: Partial<IExpense> }) =>
  httpClient.post(`${API_URL}/expenses`, payload);
