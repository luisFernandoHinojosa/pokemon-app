import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmi = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };
  
  
  
  return (
    <main className="h-screen grid grid-rows-[1fr_auto] dark:bg-slate-600">
      <section className="px-3 h-full grid place-content-center">
        <div className="grid text-center gap-6">
          <div>
            <img src="/images/logo.png" alt="" />
          </div>
          <div>
            <h3 className="text-[2rem] text-red-500 font-bold">
              Hello Trainer!
            </h3>
            <p className="font-semibold dark:text-slate-200">To start, give me your name</p>
          </div>
          <form
            onSubmit={handleSubmi}
            className=" h-10 relative bg-black flex overflow-hidden"
          >
            <input
              className="h-auto w-full outline-none"
              name="trainerName"
              type="text"
              placeholder="Your name"
            />
            <button className="bg-red-500 px-7 h-full ">Start!</button>
          </form>
        </div>
      </section>
      <footer>
        <div className="bg-red-600 h-16"></div>
        <div className="bg-black h-12 relative">
          <div className="h-14 w-14 bg-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
            <div className="w-11 h-11 rounded-full bg-black border-[5px] border-white "></div>
          </div>
        </div>
      </footer>
    </main>
  );
};
