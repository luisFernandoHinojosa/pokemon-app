import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { pagination } from "../../utils/pagination";
import { ButtonsToShow } from "../../utils/ButtonsToShow";
import { useSelector } from "react-redux";

export const PokemonList = ({ pokemons}) => {
  console.log("pokemons", pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = useSelector((store)=>store.pokemonsPerPage)

  const { pokemonsInPage, pages, pageStart, pageEnd } = pagination(
    currentPage,
    pokemons,
    pokemonsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  return (
    <section>
      {
        pokemons.length ===0?(<div className="text-center
        text-2xl text-red-700">
          <span>Sorry, there are no pokemons with that name</span>
        </div>):(<>
          <div className="grid justify-center gap-1 mb-10">
          {
            <ButtonsToShow
              pageStart={pageStart}
              pageEnd={pageEnd}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={pages}
            />
          }
        </div>
        <section className="grid grid-cols-[repeat(auto-fit,_280px)] max-w-[1200px] justify-center mx-auto gap-6 mb-10">
          {pokemonsInPage.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
          ))}
        </section>
        <div className="grid justify-center gap-1 pb-10">
          {
            <ButtonsToShow
              pageStart={pageStart}
              pageEnd={pageEnd}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={pages}
            />
          }
        </div>
        /</>)
      }
    </section>
  );
};
