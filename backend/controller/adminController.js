const UserModal = require("../models/userModal");

//GET Route


//POST Route
exports.postBlockUser = (req, res, next) => {
    UserModal.findOne({email: req.body.email}).then((user) => {
        if (!user) {
            return res.status(403).json({message: "User does not exists"})
        }
        user.blocked = true;
        user.save().then((result) => {
            console.log(result)
            return res.status(201).json({message: "User has been blocked!!!", result: result})
        });
    })
};
