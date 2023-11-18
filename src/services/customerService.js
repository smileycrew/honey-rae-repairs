export const fetchIsNotStaff = () => {
    return fetch("http://localhost:8088/users?isStaff=false").then(response => response.json())
}
export const fetchIsStaff = () => {
    return fetch("http://localhost:8088/users?isStaff=true").then(response => response.json())
}
export const fetchCustomerByUserId = (userId) => {
    return fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`).then((response) => response.json())
}