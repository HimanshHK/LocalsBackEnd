const OrdersModal = require("../models/ordersModal");

// GET Methods
exports.getOrders = (req, res) => {
  OrdersModal.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

// exports.getProduct = (req, res) => {
//   const id = req.params.id;
//   // console.log(id, "hi");
//   ProductModal.findById(id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json({ message: err });
//     });
// };

// POST Methods
exports.postOrders = (req, res) => {
  arr=[]
  console.log(req.body)
  for(let i=1;i<req.body.length;i++){
    arr.push(req.body[i])
    }

  const orders = new OrdersModal({
    buyerEmail: req.body[0].buyerEmail,
    sellerEmail: req.body[0].sellerEmail,
    cartItems: arr,
  });

  console.log(orders)

  orders.save().then((result) =>
      res
        .status(200)
        .json({ message: "Orders has been placed", result: result })
    ).catch(err => {
      res.status(403).json({message: "Something went wrong"})
    });

};
