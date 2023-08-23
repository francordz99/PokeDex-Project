const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonListContainer = document.querySelector('.pokemon-list');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentPageUrl = apiUrl;

// Función para capitalizar palabras
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

async function fetchPokemonList(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        pokemonListContainer.innerHTML = '';

        data.results.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            const name = document.createElement('h3');
            name.textContent = capitalizeWords(pokemon.name.replace('-', ' '));
            const image = document.createElement('img');
            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;

            pokemonCard.appendChild(name);
            pokemonCard.appendChild(image);
            pokemonListContainer.appendChild(pokemonCard);
        });

        prevButton.disabled = !data.previous;
        nextButton.disabled = !data.next;

        currentPageUrl = url;
    } catch (error) {
        console.error('Error al cargar la lista de Pokémon:', error);
    }
}

prevButton.addEventListener('click', () => {
    if (currentPageUrl === apiUrl) {
        alert("No hay más Pokémon anteriores.");
    } else if (currentPageUrl.includes("offset=")) {
        const currentOffset = Number(currentPageUrl.split("offset=")[1].split("&")[0]);
        if (currentOffset === 0) {
            alert("No hay más Pokémon anteriores.");
        } else {
            fetchPokemonList(apiUrl + `?offset=${currentOffset - 20}&limit=20`);
        }
    }
});

nextButton.addEventListener('click', () => {
    if (currentPageUrl === apiUrl) {
        fetchPokemonList(apiUrl + "?offset=20&limit=20");
    } else if (currentPageUrl.includes("offset=")) {
        const currentOffset = Number(currentPageUrl.split("offset=")[1].split("&")[0]);
        fetchPokemonList(apiUrl + `?offset=${currentOffset + 20}&limit=20`);
    }
});

fetchPokemonList(apiUrl);
