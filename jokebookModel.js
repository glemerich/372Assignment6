/*
Name: Garrett Emerich
Date: 11/10/2024
  CSC 372-01

This is the script for the jokebook model
*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/jokebook.db');

module.exports = {
  getCategories: function(callback) {
    db.all("SELECT name FROM categories", [], (err, rows) => {
      if (err) console.log("Database error:", err);
      callback(err, rows);
    });
  },

  getJokesByCategory: function(category, limit, callback) {
    // query to order results randomly
    const query = limit ? 
      `SELECT setup, delivery FROM jokes 
       JOIN categories ON jokes.category_id = categories.id 
       WHERE categories.name = ? 
       ORDER BY RANDOM() LIMIT ?` : 
      `SELECT setup, delivery FROM jokes 
       JOIN categories ON jokes.category_id = categories.id 
       WHERE categories.name = ? 
       ORDER BY RANDOM()`; 

    const params = limit ? [category, limit] : [category];
    
    db.all(query, params, (err, rows) => {
      callback(err, rows);
    });
  },

  addJoke: function(category, setup, delivery, callback) {
    db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
      if (err || !row) {
        callback("Category not found");
        return;
      }

      const categoryId = row.id;
      db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", 
        [categoryId, setup, delivery], 
        (err) => {
          if (err) callback(err);
          else this.getJokesByCategory(category, null, callback);
      });
    });
  }
};
