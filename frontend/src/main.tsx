import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
