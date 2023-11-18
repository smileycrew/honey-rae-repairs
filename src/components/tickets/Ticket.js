import { useEffect, useState } from "react"
import { fetchEmployees } from "../../services/employeeService"
import { assignTicket, deleteCustomerTicket, updateTicket } from "../../services/ticketServices"
export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
    // USE STATE FUNCTIONS
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})
    // *****FUNCTIONS*****
    // function that will fetch employees and then use state on them
    const reFetchEmployees = () => {
        fetchEmployees().then((employees) => {
            setEmployees(employees)
        })
    }
    const findEmployeeFunction = () => {
        const findEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
        )
        setAssignedEmployee(findEmployee)
    }
    // USE EFFECT FUNCTIONS
    useEffect(() => {
        reFetchEmployees()
    }, [])
    useEffect(() => {
        findEmployeeFunction()
    })
    // FUNCTIONS
    const handleClaim = () => {
        const currentEmployee = employees.find((employee) => employee.userId === currentUser.id)
        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id
        }
        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date(),
        }
        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleDelete = () => {
        deleteCustomerTicket(ticket).then(() => {
            getAndSetTickets()
        })
    }
    // RETURNS
    return (
        <section className="ticket">
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div>
                        Assignee
                    </div>
                    <div>
                        {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
                    </div>
                </div>
                <div>
                    <div className="ticket-info">Emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {/* if the logged in user is an employee and if there is no employee ticket is associated
                    then a button to clai the ticket should display */}
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
                    ) : (
                        ""
                    )}
                    {/* if the logged in user is the assigned employee for the ticket and there is no
                    date completed then a button to close the ticket should display */}
                    {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? <button className="btn btn-warning" onClick={handleClose}>Close</button> : ""}
                </div>
                <div>
                    {currentUser.isStaff ? "" : <button className="btn btn-warning" onClick={() => { handleDelete() }}>Delete</button>}
                </div>
            </footer>
        </section>
    )
}