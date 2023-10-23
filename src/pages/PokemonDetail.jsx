import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  const {pokemonId} = useParams()

  const getPokemonStat = (statValue)=>{
    const MAX_STAAT_VALUE =255
    const percentStat = ((statValue * 100)/MAX_STAAT_VALUE).toFixed(1)
    return `${percentStat}%`
  }

  useEffect(() => {
    axios 
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="py-10 px-2 capitalize grid gap-20">
      <article className="max-w-[500px] mx-auto text-center">
        <header>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </header>
        <h3>#{pokemon?.id}</h3>
        <h2>Nombre {pokemon?.name}</h2>
        {/* stast */}
        <section>
          <h3 className="text-start">Stats</h3>
          <ul className="grid gap-4">
            {
              pokemon?.stats.map((stat)=>(
              <li className="capitalize" key={stat.stat.name}>
              <div className="flex justify-between items-center">
                <h5>stat.stat.name</h5>
                <span>{stat.base_stat}/255</span>
              </div>
              {/* totalBar */}
              <div className="bg-slate-300 h-6 rounded-md">
                <div style={{width: getPokemonStat(stat.base_stat)}}  className="bg-yellow-300 h-full"></div>
              </div>
            </li>
            ))}
          </ul>
        </section>
      </article>
      <div className="max-w-[70rem] mx-auto p-2 rounded shadow">
        <h4 className="text-4xl pb-3">Movements</h4>
        <ul className="grid grid-cols-4 gap-6">
          {
            pokemon?.moves.slice(0,25).map((move) =>
              <li key={move.move.name} className="text-center">
                <spam className="bg-slate-400 text-xl rounded-xl px-3 py-2">
                    {move.move.name}
                </spam>
              </li>
            )
          }
         </ul>
      </div>
      
    </main>
  )
}