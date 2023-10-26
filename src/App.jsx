import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Pokedex } from "./pages/Pokedex";
import { PokemonDetail } from "./pages/PokemonDetail";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Config } from "./pages/Config";
import { DarkModeProvider } from "./utils/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <div>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
            <Route path="/config" element={<Config />} />
          </Route>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
