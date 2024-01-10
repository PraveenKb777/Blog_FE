import React from "react";
import "./normalbtn.css";
interface INormalBtn {
  label: string; //label is needed
  onClick?: () => void;
  addOnClass?: string;
  isLoading?: boolean;
  disabled?: boolean;
}
export default function NormalBtn(props: INormalBtn) {
  const onClick = () => {
    props.onClick && props.onClick();
  };

  return (
    <button onClick={onClick} className="normal_btn">
      <span>{props.label}</span>
    </button>
  );
}
