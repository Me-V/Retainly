import * as React from "react";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function ProfileScreen() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "90805553457-nleg0gn2d3tsqd3nhr73col8oehaa5rl.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      //@ts-ignore
      useProxy: true, // This will use Expo's proxy with a proper domain
    }),
  });

  // Log the redirect URI to see what it generates
  React.useEffect(() => {
    const uri = makeRedirectUri({
      //@ts-ignore
      useProxy: true,
    });
    console.log("🔍 Redirect URI with proxy:", uri);
  }, []);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("✅ Authentication successful");

      fetch("http://10.189.84.153:8000/api/auth/google/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id_token=${id_token}`,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Backend response:", data);
        })
        .catch((err) => console.error(err));
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => promptAsync()}
    />
  );
}
