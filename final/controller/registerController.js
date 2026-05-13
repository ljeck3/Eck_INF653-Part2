const User = require('../model/user');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
 
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate email." });
 
  try {
    const hashedPwd = await bcrypt.hash(password, 10); // 10 is the salt round
    const result = await User.create({ name: name, email: email, password: hashedPwd, role: role });
    
    console.log(result);
    res.status(201).json({ success: `New user ${name} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
module.exports = handleNewUser;