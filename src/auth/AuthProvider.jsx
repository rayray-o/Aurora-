import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { auth } from "../lib/firebase";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let mounted = true;

    setPersistence(auth, browserLocalPersistence).catch(
      (error) => {
        console.error("[AURORA] Auth persistence error:", error);
      }
    );

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        if (!mounted) return;

        setUser(nextUser);
        setLoading(false);
      },
      (error) => {
        console.error(
          "[AURORA] Auth state error:",
          error
        );

        if (!mounted) return;

        setAuthError(error);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);

    try {
      await setPersistence(
        auth,
        browserLocalPersistence
      );

      /*
       * Popup is ideal for desktop.
       * On mobile browsers Firebase recommends redirect
       * authentication because popup behavior is less reliable.
       */
      const isMobile =
        window.matchMedia(
          "(max-width: 767px)"
        ).matches;

      if (isMobile) {
        await signInWithRedirect(
          auth,
          googleProvider
        );

        return null;
      }

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      return result.user;
    } catch (error) {
      console.error(
        "[AURORA] Google authentication failed:",
        error
      );

      setAuthError(error);

      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError(null);

    try {
      await signOut(auth);
    } catch (error) {
      console.error(
        "[AURORA] Sign out failed:",
        error
      );

      setAuthError(error);

      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      isAuthenticated: Boolean(user),
      signInWithGoogle,
      logout,
    }),
    [
      user,
      loading,
      authError,
      signInWithGoogle,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
        }
