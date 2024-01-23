import { useDispatch, useSelector } from "react-redux";
import "./header.css";

import React, { useCallback, useEffect, useMemo } from "react";
import axiosInstance from "../../utils/auth";
import {
  logoutFun,
  setCurrentUser,
  setLogin,
} from "../../redux/slice/initialSlice";
import UserDetails from "../../components/UserDetails/UserDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";

interface ILogoutProps {
  btnFun: () => void;
  login?: boolean;
}

export const Logout: React.FC<ILogoutProps> = (props) => {
  return (
    <button
      onClick={props.btnFun}
      className="logout-button"
      style={
        props.login
          ? { background: "green", boxShadow: "inset 0 0 1.6em -0.6em green" }
          : {}
      }
    >
      {props.login ? "Login" : "Logout"}
      <div
        className="icon"
        style={
          props.login ? { boxShadow: "0.1em 0.1em 0.6em 0.2em green" } : {}
        }
      >
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
            stroke={props.login ? "green" : "#b23b3b"}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
    </button>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((e: RootState) => e.initialReducer);
  const verifyUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/user");
      const data = await res.data;
      dispatch(setLogin(true));
      dispatch(setCurrentUser(data.data.user));
    } catch (error) {
      localStorage.removeItem("jwt");
      dispatch(setLogin(false));
      console.warn("Not Logged in");
      // throw Error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    !isLoggedIn && verifyUser();
  }, [isLoggedIn, verifyUser]);
  const nonAvailablePath = useMemo(() => ["/login", "/editor"], []);
  console.log(pathname);
  if (nonAvailablePath.includes(pathname)) return null;
  return (
    <nav className="header_main_cont">
      <div className="header_main_sub_cont">
        <div onClick={() => navigate("/")} className="header_brand_logo">
          <p>
            PKBMG <span>Blog</span>
          </p>
          <hr />
        </div>
        {isLoggedIn ? (
          <div className="header_other_nav_cont">
            <p onClick={() => navigate("/editor")}>write</p>
            <UserDetails author={user} />
            <Logout btnFun={() => dispatch(logoutFun())} />
          </div>
        ) : (
          <Logout
            login
            btnFun={() => {
              navigate("/login", { state: { redirect: pathname } });
            }}
          />
        )}
      </div>
    </nav>
  );
}
