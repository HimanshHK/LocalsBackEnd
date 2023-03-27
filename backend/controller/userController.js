const UserModal = require("../models/userModal");
const bcrypt = require("bcrypt");

// GET Methods
exports.getBlockedUsers = (req, res, next) => {
  return UserModal.find({ blocked: true }).then((user)=>{
    console.log(user);
    if(!user)
    return res.status(401).json({ message: "No user exist"});
    else
    return res.status(200).json({ message: "Logged in", user: user })
  })

  // console.log(user)
};

exports.getUsers = (req, res, next) => {
  UserModal.find()
    .then((data) => {
      // console.log(data)
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  // console.log(id, "hi");
  UserModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};
// POST Methods
exports.postUser = (req, res, next) => {
  console.log(req.body);
  UserModal.findOne({ email: req.body.username }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // return bcrypt.compare(password, req.body.password);
    console.log(user);
    bcrypt.compare(req.body.password, user.password).then((doMatch) => {
      if (doMatch) {
        return res.status(200).json({ message: "Logged in", user: user });
      }
      return res.status(401).json({ message: "Invalid password" });
    }).catch((err) => {
      console.log(err);
      return res.json({ message: err });
    });
  });
};

exports.postRegister = (req, res, next) => {
  console.log(req.body);
  const user = new UserModal({
    name: req.body.name,
    password: req.body.password,
    profilePicUrl: req.file?.path
      .toString()
      .replace(/\\/g, "/")
      .split("shared/")
      .slice(1)
      .join(""),
    email: req.body.email,
    confirmPassword: req.body.confirmPassword,
    mobile: req.body.mobile,
    address: req.body.address,
    pincode: req.body.pincode,
    blocked: false,
    type: req.body.type,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
};
