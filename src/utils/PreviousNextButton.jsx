export const PreviousNextButton = ({currentPage,setCurrentPage, icon, sign}) => {
  return (
    <li>
      <button
        className="text-white font-bold p-2 bg-red-500  hover:bg-red-700 border-[2px] border-red-700 "
        onClick={() => setCurrentPage(
            sign === '+' ? currentPage + 1 : sign === '-' ? currentPage - 1 : currentPage
          )}
      >
        {icon}
      </button>
    </li>
  )
}