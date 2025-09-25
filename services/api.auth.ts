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
