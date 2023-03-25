const UserModal = require("../models/userModal");
const bcrypt = require('bcrypt');

// GET Methods
exports.getUser = (req, res, next) => {
  return UserModal.findOne({ username: username })
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return bcrypt.compare(password, user.password);
    })
    .then(match => {
      if (!match) {
        throw new Error('Invalid password');
      }
      return user;
    })
    .catch(err => {
      throw err;
    });
};

// POST Methods
exports.postUser = (req, res) => {
  console.log(req.body);
  UserModal.findOne({ email: req.body.username })
    .then(user => {
      // return bcrypt.compare(password, req.body.password);
      console.log(user);
      res=bcrypt.compare(req.body.password, user.password)
      console.log(res)
      if (user) {
        res=bcrypt.compare(req.body.password, user.password)
        
        if(res){
          return user;
        }
      }
      else 
      return null;
    })
    
};


exports.postRegister = (req, res) => {
  const user = new UserModal({
    name: req.body.name,
    password: req.body.password,
    profilePicUrl: req.file?.path.toString().replace(/\\/g, "/").split("shared/").slice(1).join(""),
    email: req.body.email,
    confirmPassword: req.body.confirmPassword,
    mobile: req.body.mobile,
    address: req.body.address,
    pincode: req.body.pincode,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
