let currentPage = 1;
const pageSize = 20;
const apiUrl = "https://anapioficeandfire.com/api/";

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

function displayCharacters(characters) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <h3>${character.name}</h3>
            <p>Gender: ${character.gender}</p>
            <p>Culture: ${character.culture}</p>
            <p>Aliases: ${character.aliases.join(', ')}</p>
        `;
        contentDiv.appendChild(characterDiv);
    });
}

function fetchCharacters(page) {
    const offset = (page - 1) * pageSize;
    const charactersUrl = `${apiUrl}characters?page=${page}&pageSize=${pageSize}`;
    fetchData(charactersUrl)
        .then(characters => displayCharacters(characters));
}

function nextPage() {
    currentPage++;
    fetchCharacters(currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(currentPage);
});