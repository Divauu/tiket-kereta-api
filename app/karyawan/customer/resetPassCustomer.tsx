"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { CustomerType } from "../types" // Update the import for CustomerType

type props = {
    customer: CustomerType // Changed from EmployeeType to CustomerType
}

const ResetPassword = (myProp: props) => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (password !== confirmPassword) {
                toast("Passwords do not match!", {
                    containerId: `toastReset-${myProp.customer.id}`,
                    type: "warning"
                })
                return
            }

            const TOKEN = getCookie(`token`)
            const url = `/customer/${myProp.customer.id}/reset-password` // Changed the endpoint to /customer
            const requestData = {
                password
            }

            // hit endpoint to reset customer password
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success === true) {
                toast(message, {
                    containerId: `toastReset-${myProp.customer.id}`,
                    type: "success"
                })
                // close modal
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastReset-${myProp.customer.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `Something went wrong`,
                {
                    containerId: `toastReset-${myProp.customer.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastReset-${myProp.customer.id}`} />
            <button type="button"
                onClick={() => openModal()}
                className="text-sm px-1 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white">
                Reset Password
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Reset Password Customer
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan password baru yang dimasukkan sudah benar
                        </span>
                    </div>

                    {/* Modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                New Password
                            </small>
                            <input type="password" id={`password-${myProp.customer.id}`} 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xs font-semibold text-sky-600">
                                Confirm New Password
                            </small>
                            <input type="password" id={`confirm-password-${myProp.customer.id}`} 
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
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
                            Save New Password
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ResetPassword
