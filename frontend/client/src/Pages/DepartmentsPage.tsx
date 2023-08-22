import { useCallback, useContext, useEffect, useState } from "react"
import { IDepartment } from "../Interfaces/Department"
import { AppContext } from "../Context/AppContext";
import { DepartmentComp } from "../Components/DepartmentComp";
import { Link } from "react-router-dom";

export const DepartmentPage = () =>{

    const [departments, setDepartments] = useState([] as Array<IDepartment>);

    const {getDepartmentList} = useContext(AppContext);

    useEffect(()=>{
        getDepartmentList().then(resp => setDepartments(resp));

    });

    console.log(departments);

    return(
        <div className="department-page">
            <h2>Departments</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Department Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.map(dept =>
                           <div>
                            <th>{dept.id}</th>
                            <td><Link to={"/departments/detail/"+dept.id}>{dept.department_name}</Link></td>
                           </div>
                        )}
                    </tbody>
                </table>
             
            </div>
        </div>
    )
}