import React, { useEffect, useState } from "react";
import SendButton from "../../components/SendButton/SendButton";
import axiosInstance from "../../utils/auth";
import "./reviews.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setIsSuc } from "../../redux/slice/errorSlice";
import { RootState } from "../../redux/store/store";
import useUnAuth from "../../utils/useUnAuth";

export default function Reviews() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const unAuth = useUnAuth("/review");
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const { isLoggedIn } = useSelector((e: RootState) => {
    return e.initialReducer;
  });

  useEffect(() => {
    !isLoggedIn && unAuth();
  }, [isLoggedIn, unAuth]);

  const autoGrow = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const postReview = async () => {
    try {
      const res = await axiosInstance.post("/review", { message: text });
      if (res.status === 200) {
        dispatch(setIsSuc(true));
        dispatch(setError("Thank you for your feed back.This means a lot"));
        navigate(state?.redirect || "/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));

      console.log(error.response.data.message);
    }
  };

  return (
    <div className="reviews_main_cont">
      <h1>YOUR REVIEW MATTERS</h1>
      <div className="reviews_sub_cont">
        <label htmlFor="input" className="reviews_label">
          Your message:
        </label>
        <textarea
          placeholder="Write here..."
          name="input"
          className="reviews_input"
          onChange={handleChange}
          value={text}
          maxLength={250}
          onInput={(e) => autoGrow(e.target)}
        />
        <SendButton
          onClick={postReview}
          addOnClass="review_send_btn"
          label="Send your Opinion"
        />
        <p className="review_disclaimer">
          *Your review will be only viewed by developer
        </p>
      </div>
    </div>
  );
}
