//https://www.youtube.com/watch?v=7CqJlxBYj-M&t=1063s&ab_channel=freeCodeCamp.org

// connection
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; //db uri
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})


// routers
const usersRouter = require('./routes/users');
const tutorialsRouter = require('./routes/tutorials');




app.use('/tutorials', tutorialsRouter);
app.use('/users', usersRouter);






app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});
