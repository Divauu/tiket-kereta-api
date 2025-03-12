import { getServerCoookie } from "@/helper/server-cookie";
import { KeretaType, ScheduleType } from "../types";
import { axiosInstance } from "@/helper/api";
import Schedule from "./Schedule";
import AddSchedule from "./addSchedule";

export const dynamic = "force-dynamic";

/** get data jadwal */
const getJadwal = async (): Promise<ScheduleType[]> => {
  try {
    const url = `/schedule`;
    const TOKEN = await getServerCoookie(`token`);
    /** hit endpoint */
    const response: any = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (response.data.success === true) return response.data.data;
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// function to get all data kereta
const getKereta = async (): Promise<KeretaType[]> => {
    try {
        /** get token from cookie */
        const TOKEN = await getServerCoookie(`token`)
        const url = `/train`
        /** hit endlpoint */
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

const JadwalPage = async () => {
  const dataJadwal = await getJadwal();
  const dataKereta = await getKereta()
  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl font-semibold">Data Jadwal</h1>
      <span className="text-sm text-slate-500">
        Halaman ini memuat daftar jadwal kereta yang tersedia
      </span>
      
      <AddSchedule trains={dataKereta}/>
      <div className="my-3">
        {
            dataJadwal.map((jadwal, index) => (
                <Schedule
                key={`keyJadwal-${index}`}
                item={jadwal}/>
            ))
        }
      </div>
    </div>
  );
};
export default JadwalPage;
