import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/main.scss";

import { LoginHome } from "./pages/LoginHome";
import { Login } from "./pages/Login";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* @ts-ignore */}
                <Route path="/" element={<LoginHome />} />
                {/* @ts-ignore */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
