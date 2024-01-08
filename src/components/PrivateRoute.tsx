import { useCallback, useEffect, useRef, useState } from "react";
import {
  Navigate,
  RouteProps,
  useLocation,
  useNavigate,
} from "react-router-dom";

import React from "react";
import axiosInstance from "../utils/auth";

export default function PrivateRoute(props: RouteProps): React.ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  const [route, setRoute] = useState(props.element);

  const pathname = useRef(props.path ? props.path : location.pathname);
  const verify = useCallback(async () => {
    try {
      await axiosInstance.get("/user/verify");
    } catch (error) {
      setRoute(
        <Navigate
          to={`/login`}
          state={{ redirect: pathname.current }}
          replace={true}
        />
      );
    }
  }, [pathname]);
  useEffect(() => {
    verify();
  }, [navigate, props.path, verify]);

  return route;
}
