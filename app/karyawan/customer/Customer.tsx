import { CustomerType } from "../types"; 
import EditCustomer from "./editCustomer"; 
import DropCustomer from "./dropCustomer"; 
import ResetPassword from "./resetPassCustomer"; 
export const dynamic = "force-dynamic";


type Props = {
    customer: CustomerType
}

const Customer = ({ customer }: Props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Nama Pelanggan
                </small>
                <span>
                    {customer.name}
                </span>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Username
                </small>
                <span>
                    {customer.user_details.username}
                </span>
            </div>

            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm text-sky-700 font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditCustomer customer={customer} /> 
                    <DropCustomer customer={customer} /> 
                    <ResetPassword customer={customer} /> 
                </div>
            </div>
        </div>
    );
}

export default Customer;
