const apiKey = '';
const searchToNews = 'football';
const url = `https://newsapi.org/v2/everything?q=${searchToNews}&apiKey=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.articles);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
