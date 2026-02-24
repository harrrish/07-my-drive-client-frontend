import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FolderIDProvider } from "../Contexts/FolderIDProvider.jsx";
import { ErrorProvider } from "../Contexts/ErrorProvider.jsx";
import { UpdateProvider } from "../Contexts/UpdateProvider.jsx";
import { UserDetailsProvider } from "../Contexts/UserDetailsProvider.jsx";
import { UserStorageProvider } from "../Contexts/UserStorageProvider.jsx";
import { DirectoryProvider } from "../Contexts/DirectoryProvider.jsx";
import { OpenSettingsProvider } from "../Contexts/OpenSettingsProvider.jsx";

export const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const baseURL = import.meta.env.VITE_BASE_URL;

if (import.meta.env.VITE_ENV === "development") {
  console.log({ baseURL });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 2 * 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <OpenSettingsProvider>
          <DirectoryProvider>
            <UserStorageProvider>
              <UserDetailsProvider>
                <UpdateProvider>
                  <ErrorProvider>
                    <FolderIDProvider>
                      <App />
                    </FolderIDProvider>
                  </ErrorProvider>
                </UpdateProvider>
              </UserDetailsProvider>
            </UserStorageProvider>
          </DirectoryProvider>
        </OpenSettingsProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
