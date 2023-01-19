const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

 const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status === 200) {
        const data = await APIresponse.json()
        return data;
    } 

    
}  // Fazendo a requisição da pokeapi e pegando os dados da api

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon); // Retorna os dados para renderizar o pokemon

    if(data) {
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] // Acessar sprites da Gen°5
        pokemonNumber.innerHTML = data.id // Renderizando o id do pokemon
        pokemonName.innerHTML = data.name // Renderizando o nome do pokemon
        input.value = ''
        searchPokemon = data.id // Evita que se tiver em numero alto, volte do começo da pokedex
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
    }

} // Renderizando os dados da api no meu html



form.addEventListener('submit' , (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
    
    
}) // Pega o valor/nome no input e retorna o nome e foto do pokemon corresponde 

buttonPrev.addEventListener('click' , () => {

    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
  
})

buttonNext.addEventListener('click' , () => {

    
    searchPokemon += 1
        renderPokemon(searchPokemon)
 
})

renderPokemon() // Função responsavel por renderizar os dados do pokemon (Nome, Id e Imagem)

renderPokemon(searchPokemon)