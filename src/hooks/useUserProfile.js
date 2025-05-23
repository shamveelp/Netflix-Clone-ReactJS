import { useContext } from "react";
import { Usercontext } from "../context/User/UserContext";

export const useProfile = () => {
  const context = useContext(Usercontext);

  if (!context) {
    throw new Error("useProfile must be used within a UserControllerProvider");
  }

  return context;
};