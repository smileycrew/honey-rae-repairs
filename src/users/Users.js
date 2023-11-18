import "./Users.css"

export const Users = ({ user }) => {
    return (
        <div className="user">
            <div>Name</div>
            <div>{user.fullName}</div>
            <div>Email</div>
            <div>{user.email}</div>
        </div>
    )
}

