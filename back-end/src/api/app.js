const express = require('express');
const routes = require('../routes');
const handleError = require('../middlewares/handleError');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', routes.LoginRouter);

app.use(handleError);
module.exports = app;
