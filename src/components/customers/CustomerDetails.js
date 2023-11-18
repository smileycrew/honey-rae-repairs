import "./CustomerDetails.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCustomerByUserId } from "../../services/customerService"

export const CustomerDetails = () => {
    const { customerId } = useParams()

    const [customer, setCustomer] = useState({})

    useEffect(() => {
        fetchCustomerByUserId(customerId).then((customerArray) => {
            const customerObject = customerArray[0]
            setCustomer(customerObject)
        })
    }, [customerId])

    return (
        <section className="customer">
            <header className="customer-header">
                <h1>{customer?.user?.fullName}</h1>
                <h3 className="customer-info">Email: </h3>
                <h2>{customer?.user?.email}</h2>
                <h3 className="customer-info">Address: </h3>
                <h2>{customer?.address}</h2>
                <h3 className="customer-info">Phone Number:</h3>
                <h2>{customer?.phoneNumber}</h2>
            </header>
        </section>
    )
}