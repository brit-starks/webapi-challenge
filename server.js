const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const pjRouter = require('./data/helpers/project-router');
const actRouter = require('./data/helpers/action-router');


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/project', pjRouter);
server.use('/api/action', actRouter);

module.exports = server;