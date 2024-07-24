import { useContext, createContext, useEffect } from "react";
import { userApi } from "~/api";

import { IUser } from "~/types";
import useRequestStates from "./useRequestStates";

interface IUserContextProps {
  user: IUser;
  isPending: boolean;
  isRejected: boolean;
  error: unknown | null;
}

const initialUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  token: "",
  createdAt: "",
  updatedAt: "",
};

const UserContext = createContext<IUserContextProps>({
  user: initialUser,
  isPending: false,
  isRejected: false,
  error: null,
});

const BlackListedRoutesForLoggedInUser = ["/login", "/signup"];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [getLoggedInUserRequestState, getLoggedInUserRequestHandlers] =
    useRequestStates();

  const isAuthPages = BlackListedRoutesForLoggedInUser.includes(
    window.location.pathname
  );

  const getLoggedInUser = async () => {
    getLoggedInUserRequestHandlers.pending();
    try {
      const response = await userApi.fetchUser();
      getLoggedInUserRequestHandlers.fulfilled(response);
    } catch (error) {
      getLoggedInUserRequestHandlers.rejected(error);
    }
  };

  console.log("RE_RENDERING");

  useEffect(() => {
    getLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getLoggedInUserRequestState.isSuccess && isAuthPages) {
      window.location.href = "/";
    }
  }, [getLoggedInUserRequestState.isSuccess, isAuthPages]);

  const values = {
    user: getLoggedInUserRequestState.data,
    isPending: getLoggedInUserRequestState.pending,
    isRejected: getLoggedInUserRequestState.rejected,
    error: getLoggedInUserRequestState.rejected.error,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
