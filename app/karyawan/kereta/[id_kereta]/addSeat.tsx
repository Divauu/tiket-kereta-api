"use client"
import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type props = {
    id_gerbong: number
}

const AddKursi = (myProp: props) => {
    const[wagon_id, setWagon] = useState<number>(0)
    const[seat_number, setSeatNumber] = useState<string>("")
    const[show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setWagon(myProp.id_gerbong)
        setSeatNumber("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async(e: FormEvent) => {
        try {
            e.preventDefault()
                        const TOKEN = getCookie(`token`)
                        const url = `/train/wagon/seat`
                        const requestData = {
                            wagon_id, seat_number
                        }
            
                        const response: any = await axiosInstance.post(
                            url, requestData, {
                                headers: {
                                    Authorization: `Bearer ${TOKEN}`
                                }
                            }
                        )
            
                        const message = response.data.message
                        if(response.data.success == true ){
                            setShow(false)
                            toast(message, {
                                containerId: `toastAddKursi`,
                                type: `success`
                            })
            
                            setTimeout(() => router.refresh(), 1000)
                        }else{
                            toast(message, {
                                containerId: `toastAddKursi`,
                                type: "warning"
                            })
                        }
        } catch (error) {
            console.log(error); 
                toast(`Something wrong`,
                    {
                        containerId: `toastAddKursi`,
                        type: "error"
                    }
                )
        }
    }
    return(
        <div>
            <ToastContainer containerId={`toastAddKursi`}/>
            <button type="button" 
            onClick={() => openModal()}
            className="px-4 py-2 mb-2 rounded-md bg-green-600 hover:bg-green-500 text-white">
                +
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Kursi
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nomor Kursi
                            </small>
                            <input type="text" id={`seat_number`} 
                            value={seat_number}
                            onChange={e => setSeatNumber(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>

                    {/* modal footer */}
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
export default AddKursi