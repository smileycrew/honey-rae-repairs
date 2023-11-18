import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { CustomerNavBar } from "../components/nav/CustomerNavBar"
import { TicketList } from "../components/tickets/TicketList.js"
import { CreateCustomerTicket } from "../components/customers/CreateCustomerTicket"

export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <CustomerNavBar />
                    <Outlet />
                </>
            } />
            <Route index element={<Welcome />} />

            <Route path="tickets">
                <Route index element={<TicketList currentUser={currentUser} />}></Route>
                <Route path="create" element={<CreateCustomerTicket currentUser={currentUser} />}></Route>
            </Route>
        </Routes>
    )
}