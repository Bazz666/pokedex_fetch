$(document).ready(function(){
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'

    $('#next').click(function(e){
        e.preventDefault();
        $('.pokeCard').html(" ");
        fetchPokemon();
    })

    fetchPokemon();

    function fetchPokemon() {
        $.ajax({
            url: endpoint,
            method: 'GET',
            success: function (response) {
                endpoint = response.next;
                console.log(endpoint);
                response.results.forEach(function (pokemon) {
                    let list = `<div class='card'>
                    <div class='card-body'>
                    <h5 class='card-title'>${pokemon.name}</h5>
                    <a href='#' url='${pokemon.url}' 
                    class='btn btn-primary'>quiero saber mas...</a> 
                    </div>
                    </div>`
                    $(".pokeCard").append(list)
                })
            },

            complete: function () {
                $('.btn-primary').click(
                    function (e) {
                        e.preventDefault();
                        $('#exampleModal').modal('show');
                        let data = ($(this).attr('url'));
                        
                        $.ajax({
                            url: data,
                            method: 'GET',
                            success: function (response) {
                                let name = response.name 
                                let typ ='Types:'
                                response.types.forEach(function(types){
                                    typ = typ + ' ' + types.type.name
                                })
                                let image = response.sprites.front_shiny

                                let abi = 'Abilities:'
                                response.abilities.forEach(function (abilities) {
                                    abi = abi + ' ' + abilities.ability.name
                                })
                                let mov = 'Move set:'
                                response.moves.forEach(function (moves, index) {
                                    if (index < 5) {
                                        mov = mov + ' ' + moves.move.name
                                    }
                                })
                                $('#exampleModalLabel').html(name)
                                $('#pokemonTypes').html(typ)
                                $('#pokemonAbs').html(abi)
                                $('#pokemonMoves').html(mov)
                                $('#pokemonImage').html(` <img src="${image}" alt="">`)

                            }
                        })
                    }
                )
            }

        });
    }





});