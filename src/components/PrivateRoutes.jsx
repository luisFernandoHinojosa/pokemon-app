import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
  const trainerName = useSelector((store) =>store.trainerName)

  if (trainerName){
    return <Outlet/>
  }else{
    return <Navigate to="/"/>
  }
  
}