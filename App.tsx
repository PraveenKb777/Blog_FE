import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MainEditor from "./EditorSrc/MainEditor";
import PrivateRoute from "./src/components/PrivateRoute";
import Blog from "./src/pages/Blog/Blog";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import { setError } from "./src/redux/slice/errorSlice";
import { RootState } from "./src/redux/store/store";
import Header from "./src/pages/Header/Header";
import SignUp from "./src/pages/SignUp/SignUp";
export default function App(): JSX.Element {
  const { errorMsg } = useSelector((e: RootState) => e.errorReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          dispatch(setError(""));
        },
      });
    }
  }, [dispatch, errorMsg]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/editor"
            element={<PrivateRoute path="/editor" element={<MainEditor />} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
