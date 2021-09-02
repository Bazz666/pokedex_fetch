document.addEventListener('DOMContentLoaded', function() {

	let nextPage = "https://pokeapi.co/api/v2/pokemon/" ;
	document.querySelector("#next").addEventListener("click",function(e){
		e.preventDefault();
        //$(".pokeCard").html(" ")

        fetchCharacters();
    })


	fetchCharacters();

        function fetchCharacters(){
            fetch(nextPage)

                .then(function(response){
                    return response.json();
                })


                .then(function(response){

                    nextPage = response.next;
                    console.log(response);
                    response.results.forEach(function(char){
                    
                    fetch(char.url)
                        .then(function(response){

                            return response.json();
                        })

                        .then((pokemon)=> {
                            let chars = `
                        <div class="col-4 p-3">
                        <div class="card">
                        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body ">
                            <h5 class="card-title">${pokemon.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        
                        <div class="card-body">
                            <a href="#" id ="${char.name}" class="btn btn-success">quiero saber mas de este Pokémon!</a>
                        </div>
                        </div>
                        </div> `
                        console.log(char.name)

                            $('.btn-success').click(
                                function (e) {
                                    e.preventDefault();
                                    $('#exampleModal').modal('show');
                                    $('#pokemonAbs').html(getAbilities(pokemon))
                                    $('#pokemonTypes').html(getTypes(pokemon))
                                    $('#pokemonMoves').html(getMoves(pokemon))
                                    
                            })


                        

                        // document.querySelector(`#${char.name}`).addEventListener("click",function(e){
                        //     e.preventDefault();
                        //     $("#exampleModal").modal("show");
                            
                            
                        // })


                        document.querySelector(".pokeCard").insertAdjacentHTML('beforeend',chars)

                        })
                    })

                    
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

