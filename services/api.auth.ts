// services/auth.ts
import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_BASE; // change to your server IP

export async function loginWithGoogle(idToken: string) {
  try {
    const res = await axios.post(`${API_BASE}/service/api/login/google/`, {
      id_token: idToken,
    });
    return res.data; // this will contain { token, detail }
  } catch (err: any) {
    console.error("Google login error:", err.response?.data || err.message);
    throw err;
  }
}

// ✅ New function: signup with phone OTP
export async function signupWithPhoneOTP(phoneNumber: string, idToken: string) {
  try {
    const res = await axios.post(`${API_BASE}/service/api/signup/`, {
      signup_method: "phone-otp",
      phone_number: phoneNumber,
      token: idToken,
    });
    return res.data; // { token, detail }
  } catch (err: any) {
    console.error("Phone OTP signup error:", err.response?.data || err.message);
    throw err;
  }
}

// Email & Password signup (also used to check verification)
export async function signupWithEmailPassword(
  email: string,
  password: string,
  idToken: string
) {
  try {
    const res = await axios.post(`${API_BASE}/service/api/signup/`, {
      signup_method: "email-pwd",
      email,
      password,
      token: idToken,
    });
    return res.data; // backend returns 400 if email not verified, 200 with token if verified
  } catch (err: any) {
    console.error("Email-Pwd signup error:", err.response?.data || err.message);
    throw err;
  }
}
