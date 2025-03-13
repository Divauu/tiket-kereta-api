import { KursiType } from "../../types"
import DropKursi from "./dropSeat"
import EditKursi from "./editSeat"
export const dynamic = "force-dynamic";


type props = {
    item: KursiType
}

const Seat = (myProp: props) => {
    return (
        <div className="size-20 rounded-sm flex flex-col items-center justify-center bg-sky-700 p-2">
            {/* Nomor Kursi */}
            <span className="text-white font-semibold">
                {myProp.item.seat_number}
            </span>

            {/* Tombol Edit & Drop dalam satu baris */}
            <div className="mt-2 flex flex-row gap-2">
                <EditKursi item={myProp.item} />
                <DropKursi item={myProp.item} />
            </div>
        </div>
    )
}

export default Seat;
