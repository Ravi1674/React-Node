import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { authActions } from "../../store";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";

const Login = () => {
    const { setAuth } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const sendRequest = async () => {
        const response = await axios
            .post("/login", {
                email,
                password,
            })
            .catch((err) => {
                alert(
                    "Invalid email/password, Kindly enter correct credentials"
                );
                throw new Error(err);
            });

        const data = await response?.data;
        const accessToken = data?.accessToken;
        setAuth({ email, password, accessToken });
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            sendRequest()
                .then(() => {
                    dispatch(authActions.login());
                })
                .then(() => navigate("/dashboard"));
        } else {
            alert("All the fields are required");
        }
    };

    useEffect(() => {
        emailRef.current.focus();
    }, []);
    return (
        <div className="signUp">
            <Form onSubmit={handleSubmit}>
                <h1 className="title-beauty">SIGN IN</h1>
                <InputGroup className="inp-mid">
                    <Form.Control
                        ref={emailRef}
                        type="email"
                        className="form-control input-acc"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="inp-mid">
                    <Form.Control
                        ref={passwordRef}
                        className="form-control input-acc"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <div className="btn-div">
                    <Button
                        type="submit"
                        className="btn btn-secondary btn-md btn-acc"
                    >
                        Sign In
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
