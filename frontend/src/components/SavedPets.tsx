'use client'

import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client";
import { Favorite } from "@/types";
import Link from "next/link";
import PetListingRow from "./PetListingRow";

export default function SavedPets() {
    const [ favorites, setFavorites ] = useState<Array<Favorite>>()
    const { user, error, isLoading } = useUser();

    // Get favorites after the authentication clears
    useEffect(() => {
        if (!isLoading && !error){
            fetch(`/api/private/favorites/${user?.sub}`)
                .then(response => response.json())
                .then(data => setFavorites(data))
        }
    }, [isLoading])

    if (isLoading) {return(<p>Loading...</p>)}
    if (error) {return(<p>{error.message}</p>)}

    if (favorites){
        return(
            <div className="flex flex-col">
                <div className="bg-blue-400 lg:w-[1050px] md:w-[850px] rounded-t-3xl h-14">
                    <p className="pt-4 pl-5 text-lg font-serif">Saved Pets</p>
                </div>
                <div className="p-3 bg-white md:w-[850px] lg:w-[1050px] flex flex-col">
                    { favorites.map((favorite, id) => (
                        <Link href={"/pets/" + String(favorite.petId)}>
                            <div key={id}>
                                <PetListingRow {...favorite.pet} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}