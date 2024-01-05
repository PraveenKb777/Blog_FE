import { ToastContainer, toast } from "react-toastify";

import "./Input.css";

import * as React from "react";
import { useDispatch } from "react-redux";
import { setError } from "../../src/redux/slice/errorSlice";

type Props = Readonly<{
  "data-test-id"?: string;
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

export default function FileInput({
  accept,
  label,
  onChange,
  "data-test-id": dataTestId,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>

      <input
        type="file"
        accept={accept}
        className="Input__input"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            if (selectedFile.size <= 5 * 1024 * 1024) {
              // Check if file size is less than 5MB (5 * 1024 * 1024 bytes)
              e;

              onChange(e.target.files);
            } else {
              dispatch(
                setError("File size exceeds 5MB. Please choose a smaller file.")
              );
              console.warn(
                "File size exceeds 5MB. Please choose a smaller file."
              );
            }
          }
        }}
        data-test-id={dataTestId}
      />
    </div>
  );
}
