import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setError } from "../../redux/slice/errorSlice";
import axiosInstance from "../../utils/auth";
import "./login.css";
interface ILoginData {
  token: string;
  user: {
    firstname: string;
    lastname: string | null;
    username: string;
    email: string;
    role: string;
  };
}

interface ILoginResponse {
  status: string;
  msg?: string;
  data?: ILoginData;
  message?: string;
  error?: {
    statusCode: number;
    status: string;
    isOperational: true;
  };
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [load, setLoad] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoad(true);

    try {
      const res = await axiosInstance.post<ILoginResponse>("/user/login", {
        username: email,
        password,
      });
      const { data } = await res.data;
      const token = data?.token || "";
      localStorage.setItem("jwt", token);
      if (state?.redirect) {
        navigate(state.redirect, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="login-main-cont">
      <form className="login-centered-div ">
        <h2>Sign in with email</h2>
        <p>Kindly enter the email and password associated with your Account</p>
        <label htmlFor={"email"}>Your Email</label>
        <input
          aria-label="Email"
          name="email"
          id="email"
          className="login_input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor={"password"}>Your Password</label>
        <input
          name="password"
          id="password"
          className="login_input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onClickLogin} className="button2">
          {load ? (
            <div className="loader">
              <span></span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
