import { useMutation, useQuery, useQueryClient } from "react-query";
import httpClient from "./client";
import { IGroup } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchUserFriends = () =>
  httpClient.get(`${API_URL}/users/friends`);

const makeRequestToCreateGroup = ({ payload }: { payload: Partial<IGroup> }) =>
  httpClient.post(`${API_URL}/groups`, payload);

const useFriendApi = () => {
  const queryClient = useQueryClient();

  const getUserFriendsQuery = useQuery(["friend"], () =>
    makeRequestToFetchUserFriends()
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
