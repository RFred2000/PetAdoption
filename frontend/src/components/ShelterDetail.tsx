import { ShelterInfo } from "@/types"

export default function ShelterDetail(params : ShelterInfo) {
    return(
        <>
            <div className="h-16 bg-green-200 rounded-t-3xl">
                <p className="pt-4 pl-10 text-3xl text-gray-800 font-serif">Shelter Information</p>
            </div>
            <div className="bg-white pb-8 pt-4 pl-10 pr-10 rounded-b-3xl">
                <div className="flex flex-row justify-between">
                    <p className="text-3xl mb-5">{params.name}</p>
                </div>
                <div className="flex flex-row">
                    <div className="mr-5">
                        <p className="font-bold text-lg">Email:</p>
                        <p className="font-bold text-lg">Phone:</p>
                    </div>
                    <div>
                        <p className="text-lg">{params.email}</p>
                        <p className="text-lg">{params.phone}</p>
                    </div>
                </div>
            </div>
        </>
    )
}