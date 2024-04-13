const asyncHandler = require('express-async-handler');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
//   res.json({ message: "Register the user" });
const { username, email, password } = req.body;
if (!username || !email || !password) {
  res.status(400).json({ error: "All fields are mandatory!" });
  return;
}
const userExists = await User.findOne({ email });
if (userExists) {
  res.status(400).json({ error: "User already registered!" });
  return;
}

const user = await User.create({
  username,
  email,
  password
});
console.log(`User created ${user}`);
if(user){
  res.status(201).json({_id:user.id,email:user.email});

}else{
  res.status(400);
  throw new Error("User data is not valid");
}
res
res.json({message:"Register the user"});

});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});
//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user Information" });
});

module.exports = { registerUser, loginUser, currentUser };
