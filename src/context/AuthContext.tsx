import { createContext, useState, useEffect, type ReactNode } from "react";
import ApiUsersClient from "../api/apiUsersClient";

type UserPayload = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
} | null;

interface AuthContextType {
  user: UserPayload;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateUser: (user: UserPayload) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  updateUser: (user: UserPayload) => user,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated: boolean = !!user;

  const updateUser = (user: UserPayload) => {
    setUser(user);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await ApiUsersClient.me();
        if (response.status == 200) {
          setUser(response.result);
        }
      } catch (error) {
        setUser(null);
        // TODO: remove this later
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
