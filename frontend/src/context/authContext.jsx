import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (data) => {
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };