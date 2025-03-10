import { getServerCoookie } from "@/helper/server-cookie";
import { CustomerType } from "../types"; 
import { axiosInstance } from "@/helper/api";
import Customer from "./Customer"; 
import AddCustomer from "./addCustomer"; 

const getCustomers = async (): Promise<CustomerType[]> => {
    try {
        /** get token from cookie */
        const TOKEN = await getServerCoookie(`token`);
        const url = `/customer`;
        /** hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        });

        if (response.data.success === true) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const CustomerPage = async () => {
    /** call function to load customer data from backend */
    const customersData = await getCustomers();
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Pelanggan
            </h1>
            <span className="text-sm text-slate-500">
            Halaman ini memuat daftar pelanggan yang tersedia
            </span>

            <div className="my-3">
                <AddCustomer />
                {/* mapping customer data */}
                {
                    customersData.map((customer, index) => (
                        <Customer 
                            customer={customer}
                            key={`customer-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default CustomerPage;
