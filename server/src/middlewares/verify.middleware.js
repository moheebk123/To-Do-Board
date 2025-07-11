import * as userServices from "../services/user.services.js";
import * as authServices from "../services/auth.services.js";

export const verifyAuthentication = async (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;
  if (!access_token && !refresh_token) {
    req.user = null;
    return next();
  }

  try {
    const decodedAccessToken = authServices.verifyToken(access_token);
    const loggedUser= await userServices.getUserById(decodedAccessToken?.id);
    if (loggedUser) {
      req.user = loggedUser;
    }

    return next();
  } catch (error) {
    if (refresh_token) {
      try {
        const decodedRefreshToken = authServices.verifyToken(
          refresh_token,
          process.env.JWT_REFRESH_SECRET
        );

        if (!decodedRefreshToken) {
          req.user = null;
          return next();
        }

        const loggedUser = await userServices.getUserById(
          decodedRefreshToken?.id
        );

        if (loggedUser) {
          const newAccessToken = authServices.generateToken(
            {
              id: loggedUser._id,
              userName: loggedUser.userName,
            },
            process.env.JWT_SECRET,
            "1m"
          );

          req.user = loggedUser;
          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
          });
          return next();
        }
      } catch (error) {
        req.user = null;
        return next();
      }
    }
    req.user = null;
    return next();
  }
};
