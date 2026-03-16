import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosWithCreds = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosWithOutCreds = axios.create({
  baseURL,
});

export function axiosError(
  error = null,
  navigate = null,
  setError = null,
  actionFunction = null,
  customErr = "Something went wrong !",
) {
  const errorValue = error.response?.data?.error || customErr;

  //* INVALID_SESSION
  if (error.status === 401 && errorValue === "INVALID_SESSION") {
    navigate("/login", { replace: true });
  }

  //* FOLDER NOT FOUND
  else if (error.status === 404 && errorValue === "FOLDER_NOT_FOUND") {
    actionFunction(true);
    setError((prev) => [...prev, errorValue]);
    setTimeout(() => setError((prev) => prev.slice(1)), 3000);
    return { status: 507, uploadSignedUrl: null, fileID: null };
  }

  //* LARGE FILE ERROR
  else if (error.status === 507) {
    setError((prev) => [...prev, errorValue]);
    setTimeout(() => setError((prev) => prev.slice(1)), 3000);
    return { status: 507, uploadSignedUrl: null, fileID: null };
  }

  //* REST OF THE ERRORS
  else {
    setError((prev) => [...prev, errorValue]);
    setTimeout(() => setError((prev) => prev.slice(1)), 3000);
  }
}
