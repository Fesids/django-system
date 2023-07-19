import { IDepartment } from "../Interfaces/Department";

export const DepartmentComp = (department:IDepartment) =>{
    return(
        <div className="department-container">
            <h3>{department.department_name}</h3>
        </div>
    )
}