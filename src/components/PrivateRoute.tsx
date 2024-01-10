import { useCallback, useEffect, useRef, useState } from "react";
import {
  Navigate,
  RouteProps,
  useLocation,
  useNavigate,
} from "react-router-dom";

import React from "react";
import axiosInstance from "../utils/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slice/initialSlice";

export default function PrivateRoute(props: RouteProps): React.ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  const [route, setRoute] = useState(props.element);
  const dispatch = useDispatch();
  const pathname = useRef(props.path ? props.path : location.pathname);
  const verifyUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/user");
      const data = await res.data;

      dispatch(setCurrentUser(data.data.user));
    } catch (error) {
      console.warn("Not Logged in");
      throw Error(error);
    }
  }, [dispatch]);
  const verify = useCallback(async () => {
    try {
      await verifyUser();
    } catch (error) {
      setRoute(
        <Navigate
          to={`/login`}
          state={{ redirect: pathname.current }}
          replace={true}
        />
      );
    }
  }, [verifyUser]);

  useEffect(() => {
    verify();
  }, [navigate, props.path, verify]);

  return route;
}
