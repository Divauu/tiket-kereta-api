"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { EmployeeType } from "../types"

type props = {
    employee: EmployeeType
}

const EditEmployee = (myProp: props) => {
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setNik(myProp.employee.nik)
        setName(myProp.employee.name)
        setAddress(myProp.employee.address)
        setPhone(myProp.employee.phone)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async(e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/employee/${myProp.employee.id}`
            const requestData = {
                nik, name, address, phone
            }

            // hit endpoint to update employee
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if(response.data.success == true){
                toast(message, {
                    containerId: `toastEdit-${myProp.employee.id}`,
                    type: "success"
                })
                // close modal
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.employee.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `Something went wrong`,
                {
                    containerId: `toastEdit-${myProp.employee.id}`,
                    type: "error"
                }
            )
        }
    }

    return(
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.employee.id}`} />
            <button type="button" 
            onClick={() => openModal()}
            className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Employee
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* Modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text" id={`nik-${myProp.employee.id}`} 
                            value={nik}
                            onChange={e => setNik(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                Nama Employee
                            </small>
                            <input type="text" id={`name-${myProp.employee.id}`} 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                Alamat
                            </small>
                            <input type="text" id={`address-${myProp.employee.id}`} 
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                Telepon
                            </small>
                            <input type="text" id={`phone-${myProp.employee.id}`} 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>

                    {/* Modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-1">
                        <button type="button"
                        onClick={() => closeModal()}
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>

                        <button type="submit"
                        className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditEmployee
