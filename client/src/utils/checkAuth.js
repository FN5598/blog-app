import axios from "axios";

export async function checkAuth() {
  try {
    const tempRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {}, {
      withCredentials: true,
    });
    if (tempRes.data?.authenticated === false) {
      return tempRes.data.authenticated
    }
    console.log("Refresh response:", tempRes.data.authenticated);
    await new Promise((r) => setTimeout(r, 100));

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
      withCredentials: true,
    });

    return res.data.authenticated;
  } catch (err) {
    if (err.response?.data?.message) {
      console.error("Auth check failed:", err.response.data.message);
    } else {
      console.error("Auth check failed");
    }
    return false;
  }
}
