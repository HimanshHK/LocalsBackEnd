const ProductModal = require("../models/productModal");

// GET Methods
exports.getProducts = (req, res) => {
  ProductModal.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  // console.log(id, "hi");
  ProductModal.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

// POST Methods
exports.postProduct = (req, res) => {
  let k = false;
  if (req.body.stock > 0) k = true;
  console.log(req.body);
  new ProductModal({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    company: req.body.company,
    stock: req.body.stock,
    reviews: req.body.reviews,
    stars: Math.random() * 2 + 3,
    reviews: Math.floor(Math.random(100)),
    shipping: k,
  }).save();
};
