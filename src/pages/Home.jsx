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
    <main className="bg-slate-100 h-screen grid place-content-center">
      <section className="">
        <div className="grid text-center gap-6">
          <div>
            <img src="/images/logo.png" alt="" />
          </div>
          <h3>Hello Trainer!</h3>
          <p>To start give me you name</p>
            <form onSubmit={handleSubmi} className=" h-full relative">
              <input
                className="h-full"
                name="trainerName"
                type="text"
                placeholder="Your name"
              />
              <button className="bg-red-500 px-7 h-full ">Start!</button>
            </form>
        </div>
      </section>
      <footer></footer>
    </main>
  );
};
