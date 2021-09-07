$(document).ready(function() {

	let nextPage = "https://pokeapi.co/api/v2/pokemon/";


	$("#next-pokemons").click(function(e){
		e.preventDefault();
        $(".pokeCard").html(" ")

        fetchCharacters();
    })

    fetchCharacters();

    function fetchCharacters(){
        fetch(nextPage)

        .then(function(response){
            return response.json();
        })

        .then(function(response){
            
            nextPage = response.next
            response.results.forEach(function(pokemon){
                
            
                let card = `
                <div class="col-4 p-3">
                <div class="card">
                <img src="${pokemon.sprites} " class="card-img-top" id="image__${pokemon.name}" alt="${pokemon.name}">
                <div class="card-body ">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                
                <div class="card-body">
                    <a href="${pokemon.url}" id ="${pokemon.name}" class="btn btn-info">quiero saber mas de este Pokémon!</a>
                </div>
                </div>
                </div> `
                
                
                

                document.querySelector(".pokeCard").insertAdjacentHTML('beforeend',card)

                document.querySelector(`#${pokemon.name}`).addEventListener('click',function(e){
                    e.preventDefault();
                    let pokemon = e.target.href;
                    $("#exampleModal").modal("show");
                    
                    getPokemonData(pokemon)
                })
            })  
        });
    }
    

    function getPokemonData(pokemon_url) {

        fetch(pokemon_url)

        .then(function(response){
            return response.json();
        })

        .then(function(response){
            console.log(getAbilities(response))
            $('#exampleModalLabel').html(response.name)
            $('#pokemonAbs').html(getAbilities(response))
            $('#pokemonTypes').html(getTypes(response))
            $('#pokemonMoves').html(getMoves(response)) 
        })
    }


    function getAbilities(pokemon){

        let abi = 'Abilities:'
        pokemon.abilities.forEach(function (abilities) {
            abi = abi + ' ' + abilities.ability.name
        })

        return abi
    }

    function getTypes(pokemon){

        let typ = 'types:'
        pokemon.types.forEach(function (types) {
            typ = typ + ' ' + types.type.name
        })

        return typ
    }

    function getMoves(pokemon){

        let mov = 'moves:'
        pokemon.moves.forEach(function (moves, index) {
            if (index < 5) {
                mov = mov + ' ' + moves.move.name
            }
        })

        return mov
    }

})