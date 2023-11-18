import { useEffect, useState } from "react"
import { fetchIsNotStaff } from "../../services/customerService"
import "./CustomerList.css"
import { Users } from "../../users/Users"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    // USE STATE FUNCTIONS
    const [customers, setCustomers] = useState([])
    // USE EFFECT FUNCTIONS
    useEffect(() => {
        fetchIsNotStaff().then(response => {
            setCustomers(response)
        })
    }, [])
    // RETURN HTML
    return (
        <div className="customers">{customers.map((customer) => {
            return (
                <Link to={`${customer.id}`}>
                    <Users user={customer} key={customer.id} />
                </Link>
            )
        })}</div>
    )
}