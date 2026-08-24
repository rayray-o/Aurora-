import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

function getGoogleButton(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  const button = target.closest("button");

  if (!button) {
    return null;
  }

  const text = (button.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (
    text.includes("continue with google") ||
    text.includes("sign in with google") ||
    text.includes("google")
  ) {
    return button;
  }

  return null;
}

function getReadableFirebaseError(error) {
  const code = error?.code || "unknown";

  const messages = {
    "auth/unauthorized-domain":
      "This AURORA domain isn't authorized in Firebase yet.",

    "auth/operation-not-allowed":
      "Google sign-in isn't enabled in Firebase yet.",

    "auth/invalid-api-key":
      "The Firebase API key is invalid.",

    "auth/app-not-authorized":
      "This AURORA app isn't authorized for this Firebase project.",

    "auth/configuration-not-found":
      "Firebase authentication configuration was not found.",

    "auth/popup-blocked":
      "Google blocked the sign-in popup. Please allow popups and try again.",

    "auth/popup-closed-by-user":
      "The Google sign-in window was closed before authentication finished.",

    "auth/cancelled-popup-request":
      "Another Google sign-in request is already running.",

    "auth/network-request-failed":
      "A network error interrupted Google authentication.",

    "auth/internal-error":
      "Firebase encountered an internal authentication error.",

    "auth/invalid-credential":
      "Google returned an invalid authentication credential.",

    "auth/account-exists-with-different-credential":
      "An account already exists with a different sign-in method.",
  };

  const friendly =
    messages[code] ||
    error?.message ||
    "Unknown Firebase authentication error.";

  return {
    code,
    friendly,
  };
}

export default function AuthBridge() {
  const {
    user,
    loading,
    signInWithGoogle,
    logout,
  } = useAuth();

  useEffect(() => {
    const handleClick = async (event) => {
      const button = getGoogleButton(event.target);

      if (!button) {
        return;
      }

      /*
       * Don't intercept buttons that belong to another
       * authenticated Google flow.
       */
      if (button.dataset.auroraAuthHandling === "true") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      button.dataset.auroraAuthHandling = "true";

      const originalText =
        button.dataset.auroraOriginalText ||
        button.textContent ||
        "Continue with Google";

      button.dataset.auroraOriginalText = originalText;

      const originalDisabled = button.disabled;

      button.disabled = true;

      button.textContent =
        "Connecting to Google…";

      try {
        const authenticatedUser =
          await signInWithGoogle();

        /*
         * On mobile, Firebase may use redirect authentication.
         * In that case the browser leaves the page and returns
         * after Google authentication, so there may be no user
         * object immediately here.
         */
        if (authenticatedUser) {
          button.textContent =
            "Google account connected";

          console.info(
            "[AURORA] Google authentication successful.",
            {
              uid: authenticatedUser.uid,
              email: authenticatedUser.email,
              displayName:
                authenticatedUser.displayName,
            }
          );
        } else {
          button.textContent =
            "Returning from Google…";
        }

        setTimeout(() => {
          if (!button.isConnected) {
            return;
          }

          button.textContent = originalText;
        }, 2500);
      } catch (error) {
        console.error(
          "[AURORA] Google authentication failed:",
          error
        );

        const {
          code,
          friendly,
        } = getReadableFirebaseError(error);

        /*
         * IMPORTANT:
         * Instead of hiding the real Firebase error behind
         * "Sign in failed", show it directly on mobile.
         */
        button.textContent =
          `${code}: ${friendly}`;

        /*
         * Also expose the error globally so the rest of
         * AURORA can inspect it while we're configuring auth.
         */
        window.AURORA_AUTH_ERROR = {
          code,
          message: friendly,
          rawMessage: error?.message || null,
        };

        setTimeout(() => {
          if (!button.isConnected) {
            return;
          }

          button.textContent = originalText;
        }, 10000);
      } finally {
        button.disabled = originalDisabled;

        setTimeout(() => {
          if (button.dataset) {
            delete button.dataset.auroraAuthHandling;
          }
        }, 500);
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
  }, [signInWithGoogle]);

  /*
   * Expose a clean application-level authentication API.
   *
   * Future AURORA systems can use:
   *
   * window.AURORA_AUTH.getUser()
   * window.AURORA_AUTH.signIn()
   * window.AURORA_AUTH.signOut()
   * window.AURORA_AUTH.isAuthenticated()
   */
  useEffect(() => {
    window.AURORA_AUTH = {
      getUser: () => user,

      isLoading: () => loading,

      isAuthenticated: () =>
        Boolean(user),

      signIn: async () => {
        return signInWithGoogle();
      },

      signOut: async () => {
        return logout();
      },

      getUID: () => {
        return user?.uid || null;
      },

      getEmail: () => {
        return user?.email || null;
      },

      getDisplayName: () => {
        return user?.displayName || null;
      },

      getPhotoURL: () => {
        return user?.photoURL || null;
      },
    };

    return () => {
      delete window.AURORA_AUTH;
    };
  }, [
    user,
    loading,
    signInWithGoogle,
    logout,
  ]);

  /*
   * Keep this component invisible.
   * It exists only as the bridge between the existing
   * AURORA interface and the real Firebase authentication
   * layer.
   */
  return null;
            }
