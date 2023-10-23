import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  const {pokemonId} = useParams()
  console.log("movee",pokemon?.moves[0].move.name)

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
    <main className="py-10 px-2 text-center capitalize">
      <article className="max-w-[500px] mx-auto">
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
      <ul>
        {
          pokemon?.moves.map((move)=>
          <li key={move.move.name}>
            <div>
              {move.move.name}
            </div>
          </li>
          )
        }
      </ul>

    </main>
  )
}