import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

function getClickableGoogleButton(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  const button = target.closest("button");

  if (!button) {
    return null;
  }

  const text = button.textContent
    ?.replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!text) {
    return null;
  }

  if (
    text.includes("continue with google") ||
    text.includes("sign in with google")
  ) {
    return button;
  }

  return null;
}

export default function AuthBridge() {
  const {
    signInWithGoogle,
    logout,
    user,
  } = useAuth();

  useEffect(() => {
    const handleClick = async (event) => {
      const button = getClickableGoogleButton(
        event.target
      );

      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      if (user) {
        return;
      }

      button.disabled = true;

      const originalText =
        button.dataset.auroraAuthText ||
        button.textContent;

      button.dataset.auroraAuthText =
        originalText;

      button.textContent =
        "Connecting to Google…";

      try {
        await signInWithGoogle();

        button.textContent =
          "Google account connected";

        setTimeout(() => {
          if (button.isConnected) {
            button.textContent =
              originalText;
          }
        }, 1800);
      } catch (error) {
        console.error(error);

        button.textContent =
          "Google sign-in failed";

        setTimeout(() => {
          if (button.isConnected) {
            button.textContent =
              originalText;
          }
        }, 2200);
      } finally {
        button.disabled = false;
      }
    };

    document.addEventListener(
      "click",
      handleClick,
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick,
        true
      );
    };
  }, [signInWithGoogle, user]);

  /*
   * Optional global API for future AURORA components.
   *
   * This gives the rest of the application a clean bridge
   * to the real authentication layer without coupling UI
   * components directly to Firebase.
   */
  useEffect(() => {
    window.AURORA_AUTH = {
      getUser: () => user,
      signIn: signInWithGoogle,
      signOut: logout,
      isAuthenticated: () => Boolean(user),
    };

    return () => {
      delete window.AURORA_AUTH;
    };
  }, [user, signInWithGoogle, logout]);

  return null;
}
