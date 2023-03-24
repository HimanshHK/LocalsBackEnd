const router = require('express').Router();
const Product = require('../models/product');

router.post('/product', (req, res) => {
    var k=false;
    if(req.body.stock>0) k=true;
    console.log(req.body)
    new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        company : req.body.company,
        stock : req.body.stock,
        reviews : req.body.reviews,
        stars : Math.random() * 2 + 3,
        reviews : Math.floor(Math.random(100)),
        shipping : k,
    }).save();
    
}
)   
router.get('/products', (req, res) => {
    Product.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
} )

router.get('/products/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id,"hi");
    Product.findById(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });

})
module.exports = router;