"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface AuthContextType {
  currentUser: User | null;
  register: (user: User) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string; user?: User };
  logout: () => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "sidra_users";
const CURRENT_USER_KEY = "sidra_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Sync state from localStorage on mount and listen to changes
  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem(CURRENT_USER_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setCurrentUser(parsed);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Failed to load user from localStorage", err);
        setCurrentUser(null);
      } finally {
        setIsReady(true);
      }
    };

    syncUser();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CURRENT_USER_KEY) {
        syncUser();
      }
    };

    const handleCustomAuthChange = () => {
      syncUser();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("sidra-auth-change", handleCustomAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("sidra-auth-change", handleCustomAuthChange);
    };
  }, []);

  const register = (newUser: User): { success: boolean; error?: string } => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const existingIndex = users.findIndex(
        (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
      );

      if (existingIndex > -1) {
        // Update user if already exists with same email
        users[existingIndex] = newUser;
      } else {
        users.push(newUser);
      }

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      return { success: true };
    } catch (err) {
      console.error("Failed to register user", err);
      return { success: false, error: "Unable to save account. Please try again." };
    }
  };

  const login = (
    email: string,
    password: string
  ): { success: boolean; error?: string; user?: User } => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (found) {
        if (found.password && found.password !== password) {
          return { success: false, error: "Incorrect password. Please try again." };
        }
        const sessionUser: User = {
          firstName: found.firstName,
          lastName: found.lastName,
          email: found.email,
        };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
        setCurrentUser(sessionUser);
        window.dispatchEvent(new Event("sidra-auth-change"));
        return { success: true, user: sessionUser };
      }

      // If user wasn't registered in sidra_users, create session from credentials
      const guessedFirstName = email.split("@")[0] || "User";
      const formattedFirstName =
        guessedFirstName.charAt(0).toUpperCase() + guessedFirstName.slice(1);
      const fallbackUser: User = {
        firstName: formattedFirstName,
        lastName: "",
        email: email.trim(),
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(fallbackUser));
      setCurrentUser(fallbackUser);
      window.dispatchEvent(new Event("sidra-auth-change"));
      return { success: true, user: fallbackUser };
    } catch (err) {
      console.error("Failed to login", err);
      return { success: false, error: "An error occurred during sign in." };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      setCurrentUser(null);
      window.dispatchEvent(new Event("sidra-auth-change"));
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        isReady,
      }}
    >
      {children}
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
