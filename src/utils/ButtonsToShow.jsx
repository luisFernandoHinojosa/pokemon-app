import { PreviousNextButton } from "./PreviousNextButton";

export const ButtonsToShow = ({
  pageStart,
  pageEnd,
  currentPage,
  setCurrentPage,
  pages,
}) => {
  return (
    <>
      <ul className="text-lg flex gap-3 justify-center flex-wrap">
        {pageStart > 1 && (
          <PreviousNextButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={"<<"}
            sign={"-"}
          />
        )}

        {Array.from({ length: pageEnd - pageStart + 1 }).map((_, index) => {
          const page = pageStart + index;
          return (
            <li key={index}>
              <button
                className={`text-blasck font-semibold p-2 px-4 ${
                  page === currentPage
                    ? "bg-red-400"
                    : "bg-white hover:bg-slate-300 "
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {pageEnd < pages.length && (
          <PreviousNextButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={">>"}
            sign={"+"}
          />
        )}
      </ul>
      <span className="text-center font-semibold">
        <span className="">{currentPage}</span> of{" "}
        <span className="">{pages.length}</span>
      </span>
    </>
  )
}