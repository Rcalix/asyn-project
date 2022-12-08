const API = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

const options = {
  method: 'GET',
};

const content = null || document.getElementById('content')
async function fetchData(urlApi) {
    const response = await(fetch(urlApi, options))
    const data = await response.json();
    return data;

}



(async () => {
    async function pokeSprite (url) {
        const pokemonProfile = await fetchData(url);
        return pokemonProfile.sprites.front_default
    }
    async function addSprite (pokemonList) {
        let newPokeList = [];
         for(let i = 0; i< pokemonList.results.length; i++ ) {
            const sprite = await pokeSprite(pokemonList.results[i].url);
            pokemonList.results[i].sprite = sprite
            newPokeList.push(pokemonList.results[i])
        };
        return newPokeList;
    }
    try {
        const pokemonList = await fetchData(API);
        const pokeL = await addSprite(pokemonList)
        let view = `
        ${pokeL.map( pokemon => `
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${pokemon.sprite}" alt="" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${pokemon.name}

          </h3>
        </div>
      </div>
        `).slice(0,100).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
