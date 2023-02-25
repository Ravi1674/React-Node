const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return new Error(err);
    }
    if (existingUser === null) {
        return res
            .status(400)
            .json({ message: "User not found. Signup Please" });
    }
    const checkPassword = bcrypt.compareSync(password, existingUser.password);
    if (!checkPassword) {
        return res.status(400).json({ message: "Inavlid Email or Password" });
    }
    const accessToken = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.EXPIRE_TIME,
        }
    );

    console.log("Token Generated", accessToken);

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }

    res.cookie(String(existingUser._id), accessToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
    });

    return res.status(200).json({
        message: "Successfully Logged In",
        user: existingUser,
        accessToken,
    });
};

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
        res.status(404).json({ message: "Token not found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        req.id = user.id;
    });
    next();
};

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
};

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Token not found" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.EXPIRE_TIME,
        });
        console.log("Regenerated Token", token);

        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = user.id;
        next();
    });
};

const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Token not found" });
    }
    setAuth({});
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
    });
};

module.exports = {
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout
};
