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
  const { getLoggedInUser } = useUserApi();

  const isAuthPages = BlackListedRoutesForLoggedInUser.includes(
    window.location.pathname
  );

  const { data: user, isLoading: isPending, isError, error } = getLoggedInUser;

  useEffect(() => {
    if (user && isAuthPages) {
      window.location.href = "/";
    }
  }, [user, isAuthPages]);

  const values = {
    user,
    isPending,
    isError,
    error,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
