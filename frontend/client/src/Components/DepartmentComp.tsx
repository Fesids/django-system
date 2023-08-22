import { IDepartment } from "../Interfaces/Department";

export const DepartmentComp = (department:IDepartment) =>{
    return(
        <div className="department-container">
            <h2>{department.department_name}</h2>
        </div>
    )
}