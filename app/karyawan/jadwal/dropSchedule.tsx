"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType, ScheduleType } from "../types"

type props = {
    trains: KeretaType[],
    item: ScheduleType
}

const DropSchedule = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async(e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.item.id}`

            // hit endpoint to delete employee
            const response: any = await axiosInstance.delete(url, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if(response.data.success == true){
                toast(message, {
                    containerId: `toastDrop-${myProp.item.id}`,
                    type: "success"
                })
                // close modal
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastDrop-${myProp.item.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `Something went wrong`,
                {
                    containerId: `toastDrop-${myProp.item.id}`,
                    type: "error"
                }
            )
        }
    }

    return(
        <div>
            <ToastContainer containerId={`toastDrop-${myProp.item.id}`} />
            <button type="button" 
            onClick={() => openModal()}
            className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Hapus Data Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Anda yakin ingin menghapus data ini.
                        </span>
                    </div>

                    {/* Modal body */}
                    <div className="w-full p-3">
                        Apakah Anda yakin ingin menghapus data jadwal kereta ini?
                    </div>

                    {/* Modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-1">
                        <button type="button"
                        onClick={() => closeModal()}
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>

                        <button type="submit"
                        className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
                            Ya, saya yakin
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default DropSchedule
