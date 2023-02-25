import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Welcome from "./components/Welcome";
import { AuthProvider } from "./context/AuthProvider";

function App() {
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />

                        <Route element={<RequireAuth />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/welcome" element={<Welcome />} />
                        </Route>

                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />
                        <Route path="*" element={<Missing />} />
                    </Routes>
                </AuthProvider>
            </main>
        </React.Fragment>
    );
}

export default App;
