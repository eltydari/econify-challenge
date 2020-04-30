const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');
require('dotenv').config();

const app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
  }));

const port = process.env.PORT ||8080;
app.listen(port, () => {
    console.log("Server started at http://localhost:" + port)
})
