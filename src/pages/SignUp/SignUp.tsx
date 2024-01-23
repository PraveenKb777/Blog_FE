import React, { FormEvent, useCallback, useState } from "react";
import "./signup.css";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/slice/errorSlice";
import axiosInstance from "../../utils/auth";
import { IUser } from "../../components/UserDetails/UserDetails";
import { setCurrentUser } from "../../redux/slice/initialSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ISignUpRes {
  token: string;
  user: IUser;
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigation = useNavigate();
  const signUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== passwordConfirm) {
        console.log(password, passwordConfirm);
        return dispatch(setError("Passwords do not match!"));
      }

      try {
        const res = await axiosInstance.post("/user", {
          username,
          password,
          passwordConfirm,
          firstname,
          lastname,
          email,
        });

        const data = res.data;
        const { token, user }: ISignUpRes = data.data;
        localStorage.setItem("jwt", token);
        dispatch(setCurrentUser(user));
        navigation(state?.redirect ? state.redirect : "/", {
          replace: true,
        });
      } catch (error) {
        dispatch(setError(error.response.data.message));
      }
    },
    [
      dispatch,
      email,
      firstname,
      lastname,
      navigation,
      password,
      passwordConfirm,
      state?.redirect,
      username,
    ]
  );

  return (
    <div className="sign_up_main_top">
      <form onSubmit={signUp} action="" className="sign_up_main">
        <p className="sign_up_main_heading">Sign up</p>
        <div className="sign_up_input_container">
          <svg
            className="sign_up_input_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            type="text"
            className="sign_up_input_field"
            id="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="sign_up_input_container">
          <input
            type="text"
            className="sign_up_input_field"
            id="firstname"
            placeholder="First Name"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="sign_up_input_container">
          <input
            type="text"
            className="sign_up_input_field"
            id="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="sign_up_input_container">
          <svg
            className="sign_up_input_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            type="email"
            className="sign_up_input_field"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="sign_up_input_container">
          <svg
            className="sign_up_input_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            type="password"
            className="sign_up_input_field"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign_up_input_container">
          <svg
            className="sign_up_input_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            type="password"
            className="sign_up_input_field"
            id="password_confirm"
            placeholder="Password Confirm"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button id="sign_up_button">Submit</button>
        <Link
          to="/login"
          replace
          className="login_sign_up_bottom_text"
          state={{ redirect: state?.redirect ? state.redirect : "/" }}
        >
          Already have an account? Login here!
        </Link>
      </form>
    </div>
  );
}
