import { ToastContainer, toast } from "react-toastify";

import "./Input.css";

import * as React from "react";

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
  return (
    <div className="Input__wrapper">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 999999 }}
      />
      <label className="Input__label">{label}</label>

      <input
        type="file"
        accept={accept}
        className="Input__input"
        onChange={(e) => {
          const selectedFile = event.target.files[0] || null;
          if (selectedFile) {
            if (selectedFile.size <= 5 * 1024 * 1024) {
              // Check if file size is less than 5MB (5 * 1024 * 1024 bytes)
              e;
              onChange(e.target.files);
            } else {
              toast.error(
                "File size exceeds 5MB. Please choose a smaller file.",
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
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
