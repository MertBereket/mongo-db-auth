const router = require("express")();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../database/userSchema");
const { register, login } = require("../middleware/validators/authValidator");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.Password, salt);

  const user = User({
    Name: req.body.Name,
    Surname: req.body.Surname,
    City: req.body.City,
    eMail: req.body.eMail,
    Password: hashedPassword,
    CreatedAt: req.body.CreatedAt,
  });
  res.send("User registered");
  user.save();
});

router.post("/login", async (req, res) => {
  const { error } = login(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ eMail: req.body.eMail });
  if (!user) return res.status(400).send("Email is wrong!");

  const validPass = await bcrypt.compare(req.body.Password, user.Password);

  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.API_KEY);
  res.json({ token: token });
});

module.exports = router;
