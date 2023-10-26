import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Pokedex } from "./pages/Pokedex";
import { PokemonDetail } from "./pages/PokemonDetail";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Config } from "./pages/Config";
import { DarkModeProvider } from "./utils/DarkModeContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const recoverMode = localStorage.getItem("theme");

    const htmlElement = document.querySelector("html");

    if (recoverMode !== null) {
      htmlElement.classList.add(recoverMode);
    }
  }, []);

  return (
    <DarkModeProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
            <Route path="/config" element={<Config />} />
          </Route>
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
