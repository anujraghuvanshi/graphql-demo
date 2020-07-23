const express = require('express');
const graphqlHTTP = require("express-graphql")
const schema = require('./schema/schemaa')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/ninja_reading';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',() => {
    console.log('connected to database');
})
mongoose.connection.once('error',() => {
    console.log('connected to database failed');
})

app.use(cors());


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () =>{
    console.log('listening for request on port 4000');
})