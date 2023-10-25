import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmi = (e) => {
    e.preventDefault();
    const trainerName = e.target.trainerName.value;
    trainerName.length>4
      ? (dispatch(setTrainerName(trainerName)), navigate("/pokedex"))
      : setErrorMessage("Invalid name! Please, your name must contain more than 4 digits");
  };
  
  useEffect(() => {
    
  }, [themeMode])
  
  const handleChangeTheme = () =>{
    document.querySelector('html').classList.toggle('dark')
  }
  return (
    <main className="h-screen grid grid-rows-[1fr_auto] dark:bg-gray-800">
     <button onClick={handleChangeTheme} className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-500 rounded-md px-5 dark:bg-slate-200 text-slate-50 dark:text-slate-900">Dia
            <i className="fa-light fa-sun-bright"></i>
     </button>
      <section className="px-3 h-full grid place-content-center">
        <div className="grid text-center gap-6">
          <div>
            <img src="/images/logo.png" alt="" />
          </div>
          <div>
            <h3 className="text-[2.2rem] text-red-500 font-bold">
              Hello Trainer!
            </h3>
            <p className="font-semibold dark:text-slate-200">To start, give me your name</p>
          </div>
          <div className="relative">
            <form
              onSubmit={handleSubmi}
              className=" h-10 flex overflow-hidden gap-1"
            >
              <input
                className="h-auto w-full outline-none border-2 border-red-500"
                name="trainerName"
                type="text"
                placeholder="Your name"
                autoComplete="off"
              />
              <button className="bg-red-500 px-7 hover:bg-red-700 font-bold">
                Start!
              </button>
            </form>
            {errorMessage && <span className="absolute left-0 text-red-600">{errorMessage}</span>}
          </div>
        </div>
      </section>
      <footer>
        <div className="bg-red-600 h-16"></div>
        <div className="bg-black h-12 relative">
          <div className="h-12 w-12 bg-white rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
            <div className="w-10 h-10 rounded-full bg-white border-[6px] border-black "></div>
          </div>
        </div>
      </footer>
    </main>
  );
};
