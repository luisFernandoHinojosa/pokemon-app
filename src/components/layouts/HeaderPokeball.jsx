export const HeaderPokeball = () => {
  return (
    <header>
      <div className="bg-red-600 h-16">
        <div className="h-full pl-4">
          <img
            className="h-[36px] sm:h-full md:block w-auto translate-y-7 sm:translate-y-[2px] relative z-10"
            src="/images/pokedex-logo.png"
            alt=""
          />
        </div>
      </div>
      <div className="bg-black h-12 relative">
        <div className="h-12 w-12 bg-white rounded-full absolute right-0 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
          <div className="w-10 h-10 rounded-full bg-white border-[6px] border-black "></div>
        </div>
      </div>
    </header>
  );
};
