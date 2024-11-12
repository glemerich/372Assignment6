const BASE_URL = 'http://localhost:3000';

// Centralized API Request Function with Enhanced Logging and Error Handling
async function apiRequest(endpoint, options = {}) {
  // Set default method to GET if no method is provided
  options.method = options.method || 'GET';

  // Log the request details
  console.log(`Sending ${options.method} request to: ${BASE_URL}${endpoint}`);
  console.log("Request options:", options);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const data = await response.json();
    console.log("Response data:", data); // Log response data for debugging
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null; // Return null to signal an error occurred
  }
}

// Fetch and display all categories
async function fetchCategories() {
  const categories = await apiRequest('/jokebook/categories');
  if (!categories) {
    console.error("Could not retrieve categories.");
    alert("Failed to load categories. Please try again.");
    return;
  }

  const categoryList = document.getElementById('category-list');
  categoryList.innerHTML = '';
  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category.name;
    categoryList.appendChild(li);
  });
}

// Fetch and display a random joke from the "funnyJoke" category
async function fetchRandomJoke() {
  const jokes = await apiRequest('/jokebook/joke/funnyJoke?limit=1');
  if (!jokes || jokes.length === 0) {
    console.error("Could not retrieve random joke.");
    alert("Failed to load a random joke. Please try again.");
    return;
  }

  document.getElementById('joke-setup').textContent = jokes[0].setup;
  document.getElementById('joke-delivery').textContent = jokes[0].delivery;
}

// Search for jokes in a specified category
async function searchJokes() {
  const category = document.getElementById('category-input').value;
  const jokes = await apiRequest(`/jokebook/joke/${category}`);
  const jokeList = document.getElementById('joke-list');
  jokeList.innerHTML = '';

  if (!jokes) {
    console.error("Could not retrieve jokes for the specified category.");
    alert("Failed to load jokes for the specified category. Please try again.");
    return;
  }

  if (jokes.error) {
    jokeList.innerHTML = `<li>${jokes.error}</li>`;
  } else {
    jokes.forEach(joke => {
      const li = document.createElement('li');
      li.textContent = `${joke.setup} - ${joke.delivery}`;
      jokeList.appendChild(li);
    });
  }
}

// Add a new joke to a specified category
async function addJoke(event) {
  event.preventDefault();

  const category = document.getElementById('new-category').value;
  const setup = document.getElementById('new-setup').value;
  const delivery = document.getElementById('new-delivery').value;

  const result = await apiRequest('/jokebook/joke/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, setup, delivery })
  });

  if (!result) {
    console.error("Could not add the new joke.");
    alert("Failed to add the joke. Please try again.");
    return;
  }

  alert(result.message || "Joke added successfully!");
  fetchCategories();
}

// Initial fetch for categories and a random joke
fetchCategories();
fetchRandomJoke();
