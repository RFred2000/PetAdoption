import { PetInfo } from "@/types"

export default function PetDetail(props : {
    petInfo: PetInfo;
    petPicture: string;
}) {

    return (
        <>
            <div className="h-16 bg-sky-200 rounded-t-3xl">
                <p className="pt-4 pl-10 text-3xl text-gray-800 font-serif">Pet Details</p>
            </div>
            <div className="bg-white pb-8 pt-4 pl-10 pr-10 rounded-b-3xl">
                <div className="flex flex-row justify-between">
                    <p className="text-3xl mb-5">{props.petInfo.name}</p>
                    <p className="text-xl mr-5 font-serif text-gray-500">{props.petInfo.breed}</p>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <img className="w-fill h-fill object-scale-down rounded-2xl" src={props.petPicture} alt="pet picture"/>
                    </div>
                    <div className="w-1/2 mx-auto">
                        <p className="mt-5 ml-5 ">Color: {props.petInfo.color}</p>
                    </div>
                </div>
            </div>
        </>
    )
}