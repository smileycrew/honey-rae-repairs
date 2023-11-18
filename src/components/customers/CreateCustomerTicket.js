import { useEffect, useState } from "react"
import { saveTicketToDatabase } from "../../services/ticketServices"
import { useNavigate } from "react-router-dom"

export const CreateCustomerTicket = ({ currentUser }) => {

    const navigate = useNavigate()

    const [ticketState, setTicketState] = useState({})
    const [emergencyState, setEmergencyState] = useState(false)

    useEffect(() => {
        const copy = { ...ticketState }
        copy.userId = currentUser.id
        copy.emergency = false
        setTicketState(copy)
    }, [currentUser])

    const handleTicketState = (event) => {
        console.log(event.target)
        event.target.name !== "emergency" && event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const copy = { ...ticketState }
        copy[name] = value
        setTicketState(copy)
    }

    const handleSaveButton = (event) => {
        event.preventDefault()
        saveTicketToDatabase(ticketState).then(() => {
            navigate("/tickets")
        })
    }

    return (
        <>
            <form>
                <fieldset>
                    <input
                        name="description"
                        onChange={handleTicketState}
                        placeholder="new service ticket"
                        required
                        type="text">
                    </input>
                    <label>Emergency?</label>
                    <input
                        className=""
                        name="emergency"
                        onChange={(event) => {
                            setEmergencyState(event.target.checked)
                            console.log(event.target.value)
                            // handleTicketState(event)
                        }}
                        type="checkbox"
                        value={emergencyState}>
                    </input>
                    <button
                        className="btn-secondary"
                        name=""
                        onClick={handleSaveButton}>
                        Create
                    </button>
                </fieldset>
            </form>

        </>
    )
}