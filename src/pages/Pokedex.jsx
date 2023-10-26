import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PokemonList } from "../components/pokedex/PokemonList";
import { HeaderPokeball } from "../components/layouts/HeaderPokeball";
import { Link } from "react-router-dom";
import { IconSettings } from "@tabler/icons-react";
//import { paginateData } from "../utils/pagination2"

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const trainerName = useSelector((store) => store.trainerName);
  // const [currentPage, setCurrentPage] = useState(1)
  // const {itemsInCurrentPage,
  //   pagesInCurrentBlock,
  //   lastPage,} =paginateData(pokemons, currentPage)
  console.log("currentType",currentType)

  const pokemonByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
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
    console.log("value type", e.target.value)
    setCurrentType(e.target.value);
  };

  return (
    <main className="min-h-screen dark:bg-gray-800">
      <HeaderPokeball/>
      <Link className="hover:text-red-500 absolute px-2 py-1 flex font-bold border-2 left-2 translate-y-[20%] rounded-xl  " to={"/config"}>
      <span><IconSettings/></span>
      <span>Settings</span>
        </Link>
      <section className="grid items-center md:w-[600px] lg:w-[1200px] mx-auto mb-16 gap-5 px-2 mt-11">
        <p className="text-lg dark:text-white">
          <span className="text-red-500 font-bold">Welcome</span> <span className="text-blue-500 font-bold">{trainerName},</span>here can you find your favorite
          pokemon
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex w-[70%] bg-green-900">
            <input className="w-full outline-none border-2 border-red-500" name="pokemonName" type="text" autoComplete="off" placeholder="Search pokemon by name" />
            <button className="px-6 py-2 bg-red-500">Search</button>
          </div>

          <select onChange={handleChangeType} className="w-[30%] capitalize border-2 border-red-600 outline-none">
            <option value="">All pokemon</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>
      {
        pokemons.length ===0?(<div className="text-center
        text-2xl text-red-700">
          <span>Sorry there are no pokemons of these types</span>
        </div>):(<PokemonList pokemons={pokemonByName} />)
      }
    </main>
  );
};
