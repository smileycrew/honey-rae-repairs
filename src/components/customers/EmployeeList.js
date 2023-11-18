import { useEffect, useState } from "react"
import { fetchIsStaff } from "../../services/customerService"
import "./EmployeeList.css"
import { Staff } from "../../users/Staff"
import { Link } from "react-router-dom"


export const EmployeeList = () => {
    // USE STATE FUNCTIONS
    const [employees, setEmployees] = useState([])
    // USE EFFECT FUNCTIONS
    useEffect(() => {
        fetchIsStaff().then((response) => {
            setEmployees(response)
        })
    }, [])
    // RETURNS
    return (
        <div className="employees">{employees.map((employee) => {
            return (
                <Link to={`/employees/${employee.id}`}>
                    <Staff staff={employee} key={employee.id} />
                </Link>
            )
        })}</div>
    )
}