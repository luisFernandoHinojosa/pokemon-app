import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ pokemons }) => {
  console.log("pokemons", pokemons)
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_280px)] max-w-[1200px] justify-center mx-auto gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
      ))}
    </section>
  );
};
