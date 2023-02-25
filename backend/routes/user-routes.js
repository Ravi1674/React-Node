const express = require("express");
const { dashboard } = require("../controllers/dashboard-controller");
const {
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
} = require("../controllers/user-controller");

const router = express.Router();
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.get("/dashboard", dashboard)

module.exports = router;
