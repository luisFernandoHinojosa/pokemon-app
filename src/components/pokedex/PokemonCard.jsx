import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgType, bgBorderType, textColorType } from "../../constants/pokemons";

export const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  console.log("pokemons url",pokemon)
  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize text-center rounded-lg border-8 ${bgBorderType[pokemon?.types[0].type.name]}`}
    >
      <header className={`h-[140px] ${bgType[pokemon?.types[0].type.name]}`}>

      </header>
      <div className="relative pt-14 bg-w dark:text-white">
        <div className="absolute w-full top-0 -translate-y-2/3">
          <img
            className="max-w-[180px] mx-auto block transform scale-100 cursor-pointer hover:scale-95 transition-transform"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <h3 className={`text-3xl font-bold ${textColorType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <span className="font-medium">
          {pokemon?.types.map((type) => type.type.name).join(" / ")}
        </span>
        <h5 className="text-xs font-semibold dark:text-white mb-2">Type</h5>
        <hr />
        <ul className="grid grid-cols-2 gap-4 p-1">
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <li key={stat.stat.name} className="font-normal text-black dark:text-white">
              <h6>{stat.stat.name}</h6>
              <span className={`font-bold text-lg ${textColorType[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
