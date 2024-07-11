import { useMutation, useQuery, useQueryClient } from "react-query";
import httpClient from "./client";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchUser = () => httpClient.get(`${API_URL}/user`);

const makeRequestToSignupUser = ({ payload }: { payload: any }) =>
  httpClient.post(`${API_URL}/signup`, payload);

const makeRequestToLoginUser = ({ payload }: { payload: any }) =>
  httpClient.post(`${API_URL}/login`, payload);

const makeRequestToLogoutUser = () => httpClient.post(`${API_URL}/logout`);

const useUserApi = () => {
  const queryClient = useQueryClient();

  const getLoggedInUser = useQuery(["user"], makeRequestToFetchUser);

  const signupUser = useMutation(makeRequestToSignupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const loginUser = useMutation(makeRequestToLoginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const logoutUser = useMutation(makeRequestToLogoutUser, {
    onSuccess: () => {
      window.location.href = "/login";
    },
  });

  return { signupUser, loginUser, logoutUser, getLoggedInUser };
};

export default useUserApi;
