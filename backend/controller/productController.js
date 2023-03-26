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
  console.log(req.body);
  const product = new ProductModal({
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
  });

  product
    .save()
    .then((result) =>
      res
        .status(200)
        .json({ message: "Product has been added", result: result })
    ).catch(err => {
      res.status(403).json({message: "Something went wrong"})
    });
};
