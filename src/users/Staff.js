import "./Staff.css"

export const Staff = ({staff}) => {
    return (
        <div className="staff">
            <div>Name</div>
            <div>{staff.fullName}</div>
            <div>Email</div>
            <div>{staff.email}</div>
        </div>
    )
}