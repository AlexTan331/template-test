const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let requestCounter = 0;
let localQuotes = new Array();

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

function newQuote(data) {
  showLoadingSpinner();
  if (data.quoteAuthor === "") {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = data.quoteAuthor;
  }

  if (data.quoteText.length > 40) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.innerText = data.quoteText;

  hideLoadingSpinner();
}

async function getQuoteFromAPI() {

  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const api =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {

    const response = await fetch(proxyUrl + api);
    const data = await response.json();
    newQuote(data);

  } catch (err) {
    requestCounter++;

    if (requestCounter < 10) {
      getQuoteFromAPI();
    } else {    //read random quote from local
      const data = localQuotes[Math.floor(Math.random() * localQuotes.length)];
      console.log("read from local" + data.quoteText);
      newQuote(data);
    }
    console.log(err);
  }
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

newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

getQuoteFromLocal();
getQuoteFromAPI();
