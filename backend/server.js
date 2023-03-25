//initialize express, mongoose and body-parser
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express();
const port = 3001 || process.env.PORT;


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shop API',
            version: '1.3.0',
            description: 'A simple Express Shop API',
        },
        servers: [  
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./controller/*.js'],
};

const swaggerjsdoc =   swaggerDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjsdoc))
const userRoutes = require('./controller/userRoutes.js');
const productRoutes = require('./controller/productRoutes');
const feedsRoutes = require('./controller/feedsRoute');

//connect to mongodb
mongoose.connect('mongodb://0.0.0.0:27017/ShopDB', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://himanshuhk:uV9qtrWrNYdcu0wW@shopdb.vcwnuof.mongodb.net/shopdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://himanshuhk2:wbdgroup37@shopdb.vcwnuof.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use(productRoutes);
app.use(feedsRoutes);
app.listen(port, () => {
    console.log('Server started at port: ' + port);
}
);






