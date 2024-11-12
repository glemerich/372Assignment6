/*
Name: Garrett Emerich
Date: 11/0/2024
  CSC 372-01

This is the script for the jokebook controller
*/
const jokebookModel = require('./jokebookModel');

module.exports = {
  getCategories: (req, res) => {
    jokebookModel.getCategories((err, categories) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve categories." });
      } else {
        res.json(categories);
      }
    });
  },


  getJokesByCategory: (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    jokebookModel.getJokesByCategory(category, limit, (err, jokes) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve jokes." });
      } else if (jokes.length === 0) {
        res.status(404).json({ error: "Category not found or no jokes available." });
      } else {
        res.json(jokes);
      }
    });
  },

  addJoke: (req, res) => {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
      res.status(400).json({ error: "Missing required fields: category, setup, and delivery." });
      return;
    }

    jokebookModel.addJoke(category, setup, delivery, (err, updatedJokes) => {
      if (err) {
        res.status(500).json({ error: "Failed to add joke." });
      } else {
        res.json({ message: "Joke added successfully", jokes: updatedJokes });
      }
    });
  }
};
