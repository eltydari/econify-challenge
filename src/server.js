import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => 'Hello world!' };

const app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

const port = process.env.PORT ||8080;
app.listen(port, () => {
    console.log("Server started at http://localhost:" + port)
})
