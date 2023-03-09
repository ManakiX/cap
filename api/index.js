const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3300;

const {errorHandling} = require('./middleware/ErrorHandling');
const routes = require('./routes/products');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ''); //need to add firebase link here
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, function(){
    console.log(`Server is running on port ${port}`)
});

// app.use(errorHandling);