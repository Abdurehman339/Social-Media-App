import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

let Initial_State = {
  isFetching: false,
  user: null,
  error: false,
};

export const AuthContext = createContext(Initial_State);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Initial_State);
  return (
    <AuthContext.Provider
      value={{
        isFetching: state.isFetching,
        user: state.user,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
