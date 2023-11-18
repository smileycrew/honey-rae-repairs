import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketServices"
import { Ticket } from "./Ticket"
import { FilterTickets } from "./FilterTickets"
import "./Tickets.css"

export const TicketList = ({ currentUser }) => {
    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getAndSetTickets = () => {
        getAllTickets().then(ticketsArray => {
            if (currentUser.isStaff) {
                setAllTickets(ticketsArray)
            } else {
                const customerTickets = ticketsArray.filter((ticket) => {
                    return ticket.userId === currentUser.id
                })
                setAllTickets(customerTickets)
            }
        })
    }

    const handleOpenTickets = () => {
        const openedTickets = allTickets.filter((ticket) => {
            return ticket.dateCompleted === ""
        })
        setFilteredTickets(openedTickets)
    }

    const handleMyTickets = () => {
        setFilteredTickets(allTickets)
    }

    useEffect(() => {
        getAndSetTickets()
    }, [currentUser]) // ONLY runs on initial render of component

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets]) // this function runs when sho emerygency only changes

    useEffect(() => {
        const foundTickets = allTickets.filter((ticket) => {
            return ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

    return (
        <div className="tickets-container">
            <h2>Tickets</h2>
            <FilterTickets handleMyTickets={handleMyTickets} handleOpenTickets={handleOpenTickets} setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm} currentUser={currentUser} />
            <article className="tickets">
                {filteredTickets.map(ticketObject => {
                    return (
                        <Ticket ticket={ticketObject} key={ticketObject.id} currentUser={currentUser} getAndSetTickets={getAndSetTickets} />
                    )
                })}
            </article>
        </div>
    )
}