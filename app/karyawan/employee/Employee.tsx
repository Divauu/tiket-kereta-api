import { EmployeeType } from "../types"
import EditEmployee from "./editEmployee"
import DropEmployee from "./dropEmployee"
import ResetPassword from "./resetPassEmployee"

type props = {
    item: EmployeeType
}

const Employee = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Nama Karyawan
                </small>
                <span>
                    {myProp.item.name}
                </span>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Username
                </small>
                <span>
                    {myProp.item.user_details.username}
                </span>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditEmployee employee={myProp.item} />
                    <DropEmployee employee={myProp.item} />
                    <ResetPassword employee={myProp.item}/>
                </div>
            </div>
        </div>
    )
}

export default Employee
