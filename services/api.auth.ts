// services/auth.ts


export async function loginWithGoogle(idToken: string) {
  try {
    const res = await fetch("http://10.242.141.153:8000/service/api/login/google/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id_token=${idToken}`,
    });
    return await res.json();
  } catch (err) {
    console.error("Google login error:", err);
    throw err;
  }
}
