import {memo} from "react";
import {Navigate, Outlet} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute () {
  const select = useSelector(state => ({
    token: state.user.token,
  }))

  if (!select.token) {
    return <Navigate to={"/login"}/>;
  }

 return (
   <Outlet/>
 )
}

export default memo(PrivateRoute)