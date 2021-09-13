const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const gatewaysRouter = require('./routes/gateways');
const devicesRouter = require('./routes/devices');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', [process.env.CLIENT_URL]);
  res.append('Access-Control-Allow-Methods', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', indexRouter);
app.use('/gateways', gatewaysRouter);
gatewaysRouter.use('/:gatewayId/devices', devicesRouter);

module.exports = app;
