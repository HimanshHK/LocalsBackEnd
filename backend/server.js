//initialize express, mongoose and body-parser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001 || process.env.PORT;
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const feedsRoutes = require("./routes/feedsRoutes");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

//connect to mongodb
mongoose.connect("mongodb://0.0.0.0:27017/ShopDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//cloud mongodb
// mongoose.connect('mongodb+srv://himanshuhk:uV9qtrWrNYdcu0wW@shopdb.vcwnuof.mongodb.net/shopdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to database mongodb @ 27017");
});

// Create a write stream to a file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Add Morgan logs
app.use(morgan("combined", { stream: accessLogStream }));

//adding multer middleware
// Set up Multer middleware

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

//added multer middleware
mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("Error in database connection: " + err);
  }
});

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyParser.json());

//static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "../shared/uploads")));

app.use(adminRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(feedsRoutes);

app.listen(port, () => {
  console.log("Server started at port: " + port);
});
