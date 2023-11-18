import "./EmployeeDetails.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {fetchEmployeeById} from "../../services/employeeService"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()

    const [employee, setEmployee] = useState({})

    useEffect(() => {
        fetchEmployeeById(employeeId).then((employeeArray) => {
            const employeeObject = employeeArray[0]
            setEmployee(employeeObject)
        })
    }, [employeeId])
    return (
        <section className="employee">
            <header className="employee-header">
                <h1>{employee.user?.fullName}</h1>
                <h3 className="employee-info">Email: </h3>
                <h2>{employee.user?.email}</h2>
                <h3 className="employee-info">Specialty: </h3>
                <h2>{employee.specialty}</h2>
                <h3 className="employee-info">Rate: </h3>
                <h2>{employee.rate}</h2>
            </header>
        </section>
    )
}