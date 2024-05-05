'use client'

import { useEffect, useState } from "react"
import PetListing from "./PetListing"
import Link from "next/link";
import { PetInfo } from "@/types";
import AttributeSelector from "./AttributeSelector";

export default function PetBrowser() {
    const [petList, setPetList] = useState<Array<PetInfo>>();
    const [filteredPetList, setFilteredPetList] = useState<Array<PetInfo>>();
    const [selectedSpecies, setSelectedSpecies] = useState<Array<string>>([]);
    const [selectedColor, setSelectedColor] = useState<Array<string>>([]);
    const [selectedBreed, setSelectedBreed] = useState<Array<string>>([]);

    // Get the pet list from api
    useEffect(() => {
        const startup = async () => {
            let response = await fetch(`/api/pets`);
            let pets : Array<PetInfo> = await response.json();

            for (let i = 0; i < pets.length; ++i ){
                let data = await fetch('/api/pets/' + String(pets[i].id) + '/image')
                let imageBlob =  await data.blob()
                let imageURL = URL.createObjectURL(imageBlob)
                pets[i].imageURL = imageURL;
            }   

            setPetList(pets);
            setFilteredPetList(pets);
        } 

        startup();
    }, [])

    // Filter pets using selected attributes
    useEffect(() => {
        if (petList) {

            /* 
            * Iterate through all the pets and filter 
            */
            let desiredPets : Array<PetInfo> = petList;

            // Species
            if (selectedSpecies.length > 0) {
                let newDesiredPets : Array<PetInfo> = []
                for (let i = 0; i < desiredPets.length; ++i) {
                    let currentPet : PetInfo = desiredPets[i];
                    let currentSpecies : string = currentPet.species;
                    if (selectedSpecies.includes(currentSpecies)) {
                        newDesiredPets.push(currentPet);
                    }
                }
                desiredPets = newDesiredPets;
            }

            // Color
            if (selectedColor.length > 0) {
                let newDesiredPets : Array<PetInfo> = []
                for (let i = 0; i < desiredPets.length; ++i) {
                    let currentPet : PetInfo = desiredPets[i];
                    let currentColor : string = currentPet.color;
                    if (selectedColor.includes(currentColor)) {
                        newDesiredPets.push(currentPet);
                    }
                }
                desiredPets = newDesiredPets;
            }

            // Breed
            if (selectedBreed.length > 0) {
                let newDesiredPets : Array<PetInfo> = []
                for (let i = 0; i < desiredPets.length; ++i) {
                    let currentPet : PetInfo = desiredPets[i];
                    let currentBreed : string = currentPet.breed;
                    if (selectedBreed.includes(currentBreed)) {
                        newDesiredPets.push(currentPet);
                    }
                }
                desiredPets = newDesiredPets;
            }

            setFilteredPetList(desiredPets);
        }
    }, [petList, selectedSpecies, selectedColor, selectedBreed])

    if (petList && filteredPetList){
        return(
            <div className="flex flex-row">

                { /* The filter side bar */ }
                <div className="w-1/6 h-[calc(100vh-44px)] overflow-auto">

                    { /* Species Selector */ }
                    <div className="mt-5 ml-5 mb-5">
                        <AttributeSelector 
                            attributeNameLable="Species" 
                            attributeNameActual="species" 
                            allPets={petList} 
                            possiblePets={filteredPetList}
                            setSelected={setSelectedSpecies} 
                        />
                    </div>

                    { /* Color Selector */ }
                    <div className="mt-5 ml-5 mb-5">
                        <AttributeSelector 
                            attributeNameLable="Color" 
                            attributeNameActual="color" 
                            allPets={petList} 
                            possiblePets={filteredPetList}
                            setSelected={setSelectedColor} 
                        />
                    </div>

                    { /* Breed Selector */ }
                    <div className="mt-5 ml-5 mb-5">
                        <AttributeSelector 
                            attributeNameLable="Breed" 
                            attributeNameActual="breed" 
                            allPets={petList} 
                            possiblePets={filteredPetList}
                            setSelected={setSelectedBreed} 
                        />
                    </div>

                </div>

                { /* Pet Tiles*/ }
                <div className=" bg-slate-100 to-slate-200 w-5/6 shrink h-[calc(100vh-44px)] overflow-auto">
                    <ul className="flex flex-wrap">
                    {filteredPetList.map((pet : PetInfo, id : number) => (
                        <li className="m-5" key={id}>
                            <Link href={"/pets/" + String(pet.id)}>
                                <PetListing {...pet} />
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }
}