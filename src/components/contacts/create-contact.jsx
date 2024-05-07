import avatar from '../../assets/imgs/avatar.png'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading'

const schema = yup
  .object({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    mobilePhone: yup.string().required(),
    department: yup.string().required(),
    jobTitle: yup.string().required(),
    company: yup.string().required(),
    email: yup.string().email().required(),
    nodes: yup.string(),
    avatar: yup.string(),
    dob: yup.date().required().typeError("dob is a required field")
    
  })


export default function CreateContact() {

    const [isLoading, setIsLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const handleCreateContact = async (values) => {
        
        try {
            setIsLoading(true)
            let res = await fetch('https://66387fe34253a866a24dfb1f.mockapi.io/Contact', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(values)
            })
    
            let result = await res.json()
    
            if(Object.keys(result).length) {
                toast.success(`Contact created success`)
                reset()
                setAvatarUrl('')
            }

            
        } catch (error) {
            toast.error('Something went wrong, please contact admin')
        }
        setIsLoading(false)
    }

    const handleCancel = () => {
        navigate(-1, {replace: true})
    }
    return (
        <>
            <h1>Create Contact</h1>
            { isLoading ? <Loading /> : (
                <form onSubmit={handleSubmit(handleCreateContact)}>
                    <div className='row'>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                    placeholder="Name..."
                                    {...register("name")}
                                />
                                <span className='invalid-feedback'>{errors.name?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Department</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.department?.message ? 'is-invalid' : ''}`}
                                    placeholder="Department..."
                                    {...register("department")}
                                />
                                <span className='invalid-feedback'>{errors.department?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Company</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.company?.message ? 'is-invalid' : ''}`}
                                    placeholder="Company..."
                                    {...register("company")}
                                />
                                <span className='invalid-feedback'>{errors.company?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Job Title</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.jobTitle?.message ? 'is-invalid' : ''}`}
                                    placeholder="Job Title..."
                                    {...register("jobTitle")}
                                />
                                <span className='invalid-feedback'>{errors.jobTitle?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email"
                                        className={`form-control ${errors.email?.message ? 'is-invalid' : ''}`}
                                        placeholder="Email..."
                                        {...register("email")}

                                    />
                                    <span className='invalid-feedback'>{errors.email?.message}</span>
                            </div>
                        </div>
                        <div className="col-4">
                                <div className="form-group mb-2">
                                    <label className="form-label">Dob</label>
                                    <input 
                                        type="date"
                                        className={`form-control ${errors.dob?.message ? 'is-invalid' : ''}`}
                                        placeholder="Dob..."
                                        {...register("dob")}

                                    />
                                    <span className='invalid-feedback'>{errors.dob?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Phone Number</label>
                                    <input 
                                        type="tel"
                                        className={`form-control ${errors.phoneNumber?.message ? 'is-invalid' : ''}`}
                                        placeholder="Phone Number..."
                                        {...register("phoneNumber")}
                                    />
                                    <span className='invalid-feedback'>{errors.phoneNumber?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Mobile Phone</label>
                                    <input 
                                        type="tel"
                                        className={`form-control ${errors.mobilePhone?.message ? 'is-invalid' : ''}`}
                                        placeholder="Mobile Phone..."
                                        {...register("mobilePhone")}
                                    />
                                    <span className='invalid-feedback'>{errors.mobilePhone?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                <label className="form-label">Notes</label>
                                <input 
                                    type="text"
                                    className={`form-control`}
                                    placeholder="Notes..."
                                    {...register("notes")}
                                />
                                </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                            <img src={avatarUrl ||avatar} className='w-50' />
                                    
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Avatar Url</label>
                                    <input 
                                        type="url"
                                        className={`form-control`}
                                        placeholder="Avatar Url..."
                                        onInput={(e) => setAvatarUrl(e.target.value)}
                                        {...register("avatar")}
                                    />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-4'>
                            <button type='submit' className='btn btn-success me-2'>Create</button>
                            <button type='button' className='btn btn-secondary'
                                onClick={handleCancel}
                            >Cancel</button>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}