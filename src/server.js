import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';

const app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
  }));

const port = process.env.PORT ||8080;
app.listen(port, () => {
    console.log("Server started at http://localhost:" + port)
})
