import { useNavigate } from "react-router-dom"

export const FilterTickets = ({ handleMyTickets, setShowEmergencyOnly, setSearchTerm, currentUser, handleOpenTickets }) => {

    const navigate = useNavigate()

    return (
        (currentUser.isStaff) ? <div>
            <button className="filter-btn btn-primary"
                onClick={() => {
                    setShowEmergencyOnly(true)
                }}>Emergency</button>
            <button className="filter-btn btn-info"
                onClick={() => {
                    setShowEmergencyOnly(false)
                }}>Show All</button>
            <div>
                <input
                    type="text"
                    placeholder="Search Tickets"
                    className="ticket-search"
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}>
                </input>
            </div>
        </div> :
            <>
                <button
                    className="filter-btn btn-primary"
                    onClick={() => {
                        navigate("create")
                    }}>
                    Create
                </button>
                <button
                    className="filter-btn btn-info"
                    onClick={handleOpenTickets}>
                    Open
                </button>
                <button
                    className="filter-btn btn-secondary"
                    onClick={handleMyTickets}>
                    My Tickets
                </button>
            </>

    )
}