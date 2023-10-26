import { useDispatch, useSelector } from "react-redux";
import { HeaderPokeball } from "../components/layouts/HeaderPokeball";
import { setPokemonsPerPage } from "../store/slices/pokemonsPerPage.slice";
export const Config = () => {
  const dispatch = useDispatch()
  const pokemonsPerPage = useSelector((store)=>store.pokemonsPerPage)
  console.log("antes", pokemonsPerPage);

  
  


  const handleChangePage = (e) => {
    const selectedValue = +e.target.value;
  if (selectedValue !==0) {
    console.log("value page", selectedValue);
    console.log("despues", pokemonsPerPage);
    dispatch(setPokemonsPerPage(selectedValue));
  }
  };
  
  
  const PokemonsPerPage = [];
  for (let i = 4; i <= 20; i += 4) {
    PokemonsPerPage.push(i);
  }


  
  const handleChangeTheme = () =>{
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('dark');

    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
    
  }

  return (
    <main className="dark:bg-slate-500">
      <HeaderPokeball/>
      <div className="flex justify-center mt-11 gap-7 mx-4 flex-col items-center sm:flex-row">
        <div className="flex gap-2">
          <h4 className="font-semibold text-lg">Pokemons per page</h4>
          <select onChange={handleChangePage} className="outline-none border-2 border-slate-600">
            <option value="">Select an option</option>
            {PokemonsPerPage.map((perPage) => (
              <option value={perPage} key={perPage}>
                {perPage}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleChangeTheme}>modo oscuro</button>
      </div>
    </main>
  );
};
