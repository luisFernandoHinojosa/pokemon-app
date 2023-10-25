import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderPokeball } from "../components/layouts/HeaderPokeball";
import { bgType, bgBorderType, textColorType } from "../constants/pokemons";

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
    <main className="capitalize grid gap-20 dark:bg-gray-800 dark:text-white">
      <HeaderPokeball />
      <article className="mx-2 grid gap-11 mt-16">
        <article className={`relative w-full max-w-[700px] mx-auto text-center rounded-lg border-8 ${bgBorderType[pokemon?.types[0].type.name]}`}>
          <header
            className={`h-[140px] ${bgType[pokemon?.types[0].type.name]}`}
          >
            {" "}
          </header>
          <div className="absolute w-full top-0 -translate-y-1/2">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
              className="max-w-[250px] mx-auto"
            />
          </div>
          <article className="bg-white px-11 pb-10 pt-5 dark:bg-slate-400 opacity-80 ">
            <section className="mb-11 grid gap-6">
              <div className="flex flex-col gap-3">
                <spam className="w-9 border-2 p-1 mx-auto text-xl font-bold">
                  #{pokemon?.id}
                </spam>
                <h2 className="text-[2rem] font-bold text-green-800">
                  {pokemon?.name}
                </h2>
                <div className="flex pt-4 justify-center gap-16">
                  <div className="">
                    <h5 className="font-semibold">Peso</h5>
                    <span className="text-xl font-bold">{pokemon?.weight}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Altura</h5>
                    <span className="text-xl font-bold">{pokemon?.height}</span>
                  </div>
                </div>
              </div>

              {/* tipo y habilidades */}
              <div className="flex justify-between gap-5 dark:text-black">
                <div className="w-[50%] grid gap-3">
                  <h3 className="text-xl font-bold">Tipo</h3>
                  <div className="flex gap-5 justify-center w-full flex-wrap sm:flex-nowrap items-center text-white font-semibold dark:text-black">
                    <span
                      className={`w-full sm:w-[50%] border-2 p-1 ${
                        bgType[pokemon?.types[0].type.name]
                      }`}
                    >
                      {pokemon?.types[0].type.name}
                    </span>
                    {pokemon?.types.length > 1 && (
                      <span
                        className={`w-full sm:w-[50%] border-2 p-1 ${
                          bgType[pokemon?.types[1].type.name]
                        }`}
                      >
                        {pokemon?.types[1].type.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-[50%] grid gap-3 ">
                  <h3 className="text-xl font-bold">Habilidades</h3>
                  <div className="grid md:justify-between md:grid-cols-2 gap-5 font-semibold">
                    <span className="border-2 p-1">
                      {pokemon?.abilities[0].ability.name}
                    </span>
                    <span className="border-2 p-1">
                      {pokemon?.abilities[1].ability.name}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* stast */}
            <section className="dark:text-slate-900">
              <h3 className="text-[2rem] text-start font-semibold">Stats</h3>
              <ul className="grid gap-4">
                {pokemon?.stats.map((stat) => (
                  <li className="capitalize font-semibold" key={stat.stat.name}>
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

        <div className="max-w-[700px] mx-auto rounded-lg px-7 py-5 mb-10 border-4 border-slate-200">
          <h4 className="text-4xl pb-3">Movements</h4>
          <hr />
          <ul className="flex  flex-row flex-wrap   gap-6 p-3">
            {pokemon?.moves.slice(0, 25).map((move) => (
              <li key={move.move.name} className="">
                <spam className={` border-2 text-xl rounded-xl px-3 py-2 ${textColorType[pokemon?.types[0].type.name]}`}>
                  {move.move.name}
                </spam>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
};
