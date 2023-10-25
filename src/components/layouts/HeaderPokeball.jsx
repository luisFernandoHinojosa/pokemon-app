

export const HeaderPokeball = () => {
  return (
    <header className="bg-green-500 w-full">
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
        <div className="h-14 w-14 bg-black rounded-full absolute right-0 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
          <div className="w-11 h-11 rounded-full bg-black border-[6px] border-white "></div>
        </div>
      </div>
    </header>
  );
};
