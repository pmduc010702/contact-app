import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from './../loading';

export default function ContactDetail() {
    const {contactId} = useParams()
    const [contactDetail, setContactDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        setIsLoading(true)
        async function fetchContactById() {
            let res = await fetch(`https://contact-api-gamma.vercel.app/contract/${contactId}`)
            let data = await res.json()
            setContactDetail(data)
            setIsLoading(false)
        }
        fetchContactById()
        
    }, [contactId])

    return (
        <>
            {isLoading ? <Loading /> : (
                <>
                    <h1>{contactDetail.name}'s Contact Detail</h1>
                    <div className="row">
                        <div className="col-4">
                            <img className="avatar-xl" src={contactDetail?.avatar} alt="" />
                        </div>
                        <div className="col-8">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="fw-bold">Name: </span> {contactDetail.name}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Email: </span> {contactDetail.email}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Company: </span> {contactDetail.company}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Department: </span> {contactDetail.department}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Job Title: </span> {contactDetail.jobTitle}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Dob: </span> {dayjs(contactDetail.dob).format('DD-MM-YYYY')}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Mobile Phone: </span> {contactDetail.mobilePhone}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Phone Number: </span> {contactDetail.phoneNumber}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">Note: </span> {contactDetail.notes}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <Link to={"/list"} className="btn btn-link">
                            Back to Contact List
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}