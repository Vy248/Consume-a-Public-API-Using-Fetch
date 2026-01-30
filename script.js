// Selecting UI elements
const fetchBtn = document.getElementById('fetch-btn');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const loader = document.getElementById('loader');

/**
 * Function to fetch data from a public API [cite: 12]
 * Uses async/await for cleaner asynchronous code [cite: 26]
 */
async function getQuoteData() {
    // Show loader and hide old text [cite: 16]
    loader.classList.remove('hidden');
    quoteText.classList.add('hidden');
    authorText.innerText = "";

    try {
        // Fetching from a free public API [cite: 10]
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));

        // Handle failed response [cite: 15]
        if (!response.ok) throw new Error("Network response was not ok");

        const wrapper = await response.json();
        const data = JSON.parse(wrapper.contents); // Extracting required fields [cite: 13]

        // Update DOM dynamically [cite: 14]
        quoteText.innerText = `"${data[0].q}"`;
        authorText.innerText = `- ${data[0].a}`;
    } catch (error) {
        // Error handling [cite: 15]
        quoteText.innerText = "Error: Could not connect to API. Please try again.";
        console.error("API Error:", error);
    } finally {
        // Hide loader after completion [cite: 16]
        loader.classList.add('hidden');
        quoteText.classList.remove('hidden');
    }
}

// Event Listener 
fetchBtn.addEventListener('click', getQuoteData);