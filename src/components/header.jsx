import { FaRegBell } from "react-icons/fa";
import avatar from "../assets/imgs/avatar.png"
import { FaUsersRectangle } from "react-icons/fa6";



export default function Header() {
    return (
        <div className="d-flex align-items-center justify-content-between bg-success text-white py-2">
            <h5 className="flex-grow-1 text-center">Contact</h5>
            <div className="d-flex align-items-center justify-content-center" style={{width: '200px'}}>
                <FaRegBell className="me-2" />
                <h6 className="me-2">Minh Duc</h6>
                <img src={avatar} alt="" className="avatar-sm" />
            </div>
        </div>
    )
}