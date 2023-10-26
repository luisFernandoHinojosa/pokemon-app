import { useDispatch, useSelector } from "react-redux";
import { HeaderPokeball } from "../components/layouts/HeaderPokeball";
import { setPokemonsPerPage } from "../store/slices/pokemonsPerPage.slice";
import { IconSettings, IconSunHigh } from "@tabler/icons-react";
import { IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const Config = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);

  const handleChangePage = (e) => {
    const selectedValue = +e.target.value;
    if (selectedValue !== 0) {
      dispatch(setPokemonsPerPage(selectedValue));
    }
  };

  const PokemonsPerPage = [];
  for (let i = 4; i <= 20; i += 4) {
    PokemonsPerPage.push(i);
  }

  const handleThemeChange = (selectedTheme) => {
    if (selectedTheme === "dark") {
      document.querySelector("html").classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (selectedTheme === "light") {
      document.querySelector("html").classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
      localStorage.setItem("theme", "system");
    }
    setTheme(selectedTheme);
    setShowModal(false);
  };

  useEffect(() => {
    const recoverIconTheme = localStorage.getItem("theme");
    if(recoverIconTheme !== null){
      setTheme(recoverIconTheme)
    }
  }, []);

  return (
    <main className="min-h-screen dark:bg-slate-600">
      <HeaderPokeball />
      <div className="flex justify-center mt-11 gap-7 mx-4 flex-col items-center sm:flex-row">
        <div className="flex gap-2">
          <h4 className="font-semibold text-lg">Pokemons per page</h4>
          <select
            onChange={handleChangePage}
            className="outline-none border-2 border-slate-600"
          >
            <option value="">Select an option</option>
            {PokemonsPerPage.map((perPage) => (
              <option value={perPage} key={perPage}>
                {perPage}
              </option>
            ))}
          </select>
        </div>

        <div className="relative cursor-pointer">
          <div
            className="rounded-full p-1 border-2 "
            onClick={() => setShowModal(!showModal)}
          >
            {theme === "dark" ? (
              <IconMoon size={30}/>
            ) : theme === "light" ? (
              <IconSunHigh size={30}/>
            ) : (
              <IconSettings size={30}/>
            )}
          </div>
          {showModal && (
            <div className="absolute mt-1 min-w-[9rem]  p-2 grid gap-2 bg-white border-2 rounded-lg">
              <div onClick={() => handleThemeChange("dark")} className="flex hover:text-red-500 ">
                <span><IconMoon /></span> 
                <span>Modo Oscuro</span>
              </div>
              <div onClick={() => handleThemeChange("light")} className="flex hover:text-red-500">
                <span><IconSunHigh /></span> 
                <span>Modo Claro</span>
              </div>
              <div onClick={() => handleThemeChange("system")} className="flex hover:text-red-500">
                <span><IconSettings /></span>
                 <span>Sistema</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
