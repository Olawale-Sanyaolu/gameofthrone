const booksList = document.getElementById('books-list');
const loadMoreBtn = document.getElementById('load-more');
let currentPage = 1;

loadBooks(currentPage);

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadBooks(currentPage);
});

function loadBooks(page) {
    fetch(`https://anapioficeandfire.com/api/books?page=${page}&pageSize=20`)
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <h2>${book.name}</h2>
                    <p>Author: ${book.authors.join(', ')}</p>
                    <p>Number of Pages: ${book.numberOfPages}</p>
                    <p>Released: ${book.released}</p>
                `;
                booksList.appendChild(bookDiv);
            });

            if (data.length < 20) {
                loadMoreBtn.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching books:', error));
}