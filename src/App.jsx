import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EcsMapping from "./pages/EcsMapping";
import Login from "./components/auth/Login";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route
                    path="/mapping"
                    element={
                    <ProtectedRoute>
                        <EcsMapping />
                    </ProtectedRoute>
                }
                    />
            </Routes>
        </Router>
    );
}

export default App;
