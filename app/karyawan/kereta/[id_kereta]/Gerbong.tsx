import { GerbongType } from "../../types"
import AddKursi from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./Seat"
export const dynamic = "force-dynamic";


type props = {
    item: GerbongType
}

const Gerbong = (myProp: props) => {
    return(
        <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-xs text-sky-600">Nama Gerbong</small>
                <br />
                {myProp.item.name}
                <br />
                Jumlah Kursi: {myProp.item.seat_count}

                <div className="w-full my-2">
                    <AddKursi id_gerbong={myProp.item.id}/>
                    {
                        myProp.item.seats.length == 0 ?
                        <div className="bg-sky-200 p-5 rounded-md">
                            Gerbong ini belum mempunyai kursi
                        </div> :
                        <div className="flex flex-wrap gap-3 rounded-md">
                            {
                                myProp.item.seats.map((seat, index) => (
                                    <Seat key={`keySeat-${index}`}
                                    item={seat}/>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong item={myProp.item} />
                <DropGerbong item={myProp.item} />
            </div>
        </div>
    )
}
export default Gerbong