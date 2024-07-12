import { useMutation, useQuery, useQueryClient } from "react-query";
import httpClient from "./client";
import { IGroup } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchUserFriends = (userId: string) =>
  httpClient.get(`${API_URL}/users/${userId}/friends`);

const makeRequestToCreateGroup = ({ payload }: { payload: Partial<IGroup> }) =>
  httpClient.post(`${API_URL}/groups`, payload);

const useFriendApi = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  const getUserFriendsQuery = useQuery(["friend"], () =>
    makeRequestToFetchUserFriends(userId)
  );

  const createGroupMutation = useMutation(makeRequestToCreateGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("group");
    },
  });

  const updateGroupMutation = useMutation(makeRequestToCreateGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("group");
    },
  });

  const deleteGroupMutation = useMutation(makeRequestToCreateGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("group");
    },
  });

  return {
    createGroupMutation,
    updateGroupMutation,
    deleteGroupMutation,

    getUserFriendsQuery,
  };
};

export default useFriendApi;
