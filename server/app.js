const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use('/graphql', expressGraphql({ 
	schema,
	graphiql: true
}));
app.listen(4000,() => {
	console.log("Now listening for request from port 4000");
});

