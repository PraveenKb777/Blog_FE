import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MainEditor from "./EditorSrc/MainEditor";
import PrivateRoute from "./src/components/PrivateRoute";
import Blog from "./src/pages/Blog/Blog";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import { setError, setIsSuc } from "./src/redux/slice/errorSlice";
import { RootState } from "./src/redux/store/store";
import Header from "./src/pages/Header/Header";
import SignUp from "./src/pages/SignUp/SignUp";
import Footer from "./src/pages/Footer/Footer";
import Reviews from "./src/pages/Reviews/Reviews";
export default function App(): JSX.Element {
  const { errorMsg, isSuc, globalLoading } = useSelector(
    (e: RootState) => e.errorReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMsg && isSuc) {
      toast.success(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          dispatch(setError(""));
          dispatch(setIsSuc(false));
        },
      });
    }
    if (errorMsg && !isSuc) {
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          dispatch(setError(""));
        },
      });
    }
  }, [dispatch, errorMsg, isSuc]);

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
          <Route path="/review" element={<Reviews />} />
        </Routes>
        <ToastContainer />
        <Footer />
        {globalLoading && <div className="global_loading">Loading</div>}
      </BrowserRouter>
    </>
  );
}
