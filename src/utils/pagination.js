export const pagination = (currentPage, pokemons, pokemonsPerPage) => {
  const pages = []
  if(pokemons.length === 0){
    return{
      pages: [],
      pokemonsInPage:[]
    }
  }
  
  const POKEMONS_PER_PAGE = pokemonsPerPage

  //cantidad total de paginas
  const totalPages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE)

  //residentes que se van a mostrar en la pagina actual
  const sliceEnd = (POKEMONS_PER_PAGE * currentPage)
  const sliceStart = sliceEnd - POKEMONS_PER_PAGE
  const pokemonsInPage = pokemons.slice(sliceStart, sliceEnd)

  //generacion de arreglo de las paginas que se van a mostrar
  for(let i =1; i <= totalPages; i++){
    pages.push(i)
  }

  const maxButtons = 5
  const pageStart = Math.max(1, currentPage - Math.floor(maxButtons / 2))
  console.log("pageStar", pageStart)

  const pageEnd = Math.min(pages.length, pageStart + maxButtons-1)
  console.log("pageEnd", pageEnd)
  console.log("current",currentPage)

  return{
    pokemonsInPage,
    pages,
    pageStart,
    pageEnd,
  }
}