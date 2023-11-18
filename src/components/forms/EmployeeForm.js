import { useEffect, useState } from "react"
import { fetchEmployeeById, updateEmployee } from "../../services/employeeService"
import "./Form.css"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ({ currentUser }) => {

    const [employee, setEmployee] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        fetchEmployeeById(currentUser.id).then((data) => {
            const employeeObject = data[0]
            setEmployee(employeeObject)
        })
    }, [currentUser])

    const handleSave = (event) => {
        event.preventDefault()
        const editedEmployee = {
            id: employee.id,
            specialty: employee.specialty,
            rate: employee.rate,
            userId: employee.userId
        }
        updateEmployee(editedEmployee).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    }

    const handleInputChange = (event) => {
        const name = event.target.name
        const copyOfEmployee = { ...employee }
        copyOfEmployee[name] = event.target.name
    }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Specialty:</label>
                    <input className="form-control"
                        name="specialty"
                        onChange={handleInputChange}
                        required
                        type="text"
                        value={employee?.specialty}>

                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate:</label>
                    <input className="form-control"
                        onChange={(event) => {
                            const copyOfEmployee = { ...employee }
                            copyOfEmployee.rate = event.target.value
                            setEmployee(copyOfEmployee)
                        }}
                        type="number"
                        value={employee?.rate}>

                    </input>
                </div>
            </fieldset>
            <fieldset >
                <div className="form-group">
                    <button className="form-btn btn-primary"
                        onClick={handleSave}>
                        Save Profile
                    </button>
                </div>
            </fieldset>
        </form>
    )
}