import { Outlet } from "react-router"
import { Navbar } from "./Navbar"


export const Layout = () =>{

    return(
        <div className="layout">
            <div className="navbar-container">
                <Navbar/>
            </div>

            <div className="content-container">
                <Outlet/>
            </div>

            <div>

            </div>
        </div>
    )
}