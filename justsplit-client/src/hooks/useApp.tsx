import { useContext, createContext, useEffect } from "react";
import { friendApi, groupApi, userApi } from "~/api";

import { IUser } from "~/types";
import useRequestStates from "./useRequestStates";

interface IAppContextProps {
  user: IUser;
  isLoadingUser: boolean;
  friends: IUser[];
  groups: IUser[];
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

const AppContext = createContext<IAppContextProps>({
  user: initialUser,
  isLoadingUser: false,
  friends: [],
  groups: [],
});

const BlackListedRoutesForLoggedInUser = ["/login", "/signup"];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fetchLoggedInUserRequestState, fetchLoggedInUserRequestHandlers] =
    useRequestStates();
  const [fetchUserFriendsRequestState, fetchUserFriendsRequestHandlers] =
    useRequestStates();
  const [fetchUserGroupsRequestState, fetchUserGroupsRequestHandlers] =
    useRequestStates();

  const isAuthPages = BlackListedRoutesForLoggedInUser.includes(
    window.location.pathname
  );

  const getLoggedInUser = async () => {
    fetchLoggedInUserRequestHandlers.pending();
    try {
      const response = await userApi.fetchUser();
      fetchLoggedInUserRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchLoggedInUserRequestHandlers.rejected(error);
    }
  };

  const getUserFriends = async () => {
    fetchUserFriendsRequestHandlers.pending();
    try {
      const response = await friendApi.fetchUserFriends();
      fetchUserFriendsRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchUserFriendsRequestHandlers.rejected(error);
    }
  };

  const getUserGroups = async () => {
    fetchUserGroupsRequestHandlers.pending();
    try {
      const currentUser = fetchLoggedInUserRequestState.data;
      const response = await groupApi.fetchUserGroups(currentUser.id);
      fetchUserGroupsRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchUserGroupsRequestHandlers.rejected(error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchLoggedInUserRequestState.fulfilled) {
      getUserFriends();
      getUserGroups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLoggedInUserRequestState.fulfilled]);

  useEffect(() => {
    if (fetchLoggedInUserRequestState.fulfilled && isAuthPages) {
      window.location.href = "/";
    }
  }, [fetchLoggedInUserRequestState.fulfilled, isAuthPages]);

  const values = {
    user: fetchLoggedInUserRequestState.data,
    isLoadingUser: fetchLoggedInUserRequestState.pending,
    friends: fetchUserFriendsRequestState.data,
    groups: fetchUserGroupsRequestState.data,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
