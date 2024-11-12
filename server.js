/*
Name: Garrett Emerich
Date: 11/10/2024
  CSC 372-01

This is the main script for the node server
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jokebookRoutes = require('./jokebookRoutes'); 

const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/jokebook', jokebookRoutes);

app.use(express.static(__dirname));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
