import { Modal } from 'bootstrap';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import avatar from '../../assets/imgs/avatar.png'
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useState } from 'react';


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

export default function ModifyContact({ modalRef, modifyContact, setIsModifyContact }) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const hideModifyContact = () => {
    let modalElement = Modal.getInstance(modalRef.current)
    modalElement.hide()
    reset()
  }
  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...modifyContact
    }
  })

  const handleModifyContact = async (values) => {
    // console.log(values);
    try {
        let res = await fetch(`https://contact-api-gamma.vercel.app/contract/${modifyContact?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        })

        let result = await res.json()

        if(Object.keys(result).length) {
            toast.success(`Contact modify success`)
            reset()
            setAvatarUrl('')
            hideModifyContact()
            setIsModifyContact(result?.id)
        }

          
      } catch (error) {
          toast.error('Something went wrong, please contact admin')
      }
  }
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-xl">
          <form className="modal-content" onSubmit={handleSubmit(handleModifyContact)}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
                    <div className='row'>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                    placeholder="Name..."
                                    {...register("name")}
                                    defaultValue={modifyContact?.name}
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
                                    defaultValue={modifyContact?.department}
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
                                    defaultValue={modifyContact?.company}
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
                                    defaultValue={modifyContact?.jobTitle}
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
                                        defaultValue={modifyContact?.email}
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
                                        defaultValue={dayjs(modifyContact?.dob).format("YYYY-MM-DD")}

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
                                        defaultValue={modifyContact?.phoneNumber}
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
                                        defaultValue={modifyContact?.mobilePhone}
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
                                    defaultValue={modifyContact?.notes}
                                />
                                </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                            <img src= {avatarUrl || modifyContact?.avatar} className='w-50' />
                                    
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Avatar Url</label>
                                    <input 
                                        type="url"
                                        className={`form-control`}
                                        placeholder="Avatar Url..."
                                        onInput={(e) => setAvatarUrl(e.target.value)}
                                        {...register("avatar")}
                                        defaultValue={modifyContact?.avatar}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => hideModifyContact()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
