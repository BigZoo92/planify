import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider, TimetableProvider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <TimetableProvider>
                <App />
            </TimetableProvider>
        </UserProvider>
    </React.StrictMode>
);
