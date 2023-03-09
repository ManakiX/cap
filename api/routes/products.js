const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const {control} = require('../controller/index');

const controller = new control();

//USER ROUTES
router.get('^/$|/Archie-VableGaming', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
})

router.get('/users', controller.fetchUsers);

router.get('/users/:id', controller.fetchUser);

router.post('/login', bodyParser.json(), controller.login)

router.post('/register', bodyParser.json(), controller.createUser);

router.patch('/users/:id', bodyParser.json(), controller.updateUser)

router.delete('/users/:id', controller.deleteUser);

//PRODUCTS ROUTES
router.get('/products', controller.fetchProducts);

router.get('/products/:id', controller.fetchProduct);

router.post('/products', bodyParser.json(), controller.createProduct);

router.patch('/products/:id', bodyParser.json(), controller.updateProduct);

router.delete('/products/:id', controller.deleteProduct);

module.exports = router