const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const handleLogin = async (req, res) => {
  const { name, email, password } = req.body;
 
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
 
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
  
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      { email: foundUser.email, role: foundUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
      );

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
 
module.exports = handleLogin;