import { useContext, createContext, useEffect } from "react";
import useUserApi from "~/api/user";
import { IUser } from "~/types";

interface IUserContextProps {
  user: IUser | null;
  isPending: boolean;
  isError: boolean;
  error: unknown | null;
}

const UserContext = createContext<IUserContextProps>({
  user: null,
  isPending: false,
  isError: false,
  error: null,
});

const BlackListedRoutesForLoggedInUser = ["/login", "/signup"];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getLoggedInUserQuery } = useUserApi();

  console.log("RE_RENDERING");

  const isAuthPages = BlackListedRoutesForLoggedInUser.includes(
    window.location.pathname
  );

  useEffect(() => {
    if (getLoggedInUserQuery.isSuccess && isAuthPages) {
      window.location.href = "/";
    }
  }, [getLoggedInUserQuery.isSuccess, isAuthPages]);

  const values = {
    user: getLoggedInUserQuery.data,
    isPending: getLoggedInUserQuery.isLoading,
    isError: getLoggedInUserQuery.isError,
    error: getLoggedInUserQuery.error,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
