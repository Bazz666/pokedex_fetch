document.addEventListener('DOMContentLoaded', function () {

    let nextPage = "https://pokeapi.co/api/v2/pokemon/";
    document.querySelector("#next").addEventListener("click", function (e) {
        e.preventDefault();
        $(".pokeCard").html(" ")

        fetchCharacters();
    })


    fetchCharacters();

    function fetchCharacters() {
        fetch(nextPage)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                nextPage = response.next;

                response.results.forEach(function (char) {
                    fetch(char.url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then((pokemon) => {
                            let cards = `
                        <div class="card col-3 ">
                            <div class="card " style="max-width: 18rem;"">
                                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body  ">
                                    <h5 class="card-header">${pokemon.name}</h5>
                                </div>
                                <div class="card-body">
                                    <a href="${char.url}" id ="${char.name}" class="btn btn-success btn-lg">More Pokemon info... </a>
                                </div>
                            </div>
                        </div>`

                    

                            document.querySelector(".pokeCard").insertAdjacentHTML('beforeend', cards)

                            document.querySelector(`#${char.name}`).addEventListener("click", function (e) {
                                e.preventDefault();
                                let pokemon = e.target.href;
                                $("#exampleModal").modal("show");

                                getPokemonData(pokemon);
                            })

                        })
                })
            })
    }

    function getPokemonData(pokemon) {

        fetch(pokemon)
            .then(function (response) {
                return response.json();
            })

            .then(function (response) {
                $('.modal-title').html((response.name))
                $('#pokemonAbs').html(getAbilities(response))
                $('#pokemonTypes').html(getTypes(response))
                $('#pokemonGeneration').html(getGeneration(response))
                $('#pokemonMoves').html(getMoves(response))

                getGeneration(response)
                document.querySelector('#btnDano').addEventListener('click', function (e) {
                    e.preventDefault();
                    $("#exampleModal1").modal("show");
                    getDaños(response)
                    getFortalezas(response)
                })
                document.querySelector('#btnHab').addEventListener('click', function (e) {
                    e.preventDefault();
                    $("#exampleModal3").modal("show");
                    getPokeHab(response)

                })

            });
    }

    function getAbilities(pokemon) {
        let abi = 'Abilities:'
        pokemon.abilities.forEach(function (abilities) {
            abi = abi + ' ' + abilities.ability.name
        })
        return abi
    }

    function getTypes(pokemon) {
        let typ = 'types:'
        pokemon.types.forEach(function (types) {
            typ = typ + ' ' + types.type.name
        })
        return typ
    }

    function getGeneration(pokemon) {

        fetch(pokemon.types[0].type.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                gen = response.generation.name
                $('#pokemonGeneration').html("generation: " + gen)
            })
    }

    function getMoves(pokemon) {
        let mov = 'moves:'
        pokemon.moves.forEach(function (moves, index) {
            if (index < 4) {
                mov = mov + ' ' + moves.move.name
            }
        })
        return mov
    }

    function getDaños(pokemon) {
        fetch(pokemon.types[0].type.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                for (let i = 0; i < response.damage_relations.double_damage_from.length; i++) {
                    gen = gen + " " + response.damage_relations.double_damage_from[i].name

                }
                gen = gen.split(" ").splice(1)
                $('#pokemonDaños').html("Weak against: " + gen)

            })
    }


    function getFortalezas(pokemon) {
        fetch(pokemon.types[0].type.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                for (let i = 0; i < response.damage_relations.double_damage_to.length; i++) {
                    gen = gen + " " + response.damage_relations.double_damage_to[i].name
            
                }
                gen = gen.split(" ").splice(2)
                $('#pokemonFortalezas').html("Strong against: " + gen)

            })
    }
    

    function getPokeHab(response) {
        
        fetch(response.abilities[0].ability.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                for (let i = 0; i < response.pokemon.length; i++) {
                    gen = gen + " " + response.pokemon[i].pokemon.name
                }
                gen = gen.split(" ").splice(1)
                $('#pokemonHab').html("Pokemons: " + gen)
                console.log(gen)
            })

    }

})