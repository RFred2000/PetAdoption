import { useEffect, useState } from "react";
import { PetInfo } from "@/types";

export default function PetListing(props : PetInfo) {
    const [image, setImage] = useState<string>()

    useEffect(() => {
        fetch('/api/pets/' + String(props.id) + '/image')
            .then(data => data.blob())
            .then(imageBlob => URL.createObjectURL(imageBlob))
            .then(imageURL => setImage(imageURL))
    }, [props])

    if (image) {
        return(
            <div className="lg:h-80 lg:w-56 md:h-60 md:w-40 rounded-3xl border border-solid bg-white">
                <div className="lg:w-56 lg:h-56 md:h-40 md:w-40 ounded-lg flex items-center">
                    <img className="object-cover lg:h-56 lg:w-56 md:h-40 md:w-40 rounded-t-3xl" src={image} alt="pet picture" /> 
                </div>
                <div className="">
                    <p className="text-center font-bold lg:text-lg md:text-md mt-4 truncate md:max-w-32 lg:max-w-52 mx-auto">{props.name}</p>
                    <p className="text-center text-sm text-gray-500 truncate md:max-w-32 lg:max-w-52 mx-auto">{props.breed}</p>
                </div>
            </div> 
        )
    }

}