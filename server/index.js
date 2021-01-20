'use strict';
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const { createServer}  = require('http');
const server = require('./graphql');
const db = require('./models/index');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

try {
  db.sequelize.sync().then(async () => {
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
  });
} catch (error) {
  console.log('Error connecting to db', error);
}
