export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://apibookfinder.eshtropy.se"
    : "http://127.0.0.1:8000";
export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookfinder.eshtropy.se"
    : "http://localhost:3000";
