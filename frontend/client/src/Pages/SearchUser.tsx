import { useContext, useEffect, useState } from "react"
import { IUser } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import { SearchQuery } from "../Interfaces/Search";
import { UserComp } from "../Components/UserComp";

export const SearchDepartmentPage = () =>{

    const [searchResults, setSearchResults] = useState([] as Array<IUser>);
    const [searchInput, setSearchInput] = useState({} as SearchQuery);
    const {searchUser} = useContext(AppContext);

    const handleSubimit = (e:any)=>{
        e.preventDefault();
        searchUser(searchInput).then(resp => setSearchResults(resp));
    }
    

    console.log(searchInput);

    return(
        <div className="search-department-container">
            <form method="post" onSubmit={(e)=>handleSubimit(e)}>
                <label htmlFor="username"></label>
                <input type="text" id="username" name="username" onChange={(e)=> setSearchInput({search: e.target.value})}></input>
                <input type="submit"/>
            </form>
            <div className="border">
                {searchResults.map(sr => <UserComp {...sr}/>)}
            </div>
        </div>
    )
}