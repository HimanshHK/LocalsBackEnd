//initialize express, mongoose and body-parser
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001 || process.env.PORT;
// import userRoot from './controller/userRoot.js';
const userRoutes = require('./controller/userRoutes.js');
// import productRoot from './controller/productRoot.js';

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ShopDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
}
);

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection: ' + err);
    }
}
);

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

app.use(userRoutes);


app.listen(port, () => {
    console.log('Server started at port: ' + port);
}
);






