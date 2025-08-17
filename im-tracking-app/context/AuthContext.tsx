import Spinner from "@/components/ui/Spinner";
import { useRootNavigationState, useRouter } from "expo-router";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: AuthState;
  setIsAuthenticated: (value: AuthState) => void;
}

type AuthState = "authed" | "unauthed" | undefined;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<AuthState>(undefined);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsAuthenticated("unauthed"), 2000);
  }, []);

  useEffect(() => {
    if (isMounted && isAuthenticated === "unauthed") {
      router.replace("/launch");
    }
  }, [isAuthenticated, router, rootNavigationState, isMounted]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!isAuthenticated ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
