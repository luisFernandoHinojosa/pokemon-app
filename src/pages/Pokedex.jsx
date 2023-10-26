import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const input = useRef(null);

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
  console.log("pokemons", pokemons);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokemonName = e.target.pokemonName.value.toLowerCase().trim();
    setPokemonName(pokemonName.toLowerCase().trim());
  };

  const handleSuggestions = (e) => {
    const pokemonName = e.target.value.toLowerCase().trim();
    if (pokemonName === "") {
      setSuggestions([]);
      setInputValue("");
    } else {
      const filteredSuggestions = pokemons
        .filter((pokemon) => pokemon.name.startsWith(pokemonName))
        .map((pokemon) => pokemon.name);
      setSuggestions(filteredSuggestions);
      setInputValue(pokemonName);
    }
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handleClickSuggestions = (suggestion) => {
    setPokemonName(suggestion.toLowerCase());
    setInputValue(suggestion.toLowerCase());
  };
  const handleClearCharacter = (e) => {
    if (e.key === "Delete" && inputValue.length > 0) {
      const newValue = inputValue.slice(0, inputValue.length - 1);
      setInputValue(newValue);
    }
  };

  const handleKeySuggestions = (e) => {
    if (e.key === "ArrowDown" && suggestionIndex < suggestions.length - 1) {
      setSuggestionIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "ArrowUp" && suggestionIndex > 0) {
      setSuggestionIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "Enter" && suggestionIndex !== -1) {
      e.preventDefault();
      setInputValue(suggestions[suggestionIndex].name);
      setPokemonName(suggestions[suggestionIndex]);
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [suggestionIndex]);

  return (
    <main className="min-h-screen dark:bg-slate-600">
      <HeaderPokeball />
      <div className="relative mx-auto h-11 mt-1 border-2 border-slate-700 dark:border-slate-400 right-1/2 translate-x-1/2 grid items-center">
      <Link
        className="absolute dark:text-white hover:text-red-500   dark:hover:text-red-500 px-2 py-1 flex font-bold border-l-2 border-r-2 border-red-500 left-2 "
        to={"/config"}
      >
        <span>
          <IconSettings />
        </span>
        <span>Settings</span>
      </Link>
      </div>
      <section className="grid mx-auto mb-9  px-4 gap-5 mt-5 md:max-w-[610px] lg:max-w-[900px] xl:max-w-[1200px] text-">
        <p className="text-lg dark:text-white">
          <span className="text-red-500 font-bold">Welcome</span> <span className="text-blue-500 font-bold">{trainerName},</span>here can you find your favorite
          pokemon
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3"
        onKeyDown={handleKeySuggestions}>
          <div className="relative flex w-[70%] bg-green-900">
            <input
              className="w-[75%] outline-none border-2 border-red-500 capitalize"
              name="pokemonName"
              type="text"
              value={inputValue}
              autoComplete="off"
              placeholder="Search pokemon by name"
              onChange={handleSuggestions}
              onKeyDown={handleClearCharacter}
              ref={input}
            />
            <button className="w-[25%] px-4 py-2 bg-red-500 truncate">Search</button>
            {suggestions.length > 0 && (
              <ul className="absolute capitalize top-10 bg-[#152b34] text-center w-[75%]  max-h-36 overflow-y-auto text-white font-semibold">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickSuggestions(suggestion)}
                    className={`cursor-pointer hover:bg-red-500 border-b-[1px] ${suggestionIndex===index&&("bg-red-500")}`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            onChange={handleChangeType}
            className="w-[30%] capitalize border-2 border-red-600 outline-none"
          >
            <option value="">All pokemon</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>
      {pokemons.length === 0 ? (
        <div
          className="text-center
        text-2xl text-red-700"
        >
          <span>Sorry there are no pokemons of these types</span>
        </div>
      ) : (
        <PokemonList pokemons={pokemonByName} />
      )}
    </main>
  );
};
