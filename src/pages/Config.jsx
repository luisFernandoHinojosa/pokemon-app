import { useDispatch } from "react-redux";
import { HeaderPokeball } from "../components/layouts/HeaderPokeball";
import { setPokemonsPerPage } from "../store/slices/pokemonsPerPage.slice";

export const Config = () => {

  const dispatch = useDispatch()

  const handleChangePage = (e) => {
    console.log("value page", +e.target.value)
    dispatch(setPokemonsPerPage(+e.target.value))
  };
  const PokemonsPerPage = [];
  for (let i = 4; i <= 20; i += 4) {
    PokemonsPerPage.push(i);
  }

  return (
    <main>
      <HeaderPokeball />
      <div className="flex justify-center mt-11 gap-7 mx-4">
        <div className="flex gap-2 ">
          <h4>Pokemons per page</h4>
          <select onChange={handleChangePage} className="">
            {PokemonsPerPage.map((perPage) => (
              <option key={perPage} value={perPage}>
                {perPage}
              </option>
            ))}
          </select>
        </div>
        <button>modo oscuro</button>
      </div>
    </main>
  );
};
