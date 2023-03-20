const router = require('express').Router();
const User = require('../models/userSchema');
// const bcrypt = require('bcryptjs');
// import User from '../models/userSchema.js';

router.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        confirmPassword: req.body.confirmPassword,
        mobile: req.body.mobile,
        address: req.body.address,
        pincode: req.body.pincode
    });
    user.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

router.get('/users', (req, res) => {
    User.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
} 
);

module.exports = router;




