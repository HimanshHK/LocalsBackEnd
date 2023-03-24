const router = require('express').Router();
const Feeds = require('../models/feeds.js');

router.post('/feeds', (req, res) => {
    new Feeds({
        id: req.body.id,
        mail: req.body.mail,
        msg: req.body.msg,
    }).save();
    res.json({ message: 'Feed added successfully' });

})

router.get('/feeds', (req, res) => {
    Feeds.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
}
)

module.exports = router;