import { useNavigate } from "react-router-dom";

const useUnAuth = (path: string): (() => void) => {
  const navigate = useNavigate();
  return () => {
    navigate("/login", {
      replace: true,
      state: {
        redirect: path,
      },
    });
  };
};

export default useUnAuth;
