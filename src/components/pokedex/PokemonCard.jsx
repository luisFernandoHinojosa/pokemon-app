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
  console.log("pokemon", pokemon);
  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className="capitalize bg-purple-200 relative p-3"
    >
      <header>
        <div className="">
          <img
            className=""
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </header>
      <div className="text-center p-3 bg-white">
          <h3>{pokemon?.name}</h3>
          <span>
            {pokemon?.types.map((type) => type.type.name).join(" / ")}
          </span>
          <h5>Type</h5>
          <hr />
          <ul className="grid grid-cols-2">
            {pokemon?.stats.slice(0, 4).map((stat) => (
              <li key={stat.stat.name}>
                <h6>{stat.stat.name}</h6>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
    </Link>
  );
};
