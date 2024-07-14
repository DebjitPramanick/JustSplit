import { useMutation, useQuery, useQueryClient } from "react-query";
import httpClient from "./client";
import { IExpense } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchFriendExpenses = (friendId: string) =>
  httpClient.get(`${API_URL}/expenses/friends/${friendId}`);

const makeRequestToFetchGroupExpenses = (groupId: string) =>
  httpClient.get(`${API_URL}/expenses/groups/${groupId}`);

const makeRequestToAddExpense = ({ payload }: { payload: Partial<IExpense> }) =>
  httpClient.post(`${API_URL}/expenses`, payload);

const useExpenseApi = ({
  friendId = "",
  groupId = "",
}: {
  friendId?: string;
  groupId?: string;
} = {}) => {
  const queryClient = useQueryClient();

  const getFriendExpensesQuery = useQuery(["friend-expenses"], () =>
    friendId ? makeRequestToFetchFriendExpenses(friendId) : null
  );

  const getGroupExpensesQuery = useQuery(["group-expenses"], () =>
    groupId ? makeRequestToFetchGroupExpenses(groupId) : null
  );

  const addExpenseMutation = useMutation(makeRequestToAddExpense, {
    onSuccess: (data) => {
      const cacheKey = data.groupId ? "group-expenses" : "friend-expenses";
      queryClient.invalidateQueries(cacheKey);
    },
  });

  return {
    addExpenseMutation,

    getFriendExpensesQuery,
    getGroupExpensesQuery,
  };
};

export default useExpenseApi;
