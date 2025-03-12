import { getServerCoookie } from "@/helper/server-cookie";
import { EmployeeType } from "../types";
import { axiosInstance } from "@/helper/api";
import Employee from "./Employee";
import AddEmployee from "./addEmployee";

export const dynamic = "force-dynamic";

// Function to get all employee data
const getEmployee = async (): Promise<EmployeeType[]> => {
    try {
        /** get token from cookie */
        const TOKEN = await getServerCoookie(`token`)
        const url = `/employee`
        /** hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        if(response.data.success == true){
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const EmployeePage = async() => {
    /** call function to load employee data from backend */
    const employeeData = await getEmployee()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Karyawan
            </h1>
            <span className="text-sm text-slate-500">
            Halaman ini memuat daftar karyawan yang tersedia
            </span>

            <div className="my-3">
                <AddEmployee />
                {/* mapping employee data */}
                {
                    employeeData.map((employee, index) => (
                        <Employee 
                            item={employee}
                            key={`employee-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default EmployeePage
