import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Pokedex } from "./pages/Pokedex";
import { PokemonDetail } from "./pages/PokemonDetail";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Config } from "./pages/Config";

function App() {
  
  
  return (
    
       
      <Routes>
        
          <Route path="/" element={<Home/>}/>

          <Route element={<PrivateRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
            <Route path="/config" element={<Config />} />
          </Route>
        </Routes>
     
  );
}

export default App;
