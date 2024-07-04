import { useMutation, useQuery, useQueryClient } from "react-query";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const makeRequestToFetchUser = (userId: string) =>
  fetch(`${API_URL}/user/${userId}`).then((res) => res.json());

const makeRequestToSignupUser = ({ payload }: { payload: any }) =>
  fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

const makeRequestToLoginUser = ({ payload }: { payload: any }) =>
  fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

const useUserApi = () => {
  const queryClient = useQueryClient();

  // const getUser = useQuery("user", () => makeRequestToFetchUser(), {
  //   initialData: [],
  // });

  const signupUser = useMutation(makeRequestToLoginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const loginUser = useMutation(makeRequestToSignupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return { signupUser, loginUser };
};

export default useUserApi;
