// hooks/useGoogleAuth.ts
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import React from "react";
import { loginWithGoogle } from "@/services/auth";

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "90805553457-nleg0gn2d3tsqd3nhr73col8oehaa5rl.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      //@ts-ignore
      useProxy: true,
    }),
    //@ts-ignore
    useProxy: true,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("✅ Google Auth success");

      loginWithGoogle(id_token).then((data) =>
        console.log("Backend response:", data)
      );
    }
  }, [response]);

  return { promptAsync, request, response };
}
