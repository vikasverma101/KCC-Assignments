const topicSelect = document.getElementById("topic")
const searchBtn = document.getElementById("searchBtn")
const newsContainer = document.getElementById("newsContainer")
const loader = document.getElementById("loader")

const BASE_URL = "https://hn.algolia.com/api/v1/search?query="

// Fetch news function
async function fetchNews(topic){

loader.style.display = "block"
newsContainer.innerHTML = ""

try{

const response = await fetch(BASE_URL + topic)
const data = await response.json()

loader.style.display = "none"

displayNews(data.hits)

}catch(error){

loader.style.display = "none"
newsContainer.innerHTML = `<p class="error">Failed to load news</p>`

}

}

// Display news
function displayNews(articles){

newsContainer.innerHTML = ""

articles.forEach(article => {

if(!article.title) return

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `
<h3>${article.title}</h3>
<p>Author: ${article.author}</p>
<p>Points: ${article.points}</p>
<a href="${article.url}" target="_blank">Read More</a>
`

newsContainer.appendChild(card)

})

}

// Load on button click
searchBtn.addEventListener("click", () => {

const topic = topicSelect.value
fetchNews(topic)

})

// Load default news on page load
window.addEventListener("load", () => {

fetchNews("popular")

})