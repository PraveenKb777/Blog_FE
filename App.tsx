import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MainEditor from "./EditorSrc/MainEditor";
import Login from "./src/pages/Login/Login";
import { setError } from "./src/redux/slice/errorSlice";
import { RootState } from "./src/redux/store/store";
import PrivateRoute from "./src/components/PrivateRoute";
import Home from "./src/pages/Home/Home";
import Blog from "./src/pages/Blog/Blog";
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
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/editor"
            element={<PrivateRoute path="/editor" element={<MainEditor />} />}
          />
          <Route
            path="/"
            element={<PrivateRoute path="/" element={<Home />} />}
          />
          <Route
            path="/blogs/:id"
            element={<PrivateRoute element={<Blog />} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
