import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonId } = useParams();
  console.log("pokemons", pokemon);

  const getPokemonStat = (statValue) => {
    const MAX_STAAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="py-10 px-2 capitalize grid gap-20 bg-green-200">
      <article className="w-full max-w-[700px] mx-auto    text-center bg-red-500 p-2 mt-[10rem]">
        <header className="grid justify-center h-[15%] bg-black">
          <img className="w-[290px] relative -translate-y-1/2"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <article className="bg-white h-[85%]">
          <section>
            <h3 className="text-[2rem] font-bold text-emerald-800 pt-2 " >#{pokemon?.id}</h3>
            <h2 className="text-[2rem] font-bold text-emerald-800 pt-2">Nombre {pokemon?.name}</h2>
            <div className="w-full pt-2 pb-2 text-[0.7rem] justify-center  px-[10rem]">
              <div className="grid grid-cols-2  max-w-xl px-5 font-bold">
              <div>
                <h5>Peso</h5>
                <span className="">{pokemon?.weight}</span>
              </div>
              <div>
                <h5>Altura</h5>
                <span>{pokemon?.height}</span>
              </div>
              </div>
            </div>

            {/* tipo y habilidades */}
            <div className="grid grid-cols-2 bg-orange-600 gap-5 ">
              <div>
                <h3 className="text-xl">Tipo</h3>
                <div className="bg-green-500 grid gap-3 md:justify-between md:grid-cols-2">
                  <span className="bg-blue-500">{pokemon?.types[0].type.name}</span>
                  {pokemon?.types.length > 1 && (
                    <span>{pokemon?.types[1].type.name}</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl">Habilidades</h3>
                <div className="bg-green-500 grid md:justify-between md:grid-cols-2">
                  <span>{pokemon?.abilities[0].ability.name}</span>
                  <span>{pokemon?.abilities[1].ability.name}</span>
                </div>
              </div>
            </div>
          </section>
          {/* stast */}
          <section>
            <h3 className="text-start">Stats</h3>
            <ul className="grid gap-4">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h5>{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </div>
                  {/* totalBar */}
                  <div className="bg-slate-300 h-6 rounded-md overflow-hidden">
                    <div
                      style={{ width: getPokemonStat(stat.base_stat) }}
                      className="bg-gradient-to-l to-orange-300 from-orange-500 h-full rounded-md"
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </article>
      <div className="max-w-[700px] mx-auto rounded-lg shadow px-7 py-5">
        <h4 className="text-4xl pb-3">Movements</h4>
        <hr />
        <ul className="flex  flex-row flex-wrap   gap-6 p-3">
          {pokemon?.moves.slice(0, 25).map((move) => (
            <li key={move.move.name} className="">
              <spam className="bg-slate-200 text-xl rounded-xl px-3 py-2">
                {move.move.name}
              </spam>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
