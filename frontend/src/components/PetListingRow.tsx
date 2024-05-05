import { useEffect, useState } from "react";
import { PetInfo } from "@/types";

export default function PetListingRow(props : PetInfo) {
    const [image, setImage] = useState("")

    useEffect(() => {
        fetch('/api/pets/' + String(props.id) + '/image')
            .then(data => data.blob())
            .then(imageBlob => URL.createObjectURL(imageBlob))
            .then(imageURL => setImage(imageURL))
    }, [])

    if (image) {
        return(
            <div className="h-56 lg:w-[1000px] md:w-[800px] rounded-lg border-4 border-solid bg-white flex flex-row justify-between mb-4">
                <img className="object-cover lg:h-40 lg:w-40 md:h-40 md:w-40 rounded-t-3xl my-auto ml-10" src={image} alt="pet picture" /> 
                <div className="mr-20">
                    <p className="text-right text-5xl mt-4 truncate max-w-56">{props.name}</p>
                    <p className="text-right text-sm text-gray-500 truncate mx-auto">{props.breed}</p>
                </div>
            </div> 
        )
    }

}