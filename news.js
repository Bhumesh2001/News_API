document.addEventListener('DOMContentLoaded', () => {
    let searchToNews = 'Latest News';
    const fetchAndDisplayNews = () => {
        const apiKey = '';
        const flexContainer = document.querySelector('.flex-container');
        const heading = document.querySelector('.heading');
        const url = `https://newsapi.org/v2/everything?q=${searchToNews}&apiKey=${apiKey}`;
        flexContainer.innerHTML = '';
        heading.textContent = searchToNews;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.articles.forEach(article => {
                    if (article.title && article.description && article.urlToImage) {
                        const flex_box_div = document.createElement('div');
                        const imgTag = document.createElement('img');
                        const h3Tag = document.createElement('h3');
                        const ptag = document.createElement('p');

                        flex_box_div.className = 'flex-box';
                        imgTag.src = article.urlToImage;
                        h3Tag.textContent = article.title;
                        ptag.textContent = article.description;

                        flex_box_div.appendChild(imgTag);
                        flex_box_div.appendChild(h3Tag);
                        flex_box_div.appendChild(ptag);
                        flexContainer.appendChild(flex_box_div);
                    };
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    fetchAndDisplayNews();
    const h4Elements = document.querySelectorAll('h4');
    h4Elements.forEach(h4 => {
        h4.addEventListener('click', () => {
            searchToNews = h4.textContent.toString();
            fetchAndDisplayNews();
        });
    });
});
