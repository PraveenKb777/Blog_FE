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
import ENV from "../../utils/env";

type LoginProps = {
  login: boolean;
  signUp?: never;
};

type SignUpProps = {
  signUp: boolean;
  login?: never;
};
type Logout = {
  signUp?: never;
  login?: never;
};
interface ILogoutCommon {
  btnFun: () => void;
}

type ILogoutProps = ILogoutCommon & (LoginProps | SignUpProps | Logout);

export const Logout: React.FC<ILogoutProps> = (props) => {
  const { login, signUp, btnFun } = props;

  return (
    <button
      onClick={btnFun}
      className="logout-button"
      style={
        login
          ? { background: "green", boxShadow: "inset 0 0 1.6em -0.6em green" }
          : signUp
            ? {
                background: "	#1877F2",
                boxShadow: "inset 0 0 1.6em -0.6em 	#1877F2",
              }
            : {}
      }
    >
      {login ? "Login" : signUp ? "Sign Up" : "Logout"}
      <div
        className="icon"
        style={
          login
            ? { boxShadow: "0.1em 0.1em 0.6em 0.2em green" }
            : signUp
              ? { boxShadow: "0.1em 0.1em 0.6em 0.2em 	#1877F2" }
              : {}
        }
      >
        {login ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 12C20 7.58172 16.4183 4 12 4M12 20C14.5264 20 16.7792 18.8289 18.2454 17"
              stroke="#1C274C"
            />
            <path d="M4 12H14M14 12L11 9M14 12L11 15" stroke="#1C274C" />
          </svg>
        ) : signUp ? (
          <svg
            data-name="Livello 1"
            id="Livello_1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <path d="M37.09,32.91A3,3,0,0,0,39.21,32L61,10.24V91a3,3,0,0,0,6,0V10.24L88.79,32A3,3,0,0,0,93,27.79L66.12.88A3,3,0,0,0,65.66.5L65.43.38a3,3,0,0,0-.29-.15,3,3,0,0,0-.31-.1L64.59.06a3,3,0,0,0-1.18,0l-.25.08a2.93,2.93,0,0,0-.31.1,3,3,0,0,0-.29.15L62.34.5a3,3,0,0,0-.46.38L35,27.79a3,3,0,0,0,2.12,5.12Z" />
            <path d="M125,88a3,3,0,0,0-3,3v22a9,9,0,0,1-9,9H15a9,9,0,0,1-9-9V91a3,3,0,0,0-6,0v22a15,15,0,0,0,15,15h98a15,15,0,0,0,15-15V91A3,3,0,0,0,125,88Z" />
          </svg>
        ) : (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
              stroke={login ? "green" : "#ff4122"}
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default function Header() {
  const { pathname } = useLocation();
  const { nonAvailablePath } = ENV;
  const showHeader = useMemo(
    () => nonAvailablePath.includes(pathname),
    [nonAvailablePath, pathname]
  );
  const dispatch = useDispatch();

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
    if (!isLoggedIn) {
      verifyUser();
    }
  }, [isLoggedIn, showHeader, verifyUser]);
  if (showHeader) return null;
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
          <div className="header_login_cont">
            <Logout
              login
              btnFun={() => {
                navigate("/login", { state: { redirect: pathname } });
              }}
            />
            <Logout
              signUp
              btnFun={() => {
                navigate("/signup");
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
