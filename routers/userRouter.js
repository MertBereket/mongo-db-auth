const router = require("express")();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../database/userSchema");
const {
  find,
  insert,
  update,
} = require("../middleware/validators/userValidator");
const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

router.post("/user", async (req, res) => {
  // const eMailExist = await User.findOne({ eMail: req.body.eMail });
  // if (eMailExist) return res.status(400).send("E-Mail already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.Password, salt);

  const user = User({
    _id: id,
    Name: req.body.Name,
    Surname: req.body.Surname,
    City: req.body.City,
    eMail: req.body.eMail,
    Password: hashedPassword,
    CreatedAt: req.body.CreatedAt,
  });
  user.save().then((result) => {
    console.log("User added!");
    mongoose.connection.close();
  });
  res.send({ user: user._id });
});

router.put("/user/:id", async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, user) {
      if (err) return next(err);
      res.send("User Updated");
    }
  );
});

router.get("/user/:id", async (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
});

router.delete("/user/:id", async (req, res) => {
  User.findByIdAndRemove(req.params._id, function (err) {
    if (err) return next(err);
    res.send("Delete User" + req.params._id);
  });
});

module.exports = router;
