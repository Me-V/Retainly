// services/auth.ts
export async function loginWithGoogle(idToken: string) {
  try {
    const res = await fetch(process.env.BASE_URL + "/api/auth/google/", {
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
