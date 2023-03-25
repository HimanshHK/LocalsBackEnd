const router = require('express').Router();
const User = require('../models/userSchema');
const bcrypt= require('bcrypt');
const {json} = require("express");

router.post('/users', (req, res) => {
    new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        confirmPassword: req.body.confirmPassword,
        mobile: req.body.mobile,
        address: req.body.address,
        pincode: req.body.pincode
    }).save()
    res.json({ message: 'You are now a happy customer' });
});

router.post('/login',(req, res)=>{
    const password = req.body.password;

// Find the user with the specified email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // User not found, return an error
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }

            // Use bcrypt.compare() to compare the password sent by the user with the hashed password in the database
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    // Handle the error
                    return res.status(401).json({ message: 'Authentication failed. Passwords do not match.' });
                }

                if (result) {
                    if(user.access==false)
                        return res.status(404).json({message:'You have been blocked!',loggedIn:false})
                    // Passwords match, authentication successful
                    console.log('matched')
                    return res.status(200).json({ message: 'Authentication successful.', user: user,loggedIn:true });
                } else {
                    // Passwords do not match, return an error
                    console.log('mot matched')
                    return res.status(401).json({ message: 'Authentication failed. Passwords do not match.',loggedIn:false });
                }
            });
        })
        .catch(err => {
            // Handle the error
            return res.status(500).json({ error: err });
        });

    // User.findOne({email:req.body.email}).then(result => {
    //        const auth = result;
    //        bcrypt.compare(auth.password,req.body.password,(err,resul)=>{
    //            if(resul) {
    //                res.json({auth : auth,
    //                    loggedIn:true,})
    //                console.log(resul)
    //            } else {
    //                console.log('not matched')
    //                res.json({message: 'Wrong Password! Try again!',loggedIn:false})
    //            }
    //        })})
    //         .then(match => {
    //
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })
    //     }
    // ).catch(err=>
    // console.log(err))

})
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




