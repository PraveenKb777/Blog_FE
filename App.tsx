import React, { useEffect } from "react";
import MainEditor from "./EditorSrc/MainEditor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/redux/store/store";
import { ToastContainer, toast } from "react-toastify";
import { setError } from "./src/redux/slice/errorSlice";
export default function App(): JSX.Element {
  const { errorMsg } = useSelector<RootState>((e) => e.errorReducer);
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
  }, [errorMsg]);

  return (
    <>
      <MainEditor />
      <ToastContainer />
    </>
  );
}
