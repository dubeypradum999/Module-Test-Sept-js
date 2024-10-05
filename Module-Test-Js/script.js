// script.js

const API_KEY = 'dsN0dvIRWhLI51KW3iU1UjudBG0cWuXm0saLkKxg'; // Replace with your actual NASA API key
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Fetch the current image of the day when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    loadSearchHistory();
});

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('search-input').value;
    getImageOfTheDay(date);
});

// Fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    fetch(`${BASE_URL}?api_key=${API_KEY}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(err => console.error('Error fetching current image:', err));
}

// Fetch and display image for the selected date
function getImageOfTheDay(date) {
    fetch(`${BASE_URL}?api_key=${API_KEY}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory(date);
        })
        .catch(err => console.error('Error fetching image:', err));
}

// Display the fetched image in the UI
function displayImage(data) {
    const imageContainer = document.getElementById('image-container');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');

    imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
    imageTitle.textContent = data.title;
    imageDescription.textContent = data.explanation;
}

// Save the search date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

// Load search history from local storage and display it
function loadSearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => addSearchToHistory(date));
}

// Add a search date to the history list
function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
}
