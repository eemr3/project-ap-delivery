const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const handleError = require('../middlewares/handleError');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', routes.LoginRouter);
app.use('/products', routes.ProductRouter);
app.use('/register', routes.RegisterRouter);
app.use('/sales', routes.SalesRouter);

app.use(handleError);
module.exports = app;
