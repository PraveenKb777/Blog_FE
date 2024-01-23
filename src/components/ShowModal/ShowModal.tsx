import React from "react";
import "./showmodal.css";

interface IShowModalProps {
  isVisible: boolean;
  leftBtnFunction?: () => void;
  rightBtnFunction?: () => void;
  leftBtnLabel?: string;
  rightBtnLabel?: string;
}
export default function ShowModal({ isVisible, ...props }: IShowModalProps) {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="modal_main_cont">
      <div className="modal_center_cont">
        <p className="cookieHeading">We use cookies.</p>
        <p className="cookieDescription">
          This website uses cookies to ensure you get the best experience on our
          site.
        </p>

        <div className="buttonContainer">
          <button onClick={props.leftBtnFunction} className="acceptButton">
            {props.leftBtnLabel || "Delete"}
          </button>
          <button onClick={props.rightBtnFunction} className="declineButton">
            {props.rightBtnLabel || "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}
