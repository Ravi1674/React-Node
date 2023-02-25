import React, { useEffect, useState } from "react";
import axios from "../api/axios";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState();

    const refreshToken = async () => {
        const res = await axios
            .get("/refresh", {
                withCredentials: true,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };
    const sendRequest = async () => {
        const res = await axios
            .get("/user", {
                withCredentials: true,
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        if (firstRender) {
            firstRender = false;
            sendRequest().then((data) => setUser(data.user));
        }
        let interval = setInterval(() => {
            refreshToken().then((data) => setUser(data.user));
        }, 1000 * 60 * 60 * 9);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: "5% 5%" }}>
            <h1 style={{fontWeight: 800, paddingBottom: '5%'}}>Congratulations! You are authenticated.</h1>
                <h3>Click on <u>Dashboard</u> Tab to see the user's data</h3>
            </div>
    );
};

export default Welcome;
