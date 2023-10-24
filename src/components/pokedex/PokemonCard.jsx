import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className="capitalize bg-purple-200 p-3 rounded-lg"
    >
      <header className="h-[30%] ">
          <img
            className=""
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
      </header>
      <div className="text-center p-3 bg-white h-[70%] rounded-lg">
        <div className="relative translate-y-[45%] grid gap-2 ">
          <h3  className="text-3xl font-bold">{pokemon?.name}</h3>
          <span className="font-semibold">
            {pokemon?.types.map((type) => type.type.name).join(" / ")}
          </span>
          <h5>Type</h5>
          <hr />
          <ul className="grid grid-cols-2 gap-4">
            {pokemon?.stats.slice(0, 4).map((stat) => (
              <li key={stat.stat.name} className="">
                <h6>{stat.stat.name}</h6>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};
