export const fetchEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=user").then(response => response.json())
}

export const fetchEmployeeById = (id) => {
    return fetch(`http://localhost:8088/employees/?userId=${id}&_expand=user`).then((response) => response.json())
}

export const updateEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
}