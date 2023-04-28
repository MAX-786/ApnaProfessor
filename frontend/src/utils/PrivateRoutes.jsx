import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import {useSelector} from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  return ( <>
    { user ? <Outlet /> : <Navigate to="/login" /> }
  </> )
};

export default PrivateRoutes;
