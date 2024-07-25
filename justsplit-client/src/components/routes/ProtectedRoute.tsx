import { Navigate, Outlet } from "react-router-dom";
import useApp from "~/hooks/useApp";
import { PageLoader } from "../molecules";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user, isLoadingUser } = useApp();

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: redirectPath,
        }}
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
