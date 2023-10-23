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
    <main className="bg-slate-100 h-screen flex flex-col">
      <section className="px-3 h-full grid place-content-center">
        <div className="grid text-center gap-6">
          <div>
            <img src="/images/logo.png" alt="" />
          </div>
          <div>
            <h3 className="text-[2rem] text-red-500 font-bold">
              Hello Trainer!
            </h3>
            <p className="font-semibold">To start, give me your name</p>
          </div>
          <form
            onSubmit={handleSubmi}
            className=" h-8 relative bg-black flex overflow-hidden"
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
      <footer className=" bg-purple-500">
        {/* <img className="w-full h-auto" src="/images/logo-barra.png" alt="" /> */}
      </footer>
    </main>
  );
};
