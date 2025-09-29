import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseConfig } from "@/services/config";
import { signupWithEmailPassword } from "@/services/api.auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function EmailSignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1️⃣ Initial signup: Firebase create user + send verification email
  const handleSignup = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      setEmailSent(true);
      Alert.alert(
        "Verification Email Sent",
        "Please check your email and click the verification link before proceeding."
      );
    } catch (err: any) {
      console.log(err);
      Alert.alert("Signup Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No logged in user");

      // ✅ Force refresh token to reflect emailVerified
      const idToken = await user.getIdToken(true);

      // Call backend endpoint
      const res = await signupWithEmailPassword(email, password, idToken);

      Alert.alert("Success", "Email verified! You are now logged in.");
      console.log("~Vasu :- token", res?.token);
      // TODO: Navigate to dashboard/home
    } catch (err: any) {
      console.log(err);

      const backendMsg =
        err.response?.data?.detail ||
        "Please check your email for verification.";
      Alert.alert("Email not verified", backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginBottom: 10 }}
        />
      )}

      {!emailSent ? (
        <TouchableOpacity
          onPress={handleSignup}
          style={{
            backgroundColor: "blue",
            padding: 15,
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleCheckVerification}
          style={{
            backgroundColor: "green",
            padding: 15,
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Check Email Verification
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
