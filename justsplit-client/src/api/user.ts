import { useMutation, useQuery, useQueryClient } from "react-query";
import httpClient from "./client";
import { IUser } from "~/types";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchUser = () => httpClient.get(`${API_URL}/users`);

const makeRequestToSignupUser = ({ payload }: { payload: Partial<IUser> }) =>
  httpClient.post(`${API_URL}/signup`, payload);

const makeRequestToLoginUser = ({ payload }: { payload: Partial<IUser> }) =>
  httpClient.post(`${API_URL}/login`, payload);

const makeRequestToLogoutUser = ({ payload = {} }: { payload?: object }) =>
  httpClient.post(`${API_URL}/logout`, payload);

const useUserApi = () => {
  const queryClient = useQueryClient();

  const getLoggedInUserQuery = useQuery(["user"], makeRequestToFetchUser);

  const signupUserMutation = useMutation(makeRequestToSignupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const loginUserMutation = useMutation(makeRequestToLoginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const logoutUserMutation = useMutation(makeRequestToLogoutUser, {
    onSuccess: () => {
      window.location.href = "/login";
    },
  });

  return {
    signupUserMutation,
    loginUserMutation,
    logoutUserMutation,

    getLoggedInUserQuery,
  };
};

export default useUserApi;
