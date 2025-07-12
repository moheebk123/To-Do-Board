import * as userServices from "../services/user.services.js";
import * as authServices from "../services/auth.services.js";

export const handleRegister = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existedUser = await userServices.getUserByUserName(userName);
    if (existedUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await authServices.hashPassword(password);

    const user = await userServices.createUser({
      userName,
      password: hashedPassword,
      refreshToken: "",
    });

    const accessToken = authServices.generateToken(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      "15m"
    );

    const refreshToken = authServices.generateToken(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      "7d"
    );

    await userServices.updateRefreshToken(user._id, refreshToken);

    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully",
        success: true,
        user: { _id: user._id, userName: user.userName },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await userServices.getUserByUserName(userName);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist", success: false });
    }

    const isCorrect = await authServices.isPasswordCorrect(
      password,
      user.password
    );
    if (!isCorrect) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const accessToken = authServices.generateToken(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      "15m"
    );

    const refreshToken = authServices.generateToken(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      "7d"
    );

    await userServices.updateRefreshToken(user._id, refreshToken);

    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        success: true,
        user: { _id: user._id, userName: user.userName },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const handleLogout = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    await userServices.updateRefreshToken(req.user._id, "");

    return res
      .status(200)
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const handleUserSession = async (req, res) => {
  if (req.user) {
    const { _id, userName } = req.user;
    return res.status(200).json({ success: true, user: { _id, userName } });
  } else {
    return res.status(200).json({ success: false });
  }
};
