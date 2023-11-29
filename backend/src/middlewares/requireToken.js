import * as jwt from "jsonwebtoken";

export const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No se proveyó el token");
    }
    const  userId  = jwt.verify(token, 'mySuperSecretKey12345!');
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
