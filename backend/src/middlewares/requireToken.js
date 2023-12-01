// @ts-ignore
import jwt from "jsonwebtoken";

export const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No se proveyó el token");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          throw err;  
      }
      req.userId = decoded.userId;  
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
