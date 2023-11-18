export const getAllTickets = async () => {
    const response = await fetch("http://localhost:8088/serviceTickets?_embed=employeeTickets")
    const tickets = response.json()
    return tickets
}

export const assignTicket = (employeeTicket) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeTicket)
    })
}

export const updateTicket = (ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
}

export const saveTicketToDatabase = (object) => {
    const ticket = {
        userId: object.userId,
        description: object.description,
        emergency: object.emergency ? true : false,
        dateCompleted: "",
    }
    console.log(ticket)
    // POST to database
    return fetch(`http://localhost:8088/serviceTickets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
}

export const deleteCustomerTicket = (object) => {
    console.log(object.id)
    return fetch(`http://localhost:8088/serviceTickets/${object.id}`, {
        method: "DELETE"
    })
}