import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import MainLayout from './../layout/main-layout';
import { FaUsers,FaUserPlus  } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";


export default function ContactPage() {
    const { contactId } = useParams()
    return (
        <MainLayout>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/list'}><FaUsers /> All Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/create'}><FaUserPlus /> Create Contact</NavLink>
                </li>
                {
                    contactId && 
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/detail'}><BiSolidUserDetail size={20} /> Contact Details</NavLink>
                    </li>
                }
            </ul>
            <Outlet /> 
        </MainLayout>
    )
}