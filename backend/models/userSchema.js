const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  orders:{
    type: Array,
    required: false,
  },
  access:{
    type:Boolean,
    default:true,
    required:false,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = mongoose.model('User', userSchema);
