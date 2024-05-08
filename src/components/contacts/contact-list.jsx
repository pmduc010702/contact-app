import { useEffect, useState, useRef } from "react"
import dayjs from "dayjs"
import Loading from "../loading"
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserTimes, FaUserEdit  } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ModifyContact from "./modify-contact";
import { Modal } from 'bootstrap';


export default function ContactList() {

    const [contactList, setContactList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [removeContact, setRemoveContact] = useState(null)
    const [modifyContact, setModifyContact] = useState(null)
    const [isModifyContact, setIsModifyContact] = useState(null)
    const modalRef = useRef()
    useEffect(()=> {
        async function fetchContactList() {
            setIsLoading(true)
            let res = await fetch('https://contact-api-gamma.vercel.app/contract?_sort=id&_order=desc')
            let data = await res.json()
            // data = data.sort((contact_1, contact_2) => Number(contact_2.id) - Number(contact_1.id))
            setContactList(data)
            setIsLoading(false)
        }
        fetchContactList()
    }, [removeContact, isModifyContact ])

    const handleRemoveContact = (contact) => {
        Swal.fire({
            title: `Are you sure to remove contact ${contact?.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await fetch(`https://contact-api-gamma.vercel.app/contract/${contact.id}`,
                        {
                            method: "DELETE"
                        }
                    )
                    let data = await res.json()
                    Swal.fire({
                        title: "Deleted!",
                        text: "This Contact has been deleted.",
                        icon: "success"
                      });
                      setRemoveContact(contact?.id)
                    
                } catch (error) {
                    toast.error("Can't remove this contact, please try again!")
                }

              }
                
                
          });
    } 
    const openModifyContact = (contact) => {
        const modalElement = new Modal(modalRef.current)
        modalElement.show()
        setModifyContact(contact)
    }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-success">
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Phone Number</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        isLoading ? <Loading /> : (
                            contactList.map(contact => (
                                <tr key={contact.id}>
                                    <td>
                                        <img className="rounded w-75" src={contact.avatar} alt="" />
                                    </td>
                                    <td>{contact.name}</td>
                                    <td>{dayjs(contact.dob).format('DD-MM-YYYY')}</td>
                                    <td>{contact.company}</td>
                                    <td>{contact.department}</td>
                                    <td>{contact.jobTitle}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td>{contact.mobilePhone}</td>
                                    <td class="text-center align-middle">
                                        <div class="d-flex flex-column align-items-center">
                                            <Link to={`/detail/${contact.id}`} class="mb-2">
                                                <BiSolidUserDetail
                                                    role="button"
                                                    size={22}
                                                    className="text-warning"
                                                />
                                            </Link>
                                            <FaUserTimes 
                                                role="button"
                                                size={18}
                                                className="text-danger mb-2"
                                                onClick={() => handleRemoveContact(contact)}
                                            />
                                            <FaUserEdit 
                                                role="button"
                                                size={18}
                                                className="text-primary mb-2"
                                                onClick={() => openModifyContact(contact)}
                                            />
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
            <ModifyContact modalRef={modalRef} modifyContact={modifyContact} setIsModifyContact={setIsModifyContact} />
        </>
    )
}