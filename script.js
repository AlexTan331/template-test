const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let localQuotes = [];
let apiQuotes = [];
const api = "https://type.fit/api/quotes";

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote() {
  showLoadingSpinner();
  let data;
  if (!apiQuotes) {
    data = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  } else {
    data = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  }

  if (data.author === "") {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = data.author;
  }

  if (data.text.length > 40) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.innerText = data.text;

  hideLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();

  try {
    const response = await fetch(api);
    apiQuotes = await response.json();
  } catch (err) {
    getQuoteFromLocal();
    console.log(err);
  }

  newQuote();
}

function getQuoteFromLocal() {
  var request = new XMLHttpRequest();
  request.open("GET", "localQuotes.json", false);
  request.send(null);
  var data = JSON.parse(request.responseText);
  localQuotes = data.localQuotes;
}

// Twitter Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -- ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
