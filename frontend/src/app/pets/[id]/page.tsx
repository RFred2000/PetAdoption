
'use client'

import { useEffect, useState } from "react"
import PetDetail from "@/components/PetDetail"
import ShelterDetail from "@/components/ShelterDetail"
import { PetInfo, ShelterInfo } from "@/types"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"

export default function Page({ params } : { params: { id: number } }) {
    const [petInfo, setPetInfo] = useState<PetInfo>()
    const [petPicture, setPetPicture] = useState<string>()
    const [isFavorite, setIsFavorite] = useState<boolean>()
    const { user, error, isLoading } = useUser();

    // These can and should run on first render
    useEffect(() => {
        fetch('/api/pets/'+ String(params.id))
            .then(response => response.json())
            .then(data => setPetInfo(data))
 
        fetch('/api/pets/' + String(params.id) + '/image')
            .then(data => data.blob())
            .then(imageBlob => URL.createObjectURL(imageBlob))
            .then(imageURL => setPetPicture(imageURL))
    }, [])

    // This one can only run in the case that loading is done and there isn't an error
    useEffect(() => {
        if (!isLoading && !error) {
            if (typeof user != "undefined") {
                fetch(`/api/private/favorites?userId=${user.sub}&petId=${params.id}`)
                    .then(response => response.json())
                    .then(data => {
                        setIsFavorite(Object.entries(data).length > 0)
                    })
            }
        }
    }, [isLoading])

    async function onAddFavorite() {
        debugger;
        fetch('/api/private/favorites', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                userId: user?.sub,
                petId: params.id
            })
        })
        .then(response => {
            if (response.status == 201) {
                setIsFavorite(true)
            }
        })
    }

    async function onRemoveFavorite() {
        fetch(`/api/private/favorites/${user?.sub}/${params.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status == 200) {
                setIsFavorite(false)
            }
        })
    }

    // If there was an error with auth0 I want to show that
    if (!isLoading && error) {
        return <div>{error.message}</div>
    }

    // This is the normal running state of the web page
    if (typeof petInfo != "undefined" && 
        typeof petPicture != "undefined" &&
        !isLoading &&
        (typeof isFavorite != "undefined" || typeof user == "undefined")) {
        return (
            <div className="lg:w-8/12 md:w-11/12 mx-auto flex flex-col">

                {/* Pet Detail */}
                <div className="mt-5">
                    <PetDetail petInfo={petInfo} petPicture={petPicture} />
                </div>

                {/* Shelter Detail */}
                <div className="mt-5">
                    <ShelterDetail {...petInfo.shelter} />
                </div>

                {/* Favorite Button */}
                {user && isFavorite && 
                    <button onClick={onRemoveFavorite}>
                        <div className="flex flex-row bg-white p-5 w-56 mt-5 rounded-3xl hover:shadow-2xl transition-shadow">
                            <Image src="/CheckMark.png" alt="Didn't work" width={70} height={70}/>
                            <p className="mx-auto mt-5">Unfavorite</p>
                        </div>
                    </button>
                }

                {user && !isFavorite && 
                    <button onClick={onAddFavorite}>
                        <div className="flex flex-row bg-white p-5 w-56 mt-5 rounded-3xl hover:shadow-2xl transition-shadow">
                            <Image src="/StarIcon.jpg" alt="Didn't work" width={70} height={70}/>
                            <p className="mx-auto mt-5">Favorite</p>
                        </div>
                    </button>
                }

            </div>
        )
    }
}