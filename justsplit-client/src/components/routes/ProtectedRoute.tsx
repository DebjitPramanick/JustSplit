import { Navigate, Outlet } from "react-router-dom";
import useUser from "~/hooks/useUser";
import { PageLoader } from "../molecules";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user, isPending } = useUser();

  if (isPending) {
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
