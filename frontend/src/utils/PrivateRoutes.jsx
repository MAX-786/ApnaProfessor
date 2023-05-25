import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector(selectUser) || {};
  const location = useLocation();

  return (
    <>
      {Object.keys(user).length !== 0 ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location.state.from }} replace={true} />
      )}
    </>
  );
};

export default PrivateRoutes;
