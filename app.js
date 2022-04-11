const express = require('express');
const app = express();
const morgan = require('morgan');
const vendorRoutes = require('./src/routes/vendor');
const restrauntRoutes = require('./src/routes/restraunt');
// const cors = require('cors');
// app.use(cors());


app.use(morgan('dev'));
app.use(express.json())

//Vendor Routes
app.use(vendorRoutes)

//Restraunt Routes
app.use(restrauntRoutes)

//App Level Error Handling
app.get("/", (req, res) => {
  res.json(
    {
      Credit : "Asheesh Singh has developed this Tiffny BellyFul App",gitHubLink:"https://github.com/asheeshsingh1",readmeLink:"https://github.com/asheeshsingh1/TodoApp#readme"
    })
});

module.exports = app;