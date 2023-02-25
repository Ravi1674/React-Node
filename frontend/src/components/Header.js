import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { authActions } from "../store";

axios.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogOutRequest = async () => {
    const res = await axios.post("/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogOutRequest().then(() => dispatch(authActions.logout()));
    setAuth({});
    navigate("/login");
  };

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#002d40", marginBottom: "40px" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            component={Link}
            to="/"
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            MERN
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs>
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab
                    to="/login"
                    LinkComponent={Link}
                    label="Login"
                    style={{
                      fontWeight: "800",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                </>
              )}
              {isLoggedIn && (
                <>
                  <Tab
                    to="/welcome"
                    LinkComponent={Link}
                    label="Home"
                    style={{
                      fontWeight: "800",
                      fontSize: "1rem",
                      color: "white",
                    }}
                                  />
                                  <Tab
                    to="/dashboard"
                    LinkComponent={Link}
                    label="Dashboard"
                    style={{
                      fontWeight: "800",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                  <Tab
                    onClick={handleLogout}
                    to="/"
                    LinkComponent={Link}
                    label="Logout"
                    style={{
                      fontWeight: "800",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                </>
              )}{" "}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
