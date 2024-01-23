import { useNavigate } from "react-router-dom";

const useUnAuth = (path: string): void => {
  const navigate = useNavigate();

  navigate("/login", {
    state: {
      redirect: path,
    },
  });
};

export default useUnAuth;
