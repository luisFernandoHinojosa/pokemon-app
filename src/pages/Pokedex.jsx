import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PokemonList } from "../components/pokedex/PokemonList";

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const trainerName = useSelector((store) => store.trainerName);


  const pokemonByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );
  
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //Trae todos los types disponibles de los pokemones
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  //Trae a todos los pokemones con base a un type
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);


  console.log(pokemonByName);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  return (
    <main>
      <section>
        <p>
          <span>Welcome {trainerName}</span>, here can you find your favorite
          pokemon
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="pokemonName" type="text" />
            <button>Search</button>
          </div>

          <select onChange={handleChangeType} className="capitalize">
            <option value="">All pokemon</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>
      <PokemonList pokemons={pokemonByName} />
    </main>
  );
};
