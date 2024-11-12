/*
Name: Garrett Emerich
Date: 11/10/2024
  CSC 372-01

This is the script for the jokebook routes
*/

const express = require('express');
const router = express.Router();
const jokebookController = require('./jokebookController'); 

// Route to get all categories
router.get('/categories', jokebookController.getCategories);

// Route to get jokes by category
router.get('/joke/:category', jokebookController.getJokesByCategory);

// Route to add a new joke
router.post('/joke/new', jokebookController.addJoke);

module.exports = router;
