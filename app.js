const express = require('express');
const app = express();
const morgan = require('morgan');
const vendorRoutes = require('./src/routes/vendor');
// const cors = require('cors');
// app.use(cors());


app.use(morgan('dev'));
app.use(express.json())

//Vendor Routes
app.use(vendorRoutes);

//App Level Error Handling
app.use((next) =>
{
    const error = new Error('API Not Found');
    error.status = 404;
    next(error);
})

app.use((error,res) =>
{
    res.status(error.status || 500);
    res.json({
        error: 
        {
            errorMessage: error.message
        }
    })
})

module.exports = app;