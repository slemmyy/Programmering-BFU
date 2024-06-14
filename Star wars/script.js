console.log('Hello world');

const starWarsButton = document.querySelector('#star-wars-button');
const starWarsPlanetButton = document.querySelector('#star-wars-planet-button');
const characterInput = document.querySelector('#character-input');
const planetInput = document.querySelector('#planet-input');
const characterDisplay = document.querySelector('#character-display');
const planetDisplay = document.querySelector('#planet-display');

starWarsButton.addEventListener('click', () => {
    getCharacterFromApi();
});

starWarsPlanetButton.addEventListener('click', () => {
    getPlanetFromApi();
});

async function getCharacterFromApi() {
    const baseUrl = 'https://swapi.dev/api/people/?search=';
    const characterName = characterInput.value.trim();

    if (!characterName) {
        characterDisplay.innerText = 'Please enter a character name.';
        return;
    }

    const fullUrl = baseUrl + characterName;
    const settings = {
        method: 'GET'
    };

    try {
        const response = await fetch(fullUrl, settings);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.results.length > 0) {
            const character = data.results[0];
            const characterDetails = `
                Name: ${character.name}
                Height: ${character.height}
                Mass: ${character.mass}
                Hair Color: ${character.hair_color}
                Skin Color: ${character.skin_color}
                Eye Color: ${character.eye_color}
                Birth Year: ${character.birth_year}
                Gender: ${character.gender}
            `;
            characterDisplay.innerText = characterDetails;
        } else {
            characterDisplay.innerText = 'Character not found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        characterDisplay.innerText = 'Failed to load character data.';
    }
}

async function getPlanetFromApi() {
    const baseUrl = 'https://swapi.dev/api/planets/?search=';
    const planetName = planetInput.value.trim();

    if (!planetName) {
        planetDisplay.innerText = 'Please enter a planet name.';
        return;
    }

    const fullUrl = baseUrl + planetName;
    const settings = {
        method: 'GET'
    };

    try {
        const response = await fetch(fullUrl, settings);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.results.length > 0) {
            const planet = data.results[0];
            const planetDetails = `
                Name: ${planet.name}
                Rotation Period: ${planet.rotation_period}
                Orbital Period: ${planet.orbital_period}
                Diameter: ${planet.diameter}
                Climate: ${planet.climate}
                Gravity: ${planet.gravity}
                Terrain: ${planet.terrain}
                Surface Water: ${planet.surface_water}
                Population: ${planet.population}
            `;
            planetDisplay.innerText = planetDetails;
        } else {
            planetDisplay.innerText = 'Planet not found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        planetDisplay.innerText = 'Failed to load planet data.';
    }
}