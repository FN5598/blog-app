import axios from "axios";

export async function checkAuth() {
  try {
    const tempRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {}, {
      withCredentials: true,
    });
    console.log("Refresh response:", tempRes.data);
    await new Promise((r) => setTimeout(r, 100));

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
      withCredentials: true,
    });

    return res.data.authenticated;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}
