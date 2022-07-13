import { useContext } from "react";

import { AuthContext } from "../components/Auth";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
