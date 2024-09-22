import jwt from "jsonwebtoken";

export function authenticationToken(req, res, next) {
  if (req.url.includes("auth") || req.url.includes("otp")) {
    return next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

export function generateAccessToken(userModel) {
  return jwt.sign(
    { userId: userModel._id, email: userModel.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
}
