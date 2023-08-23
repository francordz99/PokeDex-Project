// Obtén los elementos HTML que necesitas
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonSearchDiv = document.querySelector(".pokemon-search");

// Agregar evento para buscar al presionar Enter
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}/`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPokemonDetails(data);
        })
        .catch(error => {
            console.error("Error fetching Pokemon data:", error);
            displayErrorMessage("Pokemon no encontrado");
        });
});

function capitalizeAbilityName(name) {
    return name
        .split('-')
        .map(part => capitalizeWords(part))
        .join(' ');
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function displayPokemonDetails(pokemon) {
    const abilitiesHTML = pokemon.abilities
        .map(
            ability =>
                `<li>${capitalizeAbilityName(ability.ability.name)} (Slot: ${ability.slot}, ${ability.is_hidden ? "Oculta" : "No oculta"
                })</li>`
        )
        .join("");

    const formsHTML = pokemon.forms
        .map(form => `<li>${capitalizeWords(form.name)}</li>`)
        .join("");

    const detailsHTML = `
        <h2>${capitalizeWords(pokemon.name)}</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
        <div class="card-columns">
            <div class="card-column">
                <h3>Habilidades:</h3>
                <ul>${abilitiesHTML}</ul>
            </div>
            <div class="card-column">
                <h3>Experiencia Base:</h3>
                <p>${pokemon.base_experience}</p>
            </div>
            <div class="card-column">
                <h3>Formas:</h3>
                <ul>${formsHTML}</ul>
            </div>
        </div>
    `;

    pokemonSearchDiv.innerHTML = detailsHTML;
}

function displayErrorMessage(message) {
    pokemonSearchDiv.innerHTML = `<p>${message}</p>`;
}
