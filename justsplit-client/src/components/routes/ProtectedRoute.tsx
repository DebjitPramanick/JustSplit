import { Navigate, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useUser from "~/hooks/useUser";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user, isPending } = useUser();

  if (isPending) {
    return (
      <>
        <ClipLoader />
      </>
    );
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
