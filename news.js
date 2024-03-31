document.addEventListener('DOMContentLoaded', () => {
    let searchToNews = 'Latest News';
    const apiKey = '0cc8a8c85e3444b1bef66fe6fc6d82e1';
    const flexContainer = document.querySelector('.flex-container');
    const heading = document.querySelector('.heading');
    const iconId = document.querySelector('.btn-icon-content');
    const input_search = document.querySelector('#input-search');

    let previousSearchValue = '';
    iconId.addEventListener('click', () => {
        const searchValue = input_search.value.trim();
        if (searchValue !== '' && searchValue !== previousSearchValue) {
            previousSearchValue = searchValue;
            searchToNews = searchValue;
            fetchAndDisplayNews();
        };
    });
    const showLoader = () => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        flexContainer.innerHTML = '';
        heading.textContent = searchToNews;
        flexContainer.appendChild(loader);
    };
    const hideLoader = () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        };
    };
    const fetchAndDisplayNews = () => {
        const url = `https://newsapi.org/v2/everything?q=${searchToNews}&apiKey=${apiKey}`;
        showLoader();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    hideLoader();
                    if (data.totalResults !== 0) {
                        data.articles.forEach(article => {
                            if (article.title && article.description && article.urlToImage && article.url) {
                                const flex_box_div = document.createElement('div');
                                const readDiv = document.createElement('div');
                                const imgTag = document.createElement('img');
                                const h3Tag = document.createElement('h3');
                                const ptag = document.createElement('p');
                                const aTag = document.createElement('a');

                                flex_box_div.className = 'flex-box';
                                imgTag.src = article.urlToImage;
                                imgTag.draggable = false;
                                h3Tag.textContent = article.title;
                                ptag.textContent = article.description;
                                aTag.href = article.url;
                                aTag.draggable = false;
                                aTag.target = "_blank";
                                aTag.textContent = 'Read More'
                                readDiv.className = "read";
                                aTag.className = 'read-more-btn';

                                flex_box_div.appendChild(imgTag);
                                flex_box_div.appendChild(h3Tag);
                                flex_box_div.appendChild(ptag);
                                readDiv.appendChild(aTag);
                                flex_box_div.appendChild(readDiv);
                                flexContainer.appendChild(flex_box_div);
                            };
                        });
                    } else {
                        const contentDiv = document.createElement('div');
                        const h1Content = document.createComment('h1');
                        const pContent = document.createElement('p');

                        contentDiv.className = 'container';
                        h1Content.className = 'status-code';
                        pContent.className = 'content';
                        h1Content.textContent = '404';
                        pContent.textContent = 'Oops! Articles not found.';

                        contentDiv.appendChild(h1Content);
                        contentDiv.appendChild(pContent);
                        flexContainer.appendChild(contentDiv);
                    };
                }, 1000);
            })
            .catch(error => {
                hideLoader();
                console.error('Error fetching data:', error);
            });
    };
    fetchAndDisplayNews();
    const h4Elements = document.querySelectorAll('h4');
    h4Elements.forEach(h4 => {
        h4.addEventListener('click', () => {
            searchToNews = h4.textContent.toString();
            input_search.value = '';
            fetchAndDisplayNews();
        });
    });
});