
// connection
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();
require('./passport')(passport)
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
//passport
app.use(passport.initialize());
app.use(passport.session());

// routers
const patientsRouter = require('./routes/patients');
const tutorialsRouter = require('./routes/tutorials');
const pharmacistsRouter = require('./routes/pharmacists');
const pharmacyRouter = require('./routes/pharmacy');
const adminRouter = require('./routes/admin');
const FAQRouter = require('./routes/FAQ');
const eventRouter = require('./routes/events');



app.use('/tutorials', tutorialsRouter);
app.use('/patients', patientsRouter);
app.use('/pharmacists', pharmacistsRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/admin', adminRouter);
app.use('/FAQs', FAQRouter);
app.use('/events', eventRouter);




app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});
